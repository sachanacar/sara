var express = require('express');
var router = express.Router();
var Spark = require('csco-spark');
var spark = Spark({
  uri: 'https://api.ciscospark.com/v1',
  token: ''
});
/* GET home page. */
router.get('/', function(req, res, next) {
  spark.sendMessage({
    roomId:'',
    files: 'https://github.com/miradaa/icon/blob/master/message11.png?raw=true'
  }).then((res) => {
    /*Store the res data?*/
  });
});

module.exports = router;
