# Finger Print

### Описание
Этот сервис позволяет получать и сохранять уникальный идентификатор пользователя (fingerprint)

### Использование
```ts
import { FingerPrintService } from './fingerprint-service'

const fingerprintService = new FingerPrintService({
    storageKey: 'user_fingerprint',
    minLength: 32,
    cookie: {
        get: (key) => document.cookie.split('; ').find(row => row.startsWith(key))?.split('=')[1] || null,
        set: (key, value) => document.cookie = `${key}=${value}; path=/;`,
    }
})

fingerprintService.load().then(fp => console.log('User fingerprint:', fp))
```

### API
- `load(options?)` — загружает fingerprint пользователя.
- `get()` — получает сохранённый fingerprint.
- `set(fingerprint)` — сохраняет fingerprint.
- `isValid(fingerprint?)` — проверяет валидность fingerprint.
- `buildCustomFingerprint()` — создаёт кастомный fingerprint.

### Лицензия
MIT.

