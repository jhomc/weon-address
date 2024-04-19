import Navitem from '@/components/Navitem/Navitem.vue'
export default {
  components: {
    Navitem
  },

  data() {
    return {
      drawer: false,
      links: [
        { icon: 'mdi-home', text: 'Home', route: '/' },
        { icon: 'mdi-map-marker', text: 'Cadastrar endereço', route: '/register' }
      ]
    }
  }
}