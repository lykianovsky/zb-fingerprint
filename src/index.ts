import FingerprintJS, {LoadOptions} from '@fingerprintjs/fingerprintjs-pro'
import {isServer} from "@utils/next-js/is-server";
import {isBot} from "@utils/is-bot";

interface Options {
    storageKey: string
    minLength: number
    publicKey: string
    cookie: {
        get: (key: string) => string | null
        set: (key: string, value: string) => void
    }
}

export class FingerPrintService {
    public readonly STORAGE_KEY: Options['storageKey']

    private readonly MIN_VALUE_LENGTH: Options['minLength']

    private readonly PUBLIC_KEY: Options['publicKey']

    private readonly COOKIE_MANAGER: Options['cookie']

    constructor(options: Options) {
        this.STORAGE_KEY = options.storageKey
        this.MIN_VALUE_LENGTH = options.minLength
        this.PUBLIC_KEY = options.publicKey
        this.COOKIE_MANAGER = options.cookie
    }

    private _fingerPrint = ''

    public get fingerPrint(): string {
        return this._fingerPrint
    }

    private _loadPromise: Promise<string> | null = null

    /**
     * @remarks
     * Сюда передается промис, который создается при загрузке фингер принта
     * Сделано это для того, что бы не было гонки данных (когда запускается 5 загрузчиков, и записываются данные последнего выполненного)
     * Когда мы вызываем метод.load(), мы всегда гарантируем что не будет гонки данных
     * @private
     */
    private get loadPromise(): Promise<string> | null {
        return this._loadPromise
    }

    public setLoadPromise(handle: Promise<string> | null) {
        this._loadPromise = handle
    }

    public setFingerPrint(print: string): void {
        this._fingerPrint = print
    }

    public set(fingerprint: string) {
        this.COOKIE_MANAGER.set(this.STORAGE_KEY, fingerprint)
        localStorage.setItem(this.STORAGE_KEY, fingerprint)
        sessionStorage.setItem(this.STORAGE_KEY, fingerprint)
        this.setFingerPrint(fingerprint)
    }

    public get() {
        const stateFingerprint = this.fingerPrint
        const cookieFingerprint = this.COOKIE_MANAGER.get(this.STORAGE_KEY)

        if (isServer()) {
            return cookieFingerprint
        }

        const localStorageFingerprint = localStorage.getItem(this.STORAGE_KEY)
        const sessionStorageFingerprint = sessionStorage.getItem(this.STORAGE_KEY)

        return (
            cookieFingerprint ||
            sessionStorageFingerprint ||
            localStorageFingerprint ||
            stateFingerprint
        )
    }

    public isValid(fingerprint?: string | null): fingerprint is string {
        if (!fingerprint) {
            return false
        }

        return Boolean(
            fingerprint && fingerprint.length >= this.MIN_VALUE_LENGTH,
        )
    }

    public async buildCustomFingerprint() {
        if (isServer()) {
            throw new Error(
                'The FingerprintService.getCustom method cannot be called on the server side, the method is client side',
            )
        }

        const {userAgent, language} = navigator
        const {screen} = window
        const customPrefix = '_'
        const timestamp = Date.now()
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const message = `
          ${timestamp.toString()}
          ${userAgent}
          ${screen.availWidth.toString()}
          ${screen.availHeight.toString()}
          ${language}
          ${timezone}
        `

        const {SHA3} = await import('crypto-js')
        const hash = SHA3(message).toString().slice(0, this.MIN_VALUE_LENGTH)
        const botPrefix = isBot(window.navigator.userAgent) ? '_bot' : ''

        return `${botPrefix}${customPrefix}${hash}`
    }

    public async load(options?: LoadOptions) {
        if (isServer()) {
            throw new Error(
                'The FingerprintService.load method cannot be called on the server side, the method is client side',
            )
        }

        const savedFingerPrint = this.get()

        if (savedFingerPrint) {
            return savedFingerPrint
        }

        if (this.loadPromise) {
            return await this.loadPromise
        }

        const fingerprintAPI = FingerprintJS.load({
            apiKey: this.PUBLIC_KEY,
            ...options,
        })

        const createFingerPrint = async () => {
            try {
                const result = await fingerprintAPI.then((publicAgent) =>
                    publicAgent.get(),
                )

                const {visitorId} = result

                if (!this.isValid(visitorId)) {
                    throw new Error(
                        `fingerprintAPI return from request invalid visitorId: ${visitorId}`,
                    )
                }

                this.set(visitorId)

                return visitorId
            } catch {
                const customFingerprint = await this.buildCustomFingerprint()

                this.set(customFingerprint)

                return customFingerprint
            }
        }

        const promise = createFingerPrint()

        this.setLoadPromise(promise)

        const result = await promise

        this.setLoadPromise(null)

        return result
    }
}