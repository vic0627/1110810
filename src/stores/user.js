import { defineStore } from 'pinia'

export default defineStore('userStore', {
  state: () => ({
    dis: [],
    level: []
  }),
  getters: {
    getDis: (state) => state.dis,
    getLevel: (state) => state.level
  },
})