var express = require('express');
var app = express();
var http = require('http').Server(app);

var crawlerTaipei =    require('./crawlers/taipei.js');
var crawlerNewTaipei = require('./crawlers/new_taipei.js');
var crawlerTaoyuan =   require('./crawlers/taoyuan.js');
var crawlerTaichung =  require('./crawlers/taichung.js');
// var crawlerHsinchu =   require('./crawlers/hsinchu.js');
var crawlerKaohsiung = require('./crawlers/kaohsiung.js');

var data_taipei = [];
var data_new_taipei = [];
var data_taoyuan = [];
var data_taichung = [];
// var data_hsinchu = [];
var data_kaohsiung = [];

app.get('/taipei', function(req, res) {
    res.send(data_taipei);
});

app.get('/new_taipei', function(req, res) {
    res.send(data_new_taipei);
});

app.get('/taoyuan', function(req, res) {
    res.send(data_taoyuan);
});

app.get('/taichung', function(req, res) {
    res.send(data_taichung);
});

/*
app.get('/hsinchu', function(req, res) {
    res.send(data_hsinhu);
});
*/

app.get('/kaohsiung', function(req, res) {
    res.send(data_kaohsiung);
});


function getTaipei()  {
    crawlerTaipei.run(function(result) {
        data_taipei = result;
        // console.log(data_taipei);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.台北");
    });
}

function getNewTaipei()  {
    crawlerNewTaipei.run(function(result) {
        data_new_taipei = result;
        // console.log(data_new_taipei);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.新北");
    });
}

function getTaoyuan()  {
    crawlerTaoyuan.run(function(result) {
        data_taoyuan = result;
        // console.log(data_taoyuan);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.桃園");
    });
}

function getTaichung()  {
    crawlerTaichung.run(function(result) {
        data_taichung = result;
        // console.log(data_taichung);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.台中");
    });
}

function getHsinchu()  {
    crawlerHsinchu.run(function(result) {
        data_hsinchu = result;
        // console.log(data_hsinchu);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.新竹");
    });
}

function getKaohsiung()  {
    crawlerKaohsiung.run(function(result) {
        data_kaohsiung = result;
        // console.log(data_kaohsiung);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.高雄");
    });
}


setInterval(getTaipei, 20000);
setInterval(getNewTaipei, 20000);
setInterval(getTaoyuan, 20000);
setInterval(getTaichung, 20000);
// setInterval(getHsinchu, 3000);
setInterval(getKaohsiung, 20000);

http.listen(5566, function() {
    console.log("Server start in port 8081");
});

/*
// Taipei
crawlerTaipei.run(function (result) {
    console.log(result);
});
*/

/*
// New Taipei
crawlerNewTaipei.run(function (result) {
    console.log(result);
});
*/

/*
// Taoyuan
crawlerTaoyuan.run(function (result) {
    console.log(result);
});
*/

/*
// Taichung
crawlerTaichung.run(function (result) {
    console.log(result);
});
*/

/*
// Hsinchu
crawlerHsinchu.run(function (result) {
    console.log(result);
});
*/

/*
// Kaohsiung
crawlerKaohsiung.run(function (result) {
    console.log(result);
});
*/
