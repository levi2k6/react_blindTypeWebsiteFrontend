import { createElement } from "../ui_system/Element";
import Component2 from "./Component2";

class InputComponent extends Component2{

    public constructor(name: string, type: string){
	const element = createElement("input") as HTMLInputElement; 
	element.type = type;
	super(element, name);
    }

    override initSystems(){
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

export default InputComponent;
