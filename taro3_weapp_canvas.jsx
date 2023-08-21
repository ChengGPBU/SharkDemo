import React, { useEffect, useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'


import './index.scss'

function QRcodeqrcode() {

  useEffect(() => {
    const ctx = Taro.createCanvasContext('image-cropper', getCurrentInstance().page)
    ctx.setFillStyle('red')
    ctx.fillRect(0, 0, 50, 50)
    ctx.draw(false, () => {
      console.log('callback')
    })
  }, [])

  return (
    <View className='qrcode-container'>
      {/* QRCode with value only */}
      <View>
        <View>
          <View>
            <View>
              <View>
                <View>
                  <View>
                    <View>
                      <View>
                        <View>
                          <View>
                            <View>
                              <View>
                                <View>
                                  <View>
                                    <View>
                                      <View>
                                        <View>
                                          <Canvas canvasId='image-cropper' id='image-cropper' style='width:200px;height:200px' />
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default QRcodeqrcode

