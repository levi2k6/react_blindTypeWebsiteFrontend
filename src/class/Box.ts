import { createElement } from "../ui_system/Element";
import System from "./System";
import Component from "./Component";

class Box extends Component{

    constructor(name?: string, system?: System) {
	const element = createElement("div");
	if(name && system) {
	    super(element, system, name);
	} else if(name) {
	    super(element, undefined, name);
	} else {
	    super(element); 
	}
    }


    override initElements(): void {
    }

    override connectElements(): void {
    } 

    override eventElements(): void {
    }

    override styleElements(): void {
	this.style.width = "200px";
	this.style.height = "200px";
    } 

    override preDestroy(): void {
    }

}

export default Box;


