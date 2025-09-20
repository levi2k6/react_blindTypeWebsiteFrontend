import type { Component } from "../../class/Component";
import Box from "../../class/Box";
import GameConfigModalInput from "./GameConfigModalInput";

class GameConfigModal extends Box implements Component{

    diffcultyInput = new GameConfigModalInput("Difficulty");
    multipleInput = new GameConfigModalInput("Multiple");
    continuousInput = new GameConfigModalInput("Continuous");

    constructor(){
	super();
	this.init();
    }

    init(){
	this.connectElements();
	this.functionElements();
	this.styleElements();
    }

    connectElements(): void {
	this.addChildren([
	    this.diffcultyInput,
	    this.multipleInput,
	    this.continuousInput
	])
    }

    functionElements(): void {

	const children = this.self.children;
	console.log("all the children: ", this.self.children);
	for(let i = 0; i < children.length; i++){
	    console.log(children[i]);
	}

    }

    styleElements(): void {
	this.style.height = "400px";
	this.style.width = "400px";
	this.style.border = "1px solid green";
	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

    }

}

export default GameConfigModal;

