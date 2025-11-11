import Box from "../class/Box";
import type { Component } from "../class/Component";
import { createElement } from "../ui_system/Element";

class VerifyFailedEmailRouter extends Box implements Component{

    div1: Box = new Box();
    h1: HTMLElement = createElement("h1", "Failed to verify email");
 
    public constructor(name: string){
	super(name);
	this.init();
    }

    public init(){
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    public initElements(): void{
    }

    public connectElements(){
	this.addChildren([
	    this.div1.addChildren([
		this.h1
	    ])
	]);
    }

    public eventElements(){

    }

    public styleElements(){

    }


}

export default VerifyFailedEmailRouter;
