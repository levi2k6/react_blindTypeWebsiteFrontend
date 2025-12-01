import './style.css'
import GameRouter from "./game/component/GameRouter.ts"  
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from './component/header/Header.ts';
import LoginRouter from './login/LoginRouter.ts';
import AboutRouter from './about/AboutRouter.ts';
import RouteSystem from './route/RouteSystem.ts';
import VerifyFailedEmailRouter from './email_verification/VerifyFailedEmailRouter.ts';
import AlreadyVerifiedEmailRouter from './email_verification/AlreadyVerifiedRouter.ts';

async function Main(){

    const header : Header = new Header();

    const gameRouter: GameRouter = new GameRouter("Game");
    const aboutRouter: AboutRouter = new AboutRouter("About");
    const loginRouter: LoginRouter = new LoginRouter("Auth");
    const verifyFailedRouter: VerifyFailedEmailRouter = new VerifyFailedEmailRouter("VerifyFailed"); 
    const alreadyVerifiedEmailRouter: AlreadyVerifiedEmailRouter = new AlreadyVerifiedEmailRouter("AlreadyVerified"); 

    const routeSystem: RouteSystem = new RouteSystem(
	gameRouter,
	aboutRouter,
	loginRouter,
	verifyFailedRouter,
	alreadyVerifiedEmailRouter
    );

    console.log("Setting routeSystem");
    header.setRouteSystem(routeSystem);
    loginRouter.setRouteSystem(routeSystem);
    console.log("Route system set");
}


Main();


