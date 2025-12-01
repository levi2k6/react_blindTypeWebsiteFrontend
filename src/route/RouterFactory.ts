import AboutRouter from "../about/AboutRouter";
import type Box from "../class/Box";
import GameRouter from "../game/component/GameRouter";

class RouterFactory{

    public createRouter(router: string): Box | undefined{
	switch(router){
	    case "GameRouter":
		return new GameRouter("Game");
	    case "AboutRouter":
		return new AboutRouter("About");
	}
    }



}

export default RouterFactory;

