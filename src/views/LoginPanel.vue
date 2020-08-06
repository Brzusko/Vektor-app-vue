<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" md="8" xl="8" lg="8"
      class="white--text mt-16 headerSpacing ml-n0 ml-sm-n0 ml-md-n1 ml-xl-n1 ml-lg-n16 text-lg-h2 text-xl-h2 text-md-h3 text-sm-h4">

        <div class="text-left pt-10">
          SEKCJA | PANEL
        </div>

        <div class="text-center">
          VEKTOR | ZARZĄDZANIA
        </div>

      </v-col>
    </v-row>

    <v-row class="pt-10 pl-xl-16 pl-lg-16 pl-sm-0 pl-0 ml-xl-16 ml-lg-16 ml-sm-16 ml-0"
    justify="start"
    justify-xl="center"
    >
      <v-col cols="12" sm="8" xl="4" lg="8" class="pr-sm-10 pr-16"> 
        <v-text-field dark placeholder="Hasło" v-model="password" type="password">
        </v-text-field>
      </v-col>

      <v-col cols="12" sm="4" xl="4" lg="4" align-self="center" class="text-center pr-16 pr-sm-16">
        <v-btn outlined class="white--text" @click="login">
          <span>./Login</span>
        </v-btn>
      </v-col>

    </v-row>

    <v-row class="ml-0 mt-15 ml-lg-10 ml-sm-10 ml-xl-10 pr-10 pr-xl-0 pr-sm-0">
      <v-col cols="12" sm="8" lg="8" xl="8">
        <v-slide-group dark show-arrows>
          <v-slide-item 
            v-for="(server, i) in servers"
            :key="i"
          >
            <span class="white--text mr-6 listDecoration font-weight-bold text-h0
            ">{{`${server.name} - ${server.count} serwerów `}}</span>
          </v-slide-item>
        </v-slide-group>
        <v-divider dark style="border-color:white; border-width:2px 0 0 0;" class="mt-5 mb-5"></v-divider>
        <span class="white--text text-h5 text-sm-h5 text-lg-h2 text-xl-h2">AKTYWNE USŁUGI</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'LoginPanel',
  data: () => ({
    servers:[
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
    ],
    password: ""
  }),
  components: {
  },
  computed: {
    getToken () {
      return this.$store.getToken;
    }
  },

  mounted() {
    this.fetchServers();
  },

  methods: {
      async fetchServers() {
          this.servers = [];
          let masterServers = await this.$http.get('http://192.168.0.87:5000/servers');

          if(masterServers.data.code == 200)
          {
              for(let i = 0; i< masterServers.data.data.length; i++)
              {

                  let server = masterServers.data.data[i]
                  const obj = {
                      name: server.name,
                      count: server.server_count
                  }
                  this.servers.push(obj);
              }
          }
      },
      async login() {
        let result = await this.$http.post('http://192.168.0.87:5000/panel/login', {password: this.password})
        
        if(result.data.code == 200) {
          await this.$store.commit('setToken', {token: result.data.data.token})
          this.$router.push('/panel');
        }
      }
  }
}
</script>

<style>
.headerSpacing{
  word-spacing: 15px;
}
.listDecoration{
  text-transform: uppercase;
}
</style>
