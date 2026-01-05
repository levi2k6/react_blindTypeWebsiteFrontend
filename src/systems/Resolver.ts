import type AboutRouter from "../about/AboutRouter";
import type AppComponent from "../components/app/AppComponent";
import type HeaderComponent from "../components/header/HeaderComponent";
import type GameRouter from "../game/component/GameRouter";
import type LoginRouter from "../login/LoginRouter";
import type RegisterRouter from "../register/RegisterRouter";
import type RouteSystem2 from "../route/RouteSystem2";
import type Test1 from "../test/Test1";
import type Test2 from "../test/Test2";
import type LifeCycleSystem from "./LifeCycleSystem";

class Resolver{

    public lifeCycleSystem: LifeCycleSystem;
    public header: HeaderComponent;
    public app: AppComponent;
    public test1: Test1;
    public test2: Test2;
    public gameRouter: GameRouter;
    public loginRouter: LoginRouter;
    public registerRouter: RegisterRouter;
    public aboutRouter: AboutRouter;

    constructor(
	lifeCycleSystem: LifeCycleSystem,
	header: HeaderComponent,
	app: AppComponent,
	test1: Test1,
	test2: Test2,
	gameRouter: GameRouter,
	loginRouter: LoginRouter,
	registerRouter: RegisterRouter,
	aboutRouter: AboutRouter 
    ){
        this.lifeCycleSystem = lifeCycleSystem;
        this.header = header;
        this.app = app;
        this.test1 = test1;
        this.test2 = test2;
        this.gameRouter = gameRouter;
        this.loginRouter = loginRouter;
        this.registerRouter = registerRouter;
        this.aboutRouter = aboutRouter;

	this.resolve();
    }

    public resolve(){
	this.resolveHeader();
    }

    public resolveHeader(){
	this.loginRouter.setHeader(this.header);
    }



}

export default Resolver;
