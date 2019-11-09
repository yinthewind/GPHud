'use strict';

var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, './GPMutations-2019-11-09T05_28.json');
import { parseMutation } from './mutationParser.js';
import { HandRecorder } from './handRecord.js';

test('parser', async (done) => {
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err) {
			let recorder = new HandRecorder();

			for(let mutationStr of JSON.parse(data)) {
				let action = parseMutation(mutationStr);

				let hand = recorder.record(action);
				if (hand) {
					console.log(JSON.stringify(hand, null, 2));
				}
			}
		} else {
			console.log(err);
		}
		done();
	});
});
