<template>
  <article className="Article">
      <q-card flat bordered class="Article__card">
        <!-- <q-card-section class=Article__card-title @click="openArticle"> -->
        <q-card-section class="Article__card-title" @click="openArticle">
          <span>{{extractTitle(article[0]['content'])}}</span>
        </q-card-section>
        <q-card-section class=Article__card-date>
          <div>{{toDateTime(article[0]['created_at'])}}</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="Article__card-body">
          {{truncateContent(article[0]['content'])}}
        </q-card-section>
      </q-card>
    </article>
</template>

<script>
import './Article.scss'

export default {
  name: 'Article',
  props: ['article'],
  methods: {
    truncateContent(content, maxLength = 250) {
      return content.substring(0, maxLength) + '...'
    },
    extractTitle(content) {
      return this.truncateContent(content.slice(0, 18), 20)
    },
    toDateTime(secs) {
      var date = new Date(1970, 0, 1)
      date.setSeconds(secs)
      // this.formatDate(t)
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours || 12
      minutes = minutes < 10 ? '0' + minutes : minutes
      var strTime = hours + ':' + minutes + ' ' + ampm
      var formattedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime
      return formattedDate.slice(0, 8)
    },
    openArticle() {
      this.$router.push('/post/' + 'defaultarticle')
    }
  }
}
</script>
