<template>
  <div class="prismic-video-component" v-if="videoStreams != null">
    <br />
    <video v-for="(stream, key) in videoStreams" :key="key" width="320" height="240" controls>
      <source :src="videoStreams[0].url" type="video/mp4" />Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
import YouTube from 'youtube-stream-url'
export default {
data() {
  return {
    videoStreams: null
  }
},

async fetch() {
const videoDetails = await YouTube.getInfo({url: 'https://www.youtube.com/watch?v=9CWf1pU_R5c'})
this.videoFormats = videoDetails.formats
this.videoFormats = this.videoFormats.filter(format => {
  return format.quality == 'tiny'
})

// mimeType: 'video/mp4; codecs="avc1.640028"',
//     bitrate: 5053200,
//     width: 1920,
//     height: 1080,
//     quality: 'hd1080',

// const formats = videoStreams.map(format => {
//   return {
//     mimeType: format.mimeType,
//     bitrate: format.bitrate,
//     width: format.width,
//     height: format.height,
//     quality: format.quality,
//     projectionType: format.projectionType,
//     audioChannels: format.audioChannels
//   }
// })
// console.log('Video stream fetched: ', formats)
},
}

</script>

<style lang="scss" scoped>
.prismic-video-component {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
</style>