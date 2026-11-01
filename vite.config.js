import { defineConfig } from 'vite';

// Build de aplicación (no "lib"): en modo lib + formato es, Vite no minifica los
// espacios en blanco. Se genera un único archivo, que es lo que distribuyen
// HACS y el release: dist/styled-stack-card.js
export default defineConfig({
    publicDir: false,
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        target: 'es2020',
        minify: true,
        modulePreload: false,
        rollupOptions: {
            input: 'src/index.ts',
            output: {
                format: 'es',
                entryFileNames: 'styled-stack-card.js',
                inlineDynamicImports: true,
            },
        },
    },
});
