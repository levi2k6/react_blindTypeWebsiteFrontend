import Component2 from "../class/Component2";

class LifeCycleSystem{

    private currentComponent: Component2 | undefined;

    // constructor(){
    // }

    public setCurrentComponent(component: Component2): void{
	this.currentComponent = component;
    }

    public getCurrentComponent(){
	return this.currentComponent;
    } 


    public initComponent(component: Component2){
	console.log("currentComponent here: ", component);
	// console.log("snapshot:", JSON.stringify(this.currentComponent?.getChildren()));

	console.log("test test");

	this.initAllPresetChildren(component);
	console.log("initAllPresetChildren Done");
	this.initAllInitSystems(component);
	console.log("initAllInitSystems Done");
	this.initAllInitElements(component);
	console.log("initAllInitElements Done");
	this.initAllEventElements(component);
	console.log("initAllEventElements Done");
	this.initAllStyleElements(component);
	console.log("initAllStyleElements Done");
	this.connectElements(component);
	console.log("connectingElements Done");

    }

    public updateComponent(component: Component2, children: Array<Component2>){
	component.addChildren(children);
	this.initComponent(component);

	this.initAllPresetChildren(component);
	console.log("initAllPresetChildren Done");
	this.initAllInitSystems(component);
	console.log("initAllInitSystems Done");
	this.initAllInitElements(component);
	console.log("initAllInitElements Done");
	this.initAllEventElements(component);
	console.log("initAllEventElements Done");
	this.initAllStyleElements(component);
	console.log("initAllStyleElements Done");
	this.connectElements(component);
	console.log("connectingElements Done");
    }



    public clearComponent(component: Component2){
	component.deleteChildren();
	this.connectElements(component);
    }


    public initAllPresetChildren(component: Component2){ 
	console.log("current component initAllPresetChildren: ", component.getName());
	if(component.getChildren().size === 0){
	    component.setPresetChildren();
	}

	for(const key of component.getChildren().keys()){
	    const child = component.getChildren().get(key);
	    if(!child) throw new Error(`key: ${key} does not exist in component: ${component.getName()}`);
	    this.initAllPresetChildren(child);
	}
    }

    public initAllInitSystems(component: Component2){ 
	component.initSystems();

	for(const key of component.getChildren().keys()){
	    const child = component.getChildren().get(key);
	    if(!child) throw new Error(`key: ${key} does not exist in component: ${component.getName()}`);
	    this.initAllInitSystems(child);
	}
    }

    public  initAllInitElements(component: Component2){
	if(component.getChildren().size !== 0){
	    for(const key of component.getChildren().keys()){
		const child = component.getChildren().get(key);
		if(!child) return;
		if(component.getChildren().size > 0){
		    this.initAllInitElements(child);
		}
	    }
	}
	component.initElements();
	console.log(`Component ${component.getName()} initElements success`);
    }

    public initAllEventElements(component: Component2){
	if(component.getChildren().size !== 0){
	    for(const key of component.getChildren().keys()){
		const child = component.getChildren().get(key);
		if(!child) return;
		if(component.getChildren().size > 0){
		    this.initAllEventElements(child);
		}
	    }
	}
	component.abortController = new AbortController;
	component.eventElements();
	console.log(`Component ${component.getName()} eventElements done`);
    }

    public initAllStyleElements(component: Component2){
	if(component.getChildren().size !== 0){
	    for(const key of component.getChildren().keys()){
		const child = component.getChildren().get(key);
		if(!child) return;
		if(component.getChildren().size > 0){
		    this.initAllStyleElements(child);
		}
	    }
	}
	component.styleElements();
	console.log(`Component ${component.getName()} styleElements success`);
    }

    public connectElements(component: Component2){
	if(component.getChildren().size !== 0){
	    for(const key of component.getChildren().keys()){
		const child = component.getChildren().get(key);
		if(!child) return;
		child.connectElements();
		component.self.appendChild(child.self);
	    }
	}
	console.log(`Component ${component.getName()} connectElements done`);
    }

    public destroyComponent(component: Component2){
	const componentParent = component.getParent(); 
	if(!componentParent){
	    console.info(`cannot delete root component "${component.getName()}"`);
	}else{
	    this.unInitComponent(component);
	    componentParent.getChildren().delete(component.getName());
	}
    }

    private unInitComponent(component: Component2){
	//destroy recursion 
	if(component.getChildren().size !== 0){
	    for(const key of component.getChildren().keys()){
		const child = component.getChildren().get(key);
		if(!child) return;
		this.unInitComponent(child)
	    }
	}

	//the function of destroy  
	console.log(`Component: ${component.getName()} removed`);
	component.self.remove();
	component.getChildren().clear(); 
	console.log("children after destroy: ", component.getChildren());
	component.abortController.abort();
    }

    

	//    public destroyComponent(){
	// if(!this.currentComponent){
	//     console.log("LifeCycleSystem[] destroyComponent: cannot destroy undefined component");
	//     return
	// };
	//
	// this.currentComponent.destroy();
	//    }


}

export default LifeCycleSystem;
