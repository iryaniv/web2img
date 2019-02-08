const express = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const config = require('../config').config;
const { spawnSync } = require('child_process');

router.get('/api/hello', function(req, res, next) {
    res.send({ hello: 'hello' });
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
        const child = spawnSync(config.phantomBin, ['./rasterize.js', chromeHtmlPath, imgFilePath]);
        console.log('error', child.error);
        console.log('stdout ', child.stdout.toString());
        console.log('stderr ', child.stderr.toString());
        let img = fs.readFileSync(imgFilePath);
        // fs.unlink(htmlFilePath);
        // fs.unlink(imgFilePath);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img, 'binary');
    });
});


module.exports = router;