import Box from "../../class/Box";
import type { Component } from "../../class/Component";
import RouteSystem from "../../route/RouteSystem";
import { createElement } from "../../ui_system/Element";
import { checkToken } from "../../utils/apiUtils";
import AuthState from "../../utils/authState";
import HeaderSystem from "./../system/HeaderSystem";
import Profile from "./Profile";


class Header implements Component{

    header: HTMLDivElement = document.querySelector<HTMLDivElement>("#header")!; 
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
    headerSystem: HeaderSystem = new HeaderSystem(this); 

    constructor(){
	this.init();
    }

    get self(){
	return this.header;
    }

    setRouteSystem(routeSystem: RouteSystem){
	console.log("setRouteSystem: ", routeSystem);
	console.log("this is oviously working");
	this.routeSystem = routeSystem; 
	console.log("routeSystem:::: ", this.routeSystem);
    }

    init(){
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    async initElements(){
	await this.headerSystem.updateProfile();

	this.headerSystem.switchAuthtoProfile();

	const name = AuthState.getAuthUser().name;
	if(!name) return;
	this.profile.setProfileName(name);
    }

    connectElements(): void {
	this.header.appendChild(this.title);
	this.header.appendChild(this.buttonTest);

	this.navigation.addChildren([
	    this.navAbout,
	    this.navGame
	]);

	this.header.appendChild(this.navigation.self);
	this.divAuth.addChildren([
	    this.authButtons.addChildren([
		this.signup,
		this.login,
	    ]),
	    this.profile,
	]);
	this.header.appendChild(this.divAuth.self);
    }

    eventElements(): void {
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

	// this.profile..addEventListener("click", ()=>{
	//     window.location.href = "http://localhost:8080/api/public/auth/logout";
	//     localStorage.removeItem("user");
	//     AuthState.setAuthUser(null);
	//     this.headerSystem.switchAuthtoProfile();
	// })

	this.buttonTest.addEventListener("click", async()=>{
	    // const response: Response<User> = await apiFetch("GET", "http://localhost:8080/api/private/AuthUser");
	    // AuthState.setAuthUser(response.data);
	    // console.log("user: ", AuthState.getAuthUser());
	    //
	    const response: boolean = await checkToken();
	    console.log("response: ", response);
	})

    }

    styleElements(): void {
	this.header.style.width = "100%";
	this.header.style.height = "8vh";
	this.header.style.border = "1px solid black";
	this.header.style.backgroundColor = "black"; 
	this.header.style.display = "flex";
	this.header.style.alignItems = "center";

	this.header.style.position = "relative";

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


