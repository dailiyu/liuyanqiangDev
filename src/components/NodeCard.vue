<template>
  <div class="node-card" :style="{ background: cardColor[cardData.color] }" v-if="cardData.type == 0">
    <div class="card-top">
      <p class="time">{{ cardData.moment }}</p>
      <p class="label">{{ label[cardData.type][cardData.label] }}</p>
    </div>
    <div class="card-middle" :class="{ cardMiddleNight: model == 1 }" @click="this.$emit('toDetail')">
      {{ cardData.message }}
    </div>
    <div class="card-footer">
      <div class="footer-left">
        <span class="iconfont icon-custom-tolove" :class="{ islike: LikeCount > 0 || isLike }" @click="toLike">
          {{ LikeCount }}</span>
        <span class="iconfont icon-liuyan">
          {{ cardData.comcount[0].count }}</span>
      </div>
      <div class="footer-right" :class="{ footerRightNight: model == 1 }">
        {{ cardData.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { label, cardColor } from "@/utils/data";
import { formatDate } from "@/utils/lysg.index";
import { insertFeedbackApi } from "@/api/index";
export default {
  name: "NodeCard",
  data() {
    return {
      label, //标签
      cardColor, //卡片颜色
      user: this.$store.state.user,
      // add: 0,
      isLike: false,
      // model: 0,
    };
  },
  computed: {
    LikeCount: {
      get() {
        return this.cardData.like[0].count;
      },
    },
  },
  props: {
    cardData: {
      //卡片数据
      default: {},
    },
    index: {
      default: -1, //当前卡片索引
    },
    model: {
      default: 1,
    },
  },

  watch: {
    // cardData() {
    //   this.add = 0;
    // },
  },

  mounted() {
    // this.$bus.on("changeModelToCardNote", this.changModel);
  },
  methods: {
    toLike() {
      if (this.cardData.islike[0].count == 0) {
        let data = {
          wallId: this.cardData.id,
          userId: this.user.id,
          type: 0,
          moment: formatDate(new Date()),
        };
        insertFeedbackApi(data).then((res) => {
          if (res.code == 200) {
            // this.isLike = true;
            // this.add = 1;
            this.$emit("dealClickLike", this.index);
          }
        });
      }
    },
    //切换模式
    // changModel(model) {
    //   this.model = model;
    // },
  },
};
</script>

<style lang="less" scoped>
.node-card {
  width: 288px;
  height: 240px;
  background: rgba(252, 175, 162, 0.3);
  position: relative;

  // transition: all, 2s;
  // &:hover {
  //   position: relative;
  //   top: -10px;
  // }
  .card-top {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;

    .time {
      font-size: 12px;
      color: @gray-3;
    }

    .label {
      font-size: 12px;
      color: #7e7e7e;
    }
  }

  .card-middle {
    padding: 9px 20px;
    font-family: HanziPenSC-W3;
    font-size: 16px;
    color: #202020;
    height: 135px;
    width: 248px;
    word-wrap: break-word;
    overflow: hidden;
    font-weight: 400;
  }

  .cardMiddleNight {
    color: rgb(217, 215, 220);
  }

  .card-footer {
    position: absolute;
    bottom: 10px;
    padding: 0 15px;
    width: 248px;
    display: flex;
    justify-content: space-between;

    .footer-left {
      .icon-custom-tolove {
        // color: @like-color;
        color: #949494;
        font-size: 12px;
        margin-right: 10px;
        cursor: pointer;
        transition: @tr;

        &:hover {
          color: @like-color;
        }
      }

      .islike {
        color: @like-color;
      }

      .icon-liuyan {
        color: #949494;
        font-size: 12px;
      }
    }

    .footer-right {
      font-family: HanziPenSC-W3;
      color: @gray-1;
      font-size: 22px;
      font-weight: 600;
    }

    .footerRightNight {
      color: rgb(217, 215, 220);
    }
  }
}
</style>