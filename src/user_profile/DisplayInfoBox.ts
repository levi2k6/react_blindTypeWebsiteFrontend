import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import Element from "../class/Element";
import AuthState from "../utils/authState";
import type { User } from "../utils/interfaces";
import UserInfoBox from "./UserInfoBox";

class DisplayInfoBox extends Box2{

    private authUser?: User; 

    public constructor(name: string){
	super(name);
	this.authUser = AuthState.getAuthUser();
    }

    override structureElements(): Array<Component2> {
	if(!this.authUser)throw new Error("authUser is undefined");

	const divLabel: Box2 = new Box2("divLabel");
	    const labelAuth: Element = new Element("label", "labelAuth", "Auth Info");
	    const labelUser: Element = new Element("label", "labelUser", "User Info");
	
	const divInfo: Box2 = new Box2("divInfo"); 
	    const authInfo: UserInfoBox = new UserInfoBox("authInfo", [
		{"label": "username", "info": this.authUser?.username ?? "", "edit": true},
		{"label": "email", "info": this.authUser?.email ?? "", "edit": true},
		{"label": "google", "info": true, "init": true},
		{"label": "facebook", "info": true, "init": true}
	    ]); 

	    const userInfo: UserInfoBox = new UserInfoBox("userInfo", [
		{"label": "name", "info": this.authUser?.name ?? "", "edit": true},
		{"label": "gender", "info": this.authUser?.gender ?? "", "edit": true},
		{"label": "birthdate", "info": this.authUser?.birthdate ?? "", "edit": true},
		{"label": "joined in", "info": this.authUser?.createdAt ?? "", "edit": true}
	    ]);

	return[
	    divLabel.addChildren([
		labelAuth,
		labelUser
	    ]),
	    divInfo.addChildren([
		authInfo,
		userInfo
	    ])
	];
    } 

    override styleElements(): void {
	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.padding = "5rem";
	this.style.backgroundColor = "black";
	// this.style.border = "1px solid yellow";
	this.style.gap = "1rem";

	const divLabel = this.getChild("divLabel");
	divLabel.style.fontSize = "2rem";
	divLabel.style.display = "flex"
	divLabel.style.borderBottom = "1px solid grey"
	const labelAuth = divLabel.getChild("labelAuth"); 
	    labelAuth.style.display = "flex";
	    labelAuth.style.marginBottom = "1rem";
	    labelAuth.style.flex = "1";
	const labelUser = divLabel.getChild("labelUser");
	    labelUser.style.display = "flex";
	    labelUser.style.flex = "1";

	const divInfo = this.getChild("divInfo");
	// divInfo.style.border = "1px solid pink";
	divInfo.style.width = "100%";
	divInfo.style.display = "flex";
	divInfo.style.gap = "3rem";
	
	const authInfo = divInfo.getChild("authInfo");
	authInfo.style.flex = "1";
	const userInfo = divInfo.getChild("userInfo");
	userInfo.style.flex = "1";

    }

}
export default DisplayInfoBox; 
