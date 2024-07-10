<template>
    <div v-if="editor">
        <div class="flex space-x-2 p-1 py-1 border border-gray-300 rounded-lg">
            <button class="btn" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                <svg-icon type="mdi" :path="mdiFormatBold"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                <svg-icon type="mdi" :path="mdiFormatItalic"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                <svg-icon type="mdi" :path="mdiFormatUnderline"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
                <svg-icon type="mdi" :path="mdiFormatStrikethroughVariant"></svg-icon>
            </button>
            <div class="btn relative flex items-center"> 
                <input
                type="color"
                ref="colorPicker"
                @input="updateColor"
                :value="editor.getAttributes('textStyle').color"
                class="absolute left-0 hidden-color-input"
                >
                <svg-icon
                type="mdi"
                :path="mdiFormatTextVariantOutline"
                @click="openColorPicker"
                style="cursor: pointer;"
                />
            </div>
            <button class="btn" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
                <svg-icon type="mdi" :path="mdiFormatQuoteClose"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
                <svg-icon type="mdi" :path="mdiXml"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                <svg-icon type="mdi" :path="mdiFormatHeader1"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                <svg-icon type="mdi" :path="mdiFormatHeader2"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleSubscript().run()" :class="{ 'is-active': editor.isActive('subscript') }">
                <svg-icon type="mdi" :path="mdiFormatSubscript"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleSuperscript().run()" :class="{ 'is-active': editor.isActive('superscript') }">
                <svg-icon type="mdi" :path="mdiFormatSuperscript"></svg-icon>
            </button>
            <SplitButton class="btn menu-overlay" :model="items"> 
                <template #dropdownicon>
                    <svg-icon type="mdi" :path="currentIcon" />
                </template>
                <template #item="slotProps">
                    <div class="btn mt-0.5" @click="slotProps.item.command">
                        <svg-icon type="mdi" :path="slotProps.item.icon"/>
                    </div>
                </template>
            </SplitButton>
            <button class="btn" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                <svg-icon type="mdi" :path="mdiFormatListBulleted"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                <svg-icon type="mdi" :path="mdiFormatListNumbered"></svg-icon>
            </button>
            <button class="btn" @click="addImage">
                <svg-icon type="mdi" :path="mdiPaperclip"></svg-icon>
            </button>
            

            <button class="btn" @click="editor.chain().focus().setFontFamily('serif').run()" :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'serif' }) }">
                Sans Serif
            </button>
            <button class="btn" @click="editor.chain().focus().setFontFamily('monospace').run()" :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'monospace' }) }">
                Monospace
            </button>
            <button class="btn" @click="editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()" :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) }">
                Comic Sans
            </button>
        </div>
        <editor-content :editor="editor"/>
    </div>
    </template>
      
