<template>
  <section class="testimonial">
    <h1>Testimonials</h1>
    <p>
      "Dummy text"
      <a href="https://www.facebook.com/amystock/activity/10155803089735386">View</a>
    </p>
  </section>
</template>

<script>
export default {
  name: 'Testimonials',
  props: {
    testimonials: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  computed: {
    filteredItems () {
      return this.testimonials.filter(this.isNotEmpty)
    }
  },
  methods: {
    isNotEmpty (item) {
      return item.fields
    }
  }
}
</script>
