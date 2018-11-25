// components/classic/music/index.js
import { classicBeh } from '../classic-beh.js';

const mMgr = wx.getBackgroundAudioManager();

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String, // 音乐路径
  }, 

  /**
   * 组件的初始数据
   */
  data: {
    playSrc: 'image/player@play.png',
    pauseSrc: 'image/player@pause.png',
    playing:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function() {
      // 如果音乐未播放  播放音乐
      if(!this.data.playing) {
        this.setData({ playing: true });
        // 设置src 后自动播放
        mMgr.src = this.properties.src;
      }else {
        this.setData({ playing: false });
        mMgr.pause();
      }
      
    },


    _recoverStatus: function () {
      // 当音乐的播放状态  为暂停的时候
      if (mMgr.paused) {
        this.setData({
          playing: false
        });
        return;
      }

      // 如果 AudioManager的src 和 当前的src 相等 说明 当前音乐正在播放
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        });
      }
    },



    _monitorSwitch:function() {
      // 播放
      mMgr.onPlay(()=>{
        this._recoverStatus();
      });
      // 暂停
      mMgr.onPause(() => {
        this._recoverStatus();
      });
      // 关闭总控开关
      mMgr.onStop(() => {
        this._recoverStatus();
      });
      // 自动播放完成
      mMgr.onEnded(() => {
        this._recoverStatus();
      });


    }



  },

  attached:function() { 
    //组件加载的时候 检测当前播放状态
    this._recoverStatus();
    //监听 播放总控
    this._monitorSwitch();
  },

  detached:function() {
  },


 
})
