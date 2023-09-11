<template>
  <div class="wall-message">
    <p class="title" :class="{ titleNight: model == 1 }">
      {{ wallType[id].name }}
    </p>
    <p class="slogan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <p
        class="babel-list"
        :class="{
          babelListNight: model == 1,
          labelselect: curlabel == -1,
          labelSelectNight: model == 1 && curlabel == -1,
        }"
        @click="changeLabel(-1)"
      >
        全部
      </p>
      <p
        :class="{
          babelListNight: model == 1,
          labelselect: curlabel == index,
          labelSelectNight: model == 1 && curlabel == index,
        }"
        class="babel-list"
        v-for="(item, index) in label[id]"
        :key="index"
        @click="changeLabel(index)"
      >
        {{ item }}
      </p>
    </div>
    <!-- 留言墙主页卡片列表 -->
    <div class="card-list" v-show="id == 0">
      <NodeCard
        class="card-item"
        v-for="(item, index) in cards"
        :key="index"
        :cardData="item"
        :index="index"
        :model="model"
        :class="{ selectCard: index == selectCardIndex }"
        @toDetail="changeCardIndex(index)"
        @dealClickLike="dealClickLike"
      ></NodeCard>
    </div>
    <!-- 照片墙卡片 -->
    <div class="photo" v-show="id == 1">
      <PhotoCard
        v-for="(item, index) in cards"
        :key="index"
        :photoData="item"
        class="photo-item"
        @toDetail="changeCardIndex(index)"
      ></PhotoCard>
    </div>
    <!-- 卡片状态显示 -->
    <div class="none-msg" v-show="isOk == 0">
      <img :src="none[0].url" />
      <p>{{ none[id].msg }}</p>
    </div>

    <!-- 加载中动画 -->
    <div class="loading" v-if="isOk == -1">
      <div id="lottile"></div>
      <p>加载中...</p>
    </div>

    <p class="no-more" v-show="isOk == 2">没有更多...</p>

    <div class="add" :style="{ bottom: addbottom + 'px' }">
      <span class="iconfont icon-tianjia" @click="changeOpen(true)"></span>
    </div>
    <transition name="modal">
      <Lymodal
        v-show="isOpen"
        class="modal"
        :title="title"
        @closeModal="changeOpen(false)"
      >
        <NewCard
          :id="id"
          v-show="selectCardIndex == -1"
          @closeModal="changeOpen(false)"
          @updateCardList="updateCardList"
        ></NewCard>
        <CardDetail
          v-if="selectCardIndex != -1"
          :cardData="cards[selectCardIndex]"
          :index="selectCardIndex"
          @closeModel="changeOpen(false)"
          @dealDeleteWall="dealDeleteWall()"
          @dealAddOrDeleteComment="dealAddOrDeleteComment"
        >
          <NodeCard
            v-if="cards[selectCardIndex]"
            :cardData="cards[selectCardIndex]"
            :index="selectCardIndex"
            @dealClickLike="dealClickLike"
          ></NodeCard>
        </CardDetail>
      </Lymodal>
    </transition>
    <transition name="modal2">
      <LyView
        class="ly-view"
        v-if="selectCardIndex != -1 && id == 1"
        :photoArr="photoArr"
        :cards="cards"
        :nowNumber="selectCardIndex"
        @changeCardIndex="changeCardIndex"
        :model="model"
      ></LyView>
    </transition>
  </div>
</template>

<script>
import { wallType, label, none } from "@/utils/data";
import NodeCard from "@/components/NodeCard.vue";
import CardDetail from "@/components/CardDetail.vue";
import Lymodal from "../components/LyModal.vue";
const { photos } = require("../../mock/index");
import NewCard from "@/components/NewCard.vue";
import PhotoCard from "@/components/PhotoCard";
import LyView from "@/components/LyView.vue";
import lottie from "lottie-web";
import loading from "@/assets/images/loading.json";
import { findWallApi } from "@/api/index";

