var redis = require("redis"),
    client = redis.createClient({'host':'localhost', 'port':6379});

client.on("error", function (err) {
    console.log("Error " + err);
});

client.brpop(['chat', 300], function (err, res) {
  if (err)
    throw Error(err);

  console.log(res);
});
