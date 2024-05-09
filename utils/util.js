const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generateMixed(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

// 获取接口返回中包含列表键值的信息(error类)
const getErrorResponse = (data) => {
  // 错误信息键值列表
  const keyList = ["code", "errorCode", "errorcode", "errcode", "errCode", "error", "traceId", "$traceId", "reqFlag", "errData"]

  // 初始化列表筛选后返回信息对象
  var response = {}

  // 初始化接口返回对象
  var ob = {}

  // 转化接口返回数据类型为对象
  if (isObject(data))
      ob = data
  else if (isJSON(data))
      ob = JSON.parse(data)

  // 筛选
  for (var i in keyList) {
      const key = keyList[i]
      if (key in ob)
          response[key] = ob[key]
  }

  //返回列表筛选后数据
  return response
}

// isJSON
function isJSON(str) {
  if (typeof str == 'string') {
      try {
          var obj = JSON.parse(str);
          if (typeof obj == 'object' && obj)
              return true
          else
              return false
      } catch (e) {
          return false
      }
  }
}

// isObject
function isObject(obj) {
  if (typeof (obj) === 'object' &&
      Object.prototype.toString.call(obj).toLowerCase() === '[object object]' &&
      !obj.length
  ) 
      return true
  else 
      return false
}

// isNull
const isNil = (val) => val === undefined || val === null

// isEmpty
const isEmpty = (val) => {
return isString(val) || isObject(val) || Array.isArray(val) ?
!Object.keys(val).length : isNil(val)
}

// isString
const isString = (val) => typeof val === 'string'

/**
* 删除Object中指定的key
* @param {object} obj 原始对象
* @param {Array} arr 指定删除的key数组
* @returns {object} 删除后的对象
*/
const delObjByKey = (obj = {}, arr = []) => {
if (isEmpty(obj) || !isObject(obj)) return {}
if (isEmpty(arr) || (!Array.isArray(arr) && !isString(arr))) return obj

return Object.keys(obj)
  .filter((k) => !arr.includes(k))
  .reduce((acc, key) => ((acc[key] = obj[key]), acc), {})
}


/**
 * 返回当前页面的路径地址
 * @returns {string} 当前页面的路径地址
 */
const getCurrentPageUrl = () => {
  let page = ''
  const pages = getCurrentPages()
  if (pages && pages.length && pages.length > 0 && pages[pages.length - 1]) {
      page = pages[pages.length - 1].route || ''
  }
  return page
}

/**
* 解析URL和查询参数
* @param {String} urlString URL字符串
* @returns {object} 返回包含URL路径和查询参数对象的结果
*/
export const getUrlAndQuery = (urlString) => {
  // 拆解字符串
  const [urlPath, queryParamsString] = urlString.split("?");
  const queryParamsArray = queryParamsString ? queryParamsString.split("&") : [];

  // 构建查询参数对象
  const queryParams = {};
  // 遍历查询参数数组，将每个参数拆分为键和值，并存储到queryParams对象中
  queryParamsArray.forEach(param => {
      const [key, value] = param.split("=");
      // 仅在值不为空字符串时添加参数到 queryParams 对象中
      if (key !== "") {
          queryParams[key] = decodeURIComponent(value);
      }
  });

  // 构建最终结果对象
  return {
      url: urlPath,
      query: queryParams
  };
}


module.exports = {
  formatTime: formatTime,
  random: random,
  getCurrentPageUrl: getCurrentPageUrl,
  delObjByKey: delObjByKey,
  getErrorResponse: getErrorResponse
}
