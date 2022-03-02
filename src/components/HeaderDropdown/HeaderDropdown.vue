<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      text-color="black"
      color="transparent"
      flat
      outline=True
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
            <div class="dropdown__item">
              <Icon icon="bxs:key" font-size="22px" />
              <span class="dropdown__item-text">Your Keys</span>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import './HeaderDropdown.scss'
import { Icon } from '@iconify/vue'
import {LocalStorage} from 'quasar'
import {eraseDatabase} from '../../db'

export default {
    name: 'HeaderDropdown',
    components: {
      Icon
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
