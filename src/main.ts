import './style.css'
import GameRouter from "./game/component/GameRouter.ts"  
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from './component/Header.ts';
import AuthRouter from './auth/AuthRouter.ts';
import AboutRouter from './about/AboutRouter.ts';
import RouteSystem from './route/RouteSystem.ts';

function Main(){
    
    // const app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  
    console.log("Main constructor start");
    const header : Header = new Header();
    console.log("Header created");

    const gameRouter: GameRouter = new GameRouter("Game");
    const aboutRouter: AboutRouter = new AboutRouter("About");
    const authRouter: AuthRouter = new AuthRouter("Auth");

    const routeSystem: RouteSystem = new RouteSystem(
	gameRouter,
	aboutRouter,
	authRouter
    );

    console.log("Setting routeSystem");
    header.setRouteSystem(routeSystem);
    console.log("Route system set");
}


Main();


