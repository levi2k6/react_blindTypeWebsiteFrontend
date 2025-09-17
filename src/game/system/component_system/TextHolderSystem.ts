import type { Challenge } from "../../../utils/interfaces";
import TextHolder from "../../component/TextHolder";
import Box from "../../../class/Box";
import Letter from "../../component/Letter";

class TextHolderSystem{

    private textHolder: TextHolder; 

    private challengeLetters: Array<Letter[]> = [];  

    constructor(textHolder: TextHolder){
	this.textHolder = textHolder;
    }

    reset(){
	this.textHolder.system.removeVisualLetters();
	this.textHolder.style.display = "none";
    }

    addLetter(challenge: Challenge){
	console.log("challenege add letter: ", this.challengeLetters);
	const letters = [];
	const letter = new Letter(challenge.text);
	letters.push(letter);
	this.challengeLetters.push(letters);
	console.log("challenege add letter: ", this.challengeLetters);
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
	    this.challengeLetters.push(letters);
	})
    }

    displayLetters(i: number){
	const div = new Box("DivLine");
	div.addChildren(this.challengeLetters[i]);
	div.style.border = "1px solid green";
	div.style.display = "flex";
	div.style.flexShrink = "0";
	this.textHolder.addChild(div);
    }

    removeChallengeLetters(){
	this.challengeLetters = [];
    }

    removeVisualLetters(){
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

    getChallengeLetters(){
	return this.challengeLetters;
    }
}

export default TextHolderSystem; 
