<template>
  <v-container>
    <v-btn color="primary" class="mb-4" @click="addNewItem">Novo</v-btn>
    <v-data-table
      :headers="headers"
      :items="addresses"
      item-key="id"
      :search="search"
      :show-select="false"
      :loading="loading"
      class="elevation-1"
    >
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

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          {{ isNewItem ? 'Novo Endereço' : 'Editar Endereço' }}
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="editedItem.title" label="Título"></v-text-field>
            <v-text-field v-model="editedItem.zipcode" label="CEP" @input="debouncedFetchAddressData"></v-text-field>
            <v-text-field v-model="editedItem.street" label="Rua" disabled ></v-text-field>
            <v-text-field v-model="editedItem.complement" label="Complemento" disabled></v-text-field>
            <v-text-field v-model="editedItem.neighborhood" label="Bairro" disabled></v-text-field>
            <v-text-field v-model="editedItem.city" label="Cidade" disabled></v-text-field>
            <v-text-field v-model="editedItem.state" label="Estado" disabled></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="saveItem">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { debounce } from 'lodash';
import { viacep } from '@/services/api';

export default {
  data() {
    return {
      headers: [
        { text: 'Título', value: 'title' },
        { text: 'Logradouro', value: 'street' },
        { text: 'Cidade', value: 'city' },
        { text: 'Bairro', value: 'neighborhood' },
        { text: 'UF', value: 'state' },
        { text: 'Data de criação', value: 'created_at' },
        { text: 'Ultima atualização', value: 'updated_at' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      search: '',
      selectedItems: [],
      loading: false,
      dialog: false,
      isNewItem: false,
      editedItem: {
        title: '',
        zipcode: '',
        street: '',
        complement: '',
        neighborhood:'',
        city:'',
        state: ''
        // Add more properties for other address fields here
        
      },
      valid: true
    };
  },
  computed: {
    ...mapState(['addresses']),
    editedItemIndex() {
      return this.addresses.indexOf(this.editedItem);
    }
  },
  methods: {
    ...mapActions(['addAddress', 'editAddress', 'deleteAddress']),
    formatDate(date) {
      return date ? new Date(date).toLocaleString() : '-';
    },
    updateSelectedItems(value) {
      this.selectedItems = value;
    },
    editItem(item) {
      this.dialog = true;
      this.isNewItem = false;
      this.editedItem = { ...item };
      this.editedItem.updated_at = new Date().toISOString();
    },
    deleteItem(item) {
      if (confirm('Are you sure you want to delete this address?')) {
        this.deleteAddress(item.id);
      }
    },
    saveItem() {
      if (this.isNewItem) {
        this.addAddress(this.editedItem);
      } else {
        this.editAddress(this.editedItem);
      }
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.editedItem = {
        title: '',
        // Add more properties for other address fields here
      };
      this.valid = true;
    },
    addNewItem() {
      this.isNewItem = true;
      this.dialog = true;
    },
    debouncedFetchAddressData: debounce(function() {
      this.fetchAddressData();
    }, 500),

    async fetchAddressData() {
      if(this.editedItem.zipcode.replace('-', '').length != 8) return
      
      try {
        const response = await viacep.get(`/${this.editedItem.zipcode}/json`);
        const addressData = response.data;

        // Update the disabled fields with the retrieved address data
        this.editedItem.street = addressData.logradouro || '';
        this.editedItem.complement = addressData.complemento || '';
        this.editedItem.neighborhood = addressData.bairro || '';
        this.editedItem.city = addressData.localidade || '';
        this.editedItem.state = addressData.uf || '';

        if(this.isNewItem) {
          this.editedItem.created_at = new Date().toISOString()
          this.editedItem.updated_at = new Date().toISOString()
        } else {
          this.editedItem.updated_at = new Date().toISOString()
        }
        
      } catch (error) {
        console.error('Error fetching address data:', error);
        // Handle error - You can display an error message to the user if needed
      }
      
      
    }

  }
};
</script>
