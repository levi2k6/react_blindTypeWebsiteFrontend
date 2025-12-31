import LoginRouter from "../LoginRouter";

class LoginRouterSystem{

    loginRouter: LoginRouter; 

    constructor(LoginRouter: LoginRouter){
	this.loginRouter = LoginRouter;
    }

    async login() {
	window.location.href = import.meta.env.VITE_AUTH_PUBLIC_URI + "/auth/login";
    }

}

export default LoginRouterSystem;

