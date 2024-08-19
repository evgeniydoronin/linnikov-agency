import { getTargetElem } from '../scripts/utils.js';
import { applyRevealWraps } from "./revealWrap.js";
const { autorun, action, observable } = mobx;
export class Motto {
	@observable accessor completed = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.selectDomElems();
		this.modifyDom();
		this.rebuildAnimation();
		if (window.app.state.lightMode) {
			this.initAnimationsOnHover();
		}
		setTimeout(() => this.initRelatedLogic(), 0);
	}
	selectDomElems() {
		// this.dom.star = this.dom.root.querySelector(`.motto__star`);
		// this.dom.lightning = this.dom.root.querySelector(`.motto__lightning`);
	}
	initRelatedLogic() {
		autorun(() => {
			if (!window.cookiesAgreementPanel?.isOpen) {
				this.show();
			}
		});
	}
	modifyDom() {
		new SplitText(this.dom.root, { type: "words" });
		applyRevealWraps(this.dom.root);
	}
	rebuildAnimation() {
		// this.animationCtx?.revert();
		// this.animationCtx = gsap.context(() => {
		// 	this.starTween = gsap.effects.svgStarAnimation(this.dom.star);
		// 	this.lightningTween = gsap.effects.svgLightningAnimation(this.dom.lightning);
		// 	this.revealTween = gsap.fromTo(this.dom.root.querySelectorAll(`.reveal-wrap__item`),
		// 			{ scaleY: 1.2, translateY: "160%" },
		// 			{ scaleY: 1, translateY: "0%", duration: 0.4 },
		// 		);
		// 	this.revealTimeline = gsap.timeline({ paused: true });
		// 	this.revealTimeline.add(this.revealTween);
		// 	this.revealTimeline.call(() => this.starTween.play(), []);
		// 	this.revealTimeline.call(() => this.lightningTween.play(), [], this.revealTween.duration() + this.starTween.duration() - 0.5);
		// 	this.revealTimeline.call(() => this.setCompleted(true), [], this.revealTween.duration() + this.starTween.duration() + this.lightningTween.duration() - 0.5)
		// });
	}
	initAnimationsOnHover() {
		// const starHandler = () => this.starTween.restart();
		// const lightningHandler = () => this.lightningTween.restart();
		
		// this.dom.star.addEventListener(`${app.state.pointerType}enter`, starHandler);
		// this.dom.lightning.addEventListener(`${app.state.pointerType}enter`, lightningHandler);

		// return () => {
		// 	this.dom.star.removeEventListener(`${app.state.pointerType}enter`, starHandler);
		// 	this.dom.lightning.removeEventListener(`${app.state.pointerType}enter`, lightningHandler);
		// }
	}
	@action
	setCompleted(next) {
		this.completed = next;
	}
	show() {
		this.revealTimeline.play();
	}
}