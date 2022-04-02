<template>
  <article className="ArticleView__container">
          <p v-html="getHTMLFromJSON(article)"></p>
    </article>
</template>

<script>
import './ArticleView.scss'
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
    }
  }
}
</script>
