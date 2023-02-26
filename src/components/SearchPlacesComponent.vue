<template>
    <v-dialog
        transition="dialog-top-transition"
        max-width="70%"
        :value="dialog"
      >
        <template>
            <v-card height="auto">
                <v-toolbar
                    color="primary"
                    dark
                >
                Place Information
                </v-toolbar>
                <v-container fluid>
                    <v-card-title>
                        Search places in {{cityName}}
                    </v-card-title>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col
                            class="d-flex"
                            cols="12"
                            sm="12"
                            md="6"
                        >
                            <v-text-field
                                v-model="keyword"
                                label="What your looking for..."
                            >
                            </v-text-field>
                            <v-btn
                                @click="searchKeyword"
                            >
                                Search <v-icon dark>mdi-magnify</v-icon>
                            </v-btn>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>
                <v-divider></v-divider>

                <PlaceInformation
                    :list.sync = this.result
                ></PlaceInformation>

                </v-container>

                <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="close"
                    >Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import axios from 'axios';
import config from '../config/config';
var moment = require("moment");
import PlaceInformation from '@/components/PlaceInformationCardComponent.vue'

export default {
    data: () => ({
        config: config,
        axios: axios,
        moment: moment,
        categories: [],
        selectedCategory: null,
        result: null,
        lat: localStorage.getItem("lat"),
        lon: localStorage.getItem("lon"),
        keyword: ""
    }),
    props: ["dialog", "cityName"],
    components: {
        PlaceInformation
    },
    methods: {
        apiCall: function (lat, lon, keyword){
            axios
            .get(
                this.config.api + this.config.places,
                {
                    params: {
                        lat: lat,
                        lon: lon,
                        keyword: keyword
                    }
                }
            ).then((response) => {

                this.result = response.data;
                console.log(this.result)

            }).catch((err) => {
                console.log(err)
            })
        },
            
        findViaCategory: function(keyword){

            this.apiCall(this.lat, this.lon, keyword);
        },
        searchKeyword: function(){
            console.log(this.keyword);
            this.apiCall(this.lat, this.lon, this.keyword)
        },
        close() {
            this.$emit("close-dialog", false);
            this.keyword = ""
        },
    },
    mounted(){
        this.apiCall(this.lat, this.lon, "")
    }
}
</script>