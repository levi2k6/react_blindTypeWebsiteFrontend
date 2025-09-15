import GameRouter from "../../component/GameRouter";
import GameSystem from "../GameSystem";
import System from "../../../class/System";
import TextHolder from "../../component/TextHolder";
import TextAudio from "../../component/TextAudio";


import type { GameConfig } from "../../../utils/types";
import type {  Challenge, SentenceChallenge, WordChallenge } from "../../../utils/interfaces";
import Game from "./Game";

class StringGame extends Game{

    private name: string = "StringGame";
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

    getName(): string{
	return this.name; 
    }

    gameInit(challenges: Challenge[]): void{
	if(this.gameSystem.getType() == "sentence"){
	    const sentenceChallenges = challenges as SentenceChallenge[]; 
	    this.challenges = sentenceChallenges;
	    this.setChallengeAudio(sentenceChallenges[this.i1].audioName);
	}else if(this.gameSystem.getType() == "word"){
	    const wordChallenges = challenges as WordChallenge[];
	    this.challenges = wordChallenges; 
	    this.setChallengeAudio(wordChallenges[this.i1].text);
	}
	this.textHolder.system.addLetters(challenges);
	this.textHolder.system.displayLetters(this.i1);
    }


    setChallengeAudio(audioName: string){
	this.gameRouter.textAudio.system.addAudioSource(audioName, this.gameSystem.getType());
    }

    debug(){

    }

    guessLetter(playerInput: string): void{
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
	this.nextChallenge(this.gameSystem.getType());
	this.textHolder.system.displayLetters(this.i1);
	console.log("Line ended");
    }

    nextChallenge(type: string){
	if(type == "sentence"){
	    const sentenceChallenges = this.challenges as SentenceChallenge[];
	    this.setChallengeAudio(sentenceChallenges[this.i1].audioName);
	}else if(type == "word"){
	    const wordChallenge = this.challenges as WordChallenge[]; 
	    this.setChallengeAudio(wordChallenge[this.i1].text);
	}
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


