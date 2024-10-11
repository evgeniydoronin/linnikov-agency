import { applyRevealWraps } from "../components/revealWrap.js";
const { action, observable } = mobx;

export default class TripleMsgDecorAnimation {
	@observable accessor completed = false;
	constructor(root) {
		this.dom = {
			root,
			star: root.querySelector(`.our-offer-msg__star`),
			lightning: root.querySelector(`.our-offer-msg__lightning`),
			infinity: root.querySelector(`.our-offer-msg__infinity`),
		}
		this.modifyDom();
		window.app.windowResizeObserver.on("resize", () => this.onResize());
		this.rebuild();
	}
	@action
	setCompleted(next) {
		this.completed = next;
	}
	onResize() {
		this.rebuild();
	}
	rebuild() {
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.starTween = gsap.effects.svgStarAnimation(this.dom.star);
			this.lightningTween = gsap.effects.svgLightningAnimation(this.dom.lightning);
			this.infinityTween = gsap.to(this.dom.infinity, {
				keyframes: [
					{ strokeDashoffset: -342.16, duration: 0.6, ease: "power1.out" },
					{ strokeDashoffset: -684, duration: 0.9, ease: "power1.in", onStart: () => gsap.set(this.dom.infinity, { "--color": "#0CFF7C" }) }
				],
				paused: true
			});
			const tl = gsap.timeline({ paused: true });
			tl.call(() => { this.setCompleted(false); this.starTween.restart(); }, null, 0);
			tl.call(() => this.lightningTween.restart(), null, .75);
			tl.call(() => this.infinityTween.restart(), null, 2.6);
			tl.call(() =>  this.setCompleted(true), null);
			gsap.fromTo(this.dom.root.querySelectorAll(".reveal-wrap__item"), {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				translateY: "0",
				scaleY: 1,
				scrollTrigger: {
					trigger: this.dom.root,
					start: "bottom-=50% bottom",
					toggleActions: "play none none reverse",
				},
				onComplete: async () => tl.restart(),
			});
			return this.initAnimationsOnHover();
		});
	}
	initAnimationsOnHover() {
		const starHandler = () => this.starTween.restart();
		const lightningHandler = () => this.lightningTween.restart();
		const infinityHandler = () => this.infinityTween.restart();
		
		this.dom.star.addEventListener(`${app.state.pointerType}enter`, starHandler);
		this.dom.lightning.addEventListener(`${app.state.pointerType}enter`, lightningHandler);
		this.dom.infinity.addEventListener(`${app.state.pointerType}enter`, infinityHandler);

		return () => {
			this.dom.star.removeEventListener(`${app.state.pointerType}enter`, starHandler);
			this.dom.lightning.removeEventListener(`${app.state.pointerType}enter`, lightningHandler);
			this.dom.infinity.removeEventListener(`${app.state.pointerType}enter`, infinityHandler);
		}
	}
	modifyDom() {
		new SplitText(this.dom.root, { type: "words" });
		applyRevealWraps(this.dom.root);
	}
}