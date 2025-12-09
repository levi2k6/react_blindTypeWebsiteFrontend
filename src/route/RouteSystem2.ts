import Navigo from "navigo"
import LifeCycleSystem from "../systems/LifeCycleSystem";
import Test1 from "../test/Test1";
import Test2 from "../test/Test2";
import Component2 from "../class/Component2";
import type GameRouter from "../game/component/GameRouter";

class RouteSystem2{
    
    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: false});

    lifeCycleSystem: LifeCycleSystem;

    test1: Test1;
    test2: Test2;
    gameRouter: GameRouter;


    constructor(
	lifeCycleSystem: LifeCycleSystem,
	test1: Test1,
	test2: Test2,
	gameRouter: GameRouter
    ){
	this.lifeCycleSystem = lifeCycleSystem;
	this.test1 = test1;
	this.test2 = test2;
	this.gameRouter = gameRouter;

	console.log("lifeCycleSystem instance:", this.lifeCycleSystem);
	console.log("methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(this.lifeCycleSystem)));

	this.initRouterRouteSystem();
	this.initRouteSystem();
    };



    private changeRouterHandler(router: Component2){
	this.lifeCycleSystem.destroyComponent();
	this.lifeCycleSystem.setCurrentComponent(router);
	this.lifeCycleSystem.initComponent();
	const currentComponent = this.lifeCycleSystem.getCurrentComponent();
	this.addAppElement(currentComponent);
    };

    private initRouteSystem(){
	this.router
	.on("/", ()=> this.changeRouterHandler(this.test1))
	.on("/about", ()=> this.changeRouterHandler(this.test2))
	.on("/game", ()=> this.changeRouterHandler(this.gameRouter))
	.resolve();
    }

    initRouterRouteSystem(){
	this.test1.setRouteSystem(this);
	this.test2.setRouteSystem(this);
    }

    addAppElement(route : Component2 | undefined): void{
	if(!route){
	    console.log("RouteSystem2[] initRouteSystem: cannot change route to undefined router");
	    return;
	}
	this.app.appendChild(route.self);
    }

    navigate(routerName: string){
	this.router.navigate(routerName);
	this.router.resolve();
    }

}

export default RouteSystem2;