export default {
  name: "WallMessage",
  components: {
    NodeCard,
    Lymodal,
    NewCard,
    CardDetail,
    PhotoCard,
    LyView,
  },
  data() {
    return {
      wallType, //墙上部数据
      label, //标签列表
      // id: 0, //留言墙照片墙切换的id
      curlabel: -1, //当前选择的标签
      // note: [],
      cards: [],
      addbottom: 30, //添加按钮样式参数：距离底部距离
      isOpen: false, //是否打开侧边栏
      selectCardIndex: -1, //选择的卡片索引
      title: "写留言", //newcard组件左上角
      photos: photos.data, //照片资源
      isOk: -1, //是否加载中 -1为加载中 0为没有拿到数据 1为正常
      none: none, //空加载数据
      page: 1, //当前页
      pagesize: 10, //每次加载的图片数
      photoArr: [], //照片数组
      userId: this.$store.state.user.id, //用户id
      model: 0, //白天或夜间模式
      isEnd: true, //一次获取卡片数据的逻辑是否结束
      // cardsCopy: [],
    };
  },

  watch: {
    id: {
      handler() {
        this.isOpen = false; //切换时侧边栏关闭
        this.selectCardIndex = -1; //切换不同墙时确保卡片是未选择状态
        this.curlabel = -1;
        this.page = 1;
        this.cards = [];
        this.getUserId(this.id);
      },
    },
  },

  computed: {
    id() {
      return this.$route.query.id;
    },
  },
  methods: {
    //更改当前标签
    changeLabel(index) {
      this.selectCardIndex = -1;
      this.isOpen = false;
      this.curlabel = index;
      (this.cards = []), (this.page = 1), this.getWallCards(this.id);
    },
    //监听页面滚动
    scrollBottom() {
      //距离顶部高度
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //屏幕高度
      let clientHeight = document.documentElement.clientHeight;
      //内容高度
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight + 230 >= scrollHeight) {
        this.addbottom = scrollTop + clientHeight + 230 - scrollHeight;
      } else {
        this.addbottom = 30;
      }
      //滚动到底部了获取更多卡片
      if (scrollTop + clientHeight + 150 > scrollHeight && this.isEnd) {
        this.getWallCards(this.id);
      }
    },
    //控制侧边栏开关
    changeOpen(judge) {
      this.isOpen = judge;
      if (judge == false) {
        this.selectCardIndex = -1;
      }
    },
    //改变当前选择卡片索引
    changeCardIndex(index) {
      if (index == this.selectCardIndex) {
        this.title = "写留言";
        this.selectCardIndex = -1;
        this.changeOpen(false);
      } else {
        this.title = "详情";
        this.selectCardIndex = index;
        // this.getWallCards(this.id);

        this.changeOpen(true);
      }
    },
    //更新卡片列表
    updateCardList(data) {
      this.cards.unshift(data);
      this.isOk = 1;
      this.changeOpen(false);
      this.cards = [];
      this.page = 1;
      this.getWallCards(this.id);
    },
    //加载动画
    loading() {
      if (this.isOk == -1) {
        this.$nextTick(async () => {
          let params = {
            container: document.getElementById("lottile"),
            renderer: "svg",
            loop: true,
            animationData: loading,
          };
          lottie.loadAnimation(params);
        });
      }
    },
    //获取用户id
    getUserId(type) {
      let timer = setInterval(() => {
        this.userId = this.$store.state.user.id;
        if (this.userId) {
          this.getWallCards(type);
          clearInterval(timer);
        }
      }, 10);
    },
    //获取卡片信息
    getWallCards(type) {
      if (this.page > 0) {
        this.isOk = -1;
        let data = {
          type: type,
          page: this.page,
          pagesize: this.pagesize,
          userId: this.userId,
          label: this.curlabel,
        };
        this.isEnd = false; //关闭获取数据通道
        //获取墙数据
        findWallApi(data).then((res) => {
          this.cards = this.cards.concat(res.message);

          if (res.message.length > 0) {
            this.page++;
            this.isEnd = true; //开启获取数据通道
          } else {
            this.page = 0;
            this.isEnd = true; //开启获取数据通道
          }
          if (this.cards.length > 0) {
            this.isOk = 1;
            if (this.page == 0) {
              this.isOk = 2;
            }
          } else {
            this.isOk = 0;
          }
          //如果图片单独拿出来
          if (this.id == 1) {
            this.photoArr = [];
            for (let i = 0; i < this.cards.length; i++) {
              this.photoArr.push(this.cards[i].imgurl);
            }
          }
        });
      }
    },
    //切换模式
    changModel(model) {
      this.model = model;
    },
    //处理删除墙后页面更新问题
    dealDeleteWall() {
      this.cards = [];
      this.page = 1;
      this.getWallCards(this.id);
    },
    //处理添加或删除评论
    dealAddOrDeleteComment(num) {
      this.cards[this.selectCardIndex].comcount[0].count += num;
    },
    //处理点击爱心
    dealClickLike(index) {
      // console.log(index);
      this.cards[index].like[0].count++;
    },
  },

  created() {
    //监测屏幕滚动事件
    window.addEventListener("scroll", this.scrollBottom);
    //加载动画
    this.loading();
    //获取卡片墙数据
    this.getUserId(this.id);
    this.$bus.on("changeModelToWallMessage", this.changModel);
  },

  unmounted() {
    //卸载屏幕滚动事件
    window.removeEventListener("scroll", this.scrollBottom);
  },
};
</script>

