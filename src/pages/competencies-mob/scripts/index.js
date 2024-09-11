import { getTargetElem } from "../../../shared/scripts/utils.js";
import CategoriesGrid from "../../competencies/scripts/CategoriesGrid.js";
import createDiagramAnimation from "../../competencies/scripts/diagramAnimation.js";
import { RevealWrap, applyRevealWrapsToScope } from "../../../shared/components/revealWrap.js";
import { FramesStack } from "../../../shared/components/frames-stack.js";
import { LevelsComposition } from "../../../shared/components/levels-composition.js";
import { FaqComposition } from "../../../shared/components/faq-composition.js";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", init);

class Animation {
	constructor() {
		this.dom = { root: getTargetElem("#cs-animation") };
		this.prepareMsg02();
		this.prepareMsg03();
		this.prepareMsg04();
		this.prepareMsg05();
		this.prepareMsg06();
		this.prepareMsg07();
		this.prepareMsg08();
		window.app.windowResizeObserver.on("resize", () => this.onResize());
		this.onResize();
	}
	prepareMsg02() {
		const root = document.querySelector(`.cs-mob-msg-02`);
		new SplitText(root, { type: "words" });
		applyRevealWrapsToScope(root);
	}
	prepareMsg03() {
		//this.msg03TopRgbShake = new TextRgbShake(`.cs-mob-msg-03__top`);
		new RevealWrap(`.cs-mob-msg-03__bottom [data-will-reveal="true"]`);
	}
	prepareMsg04() {
		//this.msg04TopRgbShake = new TextRgbShake(`.cs-mob-msg-04__top`);
		const bottom = document.querySelector(`.cs-mob-msg-04__bottom`);
		new SplitText(bottom, { type: "words" });
		applyRevealWrapsToScope(bottom);
	}
	prepareMsg05() {
		new RevealWrap(`.cs-mob-msg-05 [data-will-reveal="true"]`);
	}
	prepareMsg06() {
		const top = document.querySelector(`.cs-mob-msg-06__top`);
		new SplitText(top, { type: "words" });
		applyRevealWrapsToScope(top);
		new RevealWrap(`.cs-mob-msg-06__bottom [data-will-reveal="true"]`);
		//this.msg06BottomRgbShake = new TextRgbShake(`.cs-mob-msg-06__bottom`);
	}
	prepareMsg07() {
		const target = document.querySelector(`.cs-mob-msg-07`);
		new SplitText(target, { type: "words" });
		applyRevealWrapsToScope(target);
	}
	prepareMsg08() {
		const target = document.querySelector(`.cs-mob-msg-08`);
		new SplitText(target, { type: "words" });
		applyRevealWrapsToScope(target);
	}
	onResize() {
		this.rebuildAnimations();
	}
	rebuildAnimations() {
		const self = this;
		if (this.context) this.context.revert();
		this.context = gsap.context(() => {
			// Msg 01 (Feeling...) reveal of " > "  sign
			gsap.fromTo(".cs-mob-msg-01__mid .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				scrollTrigger: {
					trigger: `.cs-mob-msg-01`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
				},
				translateY: "0em",
				scaleY: 1,
				duration: 0.1,
			});
			// Msg 02 (On a daily basis...) reveal
			gsap.fromTo("#cs-animation .cs-mob-msg-02 .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				scrollTrigger: {
					trigger: `.cs-mob-msg-02`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
				},
				translateY: "0em",
				scaleY: 1,
				duration: 0.1,
			});
			const msg03Tl = gsap.timeline({
				scrollTrigger: {
					trigger: `.cs-mob-msg-03`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
					//onLeave: () => this.msg03TopRgbShake.show(900),
				}
			});
			// Msg 03 top (35 000) reveal
			msg03Tl.fromTo("#cs-animation .cs-mob-msg-03__top", {
				translateX: `${window.innerWidth}px`,
			}, {
				translateX: "0px",
				duration: 0.1,
			});
			// Msg 03 bottom  reveal
			msg03Tl.fromTo("#cs-animation .cs-mob-msg-03__bottom .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				translateY: "0em",
				scaleY: 1,
				duration: 0.05,
			});
			const msg04Tl = gsap.timeline({
				scrollTrigger: {
					trigger: `.cs-mob-msg-04`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
					//onLeave: () => this.msg04TopRgbShake.show(900),
				}
			});
			// Msg 04 top (80%) reveal
			msg04Tl.fromTo(".cs-mob-msg-04__top", {
				translateX: `${window.innerWidth}px`,
			}, {
				translateX: "0px",
				duration: 0.1,
			});
			// Msg 04 bottom  reveal
			msg04Tl.fromTo("#cs-animation .cs-mob-msg-04__bottom .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				translateY: "0em",
				scaleY: 1,
				duration: 0.05,
			}, 0.1);
			// Msg 05 "Trigger сhange"  reveal
			gsap.fromTo("#cs-animation .cs-mob-msg-05 .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				scrollTrigger: {
					trigger: `.cs-mob-msg-05`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
				},
				translateY: "0em",
				scaleY: 1,
				duration: 0.05,
			});
			// Msg 06 Whole block  reveal
			gsap.fromTo(".cs-mob-msg-06 .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				scrollTrigger: {
					trigger: `.cs-mob-msg-06`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
					//onLeave: () => this.msg06BottomRgbShake.show(900),
				},
				translateY: "0em",
				scaleY: 1,
				duration: 0.05,
			});
			// Msg 07 Whole block  reveal
			gsap.fromTo("#cs-animation .cs-mob-msg-07 .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				scrollTrigger: {
					trigger: `.cs-mob-msg-07`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
				},
				translateY: "0em",
				scaleY: 1,
				duration: 0.05,
			});
			// Msg 08 Whole block  reveal
			gsap.fromTo(".cs-mob-msg-08 .reveal-wrap__item", {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				scrollTrigger: {
					trigger: `.cs-mob-msg-08`,
					start: `top top+=75%`,
					end: `bottom top+=75%`,
					scrub: 1,
				},
				translateY: "0em",
				scaleY: 1,
				duration: 0.05,
			});
		});
		createDiagramAnimation(".cs-mob-animation__diagram");
	}
}

function init() {
	const grid = new CategoriesGrid("#categories-grid");

	// new TextRgbShake(".cs-mob-msg-02");
	// new AdaptiveSplitText(".cs-mob-msg-02", { });

	new Animation();
	window.toolsFrames = new FramesStack("#tools-frames");
	new FaqComposition("#faq-items");
	new LevelsComposition("#levels-composition");
}