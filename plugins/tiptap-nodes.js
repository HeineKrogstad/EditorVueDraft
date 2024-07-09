import { Node, mergeAttributes } from '@tiptap/core';
import { defineNuxtPlugin } from '#app';

// Текстовый блок
const TextBlock = Node.create({
  name: 'textBlock',
  group: 'block',
  content: 'paragraph+',
  parseHTML() {
    return [
      {
        tag: 'div[data-type="text-block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'text-block' }, HTMLAttributes), 0];
  },
});

// Блок "Текст слева, картинка справа"
const TextImageBlock = Node.create({
  name: 'textImageBlock',
  group: 'block',
  content: 'paragraph image',
  parseHTML() {
    return [
      {
        tag: 'div[data-type="text-image-block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'text-image-block', class: 'flex' }, HTMLAttributes), 
      ['div', { class: 'flex-1' }, 0],  // Текстовый контент
      ['div', { class: 'flex-1' }, 1]   // Изображение
    ];
  },
});

// Блок "Картинка слева, текст справа"
const ImageTextBlock = Node.create({
  name: 'imageTextBlock',
  group: 'block',
  content: 'image paragraph',
  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-text-block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'image-text-block', class: 'flex' }, HTMLAttributes),
      ['div', { class: 'flex-1' }, 0],  // Изображение
      ['div', { class: 'flex-1' }, 1]   // Текстовый контент
    ];
  },
});

// Блок "Три картинки сверху, снизу текст"
const ThreeImagesTextBlock = Node.create({
  name: 'threeImagesTextBlock',
  group: 'block',
  content: 'image+ paragraph',
  parseHTML() {
    return [
      {
        tag: 'div[data-type="three-images-text-block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'three-images-text-block' }, HTMLAttributes), 0];
  },
});

// Блок "Сверху картинка, снизу текст"
const ImageTopTextBlock = Node.create({
  name: 'imageTopTextBlock',
  group: 'block',
  content: 'image paragraph+',
  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-top-text-block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'image-top-text-block' }, HTMLAttributes), 0];
  },
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('tiptapExtensions', [
    TextBlock, 
    TextImageBlock, 
    ImageTextBlock, 
    ThreeImagesTextBlock, 
    ImageTopTextBlock
  ]);
});

