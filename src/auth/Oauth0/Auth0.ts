import { createAuth0Client, User, type Auth0Client } from "@auth0/auth0-spa-js";

class Auth0{

    private static instance: Auth0; 
    private auth0Client: Auth0Client | null = null;

    private currentUser?: User; 

    static async init(){
	Auth0.instance = new Auth0();
	Auth0.instance.auth0Client = await createAuth0Client({
	    domain: "dev-q5kdbw1ub2p58tfl.us.auth0.com",
	    clientId: "KanDAXpsYdg5JhLBWwh5dp1HtEUgJACp",
	    authorizationParams: { redirect_uri: window.location.origin },
	    cacheLocation: "localstorage",
	    useRefreshTokens: true,
	});

	await Auth0.instance.handleRedirectIfNeeded();

	try {
            await Auth0.instance.auth0Client.getTokenSilently();
            Auth0.instance.currentUser = await Auth0.instance.auth0Client.getUser();
            console.log("Session restored:", Auth0.instance.currentUser);
        } catch {
            console.log("No active session found.");
        }

	console.log("Auth0 initialized");
    }

    static async getInstance(): Promise<Auth0 | null>{
        if (!Auth0.instance) {
	    console.error("Auth0 instance was not created.");
	    return null;
	}
        return Auth0.instance;
    }


    getAuth0Client(): Auth0Client | null {
        return this.auth0Client;
    }

    async handleRedirectIfNeeded() {
        if (!this.auth0Client) return;
        if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
            await this.auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, "/");
        }
    }

    getCurrentUser(){
	return this.currentUser;
    }

	//    async checkUser(){
	// if(this.currentUser){
	//     console.log("User is logged-in.");
	//     return;
	// }
	// if(!this.auth0Client){
	//     console.error("auth0Client is not initialized");
	//     return
	// };
	// this.currentUser = await this.auth0Client.getUser();
	// console.log("currentUser: ", this.currentUser);
	//    }


}

export default Auth0;
