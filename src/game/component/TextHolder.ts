import Component from "../../class/Component";
import TextHolderSystem from "../system/TextHolderSystem";

class TextHolder extends Component{

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

