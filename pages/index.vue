<template>
    <div align="center">
      <h3>
     
      </h3>
        <v-btn to="/register" color="teal"  x-large outlined>
        <v-icon>mdi-mdiPencil</v-icon>
          <v-icon v-text="'mdi-account'"></v-icon>
            Regist
        </v-btn>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
  // import {
  //   mdiAccount,
  //   mdiPencil,
  //   mdiShareVariant,
  //   mdiDelete,
  // } from '@mdi/js'
export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
