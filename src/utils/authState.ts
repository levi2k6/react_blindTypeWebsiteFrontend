import type { User } from "./interfaces";

class AuthState{

    private authUser: User | null = null;
    private static instance: AuthState = new AuthState();

	//    public static getInstance(){
	// return this.instance;
	//    } 

    public static setAuthUser(user: User | null){
	this.instance.authUser = user;
    }

    public static getAuthUser(): User | null{
	return this.instance.authUser;
    }
    
}

export default AuthState;


