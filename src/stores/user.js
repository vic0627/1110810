import { defineStore } from "pinia";

export default defineStore("userStore", {
  state: () => ({
    dis: [],
    level: [],
  }),
  getters: {
    getDis: (state) => {
      const temp = [];
      for (const key in state.dis) {
        temp[key] = { value: state.dis[key], label: state.dis[key] };
      }
      return temp;
    },
    getLevel: (state) => {
      const temp = [];
      for (const key in state.level) {
        temp[key] = { value: state.level[key], label: state.level[key] };
      }
      return temp;
    },
  },
});
