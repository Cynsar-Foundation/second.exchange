<template>
  <q-layout>
    <div class="flex">
      <Header />
      <div class="hidden sm:flex w-1/4 justify-center px-8" />
      <div class="w-full sm:w-3/4 lg:w-2/4 pl-4" style="margin-bottom: 60px">
        <q-page>
          <router-view />
        </q-page>
      </div>
      <Footer />
    </div>
  </q-layout>
</template>
<script>
import helpersMixin from '../utils/mixin'
import Header from '../components/Header/Header.vue'
import Footer from '../components/Footer/Footer.vue'
import {pool} from '../pool'
import {addToThread} from '../utils/threads'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer
  },
  mixins: [helpersMixin],
  data() {
    return {
      initializeKeys: true,
      watchOnly: false,
      key: null,
      hasExtension: false,
      sub: null,
      notesSet: new Set()
    }
  },

  mounted() {
    this.$store.dispatch('initialize')

    this.threads = []
    this.eventsSet = new Set()
    this.sub = pool.sub(
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
              this.$store.state.homeFeed = this.threads
              return
          }
        },
        filter: [
          {
            authors: [
              'd27f3a85ed00f0faa0e4b03386fffd283ff3f8c9089f4ec4a13338a9d7844f54'
            ],
            kinds: [0, 1, 3]
          }
        ]
      },
      'profile-browser'
    )
  },
}
</script>
