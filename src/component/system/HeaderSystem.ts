import Header from "../Header";

import { apiFetch } from "../../utils/apiUtils";
import type { Response, User } from "../../utils/interfaces";
import AuthState from "../../utils/authState";


class HeaderSystem{

    header: Header;

    constructor(header: Header){
	this.header = header;
    }

    async updateProfile(){
	const user = localStorage.getItem("user");
	console.log("USER: ", user);
	if(!user || user == "undefined"){
	    console.log("l")
	    const response: Response<User> = await apiFetch("GET", "http://localhost:8080/api/private/AuthUser");
	    AuthState.setAuthUser(response.data);
	    const responseUser: User | null = AuthState.getAuthUser();
	    if(!responseUser){
		return 
	    }
	    localStorage.setItem("user", JSON.stringify(responseUser));
	    this.header.profile.innerText = responseUser.name;
	}else{
	    console.log("w");
	    const localUser = localStorage.getItem("user");
	    if(localUser){
		const objLocalUser = JSON.parse(localUser);
		this.header.profile.innerText = objLocalUser.name; 
	    }
	}
    }



}

export default HeaderSystem;


