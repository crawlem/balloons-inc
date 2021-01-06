<template>
  <div>
    <Carousel :img="page.fields.headerImage.fields.file.url" />
    <main>
      <section>
        <h2>{{ page.fields.title }}</h2>
        <p v-if="page.fields.intro">
          <strong>{{ page.fields.intro }}</strong>
        </p>
      </section>
      <article>
        <div v-html="$md.render(page.fields.body)" />
        <p>
          <NuxtLink to="/contact" class="button">Book now</NuxtLink>
        </p>
      </article>
    </main>
    <PhotoGallery v-if="page.fields.gallery" :galleryId="page.fields.gallery.fields.id" :galleryPrefix="page.fields.gallery.fields.prefix" />
    <Testimonials v-if="page.fields.showTestimonials" :testimonials="testimonials" />
  </div>
</template>

<script>
import Carousel from '~/components/Carousel.vue'
import PhotoGallery from '~/components/PhotoGallery.vue'
import Testimonials from '~/components/Testimonials.vue'
export default {
  components: {
    Carousel,
    PhotoGallery,
    Testimonials
  },
  asyncData ({ $config, $contentful, route }) {
    console.log('asyncdata ' + route.path)
    return Promise.all([
      $contentful.getEntries({
        content_type: $config.CTF_CONTENT_TYPE_PAGE,
        'fields.alias[match]': route.path
      })
    ]).then(([page]) => {
      return {
        page: page.items[0]
      }
    }).catch(console.error)
  },
  computed: {
    bodyClass () {
      return this.page.fields.alias.replace(/^\/|\/$/g, '')
    }
  },
  mounted () {
    document.body.classList.add('page')
  },
  destroyed () {
    document.body.classList.remove('page')
  },
  head () {
    return {
      title: 'Balloons Inc. | ' + this.page.fields.title
    }
  }
}
</script>
