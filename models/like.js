import { HTTP } from '../utils/http.js';

export class LikeModel extends HTTP {
  /**
   * 点赞
   */
  like(behavior,artId,category, callBack) {
    this.request({
      url: behavior === 'like' ? 'like':'like/cancel',
      method:'POST',
      data:{
        art_id: artId,
        type:category,
      }
    });
  }

  /**
   * artID 期刊id
   * category 期刊类型
   */
  getClassicLikeStatus(artID,category,callback) {
      this.request({
        url: 'classic/' + category+'/'+artID+'/favor',
        success:callback
      });
  } 
}