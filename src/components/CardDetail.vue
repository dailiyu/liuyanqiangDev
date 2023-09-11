<template>
  <div class="card-detail">
    <div class="top-bt">
      <el-popconfirm
        title="您真的要撕掉这个留言吗？"
        class="revoke"
        confirm-button-text="是的"
        cancel-button-text="点错了"
        @confirm="deleteWall"
        icon="el-icon-info"
      >
        <template #reference>
          <p class="revoke">撕掉该留言</p>
        </template>
      </el-popconfirm>

      <!-- <p class="revoke" @click="deleteWall">撕掉该留言</p> -->
      <p
        class="report"
        @click="toAlert('暂时还没有举报功能哦,遵守文明从我做起~')"
      >
        举报
      </p>
    </div>
    <slot class="noteCard"></slot>
    <!-- <NodeCard v-if="cardData" :cardData="cardData" class="noteCard" ></NodeCard> -->
    <!-- 收集信息表单 -->
    <div class="form">
      <textarea
        class="message"
        placeholder="请输入..."
        v-model="message"
      ></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" v-model="name" />
        <LyButton
          class="buttom"
          :disabled="name.trim() == '' || message.trim() == ''"
          @click="submit"
          >评论</LyButton
        >
      </div>
    </div>
    <!-- 评论区 -->
    <p class="title">评论 {{ cardData.comcount[0].count }}</p>
    <div class="comments">
      <div class="comment-li" v-for="(item, index) in comments" :key="index">
        <div
          class="user-head"
          :style="{ background: portrait[item.imgurl] }"
        ></div>
        <div class="comment-right">
          <div class="momment-right-top">
            <p class="name">{{ item.name }}</p>
            <p class="time">{{ item.moment }}</p>
            <el-popconfirm
              title="您要删除这条评论吗？"
              class="delete"
              confirm-button-text="是的"
              cancel-button-text="点错了"
              @confirm="deleteComment(item.id)"
              icon="el-icon-info"
            >
              <template #reference>
                <p class="delete">删除</p>
              </template>
            </el-popconfirm>

            <!-- <p class="delete" @click="deleteComment(item.id)">删除</p> -->
          </div>
          <div class="comment-message">
            {{ item.comment }}
          </div>
        </div>
      </div>
    </div>
    <p class="more" @click="getComment" v-show="nowPage > 0">加载更多...</p>
  </div>
</template>

<script>
// import NodeCard from "@/components/NodeCard.vue";
import LyButton from "./LyButton.vue";

