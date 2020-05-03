<!-- 上下无缝滚动 -->
<template>
  <div class="v-carousel">
    <ul 
      :style="{'transform': `translate3d(0, ${top}px, 0)`}" 
      :class="{'animate': isAnimate}" 
      @mouseover="overHandle"
      @mouseout="outHandle"
    >
      <li v-for="(item, index) in list" :key="index">
        <router-link to="">
          <div>{{item.title}}</div>
        </router-link>
      </li>
    </ul>
    <div class="arrow" :style="{'top': `${lineHeight/2 - 7}px`}">
      <Icon type="arrow-up-b" @click="goPrev" :class="{'disabled': count === 0}"></Icon>
      <Icon type="arrow-down-b" @click="goNext"></Icon>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  components: {},

  props: {
    list: {
      type: Array,
      default: []
    },
    lineHeight: {
      type: Number,
      default: 40
    }
  },

  data () {
    return {
      top: 0,
      timer: null,
      count: 0,
      isAnimate: true,
      delay: 3000
    }
  },

  computed: {

  },

  watch: {},

  created() {
    this.list.push(this.list[0])
  },

  mounted() {
    this.carousel()
  },

  methods: {
    clearTimer() {
      clearTimeout(this.timer)
    },

    carousel(delay, isPrev) {
      const theDelay = delay === undefined ? this.delay : delay

      this.timer = setTimeout(()=>{
        this.isAnimate = true

        if (!isPrev) { // next
          ++this.count
          this.top += -this.lineHeight
        } else { // prev
          if (this.count > 0) {
             --this.count
             this.top += this.lineHeight
          } else {
            return
          }
        }

        if (this.count >= this.list.length) {
          this.isAnimate = false
          this.count = 0
          this.top = 0
        }

        this.carousel()
      }, theDelay)
    },

    overHandle() {
      this.clearTimer()
    },

    outHandle() {
      this.carousel()
    },

    goPrev() {
      this.clearTimer()
      this.carousel(0, true)
    },

    goNext() {
      this.clearTimer()
      this.carousel(0)
    },
  }
}
</script>

<style lang='less' scoped>
.v-carousel {
  position: relative;

  a:link,
  a:visited, {
    color: #666;
  }
  
  a:hover {
    text-decoration: underline;
  }

  ul {
    list-style: none;

    &.animate {
      transition: transform 1s;
    }
  }

  >.arrow{
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    line-height: 0;
    width: 18px;

    >.ivu-icon {
      color: #bbb;
      line-height: 7px;
      padding: 0 5px;

      &:hover {
        color: #ffa329
      }

      &.disabled {
        color: #ddd
      }
    }
  }
}
</style>