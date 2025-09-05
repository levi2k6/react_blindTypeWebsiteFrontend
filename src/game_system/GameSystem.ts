import Game from "../routes/game";
import StringGame from "./StringGame";

class GameSystem{

    private game: Game;

    private type : string = "";
    private stringGame: StringGame;

    // private letters: Array<Letter> = [];

    constructor(game: Game){
	this.game = game;
	this.stringGame = new StringGame(this.game, this);
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
	console.log("game finished");
	this.type = "";
	this.game.getTextHolder().style.display = "none";
	this.game.getTextHolder().removeLetters();
	this.game.startButton.disabled = false;
    }

    getType(){
	return this.type;
    }
    getStringGame(){
	return this.stringGame;
    }

} 

export default GameSystem;
