
var http = require('http');
var url = require('url');

var mock = require('./mock.json');

var PORT = 9999;
var HEADERS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};

var sendResponse = function(
  response,
  data,
  statusCode = 200,
  headers = HEADERS
) {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var handleRequest = function(request, response) {
  var part = url.parse(request.url);
  var route = mock.routes[part.pathname];

  route
    ? sendResponse(response, route)
    : sendResponse(response, { error: 'Not Found' }, 404);
};

var server = http.createServer(handleRequest);

server.listen(PORT);
