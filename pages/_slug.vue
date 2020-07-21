
<template>
    <v-container fluid class="profile">
        <v-layout column>
            <v-progress-circular  size="100" indeterminate color="teal"  v-if="loading.main" class="mainLoading"></v-progress-circular>
            <v-card v-if="!loading.main">
                <v-card-text>
                    <v-flex class="mb-4 avatar-container">
                    <v-avatar color="teal" size="80" align="center">
                        <span class="white--text headline">
                            {{profileData.firstName[0].toUpperCase() + profileData.lastName[0].toUpperCase()}}
                        </span>
                        
                    </v-avatar>
                    <v-list-item-title class="title">{{profileData.firstName + ' ' +  profileData.lastName}}</v-list-item-title>
                    <p class="font-weight-light">{{profileData.gender + ' | ' + profileData.answersLength + ' Answers'}}</p>
                    
                    </v-flex>
                    <div align="center">
                        <p class="font-weight-light">You Know {{profileData.firstName + ' ' + profileData.lastName + ' ?'}}</p>
                        <v-btn color="teal" class="whiteColor">Start</v-btn>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-row>
                        <v-col cols="12" sm="4">
                            suggested
                        </v-col>
                        <v-col cols="12" sm="8">
                            <addQustion/>
                        </v-col>

                    </v-row>
                </v-card-actions>
            </v-card>
        </v-layout>

    </v-container>
</template>

<script>
import axios from 'axios'
import addQustion from '../components/addQustion'
    export default {
        pageTitle: 'My Profile',
        components:{
            addQustion
        },
        data () {
            return {
                profileData:'',
                loading:{
                    main:true
                },
                myProfile:false,
                profileSlugName:  $nuxt.$route.params.slug,
                form: {
                    firstName: 'John',
                    lastName: 'Doe',
                    contactEmail: 'john@doe.com',
                    avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
                },
        
            }
        },
        methods: {
            noUser() {
                var token = localStorage.getItem('token')
                if (token) {
                    return false
                } else if (!token) {
                    return true 
                }
            },
            getPublicProfile() {
                axios.get('http://localhost:3000/api/user/' + this.profileSlugName)
                .then(res=>{
                    console.log(res)
                    this.profileData = res.data.data
                    this.loading.main = false
                })
                .catch(err=>{
                    console.log(err.response)
                })
            },

            getPriviteProfile() {
                axios.get('http://localhost:3000/api/getFullProfile/' + this.profileSlugName, {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    }
                })
                .then(res=>{
                    console.log(res)
                    this.profileData = res.data.data
                    this.loading.main = false;
                    this.myProfile = true
                })
                .catch(err=>{
                    console.log(err.response)
                })
            }
        },
        mounted() {
          console.log(this.profileSlugName)
            var privateProfile = localStorage.getItem('slugName')
            if(privateProfile != this.profileSlugName) {
                this.getPublicProfile()
            } else {
                this.getPriviteProfile()
            }
        }
    }
</script>
