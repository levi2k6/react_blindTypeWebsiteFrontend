import Box from "../../class/Box";
import { createElement } from "../../ui_system/Element";
import AuthState from "../../utils/authState";
import type Header from "./Header";

class Profile extends Box{

    isShow: boolean = false;

    header: Header; 

    aProfile: HTMLAnchorElement = createElement("a") as HTMLAnchorElement;
    divOption: Box = new Box();
    logout: HTMLButtonElement = createElement("button", "logout") as HTMLButtonElement;
    selectAccount: HTMLButtonElement = createElement("button", "select account") as HTMLButtonElement;

    constructor(header: Header, name: string) {
        super(name);

	this.header = header;
    }

    override initElements(): void {
        this.aProfile.href = "#";
    }

    override connectElements(): void {
        this.addChildren([
            this.aProfile,
            this.divOption.addChildren([
                this.logout,
                this.selectAccount
            ])
        ]);
    }

    override eventElements(): void {
        this.aProfile.addEventListener("click", (e) => {
            e.preventDefault();
            this.setOptionVisibility();
        });

	this.logout.addEventListener("click", ()=>{
	    window.location.href = "http://localhost:8080/api/v1/public/auth/logout";
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
        this.aProfile.style.cursor = "pointer";
        this.aProfile.style.textDecoration = "none";
        this.aProfile.style.color = "inherit"; // use theme color
        this.aProfile.style.padding = "4px 8px";
        this.aProfile.style.display = "inline-block";
        this.aProfile.style.boxSizing = "border-box";

        // --- Dropdown menu ---
	this.divOption.style.background = "#1a1a1a";
        this.divOption.style.position = "absolute";
        this.divOption.style.top = "100%";
        this.divOption.style.left = "50%";
	this.divOption.style.transform = "translateX(-50%)";
        this.divOption.style.display = "none";
        this.divOption.style.flexDirection = "column";
        this.divOption.style.border = "1px solid #ccc";
        this.divOption.style.padding = "4px";
        this.divOption.style.zIndex = "10";
        this.divOption.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
        this.divOption.style.marginTop = "2px";

        // --- Dropdown buttons ---
        [this.logout, this.selectAccount].forEach((btn) => {
            btn.style.cursor = "pointer";
            btn.style.border = "none";
            btn.style.background = "transparent";
            btn.style.padding = "6px 10px";
            btn.style.textAlign = "left";
            btn.style.width = "100%";
            btn.style.boxSizing = "border-box";
            btn.style.color = "inherit";
            btn.addEventListener("mouseenter", () => {
                btn.style.background = "#33333333";
            });
            btn.addEventListener("mouseleave", () => {
                btn.style.background = "transparent";
            });
        });
    }

    setProfileName(userName: string) {
        this.aProfile.innerText = userName;
        this.updateWidths();
    }

    /** Makes dropdown width match widest content, but doesn't shrink with short names */
    updateWidths() {
        // Temporarily show dropdown (invisible but measurable)
        const wasHidden = this.divOption.style.display === "none";
        if (wasHidden) {
            this.divOption.style.visibility = "hidden";
            this.divOption.style.display = "flex";
        }

        // reset widths before measuring
        this.aProfile.style.width = "auto";
        this.divOption.style.width = "auto";

        const profileWidth = this.aProfile.offsetWidth;
        const optionWidth = this.divOption.self.offsetWidth;

        if (profileWidth > optionWidth) {
            // profile is wider — expand dropdown to match
            this.divOption.style.width = `${profileWidth}px`;
        } else {
            // dropdown is wider — keep profile natural size
            this.divOption.style.width = `${optionWidth}px`;
        }

        // revert visibility if it was hidden
        if (wasHidden) {
            this.divOption.style.display = "none";
            this.divOption.style.visibility = "";
        }
    }

    setOptionVisibility() {
        this.isShow = !this.isShow;

        if (this.isShow) {
            this.divOption.style.display = "flex";
            this.updateWidths();
        } else {
            this.divOption.style.display = "none";
        }
    }
}

export default Profile;

