const cheerio = require('cheerio');
const moment = require('moment');
const request = require('axios');
const _ = require('lodash');

cheerioTableparser = require('cheerio-tableparser');

function extractListingsFromHTML (html,stockWatchList) {
  const $ = cheerio.load(html);
  cheerioTableparser($);
  htmlData = $("#NewHide table").parsetable(true, false, false);
  var cleaned = _.each(htmlData, o => _.each(o, (v, k) => o[k] = v.trim()));
  var cleanedSpace = _.each(cleaned, o => _.each(o, (v, k) => o[k] = v.replace(/ /g,"_")));
  var readableData = {"code":stockWatchList.NSEStockCode,"LAST_TRADE_PRICE_NSE":cleanedSpace[1][1],"LAST_TRADE_PRICE_BSE":cleanedSpace[2][1]};
  
  
  var condition = parseFloat(cleanedSpace[1][1])+" "+stockWatchList.Condition+" "+parseFloat(stockWatchList.Value);
  if (eval(condition)) {
    sendPushNotification(condition);
    console.log("pass",condition);
  } else {
    console.log("fail",condition);
  }
  return readableData;
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
    promises.push(request.get(myUrl))
  });
  return promises;
}

module.exports = {
  extractListingsFromHTML, sendPushNotification, getAllStockData
};