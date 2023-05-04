/* BREAKOUT IN JS WITH PHASER BY HENRIQUE REIS
 *
 * TODO LIST :
 *
 * ADD CONTROLS : AD / MOUSE / TOUCH ?
 * ADD SONGS
 * DEFINITIVE TEXT FORMATTING(CSS) AND MESSAGES
 * RECORD HIGH SCORES AND ADD GAME OVER BEHAVIOR
 */

var config = {

	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: false,
			debug: false,
			checkCollision: {
				up: true,
				down: true,
				left: true,
				right: true   
			}  
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}

};

var ballindex = 0;
var aliveballs = 1; // maximo de bolas 
var player;
var balls;
var tiles;
var ball = [];
var tile = [];
var cursors;
var gameOver = false;
var game = new Phaser.Game(config);
var leveltiles = 60;
var destroyedtiles = 0;
var level = 0;
var reversecontrol = false;

function preload () 

{

	for (let i = 0; i <= 14; i++) {
		this.load.image('background' + i, 'assets/tilebg' + i +'.jpg');
	}

	this.load.image('tilebg', 'assets/tilebg.gif'); 
	this.load.image('ball', 'assets/ball.png');
	this.load.image('stick', 'assets/purplepong.png');
	this.load.image('yellowtile', 'assets/yellowtile.png'); 
	this.load.image('greentile', 'assets/greentile.png'); 
	this.load.image('orangetile', 'assets/orangetile.png'); 
	this.load.image('redtile', 'assets/redtile.png'); 
	this.load.image('graybluetile', 'assets/graybluetile.png'); 
	this.load.image('purpletile', 'assets/purpletile.png'); 
	this.load.image('basetile', 'assets/basetile.png'); 
}

function create ()

{

	/* BACKGROUND */

	this.add.image(400, 300, 'background' + Phaser.Math.Between(0,14));
 
	/*  INPUT EVENTS */

	cursors = this.input.keyboard.createCursorKeys();
    
	/* PADDLE PLAYER */


	player = this.physics.add.sprite(this.physics.world.bounds.width / 2, this.physics.world.bounds.height - 21, 'stick');

	player.setCollideWorldBounds(true);
	player.setBounce(1, 1);
	player.setImmovable(true);
	player.scaleFactor = 1;
	player.speed = 300;
	player.pointsFactor = 1;
	player.score = 0;
	

	/* BALLS */


	balls = this.physics.add.group();
	ball[0] = balls.create(400, 500, 'ball', undefined, {circleRadius: 15});
	ball[0].maxoverlap = 10;
	ball[0].blasterdestroyed = ball[0].maxoverlap;
	ball[0].maxvel = 300;
	ball[0].owner = player; // OWNER
	ball[0].setBounce(1,1);
	ball[0].setCollideWorldBounds(true);
	ball[0].setVelocityY(-ball[0].maxvel);
	ball[0].setVelocityX((Phaser.Math.Between(0, 1) == 1)? -ball[0].maxvel: ball[0].maxvel);
	ball[0].allowGravity = true;

	balls.tileoverlap = this.physics.add.overlap(ball,tile, tileoverlap);
	balls.tileoverlap.active = false;
	balls.tilecollider = this.physics.add.collider(ball,tile, tilebreak);
	balls.ballscolider = this.physics.add.collider(ball,ball, ballscolliding);

	/* TILES */

	tiles = this.physics.add.group();
	createtiles();

	/* COLLIDERS */ 		

	this.physics.add.collider(ball,player, hit);
	updatepanel(); // Panel 
}

function update ()
{

	if (gameOver) {
		return;
	}

	aliveballs = 0;

	for (i = 0; i < ball.length; i++) {
		if (ball[i].body.y < 600) {
			aliveballs++;
		}
	}

	if (aliveballs <= 0) {gameOver=true;} 


	// AUTOMATIC PILOT PLAYER 
 
//	if (ball[0].x > player.x) {
//		player.setVelocityX(vel);
//	} else {
//		player.setVelocityX(-vel);
//	}

	// PADDLE MOVEMENT //

    if (reversecontrol == true) {
		if (cursors.left.isDown) {
			player.setVelocityX(player.speed);
		}

		else if (cursors.right.isDown) {
			player.setVelocityX(-player.speed);
		}

		else { 
			player.setVelocity(0);
		}
	} else {
		if (cursors.left.isDown) {
			player.setVelocityX(-player.speed);
		}

		else if (cursors.right.isDown) {
			player.setVelocityX(player.speed);
		}

		else { 
			player.setVelocity(0);
		}

	}

}

function hit(thisball, player) {

	thisball.owner = player;

	if (thisball.body.velocity.x > 0 && player.body.velocity.x < 0 &&  (thisball.body.x < ( player.body.x + player.body.width / 4))) {
		thisball.setVelocityX(-thisball.body.velocity.x);
	} else if (thisball.body.velocity.x < 0 && player.body.velocity.x > 0 &&  (thisball.body.x > ( player.body.x + (player.body.width  * 0.75 )))) {
		thisball.setVelocityX(-thisball.body.velocity.x);
	}
}

