<template>
  <article className="Article">
      <q-card flat bordered class="Article__card">
        <!-- <q-card-section class=Article__card-title @click="openArticle"> -->
        <q-card-section class="Article__card-title" @click="openArticle">
          <span>Our Changing Planet</span>
        </q-card-section>
        <q-card-section class=Article__card-date>
          <div>Date</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="Article__card-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </q-card-section>
      </q-card>
    </article>
</template>

<script>
import './Article.scss'

export default {
  name: 'Article',
  methods: {
    openArticle() {
      this.$router.push(this.toProfile(this.event.pubkey))
    }
  }
}
</script>
