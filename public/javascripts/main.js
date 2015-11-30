var mapScale = 100;
var stop_image = "idle-down.png";

window.onResize = function() {
	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0xFFFFFF, view: canvas});
}

PIXI.loader
	.add("/assets/frames/player-basic-idle.json")
	.load(function(){});

PIXI.loader
	.add("/assets/frames/player-basic-run.json")
	.load(function(){});

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

left = keyboard(37),
up = keyboard(38),
right = keyboard(39),
down = keyboard(40);

function init() {
	canvas = document.getElementById('game-canvas');
	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight,{backgroundColor : 0xFFFFFF, view: canvas});

	stage = new PIXI.Container();
	floor = new PIXI.Container();

	character = new PIXI.Sprite(PIXI.Texture.fromFrame('idle-down.png'));
	character.anchor.x = 0.5;
	character.anchor.y = 0.5;
	character.scale.x = 2;
	character.scale.y = 2;
	character.x = window.innerWidth / 2;
	character.y = window.innerHeight / 2;

	stage.addChild(floor);
	stage.addChild(character);

	for (var j = 0; j < mapScale; j++) {
		var xAdd = -250 * j + Math.floor(window.innerWidth / 2) - 250;
		for (var i = 0; i < mapScale; i++) {
			var yAdd = 185 * i
			var tile = PIXI.Sprite.fromImage('assets/grass1.png');
			tile.x = 250 * i + xAdd;
			tile.y = 185 * j + yAdd;
			floor.addChild(tile);
		}
	}

	animate();
}

function animate() {

	requestAnimationFrame(animate);

	if (left.isDown == true) {
		floor.x += 6.76 ;

		if(up.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-up-left.png');
			stop_image = 'idle-up-left.png';
		} else if(down.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-down-left.png');
			stop_image = 'idle-down-left.png';
		} else {
			character.texture = PIXI.Texture.fromFrame('run-left.png');
			stop_image = 'idle-left.png';
		}
	}

	if (right.isDown == true) {
		floor.x += -6.76 ;

		if(up.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-up-right.png');
			stop_image = 'idle-up-right.png';
		} else if(down.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-down-right.png');
			stop_image = 'idle-down-right.png';
		} else {
			character.texture = PIXI.Texture.fromFrame('run-right.png');
			stop_image = 'idle-right.png';
		}
	}

	if (up.isDown == true) {
		floor.y += 5;

		if(right.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-up-right.png');
			stop_image = 'idle-up-right.png';
		} else if(left.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-up-left.png');
			stop_image = 'idle-up-left.png';
		} else {
			character.texture = PIXI.Texture.fromFrame('run-up.png');
			stop_image = 'idle-up.png';
		}
	}

	if (down.isDown == true) {
		floor.y += -5;

		if(right.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-down-right.png');
			stop_image = 'idle-down-right.png';
		} else if(left.isDown == true) {
			character.texture = PIXI.Texture.fromFrame('run-down-left.png');
			stop_image = 'idle-down-left.png';
		} else {
			character.texture = PIXI.Texture.fromFrame('run-down.png');
			stop_image = 'idle-down.png';
		}
	}

	if (left.isDown == false && right.isDown == false && down.isDown == false && up.isDown == false) {
		character.texture = PIXI.Texture.fromFrame(stop_image);
	}

	// render the root floor
	renderer.render(stage);
}