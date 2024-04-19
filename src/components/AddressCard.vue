<template>
  <v-flex xs12 md3 class="mb-4">
    <v-card class="fill-height">
      <!-- <v-img
      height="250"
      :src="generateImageSource()"
      ></v-img> -->
      <v-card-text>
        <div class="text-h5">{{ address.title }}</div>
        <p class="mb-0">{{ address.street }} - {{ address.complement }}</p>
        <p class="mb-0">{{ address.neighborhood }} - {{ address.city }} - {{ address.state }}</p>
        <p>CEP: {{ address.zipcode }}</p>
        <p class="mb-0"><strong>{{ $t("message.created_at")  }}:</strong> {{ formattedCreatedAt }}</p>
        <p><strong>{{ $t("message.updated_at")  }}:</strong>{{ formattedUpdatedAt }}</p>
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
      updated_at: String,
    },
    source: String
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

    },
 
    generateImageSource() {
      // Generate a unique image URL based on the address data
      return `https://source.unsplash.com/random/?street=${this.address.street}&address=${this.address.city}&country=Brazil`;
    }
  },
};
</script>