<template>
  <v-flex xs12 md3 class="mb-4">
    <v-card class="fill-height" >
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

<script src="./AddressCard.js"></script>