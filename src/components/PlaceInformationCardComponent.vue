<template>
    <div>
        <v-container fluid>
            <v-col
                v-for="(item, i) in list.results"
                :key="i"
                cols="12"
            >
                <v-card
                    id="weather_card"
                >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <br>
                            <div
                                v-for="(item1, j) in item.categories"
                                :key="j"
                                class="d-inline-flex"
                            >
                                <p> 
                                    &nbsp;
                                    <span>
                                        <img 
                                            align="center" 
                                            justify="center" 
                                            :src="`${item1.icon.prefix}bg_32${item1.icon.suffix}`"
                                        />
                                    </span>
                                    &nbsp;
                                    <span class="text-subtitle-2" >{{ item1.name }}</span>
                                    &nbsp;
                                </p>
                            </div>

                            <v-list-item three-line>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <h2>{{ item.name }}</h2>
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                    {{ item.location.formatted_address }}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                    {{ (item.distance / 1000).toFixed(1) }} km away
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-container>
    </div>
</template>
<script>
export default {
    data: () => ({
        
    }),
    props: ["list"],
    components: {
        
    },
    methods: {
        
    }
}
</script>
<style scoped>
#weather_card{
    /* background-image: linear-gradient(to bottom right, #8693AB , #BDD4E7); */
    background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%);
}

</style>