<template>
  <section class="gallery">
    <h2>Gallery</h2>
    <vue-horizontal class="horizontal" :button-between="false">
      <div v-for="(photo) in photos" :key="photo.id" class="horizontal-item">
        <img :src="photo.url_m" />
      </div>
    </vue-horizontal>
  </section>
</template>

<script>
import VueHorizontal from 'vue-horizontal'
export default {
  name: 'PhotoGallery',
  components: {
    VueHorizontal
  },
  props: {
    photos: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  }
}
</script>

<style>
.horizontal-item {
  max-height: 250px;
}
</style>
