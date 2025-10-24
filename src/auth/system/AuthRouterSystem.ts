import type AuthRouter from "../AuthRouter";

class AuthRouterSystem{

    authRouter: AuthRouter;

    constructor(authRouter: AuthRouter){
	this.authRouter = authRouter;
    }

    async login() {
	fetch("http://localhost:8080/api/public/auth0/login", { method: "POST" })
	    .then(res => res.json())
	    .then(data => window.location.href = data.url);
    }


}

export default AuthRouterSystem;

