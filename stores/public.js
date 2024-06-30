import { defineStore } from 'pinia';

export const usePublicStore = defineStore('public', {
  state: () => ({
    posts: [],
  }),
  actions: {
    addPost(post) {
      post.id = Date.now();
      this.posts.push(post);
    },
    removePost(post) {
      const index = this.posts.indexOf(post);
      if (index !== -1) {
        this.posts.splice(index, 1);
      }
    },
  },
});
