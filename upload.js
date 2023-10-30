const path = require('path')
const ci = require('miniprogram-ci')
var qrcode = require('qrcode-terminal');
const fs = require('fs');


const projectPath = path.join(__dirname, '')
const privateKeyPath = path.join(__dirname, 'private.key')

const qrcodePath = path.join(__dirname, 'wxQrcode.jpg')

console.log("~~~~~~~~~~", privateKeyPath)

const project = new ci.Project({
    appid: 'wx3380876c2d54378f',
    type: 'miniProgram',
    projectPath: projectPath,
    privateKeyPath: privateKeyPath,
    ignores: ['node_modules/**/*'],
  })

// 预览
;(async () => {
    const previewResult = await ci.preview({
        project,
        desc: 'hello111', // 此备注将显示在“小程序助手”开发版列表中
        setting: {
          es6: true,
        },
        qrcodeFormat: 'image',
        qrcodeOutputDest: qrcodePath,
        onProgressUpdate: console.log,
      })
    console.log("~~~~~~~~~预览",previewResult)

    // qrcode.generate(base64str, { small: true })
})()

// 上传
;(async () => {
  const uploadResult = await ci.upload({
    project,
    version: '1.1.1',
    desc: '测试',
    setting: {
      es6: true,
    },
    robot: 1,
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
})()
