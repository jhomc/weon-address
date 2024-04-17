<template>
  <nav>

    <v-app-bar flat app light class="light-blue lighten-5"> 
      <v-app-bar-nav-icon class="secondary--text" @click="drawer = !drawer"></v-app-bar-nav-icon>     
      <v-toolbar-title class="text-center">
        <span>WeON</span>
        <span class="font-weight-light">Address</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <Navitem v-for="link in links" :key="link.text" :icon="link.icon" :text="link.text" :route="link.route"></Navitem>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script>
import Navitem from '../components/Navitem.vue'
export default {
  components: {
    Navitem
  },

  data() {
    return {
      drawer: false,
      links: [
        {icon: 'mdi-home', text: 'Home', route: '/'},
        {icon: 'mdi-map-marker', text: 'Cadastrar endereço', route: '/register'}
      ]
    }
  }
}
</script>

<style>

</style>