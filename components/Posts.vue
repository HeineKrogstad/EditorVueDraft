<template>
    <div class="card">
        <Tabs v-model:active="activeTab">
            <TabList class = "text-lg text-violet-950" >
                <Tab  @click="activeTab = tab.value" :class="activeTab === tab.value ? 'active-tab' : 'tab'" v-for="tab in tabs" :key="tab.value" :value="tab.value">{{ tab.title }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" >
                    <ul>
                        <li v-for="(post, index) in tab.posts" :key="index" class="list-none">
                            <EditorContent class="post" :editor="getOrCreateEditor(post)" />
                        </li>
                    </ul>
                    <Accordion value="0" collapseIcon="null" expandIcon="null">
                        <AccordionPanel>
                            <AccordionContent>
                                <div>
                                    <svg-icon class="text-violet-800" type="mdi" :path="mdiViewAgenda"></svg-icon>
                                    Создать новую запись
                                </div>
                                <Tiptap :channel="tab.title" @add-post="addPost" />
                            </AccordionContent>
                            <AccordionHeader>
                                <svg-icon class="text-violet-800" type="mdi" :path="mdiViewAgenda"></svg-icon>
                                Hello
                            </AccordionHeader>
                        </AccordionPanel>
                    </Accordion>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script>
import { mdiViewAgenda } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

import getEditorConfig from '@/utils/editorConfig';
import Tiptap from '~/components/Tiptap.vue'
import { Editor, EditorContent } from '@tiptap/vue-3'

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
        EditorContent,
        Accordion,
        AccordionHeader,
        AccordionContent,
        AccordionPanel,
        SvgIcon,
    },
    data() {
        return {
            buttonCreatePostText: 'Как дела по проекту?',
            activeTab: '0',
            mdiViewAgenda: mdiViewAgenda,
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
    },
    methods: {
        openTiptap(tabValue) {
            this.showTiptap = true;
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
        handleClickCreatePost(tabValue) {
            this.buttonCreatePostText = 'Создать новую запись';
            this.openTiptap(tabValue);
        },
    },
    created() {
        this.updateTabs();
    }
}

//<Tiptap v-if="showTiptap && activeTab === tab.value" :channel="tab.title" @add-post="addPost" />
//<button @click="handleClickCreatePost(tab.value)">{{ buttonCreatePostText }}</button>
</script>


<style>
    .post .tiptap { @apply border-violet-800 }

    .tab { @apply w-32 transition-all delay-75 duration-100 hover:opacity-85; }
    
    .active-tab { @apply w-32 font-bold; }
    
    
</style>
