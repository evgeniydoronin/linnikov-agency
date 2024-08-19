import EventEmitter from "../scripts/patterns/EventEmitter.js";
import { getTargetElem } from "../scripts/utils.js";
import throttle from "lodash.throttle";
gsap.registerPlugin(Observer);

const { autorun, observable, action, reaction } = window.mobx;

export class Header extends EventEmitter {
	@observable accessor lastScrollDirection;
	@observable accessor activeScrollValue;
	@observable accessor hidden;
	@observable accessor burgerIsOpen;
	@observable accessor chatIsOpen;
	@observable accessor chatIntersection;
	constructor() {
		super();
		this.elem = document.querySelector("header");
		if (!this.elem) return undefined;
		this.underlayElem = document.querySelector(".header-underlay");
		this.hidden = this.elem.classList.contains("header_hidden");
		this.addTrigger(window, () => !window.projectDetails?.drawerIsOpen && !this.burgerIsOpen);
		this.initUnderlaySizePullup();
		this.initChatIntersectionTracking();
		setTimeout(() => this.initRelatedLogic(), 0);
	}
	@action setLastScrollDirection(next) {
		this.lastScrollDirection = next;
	}
	@action setActiveScrollValue(next) {
		this.activeScrollValue = next;
	}
	@action setBurgerIsOpen(next) {
		this.burgerIsOpen = next;
	}
	@action setChatIsOpen(next) {
		this.chatIsOpen = next;
	}
	@action setChatIntersection(next) {
		this.chatIntersection = next;
	}
	initRelatedLogic() {
		this.subscribeOnBurgerMenu();
		this.subscribeOnChatDrawer();
		autorun(() => {
			if (this.chatIntersection && this.chatIsOpen) return this.hide("Chat is open");
			if (window.animatedLogo && !window.animatedLogo.animationCompleted && !this.burgerIsOpen) return this.show();
			if (window.footer.visible && (!window.projectDetails?.drawerIsOpen || window.projectDetails?.hiddenOnRefClick)) return this.hide("Footer is visible");
			if (this.lastScrollDirection === "down" && this.activeScrollValue > 0) return this.hide(`Last scroll down: ${this.activeScrollValue}`);
			this.show();
		});
		reaction(() => window.submenu.panelState, (currentState, prevState) => {
			this.elem.classList.remove(`submenu-is-${prevState}`);
			this.elem.classList.add(`submenu-is-${currentState}`);
		}, { fireImmediately: true });
	}
	subscribeOnBurgerMenu() {
		window.app.drawers.get("burger-menu").on("open", () => this.setBurgerIsOpen(true));
		window.app.drawers.get("burger-menu").on("close", () => this.setBurgerIsOpen(false));
	}
	subscribeOnChatDrawer() {
		window.app.drawers.get("ai-chat").on("open", () => this.setChatIsOpen(true));
		window.app.drawers.get("ai-chat").on("close", () => this.setChatIsOpen(false));
	}
	initChatIntersectionTracking() {
		const handleResize = throttle(() => {
			this.setChatIntersection(window.innerHeight < 720 || window.innerWidth < 480);
		}, 25, { leading: false });
		window.addEventListener("resize", handleResize);
		handleResize();
	}
	initUnderlaySizePullup() {
		const observer = new ResizeObserver(() => {
			this.underlayElem.style.setProperty("--header-height", `${this.elem.offsetHeight}px`);
		});
		observer.observe(this.elem);
	}
	preventNextHide() {
		this._preventNextHide = true;
	}
	addTrigger(target, isActive = () => true) {
		const targetElem = getTargetElem(target);

		var observer = ScrollTrigger.observe({
			target: targetElem,
			type: "scroll",
			onUp: () => this.setLastScrollDirection("up"),
  		onDown: () => {
				this.setLastScrollDirection("down");
				this.setActiveScrollValue(targetElem === window ? targetElem.scrollY : targetElem.scrollTop)
			}
		});
		setTimeout(() => {
			autorun(() => {
				if (isActive(this)) {
					observer.enable();
				} else {
					observer.disable();
				}
			});
		}, 0);
	}
	@action
	hide(reason) {
		if (this.hidden) return;
		this.elem.classList.add("header_hidden");
		this.hidden = true;
		this.emit("hide");
	}
	@action
	show() {
		this.elem.classList.remove("header_hidden");
		this.hidden = false;
		this.emit("show");
	}
}