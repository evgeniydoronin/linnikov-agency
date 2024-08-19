import { getTargetElem } from '../scripts/utils.js';
export class AnimatedLink {
	constructor(target) {
		this.selectDomElems(target);
		this.modifyDom();
		this.rebuildAnimation();
		this.addListeners();
	}
	selectDomElems(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.text = this.dom.root.querySelector(".text-btn__cap");
		this.dom.lightnings = this.dom.root.querySelectorAll(".text-btn__lightning");
	}
	modifyDom() {
		this.spliter = new SplitText(this.dom.text, { type: "words, chars", charsClass: "char", wordsClass: "word" });
	}
	rebuildAnimation() {
		const matrix = [0, 0.05, 0.1, 0.05, 0, 0.1];
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.textTween = gsap.to(this.spliter.chars, {
				y: "-1.35em",
				duration: 0.4,
				stagger: (idx) => matrix[idx % matrix.length],
				ease: "power2.inOut",
				paused: true,
			});
			if (this.dom.lightnings?.length) {
				this.lightningTween = gsap.effects
					.svgCubicLightningAnimation(this.dom.lightnings);
			}
		});
	}
	addListeners() {
		this.dom.root.addEventListener(`${app.state.pointerType}enter`, () => this.onEnter());
		this.dom.root.addEventListener(`${app.state.pointerType}leave`, () => this.onLeave());
	}
	onEnter() {
		this.textTween.play();
		this.lightningTween?.play();
	}
	onLeave() {
		this.textTween.reverse();
		this.lightningTween?.reverse();
	}
}
export function init() {
	document.querySelectorAll(`[data-component="animated-link"]`).forEach(elem => new AnimatedLink(elem));
}