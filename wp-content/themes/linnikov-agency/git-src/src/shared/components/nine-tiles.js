import { getTargetElem } from "../scripts/utils.js";
//const { autorun, observable, action } = mobx;

export class NineTiles {
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.inner = this.dom.root.querySelector(".nine-tiles__inner");
		this.dom.activeTile = this.dom.root.querySelector(".nine-tiles__inner *:nth-child(5)");
		window.app.resizeObserver.on("resize", () => this.rebuildAnimation());
		this.rebuildAnimation();
	}
	rebuildAnimation() {
		this.gsapCtx?.revert();
		this.gsapCtx = gsap.context(() => {
			if (window.innerWidth <= 1240) return;
			gsap.from(this.dom.activeTile, {
				scrollTrigger: {
					trigger: this.dom.root,
					start: "top top",
					end: () => {
						const innerExtraHeight = this.dom.inner.offsetHeight + gsap.getProperty(this.dom.inner, "top") - window.innerHeight;
						return `bottom-=${Math.max(innerExtraHeight, 0)} bottom`;
					},
					scrub: 0.8,
				},
				scale: ((this.dom.activeTile.offsetHeight > this.dom.activeTile.offsetWidth ?
					window.innerHeight / this.dom.activeTile.offsetHeight :
					window.innerWidth / this.dom.activeTile.offsetWidth) * 1.2),
				ease: "none",
				duration: 1
			});
		});
	}
}