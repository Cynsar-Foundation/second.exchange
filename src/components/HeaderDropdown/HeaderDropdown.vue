<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      v-if="!$store.state.keys.priv"
      text-color="black"
      color="transparent"
      flat
      outline
      label="Connect"
      class="dropdown-button"
    >
      <q-list>
        <q-item v-close-popup clickable @click="loginUser">
          <q-item-section>
            <div class="dropdown__item">
              <Icon icon="icon-park-outline:login" font-size="20px" />
              <span class="dropdown__item-text">Login</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown
      v-if="$store.state.keys.priv"
      text-color="black"
      color="transparent"
      flat
      outline
      label="Connected"
      class="dropdown-button"
    >
      <q-list>
        <q-item v-close-popup clickable>
          <q-item-section>
            <div class="dropdown__item" @click="showUserPosts">
              <Icon icon="majesticons:paper-fold-text-line" font-size="22px" />
              <span class="dropdown__item-text">My Posts</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable>
          <q-item-section>
            <div class="dropdown__item" @click="showUserChats">
              <Icon icon="bi:chat-right-text-fill" font-size="22px" />
              <span class="dropdown__item-text">My Chats</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable>
          <q-item-section>
            <div class="dropdown__item" @click="openNotifications">
              <Icon icon="carbon:notification-filled" font-size="22px" />
              <span class="dropdown__item-text">Notifications</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable>
          <q-item-section>
            <div class="dropdown__item" @click="keysDialog = true">
              <Icon icon="bxs:key" font-size="22px" />
              <span class="dropdown__item-text">My Keys</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable>
          <q-item-section>
            <div class="dropdown__item" @click="openSettings">
              <Icon icon="ci:settings-filled" font-size="22px" />
              <span class="dropdown__item-text">Settings</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="hardReset">
          <q-item-section>
            <div class="dropdown__item">
              <Icon icon="ic:twotone-logout" font-size="20px" />
              <span class="dropdown__item-text">Logout</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-dialog v-model="keysDialog">
      <q-card class="px-4 py-2">
        <q-card-section>
          <div class="text-lg text-bold tracking-wide leading-relaxed py-2">
            My keys <q-icon name="vpn_key" />
          </div>
          <p v-if="$store.state.keys.priv">
            Make sure you back up your private key!
          </p>
          <p v-else>Your private key is not here!</p>
          <div class="mt-1 text-xs">
            Posts are published using your private key. Others can see your
            posts or follow you using only your public key.
          </div>
        </q-card-section>

        <q-card-section>
          <p>Private Key:</p>
          <q-input
            v-model="$store.state.keys.priv"
            class="mb-2"
            readonly
            filled
          />
          <p>Public Key:</p>
          <q-input v-model="$store.state.keys.pub" readonly filled />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat label="Close" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="initializeKeys">
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
  </div>
</template>

<script>
import './HeaderDropdown.scss'
import {Icon} from '@iconify/vue'
import {LocalStorage} from 'quasar'
import {eraseDatabase} from '../../db'
import {validateWords} from 'nostr-tools/nip06'
import {generatePrivateKey} from 'nostr-tools'
import {pool} from '../../pool'
import {addToThread} from '../../utils/threads'

export default {
  name: 'HeaderDropdown',
  components: {
    Icon
  },
  data() {
    return {
      keysDialog: false,
      initializeKeys: false,
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
    loginUser() {
      this.initializeKeys = true
    },
    openSettings() {
      this.$router.push('/settings')
    },
    openNotifications() {
      this.$router.push('/notifications')
    },
    showUserPosts() {
      this.$router.push('/myposts/' + this.$store.state.keys.pub)
    },
    showUserChats() {
      this.$router.push('/messages')
    },
    async hardReset() {
      this.$q
        .dialog({
          title: 'Are you sure?',
          message: 'Do you really want to delete all data from this device?',
          cancel: true
        })
        .onOk(async () => {
          LocalStorage.clear()
          await eraseDatabase()
          window.location.reload()
        })
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
              authors: [
                'd27f3a85ed00f0faa0e4b03386fffd283ff3f8c9089f4ec4a13338a9d7844f54'
              ],
              kinds: [0, 1, 3]
            }
          ]
        },
        'profile-browser'
      )
      location.reload(false)
    },

    isKey(key) {
      return key?.toLowerCase()?.match(/^[0-9a-f]{64}$/)
    },

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
    }
  }
}
</script>
