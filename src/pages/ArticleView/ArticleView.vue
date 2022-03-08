<template>
  <article className="ArticleView__container">
        <Markdown>
          {{article}}
        </Markdown>
    </article>
</template>

<script>
import './ArticleView.scss'
// import VueMarkdown from 'vue-markdown-render'

export default {
  name: 'ArticleView',
  components: {
  },
  setup() {
    const article = '# About The Project'
    return {
      article
    }
  }
}
</script>*/
