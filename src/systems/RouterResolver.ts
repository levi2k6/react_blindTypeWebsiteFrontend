import type HeaderComponent from "../components/header/HeaderComponent";
import type RouteSystem2 from "../route/RouteSystem2";

class RouteResolver{

    public constructor(routeSystem: RouteSystem2, header: HeaderComponent){
	header.setRouteSystem(routeSystem);
    }


}

export default RouteResolver;
