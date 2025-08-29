import { createElement } from "../ui_system/Element";


class Letter{

    private letter = createElement("h1"); 

    get self(){
	return this.letter;
    }

    constructor(){
	const generatedNum = Math.floor(Math.random() * 26) + 97; 
	let newLetter = String.fromCharCode(generatedNum);
	this.letter.innerText = newLetter;
    }

    turnGreen(){
	this.letter.style.color = "green";
    }

    turnRed(){
	this.letter.style.color = "red";
    }
}

export default Letter;
