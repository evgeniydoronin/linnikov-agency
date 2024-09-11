import KeenSlider from 'keen-slider';
import { RevealWrap, applyRevealWraps } from "./revealWrap.js";
import { getTargetElem } from "../scripts/utils.js";

gsap.registerPlugin(Observer);

const { observable, autorun, action, flow, when } = mobx;
class ClientSelectBtn {
	constructor(owner, root) {
		this.owner = owner;
		this.dom = { root };
		this.dom.logo = this.dom.root.querySelector(".testimonials-btn__logo");
		this.name = this.dom.root.getAttribute("data-name");
		this.relatedCard = this.owner.cardsIndex[this.name];
		if (this.dom.root.hasAttribute("data-default-selected")) {
			this.owner.setActiveCard(this.relatedCard);
		}
		this.addListeners();
		// this.updateViewBox();
		autorun(() => {
			this.updateView();
		});
		this.dom.root.classList.add("_initialized");
	}
	addListeners() {
		this.dom.root.addEventListener("click", () => this.onClick());
	}
	updateView() {
		this.dom.root.classList.toggle("_active", this.owner.activeCard === this.relatedCard && this.owner.activeCard.active);
	}
	onClick() {
		this.owner.setActiveCard(this.relatedCard);
	}
}
class Card {
	@observable accessor transition = null;
	@observable accessor active = false;
	constructor(owner, root, idx) {
		this.owner = owner;
		this.idx = idx;
		this.dom = { root };
		this.name = this.dom.root.getAttribute("data-name");
		this.owner.cardsIndex[this.name] = this;
		this.initAsync();
		window.app.windowResizeObserver.on("resize", () => this.onResize());
		this.dom.root.classList.add("_initialized");
	}
	async initAsync() {
		await this.modifyDom();
		this.createRevealAnimation();
		autorun(() => {
			this.updateView();
		});
	}
	async onResize() {
		await this.modifyDom();
		this.createRevealAnimation();
		if (this.active) this.show();
	}
	@action
	setTransition(next) {
		this.transition = next;
	}
	@action
	setActive(next) {
		this.active = next;
	}
	updateView() {
		this.dom.root.classList.toggle("_active", this.active);
		if (this.active) {
			this.show();
		} else {
			this.hide();
		}
	}
	async modifyDom() {
		await document.fonts.load("16px RobotoMono");
		if (this.spliter) {
			this.spliter.revert();
			this.spliter.split({ type: "lines", linesClass: "line" });
		} else {
			this.spliter = new SplitText(this.dom.root.querySelectorAll(`.testimonials-card__name, .testimonials-card__title, .testimonials-quote [data-to-split]`), { type: "lines", linesClass: "line" });
		}
		const toWrap = this.dom.root.querySelectorAll(`.testimonials-card__name, .testimonials-card__title, .testimonials-quote > *:where([data-to-split])`);
		toWrap.forEach(root => applyRevealWraps(root));
		new RevealWrap(this.dom.root.querySelector(".testimonials-quote .testimonials-quote-sign_open"));
	}
	createRevealAnimation() {
		this.ctx?.revert();
		this.ctx = gsap.context(() => {
			this.revealTween = gsap.effects.reveal(this.dom.root.querySelectorAll(".reveal-wrap__item"), { paused: true });
			this.revealTween.eventCallback("onComplete", () => this.setTransition("shown"));
			this.revealTween.eventCallback("onReverseComplete", () => this.setTransition("hidden"));
		});
	}

