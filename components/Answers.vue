<template>
    <div class="answers">
        <!-- <v-card v-for="(single, index) in theCameAnswers" :key="'came' + index">
            <v-card-title>
                {{single.name}} 
            </v-card-title>
        </v-card> -->
        <v-expansion-panels :popout="true" :focusable="true">

            <v-expansion-panel
            v-for="(item,index) in theCameAnswers"
            :key="index + 'name'">
                <div>
                    <v-btn  color="error"  small @click.stop="dialog = true; indexToDelete = index">delete</v-btn>
                </div>
                <v-expansion-panel-header>
                    <p>
                        {{item.name}}

                        <template v-if="item.persent >= 50">
                            <v-btn text color="success" class="float-right present">{{item.persent}}%</v-btn>
                            <v-icon color="success" v-if="item.persent == 100"  class="float-right present">mdi-check</v-icon>
                        </template>
                        <template v-if="item.persent < 50">
                            <v-btn text color="error" class="float-right present">{{item.persent}}%</v-btn>
                        </template>
                        <template v-if="(index+1) <= notifications">
                            <v-btn text color="success" class="float-right">New</v-btn>
                        </template>
                         
                    </p>
                </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-simple-table>
                    <template v-slot:default>
   
                    <tbody>
                        <tr v-for="(an, index2) in item.answers" :key="index2 + 'persone'">
                            <td align="center" class="single-answer-of" colspan="2">
                               <p>{{ an.qustion }}</p>
                                <template v-if="an.correctAnswer !== an.friendChoose">
                                    <v-btn text color="success">{{an.correctAnswer}}</v-btn>
                                    <v-btn text color="error" >{{an.friendChoose}}</v-btn>
                                </template>
                                <template v-else>
                                    <v-btn text color="success">{{an.correctAnswer}}</v-btn>
                                </template>

                            </td>
                            <!-- <td v-for="(chose, index3) in an.answers" :key="index3+chose"> {{chose}}</td> -->
                        </tr>
                        <tr>
                            <td align="center" style="padding:5px"> <v-btn  color="error"  large @click.stop="dialog = true; indexToDelete = index">delete</v-btn></td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-expansion-panel-content>

            </v-expansion-panel>
        </v-expansion-panels>
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