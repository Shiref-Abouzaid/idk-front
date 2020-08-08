<template>
    <div class="addQustion">
        <v-container class="padding-top-bottom-0">
            <form @submit.prevent="addQustion()" ref="addq">
              
                <v-row>
                    <v-col cols="12" class="padding-top-bottom-0">
                        <v-text-field
                            v-model="qustionData.qustion"
                            label="Qustion"
                            required
                            @change="addMark()"
                        ></v-text-field>
                    </v-col>
                    
                    <v-col cols="9" sm="4" v-for="(answer, index) in qustionData.answers" :key="index"  class="padding-top-bottom-0">
                    <v-text-field
                            class="padding-top-bottom-0"
                            v-model="qustionData.answers[index]"
                            label="Answer 1"
                            required
                        ></v-text-field>

                        <v-btn
                        v-if="qustionData.answers.length > 2"
                        color="red whiteColor"
                        @click="removeChoose(index)"
                        >
                        <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                    <v-card-actions v-if="qustionData.answers.length < 3">
                        <v-btn color="cyan" class="whiteColor" small @click="addChoice()">Add 1 More Chose</v-btn>
                    </v-card-actions>
                    <v-col cols="12" class="padding-top-bottom-0">

                    <v-radio-group v-model="qustionData.correctAnswer" style="margin:0" v-if="qustionData.answers[0].length > 0">
                                            <p class="font-weight-light" style="margin:0"> Choose the correct Answer:</p>
                        <v-row>
                            <v-col cols="9" sm="4" v-for="(answer, index) in qustionData.answers" :key="index + '1'">
                                <v-radio
                                    :label="qustionData.answers[index]"
                                    :value="qustionData.answers[index]"
                                    required
                                    ></v-radio>
                            </v-col>
                        </v-row>
                    </v-radio-group>
                    </v-col>
     

   
                    <v-col cols="12" >
                        <v-alert type="success" v-if="message.addQustion">
                            {{message.addQustion}}
                        </v-alert>
                         <v-card-actions class="float-right">
                              <v-btn color="warning" class="whiteColor " @click="cancel()" >Cancel</v-btn>
                             <v-btn color="teal" class="whiteColor " type="submit">Send</v-btn>
                         </v-card-actions>
                        
                    </v-col>
                </v-row>

          </form>
        </v-container>

    </div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    data() {
        return {
            loading:{
                addQustion:false
            },
            message: {
                addQustion:''
            },
            qustionData:{
                qustion:'',
                correctAnswer:'',
                answers:['', ''],
                country:''
            },
        }
    },
    computed: {
        myId () {
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
    
    methods: {
        cancel() {
            this.$emit('hideQustion')
        },
        addChoice() {
            this.qustionData.answers.push('')
        },
        removeChoose(value) {
            var arr = this.qustionData.answers
            arr.splice(value, 1)
            this.qustionData.answers = arr
        },
        addMark() {
            var lastLetter = this.qustionData.qustion[this.qustionData.qustion.length - 1 ]
            if(lastLetter != '?') {
                this.qustionData.qustion = this.qustionData.qustion + '?'
            }
        },
        restetQustion() {
            this.qustionData.qustion = ''
            this.qustionData.correctAnswer = ''
            this.qustionData.answers = ['', '']
        },
        addQustion(){
            this.loading.addQustion = true
            axios.put('http://localhost:3000/api/user/addQustion/' + this.myId, this.qustionData, {
                headers: {
                    'authorization': this.token
                }
            })
            .then(res=>{
                console.log(res)
                this.loading.addQustion = false
                this.restetQustion();
                this.message.addQustion = res.data.message
            })
            .catch(err=>{
                console.log(err.response)
            })
        }
    },
    watch: {
        'qustionData.answers' : function() {
            this.qustionData.correctAnswer = ''
        },
        'qustionToAdd': function() {
            console.log(this.qustionToAdd)
            this.qustionData.qustion = this.qustionToAdd.qustion
            this.qustionData.answers = this.qustionToAdd.answers
            this.qustionData.correctAnswer = this.qustionToAdd.correctAnswer
        }
    },
    mounted() {
        
        //detect country
        fetch('https://extreme-ip-lookup.com/json/')
        .then( res => res.json())
        .then(response => {
            this.qustionData.country = response.country
        })
        .catch((data, status) => {
            console.log('Request to detect country failed');
        })
    }
}
</script>
