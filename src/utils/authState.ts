import type { User } from "./interfaces";

class AuthState{

    private authUser?: User;
    private static instance: AuthState = new AuthState();

	//    public static getInstance(){
	// return this.instance;
	//    } 

    public static setAuthUser(user?: User){
	this.instance.authUser = user;
    }

    public static getAuthUser(): User | undefined{
	return this.instance.authUser;
    }
    
}

export default AuthState;


