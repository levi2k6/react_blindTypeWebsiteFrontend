import { createElement } from "../ui_system/Element";
import Component2 from "./Component2";

class Element extends Component2{

    public constructor(elementType: string, name: string){
	const element = createElement(elementType);
	super(element, name);   
    }

    structureElements(): Array<Component2> {
	return [];
    }

    eventElements(): void {
	
    }

}

export default Element;
