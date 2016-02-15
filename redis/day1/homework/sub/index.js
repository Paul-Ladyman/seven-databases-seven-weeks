var redis = require("redis"),
    client = redis.createClient({'host':'localhost', 'port':6379});

function subscribe() {
  client.brpop(['chat', 0], function (err, res) {
    if (err)
      throw Error(err);

    console.log(res);
    subscribe();
  });
}

client.on("error", function (err) {
    console.log("Error " + err);
});

subscribe();
