import type GameRouter from "../component/GameRouter";
import StringGame from "./StringGame";

import type { Challenge, LetterChallenge } from "../../utils/interfaces";
import LetterGame from "./LetterGame";


class GameSystem{

    private gameRouter: GameRouter;

    private type : string = "";
    private gameState: boolean = false;
    private stringGame: StringGame;
    private letterGame: LetterGame; 

    constructor(gameRouter: GameRouter){
	this.gameRouter = gameRouter;
	this.stringGame = new StringGame(this.gameRouter, this);
	this.letterGame = new LetterGame(this.gameRouter, this);
    }

    test(){
	console.log("test");
    };

    init(challenges: Challenge[]){
	this.gameState = true; 
	if(this.type == "sentence" || "word"){
	    this.stringGame?.gameInit(challenges, this.type);
	}else if(this.type == "word"){
	    this.letterGame?.gameInit(challenges as LetterChallenge[]);
	}

    }

    gameInput(playerInput: string){
	if(this.type == "sentence"){
	    this.stringGame?.guessLetter(playerInput);
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
