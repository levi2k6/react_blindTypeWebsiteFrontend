import { capitalizeFirstLetter} from "../../utils/textUtil";
import type { InfoData } from "../UserInfoBox";

class UserInfoBoxSystem{
    public processData(data: Array<InfoData>): void{
	for(const entry of data){
	    if(typeof entry.info  === "string"){
		entry.info = capitalizeFirstLetter(entry.info);
	    }else if(typeof entry.info === "boolean"){
		if(entry.info)
		    entry.info = "Connected"; 
		else{
		    entry.info = "Nothing";
		}
	    }
	}
    }
}

export default UserInfoBoxSystem; 


