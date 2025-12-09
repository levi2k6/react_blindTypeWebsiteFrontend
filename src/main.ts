import './style.css'
import GameRouter from "./game/component/GameRouter.ts"  
import "@fortawesome/fontawesome-free/css/all.min.css";

import LifeCycleSystem from './systems/LifeCycleSystem.ts';
import RouteSystem2 from './route/RouteSystem2.ts';
import Test1 from './test/Test1.ts';
import Test2 from './test/Test2.ts';

async function Main(){

	const lifCycleSystem: LifeCycleSystem = new LifeCycleSystem();
	const test1: Test1 = new Test1();
	const test2: Test2 = new Test2(lifCycleSystem);
	const gameRouter: GameRouter = new GameRouter("GameRouter");

	const routeSystem2: RouteSystem2 = new RouteSystem2(
	    lifCycleSystem,
	    test1,
	    test2,
	    gameRouter
	); 

}



Main();


