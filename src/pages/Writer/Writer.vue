<template>
  <div style="max-width: 1000px" class="writer__container">
    <form class="q-gutter-md">
      <li class="writer__input-item">
        <input
          v-model="title_input"
          filled
          autofocus
          placeholder="Title"
          class="writer__title-input writer__input"
        />
      </li>
      <li class="writer__input-item">
        <input
          v-model="tag_input"
          filled
          placeholder="Tags"
          class="writer__tag-input writer__input"
        />
      </li>
      <li class="writer__input-item">
        <textarea
          v-model="content_input"
          filled
          placeholder="Content"
          class="writer__textarea writer__input"
        />
      </li>
      <div>
        <q-btn
          label="Submit"
          type="button"
          color="transparent"
          flat
          text-color="black"
          class="writer__button"
          @click="sendPost"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="writer__button"
          text-color="black"
        />
      </div>
    </form>
  </div>
</template>

<script>
import './Writer.scss'

export default {
  name: 'Writer',
  methods: {
    async sendPost() {
      const userBlog = {'Title': this.title_input, 'Tags': this.tag_input, 'Content': this.content_input}
      console.log(userBlog)
      if (!this.title_input) {
        return
      }
      await this.$store.dispatch('sendPost', {message: JSON.stringify(userBlog)})
      // let event = await this.$store.dispatch('sendPost', {message: JSON.stringify(userBlog)})
      // if (event) this.toEvent(event.id)
    }
  }
}
</script>
