import { createElement } from "../../ui_system/Element";
import Component from "../Component";

class GameOptionButtons extends Component{

    letterButton: HTMLButtonElement = createElement("button", "Letter") as HTMLButtonElement;
    wordButton: HTMLButtonElement = createElement("button", "Word") as HTMLButtonElement;
    sentenceButton: HTMLButtonElement = createElement("button", "Button") as HTMLButtonElement;
    
    constructor(name: string){
	super(name);
	this.init();
    }

    init(){
	this.connectElements();
	this.styleElements();
    }

    connectElements(){
	this.addChildren([
	    this.letterButton,
	    this.wordButton,
	    this.sentenceButton
	]);
    }

    styleElements(){
	this.style.border = "1px solid black";
	this.style.display = "flex";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";
    }

}

export default GameOptionButtons;
