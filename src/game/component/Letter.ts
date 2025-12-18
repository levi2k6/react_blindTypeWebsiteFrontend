import Box2 from "../../class/Box2";
import { createElement } from "../../ui_system/Element";

class Letter extends Box2{

    private char: string;
    private letter = createElement("h1"); 

    get self(){
	return this.letter;
    }

    get getChar(){
	return this.char;
    }

    constructor(name: string, letter: string){
	super(name);
	this.char = letter;
	// console.log("char: ", this.char);
	this.letter.innerText = letter;
    }

    turnGreen(){
	this.letter.style.color = "#00bd33";
    }

    turnRed(){
	this.letter.style.color = "#cd0043";
    }

    turnBackgroundRed(){
	this.letter.style.backgroundColor = "#cd0043";
    }

    styleElements(){
	this.style.border = "1px solid green";
	this.letter.style.color = "#d3d3d3";
    }

}
export default Letter;
