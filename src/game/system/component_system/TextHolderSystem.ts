import type { Challenge } from "../../../utils/interfaces";
import TextHolder from "../../component/TextHolder";
import Letter from "../../component/Letter";
import Box2 from "../../../class/Box2";
import type LifeCycleSystem from "../../../systems/LifeCycleSystem";
import type Component2 from "../../../class/Component2";

class TextHolderSystem{

    private lifeCycleSystem: LifeCycleSystem;
    private textHolder: TextHolder; 

    private challengeLetters: Array<Letter[]> = [];  

    constructor(textHolder: TextHolder, lifeCycleSystem: LifeCycleSystem){
	this.textHolder = textHolder;
	this.lifeCycleSystem = lifeCycleSystem; 
    }

    reset(){
	if(!this.textHolder) throw new Error("textHolder is undefined");

	this.removeVisualLetters();
	// this.textHolder.style.display = "none";
    }

    displayWrongLetter(letter: string){
	const wrongLetter = new Letter("wrongLetter", letter);
	wrongLetter.turnRed();
	this.lifeCycleSystem.updateComponent(this.textHolder, [wrongLetter]);
    }

    addLetters(challenges: Challenge[]){
	console.log("addLetter()");
	challenges.forEach(challenge => {
	    const letters = [];
	    for(let i = 0; i < challenge.text.length; i++){
		const name = `letter${i}`
		const letter = new Letter(name, challenge.text[i]);
		if(letter.self.innerText == " "){
		    letter.self.innerHTML = "&nbsp;";
		}
		letters.push(letter);
	    }
	    this.challengeLetters.push(letters);
	})
	console.log("challengeLetter): ", this.challengeLetters);
	
    }

    displayLetters(i: number){
	const div = new Box2(`divLine${i}`);
	div.addChildren(this.challengeLetters[i]);
	// div.style.border = "1px solid green";
	div.style.display = "flex";
	div.style.flexShrink = "0";
	this.lifeCycleSystem.updateComponent(this.textHolder, [div]);
    }

    removeChallengeLetters(){
	this.challengeLetters = [];
	this.lifeCycleSystem.clearComponent(this.textHolder);
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

    getStringChallengeLetters(){
	console.log("getStringChallengeLetters: ", this.challengeLetters);
	return this.challengeLetters;
    }

    checkOverflow(){
	const div = this.textHolder.self;
	const hasOverflow = div.scrollHeight > div.clientHeight;
	if(hasOverflow){
	    div.style.justifyContent = "flex-start";
	}else{
	    div.style.justifyContent = "center";
	}
    }

    moveDown(){
	const div = this.textHolder.self;
	div.scrollTop = div.scrollHeight;
    }
}

export default TextHolderSystem; 
