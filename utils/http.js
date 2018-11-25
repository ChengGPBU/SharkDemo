import {config} from '../config.js';

const tips = {
  1:'错误了',
  1005:'appkey无效',
  3000:'期刊不存在'
}


class HTTP {

  constructor() {
  }

  requestPormise({url,data={},method='GET'}) {
      return new Promise((resolve,reject)=>{
        this.requestNew(url, resolve,reject,data,method);
      });
  }


  // 新版
  requestNew(url, resolve,reject,data={},method='GET') {
    // url data method 
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header:{
        'appkey':config.appkey,
        'content-type':'application/json'
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if(code.startsWith('2')) {
          console.log(res);
          resolve(res.data);
        } else {
        reject();
         const error_code = res.data.error_code;
         this._show_error(error_code);
        }
      },
      fail: (err) => {
        reject();
        this._show_error(1);
      }
    })

  }


  //老版
  request(params) {
    // url data method 
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'appkey': config.appkey,
        'content-type': 'application/json'
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          console.log(res);
          if (params.success) {
            params.success(res.data);
          }
        } else {
          const error_code = res.data.error_code;
          this._show_error(error_code);
        }
      },
      fail: (err) => {
        this._show_error(1);
      }
    })

  }


  _show_error(error_code) {
    if(!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code]

    wx.showToast({
      title: tip ? tips[error_code]: tips[1],
    })
  }
}


export { HTTP };