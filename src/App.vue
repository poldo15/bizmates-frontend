<template>
  <v-app>
    <v-main>
      <!-- <NavBar/> -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import NavBar from './components/NavbarComponent.vue';

export default {
  name: 'App',

  components: {
    // NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>
#app {
  background-image: linear-gradient(to bottom right, #F6EBE6 , #AEE1F9);
}
</style>