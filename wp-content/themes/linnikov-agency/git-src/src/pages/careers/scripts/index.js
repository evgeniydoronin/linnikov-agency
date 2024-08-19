import { Motto } from "../../../shared/components/motto.js";
import { LeaveCVForm } from "../../../shared/components/forms.js";
document.addEventListener("DOMContentLoaded", init);

class CareersMotto extends Motto {
	constructor(target) {
		super(target);
	}
	selectDomElems() {
		this.dom.star1 = this.dom.root.querySelector(`.motto__star_1`);
		this.dom.star2 = this.dom.root.querySelector(`.motto__star_2`);
	}
	rebuildAnimation() {
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.star1Tween = gsap.effects.svgStarAnimation(this.dom.star1);
			this.star2Tween = gsap.effects.svgStarAnimation(this.dom.star2);
			this.revealTween = gsap.fromTo(this.dom.root.querySelectorAll(`.reveal-wrap__item`),
					{ scaleY: 1.2, translateY: "160%" },
					{ scaleY: 1, translateY: "0%", duration: 0.4 },
				);
			this.revealTimeline = gsap.timeline({ paused: true });
			this.revealTimeline.add(this.revealTween);
			this.revealTimeline.call(() => this.star1Tween.play(), []);
			this.revealTimeline.call(() => this.star2Tween.play(), [], this.revealTween.duration() + this.star1Tween.duration() - 0.5);
		});
	}
	initAnimationsOnHover() {
		const star1Handler = () => this.star1Tween.restart();
		const star2Handler = () => this.star2Tween.restart();
		
		this.dom.star1.addEventListener(`${app.state.pointerType}enter`, star1Handler);
		this.dom.star2.addEventListener(`${app.state.pointerType}enter`, star2Handler);

		return () => {
			this.dom.star1.removeEventListener(`${app.state.pointerType}enter`, star1Handler);
			this.dom.star2.removeEventListener(`${app.state.pointerType}enter`, star2Handler);
		}
	}
}

function init() {
	new CareersMotto("#careers-motto");
	new LeaveCVForm("#leave-cv-form");
}