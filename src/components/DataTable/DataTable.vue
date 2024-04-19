<template>
  <div>
    <v-data-table :headers="headers" :items="items" item-key="id" :search="search" :show-select="false"
      :loading="addressTableLoading" class="elevation-1" :sort-by="['updated_at']" :sort-desc="true" :footer-props="{
      'items-per-page-text': 'Itens por página'}" >
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
      <template v-slot:[`footer.page-text`]="items"> 
        {{ items.pageStart }} - {{ items.pageStop }} de {{ items.itemsLength }}
      </template>
    </v-data-table>
  </div>
</template>

<script src="./DataTable.js"></script>