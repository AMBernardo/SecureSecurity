const accountSid = 'ACe6c2d33e529cf6715b7715f2d8096e64';
const authToken = 'f958ca65e79228d835bb5a38f6301bbb';
const client = require('twilio')(accountSid, authToken);

client.calls
      .create({
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+12093516335',
         from: '+12092922943'
       })
      .then(call => console.log(call.sid))
      .done();