import { createElement } from "../ui_system/Element";

class Component{
    private name: string = "";
    private element = createElement("div");

    init(funcs: Array<Function>){
	funcs.forEach(func => {
	    func();
	})
    }

    constructor(name: string){
	this.name = name;
	console.log(`${this.name} initialized`);
    }

    get self(){
	return this.element;
    }

    get style(){
	return this.element.style;
    } 
    
    addChild( child : HTMLElement | Component): void{
	    if(child instanceof HTMLElement){
		this.element.appendChild(child);
	    }
	    if(child instanceof Component){
		this.element.append(child.self);
	    }
      }

    addChildren( children : Array<HTMLElement | Component>): void{
	children.forEach(child => {
	    if(child instanceof HTMLElement){
		this.element.appendChild(child);
	    }
	    if(child instanceof Component){
		this.element.append(child.self);
	    }
	});
      }



}

export default Component;


