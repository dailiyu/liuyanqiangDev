<template>
  <div class="top-bar" :class="{ topBarNight: model == 1 }">
    <div class="logo">
      <img src="@/assets/images/lysg.svg" />
      <p class="logo-name" :class="{ logonameNight: model == 1 }">鲤遇时光</p>
    </div>
    <div class="menu">
      <LyButton size="small" :nom="id == 1 ? (model == 0 ? 'cscondary' : 'csecondaryNight') : 'cprimary'
        " class="menu-message" @click="changeWall(0)">留言墙</LyButton>
      <LyButton size="small" :nom="id == 0 ? (model == 0 ? 'cscondary' : 'csecondaryNight') : 'cprimary'
        " class="menu-photo" @click="changeWall(1)">照片墙</LyButton>
    </div>
    <div class="user">
      <div class="user-head" @click="changeModel">
        <img src="../../src/assets/images/taiyang.png" class="img" v-if="model == 0" />
        <img src="../../src/assets/images/yueliang.png" class="img1" v-if="model == 1" />
      </div>
    </div>
  </div>
</template>

<script>
import LyButton from "../components/LyButton.vue";
export default {
  name: "TopBar",
  components: {
    LyButton,
  },
  data() {
    return {
      model: 1,
    };
  },
  computed: {
    id() {
      return this.$route.query.id; //当前路由id
    },
  },
  methods: {
    changeWall(index) {
      this.$router.push({
        query: { id: index },
      });
    },
    changeModel() {
      this.model = this.model == 0 ? 1 : 0;

      this.$bus.emit("changeModelToWallMessage", this.model);
      this.$bus.emit("changeModelToCardNote", this.model);
      this.$emit("changModel", this.model);
    },
  },
};
</script>

<style lang="less" scoped>
.top-bar {
  height: 52px;
  width: 100%;
  //   padding: 0px 30px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 300px;
    display: flex;
    align-items: center;
    padding: 0 0 0 30px;

    .logo-name {
      font-family: PingFangSC-Semibold;
      font-size: 20px;
      color: @gray-1;
      font-weight: 600;
      padding-left: 10px;
    }

    .logonameNight {
      color: @gray-10;
    }
  }

  .menu {
    display: flex;
    justify-content: space-between;

    .menu-message {
      margin-right: 24px;
    }
  }

  .user {
    cursor: pointer;
    width: 300px;
    padding: 0 30px 0 0;

    .user-head {
      float: right;
      border-radius: 50%;
      height: 36px;
      width: 36px;

      // background-image: linear-gradient(180deg, #7be7ff 2%, #1e85e2);
      .img {
        width: 130%;
      }

      .img1 {
        width: 100%;
      }
    }
  }
}

.topBarNight {
  background: rgb(18, 25, 42);
}
</style>