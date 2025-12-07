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

	if(!this.currentComponent){
	    console.log("LifeCycleSystem[] initComponent: cannot init undefined component");
	    return
	};
	console.log("test test");

	this.currentComponent.initAllPresetChildren();
	this.currentComponent.initAllInitElements();
	this.currentComponent.initAllEventElements();
	this.currentComponent.initAllStyleElements();
	this.currentComponent.connectElements();
	this.currentComponent.init();
    }

    public destroyComponent(){
	if(!this.currentComponent){
	    console.log("LifeCycleSystem[] initComponent: cannot destroy undefined component");
	    return
	};

	this.currentComponent.destroy();
    }


}

export default LifeCycleSystem;
