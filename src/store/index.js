import Vue from 'vue'
import Vuex from 'vuex'
import * as Comlink from 'comlink'
import FirebaseWorker from '../workers/firebase.worker'

const firebaseWorker = new FirebaseWorker()

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    authChecked: false,
    authenticated: false
  },
  mutations: {
    SET_USER: (state, data) => {
      if (data) {
        state.user = { ...data }
        state.authenticated = true
      } else {
        state.user = null
      }
      state.authChecked = true
    },
    RESET_USER: (state) => {
      state.user = null
    },
    DEAUTH: (state) => {
      state.authenticated = false
    }
  },
  actions: {
    loginUser: async ({ commit }, { email, password }) => (
      new Promise((resolve, reject) => {
        const proxyWorker = Comlink.wrap(firebaseWorker)
        const login = async () => {
          try {
            const user = await proxyWorker.login(email, password)
            commit('SET_USER', user)
            resolve()
          } catch (error) {
            reject(error)
          }
        }
        login()
      })
    ),
    authenticate: async ({ commit }) => {
      const proxyWorker = Comlink.wrap(firebaseWorker)
      const user = await proxyWorker.authenticate()
      commit('SET_USER', user)
      return Promise.resolve(user)
    },
    logoutUser: async ({ commit }) => {
      const proxyWorker = Comlink.wrap(firebaseWorker)
      await proxyWorker.logout()
      commit('DEAUTH')
      return Promise.resolve()
    },
    resetUser: ({ commit }) => {
      commit('RESET_USER')
    }
  },
  getters: {
    user: (state) => state.user,
    authChecked: (state) => state.authChecked
  }
})
