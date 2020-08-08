
<template>
    <v-container fluid class="profile" >
        <v-layout column >
            <v-progress-circular  size="100" indeterminate color="teal"  v-if="loading.main" class="mainLoading"></v-progress-circular>
            <v-card v-if="!loading.main" >
                <v-card-text class="f0f0f0">
                    <v-flex class="mb-4 avatar-container">
                    <v-avatar color="teal" size="80" align="center">
                        <span class="white--text headline">
                            {{profileData.firstName[0].toUpperCase() + profileData.lastName[0].toUpperCase()}}
                        </span>
                    </v-avatar>
                    <v-list-item-title class="title">{{profileData.firstName + ' ' +  profileData.lastName}}</v-list-item-title>
                    <p class="font-weight-light" style="margin-bottom:0">
                        {{getGender()  + profileData.answersLength + ' Answers'}}
                    </p>
                    <p class="font-weight-light" v-if="!myProfile">
                        {{'last seen ' + dateFormate()}}
                    </p>
                    </v-flex>
                    <div align="center" v-if="!myProfile">
                        <p class="font-weight-bold">Do You Know {{profileData.firstName + ' ' + profileData.lastName + ' ?'}}</p>
                        <v-btn color="teal" class="whiteColor" @click="startAnswersF()">Start</v-btn>
                    </div>
                </v-card-text>
                <v-card-text class="f0f0f0" align="center" v-if="myProfile">
                    <Facebook scale="3" :url="currentUrl"/>
                    <Twitter scale="3" :url="currentUrl"/>
                    <WhatsApp scale="3" :url="currentUrl"/>
                    <Telegram scale="3" :url="currentUrl"/>
                </v-card-text>
            <v-col cols="12" v-if="startAnswers">
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <template v-for="(item, index) in profileData.qustions" >
                            <v-stepper-step :complete="e1 > index + 1" :step="index + 1" :key="'s' + index" color="teal"></v-stepper-step>
                            <v-divider :key="'d' + index"></v-divider>
                        </template>
                        <v-stepper-step :step="profileData.qustions.length + 1" color="teal"></v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                    <v-stepper-content v-for="(item, index) in profileData.qustions" :key="'x' + index" :step="index + 1">
                        <v-card
                       
                        class="no-shadow"
                        >
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1" align="center">
                                {{item.qustion}}
                            </v-list-item-title>
                        </v-list-item-content>
                        <v-radio-group @change="answerd(index)" v-model="friendAnswer.answers[index].friendChoose">
                            <v-card class="d-flex justify-center" color=" lighten-2" flat tile  >
                                <v-card v-for="(answer, indexOfAnswer) in item.answers" :key="indexOfAnswer + 'sd'" class="pa-2" outlined tile >
                                        <v-radio :label="answer" :value="answer" required color="teal" ></v-radio>
                                </v-card>
                            </v-card>
                        </v-radio-group>
                        </v-card>

                        <v-btn
                        v-if="e1 >  1"
                        color="warning"
                        class="whiteColor float-right"
                        @click="e1 = index"
                        >
                        Back
                        </v-btn>
                    </v-stepper-content>
                    <!--last step of answer for name and submit-->
                    <v-stepper-content :step="profileData.qustions.length + 1">
                        <v-card class="no-shadow">
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1" align="center" v-if="!loading.showFinal">
                            <v-text-field :label="'Your Name (' + profileData.firstName + ' Will see it)'" required color="teal" style="max-width:300px" v-model="friendAnswer.name"></v-text-field>
                                <v-btn style="margin-bottom:40px" color="teal" class="whiteColor" @click="sendAnswer()" :disabled="!friendAnswer.name" :loading="loading.sendAnswers">Send</v-btn>
                            </v-list-item-title>
                             <v-expand-transition>
                            <v-card v-show="loading.showFinal" class="no-shadow" align="center" >
                                <h3 color="green" style=" margin-bottom:30px"><span color="green">{{profileData.firstName + ' ' + this.profileData.lastName}} </span> check your Answers</h3>
                                <h2 align="center" >You know {{this.profileData.firstName}} </h2>
                                <div color="green" align="center">
                                    <v-btn text color="success" x-large style="font-size:50px;">
                                        {{  calcFinal() + '%'}}
                                    </v-btn>
                                </div>
                                <answersResault :friendAnswers="friendAnswer.answers"/>
                            </v-card>
                             </v-expand-transition>

                        </v-list-item-content>

                        </v-card>
                       <v-btn color="warning" class="whiteColor float-right" @click="e1 = profileData.qustions.length" v-if="!loading.showFinal">Back</v-btn>

                    </v-stepper-content>

                    </v-stepper-items>
                </v-stepper>
            </v-col>
                <v-card-actions v-if="myProfile">
                    <v-col cols="12" >
                        <v-tabs v-model="tab"  background-color="transparent" color="teal" grow >
                        <v-tab v-for="item in tabItems" :key="item" >
                            <p style="margin:0;padding:5px">{{ item }}</p>
                            <template v-if="item == 'Answers' && profileData.notifications > 0">
                                <v-badge color="red" :content="profileData.notifications" > </v-badge>
                            </template>
                        </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                        <v-tab-item >
                            <v-card color="basil" flat >
                            <v-card-text>
                                <Answers :theCameAnswers="profileData.answers" :notifications="profileData.notifications"/>
                            </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item >
                            <v-card color="basil" flat>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="8" v-if="myProfile">
                                        <v-btn
                                        class="whiteColor"
                                        color="teal"
                                        @click="showAddQustion = !showAddQustion"
                                        small
                                        >
                                        Add Qustion
                                        </v-btn>
                                        <v-col style="padding-left:0;padding-right:0">
                                            <v-expand-transition>
                                            <v-card
                                                style="margin:10px 0"
                                                v-show="showAddQustion"
                                                @hideQustion="hideQ"
                                                class="mx-auto">
                                                <addQustion />
                                            </v-card>
                                            </v-expand-transition>
                                        </v-col>
                                        <!-- <addQustion v-if="showAddQustion"/> -->
                                        <myQustions :qustions="profileData.qustions"/>
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-card class="mx-auto" outlined >
                                            <v-container>
                                            <suggestedQustion/>
                                            </v-container>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            </v-card>
                        </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-layout>

    </v-container>
