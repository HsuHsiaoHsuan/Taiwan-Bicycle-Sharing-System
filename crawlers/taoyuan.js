const request = require('request');

//exports.run = request(
exports.run = function (callback) {
    request({
        method: 'GET',
        uri: 'http://data.tycg.gov.tw/api/v1/rest/datastore/a1b4714b-3b75-4ff8-a8f2-cc377e4eaa0f?format=json',
        gzip: false 
        }, 
        function (error, response, body) {
            // body is the decompressed response body
            //console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));
            var json = JSON.parse(body);

            var result = [];
            for (var key in json.result.records) {
                if (json.result.records.hasOwnProperty(key)) {
                    var singleOne = json.result.records[key];
                    var item = {
                        id: singleOne.sno,
                        name: singleOne.sna,
                        address: singleOne.ar,
                        lat: singleOne.lat,
                        lon: singleOne.lng,
                        bike: singleOne.sbi,
                        park: singleOne.bemp,
                        alive: singleOne.act
                    };
                    result.push(item);
                }
            }

            callback(result);
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
