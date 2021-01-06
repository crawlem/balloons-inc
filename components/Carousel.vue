<template>
  <div class="carousel" :style="style">
    <div class="carousel-content">
      <div class="carousel-logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    img: {
      type: String,
      default: '',
      required: false
    }
  },
  computed: {
    style () {
      return (this.img) ? 'background-image: url(\'' + this.img + '\')' : ''
    }
  }
}
</script>
