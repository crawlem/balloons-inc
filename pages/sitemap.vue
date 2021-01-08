<template>
  <div>
    <Carousel :img="'/img/carousel/thin/thin-4.jpg'" />
    <main>
      <section>
        <h2>Sitemap</h2>
      </section>
      <article>
        Each page of this website is listed below.
        <ul>
          <li v-for="page in sitemap" :key="page.sys.id">
            <NuxtLink to="page.fields.alias">
              {{ page.fields.title }}
            </NuxtLink>
          </li>
        </ul>
      </article>
    </main>
  </div>
</template>

<script>
import Carousel from '~/components/Carousel.vue'
export default {
  components: {
    Carousel
  },
  async asyncData ({ $config, $contentful }) {
    const home = await $contentful.getEntries({ content_type: $config.CTF_CONTENT_TYPE_HOME })
    const pages = await $contentful.getEntries({ content_type: $config.CTF_CONTENT_TYPE_PAGE })
    const contact = await $contentful.getEntries({ content_type: $config.CTF_CONTENT_TYPE_CONTACT })

    // Merge all content types together in a single array
    const sitemap = []
    if (home.items.length > 0) {
      sitemap.push(home.items[0])
    }
    if (pages.items.length > 0) {
      for (const page in pages.items) {
        sitemap.push(pages.items[page])
      }
    }
    if (contact.items.length > 0) {
      sitemap.push(contact.items[0])
    }

    // Sort pages alphabetically by title
    sitemap.sort((a, b) => {
      const fa = a.fields.title.toLowerCase()
      const fb = b.fields.title.toLowerCase()

      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })

    return {
      sitemap
    }
  },
  mounted () {
    document.body.classList.add('sitemap')
  },
  destroyed () {
    document.body.classList.remove('sitemap')
  },
  head () {
    return {
      title: 'Balloons Inc. | Sitemap'
    }
  }
}
</script>
