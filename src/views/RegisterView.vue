<template>
  <div>
    <h1 class="subheading grey--text">{{ $t("message.register") }}</h1>

    <v-container>
      <v-btn color="primary" class="mb-4" @click="addNewItem">Novo</v-btn>
      <data-table
        :headers="headers"
        :items="addresses"
        :search="search"
        :show-select="false"
        :sort-by="['updated_at']"
        :sort-desc="true"
        @edit="editItem"
        @delete="deleteItem"
        >
      </data-table>
  
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            {{ isNewItem ? $t("message.newAddress") : $t("message.editAddress")  }}
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field v-model="editedItem.title" label="Título"></v-text-field>
              <v-text-field v-model="editedItem.zipcode" label="CEP" @input="debouncedFetchAddressData"></v-text-field>
              <v-text-field v-model="editedItem.street" label="Logradouro" disabled></v-text-field>
              <v-text-field v-model="editedItem.complement" label="Complemento" disabled></v-text-field>
              <v-text-field v-model="editedItem.neighborhood" label="Bairro" disabled></v-text-field>
              <v-text-field v-model="editedItem.city" label="UF" disabled></v-text-field>
              <v-text-field v-model="editedItem.state" label="Estado" disabled></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">{{ $t("message.cancel")  }}</v-btn>
            <v-btn color="blue darken-1" text @click="saveItem">{{ $t("message.save")  }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <SnackBar ref="snackbarComponent"></SnackBar>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { debounce } from 'lodash';
import { viacep, fetchViacepAddress } from '@/services/viacep';
import DataTable from '@/components/DataTable/DataTable.vue'
import SnackBar from '@/components/SnackBar/SnackBar.vue'

export default {
  components: {
    DataTable,
    SnackBar
  },
  data() {
    return {
      headers: [
        { text: 'Título', value: 'title' },
        { text: 'Logradouro', value: 'street' },
        { text: 'Bairro', value: 'neighborhood' },
        { text: 'Cidade', value: 'city' },
        { text: 'UF', value: 'state' },
        {text: 'CEP', value: 'zipcode'},
        { text: 'Data de criação', value: 'created_at' },
        { text: 'Ultima atualização', value: 'updated_at' },
        { text: 'Ações', value: 'actions', sortable: false }
      ],
      search: '',
      selectedItems: [],
      //loading: false,
      dialog: false,
      isNewItem: false,
      editedItem: {
        title: '',
        zipcode: '',
        street: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
      },
      valid: true
    };
  },

 async mounted() {
    if(this.addresses.length == 0) {
      this.fetchDataTable()
    }
  },
  computed: {
    ...mapState('address', ['addresses']),
    ...mapGetters('viacep', ['getAddress'])
  },
  methods: {
    ...mapActions('address', ['addAddress', 'editAddress', 'deleteAddress', 'changeAddressTableLoading', 'fetchData']),
    ...mapActions('viacep', ['fetchViaCepAddress']),
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
    },
    deleteItem(item) {
      if (confirm('Tem certeza que deseja excluir o registro?')) {
        this.deleteAddress(item.id);
      }
    },
    saveItem() {
      if(this.editedItem.zipcode.replace('-', '').length < 8) {
        this.$refs.snackbarComponent.showSnackbar('CEP inválido', 'error')
        return
      }

      if(!this.valid) {
        if (this.editedItem.zipcode.replace('-', '').length > 8) {
          this.$refs.snackbarComponent.showSnackbar('CEP com mais de 8 digitos', 'error')
          return
        }

        this.$refs.snackbarComponent.showSnackbar('Formulário inválido', 'error')
        return
      }

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
    debouncedFetchAddressData: debounce(function () {
      this.fetchAddressData();
    }, 500),

    async fetchAddressData() {
      if (this.editedItem.zipcode.replace('-', '').length < 8) {
        this.valid = false
        return
      }
      if (this.editedItem.zipcode.replace('-', '').length > 8) {
        this.$refs.snackbarComponent.showSnackbar('CEP inválido', 'error')
        this.valid = false
        return
      } 

      try {
        const response = await fetchViacepAddress(this.editedItem.zipcode)

        if(response.data.erro) throw new Error()
        const addressData = response.data;

        this.editedItem.street = addressData.logradouro || '';
        this.editedItem.complement = addressData.complemento || '';
        this.editedItem.neighborhood = addressData.bairro || '';
        this.editedItem.city = addressData.localidade || '';
        this.editedItem.state = addressData.uf || ''

        this.valid = true

      } catch (error) {
        console.error('Error fetching address data:', error);
        this.$refs.snackbarComponent.showSnackbar('CEP inválido', 'error')
      }


    },

    async fetchDataTable() {
      this.changeAddressTableLoading(true)

      await this.fetchData()

      this.changeAddressTableLoading(false)
    }

  }
};
</script>
