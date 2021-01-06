export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Balloons Inc.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css'},
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Lato:300,400,700' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Love+Ya+Like+A+Sister' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/contentful'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/markdownit'
  ],

  markdownit: {
    injected: true,
    linkify: false
  },

  publicRuntimeConfig: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_CONTENT_TYPE_PAGE: process.env.CTF_CONTENT_TYPE_PAGE || 'page',
    CTF_CONTENT_TYPE_HOME: process.env.CTF_CONTENT_TYPE_HOME || 'home',
    CTF_CONTENT_TYPE_MENU: process.env.CTF_CONTENT_TYPE_MENU || 'menu',
    CTF_CONTENT_TYPE_TESTIMONIAL: process.env.CTF_CONTENT_TYPE_TESTIMONIAL || 'testimonial',
    CTF_CONTENT_ID_MAIN_MENU: process.env.CTF_CONTENT_ID_MAIN_MENU || 'main-menu',
    CTF_CONTENT_ID_FOOTER_MENU: process.env.CTF_CONTENT_ID_FOOTER_MENU || 'footer-menu'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true
  },

  router: {
    linkExactActiveClass: 'current'
  }
}
