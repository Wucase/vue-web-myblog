import Request from "@/utils/request/request";

//添加留言
export function addMsg(params) {
  return Request.post("/addMsg", params);
}

// //获取文章
// export function getArticalList(params) {
//   return Request.get("/getArticalList", params);
// }

//根据id获取文章
export function getMsgById(params) {
  return Request.get("/getMsgById", params);
}
