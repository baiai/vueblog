import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    contentPath: '',
    detailPath: ''
  },
  getters: {
    detailPath: state => state.detailPath,
    contentPath: state => state.contentPath
  },
  mutations: {
    setContentPath (state, contentPath) {
      if (!contentPath) {
        state.contentPath = window.localStorage.contentPath
      } else {
        window.localStorage.contentPath = contentPath
        state.contentPath = contentPath
      }
    },
    setDetailPath (state, detailPath) {
      if (!detailPath) {
        state.detailPath = window.localStorage.detailPath
      } else {
        window.localStorage.detailPath = detailPath
        state.detailPath = detailPath
      }
    }
  }
})

export default store
