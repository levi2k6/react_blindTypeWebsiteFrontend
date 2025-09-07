import Letter from "./Letter";
import Component from "../../class/Component";
import type GameRouter from "../routes/GameRouter";
import type GameSystem from "./GameSystem";
import type { GameConfig } from "../utils/types";
import System from "../../class/System";


class StringGame extends System{

    private gameRouter: GameRouter;
    private gameSystem: GameSystem;

    private letters: Array<Letter> = [];	
    private i: number = 0;

    constructor(gameRouter: GameRouter, gameSystem: GameSystem){
	super();
	this.gameRouter = gameRouter;
	this.gameSystem = gameSystem;
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
		letter.turnBackgroundRed();
	    }else{
		letter.turnRed();
	    }
	    this.gameRouter.textHolder.style.display = "flex";
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


