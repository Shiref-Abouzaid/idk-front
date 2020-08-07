<template>
    <div>
        <h2>Suggested Qustions</h2>
             <!-- <p class="font-weight-light"  v-for="(q, index) in suggested"   :key="index + q.qustion">
                 {{q.qustion}} 
                 <br>
                <router-link :to="'/' + q.slugName" v-if="q.slugName">{{q.owner}}</router-link>

                 <v-btn color="success" class="whiteColor float-right" x-small>Copy</v-btn>
            </p> -->
       <v-card
            class="mx-auto "
            style="margin-bottom:5px"
            outlined
            v-for="(q, index) in suggested"
            :key="index + q.qustion"
        >   
         <v-card-title class="font-weight-light">
             {{q.qustion}}
         </v-card-title>
            <v-card-subtitle class="pb-0">
                <router-link :to="'/' + q.slugName" v-if="q.slugName">{{q.owner}}</router-link>
            </v-card-subtitle>
            <v-card-actions>
                <v-btn x-small color="success" >Use</v-btn>
            </v-card-actions>

        </v-card>

        <div align="center">
            <v-btn color="teal" class="whiteColor" :loading="loading" @click="getSuggested()">
                <v-icon>mdi-history</v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            suggested:[],
            loading:false
        }
    },
    methods: {
        getSuggested() {
            this.loading = true
            axios.get('http://localhost:3000/api/random')
            .then(res=>{
                this.suggested = res.data.data;
                this.loading = false
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
        this.getSuggested()
    }
}
</script>