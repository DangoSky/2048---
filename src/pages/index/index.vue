<template>
  <div class="container"  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div v-for="(row, index) in arr" class="cell_row" :key="index">
      <div v-for="(col, index1) in row" class="cell_col" :class="'num_' + col" :key="index1">
        <transition name="fade">
          <label v-show="col > 0">{{col}}</label>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import fn from './supportFunction.js';
import data from './data';

export default {
  data () {
    return {
      arr: [],
      startX: 0,
      startY: 0,
      // 1表示上移，2表示右移，3表示下移，4表示左移，0表示不移动
      direction: 0
      // fontColor: '#776e65'
    };
  },
  created () {
    // console.log(data);
    fn.init();
    this.arr = data.arr;
  },
  computed: {
    // arr() {
    //   return data.arr;
    // }
  },
  methods: {
    touchStart(e) {
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY; 
    },
    touchMove(e) {
      let endX = e.touches[0].pageX;
      let endY = e.touches[0].pageY;
      let dx = endX - this.startX;
      let dy = endY - this.startY;
      // 按四个象限求出开始结束两个点所成线段的角度
      let angle = -Math.atan2(dy, dx) * 180 / Math.PI;
      this.direction = fn.judgeDirection(angle);
      // console.log(this.direction);
    },
    touchEnd() {
      console.log(this.direction);
      if(this.direction === 1) {
        fn.moveUp();
      }
      else if(this.direction === 2) {
        fn.moveRight();
      }
      else if(this.direction === 3) {
        fn.moveDown();
      }
      else if(this.direction === 4) {
        fn.moveLeft();
      }
      else {
        console.log("no move");
      }
      // setTimeout(() => {
        // console.log("generate");
        fn.generateNumber();
      // }, 2000);
    },
  }
};
</script>

<style scoped lang="less">
  @fontSize: 27px;

  .container {
    width: 750rpx;
    height: 750rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: space-around;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: #bbada0;
    .cell_row {
      width: 100%;
      height: 23%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      .cell_col {
        width: 23%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: space-around;
        background-color: #ccc0b3;
        border-radius: 10px;
        text-align: center;
        line-height: calc(750rpx * 0.23);
        font-size:  @fontSize;
        color: white;
      }
      .num_2 {
        background-color: #eee4da;
      }
      .num_4 {
        background-color: #eee4da;
      }
      .num_8 {
        background-color: #f26179;
      }
      .num_16 {
        background-color: #f59563;
      }
      .num_32 {
        background-color: #f67c5f;
      }
      .num_64 {
        background-color: #f65e36;
      }
      .num_128 {
        background-color: #edcf72;
      }
      .num_256 {
        background-color: #edcc61;
      }
      .num_512 {
        background-color: #9c0;
      }
      .num_1024 {
        background-color: #3365a5;
      }
      .num_2048 {
        background-color: #09c;
      }
      .num_4096 {
        background-color: #a6bc;
      }
      .num_8192 {
        background-color: #93c;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to, .fade-leave {
    opacity: 1;
  }
</style>