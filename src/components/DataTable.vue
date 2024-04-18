<v-data-table
:headers="headers"
:items="items"
:search="search"
:show-select="false"
:loading="loading"
:sort-by="sortBy"
:sort-desc="sortDesc"
class="elevation-1"
>
<!-- Custom slots for item properties -->
<template v-for="column in columns" v-slot:[`item.${column.prop}`]="{ item }">
  <slot :name="column.prop" :item="item">{{ item[column.prop] }}</slot>
</template>
<!-- Default actions slot -->
<template v-slot:item.actions="{ item }">
  <v-icon @click="editItem(item)" class="mr-2">mdi-pencil</v-icon>
  <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
</template>
</v-data-table>
</template>

<script>
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
methods: {
editItem(item) {
  this.$emit('edit', item);
},
deleteItem(item) {
  this.$emit('delete', item);
}
}
};