import type RouteSystem2 from "../../route/RouteSystem2";
import LoginRouter from "../LoginRouter";

class LoginRouterSystem{

    private loginRouter: LoginRouter; 
    private routeSystem: RouteSystem2 | undefined; 

    constructor(LoginRouter: LoginRouter){
	this.loginRouter = LoginRouter;
    }

    public setRouteSystem(routeSystem: RouteSystem2){
	this.routeSystem = routeSystem;
    }

    async login() {
	window.location.href = import.meta.env.VITE_URL + "/public/auth0/login";
    }

}

export default LoginRouterSystem;

