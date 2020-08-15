<template>
    <div class="answers">

        <div v-if="theCameAnswers.length < 1">
            
        </div>
<v-card class="mx-auto" v-for="(item,index) in theCameAnswers" :key="index + 'name'" outlined align="center" >
    <v-list-item three-line>
        <v-list-item-content>
             <v-list-item-title class="headline mb-2">
                <span class="name">{{item.name}}</span>
 

                <v-menu offset-y class="float-right">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon class="float-right"  v-bind="attrs"  v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                    <v-list-item-title>
                        <v-btn  text large color="error" @click.stop="dialog = true; indexToDelete = index">delete</v-btn>
                    </v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
 
                <template v-if="(index+1) <= notifications">
                    <v-btn text color="success" class="float-right">New</v-btn>
                </template>


                
             </v-list-item-title>
            <v-card-actions >
                <template v-if="item.persent >= 50">
                    <v-btn text color="success" class="float-right present" x-large>{{item.persent}}%</v-btn>
                    <v-icon color="success" v-if="item.persent == 100"  class="float-right present" >mdi-check</v-icon>
                </template>
                <template v-if="item.persent < 50">
                    <v-btn text color="error" class="float-right present" x-large>{{item.persent}}%</v-btn>
                </template>
            </v-card-actions>
            <v-list-item-subtitle v-for="(an, index2) in item.answers" :key="index2 + 'persone'">
                <div  class="single-answer-of" colspan="2">
                    <p>{{ an.qustion }}</p>
                    <template v-if="an.correctAnswer !== an.friendChoose">
                        <v-btn text color="success">{{an.correctAnswer}}</v-btn>
                        <v-btn text color="error" >{{an.friendChoose}}</v-btn>
                    </template>
                    <template v-else>
                        <v-btn text color="success">{{an.correctAnswer}}</v-btn>
                    </template>
                </div>
            </v-list-item-subtitle>
            
         </v-list-item-content>

    </v-list-item>

  </v-card>
 <v-dialog v-model="dialog"  max-width="290" >
      <v-card>
        <v-card-title class="headline">Are You sure You want to delete this Answer?</v-card-title>


        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="teal darken-1"
            text
            @click="dialog = false"
          >
            No
          </v-btn>

          <v-btn
            color="teal darken-1"
            text
            :loading="loading.loading"
            @click="removeAnswer()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
<script>
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
    props:['theCameAnswers', 'notifications'],
    data() {
        return {
            dialog: false,
            indexToDelete:null,
            loading:{
                delete:false
            }
        }
    },
    computed: {
        token() {
            if (this.$store.state.token) {
                return this.$store.state.token
            }
        },
        myId() {
            if (this.$store.state.id) {
                return this.$store.state.id
            }
        },
    },

    methods: {
        removeAnswer() {
            this.loading.delete = true
            axios.put('http://localhost:3000/api/removeAnswer/' + this.myId + '/' + this.indexToDelete, '', {
                headers: {
                    'authorization': this.token
                }
            })
            .then(response=>{
                console.log(response)
                this.loading.delete = false
                this.dialog = false
                var items = this.theCameAnswers
                items.splice(this.indexToDelete, 1)
                this.theCameAnswers = items
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>="">