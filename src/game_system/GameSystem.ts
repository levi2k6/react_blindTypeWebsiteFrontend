import GameRouter from "../routes/GameRouter";
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

    queueTextLine(){

    }

    gameStart(){

    }

    gameInput(playerInput: string){
	if(this.type == "sentence"){
	    this.stringGame?.guessLetter(playerInput);
	} 
    }  

    gameEnd(){
	console.log("game finished");
	this.type = "";
	this.gameRouter.getTextHolder().style.display = "none";
	this.gameRouter.getTextHolder().removeLetters();
	this.gameRouter.startButton.disabled = false;
    }

    getType(){
	return this.type;
    }
    getStringGame(){
	return this.stringGame;
    }

} 

export default GameSystem;
