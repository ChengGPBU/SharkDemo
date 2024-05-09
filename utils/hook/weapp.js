import EventEmitter from './events'
import uuidv4 from './uuid'
import { getErrorResponse, delObjByKey, getCurrentPageUrl } from '../util'
import { isWhilelist } from './whilelist'

/**
 * 事件定义
 * app-launch
 * app-show
 * app-hide
 * page-load
 * page-show
 * page-ready
 * page-hide
 * page-unload
 * request-send
 * request-success
 * request-error
 * js-error
 */
const eventCatcher = new EventEmitter()


const storage = {
  removeStorageSync: wx.removeStorageSync,
  setStorageSync: wx.setStorageSync,
  getStorageSync: wx.getStorageSync
}

const originRequest = wx.request

// 报错信息最大存储3k一条
const MAXSIZE = 3000

// 生命周期拦截器
;(() => {
  const appBak = App
  const pageBak = Page
  const componentBak = Component

  function resetFn() {
    // 原始对象
    const e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    // 方法名
    const t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ''
    // 被注入的新方法
    const n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function () {}
    // 原始方法
    const a = e[t]
    // 未设置分享页面取消分享监听
    if(t === 'onShareAppMessage' && !e[t]) return  
    // 未设置分享朋友圈的取消分享朋友圈监听
    if(t === 'onShareTimeline' && !e[t]) return  
    // 修改原始方法和新注入方法参数
    e[t] = function (e) {
      const ret = a && a.call(this, e)
      n.call(this, e)
      return ret
    }
  }

  App = function (option) {
    const proxy = {
      onLaunch: function (e) {
        // console.log("proxy onLaunch",e)
        this.uuid = uuidv4()
        eventCatcher.emit(
          'app-launch',
          {
            sid: this.uuid,
            path: e.path,
            query: e.query,
            scene: e.scene
          },
          this,
          e
        )
      },
      onShow: function (e) {
        eventCatcher.emit(
          'app-show',
          {
            sid: this.uuid,
            path: e.path,
            query: e.query,
            scene: e.scene
          },
          this,
          e
        )
      },
      onHide: function (e) {
        eventCatcher.emit(
          'app-hide',
          {
            sid: this.uuid
          },
          this,
          e
        )
      },
      onPageNotFound: function (e) {
        eventCatcher.emit(
          'app-page-not-found',
          {
            sid: this.uuid
          },
          this,
          e
        )
      }
    }
    Object.keys(proxy).forEach((methodName) => {
      resetFn(option, methodName, proxy[methodName])
    })
    appBak(option)
  }
  Page = function (e) {
    const t = {
      onLoad: function (e) {
        this.uuid = uuidv4()
        eventCatcher.emit(
          'page-load',
          {
            u: this.route,
            sid: this.uuid,
            query: delObjByKey(e, ['__key_'])
          },
          this,
          e
        )
      },
      onShow: function (e) {
        eventCatcher.emit(
          'page-show',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onReady: function (e) {
        eventCatcher.emit(
          'page-ready',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onHide: function (e) {
        eventCatcher.emit(
          'page-hide',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onUnload: function (e) {
        eventCatcher.emit(
          'page-unload',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onPullDownRefresh: function (e) {
        eventCatcher.emit(
          'page-pull-down-refresh',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onShareAppMessage: function (e) {
        eventCatcher.emit(
          'page-share-app-message',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onShareTimeline: function (e) {
        eventCatcher.emit(
          'page-share-timeline',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onAddToFavorites: function (e) {
        eventCatcher.emit(
          'page-add-to-favorites',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onTabItemTap: function (e) {
        eventCatcher.emit(
          'page-tab-item-tap',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      }
    }
    Object.keys(t).forEach(function (n) {
      resetFn(e, n, t[n])
    })
    pageBak(e)
  }
  Component = function (option) {
    const proxy = {
      onLoad: function (e) {
        this.uuid = uuidv4()
        eventCatcher.emit(
          'page-load',
          {
            u: this.route,
            sid: this.uuid,
            query: delObjByKey(e, ['__key_'])
          },
          this,
          e
        )
      },
      onShow: function (e) {
        eventCatcher.emit(
          'page-show',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onReady: function (e) {
        eventCatcher.emit(
          'page-ready',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onHide: function (e) {
        eventCatcher.emit(
          'page-hide',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onUnload: function (e) {
        eventCatcher.emit(
          'page-unload',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onPullDownRefresh: function (e) {
        eventCatcher.emit(
          'page-pull-down-refresh',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onShareAppMessage: function (e) {
        eventCatcher.emit(
          'page-share-app-message',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onShareTimeline: function (e) {
        eventCatcher.emit(
          'page-share-timeline',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onAddToFavorites: function (e) {
        eventCatcher.emit(
          'page-add-to-favorites',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      },
      onTabItemTap: function (e) {
        eventCatcher.emit(
          'page-tab-item-tap',
          {
            u: this.route,
            sid: this.uuid
          },
          this,
          e
        )
      }
    }
    // console.log(option)
    Object.keys(proxy).forEach((methodName) => {
      resetFn(option.methods, methodName, proxy[methodName])
    })
    componentBak(option)
  }
})()

// 请求拦截器
;(() => {
  Object.defineProperty(wx, 'request', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function () {
      const config = arguments[0] || {}
      const time = new Date().getTime()
      const uuid = uuidv4()
      // 上报路由信息
      const page = getCurrentPageUrl()
      const Whilelist = isWhilelist(config.url)
      eventCatcher.emit(
        'request-send',
        {
          u: config.url,
          h: JSON.stringify(config.header),
          c: !Whilelist ? config.data : '',
          sid: uuid,
          page: page
        },
        config
      )
      const originComplete = config.complete
      config.complete = (res) => {
        if (res.errMsg === 'request:ok') {
          // response 
          const _response = JSON.stringify(getErrorResponse(res && res.data))
          const option = {
            u: config.url,
            h: JSON.stringify(res.header),
            sid: uuid,
            sc: res.statusCode,
            msg: res.errMsg,
            page: page,
            duration: time ? new Date().getTime() - time : -1
          }
          if(_response === '{}') option.response = ''
          else option.response = _response
          eventCatcher.emit(
            'request-success',
            option,
            res
          )
        } else {
          eventCatcher.emit(
            'request-fail',
            {
              u: config.url,
              sid: uuid,
              msg: res.errMsg,
              page: page,
              duration: time ? new Date().getTime() - time : -1
            },
            res
          )
        }
        originComplete && originComplete(res)
        config.complete = originComplete
      }

      return originRequest.apply(this, arguments)
    }
  })

  // RequestTask.onHeadersReceived
})()

// JS报错监听
;(() => {
  wx.onError(function (e) {
    const uuid = uuidv4()
    // 上报路由信息
    const page = getCurrentPageUrl()
    eventCatcher.emit('js-error', { m: e.substring(0,MAXSIZE), sid: uuid, page: page }, e)
  })

  // 兼容低版本不支持wx.onUnhandledRejection
  if (wx.onUnhandledRejection) {
    wx.onUnhandledRejection(function (e) {
      const uuid = uuidv4()
      let eString = ''
      if (Object.prototype.toString.call(e.reason) === '[object Error]')
        eString = e.reason ? e.reason.toString().substring(0, MAXSIZE) : undefined
      else
        eString = e.reason ? JSON.stringify(e.reason).substring(0, MAXSIZE) : undefined
      // 上报路由信息
      const page = getCurrentPageUrl()
      eventCatcher.emit(
        'js-unhandled-rejection',
        {
          m: eString,
          sid: uuid,
          page: page
        },
        e
      )
    })
  }
})()

// 监听内存不足告警事件
;(() => {
  if (wx.onMemoryWarning) {
    wx.onMemoryWarning(function (e) {
      const uuid = uuidv4()
      // 上报路由信息
      const page = getCurrentPageUrl()
      eventCatcher.emit('memory-warning-on', { m: e, sid: uuid, page: page }, e)
    })
  }
})()

// 网络状态监听事件
;(() => {
  if (wx.getNetworkType) {
    wx.getNetworkType({
      success: (res) => {
        //  WIFI / 2G / 3G / 4G / 5G / WWAN
        const { networkType } = res
        eventCatcher.emit('network-type', { netSignal: networkType })
      }
    })
  }
  if (wx.onNetworkStatusChange) {
    wx.onNetworkStatusChange((res) => {
      const { networkType } = res
      eventCatcher.emit('network-status-change-on', { netSignal: networkType })
    })
  }
})()

export { eventCatcher, storage, originRequest }
