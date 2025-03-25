import {defineConfig} from 'vite'
import path from 'path'
import dtsPlugin from 'vite-plugin-dts'

// Конфигурация Vite для сборки библиотеки
export default defineConfig({
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Основной файл библиотеки
      name: 'zb-fingerprint', // Имя глобальной переменной, если используете UMD или IIFE формат
      fileName: 'zb-fingerprint', // Название файлов в разных форматах
    },
    target: 'esnext',
    outDir: 'dist', // Папка для выходных файлов
    emptyOutDir: true, // Очищаем папку dist перед сборкой
  },
  plugins: [
    dtsPlugin({
      // Плагин для генерации .d.ts файлов
      include: ['src'], // Указываем, из какой директории нужно генерировать типы
      exclude: ['node_modules', 'src/tests'], // Исключаем папку node_modules
      staticImport: true, // Для обработки статических импортов
    }),
  ],
})
