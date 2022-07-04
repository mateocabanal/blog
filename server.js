"use strict";
exports.__esModule = true;
var express_1 = require("express");
var next = require("next");
var dev = process.env.NODE_ENV !== "production";
var port = dev ? 3001 : parseInt(process.env.PORT, 10) || 3000;
var app = next({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
  var server = (0, express_1["default"])();
  server.all("*", function (req, res) {
    return handle(req, res);
  });
  server.listen(port, function () {
    console.log("> Ready on http://localhost:".concat(port));
  });
});
