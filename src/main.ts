import './style.css'
import GameRouter from "./game/component/GameRouter.ts"  
import "@fortawesome/fontawesome-free/css/all.min.css";

import LifeCycleSystem from './systems/LifeCycleSystem.ts';
import RouteSystem2 from './route/RouteSystem2.ts';
import Test1 from './test/Test1.ts';
import Test2 from './test/Test2.ts';
import AppComponent from './components/app/AppComponent.ts';
import HeaderComponent from './components/header/HeaderComponent.ts';
import RouteResolver from './systems/RouterResolver.ts';
import LoginRouter from './login/LoginRouter.ts';
import AboutRouter from './about/AboutRouter.ts';
import RegisterRouter from './register/RegisterRouter.ts';
import Resolver from './systems/Resolver.ts';
import InfoRouter from './profile/InfoRouter.ts';
import StartupSystem from './systems/StartupSystem.ts';

async function Main(){

    const startupSystem: StartupSystem = new StartupSystem();
    await startupSystem.start();

    const header: HeaderComponent = new HeaderComponent();
    const app: AppComponent = new AppComponent();

    const lifeCycleSystem: LifeCycleSystem = new LifeCycleSystem(app, header);

    const test1: Test1 = new Test1();
    const test2: Test2 = new Test2(lifeCycleSystem);
    const gameRouter: GameRouter = new GameRouter("GameRouter", lifeCycleSystem);
    const loginRouter: LoginRouter = new LoginRouter("LoginRouter");
    const registerRouter: RegisterRouter = new RegisterRouter("RegisterRouter");
    const aboutRouter: AboutRouter = new AboutRouter("AboutRouter");
    const infoRouter: InfoRouter = new  InfoRouter("InfoRouter");


    const resolver: Resolver = new Resolver(
	lifeCycleSystem,
	header,
	app,
	test1,
	test2,
	gameRouter,
	loginRouter,
	registerRouter,
	aboutRouter
    ); 

    const routeSystem: RouteSystem2 = new RouteSystem2(
	lifeCycleSystem,
	header,
	app,
	test1,
	test2,
	gameRouter,
	loginRouter,
	registerRouter,
	aboutRouter,
	infoRouter
    ); 

}



Main();


