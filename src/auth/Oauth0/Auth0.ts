import { createAuth0Client, type Auth0Client } from "@auth0/auth0-spa-js";

class Auth0{

    auth0Client: Auth0Client | null = null;

    constructor(){
	this.initAuth0();
    }

    async initAuth0(){
	this.auth0Client = await createAuth0Client({
	    domain: "KanDAXpsYdg5JhLBWwh5dp1HtEUgJACp",
	    clientId: "z0YkStdVV38UKQhB2ioSf4OWXc1n985kZkgcCGeSNzNONZEQy2yYLzevED4QAI_J",
	    authorizationParams: {
		redirect_uri: window.location.origin,
	    },
	})
    }

    getAuth0Client(){
	return this.auth0Client;
    }

}

export default Auth0;


// AUTH0_CLIENT_ID=KanDAXpsYdg5JhLBWwh5dp1HtEUgJACp
// AUTH0_CLIENT_SECRET=z0YkStdVV38UKQhB2ioSf4OWXc1n985kZkgcCGeSNzNONZEQy2yYLzevED4QAI_J
// AUTH0_DOMAIN=https://dev-q5kdbw1ub2p58tfl.us.auth0.com/
