<template>
  <div class="home">
    <h1>Bienvenue {{ user.email }}</h1>
    <button @click.prevent="logout">
      Se déconnecter
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logoutUser', 'resetUser']),
    async logout () {
      try {
        await this.logoutUser()
        this.$router.push({ name: 'Login' }, () => {
          this.resetUser()
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
