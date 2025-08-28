import './style.css'
import  home from "./routes/home.ts"
import game from "./routes/game.ts"  
import Navigo from "navigo"

class Main{

    header : HTMLElement = document.querySelector<HTMLDivElement>("#header")!; 
    app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  

    router = new Navigo("/", {hash: true});

    constructor(){
	this.routeSystem();
    };

    addHeaderElement(element: Function): void{
	this.header.appendChild(element());
    }

    addAppElement(element : Function): void{
	this.app.appendChild(element());
    }

    routeSystem(){
	this.router
	.on("/", ()=> {
	    this.addAppElement(home);
	})
	.on("/game", ()=> {
	    this.addAppElement(game);
	})
	.resolve();
    }
}

export const main = new Main();




