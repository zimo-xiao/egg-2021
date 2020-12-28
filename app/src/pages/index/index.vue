<template>
  <div>
    <div style="position:absolute;width:100vw;left:0px;top:0px">
        <painter :palette="template" />
    </div>
  </div>
</template>

<script>
const res = wx.getSystemInfoSync()
const w = res.windowWidth
const h = res.windowHeight

export default {
  data () {
    var that = this
    return {
      template: {
        background: '/static/images/cover.jpg',
        background: '/static/images/idx_bg.jpeg',
        width: `${w}px`,
        height: `${h}px`,
        views: [
          {
            type: 'image',
            url: '/static/images/btn.png',
            css: {
              top: `${h / 100 * 60}px`,
              left: `${w / 100 * 25}px`,
              width: `${w / 100 * 50}px`,
              height: `${w / 100 * 50 * 0.4}px`
            },
            methods: {
              touchstart (e) {
                that.toNext()
              }
            }
          },
          {
            type: 'image',
            url: '/static/images/title.png',
            css: {
              top: `${h / 100 * 15}px`,
              left: `${w / 100 * 15}px`,
              width: `${w / 100 * 70}px`,
              height: `${w / 100 * 70 * 0.96}px`
            }
          }
          // {
          //   type: 'text',
          //   text: '版权归属：北大附中水煮蛋设计工作室',
          //   css: {
          //     fontSize: '11px',
          //     color: '#A9A9A9',
          //     top: `${h / 100 * 100 - 20}px`,
          //     right: `${20}px`,
          //     width: `195px`,
          //     height: `${w / 100 * 55 * 0.25}px`
          //   },
          //   methods: {
          //     touchstart (e) {
          //       that.toNext()
          //     }
          //   }
          // }
        ]
      }
    }
  },

  methods: {
    toNext () {
      wx.navigateTo({
        url: '/pages/select/main'
      })
    }
  },

  onShareAppMessage (res) {
    return {
      title: '2021附中新年签',
      path: '/pages/index/main',
      imageUrl: '/static/images/bg.jpeg',
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
  .title {
    position: absolute;
    left: 25vw;
    width: 50vw;
    top: 0vh;
  }
</style>

<style>
  page {
    background-color: #FFBC00;
  }
</style>