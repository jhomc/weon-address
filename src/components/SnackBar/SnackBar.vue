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

<script src="./SnackBar.js"></script>