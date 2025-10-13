import Box from "../class/Box";
import type { Component } from "../class/Component";
import { createElement } from "../ui_system/Element";


class Header implements Component{

    header: HTMLDivElement = document.querySelector<HTMLDivElement>("#header")!; 
    title: HTMLElement = createElement("h2", "Blind Type");
    navigation: Box = new Box();
	navHome: HTMLAnchorElement = createElement("a", "Home") as HTMLAnchorElement; 
	navGame: HTMLAnchorElement = createElement("a", "Game") as HTMLAnchorElement;

    login: HTMLButtonElement = createElement("button", "Login") as HTMLButtonElement; 

    constructor(){
	this.init();
    }

    get self(){
	return this.header;
    }


    init(){
	this.initElements();
	this.connectElements();
	this.eventElements();
	this.styleElements();
    }

    initElements(): void{

    }

    connectElements(): void {
	this.header.appendChild(this.title);

	this.navigation.addChildren([
	    this.navHome,
	    this.navGame
	]);

	this.header.appendChild(this.navigation.self);
	this.header.appendChild(this.login);
    }

    eventElements(): void {
        
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

	this.navHome.href = "/";
	this.navGame.href = "/game";
	
	this.login.style.position = "absolute";
	this.login.style.right = "8vh";
    }

}

export default Header;


