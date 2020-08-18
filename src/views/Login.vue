<template>
  <div class="login">
    <div v-if="!authChecked">
      Vérification
    </div>
    <div v-if="authChecked">
      <div>
          <input
              type="text"
              placeholder="Email"
              v-model="email"
              @keyup.enter="login"
              aria-label="Email"
          />
      </div>
      <div>
          <input
              type="password"
              placeholder="Password"
              v-model="password"
              @keyup.enter="login"
              aria-label="Password"
          />
      </div>
      <div>
          <button type="submit" @click.prevent="login">
            Se connecter
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['authChecked'])
  },
  methods: {
    ...mapActions(['loginUser']),
    async login () {
      const { email, password } = this
      try {
        await this.loginUser({ email, password })
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
