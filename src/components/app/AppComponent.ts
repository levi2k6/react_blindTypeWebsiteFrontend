import Component2 from "../../class/Component2";

class AppComponent extends Component2{

    public constructor(){
	const app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;  
	super(app, "App");
    }

    override structureElements(): Array<Component2> {
	return [];
    }

    override initSystems(): void {
    }

    override initElements(): void {
    }

    override eventElements(): void {
    }

    override styleElements(): void {
	// border: 3px solid red;
	// width: 100%;
	// height: 90vh;
	// text-align: center;
	this.style.background = "#1e2120";
	// this.style.border = "3px solid red";
	this.style.width = "100%"
	this.style.textAlign  = "center";

    }

}

export default AppComponent;

