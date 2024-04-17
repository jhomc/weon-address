<template>
   <v-flex xs12 md3 class="mb-4">
      <v-card>
        <v-card-text>
          <div class="text-h5">{{ address.title }}</div>
          <p class="mb-0">{{ address.street }} - {{ address.complement }}</p>
          <p class="mb-0">{{ address.neighborhood }} - {{ address.city }} - {{ address.state }}</p>
          <p>CEP: {{ address.zipcode }}</p>
          <p>Criado em: {{ formatDate(address.created_at) }}</p>
          <p>Ultima atualização: {{ address.updated_at ? formatDate(address.updated_at) : formatDate(address.created_at) }}</p>
        </v-card-text>
      </v-card>
    </v-flex>
</template>

<script>
export default {
  name: 'AddressCard',

  props: {
    address: {
      title: String,
      street: String,
      complement: String,
      neighborhood: String,
      city: String,
      state: String,
      zipcode: String,
      created_at: String,
      updated_at: String | null
    }
  },

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    formatDate(date) {
      const dateParts = date.split('T')

      const formatedDate = dateParts[0].split('-').reverse().join('/')
      const hours = dateParts[1]

      return formatedDate + ' às ' + hours
    }
  },
};
</script>