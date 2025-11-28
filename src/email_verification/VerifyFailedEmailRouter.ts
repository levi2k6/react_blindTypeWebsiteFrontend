import Box from "../class/Box";
import { createElement } from "../ui_system/Element";

class VerifyFailedEmailRouter extends Box{

    div1: Box = new Box();
    h1: HTMLElement = createElement("h1", "Failed to verify email");
 
    public constructor(name: string){
	super(name);
    }

    override initElements(): void{
    }

    override connectElements(){
	this.addChildren([
	    this.div1.addChildren([
		this.h1
	    ])
	]);
    }

    override eventElements(){

    }

    override styleElements(){

    }


}

export default VerifyFailedEmailRouter;
