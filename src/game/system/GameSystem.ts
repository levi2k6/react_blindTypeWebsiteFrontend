import type GameRouter from "../component/GameRouter";
import StringGame from "./StringGame";


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

    init(texts: string, type: string){
	this.type = type;
	if(type == "sentence"){
	    this.stringGame?.addLetters(texts);
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
