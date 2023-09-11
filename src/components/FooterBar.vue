<template>
  <div class="footer-bar">
    <div class="footer-bar-inner">
      <div class="footer-left">
        <div class="logo">
          <img src="../assets/images/lysg.svg" class="logo-img" />
          <p class="logo-name">鲤遇时光</p>
        </div>
        <p class="p-top">鲤遇时光是一个便于与用户交流的留言平台</p>
        <p class="p-middle">
          用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录。
        </p>
        <p class="p-bottom">
          <span>声明</span><span>备案/许可证粤ICP备190128xxx号</span
          ><span>网站备案/许可证粤ICP备1901xxx号-1</span>
        </p>
      </div>
      <div class="link">
        <p class="p-link">链接</p>
        <div class="link-inner">
          <a href="#">鲤遇时光</a>
          <a href="#">B站</a>
        </div>
      </div>
      <div class="footer-right">
        <p class="gain">打赏</p>
        <div class="pay">
          <div class="pay-wechat">
            <img src="../assets/images/wx@2x.png" alt="" />
            <p>微信支付</p>
          </div>
          <div class="pay-zfb">
            <img src="../assets/images/zfb@2x.png" alt="" />
            <p>支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
};
</script>

<style lang="less" scoped>
.footer-bar {
  width: 100%;
  height: 200px;
  background: @gray-1;
  .footer-bar-inner {
    margin: 0 auto;
    padding: 20px 0px;
    width: 1200px;
    display: flex;
    .footer-left {
      width: 510px;
      .logo {
        display: flex;
        .logo-img {
          width: 32px;
          height: 32px;

          margin-right: 10px;
        }
        .logo-name {
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: justify;
          font-weight: 600;
        }
      }
      .p-top,
      .p-middle,
      .p-bottom {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 400;
      }
      .p-top {
        margin-top: 24px;
      }
      .p-middle {
        width: 400px;
      }
      .p-bottom {
        margin-top: 30px;
      }
    }
    .link {
      width: 450px;
      .p-link {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 400;
      }
      .link-inner {
        display: flex;
        margin-top: 15px;
        a {
          opacity: 0.5;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: justify;
          font-weight: 400;
        }
        a:first-child {
          margin-right: 20px;
        }
      }
    }
    .footer-right {
      width: 240px;
      .gain {
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 400;
      }
      .pay {
        display: flex;
        margin-top: 9px;
        .pay-wechat {
          margin-right: 40px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #ffffff;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 400;
            margin-top: 9px;
          }
        }
        .pay-zfb {
          img {
            width: 100px;
            height: 100px;
          }
          p {
            opacity: 0.5;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #ffffff;
            letter-spacing: 0;
            text-align: justify;
            font-weight: 400;
            margin-top: 9px;
          }
        }
      }
    }
  }
}
</style>