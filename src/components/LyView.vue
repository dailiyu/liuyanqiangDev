<template>
  <div class="ly-view">
    <div :class="model == 0 ? 'bg' : 'bgNight'"></div>
    <div class="viewr-photo">
      <img :src="imgurl" class="photo-img" v-if="sourceType == 1" />
      <video :src="imgurl" class="photo-img" v-if="sourceType == 2" autoplay loop muted controls></video>
    </div>
    <div class="switch sw-left" @click="toPre" v-show="nowNumber > 0">
      <span class="iconfont icon-xiangzuo1"></span>
    </div>
    <div class="switch sw-right" @click="toNext" v-show="nowNumber < maxLength">
      <span class="iconfont icon-xiangyou1"></span>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/utils/env";

export default {
  name: "LyView",
  props: {
    photoArr: {
      type: Array, // 指定期望的类型为数组
    },
    nowNumber: {
      type: Number,
      default: 0,
    },
    disAble: {
      type: Boolean,
      default: false,
    },
    model: {
      default: 1,
    },
  },
  data() {
    return {
      baseUrl,
    };
  },

  computed: {
    imgurl() {
      return this.baseUrl + this.photoArr[this.nowNumber];
    },
    maxLength() {
      return this.photoArr.length - 1;
    },
    sourceType() {
      return this.isPhotoOrVideo(this.imgurl);
    },
  },
  methods: {
    //判断是照片还是视频
    isPhotoOrVideo(url) {
      const extension = url.split(".").pop().toLowerCase();
      if (
        extension === "jpg" ||
        extension === "jpeg" ||
        extension === "png" ||
        extension === "gif"
      ) {
        return 1;
      } else if (
        extension === "mp4" ||
        extension === "webm" ||
        extension === "ogv"
      ) {
        return 2;
      } else {
        return -1;
      }
    },
    //前一张
    toPre() {
      //切换到上一张图
      if (this.nowNumber > 0) {
        // this.curIndex--;
        this.$emit("changeCardIndex", this.nowNumber - 1);
        setTimeout(() => { }, 100);
      }
    },
    //后一张
    toNext() {
      //切换到下一张图
      if ((this.nowNumber < this.photoArr.length - 1, this.photoArr.length)) {
        // this.curIndex++;
        this.$emit("changeCardIndex", this.nowNumber + 1, this.photoArr.length);
      }
    },
  },
  mounted() { },
};
</script>

<style lang="less" scoped>
.ly-view {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 998;

  //   padding-right: 360px;
  //   box-sizing: border-box;

  .bg {
    position: absolute;
    left: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    // margin-right: 360px;
    width: 100%;
    height: 100%;
  }

  .bgNight {
    background: rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0px;
    left: 0px;

    backdrop-filter: blur(10px);
    // margin-right: 360px;
    width: 100%;
    height: 100%;
  }

  .viewr-photo {
    position: absolute;
    padding: 82px 454px 0px 96px;
    // padding-right: 350px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;

    img {
      max-width: 100%;
    }
  }

  .switch {
    width: 56px;
    height: 56px;
    background: @gray-3;
    border-radius: 50%;
    color: @gray-10;
    position: absolute;
    top: 50%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
    transition: @tr;
    cursor: pointer;

    .iconfont {
      font-size: 24px;
    }

    &:hover {
      opacity: 1;
    }
  }

  .sw-left {
    left: 20px;
  }

  .sw-right {
    right: 375px;
  }
}
</style>