import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state () {
    return {
      userInfo: {}
    }
  },
  actions: {
    setUserName (name) {
      this.userInfo.name = name
    }
  }
})