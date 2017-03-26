<template lang="pug">
    #app
        section#stage
            section(ref="cardWrapper")#card-wrapper
                card(v-for="(card,index) in cards", :card="card", :id="index", :key="index", @center="center")
            ul#controller-wrapper
                li(v-for="i in cards.length").controller
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
                        center:false,
                        style: {
                            left: '100px',
                            top: '100px'
                        }
                    };

                })
            },
            center(centerIndex) {
                let stageWidth = this.$el.clientWidth;
                let stageHeight = this.$el.clientHeight;
                let halfLength = Math.floor(this.cards.length / 2);
                for (let card in this.cards) {
                    if (card == centerIndex) {
                        this.cards[card].style = {
                            left: (stageWidth - this.cardWidth) / 2 + 'px',
                            top: (stageHeight - this.cardHeight) / 2 + 'px',
                            zIndex: 20
                        };
                        this.cards[card].center=true;
                        continue;

                    }
                    let place;
                    if (card < halfLength) {
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
                    this.cards[card].style = {
                        left: place.x + 'px',
                        top: place.y + 'px',
                        transform: 'rotateZ(' + place.angle + 'deg)'
                    }
                    this.cards[card].center= false;

                }
            }
        },
        created: function () {
            this.initCards(images);
            this.$nextTick(function () {
                this.cardHeight = this.$refs.cardWrapper.firstChild.clientHeight;
                this.cardWidth = this.$refs.cardWrapper.firstChild.clientWidth;
                this.center(0);
            })
        }

    }
</script>

<style lang="scss">
    #app {
        height: 100vh;
        width: 100vw;

    }

    #stage, #card-wrapper {
        left: 0;
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #ccc;
    }
</style>
