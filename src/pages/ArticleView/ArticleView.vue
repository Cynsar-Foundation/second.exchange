<template>
  <article className="ArticleView__container">
        <vue-markdown :source="article" />
    </article>
</template>

<script>
import './ArticleView.scss'
import VueMarkdown from 'vue-markdown-render'

export default {
  name: 'ArticleView',
  components: {
    VueMarkdown
  },
  setup() {
    const article = '# About The Project'
    return {
      article
    }
  }
}
</script>*/
