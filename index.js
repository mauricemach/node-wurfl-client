(function() {
  var http, inspect, puts, urlencode;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  puts = console.log;
  inspect = require('sys').inspect;
  http = require('http');
  urlencode = function(str) {
    str = (str + '').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
  };
  this.version = '0.0.1';
  this.host = 'www.tera-wurfl.com';
  this.port = 80;
  this.path = '/Tera-Wurfl/webservice.php';
  this.query = __bind(function(ua, fields, callback) {
    var request, wurfl;
    ua = urlencode(ua);
    fields = fields.join('|');
    wurfl = http.createClient(this.port, this.host);
    request = wurfl.request('GET', "" + this.path + "?ua=" + ua + "&search=" + fields + "&format=json", {
      'host': this.host
    });
    request.end();
    return request.on('response', function(response) {
      var data;
      if (response.statusCode !== 200) {
        return callback([
          {
            'Expected response with status code HTTP 200 OK, got: ': response.statusCode
          }
        ], null);
      } else {
        response.setEncoding('utf8');
        data = '';
        response.on('data', function(chunk) {
          return data += chunk;
        });
        return response.on('end', function() {
          try {
            data = JSON.parse(data);
            return callback(data.errors, data.capabilities);
          } catch (e) {
            return callback([
              {
                'Error parsing response as JSON': e
              }
            ], null);
          }
        });
      }
    });
  }, this);
}).call(this);
