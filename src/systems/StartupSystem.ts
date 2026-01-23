import { ClientError, NetworkError, ServerError } from "../exceptions/api/ApiError";
import { apiRefresh } from "../utils/api/apiAuth"; 
import { apiGetAuthUser } from "../utils/api/apiUser";
import AuthState from "../utils/authState";

class StartupSystem{

    public async start(){
	const isRefreshSuccess = await this.refreshStartup();
	if(isRefreshSuccess){
	    await this.setCurrentUser();
	}
    }

    public async refreshStartup(){
	try{
	    const response = await apiRefresh();

	    if(!response.success){
		console.error(response.message);
		return false;
	    }

	    console.log(response.message);
	    return true;
	}catch(ex){
	    if(ex instanceof Error){
		console.error(ex);
	    }
	}
    }

    public async setCurrentUser(){
	const response = await apiGetAuthUser();
	if(!response.data){
	    return;
	}

	AuthState.setAuthUser(response.data);
    }

}

export default StartupSystem;

