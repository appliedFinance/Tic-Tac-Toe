#!/usr/bin/js
// TIC TAC TOE in javascript
// 12/23/2017

function say(s) { process.stdout.write(s); }

function uint(a, b) {
	return Math.floor(Math.random() * (b+1 - a) ) + a;
}

function pause(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function Board() {
	// Fields
	this.hex=[' ',' ',' ',' ',' ',' ',' ',' ',' '];
	this.gameOver = false;
	// Methods (Functions)
	this.say = function mysay(s) { process.stdout.write(s); }
	this.display = function mydisplay() {
		this.say(" " + this.hex[0] + " | " + this.hex[1] + " | " + this.hex[2] + "\n");
		this.say("-----------\n");
		this.say(" " + this.hex[3] + " | " + this.hex[4] + " | " + this.hex[5] + "\n");
		this.say("-----------\n");
		this.say(" " + this.hex[6] + " | " + this.hex[7] + " | " + this.hex[8] + "\n");
	}
	this.setX = function mysetx(n) { this.hex[n] = 'X'; }
	this.setO = function myseto(n) { this.hex[n] = 'O'; }
	this.isSet = function myisset(n) { let r=true; if (this.hex[n]==' ') { r=false; } return r; }
	this.winFor = function mywinfor(a) {
		let winner = false;
		if (this.hex[0]==a && this.hex[1]==a && this.hex[2]==a) { winner= true; }
		if (this.hex[3]==a && this.hex[4]==a && this.hex[5]==a) { winner= true; }
		if (this.hex[6]==a && this.hex[7]==a && this.hex[8]==a) { winner= true; }
		if (this.hex[0]==a && this.hex[3]==a && this.hex[6]==a) { winner= true; }
		if (this.hex[1]==a && this.hex[4]==a && this.hex[7]==a) { winner= true; }
		if (this.hex[2]==a && this.hex[5]==a && this.hex[8]==a) { winner= true; }
		if (this.hex[0]==a && this.hex[4]==a && this.hex[8]==a) { winner= true; }
		if (this.hex[6]==a && this.hex[4]==a && this.hex[2]==a) { winner= true; }
		if (winner) { this.gameOver = true; }
		return winner;
	}
}//Board

function draw() { return uint(0,8); }

async function go() {

	let board = new Board();
	board.display();

	let player = draw();
	let turn = 0;
	while( !board.gameOver )
	{
		turn++;	
		if (turn>9) { say("\nDraw!\n\n"); break; }
		say("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"); // hahaha ...
		if (player++ % 2 == 0) {
			// X Turn
			let s = draw(); while(board.isSet(s)) { s = draw(); }
			board.setX(s);
		} else {
			// O Turn
			let s = draw(); while(board.isSet(s)) { s = draw(); }
			board.setO(s);
		}//if
		say("\nTurn " + turn + ":\n");
		board.display();
		if (board.winFor('X')) { say("\n-= X Wins!\n\n"); }
		if (board.winFor('O')) { say("\n-= O Wins!\n\n"); }
		await pause(1000);
	}//while
}//go

go();
