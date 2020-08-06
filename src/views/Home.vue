<template>
  <v-container>
    <v-row
      class="pt-16"
    >
      <v-col
        cols="12"
        lg="6"
        sm="12"
      >
        <div class="white--text text-lg-h1 text-md-h1 text-sm-h2 text-h3 font-weight-medium text-xl-center text-lg-center text-md-left text-sm-left">SEKCJA</div>
        <br>
        <div class="white--text text-lg-h1 text-md-h1 text-sm-h2 text-h3 font-weight-medium text-xl-right text-lg-right text-md-center text-sm-center text-left text-center">VEKTOR</div>
        <v-divider
        dark
        >
        </v-divider>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        sm="12"
        align-self="end"
      >
        <div class="white--text font-weight-light mb-xs-3">
          KTÓRA ZAJMUJE SIE <span class="font-weight-bold">GAMEDEV'EM</span>
        </div>
        <div class="white--text white--text font-weight-light">
          SEKCJA NAUKOWA <span class="font-weight-bold">WYŻSZEJ SZKOŁY TECHNICZNEJ</span>
        </div>
      </v-col>
    </v-row>

    <v-row class="pt-16"
      aling="center"
      justify="end"
    >
      <v-col
        cols="12"
        lg="6"
        sm="12"
        align-self="end"
      >

        <!-- <vektor-details :title="meetingInfo.title" :desc="meetingInfo.desc"/> -->
        <vektor-details title="Reorganizacja koła naukowego" :desc="meetingInfo.desc"/>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        sm="12"
        align-self="center"
        class="pt-16"
      >
        <div class="white--text text-h4 text-center">
          <!-- JEST NAS <span class="font-weight-bold">OBECNIE {{users}}</span> -->
          JEST NAS <span class="font-weight-bold">OBECNIE 10</span>
        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
// @ is an alias to /src
import VektorDetails from '../components/VektorDetails'

export default {
  name: 'Home',
  data: () => ({
    users: 0,
    meetingInfo: {
      title: "",
      desc: ""
    }
  }),
  components: {
    VektorDetails
  },
  mounted() {
    this.fetchUsers();
    this.fetchMeetingDetails();
  },

  methods: {
    async fetchUsers() {
      let usersData = await this.$http.get('http://192.168.0.87:5000/content/users_count');
      
      if(usersData.data.code == 200)
        this.users = usersData.data.data;
    },

    async fetchMeetingDetails() {
      let meetingData = await this.$http.get('http://192.168.0.87:5000/content/view_meeting');

      if(meetingData.data.code === 200)
      {
        this.meetingInfo.title = meetingData.data.data.meeting_title
        this.meetingInfo.desc = meetingData.data.data.meeting_desc
      }
    }
  }
}
</script>
