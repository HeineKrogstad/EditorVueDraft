import { defineStore } from 'pinia';

export const usePersonalStore = defineStore('personal', {
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
