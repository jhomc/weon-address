<template>
  <v-app class="grey lighten-4 " >
    <Navbar />

    <v-main class="mx-4 mb-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar/Navbar.vue'

export default {
  name: 'App',

  components: {
    Navbar
  },
  
  mounted() {
  
  },

  data: () => ({

  }),

  methods: {
  }
};
</script>
<style lang="scss">
 .v-application--wrap {
    background-image: url('https://weon.com.br/wp-content/uploads/2024/04/Agrupar-45-4.png');
    background-size: cover ;
  }
</style>
