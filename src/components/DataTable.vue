<template>
  <div>
    <v-data-table :headers="headers" :items="items" item-key="id" :search="search" :show-select="false"
      :loading="addressTableLoading" class="elevation-1" :sort-by="['updated_at']" :sort-desc="true">
      <template v-slot:item.created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:item.updated_at="{ item }">
        {{ item.updated_at ? formatDate(item.updated_at) : '-' }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="editItem(item)" class="mr-2">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
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
</script>