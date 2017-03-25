<template lang="pug">
figure.card(@click="click")
    img(src="src")
    figcation
        h2.card-title {{title}}
        .card-back
            p {{desc}}
</template>

<script>
export default {
    props:['id','src','title','desc'],
    data:function(){
        return {
            'isBackface':false
        }
    },
    methods:{

    }
}
</script>

<style lang="sass">

</style>