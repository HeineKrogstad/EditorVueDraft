import { defineStore } from 'pinia';

export const usePublicStore = defineStore('public', {
  state: () => ({
    posts: [],
  }),
  actions: {
    addPost(post) {
      this.posts.push(post);
    },
    removePost(index) {
      this.posts.splice(index, 1);
    },
  },
});
