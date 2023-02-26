<template>
  <v-container fill-height>
      <v-row justify="center" align="center">
          <v-col cols="12" sm="12">
            <CityDropdownComponent></CityDropdownComponent>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
import CityDropdownComponent from '@/components/CityDropdownComponent.vue';

export default {
  name: 'DashboardView',
  components: {
    // NavbarComponent,
    CityDropdownComponent
  },
  data: () => ({
    
  }),
}
</script>
