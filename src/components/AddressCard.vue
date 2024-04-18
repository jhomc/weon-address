<template>
  <v-flex xs12 md3 class="mb-4">
    <v-card class="fill-height">
      <v-card-text>
        <div class="text-h5">{{ address.title }}</div>
        <p class="mb-0">{{ address.street }} - {{ address.complement }}</p>
        <p class="mb-0">{{ address.neighborhood }} - {{ address.city }} - {{ address.state }}</p>
        <p>CEP: {{ address.zipcode }}</p>
        <p class="mb-0"><strong>Criado em:</strong> {{ formattedCreatedAt }}</p>
        <p><strong>Última atualização:</strong>{{ formattedUpdatedAt }}</p>
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
      updated_at: String
    }
  },

  data() {
    return {

    };
  },

  mounted() {

  },

  computed: {
    formattedCreatedAt() {
      return this.formatDate(this.address.created_at);
    },
    formattedUpdatedAt() {
      return this.address.updated_at ? this.formatDate(this.address.updated_at) : this.formatDate(this.address.created_at);
    }
  },

  methods: {
    formatDate(date) {
      const dateParts = new Date(date).toLocaleString().split(',')

      const day = dateParts[0]
      const hour = dateParts[1]

      return day + ' às ' + hour

    }
  },
};
</script>