const request = require('axios');
const {extractListingsFromHTML, sendPushNotification} = require('./helpers');
var stocks = {};
module.exports.stocknotifier = (event, context, callback) => {
     request.get('http://getquote.icicidirect.com/trading_stock_quote.aspx?Symbol=INDCOU')
    	.then(({data}) => {
      		stocks = extractListingsFromHTML(data);
      		return sendPushNotification(stocks);
    	}).then((res) => {
         	callback(null, {stocks});  
    	}).catch(callback);
};
