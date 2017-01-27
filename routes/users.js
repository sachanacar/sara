var express = require('express');
var router = express.Router();
var Spark = require('csco-spark');
var spark = Spark({
  uri: 'https://api.ciscospark.com/v1',
  token: ''
});
/* GET users listing. */
router.get('/', function(req, res, next) {
// Getting Spark Rooms

});

module.exports = router;
