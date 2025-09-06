import './style.css'
import  Home from "./routes/home.ts"
import GameRouter from "./routes/GameRouter.ts"  
import Navigo from "navigo"
import type Component from './components/Component.ts';

class Main{

    header : HTMLElement = document.querySelector<HTMLDivElement>("#header")!; 
    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: true});
    gameRouter: GameRouter = new GameRouter("Game");

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
	    this.addAppElement(this.gameRouter);
	})
	.resolve();
    }
}

export const main = new Main();




