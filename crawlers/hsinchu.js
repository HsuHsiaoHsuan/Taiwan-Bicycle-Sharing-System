const request = require('request');

//exports.run = request(
exports.run = function (callback) {
    request({
        method: 'GET',
        uri: 'http://opendata.hccg.gov.tw/dataset/29f955d2-d712-4a23-9dc2-616bf3e5cb98/resource/3a994702-a44c-47cb-babb-7740f4dac009/download/20160712184055582.json',
        gzip: false 
        }, 
        function (error, response, body) {
            // body is the decompressed response body
            // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));

            var s = JSON.stringify(body)
            //var s = body.toString();
            // preserve newlines, etc - use valid JSON
            s = s.replace(/\\n/g, "\\n")  
                 .replace(/\\'/g, "\\'")
                 .replace(/\\"/g, '\\"')
                 .replace(/\\&/g, "\\&")
                 .replace(/\\r/g, "\\r")
                 .replace(/\\t/g, "\\t")
                 .replace(/\\b/g, "\\b")
                 .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars
            s = s.replace(/[\u0000-\u0019]+/g,""); 
            var obj = JSON.parse(s);
            var res = []
                for (var item in obj) {
                    console.log(item);   
                }
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
