puts = console.log
inspect = require('sys').inspect
http = require 'http'

urlencode = (str) ->
	str = (str+'').toString()
	encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')

@version = '0.0.1'
@host = 'www.tera-wurfl.com'
@port = 80
@path = '/Tera-Wurfl/webservice.php'

@query = (ua, fields, callback) =>
  ua = urlencode(ua)
  fields = fields.join '|'

  wurfl = http.createClient @port, @host
  request = wurfl.request 'GET', "#{@path}?ua=#{ua}&search=#{fields}&format=json", 'host': @host
  request.end()
  request.on 'response', (response) ->
    if response.statusCode isnt 200
      callback [{'Expected response with status code HTTP 200 OK, got: ': response.statusCode}], null
    else
      response.setEncoding 'utf8'
      data = ''
      response.on 'data', (chunk) -> data += chunk
      response.on 'end', ->
        try
          data = JSON.parse data
          callback data.errors, data.capabilities
        catch e
          callback [{'Error parsing response as JSON': e}], null
