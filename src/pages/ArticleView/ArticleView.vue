<template>
  <article className="ArticleView__container">
        <Markdown>
          {{article}}
        </Markdown>
    </article>
</template>

<script>
import './ArticleView.scss'

export default {
  name: 'ArticleView',
  // eslint-disable-next-line vue/require-prop-types
  props: ['article'],
  methods: {
    showArticle(post) {
      console.log(post)
    }
  }
}
</script>
