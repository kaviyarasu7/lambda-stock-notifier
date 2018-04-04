const cheerio = require('cheerio');
const moment = require('moment');
const request = require('axios');

function extractListingsFromHTML (html) {
  const $ = cheerio.load(html);
  const htmlData = $('#lastPrice').text().trim();  
  return htmlData;
}

function sendPushNotification(stocks)
{

      var msg = {
		"app_id" : process.env.ONESIGNAL_APP_ID,
		"contents" : {"en": stocks} ,
		"included_segments" : ["All"]
		} ;

		var headers =
			{
            'Content-Type': 'application/json',
            'Authorization': process.env.ONESIGNAL_AUTH_KEY 
        }
        return request.post('https://onesignal.com/api/v1/notifications', msg, {headers})
}


module.exports = {
  extractListingsFromHTML,sendPushNotification
};