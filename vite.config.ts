import { defineConfig, ConfigEnv, UserConfigExport } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
// https://vitejs.dev/config/
export default function ({}: ConfigEnv): UserConfigExport {
  return defineConfig({
    plugins: [tsconfigPaths(), reactRefresh()],
    build: {
      assetsDir: './',
      brotliSize: false,
      target: ['es2020'],
    },
    define: {
      // global: {},
      'process.env': {},
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          // esbuildCommonjs([
          //   'create-hash',
          //   'browserify-cipher',
          //   'stream-browserify',
          //   'cipher-base',
          //   'stream',
          //   'inherits',
          //   'readable-streams',
          // ]),
        ],
      },
    },
    resolve: {
      alias: {
        process: 'process/browser',
        stream: 'stream-browserify',
        zlib: 'browserify-zlib',
        util: 'util',
      },
    },
  });
}
