<template>
    <v-container grid-list-md text-xs-center>
        <v-row align="center">
            <v-spacer></v-spacer>
            <v-col
                class="d-flex"
                cols="12"
                sm="4"
            >
            <v-select
                :items="cities"
                :item-text="'city_name'"
                :item-value="'city_name'"
                label="Select City"
                v-model="selectedCity"
                v-on:change="selectCity"
                dense
                outlined
                return-object
            ></v-select>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
        
        <v-row
            v-if="selectedCity != null"
        >
            <WeatherCardComponent
                :lon.sync="this.selectedCity.lon"
                :lat.sync="this.selectedCity.lat"
                :key="componentKey"
            ></WeatherCardComponent>
        </v-row>
    </v-container>
</template>

<script>
import WeatherCardComponent from '@/components/WeatherCardComponent.vue';

export default {
    components: {
        WeatherCardComponent,
    },
    data: () => ({
        cities: [
            {
                city_name: "Tokyo",
                lat: "35.689487",
                lon: "139.691706"
            },
            {
                city_name: "Yokohama",
                lat: "35.443708",
                lon: "139.638026"
            },
            {
                city_name: "Kyoto",
                lat: "35.0116",
                lon: "135.7681"
            },
            {
                city_name: "Osaka",
                lat: "34.6937",
                lon: "135.5023"
            },
            {
                city_name: "Sapporo",
                lat: "43.062096",
                lon: "141.354376"
            },
            {
                city_name: "Nagoya",
                lat: "35.181446",
                lon: "136.906398"
            }
        ],
        selectedCity: null,
        componentKey: 0
    }),
    methods: {
        selectCity() {
            console.log("City name: ", this.selectedCity.city_name)
            console.log("Lat: ", this.selectedCity.lat)
            console.log("Lon: ", this.selectedCity.lon)
            this.forceRerender();
        },
        forceRerender() {
            this.componentKey += 1
        }
    }
}
</script>