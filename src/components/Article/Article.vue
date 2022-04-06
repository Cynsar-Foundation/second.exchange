<template>
  <article class="Article">
      <q-card flat bordered class="Article__card">
        <q-card-section class="Article__card-title" @click="openArticle(article[0]['id'], article)">
          <span>{{extractTitle(JSON.parse(article[0]['content'])['content'][0]['content'][0]['text'])}}</span>
        </q-card-section>
        <q-card-section class=Article__card-date>
          <div>{{toDateTime(article[0]['created_at'])}}</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="Article__card-body">
          {{extractPostBody(JSON.parse(article[0]['content']))}}
        </q-card-section>
      </q-card>
    </article>
</template>

<script>
import './Article.scss'

export default {
  name: 'Article',
  // eslint-disable-next-line vue/require-prop-types
  props: ['article'],
  methods: {
    extractPostBody(postContent) {
      let postBody = ''
      for (let i = 1; i < postContent.content.length; i++) {
        if (postContent.content[i].content)
          // console.log(postContent.content[i].content[0].text)
          postBody += postContent.content[i].content[0].text
        // if (blogContent.content[i])
        //   blogBody += blogContent.content[i].content[0]['text']
      }
      return this.truncateContent(postBody, 350)
    },
    truncateContent(content, maxLength = 250) {
      if (content.length > maxLength)
        return content.substring(0, maxLength) + '...'
      else
        return content
    },
    extractTitle(content) {
      return this.truncateContent(content.slice(0, 40), 42)
    },
    toDateTime(secs) {
      var date = new Date(1970, 0, 1)
      date.setSeconds(secs)
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours || 12
      minutes = minutes < 10 ? '0' + minutes : minutes
      var strTime = hours + ':' + minutes + ' ' + ampm
      var formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime
      return formattedDate.slice(0, 11)
    },
    openArticle(id, post) {
      this.$router.push({name: 'post', params: {eventId: id, article: post[0]['content']}})
    }
  }
}
</script>
