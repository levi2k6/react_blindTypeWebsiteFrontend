import Component2 from "../class/Component2";
import InputBoxComponent from "../class/InputBoxComponent";
import type InputComponent from "../class/InputComponent";
import SelectBoxComponent from "../class/SelectBoxComponent";
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
	    }else if(error == "name"){
		inputDiv.getChild("nameDiv").styleChild("nameLabelDiv").color = "red";
	    }else if(error === "gender"){
		inputDiv.getChild("genderDiv").styleChild("genderLabelDiv").color = "red";
	    }else if(error === "birthdate"){
		inputDiv.getChild("birthdateDiv").styleChild("birthdateLabelDiv").color = "red";
	    }
	});
    }

    public registerHandler(payload: Map<string, Component2>){
	console.log("registerHandler");

	let isRegisterFail = false; 
	for (const [key, value] of payload){

	    let inputBoxComponent: InputBoxComponent | SelectBoxComponent | undefined;
	    let inputComponent: HTMLInputElement | HTMLSelectElement; 
	    if(payload.get(key) instanceof InputBoxComponent){
		inputBoxComponent = payload.get(key) as InputBoxComponent;
		inputComponent = inputBoxComponent.getInput().self as HTMLInputElement; 
	    }else if(payload.get(key) instanceof SelectBoxComponent){
		inputBoxComponent = payload.get(key) as SelectBoxComponent;	
		inputComponent = inputBoxComponent.getInput().self as HTMLSelectElement; 
	    }

	     if(!inputComponent.value){
		 if (!isRegisterFail) isRegisterFail = true;
		 const inputLabel = inputBoxComponent.getLabel().self; 
		 inputLabel.style.color = "red";
	     }
	}
	

	// if(!payload.username){
	//     this.formErrors.push("username");
	// }; 
	// if(!payload.password){
	//     this.formErrors.push("password");
	// }
	// if(!payload.email){
	//     this.formErrors.push("email");
	// }
	// if(!payload.name){
	//     this.formErrors.push("name");
	// }
	// if(!payload.gender){
	//     this.formErrors.push( "gender");
	// }
	// if(!payload.birthdate){
	//     this.formErrors.push("birthdate");
	// }

	this.setFormError();

	// if(this.formErrors.length !== 0){
	//     console.error("form error");
	//     return;
	// }

	if(isRegisterFail){
	    console.error("Register failed");
	    return;
	}

	apiRegister(payload);
    }

}

export default RegisterRouterSystem;
