import GameRouter from "../../../component/GameRouter";
import GameSystem from "../GameSystem";
import TextHolder from "../../../component/TextHolder";
import TextAudio from "../../../component/TextAudio";

import type {  Challenge, StringChallenge } from "../../../../utils/interfaces";
import Game from "./Game";
import type Letter from "../../../component/Letter";
import type GameConfigManager from "../../game_config/GameConfigManager";
import { getStringChallenge } from "../../data_manager/GameDataManager";

class StringGame extends Game{

    private name: string = "StringGame";
    private gameRouter: GameRouter;
    private textHolder: TextHolder;
    private textAudio: TextAudio; 
    private gameSystem: GameSystem;
    private gameConfigManager: GameConfigManager;

    private challenges: StringChallenge[] = []; 
    private i1: number = 0;
    private i2: number = 0;
    private iContinuous: number = 0;

    constructor(gameRouter: GameRouter, gameSystem: GameSystem, gameConfigManager: GameConfigManager){
	super();
	this.gameRouter = gameRouter;
	this.textHolder = gameRouter.textHolder;
	this.textAudio = gameRouter.textAudio;
	this.gameSystem = gameSystem;
	this.gameConfigManager = gameConfigManager;
	console.log("here: ", this.gameRouter.textHolder);
    }

    getName(): string{
	return this.name; 
    }

    gameReset(){

    }

    async gameInit(){
	const amount = this.gameConfigManager.getAmountRequest();
	if(!amount){
	    console.log("Game amount has no data");
	    return;
	}
	const response: Challenge[] = await getStringChallenge(this.gameSystem.getType() , amount);
	if(response === undefined){
	    console.log("challenge response is undefiend");
	    return;
	}

	const stringChallenges = response as StringChallenge[];
	this.challenges = stringChallenges;
	if(!this.gameSystem.getIsContinuous()){
	    this.setChallengeAudio(stringChallenges[this.i1].audioName);
	}else{
	    console.log("gameInit: continuous change audio");
	    this.continuousAudioChange();
	}

	this.textHolder.system.addLetters(this.challenges);
	this.textHolder.system.displayLetters(this.i1);
    }

    setChallengeAudio(audioName: string){
	this.gameRouter.textAudio.system.addAudioSource(audioName, this.gameSystem.getType());
    }

    guessLetter(playerInput: string): void{
	const challengeLetters = this.textHolder.system.getStringChallengeLetters(); 
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
	if(!this.gameSystem.getIsContinuous()){
	    this.setChallengeAudio(this.challenges[this.i1].audioName);
	}
	console.log("Line ended");
    }

    continuousAudioChange(){
	console.log("isContinuous: ", this.iContinuous);
	console.log("challengesLength: ", this.challenges.length);
	if(this.iContinuous < this.challenges.length){
	    console.log("Continue the audio change.");
	    this.setChallengeAudio(this.challenges[this.iContinuous].audioName);
	    this.iContinuous += 1;
	}
    }

    gameEnd(){
	// this.textHolder.system.removeLetters();
	console.log("challenges: ", this.challenges);

	this.i1= 0;
	this.i2 = 0;
	this.iContinuous = 0;
	this.textAudio.system.stopAudio();
	console.log("String game finished");
	this.textHolder.system.removeChallengeLetters();
	this.gameSystem.gameEnd();
    }

}



export default StringGame;


