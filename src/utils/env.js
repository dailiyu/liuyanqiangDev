/*
baseUrl:域名地址
router:路由模式
baseImgPath:图片存放地址
*/

let baseUrl = "";
let routerMode = "hash";
let baseImgPath;

if (process.env.NODE_ENV == "development") {
  baseUrl = "http://localhost:3000";
  baseImgPath = "https://localhost:3000";
} else {
  baseUrl = "http://139.9.36.228:3000";
  baseImgPath = "http://139.9.36.228:3000";
}

export { baseImgPath, routerMode, baseUrl };
