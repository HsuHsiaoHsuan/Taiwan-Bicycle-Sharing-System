const request = require('request');
const parseXML = require('xml2js').parseString;

//exports.run = request(
exports.run = function (callback) {
    request({
        method: 'GET',
        uri: 'http://data.kaohsiung.gov.tw/Opendata/DownLoadSwitch.aspx?CaseNo1=AH&CaseNo2=6&Lang=C&FolderType=',
        gzip: false
        }, 
        function (error, response, body) {
            // body is the decompressed response body
            console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));

            var res = []
            parseXML(body, function (err, result) {
                var stations = result.BIKEStationData.BIKEStation[0].Station;
                var item;
                if (stations instanceof Object) {
                    for (var x = 0; x < stations.length; x++) {
                        console.log(stations[x]);
                    }
                } else {
                    console.log("it's not");
                }
            });
            //var json = JSON.parse(body);

            //var result = [];
            //for (var key in json.retVal) {
            //    if (json.retVal.hasOwnProperty(key)) {
            //        result.push(json.retVal[key]);
            //    }
            //}

            //callback(result);
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
