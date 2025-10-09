import Box from "../../class/Box";
import type { Component } from "../../class/Component";
import TextHolderSystem from "../system/component_system/TextHolderSystem";

class TextHolder extends Box implements Component{

    textHoldersystem: TextHolderSystem = new TextHolderSystem(this);

     constructor(name: string){
	 super(name);
	 this.init();
     }

     get system(){
	 return this.textHoldersystem;
     }

     init(){
	 this.styleElements();
     }

    initElements(){};

    connectElements(){}

    eventElements(){}

    styleElements(){
	this.style.marginTop = "20px";
	// this.style.background = "blue";
	this.style.width = "80vw";
	this.style.height = "400px";
	this.style.minHeight = "300px"; 
	this.style.display = "flex"; 
	this.style.flexDirection = "column";
	this.style.overflowY = "auto";
	this.style.justifyContent = "center"; 
	this.style.alignItems = "center";
	this.style.whiteSpace = "normal";
	this.style.gap = "2px";
    }
}

export default TextHolder;

