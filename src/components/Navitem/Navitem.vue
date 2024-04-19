<template>
    <v-list-item link router :to="route">
      <v-list-item-action>
        <v-icon class="white--text">{{ icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title class="white--text">{{ text }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
</template>

<script src="./Navitem.js" ></script>