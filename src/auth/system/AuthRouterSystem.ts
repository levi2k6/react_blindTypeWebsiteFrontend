import Auth0 from "../Oauth0/Auth0";

class AuthRouterSystem{

    async login(){
	const auth0: Auth0 | null = await Auth0.getInstance();
	if(!auth0){
	    console.error("AuthRouterSystem-login()-auth0 is null")
	    return;
	}

	const  auth0Client = auth0.getAuth0Client();

	if(!auth0Client){
	    console.error("Auth0 client not is initialized.");
	    return;
	}

	await auth0Client.loginWithRedirect({
	    authorizationParams:{
		connection: "google-oauth2",
		prompt: "select_account"
	    }
	});

    }

}

export default AuthRouterSystem;

