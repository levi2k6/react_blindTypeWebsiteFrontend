import System from "../../class/System";
import type { LetterChallenge } from "../../utils/interfaces";
import type GameRouter from "../component/GameRouter";
import type GameSystem from "./GameSystem";
import type Timer from "./Timer";


class LetterGame extends System{

    private gameRouter: GameRouter;
    private gameSystem: GameSystem;

    private timer: Timer;

    private challenges: LetterChallenge[] = [];
    i: number = 0;

    constructor(gameRouter: GameRouter, gameSystem: GameSystem, timer: Timer){
	super()
	this.gameRouter = gameRouter;
	this.gameSystem = gameSystem;
	this.timer = timer;
	this.timer.initLoseState(this.gameLose.bind(this));
    }

    gameInit(challenges: LetterChallenge[]){
	console.log("letter gameInit()");
	this.challenges = challenges;
	this.timer.startTimer();
	this.setChallengeAudio(this.challenges[this.i].text);
    }

    setChallengeAudio(audioName: string){
	this.gameRouter.textAudio.system.addAudioSource(audioName, this.gameSystem.getType());
    }	

    guessLetter(playerInput: string){
	console.log("this is working");
	console.log("playerInput: ", playerInput);
	console.log("chalenge: ", this.challenges[this.i].text);
	if(playerInput == this.challenges[this.i].text.toLowerCase()){
	    this.gameRouter.textAudio.system.ding();
	    this.timer.startTimer();
	    this.nextLetter();
	}else{
	    this.timer.stopTimer();
	    this.gameLose();
	    this.gameRouter.textAudio.system.wrong();
	}
    }

    nextLetter(){
	this.i += 1;
	this.setChallengeAudio(this.challenges[this.i].text);
	this.timer.startTimer();
    }

    gameLose(){
	this.i = 0;
	this.challenges = [];
	this.gameSystem.gameEnd();
    }

}


export default LetterGame;
