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
    removePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
    },
  },
});
