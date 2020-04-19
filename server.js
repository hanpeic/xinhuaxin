//Install express server
const express = require('express');
const path = require('path');
var proxy = require('express-http-proxy');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/xinhuaxin'));

app.use('/', proxy('http://180.158.5.40:8089', {
  filter: function(req, res) {
    return req.method == 'POST';
  }
}));

app.get('/*', function(req,res) {

  res.sendFile(path.join(__dirname+'/dist/xinhuaxin/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
