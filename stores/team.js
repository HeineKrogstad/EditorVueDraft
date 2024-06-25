import { defineStore } from 'pinia';

export const useTeamStore = defineStore('team', {
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
