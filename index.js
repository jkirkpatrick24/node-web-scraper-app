var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var URL = 'http://substack.net/images/'

request(URL, (error, response, body) => {
  if (!error) {
    var data = scrape(body);  
    dataToCSV(data);   
  }
});

function scrape(text){
  var data = [];
  var $ = cheerio.load(text);

  $('tr').each(function(i,elem){
    var permissions = $(this).children().first().text();
    var absUrl = URL + $(this).children().last().text();
    var fileType = "dir";
    if (!permissions.includes("d")) {
      fileType = $(this).children().last().text().split('.').pop();
    }
    data[i] = permissions + ',' + absUrl + ',' + fileType;
  });
  return data;
}

function dataToCSV(data){
  fs.writeFile('./data.CSV', data.join('\n'), err => {
    if (err) {
      console.log('error');
    }
    console.log("file was saved");
  });
}


