import Box from "../class/Box";
import type { Component } from "../class/Component";
import LoginBox from "./LoginBox";

class AuthRouter extends Box implements Component{

    loginBox: LoginBox = new LoginBox("LoginBox");

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
	this.addChild(this.loginBox);
    }

    eventElements(): void {
        
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


