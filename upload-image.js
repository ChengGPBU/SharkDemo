const Minio = require('minio')
const fs = require('fs')
const path = require('path')


const minioClient = new Minio.Client({
    endPoint: '47.110.42.63',
    port: 9000,
    useSSL: false,
    accessKey: 'chengguang',
    secretKey: 'cg123456'
});


const metaData = {
    'Content-Type': 'application/octet-stream',
}
const targetAssetsPath = path.join(__dirname, './images')


function uploadImage(imageName, fullPath) {
    // Put a file in bucket my-bucketname.
    minioClient.fPutObject('kfc-test', imageName, fullPath, metaData, function(e) {
    if (e) {
        return console.log(e)
    }
    console.log(`${imageName}---upload success!!!`)
    })
}

function checkPictureName(suffixName){
    const verifyImg = /.(jpg|jpeg|gif|bmp|png)$/i
    if(verifyImg.test(suffixName)){ 
        return true
    } else {
        return false;
    }
}


function readImageList(dir) {
    const files = fs.readdirSync(dir)
    files.forEach((item, index) => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        readImageList(path.join(dir, item)) //递归读取文件
      } else {
        const pathArr = fullPath.split('images/')
        const imageName = `images/${pathArr[1]}`
        if(checkPictureName(imageName)) {
            uploadImage(imageName, fullPath)
        }
      }
    })
}


// readImageList(targetAssetsPath)


uploadImage('share11.png', path.join(__dirname, 'share-11.png'))

