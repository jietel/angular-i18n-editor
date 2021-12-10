
var express = require('express');
var http = require('http');
var fs = require("fs");
var bodyParser = require('body-parser');            //npm install -S body-parser
var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true })); //req.body接收需要设置
var server = http.createServer(app);

//var WebSocket = require('ws');
// var wss = new WebSocket.Server({ server });
// wss.on('connection', function (socket) {
//     console.log('connect count', wss.clients.size);
//     socket.on('message', function (data) {
//         console.log('message obj', data);
//     });
//     socket.on("close", function () {
//         console.log('close');
//     })
// });
 
var langPath = './i18n/';
var baseLang = 'zh';
var servPort = 8110;


server.listen(servPort, function listening() {
    let host = server.address().address;
    let port = server.address().port;
    console.log("start server ==> http://%s:%s\n", host, port);
    if (!fs.existsSync(langPath)) {
        fs.mkdirSync(langPath);
    }
    if (!fs.existsSync(langPath + baseLang + '.json')) {
        fs.writeFileSync(langPath + baseLang + '.json', '{}');
    }
});

app.get('/index', (req, res) => {
    console.log(req.baseUrl, req.originalUrl, req.query);
    res.send("Hello nexcloud-i18n-editor");
});
app.get('/langs', (req, res) => {
    console.log('\n' + req.method, req.baseUrl, req.originalUrl, req.query);
    let lang = req.query.lang ? req.query.lang : 'en';
    fs.exists(langPath + lang + '.json', (exists) => {
        let baseLangData = fs.readFileSync(langPath + baseLang + '.json');
        let queryLangData = null;
        if (exists) {
            queryLangData = fs.readFileSync(langPath + lang + '.json');
            queryLangData = JSON.parse(String(queryLangData));
        } else {
            console.log('File does not exist:' + langPath + lang + '.json');
        }
        baseLangData = JSON.parse(String(baseLangData));
        let languages = fs.readdirSync(langPath);
        languages.forEach((file, i) => {
            file = file.replace('.json', '');
            languages[i] = file;
            if (file == baseLang) {
                languages.splice(i,1);
            }
        });
        res.send({ baseData: baseLangData, langData: queryLangData, languages: languages });
    });
});
app.post('/langs', (req, res) => {
    console.log('\n' + req.method, req.baseUrl, req.originalUrl, req.body);
    let lang = req.body.lang ? req.body.lang : '';
    let key = req.body.key ? req.body.key.toUpperCase() : '';
    let val = req.body.val ? req.body.val : '';
    let group = '';
    if (key && lang) {
        if (key.indexOf('.') > 0) {
            let keys = key.split('.');
            group = keys[0];
            key = keys[1];
        }
        console.log('>>> group:' + group + '; key:' + key + '; val:' + val);
        let filename = langPath + lang + '.json';
        if (!fs.existsSync(filename)) {
            res.send('2');
            console.log('File does not exist:' + filename);
            return;
        }
        let buffer = fs.readFileSync(filename);
        if (buffer) {
            let langs = JSON.parse(String(buffer));
            if (group) {
                if (!langs[group]) langs[group] = {};
                langs[group][key] = val;
            } else {
                langs[key] = val;
            }
            fs.writeFile(filename, JSON.stringify(langs), function (err) {
                console.log('>>> write ' + filename, err ? err : 'ok');
                if (err) {
                    res.send('0');
                } else {
                    res.send('1');
                }
            });
            return;
        }
    }
    res.send('0');
});

