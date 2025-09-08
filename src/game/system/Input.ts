import GameSystem from "./GameSystem";

class Input{

    private gameSystem: GameSystem;
    private key : string = "";

    constructor(gameSystem: GameSystem){
	this.gameSystem = gameSystem;
    }

    getKey(){
	return this.key;
    }

    turnOnInput(){
	window.addEventListener("keydown", this.keydownHandler);
	console.log("Input turned on.");
    }

    keydownHandler = (e : KeyboardEvent) =>{
	if(e.key === "Shift"){
	    console.log("Invalid input");
	    return;
	};

	this.key = e.key;
	// console.log("input: ", this.key);
	this.gameSystem.gameInput(this.key);
	// this.gameSystem.gameInput(this.key);
    }

    turnOffInput(){
	window.removeEventListener("keydown", this.keydownHandler);
	console.log("Input turned off.");
    }
}


export default Input;
