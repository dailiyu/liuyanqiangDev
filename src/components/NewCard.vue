<template>
  <div class="root">
    <!-- 中间滑动内容 -->
    <div class="ly-modal-main">
      <div class="slot">
        <div class="new-card">
          <!-- 颜色块横列表 -->
          <div class="color-list" v-if="id == 0">
            <p
              class="color"
              v-for="(item, index) in cardColor1"
              :key="index"
              :style="{ backgroundColor: item }"
              :class="{ colorselect: selectColor == index }"
              @click="changeColor(index)"
            ></p>
          </div>
          <!-- 添加照片 -->
          <div class="add-photo" v-show="id == 1">
            <input
              type="file"
              name="file"
              id="file"
              multiple="multiple"
              @change="showPhoto"
            />

            <div class="add-bt" v-if="url == ''">
              <span class="iconfont icon-tianjia"></span>
            </div>
            <div class="change-bt" v-if="url != ''">
              <span class="iconfont icon-xiugai"></span>
            </div>
            <div class="photo-div">
              <img :src="url" v-if="url" />
              <video :src="url" v-if="url" autoplay loop></video>
            </div>
          </div>
          <!-- 卡片 -->
          <div
            class="card-main"
            :style="{
              background: id == 0 ? cardColor[selectColor] : cardColor[5],
            }"
          >
            <textarea
              placeholder="留言..."
              class="message"
              v-model="message"
            ></textarea>
            <input type="text" placeholder="签名" class="name" v-model="name" />
          </div>
        </div>
        <!-- 选择标签部分 -->
        <div class="label-select">
          <p class="title">选择标签</p>
          <div class="labels">
            <p
              class="label"
              v-for="(item, index) in label[id]"
              :key="index"
              :class="{ selectlabel: index == selectLabel }"
              @click="changeLabel(index)"
            >
              {{ item }}
            </p>
          </div>
        </div>
        <!-- 免责声明 -->
        <div class="mzsm">
          <p class="title">免责声明</p>
          <p class="content">
            鲤遇时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
            1、反对宪法所确定的基本原则的；
            2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
            3、损害国家荣誉和利益的；<br />
            4、煽动民族仇恨、民族歧视，破坏民族团结的；<br />
            5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
            6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
            7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
            8、侮辱或者诽谤他人，侵害他人合法权益的；<br />
            9、含有法律、行政法规禁止的其他内容的信息。<br />
          </p>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="ly-modal-footer">
      <LyButton class="buttom1" size="max" nom="secondary" @click="closeModal"
        >丢弃</LyButton
      >
      <LyButton class="buttom2" size="max" @click="ensure">确定</LyButton>
    </div>
  </div>
</template>

