import Box from "../class/Box";
import type { Component } from "../class/Component";
import { createElement } from "../ui_system/Element";
import LoginBoxSystem from "./system/LoginBoxSystem";
import type RouteSystem from "../route/RouteSystem";

class LoginBox extends  Box implements Component{
    routeSytem: RouteSystem | undefined;

    h1: HTMLElement = createElement("h1", "Login");

    inputBox: Box = new Box();
	usernameLabel: HTMLLabelElement = createElement("label", "Username") as HTMLLabelElement;
	usernameInput: HTMLInputElement = createElement("input") as HTMLInputElement;

	passwordLabel: HTMLLabelElement = createElement("label", "Password") as HTMLLabelElement;
	passwordInput: HTMLInputElement = createElement("input") as HTMLInputElement;

    loginButton: HTMLButtonElement = createElement("button", "Login") as HTMLButtonElement;
    loginMessage: HTMLElement = createElement("label", "message");

    loginBoxSystem: LoginBoxSystem = new LoginBoxSystem(this, );


    constructor(name: string){
	super(name);
	this.init();
    }

    setRouteSystem(routeSystem: RouteSystem){
	this.routeSytem = routeSystem;
    }

    init(){
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    initElements(): void {
	this.usernameInput.type = "text";
	this.passwordInput.type = "password";
    }

    connectElements(): void {
	this.addChildren([
	    this.h1,
	    this.inputBox.addChildren([
		this.usernameLabel,
		this.usernameInput,
		this.passwordLabel,
		this.passwordInput
	    ]),
	    this.loginButton,
	    this.loginMessage
	]);
    }

    eventElements(): void {
	this.loginButton.addEventListener("click", ()=>{
	    console.log("Auth login")
	    const username = this.usernameInput.value;
	    const password = this.passwordInput.value;

	    this.loginBoxSystem.authenticate(username, password);
	})
    }

    styleElements(): void {
	this.style.border = "1px solid black";
	this.style.background = "black";
	this.style.height = "400px";
	this.style.width = "400px";
	this.style.display = "flex";
	this.style.flexFlow = "column";
	this.style.alignItems = "center";

	// this.inputBox.style.marginTop = "";
	// this.inputBox.style.border = "1px solid white";
	this.inputBox.style.width = "250px";
	this.inputBox.style.display = "flex";
	this.inputBox.style.justifyContent = "center";
	this.inputBox.style.flexFlow = "column";
	this.inputBox.style.gap = "10px";

	this.passwordLabel.style.marginTop = "30px";

	this.loginButton.style.marginTop = "30px";
	this.loginMessage.style.color = "red";
    }
}

export default LoginBox;


