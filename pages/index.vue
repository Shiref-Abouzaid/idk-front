<template>

      <v-container  class="height100">

      <div class="home-btn-container" align="center">
        <v-row>
          <v-col cols="12">
            <h1>
             your friends konow you?
            </h1>
          </v-col>
          <v-col cols="12">
            <v-btn to="/login" color="teal"  large outlined>
              <v-icon v-text="'mdi-account'"></v-icon>
                Login
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn to="/register" color="teal"  large outlined>
              <v-icon v-text="'mdi-pencil'"></v-icon> 
                Regist
            </v-btn>
          </v-col>
        </v-row>


      </div>
      </v-container>

  
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
       firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      slugName:localStorage.getItem('slugName')
    }
  }
}
</script>
