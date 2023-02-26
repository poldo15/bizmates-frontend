<template>
  <v-app>
    <v-main>
      <NavbarComponent></NavbarComponent>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';

export default {
  name: 'App',

  components: {
    NavbarComponent,
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