<template>
    <div class="bio">
        <VueEmoji  @input="onInput"  :value="bio"/>
        <v-btn x-small class="whiteColor" color="warning" @click="$emit('hidebio')">Cancel</v-btn>
        <v-btn x-small color="teal" class="whiteColor" @click="updateBio(); $emit('hidebio'); $emit('backbio', bioData.bio)">Update</v-btn>
    </div>
</template>
<script>
import VueEmoji from 'emoji-vue'
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
    props:['bio'],
    data() {
        return {
            bioData: {
                bio:''
            }
        }
    },
    components: {
        VueEmoji
    },
    methods: {
     onInput(event) {
          this.bioData.bio = event.data
      },
      updateBio() {
          axios.put('http://localhost:3000/api/editBio/' + this.myId, this.bioData, {
              headers:{
                  'authorization' : this.token
              }
          })
          .then(res=>{
              console.log(res)
          })
          .catch(err=>{
              console.log(err)
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
        }
    },
}
</script>