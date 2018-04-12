const request = require('axios');
const {extractListingsFromHTML, sendPushNotification, getAllStockData, getAllStockDataParse} = require('./helpers');
var stocks = [];
var stocksList = [];
var stocksListData = {};
var stocksListURL = 'https://script.google.com/macros/s/AKfycbwxBcQ-BlbpTP_hUzZXnXJvcNTRnf8Whyt8eKHE4Chtl1P4MsLr/exec';
module.exports.stocknotifier = (event, context, callback) => {
    request.get(stocksListURL).then(response => {
    		console.log(response.data.records.NSEStockCode);
  			return getAllStockData(response.data.records)
  	}).then( promises => {
  			return request.all(promises).then(request.spread((...args) => {
        		for (let i = 0; i < args.length; i++) {
            		stocks[i] = extractListingsFromHTML(args[i].data);
        		}
  			}))
    }).then( response => {
    		callback(null,{stocks})
  	}).catch(error => {
     			console.log(error);
  	});
};

