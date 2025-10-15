import Box from "../class/Box";
import type { Component } from "../class/Component";
import { createElement } from "../ui_system/Element";
import LoginBox from "./LoginBox";
import Auth0 from "./Oauth0/Auth0";
import AuthRouterSystem from "./system/AuthRouterSystem";

class AuthRouter extends Box implements Component{

    loginBox: LoginBox = new LoginBox("LoginBox");

    Auth0: Auth0 = new Auth0();
    AuthRouterSystem: AuthRouterSystem = new AuthRouterSystem();

    divAuth0: Box = new Box();
	googleButton: HTMLButtonElement = createElement("button", "Google") as HTMLButtonElement;

    constructor( name: string){
	super(name);
	this.init()
    }

    init(): void{
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    initElements(): void{

    }

    connectElements(): void {
	this.addChildren([
	    this.loginBox,
	    this.googleButton
	]);
    }

    eventElements(): void {
	this.googleButton.addEventListener("click", ()=>{
	    this.AuthRouterSystem.login();
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
    }
}

export default AuthRouter;


