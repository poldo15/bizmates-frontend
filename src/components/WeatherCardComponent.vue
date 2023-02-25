<template>
    <v-row>
        <v-spacer></v-spacer>
        <v-col
            cols="12"
            md="6"
            sm="6"
        >
            <v-card
                class="mx-auto"
            >
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title class="text-h5">
                        {{ this.responseData.city.name }}
                        </v-list-item-title>
                        <!-- <v-list-item-subtitle>Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle> -->
                        <v-list-item-subtitle>{{ convertEpochTime(this.responseData.city.sunrise).format("MMMM D, YYYY") }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text>
                    <!-- SUNRISE -->
                    <v-row align="center">
                        <v-col
                            class="text-h5"
                            cols="6"
                        >
                        <v-list-item-subtitle>Sunrise</v-list-item-subtitle>
                        {{ convertEpochTime(this.responseData.city.sunrise).format("hh:mm A") }}
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
                    <v-row align="center">
                        <v-col
                            class="text-h5"
                            cols="6"
                        >
                        <v-list-item-subtitle>Sunset</v-list-item-subtitle>
                        {{ convertEpochTime(this.responseData.city.sunset).format("hh:mm A") }}
                        </v-col>
                        <v-col cols="6">
                        <v-img
                            src="../assets/sunset-icon.png"
                            alt="Sunny image"
                            width="92"
                        ></v-img>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-list-item>
                <v-list-item-icon>
                    <v-icon>mdi-send</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                <v-list-item-icon>
                    <v-icon>mdi-cloud-download</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle>48%</v-list-item-subtitle>
                </v-list-item>

                <!-- <v-slider
                v-model="time"
                :max="6"
                :tick-labels="labels"
                class="mx-4"
                ticks
                ></v-slider> -->

                <v-list class="transparent">
                    <v-list-item
                        v-for="item in upcomingHours"
                        :key="item.dt"
                    >
                        <v-list-item-title>{{ convertEpochTime(item.dt).format("hh:mm A") }}</v-list-item-title>

                        <v-list-item-icon>
                            <v-img
                                v-bind:src="getIcon(item.weather[0].icon)"
                                alt="Sunny image"
                            ></v-img>
                        </v-list-item-icon>

                        <v-list-item-subtitle class="text-right">
                        {{ `${tempToC(item.main.temp) }` }}&deg;C/{{ `${tempToF(item.main.temp) }` }}&deg;F
                        </v-list-item-subtitle>
                        
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-card-actions>
                <v-btn text>
                    Full Report
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-spacer></v-spacer>
    </v-row>
</template>

<script>
import axios from 'axios';
import config from '../config/config';
var moment = require("moment");

export default {
    name: "WeatherCardComponent",
    props: {
        lon: Number,
        lat: Number
    },
    data: () => ({
        config: config,
        axios: axios,
        moment: moment,
        responseData: null,
        upcomingHours: {}
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

                let dateToday = this.convertEpochTime(response.data.city.sunrise).format("YYYY-MM-DD");
                
                const loopingDates = response.data.list.map((e) => {
                    let datesAvailable = this.convertEpochTime(e.dt).format("YYYY-MM-DD");
                
                    if(dateToday == datesAvailable){
                        return e
                    }
                })

                this.upcomingHours = loopingDates.filter((e) => {
                    return e !== undefined;
                })
                
            }).catch((err) => {
                console.log(err)
            })
        },

        convertEpochTime: function (epochTime) {
            let date = new Date(epochTime * 1000);
            return moment(date);
        },

        getIcon: function(icon){
            return "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        },

        tempToC: function(temp){
            return (temp-273.15).toFixed(2)
        },

        tempToF: function(temp){
            return (((temp-273.15)*1.8)+32).toFixed(2);
        }
    },
    mounted(){
        this.getWeather();
    }
}
</script>
<style scoped>
#weather_card{
    background-image: linear-gradient(to bottom right, #8693AB , #BDD4E7);
}
</style>