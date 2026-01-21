import { apiRefresh } from "../utils/api/apiAuth"; 
import { apiGetAuthUser } from "../utils/api/apiUser";

class StartupSystem{

    public start(){
	apiRefresh();
	apiGetAuthUser();
    }

}

export default StartupSystem;

