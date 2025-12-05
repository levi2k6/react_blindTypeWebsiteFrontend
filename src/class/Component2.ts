abstract class Component2{

    private element: HTMLElement;
    private name: string;
    private children: Map<string, Component2> = new Map();

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

    get self(){
	return this.element;
    }

    get style(){
	return this.element.style;
    }

    public init(){
	console.log(this.name, ": is initing");
	console.log(`${this.name} has a children of : `, this.children);

	if(this.children.size === 0){
	    console.log("Component: ", this.name, "'s children is empty")
	}

	for(const key of this.children.keys()){
	    const child = this.children.get(key);
	    if(!child) return;
	    if(child?.children.size > 0){
		child.init();
	    }
	}
    }

    public initAllPresetChildren(){ 
	for(const key of this.children.keys()){
	    const child = this.children.get(key);
	    if(!child) return;
	    if(child?.children.size > 0){
		child.initAllPresetChildren();
	    }
	}
	this.setPresetChildren();
	console.log(`Component ${this.name} setPresetChildren done`);
    }

    public  initAllInitElements(){
	for(const key of this.children.keys()){
	    const child = this.children.get(key);
	    if(!child) return;
	    if(child?.children.size > 0){
		child.initAllInitElements();
	    }
	}
	this.initElements();
	console.log(`Component ${this.name} initElements done`);
    }

    public initAllEventElements(){
	for(const key of this.children.keys()){
	    const child = this.children.get(key);
	    if(!child) return;
	    if(child?.children.size > 0){
		child.initAllEventElements();
	    }
	}
	this.eventElements();
	console.log(`Component ${this.name} eventElements done`);
    }

    public initAllStyleElements(){
	for(const key of this.children.keys()){
	    const child = this.children.get(key);
	    if(!child) return;
	    if(child?.children.size > 0){
		child.initAllStyleElements();
	    }
	}
	this.styleElements();
	console.log(`Component ${this.name} styleElements done`);
    }

    public connectElements(){
	for(const key of this.children.keys()){
	    const child = this.children.get(key);
	    if(!child) return;
	    child.connectElements();
	    this.self.appendChild(child.self);
	}
	console.log(`Component ${this.name} connectElements done`);
    }

    
    public destroy(){
	//destroy children
	for(const key of this.children.keys()){
	    const child = this.children.get(key);
	    if(!child) return;
	    if(child?.children.size > 0){
		child.destroy();
	    }
	}

	//destroy self  
	this.self.remove();
	this.children = new Map();
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

    public styleChild(name: string): CSSStyleDeclaration{
	try{
	    const child = this.children.get(name);
	    if(!child){
		throw new Error(`Component ${name} does not exist in children`);
	    }
	    return child.style;
	}catch(error){
	    throw error;
	}
    };

    public addChildren( children : Array<Component2> ): Component2{
	children.forEach(child => {
	    if(child instanceof Component2){
		console.log("child appended: ", child.name, " to component ", this.name);
		this.children.set(child.name, child);
	    }
	});

	return this;
    }

    public setPresetChildren(): void{
	console.log(`Component: ${this.name} is setting preset children`);
	const children = this.structureElements();
	children.forEach(child => {
	    this.children.set(child.name, child);
	})
    }

    abstract structureElements(): Array<Component2>;

    abstract initElements(): void;
    abstract eventElements(): void;
    abstract styleElements(): void; 
    
}

export default Component2;


