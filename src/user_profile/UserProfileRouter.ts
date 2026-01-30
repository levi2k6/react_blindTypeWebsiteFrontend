import Box2 from "../class/Box2";
import type Component2 from "../class/Component2";
import ProfileOptionBox from "./ProfileOptionBox";
import UserImageBox from "./UserImageBox";

class UserProfileRouter extends Box2{

    public constructor(name: string){
	super(name);
    } 

    public structureElements(): Array<Component2> {
	const userProfile: UserImageBox = new UserImageBox("userProfile");
	const profileOptionBox: ProfileOptionBox = new ProfileOptionBox("profileOptionBox");
	const divStats: Box2 = new Box2("divStats");

        return[
	    userProfile,
	    profileOptionBox,
	    divStats
	]
    } 

    public initSystems(): void {
    }

    public initElements(): void {
    }

    public eventElements(): void {
    }

    public styleElements(): void {
	this.style.display = "flex";
	this.style.flexDirection = "column";
	this.style.gap = "2rem";
	this.style.padding = "50px";
    }


}

export default UserProfileRouter;