<style lang="less" scoped>
.modal {
  &-enter {
    &-from {
      transform: translateX(100%);
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      transform: translateX(0px);
    }
  }
  &-leave {
    &-from {
      transform: translateX(0px);
    }
    &-active {
      transition: all 0.2s ease-in;
    }
    &-to {
      transform: translateX(100%);
    }
  }
}

.modal2 {
  &-enter {
    &-from {
      opacity: 0;
    }
    &-active {
      transition: all 0.2s ease-out;
    }
    &-to {
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      opacity: 1;
    }
    &-active {
      transition: all 0.2s ease-in;
    }
    &-to {
      opacity: 0;
    }
  }
}

.wall-message {
  min-height: 1000px;

  .title {
    font-family: PingFangSC-Semibold;
    font-size: 56px;
    color: @gray-1;
    letter-spacing: 0;
    text-align: center;
    font-weight: 600;
    padding-top: 48px;
  }
  .titleNight {
    color: rgb(231, 232, 233);
  }
  .slogan {
    margin-top: 8px;
    color: @gray-2;
    text-align: center;
  }
  .label {
    margin-top: 44px;
    display: flex;
    justify-content: center;
    cursor: pointer;

    .babel-list {
      height: 28px;
      line-height: 28px;
      text-align: center;
      margin: 1 4px;
      padding: 0 15px;
    }
    .babelListNight {
      color: rgb(230, 231, 232);
    }
    .labelselect {
      font-size: 14px;
      color: @gray-1;
      font-weight: 600;
      border: 1px solid rgba(32, 32, 32, 1);
      border-radius: 14px;
    }
    .labelSelectNight {
      font-size: 14px;
      color: rgb(230, 231, 232);
      font-weight: 600;
      border: 1px solid rgb(230, 231, 232);
      border-radius: 14px;
    }
  }
  .card-list {
    display: flex;
    flex-flow: row wrap;
    margin-top: 30px;
    justify-content: center;

    .card-item {
      margin-right: 12px;
      margin-bottom: 12px;
      box-sizing: border-box;
      transition: 0.3s ease;
    }
    .card-item:hover {
      transform: translateY(-10px);
    }
    .selectCard {
      border: 1px solid rgba(59, 115, 240, 1);
      box-sizing: border-box;
    }
  }
  .photo {
    padding-top: 27px;
    width: 88%;
    columns: 6;
    column-gap: 4px;
    margin: 0 auto;
    // display: flex;
    // flex-wrap: wrap;
    .photo-item {
      margin-bottom: 4px;
      break-inside: avoid;
    }
  }

  .none-msg {
    width: 100%;
    text-align: center;
    padding-top: 80px;
    position: absolute;
    top: 280px;
    img {
      width: 25%;
      display: inline;
    }
    p {
      font-family: serif;
      font-weight: 700;
      font-size: 19px;
      color: @gray-3;
    }
  }

  .loading {
    text-align: center;
    width: 100%;
    p {
      margin-top: -72px;
      font-family: serif;
      font-size: 24px;
      color: @gray-3;
    }
    #lottile {
      margin-top: 20px;
      height: 200px;
    }
  }
  .no-more {
    text-align: center;
    font-size: 16px;
    color: @gray-3;
    padding: 20px;
  }
  .add {
    width: 56px;
    height: 56px;
    background: @gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;
    // bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: @tr;
    cursor: pointer;

    .icon-tianjia {
      font-size: 24px;
      color: @gray-10;
    }
  }
  .ly-view {
    transition: @tr;
  }
}
</style>