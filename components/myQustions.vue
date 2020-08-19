<template>
    <div class="myQustions">

        <v-card
            class="mx-auto "
            style="margin-bottom:5px"
            outlined
            v-for="(q, index) in qustions"
            :key="index + q.qustion"
        >
            <v-list-item three-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                    {{q.qustion}} 
                    <v-btn color="success" class="whiteColor float-right" x-small @click="edit(q, index)">Edit</v-btn>

                    <v-btn class="whiteColor float-right margin-side-5" color="red" x-small  @click="deleteQustion(index)" :loading="loading.delete">Delete</v-btn>
                </v-list-item-title>
                <v-list-item-subtitle>
                    <v-btn text small v-for="a in q.answers" :key="a" :color="ifCorrect(q.correctAnswer, a)">{{a}}</v-btn>
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>

        </v-card>
        
    </div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    props:['qustions'],
    data() {
        return {
            loading:{
                delete:false
            }
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
    methods: {
        edit(value, index) {
            value['index'] = index
             this.$store.commit('addQustionToEdit', value)
        },
        deleteQustion(value) {
            this.loading.delete = true
            axios.put('http://localhost:3000/api/user/removeQustion/' + this.myId + '/' + value, ' ', {
                headers: {
                    "authorization": this.token
                }
            })
            .then(res=>{
                console.log(res)
                this.loading.delete = false;
                this.qustions.splice(value, 1)
            })
            .catch(err=>{
                
                console.log(err.response)
            })
        },
        ifCorrect(correctAnswer, answer){
            if(correctAnswer == answer) {
                return 'success'
            } else {
                return "red"
            }
        } 
    }
}
</script>