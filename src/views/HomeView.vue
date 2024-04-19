<template>
  <div>
    <h1 class="subheading grey--text">{{ $t("message.home") }}</h1>

    <v-container>
      <v-row justify="center">
        <v-col xs="12" md="8">
          <h2 class="subheading grey--text">{{ $t("message.latestRegistries") }}</h2>
        </v-col>
      </v-row>
      <v-row justify="center" class="pa-4" color="blue"> 
        <v-col xs="12" md="8" >
          <v-row class="justify-space-between">
            <AddressCard v-for="address in latestRegisters" :key="address.id" :address="address">
            </AddressCard>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import AddressCard from '@/components/AddressCard/AddressCard.vue'
import { mapGetters } from 'vuex';

export default {
  name: 'Home',

  components: {
    AddressCard
  },

  mounted() {
    if(this.addresses.length == 0) {
      this.$store.dispatch('address/fetchData');
    }
  },
  
  computed: {
    ...mapGetters('address', ['addresses', 'error']),

    latestRegisters() {
      const addressArray = [...this.addresses]
      addressArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      return addressArray.slice(0, 3);
    }
  },
}
</script>

<style lang="scss">
 .container {
  margin-top: 10vh;
 }
</style>