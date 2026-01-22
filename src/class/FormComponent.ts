import { createElement } from "../ui_system/Element";
import Box2 from "./Box2";
import Component2 from "./Component2";
import Element from "./Element";
import type InputBoxComponent from "./InputBoxComponent";
import type SelectBoxComponent from "./SelectBoxComponent";

class FormComponent extends Component2{

    private inputs: Map<string, InputBoxComponent | SelectBoxComponent> = new Map();
    private inputDiv: Box2;

    public constructor(name: string, innerText?: string){
	const element = createElement("form");
	if(name && innerText){
	    super(element, name, innerText);
	}else{
	    super(element, name)
	}	   
	this.inputDiv = new Box2("inputDiv");
    }

    public addInput( input : InputBoxComponent | SelectBoxComponent ): Component2{

	if(this.inputs.has(input.getName())){
	    throw new Error(`Duplicate input name: ${input.getName()}`)
	}

	this.inputs.set(input.getName(), input);

		//    if(child.parent){
		// throw new Error(`child "${child.name}" already has a parent named "${child.parent}"`)
		//    }
		//
		//    child.setParent(this);
		//    this.children.set(child.name, child); 

	return this;
    }

    override initSystems(): void{
    }

    override initElements(): void {
    }

    override structureElements(): Array< Component2>{
	const inputDiv = this.inputDiv;

	return [
	    inputDiv
	];
    }

    override eventElements(): void {
    }

    override styleElements(): void {
    }


}

export default FormComponent;



