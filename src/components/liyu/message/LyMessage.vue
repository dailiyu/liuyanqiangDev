<template>
  <transition name="down">
    <div class="Ly-message" v-if="isShow">
      <div class="ly-m-i">
        <i :class="style[type].icon"></i>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LyMessage",
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "warm",
    },
  },

  data() {
    return {
      //定义一个对象，包含三种情况的样式，对象key就是类型字符串
      style: {
        warning: {
          icon: "iconfont icon-xinxitishi",
        },
        error: {
          icon: "iconfont icon-shibaibaocuo",
        },
        success: {
          icon: "iconfont icon-chenggongyijiejue",
        },
      },
      isShow: false,
    };
  },
  mounted() {
    this.isShow = true;
    setTimeout(() => {
      this.isShow = false;
    }, 3000);
  },
};
</script>

<style lang="less" scoped>
.down {
  &-enter {
    &-from {
      transform: translateY(-30px);
      opacity: 0;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }
  &-leave {
    &-from {
      transform: translateY(px);
      opacity: 1;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}

.Ly-message {
  width: 100%;
  height: 40px;
  position: fixed;
  z-index: 9999;
  top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: center;

  .ly-m-i {
    padding: 0 20px;
    color: @gray-1;
    background: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  i {
    margin-right: 6px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}

.icon-success {
  color: @primary-color;
}

.icon-warning {
  color: @warning;
}

.icon-error {
  color: @error-color;
}
</style>