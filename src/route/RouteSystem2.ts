import Navigo from "navigo"
import LifeCycleSystem from "../systems/LifeCycleSystem";
import Test1 from "../test/Test1";
import Test2 from "../test/Test2";
import Component2 from "../class/Component2";

class RouteSystem2{
    
    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: false});

    lifeCycleSystem: LifeCycleSystem;

    test1: Test1;
    test2: Test2;


    constructor(
	lifeCycleSystem: LifeCycleSystem,
	test1: Test1,
	test2: Test2
    ){
	this.lifeCycleSystem = lifeCycleSystem;
	this.test1 = test1;
	this.test2 = test2;

	console.log("lifeCycleSystem instance:", this.lifeCycleSystem);
	console.log("methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(this.lifeCycleSystem)));

	this.initRouteSystem();
    };



    private gameRouteHandler(){
	console.log("game");
	this.lifeCycleSystem.setCurrentComponent(this.test1);
	this.lifeCycleSystem.initComponent();
	const currentComponent = this.lifeCycleSystem.getCurrentComponent();
	console.log("currentComponent: ", currentComponent);
	this.addAppElement(currentComponent);
    };

    private aboutRouteHandler(){
	this.lifeCycleSystem.setCurrentComponent(this.test2);
	this.lifeCycleSystem.initComponent();
	const currentComponent = this.lifeCycleSystem.getCurrentComponent();
	this.addAppElement(currentComponent);
    };

    private initRouteSystem(){
	this.router
	.on("/", this.gameRouteHandler.bind(this))
	.on("/about", this.aboutRouteHandler.bind(this))
	.resolve();
    }

    initRouterRouteSystem(){
    }

    addAppElement(route : Component2 | undefined): void{
	if(!route){
	    console.log("RouteSystem2[] initRouteSystem: cannot change route to undefined router");
	    return;
	}
	console.log("addAppElement: ", route);
	this.app.innerHTML = "";
	route.eventElements();
	this.app.appendChild(route.self);
    }

    navigate(routerName: string){
	this.lifeCycleSystem.destroyComponent();
	this.router.navigate(routerName);
	this.router.resolve();
    }

}

export default RouteSystem2;
