
import {HTTP} from '../utils/http.js';

export class ClassicModel extends HTTP{
  /**
   * 加载最新期刊
   */
  getLatest(callBack) {
    this.request({
      url: '/classic/latest',
      success: (res) => {
        callBack(res);
        this._setLatestIndex(res.index);
        wx.setStorageSync(this._getKey(res.index), res);
      }});
  }

  /**
   * 获取期刊
   */
  getClassic(index,nextOrPrevious,callBack) {
    // 从缓存中读取
    const key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);

    const classic = wx.getStorageSync(key);
    if (!classic) {
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res);
          callBack(res);
        }
      });
    }else {
      callBack(classic);
    }
   
  }

  /**
   * 是否第一
   */
  isFirst(index) {
    return index == 1 ? true : false;
  }


  /**
   * 是否最新
   */
  isLatest(index) {
    const latest = this._getLatestIndex();
    return latest == index ? true : false;
  }

  /**
   * 保存最新期刊的角标
   */
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }


  _getLatestIndex() {
    wx.getStorageSync('latest');
  }

  /**
   * 获取key
   */
  _getKey(index) {
    return 'classic_'+index;
  }


  /**
   * 获取我喜欢的期刊
   */
  getMyFavor() {
   return this.requestPormise({
     url: 'classic/favor',
   });
  }
}