/*
import { Node, mergeAttributes } from '@tiptap/core';
import { defineNuxtPlugin } from '#app';

const ImageUploadBlock = Node.create({
  name: 'imageUploadBlock',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-upload-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'image-upload-block', style: 'width: 300px; height: 300px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center;', ...HTMLAttributes }, 
    HTMLAttributes.src ? ['img', { src: HTMLAttributes.src, style: 'max-width: 100%; max-height: 100%; display: block;' }] : 'Нажмите, чтобы загрузить изображение']
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const div = document.createElement('div')
      div.style.width = '300px'
      div.style.height = '300px'
      div.style.border = '1px dashed #ccc'
      div.style.display = 'flex'
      div.style.alignItems = 'center'
      div.style.justifyContent = 'center'
      div.setAttribute('data-type', 'image-upload-block')

      if (node.attrs.src) {
        const img = document.createElement('img')
        img.src = node.attrs.src
        img.style.maxWidth = '100%'
        img.style.maxHeight = '100%'
        div.appendChild(img)
      } else {
        div.innerHTML = 'Нажмите, чтобы загрузить изображение'
      }

      div.addEventListener('click', () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (event) => {
          const file = event.target.files[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              const url = e.target.result
              editor.chain().focus().command(({ tr }) => {
                const pos = getPos()
                tr.setNodeMarkup(pos, null, { src: url })
                return true
              }).run()
            }
            reader.readAsDataURL(file)
          }
        }
        input.click()
      })

      return {
        dom: div,
      }
    }
  },
})

const ThreeImageUploadBlock = Node.create({
  name: 'threeImageUploadBlock',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      images: {
        default: [null, null, null],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="three-image-upload-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const styles = `
      display: flex;
      justify-content: space-between;
      gap: 10px;
    `
    return ['div', { 'data-type': 'three-image-upload-block', style: styles, ...HTMLAttributes },
      ...HTMLAttributes.images.map(src => ['div', { style: 'flex: 1; height: 20rem; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center;' }, 
        src ? ['img', { src, style: 'max-width: 100%; max-height: 100%; display: block;' }] : 'Нажмите, чтобы загрузить изображение'
      ])
    ]
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div')
      container.style.display = 'flex'
      container.style.justifyContent = 'space-between'
      container.style.gap = '10px'
      container.setAttribute('data-type', 'three-image-upload-block')

      node.attrs.images.forEach((src, index) => {
        const div = document.createElement('div')
        div.style.flex = '1'
        div.style.height = '20rem'
        div.style.border = '1px dashed #ccc'
        div.style.display = 'flex'
        div.style.alignItems = 'center'
        div.style.justifyContent = 'center'

        if (src) {
          const img = document.createElement('img')
          img.src = src
          img.style.maxWidth = '100%'
          img.style.maxHeight = '100%'
          div.appendChild(img)
        } else {
          div.innerHTML = 'Нажмите, чтобы загрузить изображение'
        }

        div.addEventListener('click', () => {
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.onchange = (event) => {
            const file = event.target.files[0]
            if (file) {
              const reader = new FileReader()
              reader.onload = (e) => {
                const url = e.target.result
                const newImages = [...node.attrs.images]
                newImages[index] = url
                editor.chain().focus().command(({ tr }) => {
                  tr.setNodeMarkup(getPos(), null, { images: newImages })
                  return true
                }).run()
              }
              reader.readAsDataURL(file)
            }
          }
          input.click()
        })

        container.appendChild(div)
      })

      return {
        dom: container,
      }
    }
  },
})

const ImageTextBlock = Node.create({
  name: 'imageTextBlock',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: 'Image',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-text-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'image-text-block', style: 'display: flex; align-items: center; gap: 10px;' }, 
      ['img', { src: HTMLAttributes.src, alt: HTMLAttributes.alt, style: 'width: 150px; height: 150px; object-fit: cover;' }],
      ['div', { style: 'flex: 1;' }, 0]
    ]
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div')
      container.style.display = 'flex'
      container.style.alignItems = 'center'
      container.style.gap = '10px'
      container.setAttribute('data-type', 'image-text-block')

      const img = document.createElement('img')
      img.style.width = '150px'
      img.style.height = '150px'
      img.style.objectFit = 'cover'
      img.alt = node.attrs.alt

      if (node.attrs.src) {
        img.src = node.attrs.src
      } else {
        img.innerHTML = 'Нажмите, чтобы загрузить изображение'
        img.style.border = '1px dashed #ccc'
      }

      img.addEventListener('click', () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (event) => {
          const file = event.target.files[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              const url = e.target.result
              editor.chain().focus().command(({ tr }) => {
                tr.setNodeMarkup(getPos(), null, { src: url })
                return true
              }).run()
            }
            reader.readAsDataURL(file)
          }
        }
        input.click()
      })

      const content = document.createElement('div')
      content.style.flex = '1'
      content.contentEditable = true

      container.appendChild(img)
      container.appendChild(content)

      return {
        dom: container,
        contentDOM: content,
      }
    }
  },
})

const ImageTextBlock2 = Node.create({
  
  name: 'imageTextBlock2',
  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: 'Image',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-text-block"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { 'data-type': 'image-text-block', style: 'position: relative; display: flex; height: 20rem;' },
      [
        'div',
        {
          style: 'width: 70%; padding-right: 10px; box-sizing: border-box; overflow-y: auto;',
        },
        ['p', {}, 0]
      ],
      [
        'img',
        {
          src: HTMLAttributes.src,
          alt: HTMLAttributes.alt,
          style: 'width: 30%; position: absolute; right: 0; top: 0; height: 100%; object-fit: cover;',
        }
      ],
    ]
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.display = 'flex';
      container.style.height = '20rem';
      container.setAttribute('data-type', 'image-text-block');

      const contentWrapper = document.createElement('div');
      contentWrapper.style.width = '70%';
      contentWrapper.style.paddingRight = '10px';
      contentWrapper.style.boxSizing = 'border-box';
      contentWrapper.style.overflowY = 'auto';

      const content = document.createElement('p');
      content.contentEditable = true;

      contentWrapper.appendChild(content);

      const img = document.createElement('img');
      img.style.width = '30%';
      img.style.position = 'absolute';
      img.style.right = '0';
      img.style.top = '0';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.alt = node.attrs.alt;

      if (node.attrs.src) {
        img.src = node.attrs.src;
      } else {
        img.innerHTML = 'Нажмите, чтобы загрузить изображение';
        img.style.border = '1px dashed #ccc';
      }

      img.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
          const file = event.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const url = e.target.result;
              editor.chain().focus().command(({ tr }) => {
                tr.setNodeMarkup(getPos(), null, { src: url });
                return true;
              }).run();
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
      });

      container.appendChild(contentWrapper);
      container.appendChild(img);

      return {
        dom: container,
        contentDOM: content,
      };
    };
  },
});

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('tiptapExtensions', [
    //ImageUploadBlock,
    //ThreeImageUploadBlock,
    //ImageTextBlock,
    //ImageTextBlock2
  ]);
});

*/