<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
      clipped-left
      height="90"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink ml-3"
          contain
          src="./assets/Logo.png"
          transition="scale-transition"
          width="40"
        />

      </div>


      <v-spacer></v-spacer>

      <v-menu >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-on="on"
            v-bind="attrs"
            class="hidden-md-and-up mr-6"
          >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(url, i) in pages"
            :key="i"
            link
            :to="url.route"
          >
            {{url.name}}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-for="(url,i) in pages"
        :key="i"
        class="mr-5 hidden-sm-and-down"
        depressed
        active-class="navactive"
        style="background:none;"
        exact
        :to="url.route"
        min-width="150"
      >
        <span>
          {{url.name}}
        </span>
      </v-btn>

      <v-btn
        href="https://discord.gg/75xtxqR"
        target="_blank"
        dark
        class="white"
 
      >
        <span class="mr-2 black--text title">DOŁĄCZ</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      dark
      class="black"
      mini-variant
      height="100%"
      app
      floating
      clipped
      permanent
      mini-variant-width="100px"
      touchless
    >
      <v-container style="height:100%;">
        <v-row
          align="center"
        >
          <v-col align-self="end" style="position:absolute; bottom:0;"> 
            <v-list expand
            width="100%"
            >
              <v-list-item>

              </v-list-item>
              <v-list-item
                v-for="(social, i) in socials"
                :key="i"
                link
                :href="social.link"
                target="_blank"
              >

                <v-img
                max-width="30px"
                  :src="require(`./assets/${social.img}`)"
                ></v-img>

              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>

    <v-main
      style="background-color:black;"
    >
    <v-fade-transition>
      <router-view>
      </router-view>
    </v-fade-transition>
    </v-main>
    <v-footer
      dark
      outlined
      class="black"
    >
      <v-spacer></v-spacer>
      <span>COPYRIGHT 2K20 VEKTOR</span>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    socials: [
      {link: 'https://www.facebook.com/Sekcja-Vektor-110826327370979', img:'fb.png'},
      {link: 'https://discord.gg/75xtxqR', img:'discord.png'},
      {link: 'ac', img:'yt.png'},
    ],
    pages: [
      {name: "Home", route:'/'},
      {name: "Panel", route:'/panel/login'},
      {name: "Inner Panel", route:'/panel'}
    ]
  }),
};
</script>

<style>

* {
  font-family: 'Roboto', sans-serif;
}

.navactive {
  border-top: 2px solid white;
  background: none;
}

</style>
