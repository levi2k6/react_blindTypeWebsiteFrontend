import Box from "../../class/Box";
import TextHolderSystem from "../system/component_system/TextHolderSystem";

class TextHolder extends Box{

    textHoldersystem: TextHolderSystem = new TextHolderSystem(this);

     constructor(name: string){
	 super(name);
	 this.init();
     }

     get system(){
	 return this.textHoldersystem;
     }

    override initElements(){};

    override connectElements(){}

    override eventElements(){}

    override styleElements(){
	console.log("TextHolder styleElements()");
	this.style.marginTop = "10px";
	this.style.background = "linear-gradient(to bottom, #1a1a1a 0%, transparent 10%,transparent 10%, transparent 50%, transparent 90%, transparent 90%, #1a1a1a 100%)";
	this.style.width = "100vw";
	this.style.height = "400px";
	this.style.minHeight = "300px"; 
	this.style.display = "flex"; 
	// this.style.visibility = "hidden";

	this.style.flexDirection = "column";
	this.style.overflowY = "auto";
	this.style.justifyContent = "center"; 
	this.style.alignItems = "center";
	this.style.whiteSpace = "normal";
    }
}

export default TextHolder;

