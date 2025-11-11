
import Navigo from "navigo"
import GameRouter from "../game/component/GameRouter";
import AuthRouter from "../auth/AuthRouter";
import Box from "../class/Box";
import AboutRouter from "../about/AboutRouter";
import type VerifyFailedRouter from "../email_verification/VerifyFailedEmailRouter";
import type AlreadyVerifiedEmailRouter from "../email_verification/AlreadyVerifiedRouter";

class RouteSystem{

    // header : HTMLElement = document.querySelector<HTMLDivElement>("#header")!; 
    
    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: false});

    gameRouter: GameRouter;
    aboutRouter: AboutRouter;
    authRouter: AuthRouter;
    verifyFailedRouter: VerifyFailedRouter;
    alreadyVerifiedEmailRouter: AlreadyVerifiedEmailRouter;

    constructor(
	gameRouter: GameRouter,
	aboutRouter: AboutRouter,
	authRouter: AuthRouter,
	verifyFailedRouter: VerifyFailedRouter,
	alreadyVerifiedEmailRouter: AlreadyVerifiedEmailRouter
    ){
	this.gameRouter = gameRouter;
	this.aboutRouter = aboutRouter;
	this.authRouter = authRouter;
	this.verifyFailedRouter = verifyFailedRouter;
	this.alreadyVerifiedEmailRouter = alreadyVerifiedEmailRouter;
	this.initRouteSystem();
    };

    initRouteSystem(){
	this.router
	.on("/", ()=> {
	    this.addAppElement(this.gameRouter);
	})
	.on("/about", ()=> {
	    this.addAppElement(this.aboutRouter);
	})
	.on("/auth", ()=> {
	    this.addAppElement(this.authRouter);
	})
	.on("/verify_failed", ()=>{
	    this.addAppElement(this.verifyFailedRouter);
	})
	.resolve();
    }

    addAppElement(route : Box): void{
	if(!route.self) return;
	this.app.innerHTML = "";
	this.app.appendChild(route.self);
    }

    navigate(routerName: string){
	this.router.navigate(routerName);
	this.router.resolve();
    }

}

export default RouteSystem;

