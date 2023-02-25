<template>
    <div>
        <v-app-bar
            id="navbar"
            dark
            app
            fixed
        >
            <v-app-bar-nav-icon hidden></v-app-bar-nav-icon>
    
            <v-toolbar-title >Japan Weather</v-toolbar-title>
    
            <v-spacer></v-spacer>

            <v-menu
                left
                bottom
            >
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>

export default {
  name: 'NavbarComponent',
}
</script>

<style lang="scss">

#navbar{
    background-color: rgba(56, 0, 54);
}

</style>