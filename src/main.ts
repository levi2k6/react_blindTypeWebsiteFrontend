import './style.css'
import GameRouter from "./game/component/GameRouter.ts"  
import "@fortawesome/fontawesome-free/css/all.min.css";

import LifeCycleSystem from './systems/LifeCycleSystem.ts';
import RouteSystem2 from './route/RouteSystem2.ts';
import Test1 from './test/Test1.ts';
import Test2 from './test/Test2.ts';
import Header from './component/header/Header.ts';
import App from './components/app/App.ts';

async function Main(){


    const header: Header = new Header();
    const app: App = new App();
 
    const lifeCycleSystem: LifeCycleSystem = new LifeCycleSystem();
    const test1: Test1 = new Test1();
    const test2: Test2 = new Test2(lifeCycleSystem);
    const gameRouter: GameRouter = new GameRouter("GameRouter", lifeCycleSystem);

    const routeSystem2: RouteSystem2 = new RouteSystem2(
	app,
	lifeCycleSystem,
	test1,
	test2,
	gameRouter
    ); 

}



Main();


