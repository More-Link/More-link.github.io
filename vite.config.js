import path from 'path'
import { globSync } from 'glob'
import { defineConfig } from 'vite'

const getHtmlMap = (subFolder) => {
    const targetFolder = path.resolve(__dirname, subFolder)
    const htmlFiles = globSync('**/*.html', {
        cwd: targetFolder,
        absolute: true,
    })
    return Object.fromEntries(htmlFiles.map((filePath) => [path.relative(targetFolder, filePath), filePath]))
}

export default defineConfig({
    root: 'app',
    build: {
        rollupOptions: {
            input: getHtmlMap('app'),
        },
        outDir: path.resolve(__dirname, 'dist'),
    },
})