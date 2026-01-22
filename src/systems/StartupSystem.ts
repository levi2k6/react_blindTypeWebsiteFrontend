import { apiRefresh } from "../utils/api/apiAuth"; 
import { apiGetAuthUser } from "../utils/api/apiUser";
import AuthState from "../utils/authState";

class StartupSystem{

    public async start(){
	await apiRefresh();
	await this.setCurrentUser();
    }

    public async setCurrentUser(){
	const response = await apiGetAuthUser();
	if(!response.data){
	    return;
	}

	AuthState.setAuthUser(response.data);
	console.log("StartupSystem authUser", AuthState.getAuthUser());
    }

}

export default StartupSystem;

