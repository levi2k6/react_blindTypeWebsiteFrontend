import GameRouter from "../../../component/GameRouter";
import GameSystem from "../GameSystem";
import TextHolder from "../../../component/TextHolder";
import TextAudio from "../../../component/TextAudio";

import type {  Challenge, StringChallenge } from "../../../../utils/interfaces";
import Game from "./Game";
import type Letter from "../../../component/Letter";

class StringGame extends Game{

    private name: string = "StringGame";
    private gameRouter: GameRouter;
    private textHolder: TextHolder;
    private textAudio: TextAudio; 
    private gameSystem: GameSystem;

    private challenges: StringChallenge[] = []; 
    private i1: number = 0;
    private i2: number = 0;

    constructor(gameRouter: GameRouter, gameSystem: GameSystem){
	super();
	this.gameRouter = gameRouter;
	this.textHolder = gameRouter.textHolder;
	this.textAudio = gameRouter.textAudio;
	this.gameSystem = gameSystem;
	console.log("here: ", this.gameRouter.textHolder);
    }

    getName(): string{
	return this.name; 
    }

    gameReset(){

    }

    gameInit(challenges: Challenge[]): void{
	const stringChallenges = challenges as StringChallenge[];
	this.challenges = stringChallenges;
	this.setChallengeAudio(stringChallenges[this.i1].audioName);

	this.textHolder.system.addLetters(challenges);
	this.textHolder.system.displayLetters(this.i1);
    }

    setChallengeAudio(audioName: string){
	this.gameRouter.textAudio.system.addAudioSource(audioName, this.gameSystem.getType());
    }

    guessLetter(playerInput: string): void{
	const challengeLetters = this.textHolder.system.getChallengeLetters(); 
	const currentLetters = challengeLetters[this.i1];
	const letter = currentLetters[this.i2];

	console.log("currentLetters: ", currentLetters[this.i1]);
	console.log("letter ", "[", letter.getChar , "]");


	if(letter.getChar === playerInput){
	    this.correct(letter, currentLetters);
		    
	}else{
	    this.wrong(letter);
	}

	this.checkLine(challengeLetters);
    }

    private correct(letter: Letter, currentLetters: Array<Letter>){
	letter.turnGreen();
	console.log("correct!");

	if( this.i2 != currentLetters.length-1){
	    if(currentLetters[this.i2].getChar == " "){
		this.textAudio.system.ding();
	    }
	}else{
	    this.textAudio.system.ding();
	}

	this.i2 += 1;
    }

    private wrong(letter: Letter){
	this.textAudio.system.wrong();
	if(letter.getChar === " "){
	    letter.turnBackgroundRed();
	}else{
	    letter.turnRed();
	}
	this.textHolder.style.display = "flex";
	this.gameEnd();
	return;
    }

    private checkLine(challengeLetters: Array<Letter[]>){
	if(this.i2 == challengeLetters[this.i1].length){
	    if(this.i1 == challengeLetters.length-1){
		this.gameEnd();
		return;
	    }
	    this.lineEnd();
	}
    }

    lineEnd(){
	this.i1 += 1;
	this.i2 = 0;
	this.textHolder.system.displayLetters(this.i1);
	this.setChallengeAudio(this.challenges[this.i1].audioName);
	console.log("Line ended");
    }

    gameEnd(){
	// this.textHolder.system.removeLetters();
	console.log("challenges: ", this.challenges);
	this.i1= 0;
	this.i2 = 0;
	console.log("String game finished");
	// this.textHolder.system.removeChallengeLetters();
	this.gameSystem.gameEnd();
    }

}



export default StringGame;


