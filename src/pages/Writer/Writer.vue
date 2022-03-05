<template>
  <div style="max-width: 1000px" class="writer__container">
    <q-form
      class="q-gutter-md"
      @submit="sendPost"
    >
    <q-input
      v-model="title_input"
      filled
      autofocus
      label="Title"
    />
    <q-input
      v-model="tag_input"
      filled
      label="Tags"
    />
    <q-input
      v-model="content_input"
      filled
      label="Content"
      type="textarea"
    />
    <div>
      <q-btn label="Submit" type="submit" color="transparent" flat text-color="black" class="writer__button" />
      <q-btn label="Reset" type="reset" color="primary" flat class="writer__button" text-color="black" />
    </div>
  </q-form>
  </div>
</template>

<script>
import './Writer.scss'

export default {
    name: 'Writer',
    methods: {
      async sendPost() {
        console.log(this.content_input)
        // if (!this.text.length) {
        //   return
        // }
        // let event = await this.$store.dispatch('sendPost', {message: this.text})
        // if (event) this.toEvent(event.id)
      }
  }
}
</script>
