var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
console.log(PORT);
app.listen(PORT);

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

const fs = require('fs');
const path = require('path');
var http = require('http');

app.get('/stream', function(req, res) {
    var streamName = req.query.streamName;
    streamItNow(req, res,__dirname+"/"+streamName);
})


app.post('/about', (req, res) => {
    //console.log(req.body.mgLink);
	const WebTorrent = require('webtorrent')
	const client = new WebTorrent()
	const magnetURI = "magnet:?xt=urn:btih:611E5309760176BA2BFA54F3E68A05C5890A8B54&dn=Taylor+Swift+-+The+Lakes+%28bonus+track+from+Folklore%29+%282020%29+Mp3&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce";//req.body.mgLink;
	console.log("Going to start:");
	client.add(magnetURI, { path: __dirname }, function (file) {
        console.log("Download started");
		file.on('done', function () {
		  console.log('torrent download finished');
		  //redirectIt(req,res, file.name);
		})
	});
    console.log("End:");
});

function streamItNow(req, res, filePath){
    const range = req.headers.range;
    const videoPath = filePath;
    const videoSize = fs.statSync(videoPath).size;

    const chunkSize = 1 * 1e+6;
    const start = range == undefined ? 0 : Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunkSize, videoSize -1);

    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": videoPath.endsWith('mp4') ? "video/mp4" : "audio/mpeg"
    }
    res.writeHead(206, headers);

    const stream = fs.createReadStream(videoPath, { start, end })
    stream.pipe(res);
}

function redirectIt(req, res, videoName){
    res.redirect('/server/app_function/video?streamName='+videoName);
}

module.exports = app;

