import Letter from "./Letter";
import GameRouter from "../component/GameRouter";
import type GameSystem from "./GameSystem";
import System from "../../class/System";

import type { GameConfig } from "../../utils/types";
import type { Challenge } from "../../utils/interfaces";
import type TextHolder from "../component/TextHolder";
import type TextAudio from "../component/TextAudio";

class StringGame extends System{

    private gameRouter: GameRouter;
    private textHolder: TextHolder;
    private textAudio: TextAudio; 
    private gameSystem: GameSystem;

    private challenges: Challenge[] = [];  
    // private letters: Array<Letter> = [];	
    private gameConfig: GameConfig;
    private i1: number = 0;
    private i: number = 0;

    constructor(gameRouter: GameRouter, gameSystem: GameSystem){
	super();
	this.gameRouter = gameRouter;
	this.textHolder = gameRouter.textHolder;
	this.textAudio = gameRouter.textAudio;
	this.gameSystem = gameSystem;
	console.log("here: ", this.gameRouter.textHolder);
    }

    gameInit(challenges: Challenge[]){
	this.challenges = challenges;
	this.gameRouter.textAudio.system.addAudioSource(this.challenges[this.i1].audioName, this.gameSystem.getType());
	this.textHolder.system.addLetters(challenges);
	this.textHolder.system.displayLetters(this.i1);
	// this.textHolder.system.addLetters(this.letters);
    }


    debug(){

    }

    guessLetter(playerInput: string){
	const currentLetters = this.textHolder.system.challengesLetters[this.i1];
	console.log("currentLetters: ", currentLetters[this.i1]);
	const letter = currentLetters[this.i];
	console.log("letter ", "[", letter.getChar , "]");
	if(letter.getChar === playerInput){
	    letter.turnGreen();
	    console.log("correct!");

	    if( this.i != currentLetters.length-1){
		if(currentLetters[this.i].getChar == " "){
		    this.textAudio.system.ding();
		}
	    }else{
		this.textAudio.system.ding();
	    }

	    this.i += 1;

	    
	}else{
	    this.textAudio.system.wrong();
	    if(letter.getChar === " "){
		letter.turnBackgroundRed();
	    }else{
		letter.turnRed();
	    }
	    this.textHolder.style.display = "flex";
	    this.gameLose();
	    return;
	}

	if(this.i == this.textHolder.system.challengesLetters[this.i1].length){
	    if(this.i1 == this.textHolder.system.challengesLetters.length-1){
		this.gameEnd();
		return;
	    }
	    this.lineEnd();
	}
    }

    lineEnd(){
	this.i1 += 1;
	this.i = 0;
	this.gameRouter.textAudio.system.addAudioSource(this.challenges[this.i1].audioName, this.gameSystem.getType());
	this.textHolder.system.displayLetters(this.i1);
	console.log("Line ended");
    }

    gameLose(){
	this.i1=0;
	this.i=0;
	this.textHolder.system.challengesLetters = [];
	this.gameSystem.gameEnd();
    }

    gameEnd(){
	// this.textHolder.system.removeLetters();
	this.i1= 0;
	this.i = 0;
	console.log("String game finished");
	this.textHolder.system.challengesLetters = [];
	this.gameSystem.gameEnd();
    }

}



export default StringGame;


