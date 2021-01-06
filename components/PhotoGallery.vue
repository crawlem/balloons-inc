<template>
  <section class="gallery" :class="galleryClass">
    <h2>Gallery</h2>
  </section>
</template>

<script>
export default {
  name: 'PhotoGallery',
  props: {
    galleryPrefix: {
      type: Number,
      default () {
        return null
      },
      required: true
    },
    galleryId: {
      type: Number,
      default () {
        return null
      },
      required: true
    }
  },
  computed: {
    galleryClass () {
      return 'gallery-' + this.galleryPrefix + this.galleryId
    }
  }
}
</script>
