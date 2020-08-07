<template>
    <div class="answers">
        <v-card v-for="(single, index) in theCameAnswers" :key="'came' + index">
            <v-card-title>
                {{single.name}} 
            </v-card-title>
        </v-card>
    </div>
</template>
<script>
export default {
    props:['theCameAnswers']
}
</script>