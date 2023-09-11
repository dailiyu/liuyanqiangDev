<template>
  <div class="ly-photo-card" v-if="photoData.type == 1">
    <img :src="imgurl" class="photo-img" v-if="sourceType == 1" />
    <video
      :src="imgurl"
      class="photo-img"
      v-if="sourceType == 2"
      autoplay
      loop
      muted
    ></video>
    <div class="photo-bg" @click="this.$emit('toDetail')"></div>
    <div class="photo-like">
      <span
        class="iconfont icon-custom-tolove"
        @click="toLike"
        :class="{ islike: LikeCount > 0 || isLike }"
      ></span>
      <span class="like-number">{{ LikeCount + add }}</span>
    </div>
  </div>
</template>

<script>
import { baseUrl } from "@/utils/env";
import { insertFeedbackApi } from "@/api/index";
import { formatDate } from "@/utils/lysg.index";
export default {
  name: "PhotoCard",
  props: {
    photoData: {
      default: 0,
    },
  },
  data() {
    return {
      baseUrl,
      user: this.$store.state.user,
      add: 0,
      isLike: false,
    };
  },
  computed: {
    imgurl() {
      return this.baseUrl + this.photoData.imgurl;
    },
    LikeCount: {
      get() {
        return this.photoData.like[0].count;
      },
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

    //点击喜欢
    toLike() {
      if (this.photoData.islike[0].count == 0) {
        let data = {
          wallId: this.photoData.id,
          userId: this.user.id,
          type: 0,
          moment: formatDate(new Date()),
        };
        insertFeedbackApi(data).then((res) => {
          if (res.code == 200) {
            this.isLike = true;
            this.add = 1;
          }
        });
      }
    },
  },

  mounted() {
    // console.log(this.isPhotoOrVideo(this.imgurl));
  },
};
</script>

<style lang="less" scoped>
.ly-photo-card {
  position: relative;
  cursor: pointer;
  &:hover {
    .photo-bg {
      opacity: 1;
    }
    .photo-like {
      opacity: 1;
    }
  }
  .photo-img {
    width: 100%;
  }
  .photo-bg {
    transition: @tr;
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .photo-like {
    opacity: 0;
    transition: @tr;
    position: absolute;
    left: 8px;
    top: 8px;
    background-color: rgba(255, 255, 255, 0.8);
    height: 28px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    backdrop-filter: blur(20px);

    .icon-custom-tolove {
      color: @gray-3;
      margin-right: 4px;
      &:hover {
        color: @like-color;
      }
    }
    .islike {
      color: @like-color;
    }
    .like-number {
      color: @gray-1;
    }
  }
}
</style>