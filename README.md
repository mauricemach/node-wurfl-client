# node-wurfl-client
Simple client for WURFL's (mobile devices database) HTTP API.

## Installing

    $ npm install wurfl-client

## Using

    var wurfl = require('wurfl-client')

    /*
      Point to your WURFL installation here.
      Other options:
        path - default: '/Tera-Wurfl/webservice.php'
        port - default: 80
    */
    wurfl.host = 'wurfl.mydomain.com'

    var ua = 'Mozilla/5.0 (Linux; U; Android 2.2; en-us; Nexus One Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
    var fields = ['brand_name', 'model_name', 'resolution_width', 'resolution_height']

    wurfl.query(ua, fields, function(err, data) {
      if(err && err.length > 0) puts(inspect(err))
      else puts(inspect(data))
    });

Expected output:

    { brand_name: 'Google',
      model_name: 'Nexus One',
      resolution_width: 480,
      resolution_height: 800 }
