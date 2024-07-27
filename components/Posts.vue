<template>
    <div class="w-3/4 h-svh ml-auto p-5 ">
        <Tabs class="flex flex-col w-full h-full" v-model:active="activeTab" value="0" :unstyled="true">
            <div class="flex items-center justify-between w-full">
                <TabList class="text-lg text-violet-950" >
                    <Tab  @click="activeTab = tab.value" :class="activeTab === tab.value ? 'active-tab' : 'tab'" v-for="tab in tabs" :key="tab.value" :value="tab.value">
                        {{ tab.title }}
                    </Tab>
                </TabList>
                <div class="flex items-center border border-gray-300 rounded-lg gap-1 p-2">
                    <Button :unstyled="true"> 
                        <svg-icon  class="text-violet-800" type="mdi" :path="mdiMagnify"></svg-icon>
                    </Button>
                    <InputText
                        unstyled="true"
                        v-model="searchQuery"
                        type="text"
                        placeholder="Что вы хотите найти?"
                        class="focus:outline-none focus:ring-0"
                    />
                </div>
            </div>
            <TabPanels class="grow">
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value" class="flex flex-col h-full">
                    <ul class="grow">
                        <li v-for="(post, index) in tab.posts" :key="index" class="relative list-none pt-0" :title="tab.title">
                            <EditorContent class="post" :editor="getOrCreateEditor(post)" />
                            <Button :unstyled="true" class="absolute top-12 right-6" @click="deletePost({post: post, channel: tab.title})"> 
                                <svg-icon class="text-violet-400 border-2 rounded-lg border-violet-300" type="mdi" :path="mdiClose"></svg-icon>
                            </Button>
                        </li>
                    </ul>
                    <Accordion value="0" collapseIcon="null" expandIcon="null" @tab-open="onTabOpen(tab)" @tab-close="onTabClose(tab)" :class="{'border-gray-300 pt-4': tab.tiptapOpenned, 'border-violet-800 ': !tab.tiptapOpenned}" class="border rounded-lg">
                        <AccordionPanel class="accordionPanel">
                            <AccordionContent>
                                <div class="flex items-center text-violet-800 font-bold pb-6 gap-2">
                                    <svg-icon type="mdi" :path="mdiViewAgenda"></svg-icon>
                                    Создать новую запись
                                </div>
                                <Tiptap ref="tiptapComponent"/>
                                <FileUpload :pt="{ fileThumbnail: {class:'h-0'}}" name="demo[]" url="/api/upload" :multiple="true" :showCancelButton="false" :showUploadButton="false" chooseLabel=" " chooseIcon="pi pi-paperclip" :previewWidth="0" ></FileUpload>
                            </AccordionContent>
                            <AccordionHeader class="w-full flex items-center justify-between px-4 py-4">
                                <div class="flex flex-row gap-1 text-violet-800" >
                                    <svg-icon v-if="!tab.tiptapOpenned" type="mdi" :path="mdiViewAgenda"></svg-icon>
                                    {{ tab.headerText }}
                                </div>
                                <div class="flex items-center gap-4 order-last" @click.stop>
                                    <button class="btn-add" @click="triggerSubmit(tab)">Записать</button>
                                    от
                                    <DatePicker panelClass="w-1/4" inputClass="text-center border border-violet-800 py-1" iconDisplay="button" v-model="tab.date" dateFormat="dd/mm/yy"/>
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
import 'primeicons/primeicons.css'

import FileUpload from 'primevue/fileupload';
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
        FileUpload,
    },
    data() {
        return {
            activeTab: '0',
            searchQuery: '',
            submitTrigger: false,
            mdiMagnify: mdiMagnify,
            mdiViewAgenda: mdiViewAgenda,
            mdiClose: mdiClose,
            editors: new Map(),
            tabs: [
                { title: 'Личный', value: '0', posts: [], date: new Date(), tiptapOpenned: false, headerText: 'Как дела по проекту?'},
                { title: 'Командный', value: '1', posts: [], date: new Date(), tiptapOpenned: false, headerText: 'Как дела по проекту?'},
                { title: 'Публичный', value: '2', posts: [], date: new Date(), tiptapOpenned: false, headerText: 'Как дела по проекту?'}
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
        triggerSubmit(tab) {
            const tiptapComponent = this.$refs.tiptapComponent[tab.value];
            const post = tiptapComponent.editor.getJSON();
            const date = this.formatDate(tab.date)
        
            const dateParagraph = {
                type: 'heading',
                attrs: {
                    textAlign: 'left',
                    level: 2
                },
                content: [
                    {
                        type: 'text',
                        marks: [ { 
                            type: "textStyle",
                            attrs: {
                                fontFamily: null,
                                color: '#5b21b6',
                            },
                        }],
                        text: date
                    }
                ]
            };

            post.content.unshift(dateParagraph);
            post.timestamp = date;

            if (tab.title === 'Личный') {
                this.personalStore.addPost(post);
            } else if (tab.title === 'Командный') {
                this.teamStore.addPost(post);
            } else if (tab.title === 'Публичный') {
                this.publicStore.addPost(post);
            }
            this.updateTabs();
            this.submitTrigger = !this.submitTrigger;
        },

        deletePost({ post, channel }) {
            if (channel === 'Личный') {
                this.personalStore.removePost(post.id);
            } else if (channel === 'Командный') {
                this.teamStore.removePost(post.id);
            } else if (channel === 'Публичный') {
                this.publicStore.removePost(post.id);
            }

            if (this.editors.has(post)) {
                this.editors.get(post).destroy();
                this.editors.delete(post);
            }

            this.updateTabs();
        },

        updateTabs() {
            this.personalStore.fetchPosts();
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

        onTabOpen(tab) {
            tab.headerText = '';
            tab.tiptapOpenned = true;
        },

        onTabClose(tab) {
            tab.headerText= 'Как дела по проекту?';  
            tab.tiptapOpenned = false;
        },
        
        formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            return `${day}.${month}.${year}`;
        }
    },

    created() {
        this.updateTabs();
    }
}

</script>


<style scoped>
    .post .tiptap { @apply border-violet-800 }

    .tab { @apply w-32 }
    
    .active-tab { @apply w-32 font-bold; }
    
    .btn-add { @apply text-white bg-violet-800 hover:bg-violet-600 font-mono py-1 px-4 rounded-lg transition-colors duration-300}

    .header { @apply flex flex-row }

    .tableHeader { @apply flex flex-row }

    .p-fileupload { @apply mt-3 border-none }
</style>