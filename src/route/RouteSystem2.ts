import Navigo from "navigo"
import LifeCycleSystem from "../systems/LifeCycleSystem";
import Test1 from "../test/Test1";
import Test2 from "../test/Test2";
import Component2 from "../class/Component2";
import GameRouter from "../game/component/GameRouter";
import AppComponent from "../components/app/AppComponent";
import type LoginRouter from "../login/LoginRouter";
import type HeaderComponent from "../components/header/HeaderComponent";
import type AboutRouter from "../about/AboutRouter";
import type RegisterRouter from "../register/RegisterRouter";

class RouteSystem2{
    
    private header: HeaderComponent;
    private app : AppComponent; 
    private currentRouter?: Component2;

    private isInitialized: boolean = false;

    private router = new Navigo("/", {hash: false});

    private lifeCycleSystem: LifeCycleSystem;

    private test1: Test1;
    private test2: Test2;
    private gameRouter: GameRouter;
    private loginRouter: LoginRouter;
    private registerRouter: RegisterRouter;
    private aboutRouter: AboutRouter;

    constructor(
	lifeCycleSystem: LifeCycleSystem,
	header: HeaderComponent,
	app: AppComponent,
	test1: Test1,
	test2: Test2,
	gameRouter: GameRouter,
	loginRouter: LoginRouter,
	registerRouter: RegisterRouter,
	aboutRouter: AboutRouter
    ){
	this.lifeCycleSystem = lifeCycleSystem;
	this.header = header;
	this.app = app;
	this.test1 = test1;
	this.test2 = test2;
	this.gameRouter = gameRouter;
	this.loginRouter = loginRouter;
	this.registerRouter = registerRouter;
	this.aboutRouter = aboutRouter;

	console.log("lifeCycleSystem instance:", this.lifeCycleSystem);
	console.log("methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(this.lifeCycleSystem)));

	this.initRouteSystem();
    };

   private initRouteSystem(){
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
	.on("/register", ()=> this.changeRouterHandler(this.registerRouter))
	.on("/about", ()=> this.changeRouterHandler(this.aboutRouter))
	.on("/test", ()=> this.changeRouterHandler(this.test1))
	.resolve();
    }

    private initRouterRouteSystem(){
	this.header.setRouteSystem(this);
	this.test1.setRouteSystem(this);
	this.test2.setRouteSystem(this);
	this.loginRouter.setRouteSystem(this);
    }

    public navigate(routerName: string){
	this.router.navigate(routerName);
	this.router.resolve();
    }

}

export default RouteSystem2;
