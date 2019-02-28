const express = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const config = require('../config').config;
const { spawnSync } = require('child_process');
var phantomjs = require('phantomjs-bin');


router.get('/', function(req, res, next) {
    res.send("web2img-1.0");
});

router.post('/api/source', function(req, res, next) {
    let source = req.body.source;
    let sourceKey = uuidv4();
    let htmlFilePath = config.tmpHtmlDir + sourceKey + ".html";
    let imgFilePath = config.tmpImgDir + sourceKey + ".png";
    fs.writeFile(htmlFilePath, source, function(err) {
        if (err) {
            console.log(err);
        }
        let chromeHtmlPath = "file:///" + __dirname + "\\..\\" + htmlFilePath;
        const child = spawnSync(phantomjs.path, ['./rasterize.js', chromeHtmlPath, imgFilePath]);
        console.log('stdout: ', child.stdout.toString());
        console.log('stderr: ', child.stderr.toString());
        let img = fs.readFileSync(imgFilePath);
        fs.unlink(htmlFilePath, err => { if (err) console.log(err) });
        fs.unlink(imgFilePath, err => { if (err) console.log(err) });
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img, 'binary');
    });
});


module.exports = router;