import { RevealWrap, applyRevealWraps } from "./revealWrap.js";
const { observable, autorun, action, flow, when } = mobx;
class TextReveal {
	@observable accessor isInTransition = null;
	@observable accessor active = false;
	constructor(root) {
		this.root = root;
		window.app.windowResizeObserver.on("resize", () => this.onResize());
		this.onResize();
	}
	async onResize() {
		await this.updateDom();
		this.createRevealAnimation();
		if (this.active) this.show();
	}
	createRevealAnimation() {
		this.ctx?.revert();
		this.ctx = gsap.context(() => {
			this.revealTween = gsap.effects.reveal(this.root.querySelectorAll(".reveal-wrap__item"), { paused: true });
			this.revealTween.eventCallback("onComplete", () => this.setIsInTransition(false));
			this.revealTween.eventCallback("onReverseComplete", () => this.setIsInTransition(false));
		});
	}
	async updateDom() {
		await document.fonts.load("16px RobotoMono");
		if (this.spliter) {
			this.spliter.revert();
			this.spliter.split({ type: "lines", linesClass: "line" });
		} else {
			this.spliter = new SplitText(this.root, { type: "lines", linesClass: "line" });
		}
		applyRevealWraps(this.root);
		//new RevealWrap(this.dom.root.querySelector(".testimonials-quote .testimonials-quote-sign_open"));
	}
	@action
	setIsInTransition(next) {
		this.isInTransition = next;
	}
	@flow
	* show() {
		if (!this.revealTween) return;
		if (this.revealTween.progress() < 1) this.setIsInTransition(true);
		this.revealTween.play();
		yield when(() => !this.isInTransition);
	}
	@flow
	* hide() {
		if (!this.revealTween) return;
		if (this.revealTween.progress() > 0) this.setIsInTransition(true);
		this.revealTween.reverse();
		yield when(() => !this.isInTransition);
	}
}
class InViewTextReveal {
	@observable accessor active = false;
	constructor(elem, threshold) {
		this.root = elem;
		this.textReveal = new TextReveal(elem);
		this.threshold = threshold || elem.getAttribute("data-threshold") || "65%";
		window.app.windowResizeObserver.on("resize", () => this.onResize());
		this.onResize();
		autorun(() => {
			this.root.classList.toggle("_in-view", this.active);
		})
	}
	@action
	setActive(next) {
		this.active = next;
		if (this.active) {
			this.textReveal.show();
		} else {
			this.textReveal.hide();
		}
	}
	async onResize() {
		this.ctx?.revert();
		this.ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: this.root,
				start: `top+=${this.threshold} bottom`,
				onUpdate: (self) => this.setActive(self.isActive)
			})
		});
	}
}
export function init() {
	document.querySelectorAll(`[data-component="in-view-text-reveal"]`).forEach(elem => {
		new InViewTextReveal(elem);
	});
}