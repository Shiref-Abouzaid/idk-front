<template>

  <v-row align="center" style="margin-bottom:50px">
    <v-col cols="12">
      <h1 align="center" class="margin-bottom-20">Register</h1>
<v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" color="teal">Name And Email</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2" color="teal">Gender and Password</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" color="teal">Compelete!</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
          color=" lighten-1"

        >
  
        <v-row>
          <v-col cols="12" sm="6">
              <v-text-field
                  v-model="userRegist.firstName"
                  :counter="15"
                  :rules="nameRules"
                  label="First Name"
       
                  @change="checkUser()"
                  required
              ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
              <v-text-field
                  v-model="userRegist.lastName"
                  :counter="15"
                  :rules="nameRules"
                  label="Last Name"
                  @change="checkUser()"
                  required
              ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" >
              <v-text-field
                  v-model="userRegist.email"
                  :counter="25"
                  label="Email"
                  :rules="emailRules"
              ></v-text-field>
             
          </v-col>
          <v-col cols="12" sm="6" >
              <v-text-field
              style="padding:20px"
                  :value="'idk.com/' + userRegist.slugName"
                  label="Slug Name"
                  :disabled="true"
                  :class="{'warning': !userAvailable }" 
              ></v-text-field>
             
          </v-col>
        </v-row>

        </v-card>

        <v-btn
          color="teal"
          @click="e1 = 2"
        >
          Next
        </v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          color=" "
         
        >
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="userRegist.gender">
              <v-row>
                <v-col cols="4">
                  <v-radio
                    
                    :label="'Male'"
                    :value="'Male'"
                  ></v-radio>
                </v-col>
                <v-col cols="4">
                  <v-radio
                    :label="'Female'"
                    :value="'Female'"
                  ></v-radio>
                </v-col>
                <v-col cols="4">

                  <v-radio
                    
                    :label="'Prefer not to say'"
                    :value="'Prefer not to say'"
                  ></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="userRegist.password"
              type="password"
              :rules="nameRules"
              label="Password"
              required
              ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6"    :class="{'warning': confirmPassword.error }" >
            <v-text-field
              v-model="confirmPassword.value"
              type="password"
              label="Confirm Password"
              required
              ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6">
              <v-file-input multiple label="Photo"></v-file-input>
          </v-col>
          
        </v-row>

        </v-card>

        <!-- <v-btn
          color="teal"
          @click="e1 = 3"
          @click="validate()"
          :disabled="confirmPassword.error"
        >
          Regist
        </v-btn> -->
        
        <v-btn
          color="teal"

          @click="validate()"
          :disabled="confirmPassword.error"
        >
          Regist  
        </v-btn>
        <v-btn  @click="e1 = 1">Back</v-btn>
        <v-progress-circular
          v-if="loading.regist"
          indeterminate
          color="teal"
         ></v-progress-circular>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        >
          <v-alert type="success" v-if="registerSuccess">
            User Has Registed Successfully
          </v-alert>
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn  >Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
    </v-col>
  </v-row>
</template>


<script>
import axios from 'axios'

  export default {
    data: () => ({
      confirmPassword:{
        error:false,
        value:''
      },
      loading:{
        regist:false,
      },
      userAvailable:true,
      timeOut:null,
       e1: 1,
      registerSuccess:false,
        userRegist: {
            firstName:'',
            lastName:'',
            photo:'',
            email:'',
            password:'',
            slugName:'',
            gender:''
        },
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
     
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      lazy: false,
    }),
    watch:{
      'userRegist.firstName': function(){
        this.userRegist.slugName = this.userRegist.firstName.toLowerCase() + this.userRegist.lastName.toLowerCase()
      },
      'userRegist.lastName': function(){
        this.userRegist.slugName = this.userRegist.firstName.toLowerCase() + this.userRegist.lastName.toLowerCase()
      },
      'confirmPassword.value': function() {
        if(this.userRegist.password !== this.confirmPassword.value) {
          this.confirmPassword.error = true
        } else {
          this.confirmPassword.error = false
        }
      }
    },
    methods: {

      checkUser(){

   
        axios.post('http://localhost:3000/api/isuser', {slugName:this.userRegist.slugName})
        .then(res=>{
          console.log(res)
          this.userAvailable = res.data.available
      
           
        })
        .catch(err=>{
          console.log(err.response)
        })
      },
      regist() {
          console.log('registing')
      },
      validate () {
        this.loading.regist = true
        //this.$refs.form.validate()
        axios.post('http://localhost:3000/api/user', this.userRegist)
        .then(response => {
            console.log(response)
            this.registerSuccess = true

            this.loading.regist = false;
            this.e1 = 3
        })
        .catch(err=> {
          console.log(err)
          console.log(err.response)
        })
   
      },

    },
  }
</script>

<style>
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow:none
}
.margin-bottom-20 {
  margin-bottom: 20px;
}

</style>