<template>
    <div class="card">
        <Tabs v-model:active="activeTab">
            <TabList>
                <Tab v-for="tab in tabs" :key="tab.value" :value="tab.value">{{ tab.title }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" >
                    <ul>
                        <li v-for="(post, index) in tab.posts" :key="index" class="list-none">
                            <EditorContent  :editor="getOrCreateEditor(post)" />
                        </li>
                    </ul>
                    <button @click="openTiptap(tab.value)">Добавить запись</button>
                    <Tiptap v-if="showTiptap && activeTab === tab.value" :channel="tab.title" @add-post="addPost" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script>
import getEditorConfig from '@/utils/editorConfig';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Tiptap from '~/components/Tiptap.vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { usePersonalStore } from '~/stores/personal'
import { useTeamStore } from '~/stores/team'
import { usePublicStore } from '~/stores/public'

export default {
    components: {
        Tabs,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        Tiptap,
        EditorContent
    },
    data() {
        return {
            activeTab: '0',
            showTiptap: false,
            editors: new Map(),
            tabs: [
                { title: 'Личный', value: '0', posts: [] },
                { title: 'Командный', value: '1', posts: [] },
                { title: 'Публичный', value: '2', posts: [] }
            ]
        }
    },
    computed: {
        personalStore() {
            return usePersonalStore()
        },
        teamStore() {
            return useTeamStore()
        },
        publicStore() {
            return usePublicStore()
        },
        activeTabChannel() {
            return this.tabs.find(tab => tab.value === this.activeTab)?.title;
        }
    },
    methods: {
        openTiptap(tabValue) {
            this.showTiptap = true;
            this.activeTab = tabValue;
        },
        addPost({ post, channel }) {
            this.showTiptap = false;
            if (channel === 'Личный') {
                this.personalStore.addPost(post);
            } else if (channel === 'Командный') {
                this.teamStore.addPost(post);
            } else if (channel === 'Публичный') {
                this.publicStore.addPost(post);
            }
            this.updateTabs();
        },
        updateTabs() {
            this.tabs[0].posts = this.personalStore.posts;
            this.tabs[1].posts = this.teamStore.posts;
            this.tabs[2].posts = this.publicStore.posts;
        },
        getOrCreateEditor(content) {
            if (!this.editors.has(content)) {
                this.editors.set(content, new Editor(getEditorConfig(content, false)));
            }
            return this.editors.get(content);
        },
    },
    created() {
        this.updateTabs();
    }
}
</script>


<style scoped>


</style>
