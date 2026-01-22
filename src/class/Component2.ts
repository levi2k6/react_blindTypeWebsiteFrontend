import type Component from "./Component";

abstract class Component2{
    private element: HTMLElement;
    private name: string;
    private parent?: Component2;
    private children: Map<string, Component2> = new Map();
    private controller: AbortController = new AbortController;

    constructor(element: HTMLElement, name: string);
    constructor(element: HTMLElement, name: string, innerText?: string);
    constructor(element: HTMLElement, name: string, innerText?: string){
	this.element = element;
	this.name = name;
	this.element.id = name;
	if(innerText){
	    console.log("innerText: ", innerText);
	    this.element.innerText = innerText;
	}
    }

    
    public getName(){
	return this.name;
    }

    get self(){
	return this.element;
    }

    get style(){
	return this.element.style;
    }

    get abortController(){
	return this.controller;
    }

    set abortController(controller: AbortController){
	this.controller = controller;
    }

    public getParent(): Component2 | undefined{
	return this.parent;
    }

    public setParent(component: Component2 | undefined): void {
	this.parent = component;
    }

    public getChildren(): Map<string, Component2>{
	return this.children;
    }

    public getChild(name: string): Component2{
	try{
	    const child = this.children.get(name);
	    if(!child){
		throw new Error(`Component  ${name}  does not exist in children`);
	    }
	    return child;
	}catch(error){
	    throw error;
	}
    }

    public deleteChildren(): void{
	this.children.clear();
    }

    public deleteChild(childName: string): void{
	this.children.delete(childName);
    } 

    public getChildSelf(childName: string): HTMLElement{
	return this.getChild(childName).self;
    }


    public setPresetChildren(): void{
	// console.log(`Component: ${this.name} is setting preset children`);
	const children = this.structureElements();
	children.forEach(child => {
	    this.children.set(child.name, child);
	})
    }

    public addEvent(childName: string, event: string, func: EventListener){
	this.getChild(childName).self.addEventListener(event, func, {signal: this.controller.signal});
    } 

    public styleChild(name: string): CSSStyleDeclaration{
	return this.getChild(name).style;
    };

    public addChildren( children : Array<Component2> ): Component2{

	for(const child of children){
	    if(this.children.has(child.name)){
		throw new Error(`Duplicate child name: ${child.name}`)
	    }

	    if(child.parent){
		throw new Error(`child "${child.name}" already has a parent named "${child.parent}"`)
	    }

	    child.setParent(this);
	    this.children.set(child.name, child); 
	}

	return this;
    }


    abstract structureElements(): Array<Component2>;
    abstract initSystems(): void; 
    abstract initElements(): void;
    abstract eventElements(): void;
    abstract styleElements(): void; 
    
}

export default Component2;


