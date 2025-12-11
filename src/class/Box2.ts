import { createElement } from "../ui_system/Element";
import Component2 from "./Component2";

class Box2 extends Component2{

    constructor(name: string, innerText?: string){
	const element = createElement("div");
	if(name && innerText){
	    super(element, name, innerText);
	}else if(name){
	    super(element, name)
	}	   
    }

    override initComponent(): void {
    }

    override initElements(): void {
    }

    override structureElements(): Array< Component2>{
	return [];
    }

    override eventElements(): void {
    }

    override styleElements(): void {
    }


}

export default Box2;
