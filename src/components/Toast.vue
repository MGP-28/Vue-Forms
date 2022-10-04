<template>
    <div class="toast-wrapper" :class="[colorClass, isExitingClass]">
        <span>{{text}}</span>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props:[
            'text', 'isNice', 'timer'
        ],
        data() {
            return {
                isExiting: false
            }
        },
        mounted() {
            setTimeout(() => {
                this.isExiting = true;
            }, (this.timer - 1) * 1000)
        },
        computed: {
            colorClass(){
                return this.isNice ? 'nice' : 'not-nice'
            },
            isExitingClass(){
                return this.isExiting ? 'exiting' : ''
            }
        }
    }
</script>

<style scoped>
@keyframes entry{
    from{
        opacity: 0%;
        left: -200px;
    }
}
.toast-wrapper{
    position: fixed;
    top: calc(0% + 15px);
    left: calc(0% + 15px);
    width: 200px;
    padding: 20px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    box-shadow: black 0 2px 3px 1px;
    cursor: crosshair;
    animation-name: entry;
    animation-duration: 1s;
}
.nice{
    border: greenyellow solid 1px;
    background-color: green;
}

.not-nice{
    border: orangered solid 1px;
    background-color: darkred;
}
.exiting{
    animation-direction: reverse;
    animation-iteration-count: infinite;
}
</style>