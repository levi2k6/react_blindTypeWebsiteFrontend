import './style.css'
import  Home from "./routes/home.ts"
import Game from "./routes/game.ts"  
import Navigo from "navigo"
import type Component from './components/Component.ts';

class Main{

    header : HTMLElement = document.querySelector<HTMLDivElement>("#header")!; 
    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: true});
    game: Game = new Game("Game");

    constructor(){
	this.routeSystem();
    };

    addHeaderElement(route: Component): void{
	if(route.self) return;
	
	this.header.appendChild(route.self);
    }

    addAppElement(route : Component): void{
	if(!route.self) return;
	this.app.appendChild(route.self);
    }

    routeSystem(){
	this.router
	.on("/", ()=> {
	    this.addAppElement(Home);
	})
	.on("/game", ()=> {
	    this.addAppElement(this.game);
	})
	.resolve();
    }
}

export const main = new Main();




