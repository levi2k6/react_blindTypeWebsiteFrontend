import type Letter from "../../game_system/Letter";
import Component from "../Component";

class TextLine{

    letters: Array<HTMLElement> = [];  

    constructor(letters: Array<Letter>){
	    letters.forEach(letter => {
		if(letter.self.innerText == " "){
		    letter.self.innerHTML = "&nbsp;";
		}
		this.letters.push(letter.self);
	    })
	    this.addChildren(this.letters);
    }

}


class TextHolder extends Component{

    letters: Array<HTMLElement> = [];  

     constructor(name: string){
	 super(name);
	 this.init();
     }

     init(){
	 this.styleElements();
     }


    addLetters(letters: Array<Letter>){
	letters.forEach(letter => {
	    if(letter.self.innerText == " "){
		letter.self.innerHTML = "&nbsp;";
	    }
	    this.letters.push(letter.self);
	})
	this.addChildren(this.letters);
    }

    removeLetters(){
	this.letters = [];
	while(this.self.firstChild){
	    this.self.removeChild(this.self.firstChild);
	}
    }

    toggleVisibility(){
	if(this.style.display == "none"){
	    this.style.display = "flex"; 
	}else{
	    this.style.display = "none";
	}
    }



    styleElements(){
	const textHolderS = this.style;
	textHolderS.background = "blue";
	textHolderS.width =  "80vw";
	textHolderS.height = "300px";
	textHolderS.display = "none"; 
	textHolderS.flexWrap = "wrap";
	textHolderS.justifyContent = "center";
	textHolderS.alignItems = "center";
	textHolderS.whiteSpace = "normal";
	textHolderS.gap = "2px";
    }
}




export default TextHolder;

