<template>
  <div class="contact">
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
        <div class="message invalid" />
        <form
          accept-charset="UTF-8"
          autocomplete="off"
          enctype="multipart/form-data"
          method="post"
          action="https://balloonsinc.wufoo.co.uk/forms/z153dv060hxo0z6/#public"
          class="contact-form"
        >
          <div class="field field-inline">
            <label for="fld-name" class="required">Name</label>
            <input id="fld-name" name="Field1" maxlength="255" required>
          </div>
          <div class="field field-inline">
            <label for="fld-email" class="required">Email</label>
            <input id="fld-email" name="Field3" type="email" spellcheck="false" required>
          </div>
          <div class="field field-inline">
            <label for="fld-phone">Phone</label>
            <input id="fld-phone" name="Field4" maxlength="255">
          </div>
          <div class="field field-inline">
            <label for="fld-venue">Venue</label>
            <input id="fld-venue" name="Field5" maxlength="255">
          </div>
          <div class="field field-inline">
            <label for="fld-date">Date</label>
            <input id="fld-date" name="Field6" type="date" maxlength="255">
          </div>
          <div class="field field-inline">
            <label for="fld-time">Time</label>
            <input id="fld-time" name="Field7" type="time" maxlength="255">
          </div>
          <div class="field">
            <label for="fld-message">Message</label>
            <textarea id="fld-message" name="Field8" spellcheck="true" />
          </div>
          <div class="buttons">
            <button type="submit">
              Send
            </button>
          </div>
          <input id="idstamp" type="hidden" name="idstamp" value="+fOZMQNA3nx8NuSE7zyoo/wupmduwSpiENBRk6woICE=">
        </form>
      </article>
    </main>
    <Testimonials v-if="page.fields.showTestimonials" :testimonials="testimonials" />
  </div>
</template>

<script>
import Carousel from '~/components/Carousel.vue'
import Testimonials from '~/components/Testimonials.vue'
export default {
  components: {
    Carousel,
    Testimonials
  },
  asyncData ({ $config, $contentful, route }) {
    return Promise.all([
      $contentful.getEntries({
        content_type: $config.CTF_CONTENT_TYPE_CONTACT,
        'fields.alias[match]': route.path
      }),
      $contentful.getEntries({
        content_type: $config.CTF_CONTENT_TYPE_TESTIMONIAL
      })
    ]).then(([page, testimonials]) => {
      return {
        page: page.items[0],
        testimonials: testimonials.items
      }
    // eslint-disable-next-line
    }).catch(console.error)
  },
  head () {
    return {
      title: 'Balloons Inc. | ' + this.page.fields.title
    }
  }
}
</script>
