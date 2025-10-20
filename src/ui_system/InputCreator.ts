import Box from "../class/Box";
import { createElement } from "./Element";

class InputElementCreator{

    divBorder: string = "";
    divHeight: string = "";
    divWidth: string = "";


    setDivBorder(divBorder: string){
	this.divBorder = divBorder;
	return this;
    }
    setDivHeight(divHeight: string){
	this.divHeight = divHeight;
	return this;
    }
    setDivWidth(divWidth: string){
	this.divWidth = divWidth;
	return this;
    }

    private inputDiv(): Box{
	const div = new Box();

	div.style.border = this.divBorder;
	div.style.height = this.divHeight;
	div.style.width = this.divWidth;
	return div;
    }

    createLabel(labelName: string): Box{
	const div = this.inputDiv();
	const label = createElement("label"); 
	label.innerText = labelName;
	div.addChild(label);
	return div;
    }

    createInput(inputType: string): Box{
	const div = this.inputDiv();
	const input = createElement("input") as HTMLInputElement; 
	input.type = inputType;
	div.addChild(input);
	return div;
    }

    createSelect(optionData: Array<string>): Box{
	const div = this.inputDiv();
	const select = createElement("select");
	optionData.forEach(optionDatum => {
	    const optionElement = createElement("option", optionDatum) as HTMLSelectElement; 
	    optionElement.value = optionDatum; 
	    select.appendChild(optionElement);
	})
	div.addChild(select);
	return div;
    }
}

export default InputElementCreator;

