import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";
import InputComponent from "../class/InputComponent";
import SelectComponent from "../class/Select";
import RegisterRouterSystem from "./RegisterRouterSystem";

class RegisterRouter extends Box2{

    private registerRouterSystem: RegisterRouterSystem; 

    public constructor(name: string){
	super(name)
	this.registerRouterSystem = new RegisterRouterSystem();
    }

    override structureElements(): Array<Component2>{

	const registerH1 = new Element("h1", "registerH1", "Register"); 

	const registerForm = new Element("form", "registerForm"); 

	    const inputDiv = new Box2("inputDiv");  
	
		const usernameDiv = new Box2("usernameDiv");
		    const usernameLabelDiv = new Box2("usernameLabelDiv");
			const usernameLabel = new Element("label", "usernameLabel", "Username");  
		    const usernameInput = new InputComponent("usernameInput", "text"); 

		const passwordDiv = new Box2("passwordDiv");
		    const passwordLabelDiv = new Box2("passwordLabelDiv");
			const passwordLabel = new Element("label", "passwordLabel", "Password");  
		    const passwordInput = new InputComponent("passwordInput", "password"); 

		const emailDiv = new Box2("emailDiv");
		    const emailLabelDiv = new Box2("emailLabelDiv"); 
			const emailLabel = new Element("label", "emailLabel", "Email");  
		    const emailInput = new InputComponent("emailInput", "email"); 

		const genderDiv = new Box2("genderDiv");
		    const genderLabelDiv = new Box2("genderLabelDiv");
			const genderLabel = new Element("label", "genderLabel", "Gender");  
		    const genderInput = new SelectComponent("genderInput", ["MALE", "FEMALE", "OTHER"]); 

		const birthdateDiv = new Box2("birthdateDiv");
		    const birthdateLabelDiv = new Box2("birthdateLabelDiv");
			const birthdateLabel = new Element("label", "birthdateLabel", "Birthdate");  
		    const birthdateInput = new InputComponent("birthdateInput", "date"); 

	    const submitButton = new InputComponent("submitButton", "submit");

	return[
	    registerH1,
	    registerForm.addChildren([
		inputDiv.addChildren([
		    usernameDiv.addChildren([
			usernameLabelDiv.addChildren([usernameLabel]),
			usernameInput
		    ]),
		    passwordDiv.addChildren([
			passwordLabelDiv.addChildren([passwordLabel]),
			passwordInput
		    ]),
		    emailDiv.addChildren([
			emailLabelDiv.addChildren([emailLabel]),
			emailInput
		    ]),
		    genderDiv.addChildren([
			genderLabelDiv.addChildren([genderLabel]),
			genderInput
		    ]),
		    birthdateDiv.addChildren([
			birthdateLabelDiv.addChildren([birthdateLabel]),
			birthdateInput
		    ]),
		]),
		submitButton
		
	    ])
	]
    } 

    override initSystems(){
	this.registerRouterSystem.setSystem(this);
    }

    override initElements(){
    }

    override eventElements(){
	this.getChild("registerForm").addEvent("submitButton", "click", (event)=>{
	    event.preventDefault();
	    const inputDiv = this.getChild("registerForm").getChild("inputDiv"); 
	    const usernameInput = inputDiv.getChild("usernameDiv").getChildSelf("usernameInput") as HTMLInputElement;
	    const passwordInput = inputDiv.getChild("passwordDiv").getChildSelf("passwordInput") as HTMLInputElement;
	    const emailInput = inputDiv.getChild("emailDiv").getChildSelf("emailInput") as HTMLInputElement; 
	    const genderInput = inputDiv.getChild("genderDiv").getChildSelf("genderInput") as HTMLSelectElement;
	    const birthdateInput = inputDiv.getChild("birthdateDiv").getChildSelf("birthdateInput") as HTMLInputElement; 

	    const payload: Record<string, string> = {
		username: usernameInput.value,
		password: passwordInput.value,
		email: emailInput.value,
		gender: genderInput.value,
		birthdate: birthdateInput.value
	    };

	    console.log("payload: ", payload);
	    this.registerRouterSystem.registerHandler(payload);
	});

    }

    override styleElements(){

	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.justifyContent = "center";
	this.style.alignItems = "center";

	const registerForm = this.getChild("registerForm");
	registerForm.style.display = "flex";
	registerForm.style.flexDirection = "column";
	registerForm.style.justifyContent = "center";
	registerForm.style.alignItems = "center";
	registerForm.style.background = "black";
	registerForm.style.border = "1px solid yellow";
	registerForm.style.width = "500px";
	registerForm.style.height = "500px";

	const inputDiv = registerForm.getChild("inputDiv");
	inputDiv.style.display = "flex";
	inputDiv.style.flexDirection = "column";
	inputDiv.style.width = "400px";

	inputDiv.style.border = "1px solid black";
	inputDiv.style.height = "300px";

	const usernameDiv = inputDiv.getChild("usernameDiv");
	usernameDiv.style.display = "flex";
	usernameDiv.style.flexDirection = "column";
	usernameDiv.style.border = "1px solid green";
	const usernameLabelDiv = usernameDiv.getChild("usernameLabelDiv"); 
	usernameLabelDiv.style.display = "flex";

	const passwordDiv = inputDiv.getChild("passwordDiv");
	passwordDiv.style.display = "flex";
	passwordDiv.style.flexDirection = "column";
	passwordDiv.style.border = "1px solid green";
	const passwordLabelDiv = passwordDiv.getChild("passwordLabelDiv");
	passwordLabelDiv.style.display = "flex";

	const emailDiv = inputDiv.getChild("emailDiv");
	emailDiv.style.display = "flex";
	emailDiv.style.flexDirection = "column";
	emailDiv.style.border = "1px solid green";
	const emailLabelDiv = emailDiv.getChild("emailLabelDiv");
	emailLabelDiv.style.display = "flex";
	
	const genderDiv = inputDiv.getChild("genderDiv");
	genderDiv.style.display = "flex";
	genderDiv.style.flexDirection = "column";
	genderDiv.style.border = "1px solid green";
	const genderLabelDiv = genderDiv.getChild("genderLabelDiv");
	genderLabelDiv.style.display = "flex";
	
	const birthdateDiv = inputDiv.getChild("birthdateDiv");
	birthdateDiv.style.display = "flex";
	birthdateDiv.style.flexDirection = "column";
	birthdateDiv.style.border = "1px solid green";
	const birthdateLabelDiv = birthdateDiv.getChild("birthdateLabelDiv");
	birthdateLabelDiv.style.display = "flex";
    }

}


export default RegisterRouter;

