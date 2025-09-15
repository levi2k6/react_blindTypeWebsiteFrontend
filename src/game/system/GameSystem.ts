import type GameRouter from "../component/GameRouter";

import StringGame from "./games/StringGame";
import LetterGame from "./games/LetterGame";

import type { Challenge, LetterChallenge } from "../../utils/interfaces";
import Timer from "./Timer";
import GameManager from "./games/GameManager";


class GameSystem{

    private gameRouter: GameRouter;

    private type : string = "";
    private gameState: boolean = false;

    private timer: Timer = new Timer(); 

    private gameManager: GameManager = new GameManager();
    // private stringGame: StringGame;
    // private letterGame: LetterGame; 

    constructor(gameRouter: GameRouter){
	this.gameRouter = gameRouter;
	this.gameManager.addGame(new StringGame(this.gameRouter, this));
	this.gameManager.addGame(new LetterGame(this.gameRouter, this, this.timer));
	// this.stringGame = new StringGame(this.gameRouter, this);
	// this.letterGame = new LetterGame(this.gameRouter, this, this.timer);
    }

    test(){
	console.log("test");
    };

    init(challenges: Challenge[]){
	this.gameState = true; 
	if(this.type == "sentence" || this.type =="word"){
	    this.stringGame?.gameInit(challenges);
	}else if(this.type == "letter"){
	    this.letterGame?.gameInit(challenges as LetterChallenge[]);
	}
    }

    gameInput(playerInput: string){
	console.log("type: ", this.type);
	if(this.type == "sentence" || this.type == "word"){
	    this.stringGame?.guessLetter(playerInput);
	}else if(this.type == "letter"){
	    this.letterGame?.guessLetter(playerInput);
	}
    }  

    gameEnd(){
	this.gameRouter.textHolder.style.display = "flex";
	this.gameRouter.startButton.disabled = false;
	this.gameState = false; 
	this.gameRouter.div1.style.display = "flex";
	// this.gameRouter.system.getInput().turnOffInput();
    }

    getType(){
	return this.type;
    }
    get isGaming(){
	return this.gameState;
    }
    set isGaming(gameState: boolean){
	this.gameState = gameState;
    }
    setType(type: string){
	this.type = type;
    }
    getStringGame(){
	return this.stringGame;
    }

} 

export default GameSystem;
