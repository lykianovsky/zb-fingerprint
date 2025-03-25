import FingerprintJS, {LoadOptions} from '@fingerprintjs/fingerprintjs-pro'
import {isServer} from "@utils/next-js/is-server";
import {isBot} from "@utils/is-bot";

/**
 * Интерфейс конфигурации FingerPrintService.
 */
interface Options {
    /** Ключ для хранения отпечатка в cookie и localStorage. */
    storageKey: string;
    /** Минимальная длина допустимого отпечатка. */
    minLength: number;
    /** Публичный ключ API FingerprintJS. */
    publicKey: string;
    /** Объект для управления cookie. */
    cookie: {
        get: (key: string) => string | null;
        set: (key: string, value: string) => void;
    };
}

/**
 * Сервис для работы с цифровыми отпечатками пользователей.
 * Использует FingerprintJS для получения уникального идентификатора устройства.
 */
export class FingerPrintService {
    /** Ключ для хранения отпечатка в cookie и localStorage. */
    public readonly STORAGE_KEY: Options['storageKey'];

    /** Минимальная допустимая длина отпечатка. */
    private readonly MIN_VALUE_LENGTH: Options['minLength'];

    /** Публичный API-ключ для FingerprintJS. */
    private readonly PUBLIC_KEY: Options['publicKey'];

    /** Менеджер работы с cookie. */
    private readonly COOKIE_MANAGER: Options['cookie'];
    /** Промис, предотвращающий гонку данных при загрузке отпечатка. */
    private _loadPromise: Promise<string> | null = null;

    constructor(options: Options) {
        this.STORAGE_KEY = options.storageKey;
        this.MIN_VALUE_LENGTH = options.minLength;
        this.PUBLIC_KEY = options.publicKey;
        this.COOKIE_MANAGER = options.cookie;
    }

    /** Внутренний кешированный отпечаток. */
    private _fingerPrint = '';

    /** Получает сохраненный отпечаток пользователя. */
    public get fingerPrint(): string {
        return this._fingerPrint;
    }

    /** Устанавливает кешированный отпечаток пользователя. */
    public setFingerPrint(print: string): void {
        this._fingerPrint = print;
    }

    /** Записывает отпечаток пользователя в cookie и localStorage. */
    public set(fingerprint: string): void {
        this.COOKIE_MANAGER.set(this.STORAGE_KEY, fingerprint);
        localStorage.setItem(this.STORAGE_KEY, fingerprint);
        sessionStorage.setItem(this.STORAGE_KEY, fingerprint);
        this.setFingerPrint(fingerprint);
    }

    /** Получает отпечаток пользователя из возможных источников (cookie, localStorage, sessionStorage). */
    public get(): string | null {
        const stateFingerprint = this.fingerPrint;
        const cookieFingerprint = this.COOKIE_MANAGER.get(this.STORAGE_KEY);

        if (isServer()) {
            return cookieFingerprint;
        }

        const localStorageFingerprint = localStorage.getItem(this.STORAGE_KEY);
        const sessionStorageFingerprint = sessionStorage.getItem(this.STORAGE_KEY);

        return (
            cookieFingerprint ||
            sessionStorageFingerprint ||
            localStorageFingerprint ||
            stateFingerprint
        );
    }

    /** Проверяет валидность отпечатка по его длине. */
    public isValid(fingerprint?: string | null): fingerprint is string {
        return Boolean(fingerprint && fingerprint.length >= this.MIN_VALUE_LENGTH);
    }

    /** Создает кастомный отпечаток пользователя на основе данных устройства. */
    public async buildCustomFingerprint(): Promise<string> {
        if (isServer()) {
            throw new Error(
                'The FingerprintService.getCustom method cannot be called on the server side, the method is client side',
            )
        }

        const { userAgent, language } = navigator;
        const { screen } = window;
        const customPrefix = '_';
        const timestamp = Date.now();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const message = `\n${timestamp}\n${userAgent}\n${screen.availWidth}\n${screen.availHeight}\n${language}\n${timezone}`;

        const { SHA3 } = await import('crypto-js');
        const hash = SHA3(message).toString().slice(0, this.MIN_VALUE_LENGTH);
        const botPrefix = isBot(window.navigator.userAgent) ? '_bot' : '';

        return `${botPrefix}${customPrefix}${hash}`;
    }

    /** Загружает и возвращает отпечаток пользователя, используя FingerprintJS или кастомный метод. */
    public async load(options?: LoadOptions): Promise<string> {
        if (isServer()) {
            throw new Error(
                'The FingerprintService.load method cannot be called on the server side, the method is client side',
            )
        }

        const savedFingerPrint = this.get();

        if (savedFingerPrint) {
            return savedFingerPrint;
        }

        if (this._loadPromise) {
            return await this._loadPromise;
        }

        const fingerprintAPI = FingerprintJS.load({ apiKey: this.PUBLIC_KEY, ...options });

        const createFingerPrint = async () => {
            try {
                const result = await fingerprintAPI.then(publicAgent => publicAgent.get());
                const { visitorId } = result;

                if (!this.isValid(visitorId)) {
                    throw new Error(
                        `fingerprintAPI return from request invalid visitorId: ${visitorId}`,
                    )
                }

                this.set(visitorId);
                return visitorId;
            } catch {
                const customFingerprint = await this.buildCustomFingerprint();
                this.set(customFingerprint);
                return customFingerprint;
            }
        };

        const promise = createFingerPrint();

        this._loadPromise = promise;

        const result = await promise;

        this._loadPromise = null;

        return result;
    }
}