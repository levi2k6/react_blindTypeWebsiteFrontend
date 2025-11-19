import type { Route, RouterOptions } from "navigo";
import Box from "../class/Box";
import type { Component } from "../class/Component";
import { createElement } from "../ui_system/Element";
import LoginBox from "./LoginBox";
import AuthRouterSystem from "./system/AuthRouterSystem";
import type RouteSystem from "../route/RouteSystem";

class AuthRouter extends Box implements Component{

    public loginBox: LoginBox = new LoginBox("LoginBox");

    public authRouterSystem: AuthRouterSystem = new AuthRouterSystem(this);

    public divAuth0: Box = new Box();
	public googleButton: HTMLButtonElement = createElement("button", "") as HTMLButtonElement;
	public googleImg: HTMLImageElement = createElement("img") as HTMLImageElement;

    constructor( name: string){
	super(name);

	this.init()
    }

    setRouteSystem(routeSystem: RouteSystem){
	this.loginBox.setRouteSystem(routeSystem);
    }

    init(): void{
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    initElements(){
	this.googleImg.src = "https://developers.google.com/identity/images/g-logo.png";  
    }

    connectElements(): void {
	this.addChildren([
	    this.loginBox,
	    this.googleButton
	]);

	this.googleButton.appendChild(this.googleImg);
    }

    eventElements(): void {
	this.googleButton.addEventListener("click", ()=>{
	    this.authRouterSystem.login();
	});
    }

    styleElements(): void {
 	this.style.position = "relative";
	this.style.border = "5px solid pink"
	// this.style.width =  "98vw";
	this.style.height = "100%";
	this.style.display = "flex"; 
	this.style.gap = "20px";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	this.googleImg.style.height = "30px";
	
    }
}

export default AuthRouter;


