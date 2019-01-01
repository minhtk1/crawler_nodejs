const cheerio = require('cheerio');
var iconv = require("iconv-lite");
var requestl = require("request");
var request = requestl.defaults({ jar: true });
var http = require("http");

module.exports = class CrawlGoogle {
    static getDataVideo(url){
        return new Promise((resolve, reject) =>{
            // request("http://www.phimmoi.net?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" , function (error, response, html) {
            //     console.log(html);
            //     var $ = cheerio.load(html);
            //     $("a").filter(function (i, el){
            //         var href = $(this).attr("href");
            //         console.log(href);
            //     });
                
            // });
            var data = {
                urlName: url
            };

            request({
                method: 'POST',
                url: 'http://127.0.0.1:5000/getHtml',
                // body: '{"foo": "bar"}'
                json: data
            }, (error, response, body) => {
                if(!error){
                    if(response.statusCode === 201){
                        var $ = cheerio.load(body.data);
                        $("a").filter(function (i, el) {
                            var href = $(this).attr("href");
                            console.log(href);
                        });
                    }
                }
            });
            resolve(false);
        });
    }
}