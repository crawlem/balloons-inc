<template>
  <div class="home">
    <Carousel />
    <main>
      <section class="content">
        <p>{{ page.fields.intro }}</p>
        <span v-html="$md.render(page.fields.body)" />
      </section>
      <section class="services">
        <h1>Balloon Model Services</h1>
        <ul>
          <li v-for="tile in page.fields.tiles" :key="tile.sys.id">
            <NuxtLink :to="'/' + tile.fields.alias">
              <h2>{{ tile.fields.title }}</h2>
              <p>{{ tile.fields.intro }}</p>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </main>
    <Testimonials v-if="page.fields.showTestimonials" :testimonials="testimonials" />
  </div>
</template>

<script>
import Carousel from '~/components/Carousel.vue'
import Testimonials from '~/components/Testimonials.vue'
export default {
  components: {
    Carousel,
    Testimonials
  },
  asyncData ({ $config, $contentful, route }) {
    return Promise.all([
      $contentful.getEntries({
        content_type: $config.CTF_CONTENT_TYPE_HOME,
        'fields.alias[match]': route.path
      }),
      $contentful.getEntries({
        content_type: $config.CTF_CONTENT_TYPE_TESTIMONIAL
      })
    ]).then(([page, testimonials]) => {
      return {
        page: page.items[0],
        testimonials: testimonials.items
      }
    // eslint-disable-next-line
    }).catch(console.error)
  }
}
</script>
