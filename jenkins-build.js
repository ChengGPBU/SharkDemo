var fs = require('fs')
var qrcode = require('qrcode-terminal');


const config = {
    user: 'Chengguang',
    token: '11bc91df1247ad6d59477147f9361d704b',
    baseUrl: 'localhost:8080'
}

const url = `http://${config.user}:${config.token}@${config.baseUrl}`

const jenkins = require('jenkins')({url, crumbIssuer: true})

const job_name = 'mini-program-ci'


// jenkins.job.build({
//     name: job_name,
// }, (err, queueId) => {
//     console.log('err', err)
//    console.log('queue item number', queueId)
// })


jenkins.job.get(job_name, (err, data) => {
    if (err) throw err;
  
    const lastBuildNumber = data.lastBuild.number;
    console.log('last build data', `${data.url}/ws/wxQrcode.jpg`);
    // const bf = fs.readFileSync('./wxQrcode.jpg')
    // const str = bf.toString()
    qrcode.generate(`${data.url}/ws/wxQrcode.jpg`, {small: true});

  
    jenkins.build.get(job_name, lastBuildNumber, (err, data) => {
      if (err) throw err;
      console.log('last build result', data.result);
    })
});

