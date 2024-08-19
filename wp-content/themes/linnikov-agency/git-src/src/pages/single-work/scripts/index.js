import CardHoverHandler from "../../../shared/components/card-hover-handler.js";
import { initBeforeAfterSliders } from "../../../shared/components/before-after-slider.js";
// import Spacer from "../../../shared/components/spacer.js";
import { WorksSlider } from "../../../shared/components/works-slider.js";
import { NineTiles } from "../../../shared/components/nine-tiles.js";
import throttle from "lodash.throttle";
gsap.registerPlugin(ScrollTrigger);

const { action, autorun, observable } = window.mobx;

document.addEventListener("DOMContentLoaded", init);

function init() {
	window.app.drawers.get("work-details").setOptions({ closeOnOutsideClick: false, modal: false });
	new CardHoverHandler({
		container: document.querySelector("#more-works"),
		targetSelector: ".case-poster"
	});
	new SingleLineScrollSlider("#single-line-scroll-slider");
	new TwoLinesScrollSlider("#two-lines-scroll-slider");
	pageHeader.addTrigger("#detail-panel");
	const moreWorks = new WorksSlider("#more-works");
	window.projectDetails = new Details(moreWorks);
	initBeforeAfterSliders();
	new NineTiles("#nine-tiles");
}

// class StickySiblingsMag {
// 	dom = {};
// 	active = false;
// 	prevSiblingPos = null;
// 	nextSiblingPos = null;
// 	constructor(container, target) {
// 		this.dom.container = container;
// 		this.dom.target = target;
// 		this.selectSiblings();
// 		this.createSpacers();
// 		this.initTriggers();
// 	}
// 	selectSiblings() {
// 		this.dom.prevSibling = this.dom.container.previousElementSibling;
// 		this.dom.nextSibling = this.dom.container.nextElementSibling;
// 	}
// 	createSpacers() {
// 		this.prevSiblingSpacer = new Spacer(this.dom.prevSibling);
// 		this.nextSiblingSpacer = new Spacer(this.dom.nextSibling);
// 	}
// 	initTriggers() {
// 		ScrollTrigger.create({
// 			trigger: this.dom.container,
// 			start: "top bottom",
// 			end: "bottom top",
// 			onToggle: (self) => {
// 				if (self.isActive) {
// 					this.dom.prevSibling.classList.add("top-sticky-sibling");
// 					this.dom.target.prepend(this.prevSiblingSpacer.replace());
// 					this.dom.nextSibling.classList.add("bottom-sticky-sibling");
// 					this.dom.target.append(this.nextSiblingSpacer.replace());
// 				} else {
// 					this.dom.prevSibling.classList.remove("top-sticky-sibling");
// 					this.prevSiblingSpacer.restore();
// 					this.dom.nextSibling.classList.remove("bottom-sticky-sibling");
// 					this.nextSiblingSpacer.restore();
// 				}
// 			}
// 		});
// 	}
// }
class SingleLineScrollSlider {
	constructor(selector) {
		this.bcr = {};
		this.dom = { root: document.querySelector(selector) };
		this.dom.wrap = this.dom.root.querySelector("[data-elem=wrap]");
		this.dom.container = this.dom.root.querySelector("[data-elem=container]");
		this.dom.inner = this.dom.root.querySelector("[data-elem=inner]");
		this.dom.body = this.dom.container.querySelector("[data-elem=body]");
		this.selectSlides();
		this.updateCSSSlidesNumber();
		this.execResizeObserver();
		
		this.onResize();
	}
	execResizeObserver() {
		window.app.resizeObserver.on("resize", () => this.onResize());
	}
	onResize() {
		this.updateBcrs();
		this.updateCSSContainerWidth();
		this.pullStickyTop();
		this.rebuildAnimation();
	}
	rebuildAnimation() {
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.scrollTrigger = ScrollTrigger.create({
				trigger: this.dom.root,
				start: () => `top-=${(window.innerHeight - this.dom.wrap.offsetHeight) / 2}px top`,
				end: () => `bottom+=${(window.innerHeight - this.dom.wrap.offsetHeight) / 2}px bottom`,
				pin: this.dom.wrap,
			});
			ScrollTrigger.create({
				trigger: this.dom.root,
				start: () => window.innerWidth > 1024 ? `top-=${window.innerHeight * 0.2}px top` : `top+=10% bottom`,
				end: window.innerWidth > 1024 ? `bottom+=${window.innerHeight * 0.1}px bottom` : `bottom-=10% top`,
				scrub: 1,
				onUpdate: (self) => this.dom.root.style.setProperty("--progress", self.progress)
			});
		});
	}
	// Call on dom change
	selectSlides() {
		this.slides = this.dom.body.querySelectorAll("[data-elem=body] > *");
	}
	updateBcrs() {
		this.bcr.root = this.dom.root.getBoundingClientRect();
		this.bcr.wrap = this.dom.wrap.getBoundingClientRect();
		this.bcr.container = this.dom.container.getBoundingClientRect();
	}
	updateCSSSlidesNumber() {
		this.dom.root.style.setProperty("--slides-number", this.slides.length);
	}
	updateCSSContainerWidth() {
		this.dom.root.style.setProperty("--container-width", `${this.bcr.container.width}px`);
	}
	pullStickyTop() {
		const styles = getComputedStyle(this.dom.wrap);
		this.stickyTop = Number(styles.getPropertyValue("--sticky-top").slice(0, -2));
	}
}
class TwoLinesScrollSlider {
	scalingInterval = null;
	firstStepProgress = 0;
	firstStepAnimationProgress = 0;
	constructor(selector) {
		this.bcr = {};
		this.dom = { root: document.querySelector(selector) };
		this.dom.wrap = this.dom.root.querySelector("[data-elem=wrap]");
		this.dom.container = this.dom.root.querySelector("[data-elem=container]");
		this.dom.body = this.dom.container.querySelector("[data-elem=body]");
		this.selectSlides();
		this.onResize();
		this.execResizeObserver();
	}
	rebuildAnimation() {
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			this.timeline = gsap.timeline({
				scrollTrigger: {
					start: () => window.innerWidth > 1024 ? `top top` : `top-=${window.innerHeight * 0.2} top`,
					end: `bottom-=${window.innerHeight * 0.3}px top`,
					trigger: this.dom.root,
					scrub: 0.6,
				}
			});
			this.timeline.from(this.getSecondSlide(),
				{
					translateY: () => `-${(this.getInitialSlideWidth() * 0.6 + 80)}px`,
					scale: () => this.getSecondSlideInitScale(),
					duration: 3,
				});
			this.timeline.to(this.slides.slice(0, Math.ceil(this.slides.length / 2)),
				{
					translateX: "40%",
					duration: 7,
				},
				3
			);
			this.timeline.to(this.slides.slice(Math.ceil(this.slides.length / 2)),
				{
					translateX: "-40%",
					duration: 7,
				},
				3
			);
		});
	}
	execResizeObserver() {
		window.app.resizeObserver.on("resize", () => this.onResize());
	}
	onResize() {
		this.updateBcrs();
		this.updateCSSContainerWidth();
		this.updateSecondSlideInitScale();
		this.pullStickyTop();
		this.rebuildAnimation();
	}
	pullStickyTop() {
		const styles = getComputedStyle(this.dom.wrap);
		this.stickyTop = Number(styles.getPropertyValue("top").slice(0, -2));
	}
	getSecondSlide() {
		return this.slides[1];
	}
	selectSlides() {
		this.slides = Array.from(this.dom.body.querySelectorAll("[data-elem=body] > *"));
	}
	updateBcrs() {
		this.bcr.root = this.dom.root.getBoundingClientRect();
		this.bcr.wrap = this.dom.wrap.getBoundingClientRect();
		this.bcr.container = this.dom.container.getBoundingClientRect();
		//this.bcr.nextSibling = this.dom.nextSibling.getBoundingClientRect();
	}
	getInitialSlideWidth() {
		const style = getComputedStyle(this.dom.root);
		return Number(style.getPropertyValue("--slide-width").slice(0, -2));
	}
	updateCSSContainerWidth() {
		this.dom.root.style.setProperty("--container-width", `${this.bcr.container.width}px`);
	}
	getSecondSlideInitScale() {
		return window.innerWidth / this.getInitialSlideWidth();
	}
	updateSecondSlideInitScale() {
		//gsap.set(this.getSecondSlide(), { scale: this.getSecondSlideInitScale() });
	}
}
class DetailsToggleBtn {
	state = false;
	constructor() {
		this.dom = { root: document.querySelector("#details-open-close-btn") };
		this.dom.inner = this.dom.root.querySelector(".open-close-btn__inner");
		this.createHideTween();
		this.createShowTween();
	}
	createHideTween() {
		this.hideTween = gsap.fromTo(this.dom.inner, {
			translateY: "0",
		}, {
			translateY: "-100%",
			ease: "back.inOut(2)",
			duration: 0.4
		});
		this.hideTween.then(() => this.state = "hidden");
	}
	createShowTween() {
		this.showTween = gsap.fromTo(this.dom.inner, {
				translateY: "-100%",
			},
			{
				translateY: "0",
				ease: "power1.out",
				duration: 0.4
			});
		this.showTween.then(() => this.state = "showed");
	}
	hide(delay = 0) {
		if (this.showDelayTimer) clearTimeout(this.showDelayTimer);
		this.hideDelayTimer = setTimeout(() => {
			if (["hidding", "hidden"].includes(this.state)) return;
			this.hideDelayTimer = null;
			this.state = "hidding";
			this.showTween.pause();
			this.hideTween.restart();
		}, delay);
	}
	show(delay = 0) {
		if (this.hideDelayTimer) clearTimeout(this.hideDelayTimer);
		this.showDelayTimer = setTimeout(() => {
			if (!["hidding", "hidden"].includes(this.state) || this.state === "showing") return;
			this.showDelayTimer = null;
			this.hideTween.pause();
			this.state = "showing";
			this.showTween.restart();
		}, delay);
	}
}

