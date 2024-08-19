import { getTargetElem } from "../scripts/utils.js";
const { observable, action, computed } = mobx;
export class InteractiveVideoSection {
	@observable accessor animationProgress = 0;
	@observable accessor scrollProgress = 0;
	@observable accessor desctopMode = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.video = this.dom.root.querySelector(".video-section__video");
		this.dom.root.registerModule("interactiveVideoSection", this);
		this.media = matchMedia("(min-width: 1025px)");
		window.app.resizeObserver.on("resize", () => this.rebuild());
		this.rebuild();
		this.dom.root.classList.add("video-section_initialized");
	}
	rebuild() {
		this.ctx?.revert();
		this.setDesctopMode(this.media.matches);
		this.ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: this.dom.root,
				start: () => this.media.matches ? "top bottom" : "top-=30% top+=90%",
				end: () => this.media.matches ? "bottom top" : "bottom-=30% top",
				onUpdate: (self) => this.setScrollProgress(self.progress),
				onLeaveBack: () => this.setScrollProgress(0),
				onLeave: () => this.setScrollProgress(1),
			});
			if (!this.media.matches) return;
			gsap.fromTo(this.dom.video, {
				scale: 0.75,
				clipPath: "inset(0% 30%)",
			},{
				scale: 1,
				clipPath: "inset(0% 0%)",
				scrollTrigger: {
					trigger: this.dom.root,
					start: "top+=25% bottom",
					end: "bottom-=15% bottom",
					scrub: 1,
					onUpdate: (self) => this.setAnimationProgress(self.progress),
				}
			});
		})
	}
	@action
	setDesctopMode(next) {
		this.desctopMode = next;
	}
	@action
	setAnimationProgress(next) {
		this.animationProgress = next;
	}
	@action
	setScrollProgress(next) {
		this.scrollProgress = next;
	}
	@computed
	get scrolling() {
		return  this.scrollProgress > 0 &&  this.scrollProgress < 1;
	}
}
export function init() {
	document.querySelectorAll(`[data-component="interactive-video-section"]`).forEach(elem => {
		new InteractiveVideoSection(elem);
	});
}