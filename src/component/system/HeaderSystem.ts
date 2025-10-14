import type GameRouterSystem from "../../game/system/component_system/GameRouterSystem";
import type RouteSystem from "../../route/RouteSystem";
import type Header from "../Header";


class HeaderSystem{

    header: Header;
    routeSystem: RouteSystem | null = null;

    constructor(header: Header){
	this.header = header;
    }

    setRouter(routeSystem: RouteSystem){
	this.routeSystem = routeSystem;
    }

    navigateAuth(){
	if(!this.routeSystem){
	    console.log("routerSystem is empty");
	    return;
	} 

	this.routeSystem.navigate("/auth");
    }


}

export default HeaderSystem;