import { portrait } from "@/utils/data";
import { formatDate } from "@/utils/lysg.index";
import {
  insertCommentApi,
  findCommentPageApi,
  deleteWall,
  deleteComment,
} from "@/api/index";
export default {
  name: "CardDetail",
  props: {
    cardData: {
      default: {},
    },
    index: {
      default: 0,
    },
  },
  components: {
    // NodeCard,
    LyButton,
  },
  data() {
    return {
      comments: [],
      portrait,
      message: "", //输入的评论信息
      name: "", //输入的签名
      userId: this.$store.state.user,
      // cardDatas: {},
      nowPage: 1, //当前页
      pageSize: 4, //一页的评论数
      // add: 0,
      isCurEnd: true, //当前获取评论轮是否结束
    };
  },

  computed: {
    cardDatas() {
      return this.cardData;
    },
  },
  watch: {
    cardData() {
      this.add = 0;
      this.nowPage = 1;
      this.comments = [];
      this.getComment();
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
    message(newvalue) {
      if (newvalue.length > 50) {
        this.message = this.message.slice(0, 50);
        this.$message({
          type: "warning",
          message: "哎呀，评论超字数喽~",
        });
      }
    },
  },
  methods: {
    //添加评论
    submit() {
      //如果有用户头像就用头像没有就随机
      let img = Math.floor(Math.random() * 9);
      let name = "匿名";
      if (this.name) {
        name = this.name;
      }
      let data = {
        wallId: this.cardData.id,
        userId: this.userId.id,
        imgurl: String(img),
        moment: formatDate(new Date()),
        comment: this.message,
        name: name,
      };
      insertCommentApi(data).then((res) => {
        if (res.code == 200) {
          this.comments.unshift(data);
          this.nowPage = 1;
          this.comments = [];
          this.getComment();
          // this.add++;
          this.message = "";
          this.name = "";
          this.$emit("dealAddOrDeleteComment", 1);
        }
      });
    },
    //获取评论
    getComment() {
      if (this.nowPage > 0 && this.isCurEnd) {
        let data = {
          id: this.cardData.id,
          page: this.nowPage,
          pagesize: this.pageSize,
        };

        this.isCurEnd = false; //关门
        findCommentPageApi(data).then((res) => {
          this.comments = this.comments.concat(res.message);
          if (res.message.length > 0) {
            this.nowPage++;
            this.isCurEnd = true; //开门
          } else {
            this.nowPage = 0;
            this.isCurEnd = true; //开门
          }
        });
      }
    },

    //提示没有该功能
    toAlert(message) {
      alert(message);
    },
    //删除墙
    deleteWall() {
      let data = {
        id: this.cardData.id,
        imgurl: this.cardData.imgurl,
      };
      deleteWall(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.$emit("closeModel");
          this.$emit("dealDeleteWall");
        }
      });
    },
    //删除评论
    deleteComment(id) {
      let data = {
        id: id,
      };
      deleteComment(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: "删除成功",
            type: "success",
          });

          this.comments = [];
          this.nowPage = 1;

          this.getComment();

          this.$emit("dealAddOrDeleteComment", -1);
        }
      });
    },
  },
  mounted() {
    this.getComment(); //获取评论数据
  },
};
</script>

<style lang="less" scoped>
.card-detail {
  padding: 0 30px;
  height: 620px;
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
  .top-bt {
    // padding: 0px @padding-20;
    display: flex;
    .revoke {
      color: @primary-color;
      cursor: pointer;
      padding-right: 30px;
      font-size: @font-size-16;
    }
    .report {
      font-size: @font-size-16;
      color: @warning;
      cursor: pointer;
    }
  }
  .noteCard {
    margin-top: 20px;
  }
  .form {
    .message {
      background: none;
      border: 1px solid rgba(148, 148, 148, 1);
      resize: none;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #949494;
      height: 56px;
      width: 282px;
      margin-top: 12px;
    }
    .bt {
      display: flex;
      margin-top: 3px;
      .name {
        width: 160px;
        height: 36px;

        border: 1px solid rgba(148, 148, 148, 1);

        background: none;
        line-height: 20px;
        margin-right: 30px;
      }
      .buttom {
        width: 80px;
        height: 36px;
        background: #202020;
        border-radius: 18px;
      }
    }
  }
  .title {
    margin-top: 25px;
    font-size: 14px;
    color: #202020;
    font-weight: 700;
  }
  .comments {
    margin-top: 10px;
    .comment-li {
      display: flex;
      margin-bottom: 30px;
      .user-head {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-image: linear-gradient(
          180deg,
          rgba(29, 225, 104, 0.5) 0%,
          #1de168 100%
        );
      }
      .comment-right {
        width: 284px;
        margin-left: 8px;

        .momment-right-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            margin-right: 4px;
          }
          .time {
            font-size: 12px;
            color: #949494;
            font-weight: 400;
          }
          .delete {
            float: right;
            font-size: 12px;
            color: #949494;
            font-weight: 400;
          }
        }
        .comment-message {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #202020;
          font-weight: 400;
          word-wrap: break-word;
          width: 250px;
        }
      }
    }
  }
  .more {
    height: 20px;
    color: @gray-2;
    text-align: center;
    cursor: pointer;
    padding: 20px;
  }
}
</style>