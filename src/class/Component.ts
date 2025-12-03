import type System from "./System";

abstract class Component{
    private element: HTMLElement;  
    private componentSystem: System | undefined;
    private name: string | undefined = "";
    private controller?: AbortController;

    constructor(element: HTMLElement);
    constructor(element: HTMLElement, system: System);
    constructor(element: HTMLElement, system?: System, name?: string);
    constructor(element: HTMLElement, system?: System, name?: string){
	this.element = element;
	this.componentSystem = system;
	this.name = name;
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

    get abortController(){
	return this.controller;
    }

    public init(): void{
	this.initElements();
	this.connectElements();
	this.initEvents;
	this.styleElements();
	console.log("INIT DONE");
    }

    public initEvents(){
	this.controller = new AbortController();
	this.eventElements();
	this.initChildrenEvents();
    }

    abstract initChildrenEvents(): void; 

    public destroy(): void{
	this.preDestroy();
	this.abortController?.abort();
	this.self.remove();
    };

    abstract preDestroy(): void;


    public addChild( child : HTMLElement | Component): HTMLElement{
	if(child instanceof HTMLElement){
	    this.element.appendChild(child);
	}
	if(child instanceof Component){
	    this.element.append(child.self);
	}
	return this.element;
      }

    public addChildren( children : Array<HTMLElement | Component>): HTMLElement{
	children.forEach(child => {
	    if(child instanceof HTMLElement){
		this.element.appendChild(child);
	    }
	    if(child instanceof Component){
		console.log("child appended: ", child.name);
		this.element.append(child.self);
	    }
	});
	return this.element;
    }


    abstract initElements(): void;

    abstract connectElements(): void;

    abstract eventElements(): void;

    abstract styleElements(): void;


}

export default Component;


