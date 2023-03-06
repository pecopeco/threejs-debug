import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv, Plugin } from 'vite'
import path, { resolve } from 'path'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import AutoImport from 'unplugin-auto-import/vite'
import { crx3 } from 'vite-plugin-vue-crx3'

function importStylus () {
  return {
    name: 'vite-stylus-import-plugin',
    async transform(code, id) {
      if (/.stylus$/g.test(id)) {
        return {
          code: `
            @import "${path.resolve(__dirname, 'src/color.styl')}"
            ${code}
          `,
          map: null,
        }
      }
      return null
    }
  }
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      open: true,
      host: true,
      proxy: {
        '/api': {
          target: 'http://baidu.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      crx3(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/, /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ]
      }),
      {
        ...importStylus(),
        enforce: 'pre'
      }
    ],
    build: {
      target: "es2015",
      minify: false,
      rollupOptions: {
        input: resolve(__dirname, 'src/manifest.json') // 将源码中的manifest.json作为入口文件
      },
    }
  })
}
