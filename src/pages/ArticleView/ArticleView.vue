<template>
  <article class="ArticleView__container">
    <button
      :disabled="rawData"
      class="ArticleView__button"
      @click="displayRichText"
    >
      Display Rich Text
    </button>
    <br />
    <!-- <p v-if="article !== undefined" v-html="getHTMLFromJSON(article)"></p> -->
    <p v-if="rawData === false" v-html="postData"></p>
    <p v-if="rawData === true" v-html="postData"></p>
  </article>
  <div class="ArticleView__reply-container">
    <Reply :event="replyEvent" />
  </div>
  <div v-if="childrenThreads.length" class="ArticleView__replies">
    <q-separator class="my-2" />
    <div class="text-lg mx-4 mt-6 mb-4">Comments</div>
    <div v-for="thread in childrenThreads" :key="thread[0].id">
      <Thread :events="thread" />
      <q-separator />
    </div>
  </div>
</template>

<script>
import './ArticleView.scss'
import {pool} from '../../pool'
import {addToThread} from '../../utils/threads'
import {generateHTML} from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Heading from '@tiptap/extension-heading'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import CodeBlock from '@tiptap/extension-code-block'
import DropCursor from '@tiptap/extension-dropcursor'
import FloatingMenu from '@tiptap/extension-floating-menu'
import GapCursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import History from '@tiptap/extension-history'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import Strike from '@tiptap/extension-strike'
import Placeholder from '@tiptap/extension-placeholder'

export default {
  name: 'ArticleView',
  // eslint-disable-next-line vue/require-prop-types
  props: ['article'],
  data() {
    return {
      childrenThreads: [],
      userPosts: [],
      postData: '',
      rawData: false,
      replyEvent: {
        tags: [['e', this.getPostID()]]
      }
    }
  },
  created() {
    setTimeout(async () => {
      await this.getAuthorPosts()
    }, 200)
    this.listenChildren()
  },
  methods: {
    async displayRichText() {
      this.rawData = true
      await this.getHTMLFromJSON(this.postData)
    },
    getAuthorID() {
      const url = window.location.href
      const authorPubkey = url.split('/').at(-2)
      return authorPubkey
    },
    getPostID() {
      const url = window.location.href
      const authorPubkey = url.split('/').at(-1)
      return authorPubkey
    },
    async getHTMLFromJSON(content) {
      this.postData = generateHTML(JSON.parse(content), [
        Document,
        Paragraph,
        Text,
        Bold,
        Heading,
        OrderedList,
        BulletList,
        CodeBlock,
        DropCursor,
        FloatingMenu,
        GapCursor,
        HardBreak,
        History,
        HorizontalRule,
        Italic,
        ListItem,
        Strike,
        Placeholder
        // other extensions …
      ])
    },
    async getAuthorPosts() {
      const authorKey = this.getAuthorID()
      const postID = this.getPostID()

      this.$store.dispatch('initialize')

      this.threads = []
      this.eventsSet = new Set()
      this.sub = await pool.sub(
        {
          cb: async (event, relay) => {
            switch (event.kind) {
              case 0:
                await this.$store.dispatch('addEvent', {event, relay})
                return
              case 1:
              case 2:
                if (this.eventsSet.has(event.id)) return
                this.eventsSet.add(event.id)
                addToThread(this.threads, event)
                this.userPosts = this.threads
                if (this.threads[0][0]['id'] === postID) {
                  this.postData = this.threads[0][0]['content']
                }
                return
            }
          },
          filter: [
            {
              authors: [authorKey],
              kinds: [0, 1, 3]
            }
          ]
        },
        'profile-browser'
      )
    },
    listenChildren() {
      this.childrenThreads = []
      this.childrenSeen = new Map()
      this.childrenSub = pool.sub(
        {
          filter: [
            {
              '#e': [this.$route.params.eventId],
              kinds: [1]
            }
          ],
          cb: async (event, relay) => {
            let existing = this.childrenSeen.get(event.id)
            if (existing) {
              existing.seen_on.push(relay)
              return
            }

            event.seen_on = [relay]
            this.childrenSeen.set(event.id, event)

            this.$store.dispatch('useProfile', {pubkey: event.pubkey})

            addToThread(this.childrenThreads, event)
            return
          }
        },
        'event-children'
      )
    }
  }
}
</script>