class Details {
	currentSection = null;
	lastScrollDirection = null;
	navIsHidden = false;
	@observable accessor drawerIsOpen;
	@observable accessor lastWindowScrollDirection;
	@observable accessor lastScrollDirection;
	@observable accessor hiddenOnRefClick;
	@observable accessor mediaMathes;
	constructor(moreWorks) {
		this.moreWorks = moreWorks;
		this.init();
	}
	init() {
		this.toggleBtn = new DetailsToggleBtn();
		this.selectDomElems();
		this.buildSectionsMap();
		this.initMediaMatch();
		this.initSectionTriggers();
		this.initAnimations();
		this.initHideOnRefClick();
		this.initScrollTriggers();
		this.drawer = window.app.drawers.get("work-details");
		this.drawer.on("open", () => this.markDrawerIsOpen(true));
		this.drawer.on("close", () => this.markDrawerIsOpen(false));
		
		setTimeout(() => this.initRelatedLogic(), 0);
	}
	@action
	markDrawerIsOpen(next) {
		this.drawerIsOpen = next;
	}
	@action
	setLastWindowScrollDirection(next) {
		this.lastWindowScrollDirection = next;
	}
	@action
	setLastScrollDirection(next) {
		this.lastScrollDirection = next;
	}
	@action
	setHiddenOnRefClick(next) {
		this.hiddenOnRefClick = next;
	}
	@action
	setMediaMatches(next) {
		this.mediaMathes = next;
	}
	initMediaMatch() {
		this.mediaMatch = matchMedia("(max-width: 1024px)");
		this.mediaMatch.addListener(({ matches }) => this.setMediaMatches(matches));
		this.setMediaMatches(this.mediaMatch.matches);
	}
	initRelatedLogic() {
		autorun(() => {
			if (["open", "opening"].includes(window.submenu.panelState)) return this.hideToggleBtn();
			if (!this.drawerIsOpen && (window.footer.visible || this.moreWorks.inView)) return this.hideToggleBtn();
			if (!this.drawerIsOpen && this.lastWindowScrollDirection === "down") return this.hideToggleBtn();
			this.showToggleBtn();
		});
		autorun(() => {
			if (!this.drawerIsOpen) return;
			if (this.mediaMathes && this.lastScrollDirection === "down" || this.hiddenOnRefClick) return this.hideAllNav();
			this.showAllNav();
		});
	}
	selectDomElems() {
		this.dom = { root: document.querySelector(`[data-drawer="work-details"]`) };
		this.dom.toggleBtn = document.querySelector("#details-open-close-btn");
		this.dom.anchors = Array.from(this.dom.root.querySelectorAll(".work-details-content-section__anchor"));
		this.dom.navRefs = Array.from(this.dom.root.querySelectorAll(".article-nav-ref"));
		this.dom.panel = this.dom.root.querySelector(`[data-elem="drawer.panel"]`);
		this.dom.content = this.dom.root.querySelector(".work-details__content");
	}
	hideToggleBtn() {
		this.toggleBtn.hide(0);
	}
	showToggleBtn() {
		this.toggleBtn.show(400);
	}
	initScrollTriggers() {
		ScrollTrigger.observe({
			target: "#detail-panel",
			type: "scroll",
			onUp: () => this.setLastScrollDirection("up"),
			onDown: () => {
				this.setLastScrollDirection("down");
				this.setHiddenOnRefClick(false);
			},
		});
		ScrollTrigger.observe({
			target: "#detail-panel",
			type: "wheel, touch, pointer",
			onUp: () => this.setHiddenOnRefClick(false),
		});
		ScrollTrigger.observe({
			target: window,
			type: "scroll",
			onUp: () => this.setLastWindowScrollDirection("up"),
			onDown: () => this.setLastWindowScrollDirection("down")
		});
	}
	buildSectionsMap() {
		this.sectionsMap = {};
		this.dom.anchors.forEach(elem => {
			this.sectionsMap[elem.getAttribute("id")] = elem.closest(".work-details-content-section");
		});
	}
	initSectionTriggers() {
		const resizeObserver = new ResizeObserver(throttle(() => this.recalcCurrentSection(), 25));
		this.dom.panel.addEventListener("scroll", throttle(() => this.recalcCurrentSection(), 25));
		resizeObserver.observe(this.dom.content);
	}
	initHideOnRefClick() {
		this.dom.panel.addEventListener("click", ({ target }) => {
			if (!this.mediaMatch.matches) return;
			if (!target.matches(".article-nav-ref, .article-nav-ref *")) return;
			this.setHiddenOnRefClick(true);
		});
	}
	recalcCurrentSection() {
		const currentSection = this.dom.anchors.find(anchorElem => {
			const sectionId = anchorElem.getAttribute("id");
			const anchorBcr = anchorElem.getBoundingClientRect();
			const sectionElem = this.sectionsMap[sectionId];
			const sectionBcr = sectionElem.getBoundingClientRect();
			const anchorTop = sectionBcr.top - anchorBcr.top;
			return anchorBcr.top <= anchorTop && sectionBcr.bottom >= anchorTop;
		});
		if (currentSection !== this.currentSection) {
			if (this.currentSection instanceof Element) {
				this.setNavRefInactive(this.currentSection.getAttribute("id"));
			}
			this.currentSection = currentSection;
			if (this.currentSection instanceof Element) {
				this.setNavRefActive(this.currentSection.getAttribute("id"));
			}
		}
	}
	getNavRef(id) {
		return this.dom.navRefs.find(elem => elem.matches(`[href="#${id}"]`));
	}
	setNavRefActive(id) {
		const target = this.getNavRef(id);
		if (!target) return;
		target.classList.add("active");
	}
	setNavRefInactive(id) {
		const target = this.getNavRef(id);
		if (!target) return;
		target.classList.remove("active");
	}
	hideAllNav() {
		if (this.navIsHidden) return;
		this.showTimeline.pause();
		this.hideTimeline.restart();
		this.navIsHidden = true;
	}
	showAllNav() {
		if (!this.navIsHidden) return;
		this.hideTimeline.pause();
		this.showTimeline.restart();
		this.navIsHidden = false;
	}
	initAnimations() {
		this.createShowTimeline();
		this.createHideTimeline();
	}
	createHideTimeline() {
		const navTween = gsap.fromTo("#article-nav .article-nav__body", {
			translateY: "0",
		}, {
			translateY: "-100%",
			ease: "back.inOut(2)",
			duration: 0.4
		});
		const bgTween = gsap.fromTo("#article-nav", {
				"--bg-opacity": 0.98,
			}, {
				duration: 0.2,
				"--bg-opacity": 0,
		});
		const timeline = gsap.timeline();
		timeline.pause();
		timeline.add(() => this.toggleBtn.hide(), 0);
		timeline.add(navTween, 0.2);
		timeline.add(bgTween, 0.4);
		this.hideTimeline = timeline;
	}
	createShowTimeline() {
		const navTween = gsap.fromTo("#article-nav .article-nav__body", {
			translateY: "-100%",
		}, {
			translateY: "0",
			ease: "back.out(1)",
			duration: 0.4
		});
		const bgTween = gsap.fromTo("#article-nav", {
				"--bg-opacity": 0,
			}, {
				duration: 0.2,
				"--bg-opacity": 0.98,
		});
		const timeline = gsap.timeline();
		timeline.pause();
		timeline.add(bgTween, 0);
		timeline.add(() => this.toggleBtn.show(), 0.2);
		timeline.add(navTween, 0.4);
		this.showTimeline = timeline;
	}
}