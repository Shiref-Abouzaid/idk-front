<template>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="teal"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                  v-model="login.email"
                    color="teal"
                    label="Email"
     
                    prepend-icon="mdi-account"
                    type="email"
                  ></v-text-field>

                  <v-text-field
                  v-model="login.password"
                  color="teal"
                    id="password"
                    label="Password"
                    prepend-icon="mdi-lock"
                    type="password"
                    @keypress.enter="mylogin()"
                  ></v-text-field>
                </v-form>
                <v-alert type="error" v-if="error.responseError">
                   {{error.responseError}}
                </v-alert>
              </v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-progress-circular  indeterminate color="teal" v-if="loading.login"></v-progress-circular>
                <v-spacer></v-spacer>
                <v-btn color="teal" class="whiteColor" @click="mylogin()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      
    </v-main>

</template>

<script>
import axios from "axios"
  export default {
      data() {
          return {
            loading:{
              login:false,
            },
            error:{
              responseError:'',
              success:''
            },
            login:{
              email:'',
              password:'',
            }
          }
      },
      methods: {
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
          
          this.$router.push({ path: valueOfResponseData.data.slugName })
        }
      }
  }
</script>
