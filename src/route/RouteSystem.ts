import Navigo from "navigo"
import GameRouter from "../game/component/GameRouter";
import LoginRouter from "../login/LoginRouter";
import Box from "../class/Box";
import AboutRouter from "../about/AboutRouter";
import type VerifyFailedRouter from "../email_verification/VerifyFailedEmailRouter";
import type AlreadyVerifiedEmailRouter from "../email_verification/AlreadyVerifiedRouter";

class RouteSystem{
    
    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: false});

    currentRouter?: Box;

    gameRouter: GameRouter;
    aboutRouter: AboutRouter;
    loginRouter: LoginRouter;
    verifyFailedRouter: VerifyFailedRouter;
    alreadyVerifiedEmailRouter: AlreadyVerifiedEmailRouter;

    constructor(
	gameRouter: GameRouter,
	aboutRouter: AboutRouter,
	loginRouter: LoginRouter,
	verifyFailedRouter: VerifyFailedRouter,
	alreadyVerifiedEmailRouter: AlreadyVerifiedEmailRouter,
    ){
	this.gameRouter = gameRouter;
	this.aboutRouter = aboutRouter;
	this.loginRouter = loginRouter;
	this.verifyFailedRouter = verifyFailedRouter;
	this.alreadyVerifiedEmailRouter = alreadyVerifiedEmailRouter;

	this.initRouteSystem();
    };

    initRouteSystem(){
	this.router
	.on("/", ()=> {
	    this.gameRouter.initEvents();
	    this.addAppElement(this.gameRouter);
	})
	.on("/about", ()=> {
	    // this.aboutRouter.initEvents();
	    this.addAppElement(this.aboutRouter);
	})
	.on("/auth", ()=> {
	    this.loginRouter.initEvents()
	    this.addAppElement(this.loginRouter);
	})
	.on("/verify_failed", ()=>{
	    this.verifyFailedRouter.initEvents()
	    this.addAppElement(this.verifyFailedRouter);
	})
	.resolve();
    }

    initRouterRouteSystem(){

    }

    addAppElement(route : Box): void{
	this.app.innerHTML = "";
	route.eventElements();
	this.app.appendChild(route.self);
    }

    navigate(routerName: string){
	this.currentRouter?.destroy();
	this.router.navigate(routerName);
	this.router.resolve();
    }

}

export default RouteSystem;

