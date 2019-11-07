'use strict';

var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'sampleHand.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
		console.log(data);
    } else {
        console.log(err);
    }
});
