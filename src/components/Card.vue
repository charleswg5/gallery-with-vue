<template lang="pug">
figure.card(@click.stop="clickHandler", :class="{backface:isBackface}",:style="[card.style]")
    img(:src="card.image.url",height="250",width="250")
    figcaption
        h2.card-title {{card.image.title}}
        .card-back
            p {{card.image.desc}}
</template>

<script>
export default {
    props:['id','card'],
    data:function(){
        return {
            'isBackface':false
        }
    },
    methods:{
        clickHandler:function(){
            if(this.card.center){
                this.isBackface = !this.isBackface;
            }else{

                this.$emit('center',this.id);
            }
        }
    },
    watch:{
        'card.center':function (newValue,oldValue) {
            if(newValue === false){
                this.isBackface = false;
            }

        }
    }
}
</script>

<style lang="scss">
.card{
    background: #fff;
    position: absolute;
    display: block;
    padding: 40px;
    margin: 0;
    text-align: center;
    perspective: 1500px;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform-origin: right;
    transition: all 0.5s;
    cursor: pointer;
    font-size:16px;
    &.backface{
        transform: translateX(-100%) rotateY(180deg);
    }
    figcaption{
        text-align: center;
        font-family:'Inconsolata',Arial,sans-serif;
        .card-title{
            margin:10px 0 0 0;
            font-size:18px;
            color: #a7a0a6;
        }
        .card-back{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            transform: rotateY(180deg);
            background: #fff;
            padding: 50px 40px;
            color: #a7a0a2;
            overflow: auto;
            backface-visibility: hidden;
            cursor: pointer;
            p{
                margin:0;
            }
        }
    }

}
</style>