import Box from "../class/Box";
import { createElement } from "../ui_system/Element";
import LoginBoxSystem from "./system/LoginBoxSystem";
import type RouteSystem from "../route/RouteSystem";
import Box2 from "../class/Box2";
import Element from "../class/Element";
import type Component2 from "../class/Component2";
import type RouteSystem2 from "../route/RouteSystem2";

class LoginBox extends  Box2{

    routeSytem: RouteSystem2 | undefined;
    loginBoxSystem: LoginBoxSystem = new LoginBoxSystem(this, );


    constructor(name: string){
	super(name);
    }

    setRouteSystem(routeSystem: RouteSystem2){
	this.routeSytem = routeSystem;
    }

    public initComponent(){

    }

    override initElements(): void {
	const inputBox = this.getChild("inputBox"); 

	const usernameInput = inputBox.getChildSelf("usernameInput") as HTMLInputElement;
	usernameInput.type = "text";
	const passwordInput = inputBox.getChildSelf("passwordInput") as HTMLInputElement;
	passwordInput.type = "password";
    }

    override structureElements(): Array<Component2> {

	const loginH1: Element = new Element("h1", "loginH1", "LOGIN");

	const inputBox: Box2 = new Box2("inputBox");
	    const usernameLabel: Element = new Element("label", "usernameLabel", "Username");
	    const usernameInput: Element = new Element("input", "usernameInput");

	    const passwordLabel: Element = new Element("label", "passwordLabel", "Password");
	    const passwordInput: Element = new Element("input", "passwordInput");

	const loginButton: Element = new Element("button", "loginButton", "Login");
	const loginMessage: Element = new Element("label", "loginMessage");


	return [ 
	    loginH1,
	    inputBox.addChildren([
		usernameLabel,
		usernameInput,
		passwordLabel,
		passwordInput
	    ]),
	    loginButton,
	    loginMessage
	]
    }

    override eventElements(): void {
	this.addEvent("loginButton", "click", ()=>{
	    console.log("Auth login")
	    const inputBox = this.getChild("inputBox"); 
	    const usernameInput = inputBox.getChildSelf("usernameInput") as HTMLInputElement;
	    const passwordInput = inputBox.getChildSelf("usrenameInput") as HTMLInputElement;

	    const username = usernameInput.value;
	    const password = passwordInput.value;

	    this.loginBoxSystem.authenticate(username, password);
	})
    }

    override styleElements(): void {
	this.style.border = "1px solid black";
	this.style.background = "black";
	this.style.height = "400px";
	this.style.width = "400px";
	this.style.display = "flex";
	this.style.flexFlow = "column";
	this.style.alignItems = "center";

	const inputBox = this.getChild("inputBox"); 
	// this.inputBox.style.marginTop = "";
	// this.inputBox.style.border = "1px solid white";
	inputBox.style.width = "250px";
	inputBox.style.display = "flex";
	inputBox.style.justifyContent = "center";
	inputBox.style.flexFlow = "column";
	inputBox.style.gap = "10px";

	const passwordLabel = inputBox.styleChild("passwordLabel");
	passwordLabel.marginTop = "30px";

	const loginButton = this.styleChild("loginButton"); 
	loginButton.marginTop = "30px";
	const loginMessage = this.styleChild("loginMessage");
	loginMessage.color = "red";
    }
}

export default LoginBox;


