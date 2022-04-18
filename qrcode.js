
const fs = require('fs');
const Jimp = require("jimp");
const QrCode = require("qrcode-reader");
var qrcode = require('qrcode-terminal');

const buffer = fs.readFileSync(__dirname + '/wxQrcode.jpg');

Jimp.read(buffer, function(err, image) {
    if (err) {
        console.error(err);
        // TODO handle error
    }
    var qr = new QrCode();
    qr.callback = function(err, value) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
        console.log("~~~~~~~~~~解析图片",value);
        qrcode.generate(value.result, {small: true});
    };
   qr.decode(image.bitmap);
});