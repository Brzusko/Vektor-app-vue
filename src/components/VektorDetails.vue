<template>
    <v-card
        outlined
        dark
        class="black mt-16 text-right"

    >
        <v-card-subtitle class="text-right text-h4 white--text font-weight-bold">
            Temat omawiany na spotkaniu
        </v-card-subtitle>
        <v-divider style="border-color:white; border-width:2px 0 0 0;"> </v-divider>
        <v-card-text class="white--text">
            {{title}}
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    name: 'VektorDetails',
    props: ["title", "icon", "desc"],
    data: () => ({
     
    }),
  }
</script>
