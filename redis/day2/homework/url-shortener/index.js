var express = require('express');
var app = express();
var redis = require("redis"),
    client = redis.createClient({'host':'localhost', 'port':6379});
var shortid = require('shortid');

app.post('/', function (req, res) {
  var url = req.query.url;
  var key = shortid.generate();

  client.set([key, url], function (redisErr, redisRes) {
    if (redisErr)
      throw Error(redisErr);

    res.send('URL ['+url+'] saved as ['+key+']');
  });
});

app.get('/:urlkey', function (req, res) {
  var urlKey = req.params.urlkey;

  client.get(urlKey, function (redisErr, url) {
    if (redisErr)
      throw Error(redisErr);

      res.redirect(url);
  });
});

app.listen(3000, function () {
  console.log('Url shortener app listening on port 3000!');
});
