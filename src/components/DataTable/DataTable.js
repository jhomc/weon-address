import { mapState } from 'vuex';
export default {
  props: {
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    search: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    sortBy: { type: Array },
    sortDesc: { type: Boolean, default: true },
    columns: { type: Array, default: () => [] } // Custom columns definition
  },

  data() {
    return {
    };
  },

  mounted() {

  },
  computed: {
    ...mapState('address', ['addressTableLoading']),

    footerText() {
      const totalItems = this.items.length;
      const itemsPerPage = this.options.itemsPerPage || 0;
      const currentPage = this.options.page || 1;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      return `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} de ${totalItems}`;
    }
  },

  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : '-';
    },
    editItem(item) {
      this.$emit('edit', item);
    },
    deleteItem(item) {
      this.$emit('delete', item);
    }
  },
};