<template>
  <q-layout>
    <div class="flex">
      <Header />
      <div class="hidden sm:flex w-1/4 justify-center px-8" />
      <div class="w-full sm:w-3/4 lg:w-2/4 pl-4">
        <q-page>
          <!-- <ArticleList /> -->
          <router-view />
        </q-page>
      </div>
    </div>
    <q-dialog v-model="initializeKeys" persistent>
      <q-card class="px-4 py-2">
        <q-card-section class="text-base">
          <div class="text-lg text-bold tracking-wide leading-relaxed py-2">
            Initial Key Setup
          </div>
          <div class="mb-2">
            Type your private key from a previous Nostr account or generate a
            new one.
          </div>
          <div>
            You can also type just a public key and later sign events manually
            or using a Nostr-capable browser extension.
          </div>

          <q-form @submit="proceed">
            <q-input
              v-model="key"
              autogrow
              autofocus
              label="Private key or public key"
              class="text-lg"
            />
            <q-toggle
              v-if="isKeyKey"
              v-model="watchOnly"
              label="This is a public key"
            />
            <div class="flex w-full mt-4 justify-between">
              <q-btn @click="generate">Generate</q-btn>
              <q-btn
                v-if="hasExtension && !isKeyValid"
                @click="getFromExtension"
                >Use Public Key from Extension</q-btn
              >
              <q-btn v-if="isKeyValid" color="primary" @click="proceed"
                >Proceed</q-btn
              >
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>
import helpersMixin from '../utils/mixin'
import {validateWords} from 'nostr-tools/nip06'
import {generatePrivateKey} from 'nostr-tools'
import Header from '../components/Header/Header.vue'
// import ArticleList from '../components/ArticleList/ArticleList.vue'

export default {
  name: 'MainLayout',
  components: {
    Header,
//     ArticleList
  },
  mixins: [helpersMixin],
  data() {
    return {
      initializeKeys: true,
      watchOnly: false,
      key: null,
      hasExtension: false
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
      this.$router.push({
        name: 'settings',
        params: {showKeys: true}
      })
    },

    isKey(key) {
      return key?.toLowerCase()?.match(/^[0-9a-f]{64}$/)
    }
  }
}
</script>
