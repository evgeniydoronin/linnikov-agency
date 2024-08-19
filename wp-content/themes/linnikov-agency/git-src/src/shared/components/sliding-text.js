import { delay, getTargetElem } from "../scripts/utils.js";
import throttle from 'lodash.throttle';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(SplitText);

const { action, observable } = window.mobx;

export class SlidingText {
	raf = null;
	activated = false;
	prevWidth = null;
	@observable accessor completed;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.text = this.dom.root.querySelector(`[data-elem="text"]`);
		this.dom.mainText = this.dom.root.querySelector(`[data-elem="main-text"]`);
		this.dom.rgbSet = this.dom.root.querySelector("[data-elem=rgb-set]");
		this.dom.decor = this.dom.root.querySelector("[data-elem=decor]");
		this.mediaMatch = matchMedia("(max-width: 768px)");
		this.decorAnimation = new AnimatedDecor(this.dom.decor);
		this.intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach(({ target, isIntersecting }) => {
				const cookiesAgreementDrawer = window.app.drawers.get("cookies-agreement");
				if (isIntersecting) {
					this.intersectionObserver.unobserve(target);
					if (cookiesAgreementDrawer && cookiesAgreementDrawer.isOpen) {
						cookiesAgreementDrawer.on("close", () => target.classList.add("reveal-wrap_active"));
					} else {
						target.classList.add("reveal-wrap_active");
					}
				}
			});
		}, {
			threshold: 0.5,
			rootMargin: "0px 0px 20px 0px",
		});
		this.dom.root.querySelectorAll(".reveal-wrap").forEach(elem => this.intersectionObserver.observe(elem));
		this.scrollTrigger = ScrollTrigger.create({
			trigger: this.dom.text,
			start: `top top+=${(window.innerHeight - this.dom.text.offsetHeight) / 1.5}`,
			onUpdate: (self) => {
				if (self.isActive && !this.activated) {
					self.kill();
					const cookiesAgreementDrawer = window.app.drawers.get("cookies-agreement");
					if (cookiesAgreementDrawer && cookiesAgreementDrawer.isOpen) {
						cookiesAgreementDrawer.on("close", () => this.activate());
					} else {
						this.activate();
					}
				}
			}
		});
		window.app.resizeObserver.on("resize", () => this.onResize());
		setTimeout(() => this.onResize(), 0);
	}
	@action
	setCompleted(next) {
		this.completed = next;
	}
	async activate() {
		await delay(300);
		this.activated = true;
		this.inProgress = true;
		const targets = Array.from(this.dom.root.querySelectorAll(".reveal-wrap"));
		const state = Flip.getState(targets.map(elem => elem.firstElementChild));
		this.dom.root.classList.add("sliding-text_active");
		Flip.from(state, {
			duration: 0.8,
			ease: CustomEase.create("custom", "M0,0 C0.087,0.015 0.119,-0.015 0.25,0.043 0.449,0.132 0.422,0.849 0.682,0.959 0.752,0.988 0.877,1 1,1 "),
			onComplete: () => this.onFlipComplete(),
		});
		// }
		this.decorAnimation.slide();
	}
	onFlipComplete() {
		this.inProgress = false;
		this.onResize();
		this.dom.text.classList.add("text-rgb-shake_active");
		setTimeout(() => {
			this.dom.text.classList.remove("text-rgb-shake_active");
			this.onFullComplete();
		}, 900);
	}
	onFullComplete() {
		this.setCompleted(true);
	}
	onResize() {
		if (this.raf !== null) cancelAnimationFrame(this.raf);
		this.raf = requestAnimationFrame(() => {
			this.raf = null;
			if (this.inProgress) return;
			if (this.splitter) {
				this.splitter.split({ type: "lines" });
				this.rgbSetSplitters.forEach(splitter => splitter.split({ type: "lines" }));
			} else {
				this.splitter = new SplitText(this.dom.mainText, { type: "lines" });
				this.dom.mainText.classList.add("splitted");
				this.rgbSetSplitters = Array.from(this.dom.rgbSet.children).map(elem => {
					const splitter = new SplitText(elem, { type: "lines" });
					elem.classList.add("splitted");
					return splitter;
				});
			}
			this.intersectionObserver.disconnect();
			this.splitter.lines.forEach((line, idx) => {
				const wrapper = document.createElement("div");
				const wrapperInner = document.createElement("div");
				wrapperInner.classList.add("reveal-wrap__inner");
				wrapper.classList.add("reveal-wrap");
				wrapper.append(wrapperInner);
				const lineBcr = line.getBoundingClientRect();
				line.replaceWith(wrapper);
				wrapperInner.append(line);
				if (lineBcr.top < window.innerHeight - lineBcr.height / 2) {
					const cookiesAgreementDrawer = window.app.drawers.get("cookies-agreement");
					if (cookiesAgreementDrawer && cookiesAgreementDrawer.isOpen) {
						cookiesAgreementDrawer.on("close", () => wrapper.classList.add("reveal-wrap_active"));
					} else {
						requestAnimationFrame(() => wrapper.classList.add("reveal-wrap_active"));
					}
				} else {
					this.intersectionObserver.observe(wrapper);
				}
			});
		});
	}
}
export class AnimatedDecor {
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		if (!this.dom.root) return;
		this.dom.inner = this.dom.root.querySelector(`[data-elem="decor.inner"]`);
		this.dom.revealItems = this.dom.root.querySelectorAll(`.reveal-wrap`);
		this.intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach(({ target, isIntersecting }) => {
				if (isIntersecting && !target.classList.contains("reveal-wrap_active")) {
					target.classList.add("reveal-wrap_active");
				}
			});
		}, {
			threshold: 0.5,
			rootMargin: "0px 0px 0px 0px",
		});
		this.dom.revealItems.forEach(elem => this.intersectionObserver.observe(elem));
	}
	slide() {
		if (!this.dom.root) return;
		const state = Flip.getState(this.dom.inner.children);
		gsap.set(this.dom.root, { alignSelf: "start" });
		Flip.from(state, {
			duration: 0.75,
			stagger: 0.05,
			ease: CustomEase.create("custom", "M0,0 C0.087,0.015 0.119,-0.015 0.25,0.043 0.449,0.132 0.422,0.849 0.682,0.959 0.752,0.988 0.877,1 1,1 "),
			onComplete: () => { this.dom.root.classList.add("rgb-shake-active"); setTimeout(() => this.dom.root.classList.remove("rgb-shake-active"), 900); },
		});
	}
}
export function initSlidingTexts() {
	document.querySelectorAll("[data-component=sliding-text]").forEach(async (elem) => {
		elem.registerModule("slidingText", new SlidingText(elem));
	});
}