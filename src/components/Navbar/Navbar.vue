<template>
  <nav>
    <v-app-bar flat app light class="light-blue lighten-5"> 
      <v-app-bar-nav-icon class="secondary--text" @click="drawer = !drawer"></v-app-bar-nav-icon>     
      <v-toolbar-title class="text-center">
        <span>{{ $t("message.company")  }}</span>
        <span class="font-weight-light">{{ $t("message.companySubname")  }}</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <Navitem v-for="link in links" :key="link.text" :icon="link.icon" :text="link.text" :route="link.route"></Navitem>
      </v-list>
    </v-navigation-drawer>

  </nav>
</template>

<script src="./Navbar.js"></script>