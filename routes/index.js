var express = require('express');
var request = require('request');
var rp = require('request-promise');

var EventEmitter = require("events").EventEmitter;
var news = new EventEmitter();

var fs = require("fs");
const ciscospark = require(`ciscospark`);

var router = express.Router();

const FRIENDS = "./routes/friends.json";
var object = {};

router.post('/bot', function(req, res, next) {
  if (req.body.data.personEmail != 'sara@sparkbot.io'){
    var data = req.body.data;
    getMsg(data).then(function(m) {
      text = getMsgText(m);
      if(text.includes('here')){
        welcome(m);
      }
    });
  }
});

function welcome(m){
  ciscospark.people.get(m.personId).then(function(person) {
    object.friend = contactFriend();
    object.person = person;
    object.message = m;
    getNews(object);
  });
}

function getMsg(message){
  return ciscospark.messages.get(message.id);
}

function getMsgText(message){
  var text = message.text.split('Sara')[1];
  return text;
}

function contactFriend(){
  var friends = fs.readFileSync(FRIENDS);
  var friends = JSON.parse(friends);
  var number = getRandomInt(0, friends.length);
  return friends[number];
}
function getNews(object){
  request('https://newsapi.org/v1/articles?source=techcrunch&sortBy=top&apiKey=da5b1aff6a724eafb5e02e5fa03285d7', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      object.article = body.articles[0];
      sendMessage(object);
    }
  })
}
function sendMessage(object){
  console.log(object);
  return ciscospark.messages.create({
    html: 'Good morning '+object.person.firstName+'! Here\'s your daily digest:<br /><br />'+
          '<ol>'+
          '<li>'+'Read this article about '+'<a href="'+object.article.url+'">'+object.article.title+'</a>'+'</li>'+
          '<li>'+'Contact your friend <a href="mailto:'+object.friend.email+'">' + object.friend.name +'</a>'+'</li>'+
          '<li>'+'Contact your Cisco friend <a href="'+'name@cisco.com'+'">' + 'Mitchell Weijerman' +'</a>'+'</li>'+

          '</ol>',
    roomId: object.message.roomId
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
module.exports = router;
