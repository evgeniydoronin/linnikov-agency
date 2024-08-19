import { applyRevealWrapsToScope, applyRevealWraps } from "../../../shared/components/revealWrap.js";
import { Testimonials } from "../../../shared/components/testimonials.js";
import { getTargetElem } from "../../../shared/scripts/utils.js";

const { autorun, action, observable } = mobx;

gsap.registerPlugin(ScrollTrigger, SplitText, PhysicsPropsPlugin);


document.addEventListener("DOMContentLoaded", init);

function init() {
	const offerSectionElem = document.querySelector("#our-offer");
	new FallingLeafAnimation();
	new AboutUsMotto("#about-us-motto");
	const msgAnimation = new OurOfferMsgAnimation();
	autorun(() => {
		offerSectionElem.classList.toggle("animation_completed", msgAnimation.completed);
	});
	new Testimonials("#testimonials");
}
class FallingLeafAnimation {
	constructor() {
		this.modifyDom();
		this.root = document.querySelector(`#falling-leaf-cards`);
		this.cards = this.root.querySelectorAll(`.about-us-card`);
		this.widthMedia = matchMedia("(min-width: 1025px)");
		this.recalcVars();
		this.rebuild();
		window.app.resizeObserver.on("resize", () => this.onResize());
	}
	onResize() {
		this.recalcVars();
		this.rebuild();
	}
	recalcVars() {
		this.activeCardsNumber = this.widthMedia.matches ? this.cards.length : this.cards.length - 1;
		this.duration = 1 / this.activeCardsNumber;
	}
	rebuild() {
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.tl = gsap.timeline({
				scrollTrigger: {
					trigger: "#falling-leaf-cards",
					start: "top bottom-=30%",
					end: "bottom bottom",
					scrub: 1
				}
			});
			// Add moving cards animation
			if (this.widthMedia.matches) {
				this.tl.fromTo(this.cards,
					{
						translateX: (idx) => `${window.innerWidth * (idx % 2 === 0 ? 0.2 : -0.2)}px`,
						translateY: (idx, self) => `${window.innerHeight / 2 + self.offsetHeight * 0.75 * 1.2}px`,
						rotate: (idx) => ["-20deg", "25deg", "-24deg"][idx % 3],
						transformOrigin: "center"
					},
					{
						translateX: "0",
						rotate: (idx) => ["5deg", "-6deg", "8deg", "0deg"][idx % 4],
						translateY: `0%`,
						duration: (_, __, list) => 1 / list.length,
						stagger: function (index, target, list) {
							return index > 0 ? index / list.length + 1 / list.length * 0.15 : 0;
						}
					}
				);
				this.tl.from(this.cards,
					{
						scale: 1.2,
						stagger: function (index, target, list) {
							return index / list.length;
						}
					},
					0
				);
			}
			this.tl.add(this.createCard01Animation(this.duration, this.activeCardsNumber), this.duration * 0.1);
			this.tl.add(this.createCard02Animation(this.duration, this.activeCardsNumber), this.duration + this.duration * (this.widthMedia.matches ? 0.15 : 0.1));
			this.tl.add(this.createCard03Animation(this.duration, this.activeCardsNumber), this.duration * 2 + this.duration * 0.1);
			if (this.widthMedia.matches) {
				this.tl.add(this.createCard04Animation(this.duration, this.activeCardsNumber), this.duration * 3 + this.duration * 0.1);
				this.tl.fromTo(`.falling-leaf-cards__bg span`, {
						opacity: 0,
					},{
						keyframes: [
							{ opacity: 1, duration: this.duration },
							{
								translateX: "-5%",
								ease: "none",
								delay: -this.duration
							},
						],
						duration: 1,
					},
					this.duration * 0.7 + this.duration * 0.1
				);
				this.tl.fromTo(`.falling-leaf-cards__sticky-wrap`, {
					"--overlay-opacity": 0,
					},{
						"--overlay-opacity": 1,
						duration: this.duration,
					},
					1
				);
				this.tl.fromTo(`.about-us-card_t4`, { "--shadow-size": "100px", "--shadow-v-shift": "4px" }, { "--shadow-size": "0px", "--shadow-v-shift": "0px", duration: this.duration }, 1 );
				this.tl.fromTo(`.about-us-card_t4 .about-us-card__body`, {
						scale: 1,
					},{
						scale: (_, self) => {
							const pageTitleElem = document.querySelector(".hero__title");
							const msgElem = self.querySelector(".about-us-card__msg");
							return gsap.getProperty(pageTitleElem, "font-size") / gsap.getProperty(msgElem, "font-size");
						},
						duration: this.duration,
					},
					1
				);
				this.tl.fromTo(`.about-us-card_t4 .about-us-card__decor`, {
					scaleY: 1,
				},{
					scaleY: (_, self) => {
						const cardElem = self.closest(".about-us-card_t4");
						const prevDecorHeight = gsap.getProperty(document.querySelector(".about-us-card_t3 .about-us-card__decor"), "--height");
						const decorHeight = gsap.getProperty(cardElem.querySelector(".about-us-card__decor"), "--height");
						const pageTitleFontSize = gsap.getProperty(document.querySelector(".hero__title"), "font-size");
						const msgFontSize = gsap.getProperty(cardElem.querySelector(".about-us-card__msg"), "font-size");
						return prevDecorHeight / decorHeight / pageTitleFontSize * msgFontSize;
					},
					duration: this.duration,
				},
				1
			);
			} else {
				gsap.set(`.falling-leaf-cards__bg`, { opacity: 0 });
			}
		});
	}
	modifyDom() {
		new SplitText(`#card-01`, { type: "words" });
		applyRevealWrapsToScope(`#card-01 .about-us-card__title`);
		new SplitText(`#card-02`, { type: "words" });
		applyRevealWrapsToScope(`#card-02 .about-us-card__title`);
		new SplitText(`#card-03`, { type: "words" });
		applyRevealWrapsToScope(`#card-03 .about-us-card__msg`);
	}
	createCard01Animation() {
		const tl = gsap.timeline({});
		// Title appears
		 tl.fromTo(`#card-01 .about-us-card__title .reveal-wrap__item`,
			{ scaleY: 1.2, translateY: "160%" },
			{ scaleY: 1, translateY: "0%", duration: this.duration / 4 },
			this.widthMedia.matches ? this.duration / 2 : 0
		);
		tl.add(createCardStepsAnimation("#card-01", this.duration / 4, false));
		return tl;
	}
	createCard02Animation() {
		const tl = gsap.timeline({});
		// Title appears
		 tl.fromTo(`#card-02 .about-us-card__title .reveal-wrap__item`,
			{ scaleY: 1.2, translateY: "160%" },
			{ scaleY: 1, translateY: "0%", duration: this.duration / 4 },
			this.widthMedia.matches ? this.duration / 2 : 0
		);
		tl.add(createCardStepsAnimation("#card-02", this.duration / 4, true));
		return tl;
	}
	createCard03Animation() {
		const tl = gsap.timeline({});
		// Text and decor  appears
		 tl.fromTo(`#card-03 .reveal-wrap__item`,
			{ scaleY: 1.2, translateY: "160%" },
			{ scaleY: 1, translateY: "0%", duration: this.duration / 4 },
			this.widthMedia.matches ? this.duration / 2 : 0
		);
		// Star appears
		tl.fromTo(`#card-03 .about-us-card__star`,
			{ scale: 0.75, opacity: 0 },
			{ scale: 1, opacity: 1, duration: this.duration / 4, transformOrigin: "center" },
		);
		return tl;
	}
	createCard04Animation() {
		const tl = gsap.timeline({});
		// Text and decor  appears
		 tl.fromTo(`#card-04 .reveal-wrap__item`,
			{ scaleY: 1.2, translateY: "160%" },
			{ scaleY: 1, translateY: "0%", duration: this.duration / 4 },
			this.duration / 2
		);
		// Star appears
		tl.fromTo(`#card-04 .about-us-card__star`,
			{ scale: 0.75, opacity: 0 },
			{ scale: 1, opacity: 1, duration: this.duration / 4, transformOrigin: "center" },
		);
		return tl;
	}
}
function createCardStepsAnimation(rootSelector, duration, withBoxes) {
	const tl = gsap.timeline();
	const shift = withBoxes ? 0 : duration / 4;
	// Steps appear
	tl.fromTo(`${rootSelector} .step__inner`,
		{ translateY: "160%", transformOrigin: "center" },
		{ translateY: "0", duration: duration / 12, stagger: duration / 12 },
		shift
	);
	tl.fromTo(`${rootSelector} .step__shadow`,
		{ translateX: (idx, self) => {
			return 5;
		},
			translateY: (idx, self) => 4,
			transformOrigin: "center" },
		{ translateX: "0", translateY: "0", duration: duration / 12, stagger: duration / 12 },
		shift + duration / 12 * 2
	);
	// Left star appear
	tl.fromTo(`${rootSelector} .star-1`,
		{ scale: 0.8, opacity: 0, transformOrigin: "center" },
		{ scale: 1, opacity: 1, duration: duration / 6 },
	);
	// Boxes appear
	if (withBoxes) {
		tl.fromTo(`${rootSelector} .card-animation-box`,
			{ opacity: 0 },
			{ opacity: 1, duration: duration / 6, stagger: duration / 18 },
		);
	}
	// Right star appear
	tl.fromTo(`${rootSelector} .star-2`,
		{ scale: 0.8, opacity: 0, transformOrigin: "center" },
		{ scale: 1, opacity: 1, duration: duration / 6 },
	);
	return tl;
}

