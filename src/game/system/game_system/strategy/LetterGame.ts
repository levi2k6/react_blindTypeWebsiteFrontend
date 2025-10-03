import GameRouter from "../../../component/GameRouter";
import GameSystem from "../GameSystem";
import Timer from "../../Timer";

import Game from "./Game";
import type TextHolder from "../../../component/TextHolder";
import LetterChallengeGenerator from "./LetterChallengeGenerator";
import type GameConfigManager from "../../game_config/GameConfigManager";

class LetterGame extends Game{

    private letterChallengeGenerator: LetterChallengeGenerator = new LetterChallengeGenerator(); 

    private name: string = "LetterGame";
    private gameRouter: GameRouter;
    private textHolder: TextHolder;
    private gameSystem: GameSystem;
    private gameConfigManager: GameConfigManager;

    private timer: Timer;

    private challenges: string[] = [];
    i: number = 0;
    iContinuous: number = 0;

    constructor(gameRouter: GameRouter, gameSystem: GameSystem, gameConfigManager: GameConfigManager, timer: Timer){
	super()
	this.gameRouter = gameRouter;
	this.textHolder = gameRouter.textHolder;
	this.gameSystem = gameSystem;
	this.gameConfigManager = gameConfigManager
	this.timer = timer;
	this.timer.initLoseState(this.gameLose.bind(this));
	console.log("LetterGame");
    }

    gameReset(): void {
    }

    getName(): string{
	return this.name;
    }

    gameInit(){
	console.log("letter gameInit()");

	const multiple = this.gameConfigManager.getGameConfigMultiple();
	if(!multiple){
	    console.log("LetterGameConfig has no multiple has no data");
	    return;
	}

	this.letterChallengeGenerator.generateLetters(multiple);

	for(const letter of this.letterChallengeGenerator.getChallenge()){
	    this.challenges.push(letter.toUpperCase());
	};

	this.timer.startTimer();
	if(!this.gameSystem.getIsContinuous()){
	    this.setChallengeAudio(this.challenges[this.i]);
	}else{
	    this.continuousAudioChange();
	}
    }

    setChallengeAudio(audioName: string){
	this.gameRouter.textAudio.system.addAudioSource(audioName, this.gameSystem.getType());
    }	

    guessLetter(playerInput: string){
	console.log("i: ", this.i);

	if(playerInput == this.challenges[this.i].toLowerCase()){
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
	if(!this.gameSystem.getIsContinuous()){
	    this.setChallengeAudio(this.challenges[this.i]);
	}
	this.timer.startTimer();
	console.log("letter: ", this.challenges[this.i]);
    }

    continuousAudioChange(){
	console.log("iContinuous: ", this.iContinuous);
	console.log("challengesLength: ", this.challenges.length);
	if(this.iContinuous < this.challenges.length){
	    console.log("Continue the audio change.");
	    this.setChallengeAudio(this.challenges[this.iContinuous]);
	    this.iContinuous += 1;
	}
    }

    gameLose(){
	console.log("game wrong");
	this.textHolder.system.displayWrongLetter(this.challenges[this.i]);
	this.gameEnd();
    }

    gameEnd(){
	console.log("game ended");
	this.timer.stopTimer();
	this.textHolder.system.removeChallengeLetters();
	this.letterChallengeGenerator.setChallenge("");
	this.challenges = [];
	this.i = 0;
	this.iContinuous = 0;
	this.gameSystem.gameEnd();
	console.log("Letter gameEnd");
    }
}


export default LetterGame;
