import { LoadOptions } from '@fingerprintjs/fingerprintjs-pro';
interface Options {
    storageKey: string;
    minLength: number;
    publicKey: string;
    cookie: {
        get: (key: string) => string | null;
        set: (key: string, value: string) => void;
    };
}
export declare class FingerPrintService {
    readonly STORAGE_KEY: Options['storageKey'];
    private readonly MIN_VALUE_LENGTH;
    private readonly PUBLIC_KEY;
    private readonly COOKIE_MANAGER;
    constructor(options: Options);
    private _fingerPrint;
    get fingerPrint(): string;
    private _loadPromise;
    /**
     * @remarks
     * Сюда передается промис, который создается при загрузке фингер принта
     * Сделано это для того, что бы не было гонки данных (когда запускается 5 загрузчиков, и записываются данные последнего выполненного)
     * Когда мы вызываем метод.load(), мы всегда гарантируем что не будет гонки данных
     * @private
     */
    private get loadPromise();
    setLoadPromise(handle: Promise<string> | null): void;
    setFingerPrint(print: string): void;
    set(fingerprint: string): void;
    get(): string | null;
    isValid(fingerprint?: string | null): fingerprint is string;
    buildCustomFingerprint(): Promise<string>;
    load(options?: LoadOptions): Promise<string>;
}
export {};
