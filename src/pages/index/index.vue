<template>
  <div>
    <div v-for="(item, index) in arr" :key="index">
      <p>{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      arr: [],
      size: 4
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.arr = Array.from(Array(this.size)).map(() => Array(this.size).fill(0))
      this.generateNumber()
      this.generateNumber()
    },
    // 给一个随机格子生成一个随机数
    generateNumber () {
      if (this.hasSpace()) {
        var ran = (Math.random() < 0.5) ? 2 : 4
        // console.log(this.arr)
        while (true) {
          console.log(Math.round(Math.random() * this.size))
          let ranX = Math.floor(Math.random() * this.size)
          let ranY = Math.floor(Math.random() * this.size)
          if (ranX < this.size && ranY < this.size && this.arr[ranX][ranY] !== 0) {
            console.log(ranX + ' ' + ranY)
            this.arr[ranX][ranY] = ran
            break
          }
        }
        // console.log(this.arr)
      }
    },
    // 判断是否还有空格
    hasSpace () {
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          if (this.arr[i][j] === 0) {
            return true
          }
        }
      }
      return false
    }
  }

}
</script>

<style scoped>

</style>