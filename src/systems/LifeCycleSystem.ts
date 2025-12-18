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


    public initComponent(){
	console.log("currentComponent here: ", this.currentComponent);
	console.log("snapshot:", JSON.stringify(this.currentComponent?.getChildren()));

	if(!this.currentComponent){
	    console.log("LifeCycleSystem[] initComponent: cannot init undefined component");
	    return
	};
	console.log("test test");

	this.initAllPresetChildren(this.currentComponent);
	console.log("initAllPresetChildren Done");
	this.initAllInitSystems(this.currentComponent);
	console.log("initAllInitSystems Done");
	this.initAllInitElements(this.currentComponent);
	console.log("initAllInitElements Done");
	this.initAllEventElements(this.currentComponent);
	console.log("initAllEventElements Done");
	this.initAllStyleElements(this.currentComponent);
	console.log("initAllStyleElements Done");
	this.connectElements(this.currentComponent);
	console.log("connectingElements Done");
    }

    public updateComponent(){
	if(!this.currentComponent){
	    throw new Error("currentComponent is undefined");
	}

	this.connectElements(this.currentComponent);
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


    public destroyComponent(){
	if(!this.currentComponent){
	    console.log("LifeCycleSystem[] destroyComponent: cannot destroy undefined component");
	    return
	};

	this.currentComponent.destroy();
    }


}

export default LifeCycleSystem;
