<template>
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    :timeout="timeout"
    top
    :multi-line="multiLine"
    :vertical="vertical"
  >
    <v-row >
      <v-col class="my-auto" >
        {{ snackbarMessage }}
      </v-col>
      <v-col class="text-right">
        <v-btn color="white" text @click="snackbar = false">{{ $t("message.close")  }}</v-btn>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarMessage: '',
      snackbarColor: '',
      timeout: 6000,
      multiLine: false,
      vertical: false
    };
  },
  methods: {
    showSnackbar(message, color) {
      this.snackbarMessage = message;
      this.snackbarColor = color;
      this.snackbar = true;
    }
  }
};
</script>