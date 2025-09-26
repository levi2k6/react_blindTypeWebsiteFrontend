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
	// this.textHolder.style.display = "none";
    }

    displayWrongLetter(letter: string){
	const wrongLetter = new Letter(letter);
	wrongLetter.turnRed();
	this.textHolder.addChild(wrongLetter);
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
	console.log("removed visual letters()");
	console.log("textHolderChildren: ", this.textHolder.self.children);

	// for(let i = 0; i < this.textHolder.self.children.length; i++){
	//     console.log("This worked");
	//     this.textHolder.self.children[i].remove();
	// }

	while(this.textHolder.self.firstChild){
	    console.log("does this even work?");
	    console.log(this.textHolder.self.firstChild);
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
