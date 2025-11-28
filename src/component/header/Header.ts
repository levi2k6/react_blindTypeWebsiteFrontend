import Box from "../../class/Box";
import Component from "../../class/Component";
import RouteSystem from "../../route/RouteSystem";
import { createElement } from "../../ui_system/Element";
import { apiToken } from "../../utils/apiUtils";
import AuthState from "../../utils/authState";
import HeaderSystem from "./../system/HeaderSystem";
import Profile from "./Profile";

class Header extends Component{

    buttonTest: HTMLButtonElement = createElement("button", "test") as HTMLButtonElement;
    title: HTMLElement = createElement("h2", "Blind Type");
    navigation: Box = new Box();
	navAbout: HTMLAnchorElement = createElement("a", "About") as HTMLAnchorElement; 
	navGame: HTMLAnchorElement = createElement("a", "Game") as HTMLAnchorElement;

    divAuth: Box = new Box();
	authButtons: Box = new Box();
	    signup: HTMLButtonElement = createElement("button", "Signup") as HTMLButtonElement; 
	    login: HTMLButtonElement = createElement("button", "Login") as HTMLButtonElement; 
	profile: Profile = new Profile(this, "Profile");


    routeSystem: RouteSystem | null = null;
    system: HeaderSystem = new HeaderSystem(this); 

    constructor(){
	const mainElement: HTMLDivElement = document.querySelector<HTMLDivElement>("#header")!; 
	super(mainElement, this.system);

    }

    setRouteSystem(routeSystem: RouteSystem){
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

    override connectElements(): void {
	this.self.appendChild(this.title);
	this.self.appendChild(this.buttonTest);

	this.navigation.addChildren([
	    this.navAbout,
	    this.navGame
	]);

	this.self.appendChild(this.navigation.self);
	this.divAuth.addChildren([
	    this.authButtons.addChildren([
		this.signup,
		this.login,
	    ]),
	    this.profile,
	]);
	this.self.appendChild(this.divAuth.self);
    }

    override eventElements(): void {
	console.log("eventElements");

	this.navGame.addEventListener("click", ()=>{
	    console.log("routeSystem: ", this.routeSystem);
	    if(!this.routeSystem) return; 
	    this.routeSystem.navigate("/");
	});

	this.login.addEventListener("click", ()=>{
	    console.log("routeSystem: ", this.routeSystem);
	    if(!this.routeSystem) return; 
	    this.routeSystem.navigate("/auth");
	});

	this.navAbout.addEventListener("click", ()=>{
	    console.log("routeSystem: ", this.routeSystem);
	    if(!this.routeSystem) return; 
	    this.routeSystem.navigate("/about");
	});

	this.buttonTest.addEventListener("click", async()=>{
	    // const response: boolean = await checkAccessToken();
	    // const response: Response<User> = await apiFetch("GET", "http://localhost:8080/api/v1/private/user/auth-user");
	    const response = await apiToken("http://localhost:8080/api/v1/private/auth0/checkToken", "access_token");

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

	this.title.style.position = "absolute";
	this.title.style.left = "10vh";
	
	this.navigation.style.position = "absolute";
	this.navigation.style.right = "40vh";
	this.navigation.style.display = "flex";
	this.navigation.style.gap = "30px";

	this.divAuth.style.position = "absolute";
	this.divAuth.style.right = "5vh";
	this.divAuth.style.display = "flex";
	this.divAuth.style.alignItems = "center";

	// this.authButtons.style.display = "flex";
	this.headerSystem.switchAuthtoProfile();
	this.authButtons.style.gap = "10px";
    }

}

export default Header;


