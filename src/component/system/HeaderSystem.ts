import Header from "../header/Header";

import { apiFetch, checkAccessToken, refreshToken } from "../../utils/apiUtils";
import type { Response, User } from "../../utils/interfaces";
import AuthState from "../../utils/authState";
import type RouteSystem from "../../route/RouteSystem";


class HeaderSystem{

    header: Header;

    routeSystem: RouteSystem | undefined;

    constructor(header: Header){
	this.header = header;
    }

    switchAuthtoProfile(){
	const user = localStorage.getItem("user");
	if(user && user !== "undefined"){
	    this.header.authButtons.style.display = "none";
	    this.header.profile.style.display = "flex";
	}else{
	    this.header.authButtons.style.display = "flex";
	    this.header.profile.style.display = "none";
	}
    }

    async updateProfile(){
	const tokenStatus = await checkAccessToken();
	console.log("tokenStatus: ", tokenStatus);

	if(!tokenStatus){
	    localStorage.removeItem("user");
	    const response = await refreshToken();
	    if(!response.data){
		return;
	    }

	    const tokenStatus = await checkAccessToken();
	    if(!tokenStatus.data){
		console.warn("Warning in HeaderSystem updateProfile()");
		return;
	    }
	}

	await this.setCurrentUser();
    }

    private async setCurrentUser(){
	const user = localStorage.getItem("user");

	console.log("user: ", user);
	if(!user){
	    const response: Response<User> = await apiFetch("GET", "http://localhost:8080/api/v1/private/user/auth-user");
	    AuthState.setAuthUser(response.data);
	    const responseUser: User | null = AuthState.getAuthUser();

	    if(!responseUser) return;
	    
	    localStorage.setItem("user", JSON.stringify(responseUser));
	    this.header.profile.aProfile.innerText = responseUser.name;
	}else{
	    const localUser = localStorage.getItem("user");

	    if(!localUser) return;

	    const objLocalUser = JSON.parse(localUser);
	    AuthState.setAuthUser(objLocalUser);
	    this.header.profile.setProfileName(objLocalUser.name); 
	}
    }


}

export default HeaderSystem;


