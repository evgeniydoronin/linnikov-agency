import KeenSlider from 'keen-slider';
import { delay, getTargetElem } from '../../../shared/scripts/utils.js';
import { Motto } from "../../../shared/components/motto.js";
const { autorun, action, observable } = mobx;

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger, SplitText, PhysicsPropsPlugin);

document.addEventListener("DOMContentLoaded", init);
class TeamBoardFilter {
	#activeFilter = null;
	constructor(owner) {
		this.owner = owner;
		this.dom = {
			root: owner.dom.root.querySelector(`[data-elem="team-booard.filter"]`),
		}
		this.buttons = Array.from(owner.dom.root.querySelectorAll(".team-board-filter-btn"))
			.map(elem => new TeamBoardFilterButton(elem, this));
		this.owner.applyFilter();
	}
	toggleFilter(source) {
		if (this.#activeFilter === source) {
			this.#activeFilter.active = false;
			this.#activeFilter = null;
		} else {
			if (this.#activeFilter) {
				this.#activeFilter.active = false;
				this.#activeFilter = null;
			}
			this.#activeFilter = source;
			this.#activeFilter.active = true;
		}
		this.owner.applyFilter(this.#activeFilter?.category);
	}
}
class MemberCard {
	#active = false;
	#hovered = false;
	constructor(board, root) {
		this.board = board;
		this.dom = {
			root,
			title: root.querySelector(".team-board-card__title"),
			role: root.querySelector(".team-board-card__role")
		};
		this.memberId = this.dom.root.getAttribute("data-id");
		this.categories = this.dom.root.getAttribute("data-category").split(",").map(category => category.trim());
		this.addListeners();
	}
	set active(next) {
		this.#active = next;
		this.dom.root.classList.toggle("_active", next);
		if (this.#active) {
			this.dom.root.setAttribute("data-active", true);
		} else {
			this.dom.root.removeAttribute("data-active");
		}
	}
	get active() {
		return this.#active;
	}
	get title() {
		return this.dom.title.textContent;
	}
	get role() {
		return this.dom.role.textContent;
	}
	addListeners() {
		this.dom.root.addEventListener(`${app.state.pointerType}over`, () => this.hovered = true);
		this.dom.root.addEventListener(`${app.state.pointerType}out`, () => this.hovered = false);
		this.dom.root.addEventListener(`click`, () => this.onClick());
	}
	onClick() {
		if (!this.#active) return;
		window.app.drawers.get(`member-${this.memberId}`)?.open();
	}
	set hovered(next) {
		this.#hovered = next;
		this.dom.root.classList.toggle("_hovered", next);
		if (next && this.#active) {
			this.board.hoveredCard = this;
		} else {
			this.board.hoveredCard = null;
		}
	}
}
class SelectedMember {
	#source = null;
	#title = null;
	#role = null;
	constructor(board, root) {
		this.board = board;
		this.dom = {
			root,
			picture: root.querySelector("picture"),
			titleRoot: root.querySelector(".team-board-card__title"),
			titleItem: root.querySelector(".team-board-card__title .reveal-wrap__item"),
			roleRoot: root.querySelector(".team-board-card__role"),
			roleItem: root.querySelector(".team-board-card__role .reveal-wrap__item")
		};
		this.#title = this.dom.titleItem.textContent;
		this.#role = this.dom.roleItem.textContent;
		this.update();
	}
	set title(next) {
		if (this.#title === next) return;
		this.#title = next;
	}
	set role(next) {
		if (this.#role === next) return;
		this.#role = next;
	}
	updateInfo() {
		this.showInfoAnimationCtrl?.abort();
		requestAnimationFrame(async () => {
			this.showInfoAnimationCtrl = new AbortController();
			this.dom.roleRoot.classList.remove("reveal-wrap_active");
			this.dom.titleRoot.classList.remove("reveal-wrap_active");
			await delay(400);
			if (this.showInfoAnimationCtrl.signal.aborted) return;
			this.dom.roleItem.textContent = this.#role;
			this.dom.titleItem.textContent = this.#title;
			this.dom.roleRoot.classList.add("reveal-wrap_active");
			this.dom.titleRoot.classList.add("reveal-wrap_active");
		});
	}
	renderPictureContent() {
		// return'<source srcset="'.concat(this.board.hoveredCard.memberId,'"><img src="').concat(this.board.hoveredCard.memberId,'">')
		// return `<source srcset="@#img/team/${this.board.hoveredCard.memberId}.webp"><img src="@#img/team/${this.board.hoveredCard.memberId}.jpg" alt="One of the heroes">`;
		return `<source srcset="${this.board.hoveredCard.memberId}"><img src="${this.board.hoveredCard.memberId}" alt="One of the heroes">`;
	}
	update() {
		if (this.#source === this.board.hoveredCard || !this.board.hoveredCard) return;
		this.#source = this.board.hoveredCard;
		this.dom.picture.innerHTML = this.renderPictureContent();
		this.title = this.board.hoveredCard.title;
		this.role = this.board.hoveredCard.role;
		this.updateInfo();
	}
}
class TeamBoard {
	#hoveredCard = null;
	#showTip = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.tip = this.dom.root.querySelector(".team-board__tip");
		this.cards = Array.from(this.dom.root.querySelectorAll(".team-board-card:not(.team-board-card_selected)"))
			.map(elem => new MemberCard(this, elem));
		this.selectedMember = new SelectedMember(this, this.dom.root.querySelector(".team-board-card_selected"));
		this.initSlider();
		this.initTip();
		this.filter = new TeamBoardFilter(this);
	}
	set showTip(next) {
		this.#showTip = next;
		this.dom.tip.classList.toggle("_show", next);
	}
	get showTip() {
		return this.#showTip;
	}
	set hoveredCard(next) {
		this.#hoveredCard = next;
		this.dom.root.classList.toggle("has-hovered-card", next);
		this.selectedMember.update();
		this.showTip = Boolean(next);
	}
	get hoveredCard() {
		return this.#hoveredCard;
	}
	applyFilter(filterCategory) {
		this.cards.forEach(card => card.active = !filterCategory || card.categories.some((category) => category === filterCategory));
	}
	initTip() {
		let xTo = gsap.quickTo(this.dom.tip, "left", {duration: 0.4, ease: "power3"}),
    		yTo = gsap.quickTo(this.dom.tip, "top", {duration: 0.4, ease: "power3"});

		window.addEventListener(`${app.state.pointerType}move`, e => {
			xTo(e.clientX);
			yTo(e.clientY);
		});
	}
	initSlider() {
		this.slider = new KeenSlider(
			this.dom.root.querySelector(`[data-elem="team-board.members"]`),
			{
				loop: true,
				slides: {
          perView: 2.6,
					spacing: 20,
        },
				breakpoints: {
					"(min-width: 1025px)": {
						disabled: true
					},
					"(max-width: 768px)": {
						disabled: false,
						slides: {
							perView: 2.2,
							spacing: 32,
						},
					},
					"(max-width: 600px)": {
						disabled: false,
						slides: {
							perView: 1.2,
							spacing: 32,
						},
					},
					"(max-width: 500px)": {
						disabled: false,
						slides: {
							perView: 1.2,
							spacing: 26,
						},
					}
				}
			},
		);
	}
}
class TeamBoardFilterButton {
	#hovered = false;
	constructor(target, owner) {
		this.owner = owner;
		this.category = target.getAttribute("data-category");
		this.dom = { root: target, icon: target.querySelector(".team-board-filter-btn__icon") };
		this.initOnHoverAnimation();
		this.addListeners();
	}
	addListeners() {
		this.dom.root.addEventListener("click", () => this.onClick());
		this.dom.root.addEventListener(`${app.state.pointerType}over`, () => this.hovered = true);
		this.dom.root.addEventListener(`${app.state.pointerType}out`, () => this.hovered = false);
	}
	initOnHoverAnimation() {
		this.hoverIconTween = gsap.to(this.dom.icon.querySelector("path"), { duration: 0.4, morphSVG: `M7,8 H14 V16 H7 V8`, paused: true });
	}
	set active(next) {
		this.dom.root.classList.toggle("_active", next);
	}
	onClick() {
		this.owner.toggleFilter(this);
	}
	set hovered(next) {
		this.#hovered = next;
		this.dom.root.classList.toggle("_hovered", next);
		if (next) {
			this.hoverIconTween.play();
		} else {
			this.hoverIconTween.reverse();
		}
	}
}
class TeamMotto extends Motto {
	constructor(target) {
		super(target);
	}
	selectDomElems() {
		this.dom.star = this.dom.root.querySelector(`.motto__star`);
		this.dom.lightning = this.dom.root.querySelector(`.motto__lightning`);
	}
	rebuildAnimation() {
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.starTween = gsap.effects.svgStarAnimation(this.dom.star);
			this.lightningTween = gsap.effects.svgLightningAnimation(this.dom.lightning);
			this.revealTween = gsap.fromTo(this.dom.root.querySelectorAll(`.reveal-wrap__item`),
					{ scaleY: 1.2, translateY: "160%" },
					{ scaleY: 1, translateY: "0%", duration: 0.4 },
				);
			this.revealTimeline = gsap.timeline({ paused: true });
			this.revealTimeline.add(this.revealTween);
			this.revealTimeline.call(() => this.starTween.play(), []);
			this.revealTimeline.call(() => this.lightningTween.play(), [], this.revealTween.duration() + this.starTween.duration() - 0.5);
			this.revealTimeline.call(() => this.setCompleted(true), [], this.revealTween.duration() + this.starTween.duration() + this.lightningTween.duration() - 0.5)
		});
	}
	initAnimationsOnHover() {
		const starHandler = () => this.starTween.restart();
		const lightningHandler = () => this.lightningTween.restart();
		
		this.dom.star.addEventListener(`${app.state.pointerType}enter`, starHandler);
		this.dom.lightning.addEventListener(`${app.state.pointerType}enter`, lightningHandler);

		return () => {
			this.dom.star.removeEventListener(`${app.state.pointerType}enter`, starHandler);
			this.dom.lightning.removeEventListener(`${app.state.pointerType}enter`, lightningHandler);
		}
	}
}
function init() {
	const heroSectionElem = document.querySelector(".hero_team-page");
	new TeamBoard("#team-board");
	const motto = new TeamMotto("#team-motto");
	autorun(() => {
		heroSectionElem.classList.toggle("animation_completed", motto.completed);
	});
}