</template>
Answers
<script>
import axios from 'axios'
import addQustion from '../components/addQustion'
import myQustions from '../components/myQustions'
import suggestedQustion from '../components/suggestedQustion'
import answersResault from '../components/answersResault'
import Answers from '../components/Answers'

import { mapMutations } from 'vuex'
import { Facebook } from 'vue-socialmedia-share';
import { Twitter } from 'vue-socialmedia-share';
import { Linkedin } from 'vue-socialmedia-share';
import { Reddit } from 'vue-socialmedia-share';
import { Telegram } from 'vue-socialmedia-share';
import { WhatsApp } from 'vue-socialmedia-share';

import Vue from 'vue'
    export default {
        pageTitle: 'My Profile',
        components:{
            Answers,
            addQustion,
            myQustions,
            suggestedQustion,
            answersResault,
            Facebook,
            Twitter,
            Linkedin,
            Telegram,
            WhatsApp
        },
        data () {
            return {
                startAnswers: false,
                currentUrl:window.location.href,
                friendAnswer:{
                    answers:'',
                    name:'',
                    persent:null
                },
                tab:null,
                e1: 1,
                tabItems:['Answers', 'Qustions'],

                showAddQustion:false,
                profileData:'',
                loading:{
                    main:true,
                    sendAnswers:false,
                    showFinal:false
                },
                myProfile:false,
                profileSlugName:  $nuxt.$route.params.profile
            }
        },
        methods: {
            hideQ() {
                this.showAddQustion = false
            },
            getGender() {
                if(this.profileData.gender !== 'Male' && this.profileData.gender !== 'Female') {
                    return ''
                } else {
                    return this.profileData.gender + ' | '
                }
            },
            //startAnswers
            startAnswersF() {
                this.startAnswers = true
            },
            //send answer
            sendAnswer() {
                this.loading.sendAnswers = true
                axios.post('http://localhost:3000/api/addAnswerToUser/' + this.profileData._id, this.friendAnswer)
                .then(res=>{
                    console.log(res)
                    this.calcFinal();
                    this.loading.sendAnswers = false;
                    this.loading.showFinal = true
                       
                })
                .catch(err=>{
                    console.log(err.response)
                })
            },
            calcFinal() {
                var i = 0
                var lengthOfQustions = this.friendAnswer.answers.length
                var wrongAnswers = 0;
                var correctAnswers = 0;
                if (this.friendAnswer.answers.length > 0) {
                    do {
                        if (this.friendAnswer.answers[i].friendChoose == this.friendAnswer.answers[i].correctAnswer) {
                            correctAnswers++
                        } else {
                            wrongAnswers ++
                        }
                        i++
                    } while (i < lengthOfQustions)
                }
                var present = (correctAnswers / lengthOfQustions) * 100
                console.log('the correct answer is ' + correctAnswers)
                console.log('the wrong answer is ' + wrongAnswers)
                this.friendAnswer.persent = present
                
                return present
            },
            answerd(value) {
                this.e1 = value + 2
                this.friendAnswer
            },
            dateFormate() {
                var date = new Date(this.profileData.lastSeen)
                var h = date.getHours();
                var m = date.getMinutes();
                var d = date.getUTCDate()
                var mo = date.getMonth() + 1
                var to = date.getDay()
                var time = date.getTime()
                var ddd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                var MMM = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                if (h < 13) {
                    return 'at ' +  ifToday() + ' ' + h + ':' + m + ' AM'
                } else if (h > 12) {
                    return 'at ' +  ifToday() + ' ' + (h - 12) + ':' + m + ' PM'
                }
                function ifToday() {
                    var s = new Date().getDay()
                    if (ddd[s] == ddd[to]) {
                        return  ''
                    } else {
                        return ddd[to] + ' ' +  MMM[mo]
                    }
                }
                

                
                
            },
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
                    this.loading.main = false;
                    this.friendAnswer.answers = res.data.data.qustions
                    var i = 0
                    do {
          
                        Vue.set(this.friendAnswer.answers[i], 'friendChoose', '')
                        i ++
                    } while(i < res.data.data.qustions.length)
                   
                })
                .catch(err=>{
                    console.log(err.response)
                })
            },
            resetNofitifcation() {
                axios.put('http://localhost:3000/api/resetNotifications/' + this.myId, '',{
                    headers:{
                        'authorization': this.token
                    }
                })
                .then(res=>{
                    console.log('notification reset')
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
                    this.myProfile = true;
                    this.resetNofitifcation();

                })
                .catch(err=>{
                    console.log(err.response)
                })
            }
        },
        computed: {
            myId() {
                if (this.$store.state.id) {
                    return this.$store.state.id
                }
            },
            token() {
                if (this.$store.state.token) {
                    return this.$store.state.token
                }
            },
            qustionToAdd() {
                return this.$store.state.qustionToAdd
            }
        },
        watch: {
            'qustionToAdd' : function() {
                this.showAddQustion = true
            }
        },
        mounted() {

            var privateProfile = localStorage.getItem('slugName')
            if(privateProfile != this.profileSlugName) {
                this.getPublicProfile()
            } else {
                this.getPriviteProfile()
            }
        }
    }
</script>
