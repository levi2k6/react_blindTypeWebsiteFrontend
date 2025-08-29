import type Letter from "../../game_system/Letter";
import Component from "../Component";

class TextHolder extends Component{

    letters: Array<HTMLElement> = [];  

    displayLetters(){
	this.addChildren(this.letters);
    }

    removeLetters(){
	this.letters = [];
	while(this.self.firstChild){
	    this.self.removeChild(this.self.firstChild);
	}

    }

    addLetters(letters: Array<Letter>){
	letters.forEach(letter => {
	    this.letters.push(letter.self);
	})
	this.displayLetters();
    }
}

const textHolder = new TextHolder("TextHolder"); 

const styleElements = () => {
    const textHolderS = textHolder.style;
    textHolderS.background = "blue";
    textHolderS.width =  "80vw";
    textHolderS.height = "300px";
    textHolderS.display = "flex"; 
    textHolderS.justifyContent = "center";
    textHolderS.alignItems = "center";
    textHolderS.whiteSpace = "normal";
    textHolderS.overflowWrap = "break-word";
}


textHolder.init([
    styleElements
]);

export default textHolder;

