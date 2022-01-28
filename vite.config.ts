import { defineConfig, ConfigEnv, UserConfigExport } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
import polyfillNode from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default function ({ }: ConfigEnv): UserConfigExport {
    return defineConfig({
        plugins: [tsconfigPaths(), reactRefresh(), polyfillNode()],
        build: {
            assetsDir: './',
            brotliSize: false,
            target: [ 'es2020' ]
        },
        define: {
            "global": {},
            "process.env": {}
          },
        optimizeDeps: {
            exclude: ['web3'] // <= The libraries that need shimming should be excluded from dependency optimization.
        }
    });
}
