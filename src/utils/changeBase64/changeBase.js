// export function uploadImgToBase64 (file) {
//   return new Promise((resolve, reject) => {
//    const reader = new FileReader()
//    reader.readAsDataURL(file)
//    reader.onload = function () { // 图片转base64完成后返回reader对象
//     resolve(reader)
//    }
//    reader.onerror = reject
//   })
//  }
export function getBase64(file) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
}
 