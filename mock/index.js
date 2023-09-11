let Mock = require("mockjs");

const note = Mock.mock({
  "data|20": [
    {
      moment: new Date(), //创建时间
      "id|+1": 10, //id
      "userId|+1": 10, //userId
      "message|24-96": "@cword", //内容
      "label|0-10": 0, //标签
      name: "@cname", //name
      "like|0-120": 0, //like
      "comment|0-120": 0, //评论
      "imgurl|0-4": 0, //背景色
      "revoke|0-20": 0, //是否撤销
      "report|0-20": 0, //是否举报
      type: 0, //类型
    },
  ],
});

const comments = Mock.mock({
  "data|20": [
    {
      moment: new Date(), //创建时间
      "id|+1": 10, //id
      "userId|+1": 10, //userId
      "message|24-96": "@cword", //内容
      name: "@cname", //name

      "comment|0-120": 0, //评论
      "imgurl|0-8": 0, //背景色
    },
  ],
});

const photos = Mock.mock({
  "data|21": [
    {
      moment: new Date(), //创建时间
      "id|+1": 10, //id
      "userId|+1": 10, //userId
      "message|24-96": "@cword", //内容
      "label|0-10": 0, //标签
      name: "@cname", //name
      "like|0-120": 0, //like
      "comment|0-120": 0, //评论
      "imgurl|0-20": 0, //图片索引
      "revoke|0-20": 0, //是否撤销
      "report|0-20": 0, //是否举报
      type: 1, //类型
    },
  ],
});

module.exports = {
  note: note,
  comments: comments,
  photos: photos,
};