<script>
    import getEditorConfig from '@/utils/editorConfig';
    import SvgIcon from '@jamescoyle/vue-icon';
    import { 
        mdiFormatBold,
        mdiFormatItalic, 
        mdiFormatUnderline, 
        mdiFormatStrikethroughVariant, 
        mdiXml, 
        mdiFormatHeader1, 
        mdiFormatHeader2, 
        mdiFormatSubscript,
        mdiFormatSuperscript, 
        mdiFormatListBulleted, 
        mdiFormatListNumbered,
        mdiFormatQuoteClose,
        mdiFormatIndentDecrease,
        mdiFormatIndentIncrease,
        mdiFormatAlignLeft,
        mdiFormatAlignCenter,
        mdiFormatAlignRight,
        mdiFormatAlignJustify, 
        mdiPaperclip,
        mdiFormatTextVariantOutline,
        mdiFormatColorFill,
    } from '@mdi/js';
    import { Editor, EditorContent } from '@tiptap/vue-3';
    import SplitButton from 'primevue/splitbutton';

    export default {
        components: {
            EditorContent,
            SvgIcon,
            SplitButton,
        },

        data() {
            return {
                isOpen: false,
                editor: null,
                items: [],
                newPost: '',

                mdiFormatBold: mdiFormatBold,
                mdiFormatItalic: mdiFormatItalic,
                mdiFormatUnderline: mdiFormatUnderline,
                mdiFormatStrikethroughVariant: mdiFormatStrikethroughVariant,
                mdiXml: mdiXml,
                mdiFormatHeader1: mdiFormatHeader1,
                mdiFormatHeader2: mdiFormatHeader2,
                mdiFormatSubscript: mdiFormatSubscript,
                mdiFormatSuperscript: mdiFormatSuperscript,
                mdiFormatListNumbered: mdiFormatListNumbered,
                mdiFormatListBulleted: mdiFormatListBulleted,
                mdiFormatQuoteClose: mdiFormatQuoteClose,
                mdiFormatIndentIncrease: mdiFormatIndentIncrease,
                mdiFormatIndentDecrease: mdiFormatIndentDecrease,
                mdiFormatAlignLeft: mdiFormatAlignLeft,
                mdiFormatAlignCenter: mdiFormatAlignCenter,
                mdiFormatAlignRight: mdiFormatAlignRight,
                mdiFormatAlignJustify: mdiFormatAlignJustify,
                mdiPaperclip: mdiPaperclip,
                mdiFormatTextVariantOutline: mdiFormatTextVariantOutline,
                mdiFormatColorFill: mdiFormatColorFill,
            };
        },

        mounted() {
            const nuxtApp = useNuxtApp();
            const tiptapExtensions = nuxtApp.$tiptapExtensions || [];
            this.editor = new Editor(getEditorConfig('', true, tiptapExtensions));
            this.items = [
            {
                icon: mdiFormatAlignLeft,
                command: () => {
                    this.editor.chain().focus().setTextAlign('left').run();
                },
                class: () => this.editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''
            },
            {
                icon: mdiFormatAlignCenter,
                command: () => {
                    this.editor.chain().focus().setTextAlign('center').run();
                },
                class: () => this.editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
            },
            {
                icon: mdiFormatAlignRight,
                command: () => {
                    this.editor.chain().focus().setTextAlign('right').run();
                },
                class: () => this.editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''
            }
            ];
        },

        computed: {
            currentIcon() {
            if (this.editor.isActive({ textAlign: 'left' })) {
                return mdiFormatAlignLeft;
            }
            if (this.editor.isActive({ textAlign: 'center' })) {
                return mdiFormatAlignCenter;
            }
            if (this.editor.isActive({ textAlign: 'right' })) {
                return mdiFormatAlignRight;
            }
            return mdiFormatAlignJustify;
            },
        },
        
        beforeUnmount() {
            this.editor.destroy()
        },

        methods: {
            addImage() {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (event) => {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const url = e.target.result;
                            this.editor.chain().focus().setImage({ src: url }).run();
                        };
                        reader.readAsDataURL(file);
                    }
                };
                input.click();
            },
            
            openColorPicker() {
                this.$refs.colorPicker.click();
            },

            updateColor(event) {
                const color = event.target.value;
                this.editor.chain().focus().setColor(color).run();
            },  
        },
    }
</script>

<style>
    .btn {
        @apply hover:bg-neutral-200 text-violet-800 font-mono py-1 px-2 rounded-lg transition-colors duration-300 backdrop-blur;
    }

    .btn.is-active {
        @apply bg-violet-800 text-white;
    }

    .tiptap {
        @apply mt-8 p-8 border border-gray-300 rounded-lg shadow-sm;
        @apply font-normal text-gray-800;

        h1 {
            @apply mt-3.5 mb-1.5;
            @apply text-2xl;
        }

        h2 {
            @apply mt-3.5 mb-1.5;
            @apply text-xl;
        }

        blockquote {
            @apply border-l-2 border-gray-300 my-6 pl-4;
        }

        pre {
            @apply bg-neutral-700 rounded-lg text-white font-mono my-6 p-3.5 text-sm;
        }

        code {
            @apply bg-transparent text-inherit text-xs p-0;
        }

        ul, ol {
            @apply px-4 my-5 mr-4 ml-1;
        }
        ul {
            @apply list-disc;
        }
        ol {
            @apply list-decimal;
        }
        li p {
            @apply my-1;
        }
    }


    .hidden-color-input { @apply invisible }

    .hidden-color-input:focus { @apply visible }

    .menu-overlay {
        @apply flex items-center;

        ul { @apply list-none  }
        span { @apply hidden }
    }
</style>