<template>
    <div class="card">
        <Tabs v-model:active="activeTab">
            <TabList class = "text-lg text-violet-950" >
                <Tab  @click="activeTab = tab.value" :class="activeTab === tab.value ? 'active-tab' : 'tab'" v-for="tab in tabs" :key="tab.value" :value="tab.value">{{ tab.title }}</Tab>
                <div class="">
                    <Button> 
                        <svg-icon class="text-violet-800" type="mdi" :path="mdiMagnify"></svg-icon>
                    </Button>
                    <InputText
                        v-model="searchQuery"
                        type="text"
                        placeholder="Что вы хотите найти?"
                        class="p-inputtext p-component"
                    />
                </div>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
                    <ul>
                        <li v-for="(post, index) in tab.posts" :key="index" class="list-none" :title="tab.title">
                            <EditorContent class="post" :editor="getOrCreateEditor(post)" />
                            <Button @click="deletePost({post: post, channel: tab.title})"> 
                                <svg-icon class="text-violet-800" type="mdi" :path="mdiClose"></svg-icon>
                            </Button>
                        </li>
                    </ul>
                    <Accordion value="0" collapseIcon="null" expandIcon="null" @tab-open="onTabOpen(activeTab)" @tab-close="onTabClose(activeTab)">
                        <AccordionPanel>
                            <AccordionContent>
                                <div>
                                    <svg-icon class="text-violet-800" type="mdi" :path="mdiViewAgenda"></svg-icon>
                                    Создать новую запись

                                </div>
                                <Tiptap :channel="tab.title" @add-post="addPost" :triggerSubmit="submitTrigger" />
                            </AccordionContent>
                            <AccordionHeader>
                                <svg-icon v-if="showIcon" class="text-violet-800" type="mdi" :path="mdiViewAgenda"></svg-icon>
                                {{ headerText[activeTab] }}
                                <button class="btn" @click="triggerSubmit">Записать</button>
                                от

                            </AccordionHeader>
                        </AccordionPanel>
                    </Accordion>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<script>

import { mdiViewAgenda, mdiMagnify, mdiClose } from '@mdi/js';
import SvgIcon from '@jamescoyle/vue-icon';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';

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
        InputText,
        Button,
    },
    data() {
        return {
            activeTab: '0',
            searchQuery: '',
            showIcon: true,
            submitTrigger: false,
            headerText: ['Как дела по проекту?', 'Как дела по проекту?', 'Как дела по проекту?'],
            mdiMagnify: mdiMagnify,
            mdiViewAgenda: mdiViewAgenda,
            mdiClose: mdiClose,
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
        triggerSubmit() {
            this.submitTrigger = !this.submitTrigger;
        },

        addPost({ post, channel }) {
            if (channel === 'Личный') {
                this.personalStore.addPost(post);
            } else if (channel === 'Командный') {
                this.teamStore.addPost(post);
            } else if (channel === 'Публичный') {
                this.publicStore.addPost(post);
            }
            this.updateTabs();
        },

        deletePost({ post, channel }) {
            console.log(post);
            console.log(channel);
            if (channel === 'Личный') {
                this.personalStore.removePost(post.id);
                console.log(post.id);
            } else if (channel === 'Командный') {
                this.teamStore.removePost(post.id);
            } else if (channel === 'Публичный') {
                this.publicStore.removePost(post.id);
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

        onTabOpen(activeTab) {
            this.headerText[activeTab] = '';
            this.showIcon = false;
        },

        onTabClose(activeTab) {
            this.showIcon = true;
            this.headerText[activeTab] = 'Как дела по проекту?';  
        },      
    },

    created() {
        this.updateTabs();
    }
}

</script>


<style>
    .post .tiptap { @apply border-violet-800 }

    .tab { @apply w-32 transition-all delay-75 duration-100 hover:opacity-85; }
    
    .active-tab { @apply w-32 font-bold; }
    
    
</style>
