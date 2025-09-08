import { createElement } from "../ui_system/Element";
import System from "./System";

class Component{
    private name: string | undefined = "";
    private element = createElement("div");

    private componentSystem: System | undefined;

    constructor();
    constructor(name: string);
    constructor(name: string, system: System);
    constructor(name?: string, system?: System){
	this.name = name;
	this.componentSystem = system;
    }

    get self(){
	return this.element;
    }

    get style(){
	return this.element.style;
    } 

    get system() : System | undefined{
	return this.componentSystem;
    }
    
    set system(system: System){
	this.componentSystem = system;
    }
    
    init(funcs: Array<Function>){
	funcs.forEach(func => {
	    func();
	})
    }

    addChild( child : HTMLElement | Component): void{
	    if(child instanceof HTMLElement){
		this.element.appendChild(child);
	    }
	    if(child instanceof Component){
		this.element.append(child.self);
	    }
      }

    addChildren( children : Array<HTMLElement | Component>): HTMLElement{
	children.forEach(child => {
	    if(child instanceof HTMLElement){
		console.log("child appended");
		this.element.appendChild(child);
	    }
	    if(child instanceof Component){
		this.element.append(child.self);
	    }
	});
	return this.element;
    }

}

export default Component;


