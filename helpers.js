const cheerio = require('cheerio');
const moment = require('moment');
const request = require('axios');
const _ = require('lodash');

cheerioTableparser = require('cheerio-tableparser');

function extractListingsFromHTML (html) {
  const $ = cheerio.load(html);
  cheerioTableparser($);
  htmlData = $("#NewHide table").parsetable(true, false, false);
  var cleaned = _.each(htmlData, o => _.each(o, (v, k) => o[k] = v.trim()))
  //const htmlData = $('#NewHide tr:nth-child(2) td:nth-child(2)').text().trim();  
  return cleaned;
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

function getAllStockData(stocksList)
{
  var promises = [];
  stocksList.forEach(function(singleElement){
    myUrl = singleElement.ICICILINK;
    //console.log(myUrl)
    promises.push(request.get(myUrl))
  });
  return promises;
}


function getAllStockDataParse(promises)
{

}


module.exports = {
  extractListingsFromHTML, sendPushNotification, getAllStockData, getAllStockDataParse
};