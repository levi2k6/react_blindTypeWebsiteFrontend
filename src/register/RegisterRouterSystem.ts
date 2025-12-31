import { apiRegister } from "../utils/api/apiAuth";
import type RegisterRouter from "./RegisterRouter";

class RegisterRouterSystem{

    private formErrors: Array<string> = [];
    private registerRouter?: RegisterRouter; 

    public setSystem(registerRouter: RegisterRouter){
	this.registerRouter = registerRouter;
    }

    public setFormError(){
	if(!this.registerRouter) throw new Error("registerRouter is undefined");
	const inputDiv = this.registerRouter.getChild("registerForm").getChild("inputDiv");
	this.formErrors.forEach(error => {
	    if(error === "username"){
		inputDiv.getChild("usernameDiv").styleChild("usernameLabelDiv").color = "red";
	    }else if(error === "password"){
		inputDiv.getChild("passwordDiv").styleChild("passwordLabelDiv").color = "red";
	    }else if(error === "email"){
		inputDiv.getChild("emailDiv").styleChild("emailLabelDiv").color = "red";
	    }else if(error === "gender"){
		inputDiv.getChild("genderDiv").styleChild("genderLabelDiv").color = "red";
	    }else if(error === "birthdate"){
		inputDiv.getChild("birthdateDiv").styleChild("birthdateLabelDiv").color = "red";
	    }
	});
    }

    public registerHandler(payload: Record<string, string>){
	console.log("registerHandler");
	if(!payload.username){
	    this.formErrors.push("username");
	}; 
	if(!payload.password){
	    this.formErrors.push("password");
	}
	if(!payload.email){
	    this.formErrors.push("email");
	}
	if(!payload.gender){
	    this.formErrors.push( "gender");
	}
	if(!payload.birthdate){
	    this.formErrors.push("birthdate");
	}

	this.setFormError();

	if(this.formErrors.length !== 0){
	    console.error("form error");
	    return;
	}

	apiRegister(payload);
    }

}

export default RegisterRouterSystem;
