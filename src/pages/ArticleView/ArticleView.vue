<template>
  <article className="ArticleView__container">
    <p v-html="getHTMLFromJSON(article)"></p>
  </article>
  <div class="ArticleView__reply-container">
    <Reply />
  </div>
  <div>
  </div>
  <div v-if="childrenThreads.length">
      <q-separator class="my-2" />
      <div class="text-lg mx-4 mt-6 mb-4">Replies</div>
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
import { generateHTML } from '@tiptap/core'
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
      childrenThreads: []
    }
  },
  methods: {
    getHTMLFromJSON(content) {
      console.log(content)
      return generateHTML(JSON.parse(content), [
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
    },
  }
}
</script>
