<template>
  <div>
    <div style="position:absolute;width:100vw;left:0px;top:0px;z-index:1">
        <painter :palette="template" />
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
        ]
      }
    }
  }
}