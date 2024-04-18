<template>
  <div>
    <h1 class="subheading grey--text">Últimos registros</h1>

    <v-container class="my-5">
      <v-row class="justify-space-between">
        <AddressCard v-for="address in latestRegisters" :key="address.id" :address="address">
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

  computed: {
    ...mapGetters(['addresses', 'error']),

    latestRegisters() {
      const addressArray = [...this.addresses]
      addressArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      return addressArray.slice(0, 3);
    }
  },
}
</script>
