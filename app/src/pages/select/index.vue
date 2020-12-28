<template>
  <div>
    <div style="position:absolute;width:100vw;left:0px;top:0px;z-index:1">
        <painter :palette="template" />
    </div>

    <div v-if="isTransition" style="z-index:10;position:absolute;width:100%;height:100%" />

    <div style="position:absolute;width:100vw;left:0px;top:0px;z-index:1">
      <!-- 题目 -->
      <div style="float:left;display:flex;margin-left:4%;width:90%;margin-top:10%">
        <div class="shadow" style="flex-grow:1;background-color:white;border:1vw solid #556DBF;border-radius:5rpx">
          <div style="float:left;margin-left:50rpx;margin-top:-50rpx;width:100rpx;height:100rpx;background-color:#556DBF;border-radius:50%;text-align:center;color:white;font-size:70rpx;">
            {{(currentQuestion < 9) ? '0' + (currentQuestion + 1) : currentQuestion + 1}}
          </div>
          <div style="margin-left:6%;width:88%;color:black;margin-top:70rpx;font-size:35rpx;line-height:45rpx;margin-bottom:3vw;color:#222423">
            {{questions[currentQuestion].title}}
          </div>
        </div>
      </div>

      <!-- 选项 -->
      <div v-for="(option, oindex) in questions[currentQuestion].options" v-bind:key="oindex">
        <div @click="select(currentQuestion,oindex)" style="float:left;display:flex;margin-left:4%;width:90%;margin-top:7%;">
          <img :src="'/static/images/' + oindex + '.png'" style="flex-grow:0;flex-shrink:0;float:left;width:18vw;height:18vw">
          <div class="shadow" style="float:lefts;flex-grow:1;background-color:white;border-radius:5px;border:1vw solid #556DBF;padding:4vw;font-size:35rpx">
            {{option.title}}
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import store from '../../store'

const res = wx.getSystemInfoSync()
const w = res.windowWidth
const h = res.windowHeight

export default {
  data () {
    return {
      isTransition: false,
      currentQuestion: 0,
      template: {
        background: '/static/images/bg.jpeg',
        width: `${w}px`,
        height: `${h}px`,
        views: [
          // {
          //   type: 'image',
          //   url: '/static/images/cover-btn.png',
          //   css: {
          //     top: `${h / 100 * 80}px`,
          //     left: `${w / 100 * 33}px`,
          //     width: `${w / 100 * 50}px`,
          //     height: `${w / 100 * 55 * 0.25}px`
          //   },
          //   methods: {
          //     touchstart (e) {
          //       that.toNext()
          //     }
          //   }
          // },
        ]
      }
    }
  },

  methods: {
    select (q, o) {
      let question = store.state.questions[q]
      let option = question.options[o]

      for (let i in option) {
        if (i !== 'title') {
          store.state.scoreBoard[i] += option[i]
        }
      }

      if ((this.currentQuestion + 1) <= (this.questions.length - 1)) {
        this.currentQuestion += 1
      } else {
        this.isTransition = true

        wx.showLoading({
          title: '生成新年签中...'
        })

        setTimeout(function () {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/generate/main'
          })
        }, 2000)
      }
    }
  },

  computed: {
    questions () {
      return store.state.questions
    },
    currentQuestion () {
      return store.state.currentQuestion
    }
  },

  onShareAppMessage (res) {
    return {
      title: '2021附中新年签',
      path: '/pages/index/main',
      imageUrl: '/static/images/cover.jpg',
      success: function (shareTickets) {
        //
      },
      fail: function (res) {
        //
      },
      complete: function (res) {
        //
      }
    }
  }
}
</script>

<style scoped>
  .shadow {
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .14), 0 1px 7px 0 rgba(0, 0, 0, .12), 0 3px 1px -1px rgba(0, 0, 0, .2)
  }
</style>

<style>
  page {
    background-color: #FFBC00;
  }
</style>