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
            // console.log('server encoded the data as: ' + (response.headers['content-encoding'] || 'identity'));

            var res = []
            parseXML(body, function (err, result) {
                var stations = result.BIKEStationData.BIKEStation[0].Station;
                if (stations instanceof Object) {
                    for (var x = 0; x < stations.length; x++) {
                        var singleOne = stations[x];
                        var item = {
                            id: singleOne.StationID[0],
                            name: singleOne.StationName[0],
                            address: singleOne.StationAddress[0],
                            lat: singleOne.StationLat[0],
                            lon: singleOne.StationLon[0],
                            bike: singleOne.StationNums1[0],
                            park: singleOne.StationNums2[0],
                            alive: 2
                        };
                        res.push(item);
                    }
                } else {
                    console.log("it's not");
                }

                callback(res);
            });
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
