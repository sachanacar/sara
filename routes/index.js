var express = require('express');
var router = express.Router();
const ciscospark = require(`ciscospark`);
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
    return ciscospark.messages.create({
      text: 'Hey '+person.displayName.split(' ')[0]+'! How are you?',
      roomId: m.roomId
    });
  });
}
function getMsg(message){
  return ciscospark.messages.get(message.id);
}

function getMsgText(message){
  var text = message.text.split('Sara')[1];
  return text;
}
module.exports = router;
