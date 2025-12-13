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

	this.currentComponent.initAllPresetChildren();
	console.log("initAllPresetChildren Done");
	this.currentComponent.initAllInitElements();
	console.log("initAllInitElements Done");
	this.currentComponent.initAllEventElements();
	console.log("initAllEventElements Done");
	this.currentComponent.initAllStyleElements();
	console.log("initAllStyleElements Done");
	this.currentComponent.connectElements();
	console.log("connectingElements Done");
	this.currentComponent.init();
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
