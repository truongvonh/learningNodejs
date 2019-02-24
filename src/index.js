var http = require('http');
var url = require('url');

const PORT = '8080';

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  // get ip address
  // const ipAddress = res.socket.remoteAddress;
  // res.write(ipAddress)
  // using query string url
  var query = url.parse(req.url, true).query;
  var txt = query.year + " " + query.month;
  res.write(`server is ruung and ${PORT}` );
  res.end();
}).listen(PORT);