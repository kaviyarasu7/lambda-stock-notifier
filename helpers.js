const cheerio = require('cheerio');
const moment = require('moment');

function extractListingsFromHTML (html) {
  const $ = cheerio.load(html);
  const htmlData = $('#NewHide tr:nth-child(2) td:nth-child(2)').text().trim();  
  return htmlData;
}

module.exports = {
  extractListingsFromHTML
};