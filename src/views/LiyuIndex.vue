<template>
  <div class="index">
    <TopBar class="top-bar" @changModel="changModel"></TopBar>
    <video
      v-if="model == 1"
      src="../assets/images/lyyejian.mp4"
      autoplay
      loop
      class="bg-video"
    ></video>
    <video
      v-if="model == 0"
      src="../assets/images/qm1.mp4"
      autoplay
      loop
      class="bg-video"
    ></video>
    <router-view class="banner"></router-view>
    <FooterBar class="footer-bar"></FooterBar>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import FooterBar from "@/components/FooterBar.vue";
import { signIpApi } from "@/api/index";
export default {
  name: "LiyuIndex",
  components: { TopBar, FooterBar },
  data() {
    return {
      model: 0,
    };
  },
  computed: {},
  methods: {
    getUser() {
      signIpApi().then((res) => {
        let user = {
          id: res.ip,
        };
        this.$store.commit("getUser", user);
      });
    },
    changModel(model) {
      this.model = model;
    },
  },
  mounted() {
    this.getUser();
    this.$store.commit("getModel", this.model);
  },
};
</script>

<style lang="less" scoped>
.index {
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .banner {
    margin-top: 52px;
    z-index: 100;
  }
  .bg-video {
    height: 880px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -100;
  }
  .footer-bar {
    position: sticky;
    top: 800px;
  }
}
</style>