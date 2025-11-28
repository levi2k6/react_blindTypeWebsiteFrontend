import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";

class GameConfigModalInput extends Box{

    label = createElement("label"); 
    input: HTMLInputElement = createElement("input") as HTMLInputElement;

    constructor(labelText: string){
	super();
	this.label.innerText = labelText + ": ";
    }

    override initElements(): void{
    }

    override connectElements(): void {
	this.addChildren([
	    this.label,
	    this.input
	])
    }

    override eventElements(): void {
	
    }

    override styleElements(): void {
	this.style.border = "1px solid red";
	this.style.display = "flex";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";
	this.style.gap = "20px";
	this.input.type = "number";
	this.input.style.width = "35px";

    }
}

export default GameConfigModalInput;

