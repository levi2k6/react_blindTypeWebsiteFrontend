import Box from "../class/Box";
import { createElement } from "../ui_system/Element";
import LoginBox from "./LoginBox";
import LoginRouterSystem from "./system/LoginRouterSystem";
import type RouteSystem from "../route/RouteSystem";
import Box2 from "../class/Box2";
import Element from "../class/Element";
import type Component2 from "../class/Component2";

class LoginRouter extends Box2{

    public loginRouterSystem: LoginRouterSystem = new LoginRouterSystem(this);

    constructor( name: string){
	super(name);
    }

    setRouteSystem(routeSystem: RouteSystem){
	const loginBox = this.getChild("loginBox") as LoginBox;
	loginBox.setRouteSystem(routeSystem);
    }

    override initElements(){
	const googleImg = this.getChildSelf("googleImg") as HTMLImageElement;
	googleImg.src = "https://developers.google.com/identity/images/g-logo.png";  
    }

    override structureElements(): Array<Component2> {
	const loginBox: LoginBox = new LoginBox("LoginBox");

	const divAuth0: Box2 = new Box2("divAuth0");
	    const googleButton: Element = new Element("button", "googleButton", "google");
		const googleImg: Element = new Element("img", "googleImg");

	return [
	    loginBox,
	    divAuth0.addChildren([
		googleButton.addChildren([googleImg])
	    ])
	]

    }

    override eventElements(): void {
	this.addEvent("googleButton", "click", ()=>{
	    this.loginRouterSystem.login();
	});
    }

    override styleElements(): void {
 	this.style.position = "relative";
	this.style.border = "5px solid pink"
	// this.style.width =  "98vw";
	this.style.height = "100%";
	this.style.display = "flex"; 
	this.style.gap = "20px";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	this.getChild("googleImg").style.height = "30px";
	
    }

    preDestroy(): void {
    }
}

export default LoginRouter;


