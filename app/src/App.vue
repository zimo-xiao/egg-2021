<script>
import store from './store'

export default {
  mounted () {
    store.state.music = wx.createInnerAudioContext()
    store.state.music.src = 'https://egg-1255766843.cos.ap-beijing.myqcloud.com/2021/bgm.mp3'
    store.state.music.autoplay = true
    store.state.music.loop = true
    store.state.music.play()
  }
}
</script>

<style>
  .backgroundColor {
    background-color: #FFBC00 !important;
    border-color: #FFBC00 !important;
  }
</style>
