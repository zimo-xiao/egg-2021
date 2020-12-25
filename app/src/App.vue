<script>
import store from './store'

export default {
  mounted () {
    store.state.music = wx.createInnerAudioContext()
    store.state.music.src = 'https://zuggr-1255766843.cos.ap-beijing.myqcloud.com/schoolGrad/grad.mp3'
    store.state.music.autoplay = true
    store.state.music.loop = true
    store.state.music.play()
  }
}
</script>

<style>
  .backgroundColor {
    background-color: #7D0809 !important;
    border-color: #7D0809 !important;
  }
</style>
