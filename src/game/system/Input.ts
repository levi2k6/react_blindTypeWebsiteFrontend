import type GameRouter from "../component/GameRouter";
import GameSystem from "./GameSystem";

class Input{

    private gameRouter: GameRouter; 
    private gameSystem: GameSystem;
    private key : string = "";

    constructor(gameRouter: GameRouter, gameSystem: GameSystem){
	this.gameRouter = gameRouter;
	this.gameSystem = gameSystem;
	console.log("look here gameSystem: ", gameSystem );
    }

    getKey(){
	return this.key;
    }

    turnOnInput(){
	window.addEventListener("keydown", this.keydownHandler.bind(this) );
	console.log("Input turned on.");
    }

    keydownHandler = (e : KeyboardEvent) =>{
	if(e.key === "Shift"){
	    console.log("Invalid input");
	    return;
	};

	if(e.key == "Enter"){
	    if(!this.gameSystem.getType()){
		return;
	    }
	    this.gameRouter.system.startGame();
	    this.gameSystem.isGaming = true;
	    return;
	}

	if( /^[a-z0-9 ]$/.test(e.key) && this.gameSystem.isGaming){
	    this.key = e.key
	    // console.log("input: ", this.key);
	    this.gameSystem.gameInput(this.key);
	    // this.gameSystem.gameInput(this.key);
	}
    }

    turnOffInput(){
	window.removeEventListener("keydown", this.keydownHandler);
	console.log("Input turned off.");
    }
}


export default Input;
