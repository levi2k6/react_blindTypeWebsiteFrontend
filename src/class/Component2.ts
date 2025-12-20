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

    public setParent(component: Component2): void {
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

	//    public initAllPresetChildren(){ 
	// //check root children if it is size 0
	// console.log("current component initAllPresetChildren: ", this.name);
	// if(this.children.size === 0){
	//     this.setPresetChildren();
	// }
	//
	// // console.log(`structureElements ${this.name}`);
	// // console.log("children: ", this.children);
	// for(const key of this.children.keys()){
	//     const child = this.children.get(key);
	//     if(!child) throw new Error(`key: ${key} does not exist in component: ${this.name}`);
	// 	//    if(child?.children.size === 0){
	// 	// child.setPresetChildren();
	// 	//    }
	// 	child.initAllPresetChildren();
	// }
	//    }

	//    public  initAllInitElements(){
	// if(this.children.size !== 0){
	//     for(const key of this.children.keys()){
	// 	const child = this.children.get(key);
	// 	if(!child) return;
	// 	if(child?.children.size > 0){
	// 	    child.initAllInitElements();
	// 	}
	//     }
	// }
	// this.initElements();
	// console.log(`Component ${this.name} initElements success`);
	//    }
	//
	//    public initAllEventElements(){
	// if(this.children.size !== 0){
	//     for(const key of this.children.keys()){
	// 	const child = this.children.get(key);
	// 	if(!child) return;
	// 	if(child?.children.size > 0){
	// 	    child.initAllEventElements();
	// 	}
	//     }
	// }
	// this.controller = new AbortController;
	// this.eventElements();
	// console.log(`Component ${this.name} eventElements done`);
	//    }
	//
	//    public initAllStyleElements(){
	// if(this.children.size !== 0){
	//     for(const key of this.children.keys()){
	// 	const child = this.children.get(key);
	// 	if(!child) return;
	// 	if(child?.children.size > 0){
	// 	    child.initAllStyleElements();
	// 	}
	//     }
	// }
	// this.styleElements();
	// console.log(`Component ${this.name} styleElements success`);
	//    }

    public connectElements(){

	if(this.children.size !== 0){
	    for(const key of this.children.keys()){
		const child = this.children.get(key);
		if(!child) return;
		child.connectElements();
		this.self.appendChild(child.self);
	    }
	}
	console.log(`Component ${this.name} connectElements done`);
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


