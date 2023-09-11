import fetch from "@/utils/axios";

//新建墙
export const insertWallApi = (data) => fetch.post("/insertwall", data);

//获取访问者ip
export const signIpApi = () => fetch.post("/signip");

//查询墙
export const findWallApi = (data) => fetch.post("/findwallpage", data);

//反馈
export const insertFeedbackApi = (data) => fetch.post("/insertfeedback", data);

//新增评论
export const insertCommentApi = (data) => fetch.post("/insercomment", data);

//分页查询评论
export const findCommentPageApi = (data) =>
  fetch.post("/findcommentpage", data);

//分页查询评论
export const profileApi = (data) => fetch.post("/profile", data);

//删除墙
export const deleteWall = (data) => fetch.post("/deletewall", data);

//删除评论
export const deleteComment = (data) => fetch.post("/deletecomment", data);
