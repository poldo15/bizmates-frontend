<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col
                cols="6"
                lg="6"
                md="12"
                sm="12"
            >
                <v-card>
                    <v-list-item two-line>
                        <v-list-item-content>
                            <v-list-item-title class="text-h2">
                                <b>{{ this.responseData.city.name }}</b>
                            </v-list-item-title>                           
                            <v-list-item-subtitle>{{ convertEpochTime(this.responseData.city.sunrise).format("MMMM D, YYYY") }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn color="primary" @click="goToInformation">
                                Search for Places <v-icon
                                    right
                                    dark
                                >
                                    mdi-magnify
                                </v-icon>
                            </v-btn>
                            <SearchPlacesComponent
                                :dialog.sync = dialog
                                @close-dialog="(dialog = false)"
                                :cityName.sync= this.responseData.city.name
                            ></SearchPlacesComponent>
                        </v-list-item-action>
                    </v-list-item>

                    <!-- SUNRISE -->
                    <v-row align="center" class="mx-0">
                        <v-col
                            cols="6"
                        >
                            <div class="grey--text text-subtitle-1">Sunrise</div>
                            <v-card-title>{{ convertEpochTime(this.responseData.city.sunrise).format("hh:mm A") }}</v-card-title>
                        </v-col>
                        <v-col cols="6">
                            <v-img
                                src="../assets/sunrise-icon.png"
                                alt="Sunny image"
                                width="92"
                            ></v-img>
                        </v-col>
                    </v-row>
                    <!-- SUNSET -->
                    <v-row align="center" class="mx-0">
                        <v-col
                            cols="6"
                        >
                            <div class="grey--text text-subtitle-1">Sunset</div> 
                            <v-card-title>{{ convertEpochTime(this.responseData.city.sunset).format("hh:mm A") }}</v-card-title>
                        </v-col>
                        <v-col cols="6">
                            <v-img
                                src="../assets/sunset-icon.png"
                                alt="Sunny image"
                                width="92"
                            ></v-img>
                        </v-col>
                    </v-row>
                    
                    <v-container fluid>
                        <v-expansion-panels accordion>
                            <v-expansion-panel
                                v-for="item in upcomingHours"
                                :key="item.dt"
                            >
                                <v-expansion-panel-header>
                                    <v-row align="center">
                                        <v-col
                                            cols="4"
                                        >                                        
                                            <h4>{{ convertEpochTime(item.dt).format("hh:mm A") }}</h4>
                                            <p class="caption">{{ convertEpochTime(item.dt).format("MMMM D, YYYY") }}</p>
                                        </v-col>
                                        <v-col
                                            cols="4"
                                        >
                                        <div></div>
                                            {{ `${tempToC(item.main.temp) }` }}&deg;C / {{ `${tempToF(item.main.temp) }` }}&deg;F
                                        </v-col>
                                        <v-col
                                            cols="4"
                                        >
                                            <img 
                                                v-bind:src="getIcon(item.weather[0].icon)"
                                                id="table_icon_img"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-simple-table dense>
                                        <template v-slot:default>
                                        <tbody>
                                            <tr>
                                                <td>Clouds</td>
                                                <td>
                                                    <v-icon>mdi-clouds</v-icon>
                                                </td>
                                                <td>
                                                    {{ item.clouds.all }}%
                                                </td>
                                                <td>
                                                    {{ capitalizeFirstLetter(item.weather[0].description) }}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>Wind</td>
                                                <td>
                                                    <v-icon>mdi-tailwind</v-icon>
                                                </td>
                                                <td colspan="2">
                                                    {{ item.wind.speed }} meter/sec
                                                </td>                                        
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-container>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import config from '../config/config';
import SearchPlacesComponent from './SearchPlacesComponent.vue';
var moment = require("moment");

export default {
    name: "WeatherCardComponent",
    components:{
        SearchPlacesComponent
    },
    props: ["lat", "lon"],
    data: () => ({
        config: config,
        axios: axios,
        moment: moment,
        responseData: null,
        upcomingHours: {},
        dialog: false,
    }),
    methods: {
        getWeather: function() {

            axios
            .get(
                this.config.api + this.config.weather,
                {
                    params: {
                        lat: this.lat,
                        lon: this.lon
                    }
                }
            ).then((response) => {
                
                this.responseData = response.data;
                
                this.upcomingHours = response.data.list.slice(0, 8);
                
            }).catch((err) => {
                console.log(err)
            })
        },

        convertEpochTime: function (epochTime) {
            let date = new Date(epochTime * 1000);
            return moment(date);
        },

        getIcon: function(icon){
            return "http://openweathermap.org/img/wn/"+icon+"@4x.png"
        },

        tempToC: function(temp){
            return (temp-273.15).toFixed(2)
        },

        tempToF: function(temp){
            return (((temp-273.15)*1.8)+32).toFixed(2);
        },

        capitalizeFirstLetter: function (word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        },

        goToInformation: function() {
            this.dialog = true;
        }
    },
    mounted(){
        this.getWeather();
    }
}
</script>
<style scoped>
#table_icon_img{
    max-width: 50px !important;
    height: 50px;
}
</style>