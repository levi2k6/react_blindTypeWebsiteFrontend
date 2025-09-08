import type GameRouter from "../component/GameRouter";
import StringGame from "./StringGame";

import type { Challenge } from "../../utils/interfaces";


class GameSystem{

    private gameRouter: GameRouter;

    private type : string = "";
    private stringGame: StringGame;

    constructor(gameRouter: GameRouter){
	this.gameRouter = gameRouter;
	this.stringGame = new StringGame(this.gameRouter, this);
    }

    test(){
	console.log("test");
    };

    init(challenges: Challenge[]){
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
	this.gameRouter.system.gameEnd();
    }

    getType(){
	return this.type;
    }
    setType(type: string){
	this.type = type;
    }
    getStringGame(){
	return this.stringGame;
    }

} 

export default GameSystem;
