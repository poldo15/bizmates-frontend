<template>
  <div>
    <NavbarComponent></NavbarComponent>
    <br>
    <CityDropdownComponent></CityDropdownComponent>

  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import CityDropdownComponent from '@/components/CityDropdownComponent.vue';

export default {
  name: 'DashboardView',
  components: {
    NavbarComponent,
    CityDropdownComponent
  },
  data: () => ({
    
  }),
}
</script>
