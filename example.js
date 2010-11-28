var inspect = require('sys').inspect
var puts = console.log

var wurfl = require('wurfl-client')

/*
  Point to your WURFL installation here.
  Other options:
    path - default: '/Tera-Wurfl/webservice.php'
    port - default: 80
*/
//wurfl.host = 'wurfl.mydomain.com'

//var ua = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_3 like Mac OS X; xx-xx) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7E18 Safari/528.16'
var ua = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
var fields = ['brand_name', 'model_name', 'resolution_width', 'resolution_height']

wurfl.query(ua, fields, function(err, data) {
  if(err && err.length > 0) puts(inspect(err))
  else puts(inspect(data))
});
