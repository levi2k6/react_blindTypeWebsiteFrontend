import type TextHolder from "../component/TextHolder";
import Letter from "./Letter";

class TextHolderSystem{

    textHolder: TextHolder; 

    letters: Array<HTMLElement> = [];  

    constructor(textHolder: TextHolder){
	this.textHolder = textHolder;
    }

    addLetters(letters: Array<Letter>){

	letters.forEach(letter => {
	    if(letter.self.innerText == " "){
		letter.self.innerHTML = "&nbsp;";
	    }
	    this.letters.push(letter.self);
	})
	this.textHolder.addChildren(this.letters);
    }

    removeLetters(){
	this.letters = [];
	while(this.textHolder.self.firstChild){
	    this.textHolder.self.removeChild(this.textHolder.self.firstChild);
	}
    }

    toggleVisibility(){
	if(this.textHolder.style.display == "none"){
	    this.textHolder.style.display = "flex"; 
	}else{
	    this.style.display = "none";
	}
    }

}

export default TextHolderSystem; 
