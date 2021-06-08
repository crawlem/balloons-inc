<template>
  <div class="page">
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
          <NuxtLink to="/contact.html" class="button">
            Book now
          </NuxtLink>
        </p>
      </article>
    </main>
    <PhotoGallery v-if="photos.length > 0" :photos="photos" />
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
  async asyncData ({ $config, $contentful, $flickr, route }) {
    const slug = route.path.replace('.html', '').replace('/', '')

    const page = await $contentful.getEntries({ content_type: $config.CTF_CONTENT_TYPE_PAGE, 'fields.alias[match]': slug })
    const testimonials = await $contentful.getEntries({ content_type: $config.CTF_CONTENT_TYPE_TESTIMONIAL })

    let photos = []
    if (page.items && page.items.length && page.items[0].fields.gallery) {
      const galleryId = page.items[0].fields.gallery.fields.prefix.toString() + page.items[0].fields.gallery.fields.id.toString()
      const photoResponse = await $flickr.get('?method=flickr.photosets.getPhotos&extras=url_m&photoset_id=' + galleryId + '&format=json&api_key=' + $config.FLK_API_KEY + '&nojsoncallback=1')
      photos = await photoResponse.json()
      photos = photos.photoset.photo
    }

    return {
      page: page.items[0],
      testimonials: testimonials.items,
      photos
    }
  },
  head () {
    return {
      title: 'Balloons Inc. | ' + this.page.fields.title
    }
  }
}
</script>
