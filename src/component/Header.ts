import Box from "../class/Box";
import type { Component } from "../class/Component";
import ApiService from "../dataManager/ApiService";
import DataManager from "../dataManager/ApiService";
import RouteSystem from "../route/RouteSystem";
import { createElement } from "../ui_system/Element";
import HeaderSystem from "./system/HeaderSystem";


class Header implements Component{

    header: HTMLDivElement = document.querySelector<HTMLDivElement>("#header")!; 
    buttonTest: HTMLButtonElement = createElement("button", "test") as HTMLButtonElement;
    title: HTMLElement = createElement("h2", "Blind Type");
    navigation: Box = new Box();
	navAbout: HTMLAnchorElement = createElement("a", "About") as HTMLAnchorElement; 
	navGame: HTMLAnchorElement = createElement("a", "Game") as HTMLAnchorElement;

    login: HTMLButtonElement = createElement("button", "Login") as HTMLButtonElement; 

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
    }

    connectElements(): void {
	this.header.appendChild(this.title);
	this.header.appendChild(this.buttonTest);

	this.navigation.addChildren([
	    this.navAbout,
	    this.navGame
	]);

	this.header.appendChild(this.navigation.self);
	this.header.appendChild(this.login);
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

	this.buttonTest.addEventListener("click", async()=>{
	    const apiService: ApiService = ApiService.getInstance();
	    const user = apiService.getCurrentUser();
	    console.log("user: ", user);
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
	this.navigation.style.right = "30vh";
	this.navigation.style.display = "flex";
	this.navigation.style.gap = "30px";

	
	this.login.style.position = "absolute";
	this.login.style.right = "8vh";
    }

}

export default Header;


