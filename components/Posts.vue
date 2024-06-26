<template>
    <div class="card">
        <Tabs v-model:active="activeTab">
            <TabList>
                <Tab value="0">Личный</Tab>
                <Tab value="1">Командный</Tab>
                <Tab value="2">Публичный</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <p class="m-0">Личный</p>
                    <ul>
                        <li v-for="(post, index) in personalStore.posts" :key="index">{{ post }}</li>
                    </ul>
                </TabPanel>
                <TabPanel value="1">
                    <p class="m-0">Командный</p>
                    <ul>
                        <li v-for="(post, index) in teamStore.posts" :key="index">{{ post }}</li>
                    </ul>
                </TabPanel>
                <TabPanel value="2">
                    <p class="m-0">Публичный</p>
                    <ul>
                        <li v-for="(post, index) in publicStore.posts" :key="index">{{ post }}</li>
                    </ul>
                </TabPanel>
            </TabPanels>
        </Tabs>
        <button @click="openTiptap">Добавить запись</button>
        <Tiptap v-if="showTiptap" @add-post="addPost" />
    </div>
</template>

<script>
import { mapState } from 'pinia'
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Tiptap from '~/components/Tiptap.vue'
import { usePersonalStore } from '~/stores/personal'
import { useTeamStore } from '~/stores/team'
import { usePublicStore } from '~/stores/public'

export default {
    components: {
        Tabs,
        Tiptap,
    },
    data() {
        return {
            activeTab: 0,
            showTiptap: false,
        }
    },
    computed: {
        ...mapState(usePersonalStore, ['posts']),
        ...mapState(useTeamStore, ['posts']),
        ...mapState(usePublicStore, ['posts']),
        personalStore() {
            return usePersonalStore()
        },
        teamStore() {
            return useTeamStore()
        },
        publicStore() {
            return usePublicStore()
        }
    },
    methods: {
        openTiptap() {
            this.showTiptap = true
        },
        addPost(post) {
            this.showTiptap = false
            if (this.activeTab === 0) {
                this.personalStore.addPost(post)
            } else if (this.activeTab === 1) {
                this.teamStore.addPost(post)
            } else if (this.activeTab === 2) {
                this.publicStore.addPost(post)
            }
        }
    }
}
</script>

<style scoped>
</style>
