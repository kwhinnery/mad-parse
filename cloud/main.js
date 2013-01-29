var twilio = require('twilio'),
    cloudConfig = require('cloud/cloudConfig');

//Initialize the Twilio cloud module
twilio.initialize(cloudConfig.accountSid, cloudConfig.authToken);

//Define a cloud function to send an SMS
Parse.Cloud.define('sendLink', function(request, response) {
    //format phone number
    var n = request.params.phoneNumber.replace(/[^\d.]/g, '');
    if (request.params.phoneNumber.indexOf('+') === 0) {
        n = '+'+n;
    }

    twilio.sendSMS({
        From: cloudConfig.from, //a twilio number you control
        To: n,
        Body: cloudConfig.message + cloudConfig.downloadLink
    }, {
        success: function(httpResponse) {
            console.log(httpResponse);
            response.success('Link is on the way to your phone!');
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error('There was a problem sending the link - please check your phone number and try again.');
        }
    });
});
