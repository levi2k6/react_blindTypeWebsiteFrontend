import type Box from "./Box";
import Box2 from "./Box2";
import Element from "./Element";
import FormComponent from "./FormComponent";
import InputBoxComponent from "./InputBoxComponent";
import InputComponent from "./InputComponent";
import SelectComponent from "./Select";
import SelectBoxComponent from "./SelectBoxComponent";

class FormFactory{
    private registerForm: Element;
    private inputDiv: Box2;
    private submitButton: Element;

    public constructor(name: string){
	this.registerForm = new Element("form", name);
	this.inputDiv = new Box2("inputDiv");
	this.submitButton = new Element("button", "submitButton", "Submit");
    }

    public addInput(name: string, type: string): FormFactory{
	const inputBoxComponent: InputBoxComponent = new InputBoxComponent(name, type);
	
	this.inputDiv.addChildren([
	    inputBoxComponent
	]);

	return this;
    } 

    public addSelect(name: string, options: Array<string>): FormFactory{
	const selectBoxComponent: SelectBoxComponent = new SelectBoxComponent(name, options);

	this.inputDiv.addChildren([
	    selectBoxComponent
	])

	return this;
    } 

    public build(): Element{
	return this.registerForm.addChildren([
	    this.inputDiv,
	    this.submitButton
	])
    };

} 

export default FormFactory;
