import RouteSystem from "../../route/RouteSystem";
import { apiToken } from "../../utils/apiUtils";
import AuthState from "../../utils/authState";
import Profile from "./Profile";
import Component2 from "../../class/Component2";
import Element from "../../class/Element";
import Box2 from "../../class/Box2";
import type RouteSystem2 from "../../route/RouteSystem2";
import HeaderComponentSystem from "./system/HeaderComponentSystem";

class HeaderComponent extends Component2{

    routeSystem?: RouteSystem2;
    headerSystem: HeaderComponentSystem = new HeaderComponentSystem(this); 

    constructor(){
	const rootElement: HTMLDivElement = document.querySelector<HTMLDivElement>("#header")!; 
	super(rootElement, "header");
    }

    get system(){
	return this.headerSystem;
    }

    public setRouteSystem(routeSystem: RouteSystem2){
	this.routeSystem = routeSystem;
    }

    override async initElements(){
	await this.headerSystem.updateProfile();

	this.headerSystem.switchAuthtoProfile();
	const name = AuthState.getAuthUser()?.name;

	if(!name) return;
	console.log("name: ", name);
	// this.profile.setProfileName(name);
    }

    override structureElements(): Array<Component2> {

	// this.self.appendChild(this.title);
	// this.self.appendChild(this.buttonTest);
	//
	// this.navigation.addChildren([
	//     this.navAbout,
	//     this.navGame
	// ]);
	//
	// this.self.appendChild(this.navigation.self);
	// this.divAuth.addChildren([
	//     this.authButtons.addChildren([
	// 	this.signup,
	// 	this.login,
	//     ]),
	//     this.profile,
	// ]);
	// this.self.appendChild(this.divAuth.self);
	
	const buttonTest: Element = new Element("button", "buttonTest", "text");
	const title: Element = new Element("h2", "title", "Blind Type");
	const navigation: Box2 = new Box2("navigation");
	    const navAbout: Element = new Element("a", "navAbout", "about"); 
	    const navGame: Element = new Element("a", "navGame");
	const divAuth: Box2 = new Box2("divAuth");
	    const authButtons: Box2 = new Box2("authButtons");
		const signup: Element = new Element("button", "signup", "Singup"); 
		const login: Element = new Element("button", "login", "Login"); 
	    const profile: Profile = new Profile(this, "profile");

	return [
	    buttonTest,
	    title,
	    navigation.addChildren([
		navAbout,
		navGame
	    ]),
	    divAuth.addChildren([
		authButtons.addChildren([
		    signup,
		    login
		]),
		profile
	    ])
	]

    }

    override initSystems(){

    }

    override eventElements(): void {
	console.log("eventElements");

	const authButtons = this.getChild("divAuth").getChild("authButtons")

	this.getChild("navigation").addEvent("navGame", "click", ()=>{
	    console.log("routeSystem: ", this.routeSystem);
	    if(!this.routeSystem) return; 
	    this.routeSystem.navigate("/");
	});

	authButtons.addEvent("login", "click", ()=>{
	    console.log("routeSystem: ", this.routeSystem);
	    if(!this.routeSystem) return; 
	    this.routeSystem.navigate("/auth");
	});

	this.getChild("navigation").addEvent("navAbout", "click", ()=>{
	    console.log("routeSystem: ", this.routeSystem);
	    if(!this.routeSystem) return; 
	    this.routeSystem.navigate("/about");
	});

	this.addEvent("buttonTest", "click", async()=>{
	    const uri = import.meta.env.VITE_AUTH_PUBLIC_URI + "/auth0/checkToken";
	    const response = await apiToken(uri, "access_token");
	    console.log("response: ", response);
	})

    }

    override styleElements(): void {
	this.style.width = "100%";
	this.style.height = "8vh";
	this.style.border = "1px solid black";
	this.style.backgroundColor = "black"; 
	this.style.display = "flex";
	this.style.alignItems = "center";

	this.style.position = "relative";

	this.getChild("title").style.position = "absolute";
	this.getChild("title").style.left = "10vh";
	
	const navigation = this.getChild("navigation");
	navigation.style.position = "absolute";
	navigation.style.right = "40vh";
	navigation.style.display = "flex";
	navigation.style.gap = "30px";

	const divAuth = this.getChild("divAuth");
	divAuth.style.position = "absolute";
	divAuth.style.right = "5vh";
	divAuth.style.display = "flex";
	divAuth.style.alignItems = "center";

	// this.authButtons.style.display = "flex";
	
	this.headerSystem.switchAuthtoProfile();
	this.getChild("divAuth").styleChild("authButtons").gap = "10px";
    }

    
}

export default HeaderComponent;


