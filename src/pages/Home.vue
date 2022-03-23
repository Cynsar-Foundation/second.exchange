<template>
  <q-page class="px-4 pt-6">
    <q-infinite-scroll :disable="reachedEnd" :offset="150" @load="loadMore">
      <!-- <Thread v-for="thread in homeFeed" :key="thread[0].id" :events="thread" /> -->
      <!-- <ArticleList v-for="thread in homeFeed" :key="thread[0].id" :events="thread" /> -->
      <!-- <ArticleList v-for="thread in notes" :key="thread[0].id" :events="thread" /> -->
      <ArticleList :article-list="notes" />
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
    }
  },
  computed: {
    notes() {
      return this.$store.state.homeFeed
    }
  },

  methods: {
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
