<template>
  <div class="video-box">
    <div class="video-js">
      <video-player
        class="video-player vjs-custom-skin"
        id="videoPlayer"
        ref="videoPlayer"
        controls
        preload="auto"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"
        @ready="playerReadied"
        @statechanged="playerStateChanged($event)"
      ></video-player>
    </div>
    <div class="video-list" v-if="showVideoList">
      <el-scrollbar  style="height:100%;width:100%;">
        <p v-for="(item,index) in videoSrcList" :key="index" :title="item.cameraName">
            <el-button :type="activeVideo==item.cameraId?'success':''" icon="el-icon-video-camera" @click="switchVideo(item,cameraType)">{{item.cameraName}}</el-button>
            <!-- <i class="el-icon-video-camera camear-ico" ></i> -->
            <!-- <span>{{item.cameraName}}</span> -->

        </p>
      </el-scrollbar>
    </div>
  </div>
</template>
 
<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import { videoPlayer } from "vue-video-player";
import loading from "@/assets/images/loading.gif";

export default {
  name: "videojs",
  props: ["videoParam"],
  data() {
    return {
        activeVideo:'',
        cameraPlus:10,
        showVideoList:false,
        videoSrcList: [],
        cameraList:{},
        videoSrc: "",
        selectVideoVal: "",
        player: null,
        cameraType:1,
        playerOptions: {
          width:720,
          height:405,
          techOrder: ['flash', 'html5'],// 兼容顺序
          sourceOrder: true,
          poster:loading,
          //playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          language: "zh-CN",
          live: true,
          autoplay: true, // 如果true，浏览器准备好时开始播放
          muted: false, // 默认情况下将会消除任何音频
          loop: false, // 是否视频一结束就重新开始
          preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            currentTimeDisplay: false, // 当前时间
            volumeControl: true, // 声音控制键
            playToggle: true, // 暂停和播放键
            progressControl: true, // 进度条
            fullscreenToggle: true // 全屏按钮
          },
          flash: {
            hls: { withCredentials: false },
            swf: "/video-js.swf"
          },
          sources: [
            // {src:"rtmp://202.69.69.180:443/webcast/bshdlive-pc",
            // type:"rtmp/flv"},
            // {src:"rtmp://58.200.131.2:1935/livetv/hunantv",
            // type:"rtmp/flv"},
            // {src:"rtmp://mobliestream.c3tv.com:554/live/goodtv.sdp",
            // type:"rtmp/flv"},
          ],
          notSupportedMessage: "此视频暂无法播放，请稍后再试" // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        }
    };
  },
  components: {
    videoPlayer
  },
  mounted() {
    var _this = this;
    _this.cameraList = _this.videoParam.camera.cameraList;
    _this.cameraType = _this.videoParam.cameraType;
    _this.videoSrcList = [];
    for (let index = 0; index < _this.cameraList.length; index++) {
        var  element = {
          cameraId:_this.cameraList[index].cameraId,
          cameraName:_this.cameraList[index].name,
          endTime: _this.cameraList[index].endTime ? parseFloat(_this.cameraList[index].endTime) + _this.cameraPlus :0,
          //endTime: _this.cameraList.endTime ? parseFloat(_this.cameraList.endTime) + _this.cameraPlus :0,
          startTime:_this.cameraList[index].endTime ? parseFloat(_this.cameraList[index].endTime) - _this.cameraPlus : 0,
          // endTime: _this.cameraList.endTime,
          // startTime:_this.cameraList.startTime
        };
        _this.videoSrcList.push(element);
        _this.showVideoList = true;
    }
    if (_this.videoSrcList.length > 0){
        _this.activeVideo = _this.videoSrcList[0].cameraId;
    }
    //_this.initVideo();
    
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
       console.log('player play!', player)
    },
    onPlayerPause(player) {
       console.log('player pause!', player)
    },
    onPlayerEnded(player) {
       console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
       console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
       console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
       console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
       console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
       console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
       console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
       console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      var _this = this;
      _this.player = player;
      _this.switchVideo(_this.videoSrcList[0],_this.cameraType);
      //console.log("example player 1 readied", this.playerEleplayerEle);
      //this.initVideo();
      //player.currentTime(10);
      // console.log('example 01: the player is readied', player)
    },
   async initVideo() {
      var _this = this;
      await _this.$toolFun.sleep(1000);
      videojs("videoPlayer",_this.playerOptions,
        function onPlayerReady() {
          _this.player = this;
          _this.switchVideo(_this.videoSrcList[0],_this.cameraType);
        }
      );
    },
    async switchVideo(item,cameraType){
      var _this = this;
      var postJson = {
        cameraId: item.cameraId,
        startTime:item.startTime.toString(),
        endTime:item.endTime.toString()
      };
      var videoApi = await this.api.video.historyStream(postJson)
      _this.activeVideo = postJson.cameraId;
      //var url = '/v1/camera/historyStream';
      if (cameraType == 2){//实时流
        videoApi = await this.api.video.realTimeStream(postJson)
        //url = '/v1/camera/realTimeStream';
      }
      await _this.$toolFun.sleep(500);
      //_this.$http.post(url, postJson).then(res => {
        if (videoApi.code == 0) {
            _this.player.reset(); //重置 video
            _this.videoSrc = videoApi.data.url;
            _this.player.src({
                //src: require("@/assets/video/vv1.mp4"),
                src: _this.videoSrc,
                type:videoApi.data.type || "rtmp/flv"
            });
            console.log(_this.videoSrc);
            //_this.player.load();
            _this.player.load(_this.videoSrc);
            _this.player.play();
        }else{
          _this.$message.error(videoApi.msg);
        }
      //});
    },

    destroyVideo() {
      var _this = this;
      if (_this.player) {
        _this.player.tech_.dispose();
        _this.player.dispose();
        _this.player = null;
      }
    },
  },
  beforeDestroy() {
      this.destroyVideo();
  }
};
</script>
<style lang="scss">
.video-box{
    .video-js {
        width: 100%;
        height: 60%;
    }
    .video-list{
        display: flex;
        width: 100%;
        p{
            display: inline-block;
            padding: 15px;
            margin: 10px;
        }

        .camear-ico{
            font-size: 40px;
            }
        }
    }


</style>

 