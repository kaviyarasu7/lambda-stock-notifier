const cheerio = require('cheerio');
const moment = require('moment');
const request = require('axios');

function extractListingsFromHTML (html) {
  const $ = cheerio.load(html);
  const htmlData = $('#NewHide tr:nth-child(2) td:nth-child(2)').text().trim();  
  return htmlData;
}

function sendPushNotification(stocks)
{

      var msg = {
		"app_id" : "36532926-08bb-440a-a357-396cd36a9aa0",
		"contents" : {"en": stocks} ,
		"included_segments" : ["All"]
		} ;

		var headers =
			{
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2VlNTFmOTAtNGUzYy00Mzc5LWIxZDctOTQwNTI5ZDdhZTQz' 
        }
        return request.post('https://onesignal.com/api/v1/notifications', msg, {headers})
}


module.exports = {
  extractListingsFromHTML,sendPushNotification
};