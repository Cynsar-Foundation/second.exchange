<template>
    <q-header bordered class="bg-transparent text-black">
        <q-toolbar>
            <q-toolbar-title class="header__title" @click="toHome">
                Second Exchange
            </q-toolbar-title>
            <q-space />
            <q-form class="q-gutter-md">
                <div class="header__search-container">
                    <q-input
                        rounded
                        outlined
                        label="Search for profiles"
                        class="search-bar hide-bottom-space"
                        hide-bottom-space
                        dense
                    />
                    <Icon icon="bi:search" font-size="25px" class="header__search-button" />
                </div>
            </q-form>
            <q-space />
            <q-tabs>
                <label class="Header__content__dark-mode__label">
                  Dark mode:
                </label>
                <q-toggle v-model="dark_mode_toggle" disable />
                <q-space />
                <div class="header__post-button" @click="toWriter">
                    <Icon icon="fa6-solid:pen-to-square" font-size="20px" color="grey" />
                    <span class="header__post-button-text">Post Blog</span>
                </div>
                <HeaderDropdown />
            </q-tabs>
        </q-toolbar>
    </q-header>
</template>

<script>
import './Header.scss'
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown.vue'
import { Icon } from '@iconify/vue'

export default {
    name: 'Header',
    components: {
        Icon,
        HeaderDropdown
    },
    data() {
        const dark_mode_toggle = false
        return {
            dark_mode_toggle
        }
    },
    methods: {
        toHome() {
            this.$router.push('/')
        },
        toWriter() {
            this.$router.push('/write')
        }
    }
}
</script>
