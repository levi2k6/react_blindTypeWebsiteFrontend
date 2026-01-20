import { apiFetch, checkAccessToken, refreshToken } from "../../../utils/apiUtils";
import type { Response, User } from "../../../utils/interfaces";
import AuthState from "../../../utils/authState";
import { getAuthUser } from "../../../utils/api/apiUser";
import type HeaderComponent from "../HeaderComponent";
import type Profile from "../Profile";
import type RouteSystem2 from "../../../route/RouteSystem2";

class HeaderComponentSystem{

    header: HeaderComponent;

    routeSystem: RouteSystem2 | undefined;

    constructor(header: HeaderComponent){
	this.header = header;
    }


    public setRouteSystem(routeSystem: RouteSystem2){
	this.routeSystem = routeSystem;
    }

    public switchAuthToProfile(){
	console.log("switchAuthToProfile");
	const user = localStorage.getItem("user");
	console.log("user: ", user);

	const divAuth = this.header.getChild("divAuth")

	if(user && user !== "undefined"){
	    divAuth.styleChild("authButtons").display = "none";
	    divAuth.styleChild("profile").display = "flex";
	}else{
	    divAuth.styleChild("authButtons").display = "flex";
	    divAuth.styleChild("profile").display = "none";
	}
    }

    async updateProfile(){


	// console.log("profile updating");
	// const tokenStatus = await checkAccessToken();
	// console.log("tokenStatus: ", tokenStatus);
	//
	// if(!tokenStatus){
	//     localStorage.removeItem("user");
	//     const response = await refreshToken();
	//     if(!response.data){
	// 	return;
	//     }
	//
	//     const tokenStatus = await checkAccessToken();
	//     if(!tokenStatus.data){
	// 	console.warn("Warning in HeaderSystem updateProfile()");
	// 	return;
	//     }
	// }
	//
	// await this.setCurrentUser();
    }

    public async setCurrentUser(){
	const user = localStorage.getItem("user");

	console.log("set CurrentUser user: ", user);
	console.log("state: ", !user);
	if(!user){
	    console.log("it did triggered this");
	    // const response: Response<User> = await apiFetch("GET", "http://localhost:8080/api/v1/private/user/auth-user");
	    const response: Response<User> = await getAuthUser(); 
	    console.log("setCurrentUser Response: ", response);
	    AuthState.setAuthUser(response.data);
	    const responseUser: User | null = AuthState.getAuthUser();

	    if(!responseUser) return;
	    
	    localStorage.setItem("user", JSON.stringify(responseUser));
	    this.header.getChild("divAuth").getChild("profile").getChildSelf("aProfile").innerText = responseUser.name;
	}else{
	    const localUser = localStorage.getItem("user");

	    if(!localUser) return;

	    const objLocalUser = JSON.parse(localUser);
	    AuthState.setAuthUser(objLocalUser);
	    const profile = this.header.getChild("divAuth").getChild("profile") as Profile;
	    profile.setProfileName(objLocalUser.name); 
	}
    }


}

export default HeaderComponentSystem;


