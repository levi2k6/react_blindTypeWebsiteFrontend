import Box from "../class/Box";
import { createElement } from "../ui_system/Element";
import LoginBoxSystem from "./system/LoginBoxSystem";
import type RouteSystem from "../route/RouteSystem";
import Box2 from "../class/Box2";
import Element from "../class/Element";
import type Component2 from "../class/Component2";
import RouteSystem2 from "../route/RouteSystem2";
import { apiLogin } from "../utils/api/apiAuth";
import type HeaderComponent from "../components/header/HeaderComponent";

class LoginBox extends  Box2{

    routeSytem: RouteSystem2 | undefined;
    header?: HeaderComponent;
    loginBoxSystem: LoginBoxSystem = new LoginBoxSystem(this, );


    constructor(name: string){
	super(name);
    }

    public setComponent(routeSystem: RouteSystem2, header: HeaderComponent){
	this.routeSytem = routeSystem;
	this.header = header;
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
	if(this.routeSytem){
	    throw new Error("routeSystem is undefined");
	}

	if(this.header){
	    throw new Error("header is undefined");
	};


	this.addEvent("loginButton", "click", async()=>{
	    console.log("Auth login")
	    const inputBox = this.getChild("inputBox"); 
	    const usernameInput = inputBox.getChildSelf("usernameInput") as HTMLInputElement;
	    const passwordInput = inputBox.getChildSelf("passwordInput") as HTMLInputElement;

	    const username = usernameInput.value;
	    const password = passwordInput.value;

	    const payload: Record<string, string> = {
		"username": username,
		"password": password
	    }
	    console.log(await apiLogin(payload));
	    this.header?.system.updateProfile();
	    console.log("headerSystem look here: ", this.header?.system);
	    this.routeSytem?.navigate("/");
	    console.log("routeSystem: ", this.routeSytem);
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