	@flow
	* show() {
		if (this.revealTween.progress() < 1) this.setTransition("showing");
		this.revealTween.play();
		yield when(() => this.transition !== "showing");
	}
	@flow
	* hide() {
		if (this.revealTween.progress() > 0) this.setTransition("hiding");
		this.revealTween.reverse();
		yield when(() => this.transition !== "hiding");
	}
}
class Pagination {
	constructor(owner) {
		this.owner = owner;
		this.elem = this.owner.dom.root.querySelector(".testimonials__pagination");
		this.owner.cards.forEach((_, idx) => {
			const bullet = new PaginationBullet(this, idx);
			this.elem.append(bullet.elem);
		});
	}
}
class PaginationBullet {
	constructor(owner, idx) {
		this.owner = owner;
		this.elem = document.createElement("div");
		this.elem.classList.add("testimonials-pagination-bullet");
		setTimeout(() => {
			autorun(() => {
				this.setActive(this.owner.owner.activeCard.idx === idx);
			});
		}, 0);
	}
	setActive(next) {
		this.elem.classList.toggle("_active", next);
	}
}
export class Testimonials {
	@observable accessor activeCard = null;
	@observable accessor prevActiveCard = null;
	@observable accessor autoplayBlocked = null;
	blockTimerId = null;
	autoplayIntervalId = null;
	processNextSwipe = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.body = this.dom.root.querySelector(".testimonials__body");
		this.initHeaderSlider();
		if (app.state.isMobile) this.initBodySlider();
		//window.app.windowResizeObserver.on("resize", () => this.rebuild());
		//this.rebuild();
		this.cardsIndex = {};
		this.cards = Array.from(this.dom.root.querySelectorAll(".testimonials-card")).map((elem, idx) => new Card(this, elem, idx));
		this.clientSelectBtns = Array.from(this.dom.root.querySelectorAll(".testimonials__client")).map((elem) => new ClientSelectBtn(this, elem));
		new Pagination(this);
		this.addListeners();
		setTimeout(() => this.headerSlider.update(), 0);
		autorun(() => {
			if (this.autoplayBlocked) {
				this.autoplayIntervalId !== null && clearInterval(this.autoplayIntervalId);
			} else {
				this.autoplayIntervalId = setInterval(() => this.next(), 3000);
			}
		});

		this.dom.root.registerModule("testimonials", this);
		this.dom.root.classList.add("testimonials_initialized");
	}
	initBodySlider() {
		Observer.create({
			target: this.dom.body, // can be any element (selector text is fine)
			type: "touch", // comma-delimited list of what to listen for
			lockAxis: true,
			axis: "x",
			onLeft: () => {
				if (this.processNextSwipe) {
					this.processNextSwipe = false;
					this.next();
				}
			},
			onRight: () => {
				if (this.processNextSwipe) {
					this.processNextSwipe = false;
					this.prev();
				}
			},
			onPress: () => this.processNextSwipe = true,
			onRelease: () => this.processNextSwipe = false,
		});
	}
	addListeners() {
		this.dom.root.addEventListener(`${app.state.pointerType}down`, () => this.blockAutoplay());
	}
	blockAutoplay() {
		if (this.blockTimerId === null) {
			this.setAutoplayBlocked(true);
		} else {
			clearTimeout(this.blockTimerId);
		}
		this.blockTimerId = setTimeout(() => {
			this.blockTimerId = null;
			this.setAutoplayBlocked(false);
		}, 5000);
	}
	@action
	setAutoplayBlocked(next) {
		this.autoplayBlocked = next;
	}
	async next() {
		const nextIdx = this.activeCard.idx < this.cards.length - 1 ? this.activeCard.idx + 1 : 0;
		this.setActiveCard(this.cards[nextIdx]);
		this.headerSlider.moveToIdx(nextIdx);
	}
	async prev() {
		const prevIdx = this.activeCard.idx > 0 ? this.activeCard.idx - 1 : this.cards.length - 1;
		this.setActiveCard(this.cards[prevIdx]);
		this.headerSlider.moveToIdx(prevIdx);
	}
	@flow
	* setActiveCard(next) {
		if (next === this.activeCard) return;
		this.whenNoTransition?.cancel();
		this.activeCard?.setActive(false);
		this.prevActiveCard = this.activeCard;
		this.whenNoTransition = when(() => !this.prevActiveCard?.isInTransition);
		yield this.whenNoTransition;
		this.activeCard = next;
		this.activeCard?.setActive(true);
	}
	initHeaderSlider() {
		this.headerSlider = new KeenSlider(
			this.dom.root.querySelector(`.testimonials__header`),
			{
				loop: true,
				slides: {
					perView: "auto",
					spacing: 60,
        },
			},
		);
	}
}
export function init() {
	document.querySelectorAll(`[data-component="testimonials"]`).forEach(elem => {
		new Testimonials(elem);
	});
}