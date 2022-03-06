<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      text-color="black"
      color="transparent"
      flat
      outline
      label="Connected"
      class="dropdown-button"
    >
      <q-list>
        <q-item
          v-close-popup
          clickable
          @click="hardReset"
        >
          <q-item-section>
            <div class="dropdown__item">
              <Icon icon="ic:twotone-logout" font-size="20px" />
              <span class="dropdown__item-text">Logout</span></div>
          </q-item-section>
        </q-item>
        <q-item v-close-popup clickable @click="onItemClick">
          <q-item-section>
            <div class="dropdown__item" @click="keysDialog = true">
              <Icon icon="bxs:key" font-size="22px" />
              <span class="dropdown__item-text">Your Keys</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-dialog v-model="keysDialog">
      <q-card class="px-4 py-2">
        <q-card-section>
          <div class="text-lg text-bold tracking-wide leading-relaxed py-2">
            Your keys <q-icon name="vpn_key" />
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
  </div>
</template>

<script>
import './HeaderDropdown.scss'
import { Icon } from '@iconify/vue'
import {LocalStorage} from 'quasar'
import {eraseDatabase} from '../../db'
// import {KeysModal} from 'src/components/KeysModal/KeysModal.vue'

export default {
    name: 'HeaderDropdown',
    components: {
      Icon,
      // KeysModal
    },
    setup () {
    return {
      onItemClick () {
        // console.log('Clicked on an Item')
      }
    }
  },
  data() {
    return {
      keysDialog: false,
    }
  },
  methods: {
    openKeyModal() {
      this.$refs.key_modal.show()
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
    }
  },
}
</script>
