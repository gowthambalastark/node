const express = require('express')
const app = express()
const WebTorrent = require('webtorrent')
const client = new WebTorrent()
app.get('/',function(req,res){
    res.send('Hellow world');
})
app.get('/about', (req, res) => {
	const magnetURI = "magnet:?xt=urn:btih:611E5309760176BA2BFA54F3E68A05C5890A8B54&dn=Taylor+Swift+-+The+Lakes+%28bonus+track+from+Folklore%29+%282020%29+Mp3&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce"
	console.log("Going to start:",__dirname);
	client.add("magnet:?xt=urn:btih:611E5309760176BA2BFA54F3E68A05C5890A8B54&dn=Taylor+Swift+-+The+Lakes+%28bonus+track+from+Folklore%29+%282020%29+Mp3&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2F47.ip-51-68-199.eu%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2F9.rarbg.to%3A2920%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce", { path: __dirname }, function (file) {
        console.log("Donwloading...");
		file.on('done', function () {
		  console.log('torrent download finished');
		  //redirectIt(req,res, file.name);
		});
        file.on('error', error => console.log('error caught!'))
	});
    console.log("End:");
});
app.listen(9000,function(req,res){
    console.log("Running");
});