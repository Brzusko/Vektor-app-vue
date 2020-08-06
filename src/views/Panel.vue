<template>
  <v-container class="white--text">
      <v-btn dark outlined style="border:none; position:absolute;" @click="logOut">
          <v-icon large>mdi-exit-to-app</v-icon>
          <span class = "ml-3">LOGOUT</span>
      </v-btn>

      <v-row class="pt-16" justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="6">
              <span class="text-h5 text-sm-h4 text-md-h3 text-lg-h2 text-xl-h2">SERWERY</span>
              <v-divider style="border-color:white; border-width:2px 0 0 0;" class="mt-5 mb-5"></v-divider>
              Kliknij żeby zarządzać
          </v-col>
      </v-row>

      <v-row class="" justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="6" align-self="center" class="text-center">
              <v-list outlined dark expand style="background:black; border:none; border-left:2px solid white;">
                  <v-list-item
                    v-for="(server, i) in servers"
                    :key="i"
                    link
                    @click.stop="fetchSpecifiedMasterServer(server.name)"
                  >
                   <v-list-item-content>
                       {{`${server.name} - ${server.count} servers`}}
                   </v-list-item-content>

                  </v-list-item>
              </v-list>
          </v-col>
      </v-row>

      <v-row class="" justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="6" align-self="center" class="text-center">
              <v-btn @click.stop="fetchBannedServers">ZBANOWANE SERWERY</v-btn>
              <v-btn @click.stop="fetchServers" class="ml-4">REFRESH</v-btn>
          </v-col>
      </v-row>

      <v-row class="pt-16" justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="6">
              <div class="text-h5 text-right text-sm-h4 text-md-h3 text-lg-h2 text-xl-h2">SPOTKANIA</div>
              <v-divider style="border-color:white; border-width:2px 0 0 0;" class="mt-5 mb-5"></v-divider>
          </v-col>
      </v-row>

      <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="6">
            <v-text-field dark placeholder="Temat" v-model="meeting_title">
            </v-text-field>
          </v-col>
      </v-row>

      <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="6">
            <v-text-field dark placeholder="Opis" v-model="meeting_desc">
            </v-text-field>
          </v-col>
      </v-row>

      <v-row class="" justify="center" align="center">
          <v-col cols="12" sm="10" md="8" lg="6" xl="6" align-self="center" class="text-center">
              <v-btn outlined dark @click="updateMeeting">./Send</v-btn>
          </v-col>
      </v-row>
      
      <v-dialog fullscreen hide-overlay dark transition="dialog-bottom-transition" v-model="dialog">
          <v-card>
            <v-btn dark outlined style="border:none; position:absolute; top:20px;" @click.stop="dialog = false">
                <v-icon large>mdi-chevron-left</v-icon>
                <span class = "ml-3">BACK</span>
            </v-btn>
            <v-row class="pt-16" justify="center" align="center">
                <v-col cols="12" sm="10" md="8" lg="6" xl="6">
                    <div class="text-h5 text-sm-h4 text-md-h3 text-lg-h3 text-xl-h3">{{`${selectedService.serviceType} - ${selectedService.name} zarządzanie`}}</div>
                    <v-divider style="border-color:white; border-width:2px 0 0 0;" class="mt-5 mb-5"></v-divider>
                </v-col>
            </v-row>     

            <v-row class="" justify="center" align="center">
                <v-col cols="12" sm="10" md="8" lg="6" xl="6" align-self="center" class="text-center" v-if="selectedService.serviceType == 'Master Serwer'">
                    <v-list outlined dark expand style="">
                        <v-list-item
                            v-for="(service, i) in selectedService.serviceElements"
                            :key="i"
                        >
                        <v-list-item-content>
                            {{`${service.server_name}, ${service.address}:${service.port}, Players: ${service.player_count}/${service.max_players}`}}
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn-toggle>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        >
                                            <v-icon>
                                                mdi-cancel
                                            </v-icon>

                                        </v-btn>
                                    </template>
                                    Ban
                                </v-tooltip>

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        >
                                            <v-icon>
                                                mdi-minus-circle-off-outline
                                            </v-icon>

                                        </v-btn>
                                    </template>
                                    Kick
                                </v-tooltip>

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        >
                                            <v-icon>
                                                mdi-information-outline
                                            </v-icon>

                                        </v-btn>
                                    </template>
                                    Info
                                </v-tooltip>

                            </v-btn-toggle>
                        </v-list-item-action>

                        </v-list-item>
                    </v-list>

                       <v-text-field dark placeholder="Serwer do zbanowania">
                       </v-text-field>
                       <v-btn light>
                           ./Ban
                       </v-btn>
                </v-col>


                <v-col cols="12" sm="10" md="8" lg="6" xl="6" align-self="center" class="text-center" v-else-if="selectedService.serviceType == 'Banned Servers'">
                    <v-list outlined dark expand style="">
                        <v-list-item
                            v-for="(service, i) in selectedService.serviceElements"
                            :key="i"
                            link
                        >
                        <v-list-item-content>
                            {{`Server address - ${service.address}`}}
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn-toggle>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        icon
                                        >
                                            <v-icon>
                                                mdi-delete
                                            </v-icon>

                                        </v-btn>
                                    </template>
                                    Unban
                                </v-tooltip>
                            </v-btn-toggle>
                        </v-list-item-action>
                        
                        </v-list-item>
                    </v-list>
                </v-col>

            </v-row>        
          </v-card>
      </v-dialog>

  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Panel',
  data: () => ({
    servers:[
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
      {name: "Pong", count:"10"},
    ],
    dialog:false,
    selectedService: {
        name: "",

        serviceType: 'Banned Servers',
        serviceElements: [
            {address:"127.0.0.1"},
            {address:"127.0.0.1"},
            {address:"127.0.0.1"},
            {address:"127.0.0.1"},
            {address:"127.0.0.1"}
        ]
    },
    meeting_title: "",
    meeting_desc: ""
  }),
  components: {
  },
  mounted() {
      if(this.$store.getters.getToken == undefined)
        this.$router.push('/panel/login');
      this.fetchServers();

      setInterval(()=>{
          this.fetchServers();
      }, 15000)
  },

  methods: {
      openBannedServers() {
          this.dialog = true;
          this.selectedService = this.dummyService2;
      },

      openMasterServer() {
          this.dialog = true;
          this.selectedService = this.dummyService1;
      },
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
      async fetchSpecifiedMasterServer(serverName){
        let masterServer = await this.$http.get(`http://192.168.0.87:5000/servers/${serverName}`);
        
        let serviceObj = {
            name: serverName,
            serviceType: "Master Serwer",
            serviceElements: []
        }

        if(masterServer.data.code == 200) {
            
            for(let i = 0; i < masterServer.data.data.length; i++){
                let server =  masterServer.data.data[i];
                const parsed_server = JSON.parse(server);
                serviceObj.serviceElements.push(parsed_server);
            }
        }
        this.selectedService = serviceObj;
        this.dialog = true;
      },
      async fetchBannedServers() {
          let bannedServers = await this.$http.get('http://192.168.0.87:5000/panel/view_banned_servers');
          
            let serviceObj = {
                name: "",
                serviceType: "Banned Servers",
                serviceElements: []
            }
            
          if(bannedServers.data.code == 200 || bannedServers.status == 200){
              let bannedServersArray = Object.values(bannedServers.data.data);
              for(let i = 0; i < bannedServersArray.length; i++) {
                  serviceObj.serviceElements.push(bannedServersArray[i]);
              }
          }
          this.selectedService = serviceObj;
          this.dialog = true;
      },

    async updateMeeting() {
        const obj = {
            meeting_title: this.meeting_title,
            meeting_desc: this.meeting_desc,
            token: this.$store.getters.getToken
        }

        let result = await this.$http.post('http://192.168.0.87:5000/panel/update_meeting', obj);

        console.log(obj.token)

        if(result.data.code == 500) {
            if(result.data.message == 'USER_IS_NOT_LOGGED_IN')
            {
                await this.$store.commit('resetToken');
                this.$router.push('/panel/login');
            }
        }
    },
    async logOut(){
        let result = await this.$http.get('http://192.168.0.87:5000/panel/logout');
        
        if(result.data.code == 200)
        {
                await this.$store.commit('resetToken');
                this.$router.push('/panel/login');
        }
    },

    async banServer(address, isForm) {
        console.log(address, isForm);
    },

    async deleteServerFromList() {

    },

    async viewInformation(){

    }
  },
}
</script>

<style>
.headerSpacing{
  word-spacing: 15px;
}
.listDecoration{
  text-transform: uppercase;
}
.buttonCenter{
    transform: translate(350%,10%);
}
</style>
