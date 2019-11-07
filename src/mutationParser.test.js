'use strict';

var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, './sampleHandsShort.txt');
import { parseMutation } from './mutationParser.js';

test('parser', async (done) => {
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err) {
			for(let mutationStr of data.split('\n')) {
				parseMutation(mutationStr);
			}
		} else {
			console.log(err);
		}
		done();
	});
});
