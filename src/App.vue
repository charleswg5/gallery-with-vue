<template lang="pug">
    #app
        section#stage
            section(ref="cardWrapper")#card-wrapper
                card(v-for="(card,index) in cards", :card="card", :id="index", :key="index", @cardclick="clickHandler")
            nav#controller-wrapper
                span(v-for="(card,index) in cards", @click="clickHandler(index)", :class="{center:card.center,backface:card.backface}").controller
</template>

<script>
    import card from './components/card.vue';
    import images from './data/images.js';
    import {randomPlace} from './utils/location.js';
    export default {
        name: 'app',
        data () {
            return {
                cards: [],
                cardWidth: 0,
                cardHeight: 0
            }
        },
        components: {
            card
        },
        methods: {
            initCards(images) {
                this.cards = images.map(function (image) {

                    return {
                        image: image,
                        center: false,
                        backface: false,
                        style: {
                            left: '100px',
                            top: '100px'
                        }
                    };

                })
            },
            clickHandler(targetIndex) {
                let targetCard = this.cards[targetIndex];
                if (targetCard.center) {
                    targetCard.backface = !targetCard.backface;
                    return;
                }

                let stageWidth = this.$el.clientWidth;
                let stageHeight = this.$el.clientHeight;
                let halfLength = Math.floor(this.cards.length / 2);
                for (let index in this.cards) {
                    let card = this.cards[index];
                    if (card === targetCard) {
                        card.style = {
                            left: (stageWidth - this.cardWidth) / 2 + 'px',
                            top: (stageHeight - this.cardHeight) / 2 + 'px',
                            zIndex: 20
                        };
                        card.center = true;
                        card.backface = false;
                        continue;

                    }
                    let place;
                    if (index < halfLength) {
                        place = randomPlace({
                            min: -this.cardWidth / 2,
                            max: stageWidth / 2 - this.cardWidth * 1.5
                        }, {min: -this.cardHeight, max: stageHeight - this.cardHeight / 2}, {min: -90, max: 90});

                    } else {
                        place = randomPlace({
                            min: (stageWidth + this.cardWidth) / 2,
                            max: stageWidth - this.cardWidth / 2
                        }, {min: -this.cardHeight, max: stageHeight - this.cardHeight / 2}, {min: -90, max: 90});
                    }
                    card.style = {
                        left: place.x + 'px',
                        top: place.y + 'px',
                        transform: 'rotateZ(' + place.angle + 'deg)'
                    };
                    card.backface = false;
                    card.center = false;
                }
            }
        },
        created: function () {
            this.initCards(images);
            this.$nextTick(function () {
                this.cardHeight = this.$refs.cardWrapper.firstChild.clientHeight;
                this.cardWidth = this.$refs.cardWrapper.firstChild.clientWidth;
                this.clickHandler(0);
            })
        }

    }
</script>

<style lang="scss">
    @font-face {
        font-family: 'icomoon';
        src: url('/static/fonts/icomoon.eot');
        src: url('/static/fonts/icomoon.eot') format('embedded-opentype'),
            url('/static/fonts/icomoon.ttf') format('truetype'),
            url('/static/fonts/icomoon.woff') format('woff'),
            url('/static/fonts/icomoon.svg') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    #app {
        height: 100vh;
        width: 100vw;
        #stage, #card-wrapper {
            left: 0;
            top: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #eee;
        }

        #controller-wrapper {
            $controller-bg: #c0c0c0;
            z-index: 99;
            position: absolute;
            /*left:50%;*/
            width: 100%;
            bottom: 50px;
            text-align: center;
            .controller {
                display: inline-block;
                width: 28px;
                height: 28px;
                margin: 0 6px;
                transform: scale(0.6);
                border-radius: 50%;
                background: $controller-bg;
                cursor: pointer;
                transition: all 0.5s;
                backface-visibility: visible;
                vertical-align: middle;

                &.center {
                    transform: scale(1);
                    &:after{
                        content: "\e965";
                        font-family: 'icomoon';
                        color: #fff;
                        line-height: 28px;

                        display: inline-block;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }
                }
                &.backface {
                    transform: rotateY(180deg);
                    background: darken($controller-bg, 40%);
                }
            }
        }
    }


</style>
