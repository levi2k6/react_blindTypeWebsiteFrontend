import type GameRouter from "../component/GameRouter";
import StringGame from "./StringGame";

import type { Challenge } from "../../utils/interfaces";


class GameSystem{

    private gameRouter: GameRouter;

    private type : string = "";
    private gameState: boolean = false;
    private stringGame: StringGame;

    constructor(gameRouter: GameRouter){
	this.gameRouter = gameRouter;
	this.stringGame = new StringGame(this.gameRouter, this);
    }

    test(){
	console.log("test");
    };

    init(challenges: Challenge[]){
	this.gameState = true; 
	if(this.type == "sentence"){
	    this.stringGame?.gameInit(challenges);
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
