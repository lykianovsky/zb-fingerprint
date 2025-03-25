import { LoadOptions } from '@fingerprintjs/fingerprintjs-pro';
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
export declare class FingerPrintService {
    /** Ключ для хранения отпечатка в cookie и localStorage. */
    readonly STORAGE_KEY: Options['storageKey'];
    /** Минимальная допустимая длина отпечатка. */
    private readonly MIN_VALUE_LENGTH;
    /** Публичный API-ключ для FingerprintJS. */
    private readonly PUBLIC_KEY;
    /** Менеджер работы с cookie. */
    private readonly COOKIE_MANAGER;
    /** Промис, предотвращающий гонку данных при загрузке отпечатка. */
    private _loadPromise;
    constructor(options: Options);
    /** Внутренний кешированный отпечаток. */
    private _fingerPrint;
    /** Получает сохраненный отпечаток пользователя. */
    get fingerPrint(): string;
    /** Устанавливает кешированный отпечаток пользователя. */
    setFingerPrint(print: string): void;
    /** Записывает отпечаток пользователя в cookie и localStorage. */
    set(fingerprint: string): void;
    /** Получает отпечаток пользователя из возможных источников (cookie, localStorage, sessionStorage). */
    get(): string | null;
    /** Проверяет валидность отпечатка по его длине. */
    isValid(fingerprint?: string | null): fingerprint is string;
    /** Создает кастомный отпечаток пользователя на основе данных устройства. */
    buildCustomFingerprint(): Promise<string>;
    /** Загружает и возвращает отпечаток пользователя, используя FingerprintJS или кастомный метод. */
    load(options?: LoadOptions): Promise<string>;
}
export {};
