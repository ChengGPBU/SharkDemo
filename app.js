// //app.js
import { eventCatcher } from './utils/hook/weapp'

eventCatcher.on('app-launch', (e) => {
  console.log('app-launch', e)
})
eventCatcher.on('app-show', (e) => {
  console.log('app-show', e)
})
eventCatcher.on('app-hide', (e) => {
  console.log('app-hide', e)
})
eventCatcher.on('app-page-not-found', (e) => {
  console.log('app-page-not-found', e)
})
eventCatcher.on('page-load', (e) => {
  console.log('page-load', e)
})
eventCatcher.on('page-show', (e) => {
  console.log('page-show', e)
})
eventCatcher.on('page-ready', (e) => {
  console.log('page-ready', e)
})
eventCatcher.on('page-hide', (e) => {
  console.log('page-hide', e)
})
eventCatcher.on('page-unload', (e) => {
  console.log('page-unload', e)
})
eventCatcher.on('page-pull-down-refresh', (e) => {
  console.log('page-pull-down-refresh', e)
})
eventCatcher.on('page-share-app-message', (e) => {
  console.log('page-share-app-message', e)
})
eventCatcher.on('page-share-timeline', (e) => {
  console.log('page-share-timeline', e)
})
eventCatcher.on('page-add-to-favorites', (e) => {
  console.log('page-add-to-favorites', e)
})
eventCatcher.on('page-tab-item-tap', (e) => {
  console.log('page-tab-item-tap', e)
})
eventCatcher.on('js-error', (e) => {
  console.log('js-error', e)
})
eventCatcher.on('js-unhandled-rejection', (e) => {
  console.log('js-unhandled-rejection', e)
})
eventCatcher.on('memory-warning-on', (e) => {
  console.log('memory-warning-on', e)
})


//获取应用实例
const app = getApp()

App({
  onLaunch: function (obj) {
    console.log(obj);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})