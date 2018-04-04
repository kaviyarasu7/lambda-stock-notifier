const request = require('axios');
const {extractListingsFromHTML} = require('./helpers');
var jobs = {};
module.exports.stocknotifier = (event, context, callback) => {
	 request.get('http://getquote.icicidirect.com/trading_stock_quote.aspx?Symbol=ICILOM')
    .then(({data}) => {
      jobs = extractListingsFromHTML(data);
     
      var msg = {
		"app_id" : "36532926-08bb-440a-a357-396cd36a9aa0",
		"contents" : {"en": jobs} ,
		"included_segments" : ["All"]
		} ;

		var headers =
			{
            'Content-Type': 'application/json',
            'Authorization': 'Basic Y2VlNTFmOTAtNGUzYy00Mzc5LWIxZDctOTQwNTI5ZDdhZTQz' 
        }
        console.log(jobs);
        return request.post('https://onesignal.com/api/v1/notifications', msg, {headers})
    }).then((res) => {
    	 callback(null, {jobs});	
    })
    .catch(callback);
};
