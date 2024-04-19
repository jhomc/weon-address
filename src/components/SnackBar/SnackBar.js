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