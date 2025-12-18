import GameRouter from "../../../component/GameRouter";
import GameSystem from "../GameSystem";
import TextHolder from "../../../component/TextHolder";
import TextAudio from "../../../component/TextAudio";

import type {  Challenge, Response, StringChallenge } from "../../../../utils/interfaces";
import Game from "./Game";
import type Letter from "../../../component/Letter";
import type GameConfigManager from "../../game_config/GameConfigManager";
import { getRandomGameChallenge } from "../../../../utils/api/apiGame";
// import { getStringChallenge } from "../../data_manager/GameDataManager";

class StringGame extends Game{

    private name: string = "StringGame";
    private gameRouter?: GameRouter;
    private textHolder?: TextHolder;
    private textAudio?: TextAudio; 
    private gameSystem?: GameSystem;
    private gameConfigManager?: GameConfigManager;

    private challenges: StringChallenge[] = []; 
    private i1: number = 0;
    private i2: number = 0;
    private iContinuous: number = 0;


    public initSystem(gameRouter: GameRouter, gameSystem: GameSystem, gameConfigManager: GameConfigManager){
	console.log("StringGame: initSystem");
	this.gameRouter = gameRouter;
	this.textHolder = gameRouter.getChild("textHolder") as TextHolder;
	this.textAudio = gameRouter.getChild("textAudio") as TextAudio;
	this.gameSystem = gameSystem;
	this.gameConfigManager = gameConfigManager;
    }

    getName(): string{
	return this.name; 
    }

    gameReset(){
	this.gameEnd();
    }

    async gameInit(){

	if(!this.textHolder) throw new Error("textHolder is undefined");
	if(!this.gameConfigManager) throw new Error("gameConfigManager is undefined");
	if(!this.gameSystem) throw new Error("gameSystem is undefined");
	if(!this.textHolder) throw new Error("textHolder is undefined");
	if(!this.gameRouter) throw new Error("gameRouter is undefined");

	this.textHolder.style.visibility = "hidden";
	this.textHolder.system?.checkOverflow();
	const multiple = this.gameConfigManager?.getGameConfigMultiple();
	if(!multiple){
	    console.log("Game amount has no data");
	    return;
	}

	// const response: Challenge[] = await getStringChallenge(this.gameSystem.getType() , multiple);
	const response: Response<Challenge[]> = await getRandomGameChallenge(this.gameSystem.getType(), multiple);
	if(response === undefined){
	    console.log("challenge response is undefiend");
	    return;
	}

	const stringChallenges = response.data as StringChallenge[];
	this.challenges = stringChallenges;
	if(!this.gameSystem.getIsContinuous()){
	    this.setChallengeAudio(stringChallenges[this.i1].audioName);
	}else{
	    console.log("gameInit: continuous change audio");
	    this.continuousAudioChange();
	}

	this.textHolder.system?.addLetters(this.challenges);
	this.textHolder.system?.displayLetters(this.i1);
    }

    setChallengeAudio(audioName: string){
	const type = this.gameSystem?.getType();
	if(!type) throw new Error("gameSystem's type is undefined"); 
	if(!this.textAudio) throw new Error("textAudio is undefined");

	this.textAudio.system?.addAudioSource(audioName, type);
	// textAudio.system.addAudioSource(audioName, this.gameSystem.getType());
    }

    guessLetter(playerInput: string): void{
	if(!this.textHolder) throw new Error("textHolder is undefined");

	const challengeLetters = this.textHolder.system?.getStringChallengeLetters(); 
	if(!challengeLetters) throw new Error("challengeLetter is undefined")

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
	if(!this.textAudio) throw new Error("textAudio is undefined");

	letter.turnGreen();
	console.log("correct!");

	if( this.i2 != currentLetters.length-1){
	    if(currentLetters[this.i2].getChar == " "){
		this.textAudio.system?.ding();
	    }
	}else{
	    this.textAudio.system?.ding();
	}

	this.i2 += 1;
    }

    private wrong(letter: Letter){
	if(!this.textAudio) throw new Error("textAudio is undefined");
	if(!this.textHolder) throw new Error("textHolder is undefined");

	this.textAudio.system?.wrong();
	if(letter.getChar === " "){
	    letter.turnBackgroundRed();
	}else{
	    letter.turnRed();
	}
	this.textHolder.style.display = "flex";
	this.textHolder.system?.moveDown();
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
	if(!this.gameSystem) throw new Error("gameSystem is undefined");
	if(!this.textHolder) throw new Error("textHolder is undefined");

	this.i1 += 1;
	this.i2 = 0;
	this.textHolder.system?.displayLetters(this.i1);
	this.textHolder.system?.checkOverflow();
	this.textHolder.system?.moveDown();
	if(!this.gameSystem.getIsContinuous()){
	    this.setChallengeAudio(this.challenges[this.i1].audioName);
	}
	console.log("Line ended");
    }

    continuousAudioChange(){
	console.log("iContinuous: ", this.iContinuous);
	console.log("challengesLength: ", this.challenges.length);
	if(this.iContinuous < this.challenges.length){
	    console.log("Continue the audio change.");
	    this.setChallengeAudio(this.challenges[this.iContinuous].audioName);
	    this.iContinuous += 1;
	}
    }

    gameEnd(){
	if(!this.gameSystem) throw new Error("gameSystem is undefined");
	if(!this.textHolder) throw new Error("textHolder is undefined");
	if(!this.textAudio) throw new Error("textHolder is undefined");


	// this.textHolder.system.removeLetters();
	console.log("challenges: ", this.challenges);

	this.i1= 0;
	this.i2 = 0;
	this.iContinuous = 0;
	this.textAudio.system?.stopAudio();
	console.log("String game finished");
	this.textHolder.system?.removeChallengeLetters();
	this.textHolder.system?.moveDown();
	this.gameSystem.gameEnd();
    }

}



export default StringGame;


