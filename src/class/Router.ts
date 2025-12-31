import Box from "./Box";

class Router extends Box{

    public create(){
	this.abortController = new AbortController();
	this.connectElements();
    }

    public destroy(): void{
	this.preDestroy();
	this.abortController?.abort();
	this.self.remove();
    };
     
}

export default Router;

