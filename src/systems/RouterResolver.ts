import type HeaderComponent from "../components/header/HeaderComponent";
import type LoginRouter from "../login/LoginRouter";
import type RouteSystem2 from "../route/RouteSystem2";

class RouteResolver{

    public constructor(routeSystem: RouteSystem2, header: HeaderComponent, loginRouter: LoginRouter){
	header.setRouteSystem(routeSystem);
	loginRouter.setRouteSystem(routeSystem);
    }


}

export default RouteResolver;
