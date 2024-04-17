<template>
  <div>
    <h1 class="subheading grey--text">Últimos registros</h1>
    
    <v-container class="my-5">
      <v-row class="justify-space-between">
        <AddressCard 
          v-for="address in addresses" 
          :key="address.id" 
          :address="address"
          >
        </AddressCard>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import AddressCard from '@/components/AddressCard.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Home',

  components: {
    AddressCard
  },


  mounted() {
     this.fetchData()
  },

  computed: {
    ...mapGetters(['addresses', 'error'])
  },

  methods: {
    fetchData() {
      this.$store.dispatch('fetchData');
    }
  }
}
</script>
