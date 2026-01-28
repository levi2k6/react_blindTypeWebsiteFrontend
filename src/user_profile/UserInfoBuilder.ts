import UserInfo from "./UserInfo";
import UserInfoBox from "./UserInfoBox";

class UserInfoBuilder{

    private userInfoBox: UserInfoBox;   

    public constructor(name: string){
	this.userInfoBox = new UserInfoBox(name); 
    }

    public addInfo(label: string, data: string){
	this.userInfoBox.addInfo(label, data);
    }

    public build(){
	return this.userInfoBox;
    }

}

export default UserInfoBuilder;
