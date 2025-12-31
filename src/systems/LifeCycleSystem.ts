import type Box from "../class/Box";
import type Component from "../class/Component";

class LifeCycleSystem{

    public initComponent(router: HTMLElement){
	const routerChildren  = router.self.children;
	for(const child of routerChildren){
	    child.init();
	}
    }

    public destroy(){

    }


}

export default LifeCycleSystem;
