<template>
  <div>
    <Carousel :img="'/img/carousel/thin/thin-4.jpg'" />
    <main>
      <section>
        <h2>Sitemap</h2>
      </section>
      <article>
        List of pages to go here
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