function tilebreak(thisball, solotile) {

	if (--solotile.lifepoints == 0) {
		solotile.destroy();
		thisball.owner.score += Math.round(solotile.points * thisball.owner.pointsFactor);
		putondisplay("msg", "+" + Math.round(solotile.points * thisball.owner.pointsFactor) + " pts!");
		if (solotile.mandatory) { destroyedtiles++; }
	}

	switch(solotile.type) {

		case "redtile":

			badthings(thisball, thisball.owner);
			break;

		case "greentile":

			goodthings(thisball, thisball.owner);
			break;

		case "purpletile":

			if (aliveballs < 3) {
			
				ballindex++;
				ball[ballindex] = balls.create(player.body.x+50, player.body.y-15, 'ball', undefined, {circleRadius: 15});
				ball[ballindex].maxoverlap = 10;
				ball[ballindex].blasterdestroyed = ball[ballindex].maxoverlap;
				ball[ballindex].maxvel = 300;
				ball[ballindex].owner = player ; // OWNER
				ball[ballindex].setBounce(1,1);
				ball[ballindex].setCollideWorldBounds(true);
				ball[ballindex].setVelocityY(-ball[ballindex].maxvel);
				ball[ballindex].setVelocityX((Phaser.Math.Between(0, 1) == 1)? -ball[ballindex].maxvel: ball[ballindex].maxvel);

				ball[ballindex].allowGravity = true;
			}

			else {
				
				reversecontrol = false;
			}

			break;
	}

	if (checkchangelevel() == true) {
        
        reversecontrol = false;
   		thisball.body.y = 500;
		thisball.body.x = player.body.x;
		createtiles();
	}
		updatepanel();
}

function randomtile() { 

    let n = Phaser.Math.Between(1, 100);
    
    if (n <= 5) {
	return "greentile";
    }

    else if (n <= 10) {
	return "redtile";
    }

    else if (n <= 20) {
	return "basetile";
    }

    else if (n <= 50) {
	return "orangetile";
    }

    else if( n <= 99) { 
	return "yellowtile"; 
    }

    else if (n <= 100) {
	return "purpletile";
    }
}

function createtiles() {

	let x;
	let y;
	let position = 0;
	let type;

	leveltiles = 60;
	destroyedtiles = 0;

	for (i = 0; i < tile.length; i++) { 
		tile[i].destroy();
	}

		y = -10;
	
		for (i = 0 ; i < 4; i++) {

			y+= 50;
			x = -10;

			for (j = 0; j < 15; j++) {

			type = randomtile();
			x += 50;
			tile[position]  = tiles.create(x,y,type);
			tile[position].setImmovable(true, true);
			tile[position].type = type;
			tile[position].solid = false;

			if (type == "basetile") {

				tile[position].hits = 0; // DESTRUIR
				tile[position].lifepoints = 50;
				tile[position].points = 100;
				tile[position].mandatory = false;

			} else {

				tile[position].lifepoints = 1;
				tile[position].mandatory = true;
			}

				switch(type) {

					case "redtile":

						tile[position].points = 5;
						tile[position].mandatory = false;
						break;

					case "greentile":

						tile[position].points = 50;
						break;

					case "yellowtile":

						tile[position].points = 10;
						break;

					case "orangetile":

						tile[position].points = 15;
						break;

					case "purpletile":

						tile[position].points = 0;
						break;
				}

				if (tile[position].mandatory == false) { leveltiles--; }

				position++;
			}
		}

	level++;
}

function goodthings(thisball, owner) { 
    
	let seed = Phaser.Math.Between(1,5);

	switch(seed) {

		case 1: 
			putondisplay("msg","+0.25 no fator de pontuação!");
			owner.pointsFactor += 0.25;
			break;
		case 2:
			putondisplay("msg","+500 pts"); 
			owner.score += 500;
			break;
		case 3:
			putondisplay("msg","+10 de velocidade!");
			owner.speed += 10;
			break;
		case 4:
			putondisplay("msg","BLASTER BALL!");
			thisball.blasterdestroyed = thisball.maxoverlap;
			balls.tilecollider.active = false;
			balls.tileoverlap.active = true;
			break;
		case 5:
			putondisplay("msg", "Escala : " + player.scaleFactor);
			player.scaleFactor *= 1.25;
			player.scaleX = player.scaleFactor;
			break;
		case 6:
			thisball.maxoverlap += 5;
			break;
	}
}


function badthings(thisball, owner) { 
    
	let seed = Phaser.Math.Between(1,10); // 30% are the odds of a bad thing happen 

	switch(seed) {

		case 1:
			putondisplay("msg","-10 de velocidade!");
			owner.speed -= 10;
			break;
		case 2:
			putondisplay("msg", "Escala <<<: " + player.scaleFactor);
			player.scaleFactor *= 0.75;
			player.scaleX = player.scaleFactor;
			break;
		case 3:
			putondisplay("msg", "CONTROLES INVERTIDOS");
			reversecontrol = true;
			break;
	}
}

function checkchangelevel() {

if (destroyedtiles == leveltiles) {

	return true;
}

return false;

}

function putondisplay(displayelement, displaymsg) {
	document.getElementById(displayelement).innerHTML =  displaymsg;
}

function tileoverlap(thisball, solotile) {

	thisball.blasterdestroyed--;
	solotile.destroy();
	thisball.owner.score += Math.round(solotile.points * thisball.owner.pointsFactor);
	
if (solotile.mandatory) { destroyedtiles++;}

	if (thisball.blasterdestroyed == 0 || checkchangelevel()) {

		thisball.blasterdestroyed = thisball.maxoverlap;
		balls.tileoverlap.active = false;	
		balls.tilecollider.active = true;

		if (checkchangelevel()) {

			reversecontrol = false;
			thisball.body.y = 500;
			thisball.body.x = player.body.x;
			createtiles();
		}
	}

	putondisplay("score", "Pontos: " + thisball.owner.score);
	updatepanel();
}

function updatepanel() {

	document.getElementById("score").innerHTML = "Score: " + player.score;
	//    document.getElementById("lifes").innerHTML = "Lifes: " + lifes;*/
	document.getElementById("pointsfactor").innerHTML = "Factor: " + player.pointsFactor;
	document.getElementById("level").innerHTML = "Level: " + level;
	document.getElementById("vel").innerHTML = "Velocidade: " + player.speed;
}

function ballscolliding() {}
