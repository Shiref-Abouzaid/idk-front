<template>
        <div v-if="friendAnswers">
            <p v-for="(single, index) in friendAnswers" :key="'single' + index">
                {{single.qustion}}
                <template v-if="single.correctAnswer !== single.friendChoose">
                    <v-btn text color="success">{{single.correctAnswer}}</v-btn>
                    <v-btn text color="error" >{{single.friendChoose}}</v-btn>
                </template>
                <template v-else>
                    <v-btn text color="success">{{single.correctAnswer}}</v-btn>
                </template>

            </p>
        </div>
</template>
<script>
export default {
    props: ['friendAnswers']
}
</script>