<script>
import { label } from "../utils/data";
import LyButton from "./LyButton.vue";
import { cardColor, cardColor1 } from "@/utils/data";
import { getObjectURL, formatDate } from "@/utils/lysg.index";
import { insertWallApi, profileApi } from "@/api/index";
export default {
  name: "NewCard",
  components: {
    LyButton,
  },
  props: {
    id: {
      default: 0,
    },
  },
  data() {
    return {
      cardColor, //颜色数据0.3不透明度
      cardColor1, //卡片颜色数据1不透明度
      selectColor: 0, //颜色选择索引
      message: "", //留言信息
      name: "", //签名
      label,
      selectLabel: 0, //选择de标签索引

      url: "", //照片预览地址
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },

    sourceType() {
      return this.isPhotoOrVideo(this.url);
    },
  },
  watch: {
    message(newvalue) {
      if (newvalue.length > 100) {
        this.message = this.message.slice(0, 100);
        this.$message({
          type: "warning",
          message: "嗨！您的留言超过字数啦~",
        });
      }
    },
    name(newvalue) {
      if (newvalue.length > 5) {
        this.name = this.name.slice(0, 5);
        this.$message({
          type: "warning",
          message: "嗯？您名字咋那么长~",
        });
      }
    },
  },
  methods: {
    //改变颜色
    changeColor(index) {
      this.selectColor = index;
    },
    //清除数据
    clearData() {
      (this.name = ""), (this.message = "");
    },
    //关闭侧边栏
    closeModal() {
      this.clearData();
      this.url = "";
      this.$emit("closeModal");
    },
    //改变选中标签
    changeLabel(index) {
      this.selectLabel = index;
    },
    //确定添加留言
    ensure() {
      let name = "匿名";
      //如果名字不为空
      if (this.name) {
        name = this.name;
      }
      let data = {
        type: this.id,
        message: this.message,
        name: name,
        userId: this.user.id,
        moment: formatDate(new Date()),
        label: this.selectLabel,
        color: 5,
        imgurl: "",
      };
      if (this.message != "" && this.id == 0) {
        data.color = this.selectColor;
        insertWallApi(data).then((res) => {
          //进行数据的适配
          let cardata = {
            id: res.message.insertId,
            type: this.id,
            message: this.message,
            name: name,
            userId: this.user.id,
            moment: formatDate(new Date()),
            label: this.selectLabel,
            color: this.selectColor,
            imgurl: "",
            islike: [{ count: 0 }],
            like: [{ count: 0 }],
            comcount: [{ count: 0 }],
            report: [{ count: 0 }],
            revoke: [{ count: 0 }],
          };
          //更新卡片列表
          this.$emit("updateCardList", cardata);
          this.$message({
            type: "success",
            message: "感谢你的记录！",
          });
          this.clearData();
        });
      } else if (this.id == 1 && this.url) {
        //图片提交
        this.updatePhoto(data);
      }
    },
    //展示上传图片时的预览图
    showPhoto() {
      if (document.getElementById("file").files[0]) {
        let aa = getObjectURL(document.getElementById("file").files[0]);
        this.url = aa;
      } else {
        this.url = "";
      }
    },
    //图片提交
    updatePhoto(data) {
      let file = document.getElementById("file");
      if (file.files.length > 0) {
        let formData = new FormData();
        formData.append("file", file.files[0]);
        //提交后端
        profileApi(formData).then((res) => {
          data.imgurl = res;

          insertWallApi(data).then((result) => {
            //进行数据的适配
            let cardata = {
              id: result.message.insertId,
              type: this.id,
              message: this.message,
              name: data.name,
              userId: this.user.id,
              moment: formatDate(new Date()),
              label: this.selectLabel,
              color: 5,
              imgurl: res,
              islike: [{ count: 0 }],
              like: [{ count: 0 }],
              comcount: [{ count: 0 }],
              report: [{ count: 0 }],
              revoke: [{ count: 0 }],
            };

            //更新卡片列表
            this.$emit("updateCardList", cardata);
            this.$message({
              type: "success",
              message: "感谢你的记录！",
            });
            this.clearData();
            this.url = "";
          });
        });
      }
    },
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
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.root {
  .ly-modal-main {
    height: 550px;
    // background-color: aquamarine;
    // border: 2px solid red;
    overflow: auto;
    /* 整个滚动条 */
    &::-webkit-scrollbar {
      /* 对应纵向滚动条的宽度 */
      width: 3px;
      /* 对应横向滚动条的宽度 */
      // height: 5px;
    }
    /* 滚动条上的滚动滑块 */
    &::-webkit-scrollbar-thumb {
      background-color: @gray-3;
      border-radius: 32px;
    }
    /* 滚动条轨道 */
    &::-webkit-scrollbar-track {
      background-color: #dbeffd;
      border-radius: 32px;
    }
    .slot {
      height: 1200px;
      // background-color: #eee;
      padding: 0px 21px 0px 19px;

      .new-card {
        .color-list {
          height: 36px;
          .color {
            width: 24px;
            height: 24px;
            float: left;
            margin-right: 8px;
            margin-bottom: 12px;
            cursor: pointer;
          }
          .colorselect {
            border: 1px solid rgba(59, 115, 240, 1);
          }
        }

        .add-photo {
          padding-bottom: 20px;
          position: relative;

          #file {
            position: absolute;
            z-index: 10;
            top: -10px;
            height: 74px;
            width: 64px;
            opacity: 0;

            cursor: pointer;
          }
          .add-bt {
            width: 64px;
            height: 64px;
            border: 1px solid @gray-3;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .icon-tianjia {
              font-size: 24px;
            }
          }
          .photo-div {
            max-height: 200px;
            width: 100%;
            background: #f0f0f0;
            overflow: hidden;
            display: flex;
            align-items: center;
            img {
              width: 100%;
            }
            video {
              width: 100%;
            }
          }
          .change-bt {
            position: absolute;
            top: 12px;
            left: 12px;
            height: 40px;
            width: 40px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            .icon-xiugai {
              color: #fff;
            }
          }
        }
        .card-main {
          width: 320px;
          height: 240px;
          transition: @tr;
          display: flex;
          flex-flow: row wrap;
          justify-content: center;

          .message {
            background: none;
            border: none;
            resize: none;
            margin: @padding-8;

            height: 172px;
            width: 100%;
          }
          .name {
            width: 296px;
            height: 36px;
            background: none;
            border: #fff 1px solid;
            margin-bottom: 12px;
            font-family: HanziPenSC-W3;
            font-weight: bold;
          }
        }
      }
      .label-select {
        margin-top: 30px;
        .title {
          width: 56px;
          height: 20px;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #202020;
          letter-spacing: 0;
          text-align: justify;
          font-weight: 600;
        }
        .labels {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;

          .label {
            height: 24px;
            line-height: 24px;
            text-align: center;
            padding: 4px 9px;
            margin: 5px 2px;
            cursor: pointer;
            transition: @tr;
          }
          .selectlabel {
            background: #ebebeb;
            border-radius: 14px;
          }
        }
      }
      .mzsm {
        .title {
          font-size: 14px;
          color: @gray-1;
          margin-bottom: 12px;
          font-weight: 600;
          margin-top: 30px;
        }
        .content {
          width: 320px;
          height: 120px;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #949494;
          letter-spacing: 0;
          text-align: justify;
          line-height: 18px;
          font-weight: 400;
        }
      }
    }
  }
  .ly-modal-footer {
    display: flex;
    justify-content: space-between;
    margin: 20px;

    .buttom1 {
      width: 100px;
      height: 48px;
      border: 1px solid rgba(32, 32, 32, 1);
      border-radius: 24px;
    }
    .buttom2 {
      width: 200px;
      height: 48px;
      line-height: 48px;
      background: #202020;
      border-radius: 24px;
      text-align: center;
    }
  }
}
</style>