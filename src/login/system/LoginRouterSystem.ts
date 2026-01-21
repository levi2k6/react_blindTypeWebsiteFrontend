import type RouteSystem2 from "../../route/RouteSystem2";
import LoginRouter from "../LoginRouter";

class LoginRouterSystem{

    private loginRouter: LoginRouter; 
    private routeSystem: RouteSystem2; 

    constructor(LoginRouter: LoginRouter, routeSystem: RouteSystem2){
	this.loginRouter = LoginRouter;
	this.routeSystem = routeSystem;
    }

    public setRouteSystem(routeSystem: RouteSystem2){
	this.routeSystem = routeSystem;
    }

    async login() {
	window.location.href = import.meta.env.VITE_URL + "/auth0/login";
    }

}

export default LoginRouterSystem;

