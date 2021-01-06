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
          <NuxtLink to="/sitemap">
            <abbr title="All menu items">&#x2261;</abbr>
          </NuxtLink>
        </li>
        <li>
          <ul>
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
  }
}
</script>
