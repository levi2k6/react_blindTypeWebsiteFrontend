import { createElement } from "../ui_system/Element";
import Component2 from "./Component2";


class Box2 extends Component2{

    constructor(name: string){
	const element = createElement("div");
	super(element, name);   
    }

    structureElements(): Array< Component2>{
	return [];
    }

    eventElements(): void {
    }



}

export default Box2;
