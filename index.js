//"use strict";
var express = require('express');
var path = require('path');
var fs = require('fs');
var helpers = require('./helpers.js');
var mime = require('mime-types')

var app = express();

var app_root = path.resolve(".");
var listen_port = 3000;
var defaults_dir = app_root + '/resources/defaults';
var bundles_dir = app_root + '/resources/bundles';
var content_type_json = 'application/json';

// GET /api/bundles - List the names of bundles.
app.get('/api/bundles', function (req, res) {
  var dirs = [];

  fs.readdirSync(bundles_dir).forEach(function(value){
    var item_path = bundles_dir + "/" + value;
    if(fs.statSync(item_path).isDirectory()){
      dirs.push(path.basename(item_path));
    }
  });

  res.contentType = content_type_json;
  res.send(JSON.stringify(dirs));
})

// GET /api/bundles/{bundle_name} - List the items in a bundle.
app.get('/api/bundles/:bundle_name', function (req, res) {
  var files = [];

  // clean inputs
  var bundle_name = helpers.removeRiskyChars(req.params.bundle_name);

  var bundle_dir = bundles_dir + "/" + bundle_name;

  fs.readdirSync(bundle_dir).forEach(function(value){
    var item_path = bundle_dir + "/" + value;
    if(fs.statSync(item_path).isFile()){
      files.push(path.basename(item_path));
    }
  });

  res.contentType = content_type_json;
  res.send(JSON.stringify(files));
})

// GET /api/bundles/{bundle_name}/{item_name} - Get the item image.
app.get('/api/bundles/:bundle_name/:item_name', function (req, res) {
  var files = [];

  console.log(req.ip + " - " + req.url);

  // clean inputs
  var bundle_name = helpers.removeRiskyChars(req.params.bundle_name);
  var item_name = helpers.removeRiskyChars(req.params.item_name);

  var item_path = bundles_dir + "/" + bundle_name + "/" + item_name;

  var content = fs.readFileSync(item_path);

  // HACK: alter headers o show in browser rather than starting a download.
  res.set("Content-Disposition", "inline;");
  res.set("Content-Type", "image/png;");
  res.send(content);
})

app.get('/api/defaults/placeholder', function (req, res) {
  var placeholder_path = defaults_dir + "/" + "placeholder.png";
  var content = fs.readFileSync(placeholder_path);
  res.set("Content-Disposition", "inline;");
  res.set("Content-Type", "image/png;");
  res.send(content);
})

app.use(express.static('public'));

app.listen(listen_port, function () {
  console.log('listening on port ' + listen_port + '.');
})