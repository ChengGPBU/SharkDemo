const requestWhitelist = [
    'https://bs2.yumchina.com/logan/2.0/upload',
    'https://tbs2.yumchina.com/logan/2.0/upload',
    'https://trackingprd.hwwt8.com/g/w', // h5
    'https://trackingprd.hwwt8.com/g/a', // weapp
    'https://trackingprd.hwwt8.com/g/ali' // alipay
]

export const isWhilelist = (url) => {
    return requestWhitelist.indexOf(url) > -1
}
