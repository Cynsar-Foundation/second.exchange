<template>
  <q-layout>
    <div class="flex">
      <Header />
      <div class="hidden sm:flex w-1/4 justify-center px-8" />
      <div class="w-full sm:w-3/4 lg:w-2/4 pl-4">
        <q-page>
          <router-view />
        </q-page>
      </div>
    </div>
  </q-layout>
</template>
<script>
import helpersMixin from '../utils/mixin'
import {validateWords} from 'nostr-tools/nip06'
import {generatePrivateKey} from 'nostr-tools'
import Header from '../components/Header/Header.vue'
import {pool} from '../pool'
import {addToThread} from '../utils/threads'

export default {
  name: 'MainLayout',
  components: {
    Header
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

  computed: {
    icon() {
      return document.getElementById('icon').href
    },

    isKeyKey() {
      if (this.isKey(this.key)) return true
      return false
    },

    isKeyValid() {
      if (this.isKeyKey) return true
      if (validateWords(this.key?.toLowerCase())) return true
      return false
    }
  },

  methods: {
    async getFromExtension() {
      try {
        this.key = await window.nostr.getPublicKey()
        this.watchOnly = true
      } catch (err) {
        this.$q.notify({
          message: `Failed to get a public key from a Nostr extension: ${err}`,
          color: 'warning'
        })
      }
    },

    generate() {
      this.key = generatePrivateKey()
      this.watchOnly = false
    },

    proceed() {
      let key = this.key?.toLowerCase()

      var keys = {}
      if (validateWords(key)) {
        keys.mnemonic = key
      } else if (this.isKey(key)) {
        if (this.watchOnly) keys.pub = key
        else keys.priv = key
      } else {
        console.warn('Proceed called with invalid key', key)
      }

      this.$store.dispatch('initKeys', keys)
      this.$store.dispatch('launch')
      this.initializeKeys = false
      // this.$router.push({
      //   name: 'settings',
      //   params: {showKeys: true}
      // })
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
              authors: ['7b0ba10b13233979d17e545d56b1c1f6563ce0c9b0d1f3691b5ad3bf3cced6c0'],
              kinds: [0, 1, 3]
            }
          ],
        },
        'profile-browser'
      )
    },

    isKey(key) {
      return key?.toLowerCase()?.match(/^[0-9a-f]{64}$/)
    }
  }
}
</script>
