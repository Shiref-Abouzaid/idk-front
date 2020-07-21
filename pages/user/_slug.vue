

<template>
    <v-container fluid>
        <v-layout column>
            <v-card v-if="profileData">
                <v-card-text>
                    <v-flex class="mb-4">
                    <v-avatar color="teal" size="80" align="center">
                        <span class="white--text headline">
                            {{profileData.firstName[0].toUpperCase() + profileData.lastName[0].toUpperCase()}}
                        </span>
                    </v-avatar>
                    <v-list-item-title class="title">{{profileData.firstName + ' ' +  profileData.lastName}}</v-list-item-title>
                    </v-flex>
        
                </v-card-text>
                <v-card-actions>

                </v-card-actions>
            </v-card>
        </v-layout>

    </v-container>
</template>

<script>
import axios from 'axios'
    export default {
        pageTitle: 'My Profile',

        data () {
            return {
                profileData:'',
                loading: false,
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
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        mounted() {
          console.log(this.profileSlugName)
            var privateProfile = localStorage.getItem('slugName')
            if(privateProfile != this.profileSlugName) {
                this.getPublicProfile()
            }
        }
    }
</script>
