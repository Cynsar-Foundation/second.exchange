<template>
  <div class="writer__container">
    <div class="editor__container">
      <div v-if="editor">
        <div class="formatting-list">
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('paragraph')}"
            @click="editor.chain().focus().setParagraph().run()"
          >
            paragraph
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('heading', {level: 1})}"
            @click="editor.chain().focus().toggleHeading({level: 1}).run()"
          >
            h1
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('heading', {level: 2})}"
            @click="editor.chain().focus().toggleHeading({level: 2}).run()"
          >
            h2
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('heading', {level: 3})}"
            @click="editor.chain().focus().toggleHeading({level: 3}).run()"
          >
            h3
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('heading', {level: 4})}"
            @click="editor.chain().focus().toggleHeading({level: 4}).run()"
          >
            h4
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('heading', {level: 5})}"
            @click="editor.chain().focus().toggleHeading({level: 5}).run()"
          >
            h5
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('heading', {level: 6})}"
            @click="editor.chain().focus().toggleHeading({level: 6}).run()"
          >
            h6
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('bulletList')}"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            bullet list
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('orderedList')}"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >
            ordered list
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('codeBlock')}"
            @click="editor.chain().focus().toggleCodeBlock().run()"
          >
            code block
          </button>
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('blockquote')}"
            @click="editor.chain().focus().toggleBlockquote().run()"
          >
            blockquote
          </button>
          <button
            class="formatting-option"
            @click="editor.chain().focus().unsetAllMarks().run()"
          >
            clear marks
          </button>
          <button
            class="formatting-option"
            @click="editor.chain().focus().clearNodes().run()"
          >
            clear nodes
          </button>
          <button
            class="formatting-option"
            @click="editor.chain().focus().setHorizontalRule().run()"
          >
            horizontal rule
          </button>
          <button
            class="formatting-option"
            @click="editor.chain().focus().setHardBreak().run()"
          >
            hard break
          </button>
          <button
            class="formatting-option"
            @click="editor.chain().focus().undo().run()"
          >
            undo
          </button>
          <button
            class="formatting-option"
            @click="editor.chain().focus().redo().run()"
          >
            redo
          </button>
        </div>
        <bubble-menu
          class="bubble-menu"
          :tippy-options="{duration: 100}"
          :editor="editor"
        >
          <button
            class="formatting-option"
            :class="{'is-active': editor.isActive('bold')}"
            @click="editor.chain().focus().toggleBold().run()"
          >
            Bold
          </button>
          <button
            :class="{'is-active': editor.isActive('italic')}"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            Italic
          </button>
          <button
            :class="{'is-active': editor.isActive('strike')}"
            @click="editor.chain().focus().toggleStrike().run()"
          >
            Strike
          </button>
        </bubble-menu>
      </div>
      <div contentEditable="true" data-text="Enter text here"></div>
      <editor-content :editor="editor" class="writer__editor" />
    </div>
    <button class="writer__post-button" @click="onPost">Post</button>
  </div>
</template>

<script>
import {Editor, EditorContent, BubbleMenu} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import {Notify} from 'quasar'
import './Writer.scss'

const CustomDocument = Document.extend({
  content: 'heading block*'
})

export default {
  name: 'Writer',
  components: {
    EditorContent,
    BubbleMenu
  },

  data() {
    return {
      editor: null
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        CustomDocument,
        StarterKit.configure({
          document: false
        }),
        Placeholder.configure({
          placeholder: ({node}) => {
            if (node.type.name === 'heading') {
              return 'What’s the title?'
            }
            return 'Can you add some further context?'
          }
        })
      ],
      content: `
        <h1 style="font-weight: bold">
          Add a heading
        </h1>
        <p>
          Start writing here
        </p>
      `
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
    async onPost() {
      const blogContent = this.editor.getJSON()
      const blogTitle = blogContent.content[0].content[0]['text']
      const blogBody = blogContent.content[1].content[0]['text']
      if (blogTitle === 'Add a heading')
        Notify.create({
          message: `Add a title to your post first!`,
          color: 'negative'
        })
      else {
        if (blogBody === 'Start writing here')
          Notify.create({
            message: `Write your blog before posting!!`,
            color: 'negative'
          })
        else
          await this.$store.dispatch('sendPost', {
            message: JSON.stringify(blogContent)
          })
      }
    }
  }
}
</script>

<style>
[contentEditable='true']:empty:not(:focus):before {
  content: attr(data-text);
}
</style>
