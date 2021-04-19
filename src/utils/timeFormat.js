export function timeService(timer, noSeconds, simplyTime) {
  var regex = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
  if (regex.test(timer)) return timer; //已格式化 不再执行此方法
  if (timer === "--" || !timer) {
    return "--";
  }
  // if (typeof timer === "string" && timer.indexOf(".") > -1) return timer;
  if (typeof timer === "string" && timer.indexOf("T") > -1) {
    // return timer.replace(/[A-Z]/g, ' ')
    return formteTimeHasT(timer);
  }
  if (typeof timer === "string" && timer.indexOf("T") === -1) {
    if (timer.length === 10) {
      // 如果为10位
      timer = timer * 1000;
    } else {
      // 如果时间戳为13位
      timer = timer - 0;
    }
  } else {
    // number类型
    if (timer.toString().length === 10) timer = timer * 1000;
  }

  var time;
  let date = new Date(timer);
  // console.log(date, 'date')
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  if (noSeconds) {
    time =
      year +
      "-" +
      month +
      "-" +
      day +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds;
    return time;
  }
  if (simplyTime) {
    time = year + "-" + month + "-" + day;
    return time;
  }
  time =
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  return time;
}

export function timeExpired(timer, reFundOrder) {
  if (timer === "--" || !timer) {
    //表示未过期
    return false;
  } else {
    let nowTime = new Date();
    let date = new Date(timer);
    let overDueTime;
    if (reFundOrder) {
      overDueTime = nowTime.getTime() - date.getTime() - 7 * 24 * 3600 * 1000;
    } else {
      overDueTime = nowTime.getTime() - date.getTime();
    }
    if (overDueTime > 0) {
      //大于0  表示过期 或者已超过7天不能退订
      return true;
    } else {
      return false;
    }
  }
}

/**
 *
 */
export function timerExp(timer) {
  if (timer && timer.indexOf("T") > -1) {
    // console.log(timer)
    // let time = timer.replace(/[A-Z]/g, ' ')
    let time = formteTimeHasT(timer);
    // console.log(time)
    return time;
  }
}

export function timestampToTime(timestamp) {
  var time;
  let date = new Date(timestamp);
  // console.log(date, 'date')
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  time =
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
  return time;
}

//处理带T的时间格式
export function formteTimeHasT(date) {
  var newDate = new Date(date).toJSON();

  return new Date(+new Date(newDate) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, " ")
    .replace(/\.[\d]{3}Z/, "");
}
