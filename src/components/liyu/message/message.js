import { createVNode, render } from "vue";
import LyMessage from "./LyMessage.vue";
const divVNode = createVNode("div", { class: "xtx-message-container" });
render(divVNode, document.body);
const div = divVNode.el;
const LYMessage = ({ message, type }) => {
  // 1。动态创建虚拟DOM -  createVNode(h)函数
  const comVNode = createVNode(LyMessage, { message, type }); // 2。渲染到body页面中 -render 函数
  render(comVNode, document.body);
  render(comVNode, div);
  //3.提示在6s后自动卸载setTimeout(() => {render(null,div), oooy
};

export default LYMessage;
