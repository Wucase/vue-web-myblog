import Request from "@/utils/request/request";

//添加文章
export function addArtical(params) {
  return Request.post("/addArtical", params);
}

//上传图片
export function fileUpload(params) {
  return Request.post("/fileUpload", params);
}

//获取文章
export function getArticalList(params) {
  return Request.get("/getArticalList", params);
}

//根据id获取文章
export function getArticalById(params) {
  return Request.get("/getArticalById", params);
}

//根据id获取文章
export function updateArticalById(params) {
  return Request.put("/updateArticalById", params);
}
