<template>
  <v-app>
    <v-main>
      <NavBar/>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from './components/NavbarComponent.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
