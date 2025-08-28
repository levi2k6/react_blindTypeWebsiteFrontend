import { createElement } from "../ui_system/Element";


class Letter{

    letter = createElement("h1"); 

    createLetter(){
	let generatedNum = Math.floor(Math.random() * 20) + 57;
	let newLetter = String.fromCharCode(generatedNum);
	this.letter.innerText = newLetter;
    }
}

export default Letter;
