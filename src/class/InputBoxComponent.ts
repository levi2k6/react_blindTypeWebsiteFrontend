import Box2 from "./Box2";
import type Component2 from "./Component2";
import Element from "./Element";
import InputComponent from "./InputComponent";

class InputBoxComponent extends Box2{

    private inputLabelDiv: Box2;
    private label: Element;  
    private input: InputComponent; 

    public constructor(name: string, type: string){
	super(`${name}Div`);
	this.inputLabelDiv = new Box2(`${name}LabelDiv`);
	this.label = new Element("label", `${name}Label`, this.capitalizeLabel(name));  
	console.log("inputLabel name: ", this.label.getName());
	this.input = new InputComponent(`${name}Input`, type); 
	console.log("input name: ", this.input.getName());
    };

    public getLabel(): Element{
	return this.label;
    };

    public getInput(): InputComponent{
	return this.input;
    } 

    private capitalizeLabel(s: string): string {
      const [first, ...rest] = [...s]
      return first ? first.toLocaleUpperCase() + rest.join("") : s
    }

    override structureElements(): Array<Component2> {
	const inputLabelDiv = this.inputLabelDiv;
	console.log("InputBoxComponent structureElements: ", this.getName());
	    const inputLabel = this.label;
	const input = this.input;

 	return [ 
	    inputLabelDiv.addChildren([
		inputLabel
	    ]),
	    input
	]
       
    }

}

export default InputBoxComponent;

