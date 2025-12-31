import Component2 from "../class/Component2";
import AppComponent from "../components/app/AppComponent";
import type HeaderComponent from "../components/header/HeaderComponent";

class LifeCycleSystem{

    private app: AppComponent;
    private header: HeaderComponent;

    public constructor(app: AppComponent, header: HeaderComponent){
	this.app = app;
	this.header = header;
    }

    public initMainComponent(){
	this.initComponent(this.header);
	this.initComponent(this.app);
    } 

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

	this.connectElements(component);

	children.forEach(child =>{
	    this.initComponent(child);
	})
    }


    public clearComponent(component: Component2){
	component.deleteChildren();
	this.connectElements(component);
    }


    public initAllPresetChildren(component: Component2){ 
	// console.log("current component initAllPresetChildren: ", component.getName());
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
	// console.log(`Component ${component.getName()} initElements success`);
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
	// console.log(`Component ${component.getName()} eventElements done`);
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
	// console.log(`Component ${component.getName()} styleElements success`);
    }

    public connectElements(component: Component2){
       // console.log(`${component.getName()}'s children: `, component.getChildren().size);
	if(component.getChildren().size !== 0){
	    console.log("name: ", component.getName(), "size: ", component.getChildren().size );
	    for(const key of component.getChildren().keys()){
		const child = component.getChildren().get(key);
		if(!child) return;
		this.connectElements(child);
		component.self.appendChild(child.self);
		console.log(`child: ${child.getName()} is  appended to ${component.getName()}`)
	    }
	}
	// console.log(`Component ${component.getName()} connectElements done`);
    }

    public destroyComponent(component: Component2){
	console.log("destroying curreRouter: ", component.getName());
	const componentParent = component.getParent(); 
	if(!componentParent){
	    throw new Error(`cannot delete root component "${component.getName()}"`);
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
	// console.log(`Component: ${component.getName()} removed`);
	component.self.remove();
	component.setParent(undefined);
	component.getChildren().clear(); 
	// console.log("children after destroy: ", component.getChildren());
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
