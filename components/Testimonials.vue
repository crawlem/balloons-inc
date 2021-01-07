<template>
  <section class="testimonial">
    <h1>Testimonials</h1>
    <p>
      {{ filteredItems[randomIndex].fields.quote }}
      <a :href="filteredItems[randomIndex].fields.link">View</a>
    </p>
  </section>
</template>

<script>
export default {
  name: 'Testimonials',
  props: {
    testimonials: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  computed: {
    filteredItems () {
      return this.testimonials.filter(this.isNotEmpty)
    },
    randomIndex () {
      return this.filteredItems.length * Math.random() | 0
    }
  },
  methods: {
    isNotEmpty (item) {
      return item.fields
    }
  }
}
</script>
