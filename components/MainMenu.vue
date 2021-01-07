<template>
  <header>
    <h1>
      <NuxtLink to="/">
        Balloons Inc.
      </NuxtLink>
    </h1>
    <nav>
      <h2>Main Menu</h2>
      <ul>
        <li class="burger">
          <a href="/sitemap" @click.prevent="toggleBurger()">
            <abbr title="All menu items">&#x2261;</abbr>
          </a>
        </li>
        <li>
          <ul :class="burgerClass">
            <!-- TODO Active class needs to be set to 'current' -->
            <li v-for="item in menuItems" :key="item.sys.id">
              <NuxtLink :to="item.fields.alias">
                {{ item.fields.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li><a href="https://twitter.com/balloonsinc">Twitter</a></li>
        <li><a href="https://www.facebook.com/balloonsinc">Facebook</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainMenu',
  props: {
    menuItems: {
      type: Array,
      default () {
        return []
      },
      required: true
    }
  },
  data () {
    return {
      burgerActive: false
    }
  },
  computed: {
    burgerClass () {
      return (this.burgerActive) ? 'toggle' : ''
    }
  },
  methods: {
    toggleBurger (e) {
      this.burgerActive = !this.burgerActive
      return false
    }
  }
}
</script>
