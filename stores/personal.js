import { defineStore } from 'pinia';
import axios from 'axios';

export const usePersonalStore = defineStore('personal', {
  state: () => ({
    posts: [],
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get('/api/projects/1/drafts?rubric=private');
        this.data = response.data;
        this.posts = this.data.map(data => data.jcontent);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    },
    addPost(post) {
      post.id = Date.now();
      this.posts.push(post);
    },
    removePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
    },
  },
});