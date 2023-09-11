<template>
  <div class="ly-modal">
    <!-- 头部 -->
    <div class="ly-modal-head">
      <p class="modal-name">{{ title }}</p>
      <span class="iconfont icon-guanbi" @click="closeModal"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  nameL: "LyModel",
  props: {
    title: {
      default: "写留言",
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style lang="less" scoped>
.ly-modal {
  width: 360px;
  height: 948px;
  position: fixed;
  top: 52px;
  right: 0px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);

  .ly-modal-head {
    display: flex;
    justify-content: space-between;
    padding: @padding-20;

    box-sizing: border-box;
    .modal-name {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: @gray-1;
      font-weight: 600;
    }
    .icon-guanbi {
      font-size: 13px;
      color: @gray-2;
      cursor: pointer;
      padding-left: 8px;
    }
  }
}
</style>