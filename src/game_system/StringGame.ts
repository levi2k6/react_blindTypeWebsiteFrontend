import Letter from "./Letter";
import Component from "../components/Component";
import Game from "../routes/game";
import type GameSystem from "./GameSystem";


class StringGame{

    private game;
    private gameSystem: GameSystem;

    private difficulty: string; 
    private letters: Array<Letter> = [];	
    private i: number = 0;

    constructor(game: Game, gameSystem: GameSystem){
	this.gameSystem = gameSystem;
	this.game = game;
    }

    getLetters(){
	return this.letters;
    }

    emptyLeters(){
	this.letters = [];
    }

    addLetters(texts: string){
	for(let i = 0; i < texts.length; i++){
	    this.letters.push( (new Letter(texts[i].toLowerCase())) );
	}
    }

    guessLetter(playerInput: string){
	let letter = this.letters[this.i];
	console.log("letter ", "[", letter.getChar , "]");
	if(letter.getChar === playerInput){
	    letter.turnGreen();
	    console.log("correct!");
	    this.i += 1;
	}else{
	    if(letter.getChar === " "){
		console.log("trigger");
		letter.turnBackgroundRed();
	    }else{
		letter.turnRed();
	    }
	    this.game.getTextHolder().style.display = "flex";
	    console.log("wrong");
	    this.i += 1;
	}

	if(this.i == this.letters.length){
	    this.gameEnd();
	}
    }

    gameEnd(){
	console.log("String game finished");
	this.letters = [];
	this.i = 0;
	this.gameSystem.gameEnd();
    }
    


}



export default StringGame;


