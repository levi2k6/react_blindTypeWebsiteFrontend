import { createElement } from "../ui_system/Element";
import Component2 from "./Component2";
import Element from "./Element";

class SelectComponent extends Component2{

    private options: Array<string>

    constructor(name: string, options: Array<string>){
	const element = createElement("select");
	super(element, name);
	this.options = options;
	this.addOptions();
    }

    private addOptions(): void{
	this.options.forEach(option => {
	    console.log("option: ", option);
	    const optionComponent = new Element("option", option); 
	    const optionSelf = optionComponent.self as HTMLSelectElement; 
	    optionSelf.value = option;
	    optionSelf.innerText = option;
	    this.addChildren([optionComponent]);
	})
    }

    override initSystems(): void {
    }

    override initElements(): void {
    }

    override structureElements(): Array<Component2>{
	return [];
    }

    override eventElements(): void {
    }

    override styleElements(): void {
    }


}

export default SelectComponent;
