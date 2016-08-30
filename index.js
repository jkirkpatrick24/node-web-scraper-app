var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var URL = 'http://substack.net/images/'

request(URL, (error, response, body) => {
  if (!error && response.statusCode == 200) {
    
    var $ = cheerio.load(body);
    var data = [];

    $('tr').each(function(i,elem){
      var permissions = $(this).children().first().text();
      var absUrl = URL + $(this).children().last().text();
      var fileType = "dir";
      if (!permissions.includes("d")) {
        fileType = $(this).children().last().text().split('.').pop();
      }
      data[i] = permissions + ',' + absUrl + ',' + fileType;
    })
    

    fs.writeFile('./data.CSV', data.join('\n'), err => {
      if (err) {
        return console.log(err);
      }
      console.log("file was saved")
    });
  }
})

