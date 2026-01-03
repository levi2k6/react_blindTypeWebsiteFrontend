import LoginBox from "./LoginBox";
import LoginRouterSystem from "./system/LoginRouterSystem";
import Box2 from "../class/Box2";
import Element from "../class/Element";
import Component2 from "../class/Component2";
import RouteSystem2 from "../route/RouteSystem2";
import type HeaderComponent from "../components/header/HeaderComponent";

class LoginRouter extends Box2{

    // public loginRouterSystem: LoginRouterSystem = new LoginRouterSystem(this);
    public header?: HeaderComponent;
    public routeSystem?: RouteSystem2;

    public loginRouterSystem?: LoginRouterSystem;
    
    public constructor(name: string){
	super(name);
    }

    public setHeader(header: HeaderComponent){
	this.header = header;
    } 

    public setRouteSystem(routeSystem: RouteSystem2){
	this.routeSystem = routeSystem;
    }

    override structureElements(): Array<Component2> {
	const loginBox: LoginBox = new LoginBox("loginBox");

	const divAuth0: Box2 = new Box2("divAuth0");
	    const googleButton: Element = new Element("button", "googleButton");
		const googleImg: Element = new Element("img", "googleImg");

	return [
	    loginBox,
	    divAuth0.addChildren([
		googleButton.addChildren([googleImg])
	    ])
	]

    }

    override initSystems(): void {
	if(!this.routeSystem){
	    throw new Error("RouteSystem is udefined"); 
	}
	if(!this.header){
	    throw new Error("Header is undefined");
	}

	const loginBox: LoginBox = this.getChild("loginBox") as LoginBox;
	loginBox.setComponent(this.routeSystem, this.header);

	this.loginRouterSystem = new LoginRouterSystem(this, this.routeSystem);
    }

    override initElements(){
	const googleImg = this.getChild("divAuth0").getChild("googleButton").getChildSelf("googleImg") as HTMLImageElement;
	googleImg.src = "https://developers.google.com/identity/images/g-logo.png";  
    }


    override eventElements(): void {
	this.getChild("divAuth0").addEvent("googleButton", "click", ()=>{
	    this.loginRouterSystem?.login();
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

	this.getChild("divAuth0").getChild("googleButton").styleChild("googleImg").height = "30px";
	
    }

    preDestroy(): void {
    }
}

export default LoginRouter;


