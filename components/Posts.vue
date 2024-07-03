<template>
    <div class="w-3/4 ml-auto p-5">
        <Tabs class="w-full" v-model:active="activeTab">
            <div class="flex items-center justify-between w-full">
                <TabList class="text-lg text-violet-950" >
                    <Tab  @click="activeTab = tab.value" :class="activeTab === tab.value ? 'active-tab' : 'tab'" v-for="tab in tabs" :key="tab.value" :value="tab.value">
                        {{ tab.title }}
                    </Tab>
                </TabList>
                <div class="flex items-center gap-1 border border-l-2 border-gray-300 rounded-lg px-2 py-1">
                    <Button> 
                        <svg-icon class="text-violet-800" type="mdi" :path="mdiMagnify"></svg-icon>
                    </Button>
                    <InputText
                        v-model="searchQuery"
                        type="text"
                        placeholder="Что вы хотите найти?"
                        class="focus:outline-none focus:ring-0"
                    />
                </div>
            </div>
            
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
                        <AccordionPanel :class="{'border-gray-300 pt-4': !tiptapOpenned[activeTab], 'border-violet-800 ': tiptapOpenned[activeTab]}" class="border rounded-lg px-4">
                            <AccordionContent>
                                <div class="flex items-center text-violet-800 font-bold pb-6 gap-2">
                                    <svg-icon type="mdi" :path="mdiViewAgenda"></svg-icon>
                                    Создать новую запись

                                </div>
                                <Tiptap :channel="tab.title" @add-post="addPost" :triggerSubmit="submitTrigger" />
                            </AccordionContent>
                            <AccordionHeader class="w-full flex items-center justify-between rounded-lg px-2 py-4">
                                <div class="flex flex-row gap-1" >
                                    <svg-icon v-if="tiptapOpenned[activeTab]" class="text-violet-800" type="mdi" :path="mdiViewAgenda"></svg-icon>
                                    {{ headerText[activeTab] }}
                                </div>
                                <div class="flex gap-4 order-last" @click.stop>
                                    <button class="btn-add" @click="triggerSubmit">Записать</button>
                                    от
                                    <DatePicker class="border border-violet-800 rounded-lg px-2" iconDisplay="button" v-model="date" dateFormat="dd/mm/yy" showIcon="true" inputClass="date-picker" panelClass="date-picker-overlay"/>
                                </div>
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
        DatePicker,
    },
    data() {
        return {
            activeTab: '0',
            date: new Date(),
            searchQuery: '',
            
            tiptapOpenned: [true, true, true],
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
            this.tiptapOpenned[activeTab] = false;
        },

        onTabClose(activeTab) {
            this.tiptapOpenned[activeTab] = true;
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

    .tab { @apply w-32 transition-all delay-75 duration-100 hover:opacity-85;}
    
    .active-tab { @apply w-32 font-bold; }
    
    .btn-add { @apply text-white bg-violet-800 hover:bg-violet-600 font-mono py-1 px-4 rounded-lg transition-colors duration-300}

    .date-picker { @apply focus:outline-none focus:ring-0}

    .date-picker-overlay { @apply border rounded-lg px-2 py-4}
    
    .header { @apply flex flex-row }

    .tableHeader { @apply flex flex-row }
    
</style>
