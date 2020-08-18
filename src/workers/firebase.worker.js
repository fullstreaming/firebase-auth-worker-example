import * as Comlink from 'comlink'
import auth from '../config/firebase'

const formatUser = ({ uid: id, email }) => ({ id, email })

const authenticate = () => (
  new Promise((resolve) => {
    const unsubscribe = auth
      .onAuthStateChanged((user) => {
        unsubscribe()
        if (user) {
          resolve(formatUser(user))
        } else {
          resolve(null)
        }
      })
  })
)

const login = (email, password) => (
  new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        resolve(formatUser(user))
      })
      .catch((err) => {
        reject(err.message)
      })
  })
)

const logout = () => auth.signOut()

Comlink.expose({
  authenticate,
  login,
  logout
})
