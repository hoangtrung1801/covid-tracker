const { resolve } = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        news: resolve(__dirname, 'news.html'),
        world: resolve(__dirname, 'world.html'),
        aboutme: resolve(__dirname, 'aboutme.html'),
      }
    }
  }
})