import type AuthRouter from "../AuthRouter";

class AuthRouterSystem{

    authRouter: AuthRouter;

    constructor(authRouter: AuthRouter){
	this.authRouter = authRouter;
    }

    async login() {
	window.location.href = "http://localhost:8080/api/public/auth0/login";
    }


}

export default AuthRouterSystem;

