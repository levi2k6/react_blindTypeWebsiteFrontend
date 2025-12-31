import { createElement } from "../ui_system/Element";
import Component2 from "./Component2";

class Element extends Component2{

    public constructor(elementType: string, name: string, innerText?: string){
	const element = createElement(elementType);
	if(elementType && name && innerText){
	    super(element, name, innerText);
	}else if(elementType && name){
	    super(element, name)
	}	

    }

    override structureElements(): Array<Component2> {
	return [];
    }

    override initSystems(): void{
    } 

    override initElements(): void {
    }

    override eventElements(): void {
    }

    override styleElements(): void {
    }

}

export default Element;
