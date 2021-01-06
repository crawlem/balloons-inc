<template>
  <footer>
    <ul>
      <li v-for="item in filteredItems" :key="item.sys.id">
        <NuxtLink :to="item.fields.alias">
          {{ item.fields.title }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sitemap">
          Sitemap
        </NuxtLink>
      </li>
      <li>© balloonsinc {{ new Date().getFullYear() }}</li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'FooterMenu',
  props: {
    menuItems: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  computed: {
    filteredItems () {
      return this.menuItems.filter(this.isNotEmpty)
    }
  },
  methods: {
    isNotEmpty (item) {
      return item.fields
    }
  }
}
</script>
