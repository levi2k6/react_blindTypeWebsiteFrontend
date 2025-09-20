import GameRouter from "../../../component/GameRouter";
import GameSystem from "../GameSystem";
import Timer from "../../Timer";

import type { LetterChallenge } from "../../../../utils/interfaces";
import Game from "./Game";
import type TextHolder from "../../../component/TextHolder";

class LetterGame extends Game{

    private name: string = "LetterGame";
    private gameRouter: GameRouter;
    private textHolder: TextHolder;
    private gameSystem: GameSystem;

    private timer: Timer;

    private challenges: LetterChallenge[] = [];
    i: number = 0;

    constructor(gameRouter: GameRouter, gameSystem: GameSystem, timer: Timer){
	super()
	this.gameRouter = gameRouter;
	this.textHolder = gameRouter.textHolder;
	this.gameSystem = gameSystem;
	this.timer = timer;
	this.timer.initLoseState(this.gameLose.bind(this));

    }

    gameReset(): void {
    }

    getName(): string{
	return this.name;
    }

    gameInit(challenges: LetterChallenge[]){
	console.log("letter gameInit()");
	this.challenges = challenges;
	this.timer.startTimer();
	this.setChallengeAudio(this.challenges[this.i].text);
	console.log("challenges: ", this.challenges);
	console.log("letter: ", this.challenges[this.i].text);
    }

    setChallengeAudio(audioName: string){
	this.gameRouter.textAudio.system.addAudioSource(audioName, this.gameSystem.getType());
    }	

    guessLetter(playerInput: string){
	console.log("i: ", this.i);

	if(playerInput == this.challenges[this.i].text.toLowerCase()){
	    this.gameRouter.textAudio.system.ding();
	    this.timer.startTimer();
	    this.nextLetter();
	}else{
	    this.timer.stopTimer();
	    this.gameRouter.textAudio.system.wrong();
	    this.gameLose();
	}
    }

    nextLetter(){
	if(this.challenges.length-1 == this.i){
	    this.gameEnd();
	    return;
	}

	this.i += 1;
	this.setChallengeAudio(this.challenges[this.i].text);
	this.timer.startTimer();
	console.log("letter: ", this.challenges[this.i].text);
    }

    gameLose(){
	console.log("game wrong");
	this.textHolder.system.displayWrongLetter(this.challenges[this.i].text);
	this.gameEnd();
    }

    gameEnd(){
	console.log("game ended");
	this.timer.stopTimer();
	this.textHolder.system.removeChallengeLetters();
	this.challenges = [];
	this.i = 0;
	this.gameSystem.gameEnd();
    }


}


export default LetterGame;
