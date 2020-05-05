//Install express server
const express = require('express');
const path = require('path');
var proxy = require('express-http-proxy');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/xinhuaxin'));

app.use('/', proxy('https://bluebit.com.cn/', {
  limit: '50mb',
  filter: function(req, res) {
    return req.method == 'POST';
  }
}));

app.use('/ycmj', proxy('https://bluebit.com.cn/', {
  limit: '50mb',
  proxyReqPathResolver: function (req) {
   return '/ycmj' + req.url;
  }
}));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/xinhuaxin/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8089);
