<template>

  <v-app  class="default">
    
  


    <v-app-bar
      color="teal"
      dark

    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

 
      <v-toolbar-title>
        <v-btn  to="/" text large class="logo">

               <img src="~/assets/logo-white.png" />
        </v-btn>
      </v-toolbar-title>

      <v-btn text  to="/">
        home
      </v-btn>
      <v-btn text to="/login">
        login
      </v-btn>
      <v-btn text to="/register">
        regist
      </v-btn>

      <v-spacer></v-spacer>

  

      <v-btn text :to="'/' + slugName" v-if="slugName">
        {{`${firstName}`}}
      </v-btn>
     <v-btn text x-small @click="logOut()" v-if="!noUser()">
        LogOut
      </v-btn>

   

   
    <v-btn icon>
        <v-icon>mdi-magnify</v-icon>

      </v-btn>


    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
   
    >
      <v-list
        nav
        dense
       
      >
        <v-avatar color="teal" size="80" align="center" v-if="!noUser()">
          <span class="white--text headline">
            <span >{{firstLetters()}}</span>
          </span>
        </v-avatar>
        <v-card-text v-if="!noUser()">
          <v-list-item  :to="'/' + slugName">
            {{firstName}}
          </v-list-item>
        </v-card-text>
        
        <v-list-item-group
          active-class="teal--text text--accent-4"
        >
          <v-list-item  to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/register">
            <v-list-item-title  link>Register</v-list-item-title>
          </v-list-item>


          <v-list-item @click="logOut()" v-if="!noUser()">
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
<v-card-text v-if="noUser()">
          <v-form>
            <v-text-field
              color="teal"
              label="Login"
              name="login"
              v-model="login.email"
              prepend-icon="mdi-account"
              reqired
              type="email"
            ></v-text-field>

            <v-text-field
              color="teal"
              v-model="login.password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              @keypress.enter="mylogin()"
            ></v-text-field>
          </v-form>
              <v-card-actions>
     

                <v-spacer></v-spacer>
                <v-btn color="teal" class="whiteColor" @click="mylogin()" :loading="loading.login">Login</v-btn>
              </v-card-actions>
          <v-alert type="error"  v-if="error.responseError">{{error.responseError}}</v-alert>

          <v-card-text type="info">
            dont have account? 
                    <v-list-item  to="/register">
                      <v-list-item-title>Regist Now</v-list-item-title>
                    </v-list-item>
          </v-card-text>
        </v-card-text>

      </v-list>
    </v-navigation-drawer>




  <!--router-->
    <v-content>
      <v-container>
        <nuxt />
        
      </v-container>
    </v-content>
<v-footer
    color="teal "
    padless
  >
    <v-row  justify="center" no-gutters >
 
      <v-btn text  x-small class="my-2 white--text">
        &copy; {{ new Date().getFullYear() }} — <strong>IDK</strong>
      </v-btn>
     <v-btn text  x-small class="my-2  white--text" target="_blank" href="https://www.linkedin.com/in/shiref-abouzaid/">
        Designed and developed by Shiref AbouZaid
      </v-btn>
      <v-btn text  x-small class="my-2 white--text">
        Terms
      </v-btn>
      <v-btn text  x-small class="my-2 white--text">
        Privacy
      </v-btn>

      <v-btn class=" white--text" icon target="_blank" href="https://www.facebook.com/repolab.official">
          <v-icon size="24px">mdi-facebook</v-icon>
      </v-btn>
 
    </v-row>

  </v-footer>
  <!--bottom nav-->
   <!-- <v-bottom-navigation
      scroll-target="#scroll-area-2"
      hide-on-scroll
      scroll-threshold="500"
      absolute
      color="teal"
      horizontal
      class="fixed"
    >
      <v-btn>
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
  </v-app>
</template>


<script>
  import axios from 'axios'
export default {

  data () {
    return {

      loading:{
        login:false,
      },
      error:{
        responseError:'',
        success:''
      },
      message:{
        message:''
      },
      login:{
        email:'',
        password:'',
      },
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      slugName:localStorage.getItem('slugName')
    }
  },
 
  methods: {
    logOut() {
      localStorage.removeItem('token')
      localStorage.removeItem('firstName')
      localStorage.removeItem('lastName')
      localStorage.removeItem('id')
      localStorage.removeItem('slugName')

      this.$router.go()
    },
    firstLetters() {
      if (localStorage.getItem('lastName')){
      var fn = localStorage.getItem('firstName')
      var ln = localStorage.getItem('lastName')
      return fn[0].toUpperCase() + ln[0].toUpperCase()
      }

    },
      mylogin() {
      this.loading.login = true
      axios.post('http://localhost:3000/api/users/login', this.login)
      .then(res=>{
        console.log(res)
          this.loading.login = false
        if (res.data.confermation == 'success') {
            this.error.responseError = ''
            this.setToLocal(res.data)
        } else {
          this.error.responseError = res.data.message
        }
      })
      .catch(err=>{
        console.log(err.response)
      })
    },
    setToLocal(valueOfResponseData) {
      localStorage.setItem('token', valueOfResponseData.token)
      localStorage.setItem('slugName', valueOfResponseData.data.slugName)
      localStorage.setItem('firstName', valueOfResponseData.data.firstName)
      localStorage.setItem('lastName', valueOfResponseData.data.lastName)
      localStorage.setItem('id', valueOfResponseData.data._id)

      this.$router.push({ path: valueOfResponseData.data.slugName })
    },
    noUser() {
      var token = localStorage.getItem('token')
      if (token) {
        return false
      } else if (!token) {
        return true 
      }
    }
  },

}
</script>
