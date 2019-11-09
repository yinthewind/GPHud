
setTimeout(function(event) {
	console.log(document.querySelectorAll('.avatars-enabled'));

	document.querySelectorAll('.seat-click-area').forEach(function(node) {
		console.log(node);
		node.insertAdjacentHTML('afterbegin','<link rel="stylesheet" href="overlay.css"> <div class="overlay-window"> <div class="text-wrapper"> <ul> <li class="handcounts"> <p>HC</p> <span>10</span> </li> <li class="vpip"> <p>VPIP</p> <span>15%</span> </li> <li class="pfr"> <p>PFR</p> <span>15%</span> </li> </ul> </div> <hr> <div class="text-wrapper"> <ul> <li class="3bet"> <p>3BET</p> <span>10</span> </li> <li class="4bet"> <p>4BET</p> <span>15%</span> </li> </ul> </div> <hr> <div class="text-wrapper"> <ul> <li class="fts"> <p>FTS</p> <span>10</span> </li> <li class="f3b"> <p>F3B</p> <span>15%</span> </li> <li class="f4b"> <p>F4B</p> <span>15%</span> </li> </ul> </div> </div>');
	});
}, 3000); 


