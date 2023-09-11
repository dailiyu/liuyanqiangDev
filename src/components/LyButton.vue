<template>
  <div>
    <button :class="[size, nom]" class="ly-button" :disabled="disabled">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "LyButton",
  props: {
    size: {
      default: "base",
    },
    nom: {
      default: "primary",
    },
    disabled: {
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
.ly-button {
  text-align: center;
  border: none;
  cursor: pointer;
}
.ly-button:disabled {
  background: #ccc;
  color: #888;
  cursor: not-allowed;
}

//size
.base {
  min-width: 80px;
  height: 36px;
  background: #3b73f0;
  border-radius: 20px;
  padding: 0 20px;
}
.small {
  min-width: 72px;
  height: 32px;
  border-radius: 24px;
  padding: 0 20px;
}
.max {
  min-width: 100px;
  height: 48px;
  border-radius: 24px;
  padding: 0 24px;
}

//nom
.primary {
  background: @gray-1;
  color: @gray-10;
}
.secondary {
  background: @gray-10;
  color: @gray-1;
  border: 1px soild @gray-1;
}
.cprimary {
  background: @primary-color;
  color: @gray-10;
  font-weight: 600;
}
.csecondaryNight {
  background: rgb(18, 25, 42);
  color: @gray-10;
}
</style>