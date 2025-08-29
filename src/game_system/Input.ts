import gameSystem from "./GameSystem";

class Input{

    private key : string = "";

    getKey(){
	return this.key;
    }

    turnOnInput(){
	window.addEventListener("keydown", this.keydownHandler);
	console.log("Input turned on.");
    }

    keydownHandler(e : KeyboardEvent){
	this.key = e.key;
	console.log("input: ", this.key);
	gameSystem.game(this.key);
    }

    turnOffInput(){
	window.removeEventListener("keydown", this.keydownHandler);
	console.log("Input turned off.");
    }
}

const input = new Input(); 

export default input;
