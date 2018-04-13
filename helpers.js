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
    sendPushNotification(stockWatchList.NSEStockCode+"-LTP:"+cleanedSpace[1][1]+stockWatchList.Condition+"YOURS:"+parseFloat(stockWatchList.Value));
  } else {
    // do nothing
  }
  return readableData;
}

function sendPushNotification(message)
{

      var msg = {
		"app_id" : process.env.ONESIGNAL_APP_ID,
		"contents" : {"en": message} ,
    "url" : "https://kaviyarasu7.github.io/lambda-stock-notifier",
    "chrome_web_image": "https://dummyimage.com/400x200/000/fff&text="+message,
    "headings": {"en": "NSE and BSE Stock Notifier"},
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