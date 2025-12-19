import Box2 from "../../class/Box2";
import type Component2 from "../../class/Component2";
import Element from "../../class/Element";
import AuthState from "../../utils/authState";
import type Header from "./Header";

class Profile extends Box2{

    isShow: boolean = false;

    header: Header; 


    constructor(header: Header, name: string) {
        super(name);
	this.header = header;
    }

    override initElements(): void {
        const aProfile = this.getChildSelf("aProfile") as HTMLAnchorElement;
	aProfile.href = "#";
    }

    override structureElements(): Array<Component2> {
	const aProfile: Element = new Element("a", "aProfile");
	const divOption: Box2 = new Box2("divOption");
	    const logoutButton: Element = new Element("button", "logoutButton", "logout");
	    const selectAccountButton: Element = new Element("button", "selectAccountButton", "select account");

	return [
	    aProfile,
	    divOption.addChildren([
		logoutButton,
		selectAccountButton
	    ])
	]

   }

    override eventElements(): void {
        this.addEvent("aProfile", "click", (e) => {
            e.preventDefault();
            this.setOptionVisibility();
        });

	this.addEvent("logoutButton", "click", ()=>{
	    const uri = import.meta.env.VITE_URL + "public/auth/logout";
	    window.location.href = uri;
	    localStorage.removeItem("user");
	    AuthState.setAuthUser(null);
	    this.header.headerSystem.switchAuthtoProfile();
	})

    }

    override styleElements(): void {
        // --- Main container ---
        this.style.position = "relative";
        this.style.display = "flex";
        this.style.flexDirection = "column";
        this.style.alignItems = "flex-start";
        // this.style.border = "1px solid red";
        this.style.padding = "5px";
        this.style.width = "fit-content";

        // --- Profile link ---
	const aProfile = this.getChild("aProfile");
        aProfile.style.cursor = "pointer";
        aProfile.style.textDecoration = "none";
        aProfile.style.color = "inherit"; // use theme color
        aProfile.style.padding = "4px 8px";
        aProfile.style.display = "inline-block";
        aProfile.style.boxSizing = "border-box";

        // --- Dropdown menu ---
	const divOption = this.getChild("divOption");
	divOption.style.background = "#1a1a1a";
        divOption.style.position = "absolute";
        divOption.style.top = "100%";
        divOption.style.left = "50%";
	divOption.style.transform = "translateX(-50%)";
        divOption.style.display = "none";
        divOption.style.flexDirection = "column";
        divOption.style.border = "1px solid #ccc";
        divOption.style.padding = "4px";
        divOption.style.zIndex = "10";
        divOption.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
        divOption.style.marginTop = "2px";

        // --- Dropdown buttons ---
	const logoutButton = this.getChild("logoutButton"); 
	const selectAccount = this.getChild("selectAccount");
        [logoutButton, selectAccount].forEach((btn) => {
            btn.style.cursor = "pointer";
            btn.style.border = "none";
            btn.style.background = "transparent";
            btn.style.padding = "6px 10px";
            btn.style.textAlign = "left";
            btn.style.width = "100%";
            btn.style.boxSizing = "border-box";
            btn.style.color = "inherit";

            btn.addEvent("", "mouseenter", () => {
                btn.style.background = "#33333333";
            });
            btn.self.addEventListener("mouseleave", () => {
                btn.style.background = "transparent";
            });
        });
    }

    setProfileName(userName: string) {
        this.getChildSelf("aProfile").innerText = userName;
        this.updateWidths();
    }

    /** Makes dropdown width match widest content, but doesn't shrink with short names */
    updateWidths() {
        // Temporarily show dropdown (invisible but measurable)
	const divOption = this.getChild("divOption");
        const wasHidden = divOption.style.display === "none";
        if (wasHidden) {
            divOption.style.visibility = "hidden";
            divOption.style.display = "flex";
        }

        // reset widths before measuring
        this.getChild("aProfile").style.width = "auto";
        this.getChild("divOption").style.width = "auto";

        const profileWidth = this.getChildSelf("aProfile").offsetWidth;
        const optionWidth = this.getChildSelf("divOption").offsetWidth;

        if (profileWidth > optionWidth) {
            // profile is wider — expand dropdown to match
            divOption.style.width = `${profileWidth}px`;
        } else {
            // dropdown is wider — keep profile natural size
            divOption.style.width = `${optionWidth}px`;
        }

        // revert visibility if it was hidden
        if (wasHidden) {
            divOption.style.display = "none";
            divOption.style.visibility = "";
        }
    }

    setOptionVisibility() {
        this.isShow = !this.isShow;
	const divOption = this.getChild("divOption");

        if (this.isShow) {
            divOption.style.display = "flex";
            this.updateWidths();
        } else {
            divOption.style.display = "none";
        }
    }
}

export default Profile;

