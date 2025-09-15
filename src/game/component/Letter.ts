import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";

class Letter extends Box{

    private char: string;
    private letter = createElement("h1"); 

    get self(){
	return this.letter;
    }

    get getChar(){
	return this.char;
    }

    constructor(letter: string){
	super();
	this.char = letter;
	// console.log("char: ", this.char);
	this.letter.innerText = letter;
    }

    turnGreen(){
	this.letter.style.color = "green";
    }

    turnRed(){
	this.letter.style.color = "red";
    }

    turnBackgroundRed(){
	this.letter.style.backgroundColor = "red";
    }
}

export default Letter;
