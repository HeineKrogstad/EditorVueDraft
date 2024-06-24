<template>
    <div v-if="editor">
        
        <div class="flex justify-center space-x-2 p-1">
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
            <button class="btn" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                <svg-icon type="mdi" :path="mdiFormatListBulleted"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                <svg-icon type="mdi" :path="mdiFormatListNumbered"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                <svg-icon type="mdi" :path="mdiFormatAlignLeft"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                <svg-icon type="mdi" :path="mdiFormatAlignCenter"></svg-icon>
            </button>
            <button class="btn" @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
                <svg-icon type="mdi" :path="mdiFormatAlignRight"></svg-icon>
            </button>
        </div>
        <editor-content :editor="editor"/>
    </div>
    </template>
      
    <script>
    import SvgIcon from '@jamescoyle/vue-icon';
    import SpeedDial from 'primevue/speeddial';

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
    } from '@mdi/js';
    import TextAlign from '@tiptap/extension-text-align'
    import Underline from '@tiptap/extension-underline'
    import Superscript from '@tiptap/extension-superscript'
    import Subscript from '@tiptap/extension-subscript'
    import StarterKit from '@tiptap/starter-kit'
    import { Editor, EditorContent } from '@tiptap/vue-3'
    
    export default {
        components: {
            EditorContent,
            SvgIcon,
            SpeedDial,
        },
    
        data() {
            return {
            editor: null,
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
            }
        },
    
        mounted() {
            this.editor = new Editor({
            extensions: [
                StarterKit,
                TextAlign.configure({
                types: ['heading', 'paragraph', 'orderedList', 'bulletList', 'codeBlock', 'blockquote'],
                }),
                Underline,
                Subscript,
                Superscript,
            ],
            content: ``,
            })
        },
        
        beforeUnmount() {
            this.editor.destroy()
        },
    }
    </script>
    
    <style>
    .btn {
        @apply hover:bg-neutral-200 text-violet-800 font-mono py-1 px-2 rounded-lg transition-colors duration-300;
    }
    
    .btn.is-active {
        @apply bg-violet-800 text-white;
    }
    
    .tiptap {
        @apply m-8 p-8 border border-gray-300 rounded-lg shadow-sm;
        @apply font-normal text-gray-800;
    }   
        
    h1, h2 { @apply mt-3.5 mb-1.5; }
    
    h1 { @apply text-2xl }
    
    h2 { @apply text-xl }

    blockquote { @apply border-l-2 border-gray-300 my-6 pl-4 }

    pre { @apply bg-neutral-700 rounded-lg text-white font-mono my-6 p-3.5 text-sm }

    code { @apply bg-transparent text-inherit text-xs p-0 }

    ul, ol { @apply px-4 my-5 mr-4 ml-1 }
    ul { @apply list-disc }
    ol { @apply list-decimal }
    li p { @apply my-1 }
    
    .btn-export {
        @apply border border-gray-300 rounded-lg p-1 hover:bg-gray-200 transition-colors duration-300;
    }
    </style>