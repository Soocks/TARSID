function keyboard(keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.down = undefined;
	key.up = undefined;
	//The `downHandler`
	key.downHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isUp && key.down) key.down();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	//The `upHandler`
	key.upHandler = function(event) {
		if (event.keyCode === key.code) {
			if (key.isDown && key.up) key.up();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	//Attach event listeners
	window.addEventListener(
		"keydown", key.downHandler.bind(key), false
	);
	window.addEventListener(
		"keyup", key.upHandler.bind(key), false
	);
	return key;
}

function init() {
	canvas = document.getElementById('game-canvas');
	var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0xFFFFFF, view: canvas});

	stage = new PIXI.Container();
	floor = new PIXI.Container();

	stage.addChild(floor);

	for (var j = 0; j < 50; j++) {
		var xAdd = -50 * j;
   		for (var i = 0; i < 50; i++) {
   			var yAdd = 37 * i
   		    var tile = PIXI.Sprite.fromImage('assets/tile.png');
   		    tile.x = 50 * i + xAdd;
   		    tile.y = 37 * j + yAdd;
   		    floor.addChild(tile);
   		}
	}

	var left = keyboard(37),
    	up = keyboard(38),
    	right = keyboard(39),
    	down = keyboard(40);

	animate();

	function animate() {
	
	    requestAnimationFrame(animate);
	
	    if (left.isDown == true) {
	    	floor.x += 5;
	    }

	    if (right.isDown == true) {
	    	floor.x += -5;
	    }

	    if (up.isDown == true) {
	    	floor.y += 5;
	    }

	    if (down.isDown == true) {
	    	floor.y += -5;
	    }


	    // render the root floor
	    renderer.render(stage);
	}
}