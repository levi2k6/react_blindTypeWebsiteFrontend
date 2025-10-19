import Header from "../Header";

import { apiFetch, checkToken } from "../../utils/apiUtils";
import type { Response, User } from "../../utils/interfaces";
import AuthState from "../../utils/authState";


class HeaderSystem{

    header: Header;

    constructor(header: Header){
	this.header = header;
    }

    switchAuthtoProfile(){
	const user = AuthState.getAuthUser();
	console.log("user", user);
	if(user){
	    this.header.authButtons.style.display = "none";
	    this.header.profile.style.display = "flex";
	}else{
	    this.header.authButtons.style.display = "flex";
	    this.header.profile.style.display = "none";
	}
    }

    async updateProfile(){
	const tokenStatus = await checkToken();

	if(!tokenStatus){
	    localStorage.removeItem("user");
	    return; 
	}

	const user = localStorage.getItem("user");

	if(!user){
	    const response: Response<User> = await apiFetch("GET", "http://localhost:8080/api/private/AuthUser");
	    AuthState.setAuthUser(response.data);
	    const responseUser: User | null = AuthState.getAuthUser();

	    if(!responseUser) return;
	    
	    localStorage.setItem("user", JSON.stringify(responseUser));
	    this.header.profile.innerText = responseUser.name;
	}else{
	    const localUser = localStorage.getItem("user");

	    if(!localUser) return;

	    const objLocalUser = JSON.parse(localUser);
	    AuthState.setAuthUser(objLocalUser);
	    this.header.profile.innerText = objLocalUser.name; 
	    
	}
    }



}

export default HeaderSystem;