class OurOfferMsgAnimation {
	@observable accessor completed = false;
	constructor() {
		this.dom = { root: document.querySelector("#our-offer-msg") };
		this.dom.star = this.dom.root.querySelector(`#our-offer-msg .our-offer-msg__star`);
		this.dom.lightning = this.dom.root.querySelector(`#our-offer-msg .our-offer-msg__lightning`);
		this.dom.infinity = this.dom.root.querySelector(`#our-offer-msg .our-offer-msg__infinity`);
		this.modifyDom();
		window.app.resizeObserver.on("resize", () => this.onResize());
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
			gsap.fromTo(`#our-offer-msg .reveal-wrap__item`, {
				translateY: "1.8em",
				scaleY: 1.2,
			}, {
				translateY: "0",
				scaleY: 1,
				scrollTrigger: {
					trigger: "#our-offer-msg",
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
		new SplitText(`#our-offer-msg`, { type: "words" });
		applyRevealWraps(`#our-offer-msg`);
	}
}
class AboutUsMotto {
	@observable accessor completed = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.body = this.dom.root.querySelector(`.about-us-motto__body`);
		this.dom.star = this.dom.root.querySelector(`.about-us-motto__star`);
		this.dom.msg = this.dom.root.querySelector(`.about-us-motto__msg`);
		this.dom.inner = this.dom.root.querySelector(`.about-us-motto__inner`);
		this.dom.decorWrap = this.dom.root.querySelector(`.about-us-motto__decor-wrap`);
		this.initAnimationsOnHover();
		this.rebuildAnimation();
		this.rescale();
		window.app.resizeObserver.on("resize", () => this.onResize());
	}
	onResize() {
		this.rescale();
	}
	rebuildAnimation() {
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.starTween = gsap.effects.svgStarAnimation(this.dom.star, { duration: 1 });
			this.revealTween = gsap.fromTo(this.dom.root.querySelectorAll(`.reveal-wrap__item`),
					{ scaleY: 1.2, translateY: "160%" },
					{ scaleY: 1, translateY: "0%", duration: 0.4,
						onComplete: () => {
							this.starTween.eventCallback("onComplete", () => {
								this.setCompleted(true);
								this.starTween.eventCallback("onComplete", null);
							});
							this.starTween.restart();
						},
						onReverseComplete: () => this.setCompleted(false),
						scrollTrigger: {
							trigger: this.dom.root,
							start: "top top+=50%",
							toggleActions: "play none none reverse"
						}
					},
				);
		});
	}
	initAnimationsOnHover() {
		const starHandler = () => this.starTween.restart();
		this.dom.star.addEventListener(`${app.state.pointerType}enter`, starHandler);
		return () => {
			this.dom.star.removeEventListener(`${app.state.pointerType}enter`, starHandler);
		}
	}
	rescale() {
		const pageTitleElem = document.querySelector(".hero__title");
		const scale = gsap.getProperty(pageTitleElem, "font-size") / gsap.getProperty(this.dom.msg, "font-size");
		gsap.set(this.dom.body, { scale });
		gsap.set(this.dom.decorWrap, { scaleY: 1 / scale });
	}
	@action
	setCompleted(next) {
		this.completed = next;
		this.dom.root.classList.toggle("animation_completed", next);
	}
}