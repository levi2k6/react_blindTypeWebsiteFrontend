import Navigo from "navigo"
import LifeCycleSystem from "../systems/LifeCycleSystem";
import Test1 from "../test/Test1";
import Test2 from "../test/Test2";
import Component2 from "../class/Component2";
import GameRouter from "../game/component/GameRouter";
import AppComponent from "../components/app/AppComponent";
import type LoginRouter from "../login/LoginRouter";

class RouteSystem2{
    
    private app : AppComponent; 
    private currentRouter?: Component2;

    private isInitialized: boolean = false;

    private router = new Navigo("/", {hash: false});

    private lifeCycleSystem: LifeCycleSystem;

    private test1: Test1;
    private test2: Test2;
    private gameRouter: GameRouter;
    private loginRouter: LoginRouter;

    constructor(
	app: AppComponent,
	lifeCycleSystem: LifeCycleSystem,
	test1: Test1,
	test2: Test2,
	gameRouter: GameRouter,
	loginRouter: LoginRouter
    ){
	this.app = app;
	this.lifeCycleSystem = lifeCycleSystem;
	this.test1 = test1;
	this.test2 = test2;
	this.gameRouter = gameRouter;
	this.loginRouter = loginRouter;

	console.log("lifeCycleSystem instance:", this.lifeCycleSystem);
	console.log("methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(this.lifeCycleSystem)));

	this.initRoute();
    };

   private initRoute(){
	this.initRouterRouteSystem();
	this.wireRoutes();
	this.isInitialized = true;

   }

    public setCurrentRouter(currentRouter: Component2){
	this.currentRouter = currentRouter;
    } 

    private changeRouterHandler(router: Component2){
	console.log("changeRouterHandler");
	console.log("currentRouter", router);
	if(this.currentRouter){
	    this.lifeCycleSystem.destroyComponent(this.currentRouter);
	}

	this.currentRouter = router;

	if(!this.isInitialized){
	    console.log("first init");
	    this.app.addChildren([this.currentRouter]);
	    this.lifeCycleSystem.initMainComponent();
	}else{
	    console.log("after the init");
	    this.lifeCycleSystem.updateComponent(this.app, [this.currentRouter]);
	}
	console.log("app: ", this.app);
	console.log("currentRouter", this.currentRouter);
    };

    private wireRoutes(){
	this.router
	.on("/", ()=> this.changeRouterHandler(this.gameRouter))
	.on("/login", ()=> this.changeRouterHandler(this.loginRouter))
	.on("/test", ()=> this.changeRouterHandler(this.test1))
	.resolve();
    }

    private initRouterRouteSystem(){
	this.test1.setRouteSystem(this);
	this.test2.setRouteSystem(this);
    }

    public navigate(routerName: string){
	this.router.navigate(routerName);
	this.router.resolve();
    }

}

export default RouteSystem2;
