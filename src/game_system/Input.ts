
class Input{

    key : string = "";

    turnOnInput(){
	window.addEventListener("keydown", this.keydownHandler);
	console.log("Input turned on.");
    }

    keydownHandler(e : KeyboardEvent){
	this.key = e.key;
	console.log("input: ", this.key);
    }

    turnOffInput(){
	window.removeEventListener("keydown", this.keydownHandler);
	console.log("Input turned off.");
    }
}

const input = new Input(); 

export default input;
