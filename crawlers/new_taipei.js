const request = require('request');

//exports.run = request(
exports.run = function (callback) {
    request({
        method: 'GET',
        uri: 'http://data.ntpc.gov.tw/od/data/api/54DDDC93-589C-4858-9C95-18B2046CC1FC?$format=json',
        gzip: false 
        }, 
        function (error, response, body) {
            // body is the decompressed response body
            // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
            // var json = JSON.parse(body);

            callback(body);
        }
    )
    .on('data', function (data) {
        // decompressed data as it is received
        // console.log('decoded chunk: ' + data);
    })
    .on('response', function (response) {
        // unmodified http.IncomingMessage object
        response.on('data', function (data) {
            //  console.log('received ' + data.length + ' bytes of compressed data');
        });
    });
}
