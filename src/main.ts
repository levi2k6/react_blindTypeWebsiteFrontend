import './style.css'
import  Home from "./routes/home.ts"
import GameRouter from "./game/component/GameRouter.ts"  
import Navigo from "navigo"
import type Box from './class/Box.ts';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from './component/Header.ts';

class Main{

    // header : HTMLElement = document.querySelector<HTMLDivElement>("#header")!; 
    
    header : Header = new Header();

    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: true});

    gameRouter: GameRouter = new GameRouter("Game");

    constructor(){
	this.routeSystem();
    };

    addHeaderElement(route: Box): void{
	if(route.self) return;
	
	this.header.self.appendChild(route.self);
    }

    addAppElement(route : Box): void{
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




