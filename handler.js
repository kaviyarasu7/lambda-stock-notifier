const request = require('axios');
const {
    extractListingsFromHTML,
    sendPushNotification,
    getAllStockData
} = require('./helpers');
var stocks = [];
var stocksWatchList = [];
var stocksListAPI = 'https://script.google.com/macros/s/AKfycbwxBcQ-BlbpTP_hUzZXnXJvcNTRnf8Whyt8eKHE4Chtl1P4MsLr/exec';
module.exports.stocknotifier = (event, context, callback) => {
    request.get(stocksListAPI).then(response => {
        stocksWatchList = response.data.records;
        return getAllStockData(stocksWatchList)
    }).then(promises => {
        return request.all(promises).then(request.spread((...args) => {
            for (let i = 0; i < args.length; i++) {
                stocks[i] = extractListingsFromHTML(args[i].data, stocksWatchList[i]);
            }
        }))
    }).then(response => {
        callback(null, stocks)
    }).catch(error => {
        console.log(error);
    });
};