import Request from "@/utils/request/request";

export function userLogin(params) {
  return Request.post("/login", params);
}
export function writeImg(params) {
  return Request.post("/write", params);
}
