//获取图片
export const getObjectURL = (file) => {
  var url = "";
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(
      new Blob([file], { type: "application/zip" })
    );
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};

//将date类型数据转为2022.3.23这种形式的日期
export const formatDate = (date) => {
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份（注意月份是从 0 开始计数的）
  const day = date.getDate(); // 获取日期
  const hour = date.getHours(); // 获取小时
  const minute = date.getMinutes(); // 获取分钟

  return `${year}.${month}.${day}-${hour}:${minute}`;
};
