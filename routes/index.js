const express = require('express');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const config = require('../config').config;

router.get('/api/hello', function(req, res, next) {
    res.send({ hello: 'hello' });
});

router.post('/api/source', function(req, res, next) {
    let source = req.body.source;
    let sourceKey = uuidv4();
    let htmlFilePath = config.tmpHtmlDir + sourceKey + ".html";
    fs.writeFile(htmlFilePath, source, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Done");
    });

    res.send({ hello: 'hello' });
});


module.exports = router;