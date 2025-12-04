abstract class Component2{

    private element: HTMLElement;
    private name: string;
    private children: Array<Component2> = [];

    constructor(element: HTMLElement, name: string);
    constructor(element: HTMLElement, name: string){
	this.element = element;
	this.name = name;
    }

    get self(){
	return this.element;
    }

    get style(){
	return this.element.style;
    }

    public init(){
	//init children
	this.setChildren();
	if(this.children.length === 0){
	    console.log("Component: ", this.name, "'s children is empty")
	}

	//connect children 
	for(const child of this.children){
	    if(child.children.length > 0){
		child.init();
	    }
	    this.self.appendChild(child.self);
	}

    }

    public destroy(){
	//destroy children
	for(const child of this.children){
	    if(child.children.length > 0){
		child.destroy();
	    }
	}

	//destroy self  
	this.self.remove();
	this.children = [];
    }


    public addChildren( children : Array<Component2> ): Component2{
	children.forEach(child => {
	    if(child instanceof HTMLElement){
		this.children?.push(child);
	    }
	    if(child instanceof Component2){
		console.log("child appended: ", child.name);
		this.children?.push(child);
	    }
	});
	return this;
    }

    public setChildren(): void{
	this.children = this.structureElements();
    }


    abstract structureElements(): Array<Component2>;
    abstract eventElements(): void;
    
}

export default Component2;


