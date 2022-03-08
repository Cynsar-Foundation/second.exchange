<template>
      <!-- <div
        v-for="articleData in nostrArticles"
        className="ArticleList"
      > -->
      <!-- <Article key={articleData.id} item={articleData} /> -->
      <Article />
    <!-- </div> -->
</template>

<script>
import './ArticleList.scss'
import Article from '../Article/Article.vue'
// import { nostrEventState } from 'src/application/states/relay.state';

export default {
  name: 'ArticleList',
  components: {
    Article
  }
}
</script>
