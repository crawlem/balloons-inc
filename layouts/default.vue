<template>
  <div class="container">
    <MainMenu :menu-items="mainMenu.fields.items" />
    <Nuxt />
    <FooterMenu :menu-items="footerMenu.fields.items" />
  </div>
</template>

<script>
import MainMenu from '~/components/MainMenu.vue'
import FooterMenu from '~/components/FooterMenu.vue'
export default {
  components: {
    MainMenu,
    FooterMenu
  },
  fetch () {
    return Promise.all([
      this.$contentful.getEntries({
        content_type: this.$config.CTF_CONTENT_TYPE_MENU,
        'fields.alias[match]': this.$config.CTF_CONTENT_ID_MAIN_MENU
      }),
      this.$contentful.getEntries({
        content_type: this.$config.CTF_CONTENT_TYPE_MENU,
        'fields.alias[match]': this.$config.CTF_CONTENT_ID_FOOTER_MENU
      }),
      this.$contentful.getEntries({
        content_type: this.$config.CTF_CONTENT_TYPE_TESTIMONIAL
      })
    ]).then(([mainMenu, footerMenu, testimonials]) => {
      this.mainMenu = mainMenu.items[0]
      this.footerMenu = footerMenu.items[0]
      this.testimonials = testimonials
    }).catch(console.error)
  },
  data () {
    return {
      mainMenu: [],
      footerMenu: [],
      testimonials: []
    }
  }
}
</script>
