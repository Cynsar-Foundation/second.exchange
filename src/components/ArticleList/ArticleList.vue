<template>
  <div class="flex my-4 ml-[25px] articlelist">
    <button
      v-show="delayShow"
      v-if="!showPosts"
      class="show-posts"
      @click="makePostsVisible"
    >
        Explore Posts
    </button>
      <div v-if="showPosts" v-show="delayShow">
        <Article v-for="article in articleList" :key="article" />
      </div>
    </div>
</template>

<script>
import helpersMixin from '../../utils/mixin'
import Article from '../Article/Article.vue'
import './ArticleList.scss'

export default {
  name: 'ArticleList',
  components: {
    Article
  },
  mixins: [helpersMixin],
  props: {
//     events: {type: Array, required: true},
//     isAncestors: {type: Boolean, default: false}
    // eslint-disable-next-line vue/require-valid-default-prop
    articleList: {type: [Object], default: false}
  },
  data() {
    return {
      showPosts: false,
      delayShow: false,
    }
  },
  computed: {
    root() {
      return this.events[0].id
    },

    filledEvents() {
      if (this.events.length === 0) return []

      var filled = [this.events[0]]
      for (let i = 1; i < this.events.length; i++) {
        let curr = this.events[i]
        let prev = this.events[i - 1]
        if (curr.tags[curr.tags.length - 1][1] !== prev.id) {
          filled.push('FILLER')
        }

        filled.push(curr)
      }

      return filled
    }
  },
  created() {
    setTimeout(() => {
      this.delayShow = true
    }, 1000)
  },

  methods: {
    position(index) {
      if (!this.isAncestors) {
        // normal thread
        if (this.filledEvents.length === 1) return 'single'
        if (index === 0) return 'first'
        if (index === this.filledEvents.length - 1) return 'last'
        return 'middle'
      } else {
        // in this mode the last event should have the left bar to the bottom,
        // as it will plug into the "main" event in the thread,
        // so 'single' is turned into 'first' and 'last' into 'middle'
        if (this.filledEvents.length === 1) return 'first'
        if (index === 0) return 'first'
        if (index === this.filledEvents.length - 1) return 'middle'
        return 'middle'
      }
    },
    makePostsVisible() {
      this.showPosts = true
    },
  }
}
</script>
