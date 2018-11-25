import { HTTP } from '../utils/http.js';
export class KeywordModel extends HTTP {

  constructor() {
    super();
    this.key = "q";
    this.maxLength = 10;
  }

  

  getHistory() {
    // 搜索历史 在缓存中
    const words = wx.getStorageSync(this.key);
    if(!words){
      return [];
    }

    return words;
  }

  /**
   * 获取热门关键字
   */
  getHot() {
    return this.requestPormise({
      url:'/book/hot_keyword',
    });
  }

  /**
   * 关键字 写入到缓存中
   */
  addToHistory(keyword) {
    let words = this.getHistory();
    const has = words.includes(keyword);
    if(!has) {
      // 删除 数组末尾
      const length = words.length;
      if(length >= this.maxLength) {
        words.pop();
      }
      words.unshift(keyword);
    }
    wx.setStorageSync(this.key, words);
  }

}