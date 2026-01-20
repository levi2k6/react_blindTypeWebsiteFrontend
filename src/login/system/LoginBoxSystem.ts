import type { LoginDTO } from "../../utils/interfaces";
import type LoginBox from "../LoginBox";


class LoginBoxSystem{

    loginBox: LoginBox;

    public constructor(loginBox: LoginBox){
	this.loginBox = loginBox; 
    } 

    public async authenticate(username: string, password: string) {
	console.log("Authenticating...");
	try {
	    const loginUrl = import.meta.env.VITE_URL + "/public/auth/login";
	    console.log("loginUrl: ", loginUrl);

	    const loginDto: LoginDTO = {
		username: username,
		password: password
	    } 

	    const response = await fetch(loginUrl, {
		method: "POST",
		headers: {
		    "Content-Type": "application/json"
		},
		credentials: "include", // important for cookies
		body: JSON.stringify(loginDto)
	    });

	    const text = await response.text();
	    let data;
	    try {
		data = text ? JSON.parse(text) : null;
	    } catch (err) {
		console.error("Failed to parse JSON:", text);
		throw new Error("Invalid JSON response from server");
	    }

	    if (!response.ok) {
		this.loginBox.getChildSelf("loginMessage").innerText = data?.message;
		throw new Error(data?.message || "Login failed");
	    }

	    console.log("login response: ", data);
	    console.log("updated");
	    this.loginBox.routeSytem?.navigate("/");
	    return data;

	} catch (ex) {
	    console.error("Login error: ", ex);
	    throw ex;
	}
    }




} 

export default LoginBoxSystem;
