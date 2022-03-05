<template>
  <q-page class="px-4 pt-6">
    <button style="margin-top: 100px" @click="logFromHome">Home log</button>
    <q-infinite-scroll v-if="notes" :disable="reachedEnd" :offset="150" @load="loadMore">
      <!-- <Thread v-for="thread in homeFeed" :key="thread[0].id" :events="thread" /> -->
      <!-- <ArticleList v-for="thread in homeFeed" :key="thread[0].id" :events="thread" /> -->
      <ArticleList v-for="thread in homeFeed" :key="thread[0].id" :events="thread" />
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import helpersMixin from '../utils/mixin'
import {addToThread} from '../utils/threads'
import {dbGetHomeFeedNotes } from '../db'
import ArticleList from '../components/ArticleList/ArticleList.vue'

export default {
  name: 'Home',
  components: {
    ArticleList,
  },
  mixins: [helpersMixin],

  data() {
    return {
      listener: null,
      reachedEnd: false,
      homeFeed: [],
      notesSet: new Set(),
      notes: this.$store.state.homeFeed
    }
  },
  async mounted() {
//     let notes = await dbGetHomeFeedNotes(50)
     let notes = await this.$store.state.homeFeed[0]
     console.log('yes')
     if (notes.length > 0) {
       this.reachedEnd = false
     }
     console.log(notes)
     for (let i = notes.length - 1; i >= 0; i--) {
       addToThread(this.homeFeed, notes[i])
       this.notesSet.add(notes[i].id)
     }
   },

  async beforeUnmount() {
    if (this.listener) this.listener.cancel()
  },

  methods: {
    logFromHome() {
        console.log(this.$store.state.homeFeed)
    },
    async loadMore(_, done) {
      if (this.homeFeed.length === 0) {
        this.reachedEnd = true
        done()
        return
      }

      let loadedNotes = await dbGetHomeFeedNotes(
        50,
        Math.min.apply(
          Math,
          this.homeFeed.flat().map(event => event.created_at)
        ) - 1
      )
      if (loadedNotes.length === 0) {
        this.reachedEnd = true
      }
      for (let i = loadedNotes.length - 1; i >= 0; i--) {
        addToThread(this.homeFeed, loadedNotes[i])
        this.notesSet.add(event.id)
      }
      done()
    }
  }
}
</script>
