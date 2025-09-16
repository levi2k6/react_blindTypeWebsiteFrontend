import type { Challenge } from "../../../utils/interfaces";
import TextHolder from "../../component/TextHolder";
import Box from "../../../class/Box";
import Letter from "../../component/Letter";

class TextHolderSystem{

    textHolder: TextHolder; 

    challengesLetters: Array<Letter[]> = [];  

    constructor(textHolder: TextHolder){
	this.textHolder = textHolder;
    }

    addLetters(challenges: Challenge[]){
	challenges.forEach(challenge => {
	    const letters = [];
	    for(let i = 0; i < challenge.text.length; i++){
		const letter = new Letter(challenge.text[i]);
		if(letter.self.innerText == " "){
		    letter.self.innerHTML = "&nbsp;";
		}
		letters.push(letter);
	    }
	    this.challengesLetters.push(letters);
	})
    }

    displayLetters(i: number){
	const div = new Box("DivLine");
	div.addChildren(this.challengesLetters[i]);
	div.style.border = "1px solid green";
	div.style.display = "flex";
	div.style.flexShrink = "0";
	this.textHolder.addChild(div);
    }

    removeLetters(){
	this.challengesLetters = [];
	while(this.textHolder.self.firstChild){
	    this.textHolder.self.removeChild(this.textHolder.self.firstChild);
	}
    }

    toggleVisibility(){
	if(this.textHolder.style.display == "none"){
	    this.textHolder.style.display = "flex"; 
	}else{
	    this.textHolder.style.display = "none";
	}
    }

}

export default TextHolderSystem; 
