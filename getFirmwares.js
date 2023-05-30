const cheerio = require('cheerio')
const axios = require('axios');
var fetch = require("node-fetch");
var fs = require("fs");


function download(u, p) {
    return fetch(u, {
        method: 'GET',
        headers: { 'Content-Type': 'application/octet-stream' },
    }).then(res => res.buffer()).then(_ => {
        fs.writeFile(p, _, "binary", function (err) {
            console.log(err || p);
        });
    });
}

async function main() {

    try {
        var l = await axios.default.get('https://darthsternie.net/switch-firmwares/', {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36 Edg/92.0.902.78"
        });
        //var o = html2;
        var $ = await cheerio.load(l.data)
        var s=$('#tablepress-53 tbody tr')[0].childNodes[5].childNodes[0].attribs.href
        console.log(s);
        download(s, decodeURI(s.split("/").reverse()[0]))
        // .each((index, e) => {
        //     var url="http:"+e.attribs.href;
        //     download(url, decodeURI(url.split("/").reverse()[0]))
        // })
    }
    catch (error) {
        console.log(error)
    }
}

main();