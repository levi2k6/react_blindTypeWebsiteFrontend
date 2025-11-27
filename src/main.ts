import './style.css'
import GameRouter from "./game/component/GameRouter.ts"  
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from './component/header/Header.ts';
import AuthRouter from './auth/AuthRouter.ts';
import AboutRouter from './about/AboutRouter.ts';
import RouteSystem from './route/RouteSystem.ts';
import VerifyFailedEmailRouter from './email_verification/VerifyFailedEmailRouter.ts';
import AlreadyVerifiedEmailRouter from './email_verification/AlreadyVerifiedRouter.ts';

async function Main(){

    const header : Header = new Header();

    const gameRouter: GameRouter = new GameRouter("Game");
    const aboutRouter: AboutRouter = new AboutRouter("About");
    const authRouter: AuthRouter = new AuthRouter("Auth");
    const verifyFailedRouter: VerifyFailedEmailRouter = new VerifyFailedEmailRouter("VerifyFailed"); 
    const alreadyVerifiedEmailRouter: AlreadyVerifiedEmailRouter = new AlreadyVerifiedEmailRouter("AlreadyVerified"); 

    const routeSystem: RouteSystem = new RouteSystem(
	gameRouter,
	aboutRouter,
	authRouter,
	verifyFailedRouter,
	alreadyVerifiedEmailRouter
    );

    console.log("Setting routeSystem");
    header.setRouteSystem(routeSystem);
    authRouter.setRouteSystem(routeSystem);
    console.log("Route system set");
}


Main();


