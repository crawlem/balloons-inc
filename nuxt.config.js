const contentful = require("contentful")
const client = contentful.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN,
  host: process.env.CTF_API_URL
})

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Balloons Inc.',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie-edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Rich is Exeter\'s premium balloon specialist, injecting colour and fun into parties and events all over the city and beyond.' },
      { name: 'author', content: 'Mark Crawley' }
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
    '~/plugins/contentful',
    '~/plugins/flickr'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/markdownit',
    '@nuxt/http'
  ],

  googleAnalytics: {
    id: 'UA-39475717-1'
  },

  markdownit: {
    injected: true,
    linkify: true
  },

  render: {
    // We don't need JS injected
    injectScripts: false,
    resourceHints: false
  },

  hooks: {
    // JS tags remain in static files https://github.com/nuxt/nuxt.js/issues/8178
    'generate:page': page => {
      const $ = require('cheerio')
      const doc = $.load(page.html)

      // Clean Vue data- attributes because we don't use client-side JS
      doc('*').each((i, node) => {
        Object.keys(node.attribs).forEach((attr) => {
          if (['data-n-head-ssr', 'data-n-head', 'data-hid', 'data-server-rendered', 'data-fetch-key'].indexOf(attr) >= 0) {
            doc(node).removeAttr(attr)
          }
        })
      })

      // Remove comments
      doc('*')
        .contents()
        .filter(function() { return this.type === 'comment' })
        .remove()
      
      // Add .html to internal absolute links
      doc("a[href^='/']").each((i, node) => {
        const oldUrl = doc(node).attr('href')
        // Filter out links we don't want to add .html to
        if (
          // "//" are actually external links
          !oldUrl.startsWith('//') && 
          // Anything that already has .html doesn't need it again
          !oldUrl.endsWith('.html') &&
          // Ignore the root path
          oldUrl !== '/'
        ) {
          const newUrl = oldUrl + '.html'
          doc(node).attr('href', newUrl)
        }
      })

      page.html = doc.html()
    },
  },
  
  publicRuntimeConfig: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_API_URL: process.env.CTF_API_URL || 'cdn.contentful.com',

    CTF_CONTENT_TYPE_PAGE: process.env.CTF_CONTENT_TYPE_PAGE || 'page',
    CTF_CONTENT_TYPE_HOME: process.env.CTF_CONTENT_TYPE_HOME || 'home',
    CTF_CONTENT_TYPE_MENU: process.env.CTF_CONTENT_TYPE_MENU || 'menu',
    CTF_CONTENT_TYPE_CONTACT: process.env.CTF_CONTENT_TYPE_CONTACT || 'contact',
    CTF_CONTENT_TYPE_TESTIMONIAL: process.env.CTF_CONTENT_TYPE_TESTIMONIAL || 'testimonial',
    CTF_CONTENT_ID_MAIN_MENU: process.env.CTF_CONTENT_ID_MAIN_MENU || 'main-menu',
    CTF_CONTENT_ID_FOOTER_MENU: process.env.CTF_CONTENT_ID_FOOTER_MENU || 'footer-menu',

    FLK_BASE_URL: process.env.FLK_BASE_URL || 'https://api.flickr.com/services/rest',
    FLK_API_KEY: process.env.FLK_API_KEY,

    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID || 'UA-39475717-1'
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true
  },

  router: {
    linkExactActiveClass: 'current'
  },

  // Force generation of our routes from Contentful
  generate: {
    subFolders: false,
    crawler: false,
    fallback: '404.html',

    routes () {
      return Promise.all([
        client.getEntries({
          content_type: 'page'
        })
      ]).then(([blogEntries]) => {
        return [...blogEntries.items.map(entry => entry.fields.alias.replace('.html', ''))];
      });
    }
  }
}
