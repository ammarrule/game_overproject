//INITIALIZATION//
//express//
const express = require('express');
const app = express();
//HTTP//HTTPS//
const http = require('http');
const https = require('https');
//cheerio and request//
let request = require('request'),
cheerio = require('cheerio')
//body-parser//
let bodyParser = require('body-parser');
//twit//
let Twit = require('twit');
//socket.io// instead of express server in order to use sockets//
var server = app.listen(8080, () => {
	console.log('Server Started on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});


var io = require('socket.io')(server);
 io.on('connection', function (socket) {
   socket.on('tweetStream', function (data) {
     let T = new Twit({
        consumer_key: 'msMLEc6OE2h0Wj35EHRdhexQP',
        consumer_secret: 'u4AJex1lSuAreL1hv0qY0XRTtzgqR6n6x03E9N0ctZ4cmqnLlr',
        access_token: '623509496-Koh2SdJSRmbtopneTkn5zWrQTe5JNK8dlp2H9xlj',
        access_token_secret: 'Vo9LFNgiwYq2qWtXTMxUji7FeMMvEqAs5p8z19xhYXijI'
    })
    let trackFilter
    if(data.system === 'ps4'){
        trackFilter = 'playstation, psn'
    } else {
        trackFilter = 'xbox1, xboxone'
    }
    var stream = T.stream('statuses/filter', { track: trackFilter, language: 'en'}) 
        let resultTweets = [];
    stream.on('tweet', function (tweet) {
             
        socket.emit(data.system, tweet)
        console.log(tweet)
    })  
  });
}); 

//to allow front end access//
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//===========================================================================================================================//
                                    //GIANT BOMB API & REQUEST WEBSCRAPE WITH CHEERIO//GET REQUEST//
//GIANT BOMB API KEY:361fdf6d04025778cd333e5084da642fa0752982//

app.get('/search/:textvalue', function(req, res){
    let exchange = req.params.textvalue.replace(" ", "%20")
    
    request('http://www.giantbomb.com/api/search/?api_key=361fdf6d04025778cd333e5084da642fa0752982&format=json&query="'+exchange+'"&limit=1&resources=game&user_agent=ammarrule', {"headers":{"user-agent":"ammarrule"}}, function(err,response,body){
        let actual_info = JSON.parse(body).results;
        //If no results, send back error and return        
        if (actual_info.length === 0){
            res.json({err: "no results"})
            console.log(err)
            return;
        }        

        let exchangeRating = actual_info[0].name. replace(" ", "-")
        request("http://www.gamespot.com/"+exchangeRating+"/", function(error, response, body){
            if(!error){
            let $ = cheerio.load(body);
            let gsRating = $('div.gs-score__cell > span').text()     
                request("http://www.gamespot.com/"+exchangeRating+"/", function(error, response, body){
                    if(!error){
                        let $ = cheerio.load(body);
                        let metaRating = $('dl.reviewObject__metacritic > dd > a' ).text();
                        request("http://www.gamespot.com/"+exchangeRating+"/", function(error, response, body){
                            if(!error){
                            let $ = cheerio.load(body);
                            let price = $('div.amazon__links-item > span.amazon__price--used').text()
                             request("http://www.gamespot.com/"+exchangeRating+"/", function(error, response, body){
                                if(!error){
                                let $ = cheerio.load(body);
                                let priceLink = $('dd.buy-offer__buynow > a').attr('href')
                                        res.json({
                                        name:actual_info[0].name,
                                        deck:actual_info[0].deck,
                                        image:actual_info[0].image.super_url, 
                                        metaRating: metaRating,
                                        gsRating: gsRating,
                                        price: price,
                                        priceLink: priceLink                                        
                                    })
                                }
                            })
                            }
                        })                   
                     
                    }                    
                })    
            }
        })           
    })   
})   
//=====================================================================================================================================//
                                                    //NEWS API//
//NEWSAPI API KEY: 4cb890df1fe2460f9d820b744ccb660d//
app.get('/news/', function(req, res){
    request('https://newsapi.org/v1/articles?source=ign&sortBy=latest&apiKey=4cb890df1fe2460f9d820b744ccb660d', function(err, response,body){
        let parsed_news = JSON.parse(body);
        let news_feed = parsed_news.articles
        let newsArray = [];
        for(let i = 0; i < news_feed.length; i++){            
            newsArray.push(news_feed[i])            
        }
        res.json({
            newsArray:newsArray 
        })       
    })
})
//========================================================================================================================================//
                                                    //TWITTER API//
//TWITTER API KEY: 	msMLEc6OE2h0Wj35EHRdhexQP//
// app.get('/graphs/:system', function(req, res){
//     console.log(req.params.system)
//     let T = new Twit({
//         consumer_key: 'msMLEc6OE2h0Wj35EHRdhexQP',
//         consumer_secret: 'u4AJex1lSuAreL1hv0qY0XRTtzgqR6n6x03E9N0ctZ4cmqnLlr',
//         access_token: '623509496-Koh2SdJSRmbtopneTkn5zWrQTe5JNK8dlp2H9xlj',
//         access_token_secret: 'Vo9LFNgiwYq2qWtXTMxUji7FeMMvEqAs5p8z19xhYXijI'
//     })
//     let trackFilter
//     if(req.params.system === 'ps4'){
//         trackFilter = 'playstation, psn'
//     } else {
//         trackFilter = 'xbox1, xboxone'
//     }
//     console.log(trackFilter)
//     var stream = T.stream('statuses/filter', { track: trackFilter, language: 'en'}) 
//         let resultTweets = [];
//     stream.on('tweet', function (tweet) {
//         resultTweets.push(tweet);        
//         console.log(resultTweets)
//         res.json(resultTweets)
//     })  
// })
    

//====================================================================================================================================//
                                                    //GET REQUEST//



   

//=====================================================================================================================================//
                                                //EXPRESS SERVER//
