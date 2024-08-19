import "../../shared/scripts/array-at-polyfill.js";
import { error } from "../../shared/scripts/logger.js";
import { lock, unlock } from 'tua-body-scroll-lock';
import { isMobile, getTargetElem, delay, detectPointerEvents } from "../../shared/scripts/utils.js";
import initDisclosures from "../../shared/components/disclosure.js";
import initRangeInputs from "../../shared/components/range-input.js";
import { initCountUps } from "../../shared/components/count-up-2.js";
import "./logo.js";
import { Header } from "../../shared/components/header-controller.js";
import initTextareaAutoheight from "../../shared/scripts/textareaAutoheight.js";
import { Cursor } from "../../shared/components/cursor.js";
import EventEmitter from "../../shared/scripts/patterns/EventEmitter.js";
import { CtaWidget } from "../../shared/components/cta-widget.js";
import { GoUpWidget } from "../../shared/components/go-up-widget.js";
import { initMasks } from "../../shared/components/forms.js";
import { initSlidingTexts } from "../../shared/components/sliding-text.js";
import throttle from "lodash.throttle";
import "../../shared/scripts/elemModules.js";
import Lenis from '@studio-freight/lenis';
import initWorkVideos from "../../shared/components/work-video.js";
import initFileInputs from "../../shared/components/file-input.js";
import { RequestForm } from "../../shared/components/forms.js";
import initAnimatedSeparators from "../../shared/components/animated-separator.js";
import { initDateInputWraps } from "../../shared/components/date-input.js";
import { initIntersectionTracking } from "../../shared/components/intersection-tracker.js";
import { init as initInveractiveVideoSections } from "../../shared/components/interactive-video-section.js";
import { init as initAnimatedLinks } from "../../shared/components/animated-link.js";
import { WindowResizeObserver } from "../../shared/components/window-resize-observer.js";
import "../../shared/components/ref-to-clipboard.js";
import { init as initInViewTextReveal } from "../../shared/components/text-reveal.js";
import Toasts from "../../shared/components/toasts.js";
import "../../shared/components/ai-chat.js";
import debounce from "lodash.debounce";

const { observable, flow, action, autorun, reaction, runInAction } = window.mobx;

class State {
	@observable accessor lightMode = !isFullMode();
	@observable accessor landscape = false;
	isMobile = Boolean(isMobile.any());
	isIOS = Boolean(isMobile.iOS());
	pointerType = detectPointerEvents.hasApi ? "pointer" : "mouse";
	constructor() {
		this.trackLandscape();
	}
	trackLandscape() {
		const handler = ({ matches }) =>  runInAction(() => this.landscape = matches);
		const mediaMatch = matchMedia("(orientation: landscape)");
		mediaMatch.addEventListener("change", handler);
		handler(mediaMatch);
	}
}
window.app = (window.app || {});
window.app.state = new State();

gsap.registerPlugin(ScrollTrigger, CustomEase, Observer, PhysicsPropsPlugin, ScrollToPlugin);
gsap.registerEffect({
	name: "svgStarAnimation",
	effect: (targets, config) => {
		return gsap.to(targets[0], {
			duration: config.duration,
			transformOrigin: "center center",
			physicsProps: {
				rotation: { velocity: 360 * 4, acceleration: -360 * 4 / config.duration },
			},
			paused: true,
			onStart: () => {
				const fill = targets[0].querySelector(`.animated-star__fill`);
				if (config.resetFill) {
					gsap.set(fill, { r: 0 });
				}
				gsap.to(fill, { r: 210, duration: config.duration });
			}
		});
	},
	defaults: { duration: 1.5 }
});
gsap.registerEffect({
	name: "svgCubicLightningAnimation",
	effect: (targets, { duration, yoyo, repeat }) => {
		var tl = gsap.timeline({ yoyo, repeat, paused: true });
		tl.to(targets.reduce((acc, elem) => acc.concat(elem.querySelectorAll(".animated-cubic-lightning__top")), []), {	
			y: `-40`,
			transformOrigin: "center center",
			ease: "power1.inOut",
			duration: duration / 4 * 3,
		});
		tl.to(targets.reduce((acc, elem) => acc.concat(elem.querySelectorAll(".animated-cubic-lightning__bottom")), []), {	
			y: `-30`,
			transformOrigin: "center center",
			ease: "power1.inOut",
			duration: duration / 4 * 3,
		}, duration / 4);
		return tl;
	},
	defaults: { duration: 0.4 }
});
gsap.registerEffect({
	name: "svgCubicLightningApears",
	effect: (targets, { duration }) => {
		var tl = gsap.timeline({ paused: true });
		tl.fromTo(targets.reduce((acc, elem) => acc.concat(elem.querySelectorAll(".animated-cubic-lightning__bottom")), []), 
			{ y: `30` }, {	
			y: `0`,
			transformOrigin: "center center",
			ease: "power1.inOut",
			duration: duration / 4 * 3,
		}, duration / 4);
		tl.fromTo(targets.reduce((acc, elem) => acc.concat(elem.querySelectorAll(".animated-cubic-lightning__top")), []),
			{ y: `40` }, {	
				y: `0`,
				transformOrigin: "center center",
				ease: "power1.inOut",
				duration: duration / 4 * 3,
			});
		return tl;
	},
	defaults: { duration: 0.4 }
});
gsap.registerEffect({
	name: "svgLightningAnimation",
	effect: (targets, _) => {
		const tl = gsap.timeline({ paused: true });
		const p1 = targets[0].querySelector(".animated-lightning__p1");
		const p2 = targets[0].querySelector(".animated-lightning__p2");
		tl.to(p1, {
			translateY: "105%",
			duration: 0.4,
			ease: "power3.in",
		});
		tl.to(p2, {
			translateY: "105%",
			duration: 0.4,
			ease: "power3.out",
		});
		tl.to(p2, {
			translateY: "0",
			duration: 0.4,
			ease: "power3.in",
			onStart: () => gsap.set(p2, { "--color": "#0000FF" }),
		}, 0.8);
		tl.to(p1, {
			translateY: "0",
			duration: 0.4,
			ease: "power3.out",
			onStart: () => gsap.set(p1, { "--color": "#0000FF" }),
		}, 1.2);
		return tl;
	}
});
gsap.registerEffect({
	name: "reveal",
	effect: (targets, { offset, duration, paused }) => {
		return gsap.fromTo(targets,
			{ scaleY: 1.2, translateY: offset },
			{ scaleY: 1, translateY: "0%", duration, paused }
		);
	},
	defaults: { duration: 0.4, offset: "160%", paused: false }
});

document.addEventListener("DOMContentLoaded", init);

class ChangingWords extends EventEmitter {
	currentIdx = null;
	prevIdx = null;
	nextIdx = null;
	constructor(target) {
		super();
		this.dom = { root: getTargetElem(target) };
		if (!this.dom.root) return undefined;
		this.dom.words = Array.from(this.dom.root.querySelectorAll(".changing-words > *"));
		this.to(0);
		this.run();
	}
	run() {
		requestAnimationFrame((time) => {
			if (this.lastCallTs && time - this.lastCallTs < 2000) return this.run();
			this.lastCallTs = time;
			this.next();
			this.run();
		});
	}
	next() {
		this.emit("next", this);
		const next = this.currentIdx + 1;
		this.to(next < this.dom.words.length ? next : 0);
	}
	to(idx) {
		const lastIdx = this.dom.words.length - 1;
		if (this.prevIdx !== null) this.dom.words.at(this.prevIdx).removeAttribute("data-pos");
		this.currentIdx = Math.max(Math.min(idx, lastIdx), 0);
		this.prevIdx = this.currentIdx - 1;
		this.nextIdx = this.currentIdx < lastIdx ? this.currentIdx + 1 : 0;
		const prev = this.dom.words.at(this.prevIdx);
		const current = this.dom.words.at(this.currentIdx);
		const next = this.dom.words.at(this.currentIdx);
		prev.setAttribute("data-pos", "prev");
		current.setAttribute("data-pos", "current");
		gsap.fromTo(prev,
			{
				transform: "translateY(0)",
			},
			{
				transform: "translateY(-0.9em)",
				duration: 1,
				stagger: function (index, target, list) {
					// your custom logic here. Return the delay from the start (not between each)
					return index * 0.01 + 0.01 * (index ** 2 / 2 - 1);
				},
				ease: CustomEase.create("custom", "M0,0 C0.087,0.015 0.119,-0.015 0.25,0.043 0.449,0.132 0.422,0.849 0.682,0.959 0.752,0.988 0.877,1 1,1 "),
			}
		);
		gsap.fromTo(current,
			{
				transform: "translateY(0.9em)",
			},
			{
				transform: "translateY(0)",
				duration: 1,
				stagger: function (index, target, list) {
					// your custom logic here. Return the delay from the start (not between each)
					return index * 0.01 + 0.01 * (index ** 2 / 2 - 1);
				},
				ease: CustomEase.create("custom", "M0,0 C0.087,0.015 0.119,-0.015 0.25,0.043 0.449,0.132 0.422,0.849 0.682,0.959 0.752,0.988 0.877,1 1,1 "),
			}
		);
		// if (this.dom.words.at(this.prevIdx).getAttribute("data-pos") !== "current") {
		// 	this.dom.words.at(this.prevIdx).setAttribute("data-pos", "current");
		// }
		// this.dom.words.at(this.prevIdx).setAttribute("data-pos", "prev");
		// if (this.dom.words[this.currentIdx].getAttribute("data-pos") !== "next") {
		// 	this.dom.words[this.currentIdx].setAttribute("data-pos", "next");
		// }
		// this.dom.words[this.currentIdx].setAttribute("data-pos", "current");
		// this.dom.words[this.nextIdx].setAttribute("data-pos", "next");
	}
}

function initLenis() {
	window.lenis = new Lenis();

	function raf(time) {
		window.lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
}

function init() {
	window.app.toasts = new Toasts(document.querySelector("#toasts"));
	initFieldWraps();
	initTitleChanger();
	initAnimatedLinks();
	window.app.resizeObserver = new WindowResizeObserver();
	document.documentElement.classList.add("content-is-loaded");
	initLenis();
	window.app.drawers.init({
		closeOnOutsideClick: {
			checkTarget: (target) => !target.matches("header, header *")
		},
		modal: false,
		closeAnimationDuration: 400,
	});
	initLightVersionDrawer();
	window.app.drawers.on(null, "open", ({ drawer }) =>  drawer.dom.root.classList.add("transition"));
	window.app.drawers.on(null, "closeAnimationEnd", ({ drawer }) => drawer.dom.root.classList.remove("transition"));
	window.app.drawers.get("burger-menu")?.setOptions({ modal: false });
	window.app.drawers.get("cookies-agreement").setOptions({ closeOnOutsideClick: false });
	window.app.drawers.get("request")?.setOptions({ modal: true });
	window.app.drawers.get("ai-chat").setOptions({
		modal: false,
		closeOnOutsideClick: false,
		lockPageScroll: false,
	});
	initCountUps();
	initWindowInnerHeightStyleSetter();
	document.documentElement.classList.toggle("is-ios", app.state.isIOS);
	document.documentElement.classList.toggle("is-mobile", app.state.isMobile);
	document.documentElement.classList.toggle("ua-mac", navigator.userAgent.includes("Macintosh"));
	initThemes();
	initDateInputWraps();
	initSelectionColorChange();
	initTextareaAutoheight();
	initDisclosures();
	initSlidingTexts();
	initRangeInputs();
	initFileInputs();
	initAnimatedSeparators();
	
	if (document.querySelector("header")) {
		window.submenu = new Submenu("#header-submenu");
		window.pageHeader = new Header();
	}
	if (document.querySelector("#cta-widget")) {
		window.ctaWidget = new CtaWidget();
	}
	if (document.querySelector("#go-up")) {
		window.goUpWidget = new GoUpWidget();
	}
	if (document.querySelector("footer")) {
		window.footer = new Footer();
	}
	if (!document.querySelector("body.version-select-page")) {
		window.cookiesAgreementPanel = new CookiesAgreementPanel();
	}
	window.app.drawers.on(null, "close", () => window.pageHeader.preventNextHide());
	initWorkVideos();
	initFancybox();
	initMasks();
	initScrollIndicator();
	initScrollTriggerRefresh();
	if (document.querySelector("#burger-menu")) {
		initBurgermenuAutoclose();
		initBurgermenuScrollMarker();
		new BurgermenuAnimation();
	}
	new Cursor();
	if (document.querySelector("#request-form")) {
		new RequestForm("#request-form");
		initRequestDrawer();
		loadRequestBanner();
	}
	initIntersectionTracking();
	initInveractiveVideoSections();
	initInViewTextReveal();
}
function initLightVersionDrawer() {
	const starTween = gsap.effects.svgStarAnimation(".lite-version-drawer__star", { resetFill: true });
	const revealTween = gsap.effects.reveal(".lite-version-drawer .reveal-wrap__item", { resetFill: true });
	const drawer =	window.app.drawers.get("lite-version");
	drawer.setOptions({ closeOnOutsideClick: false, modal: true });
	drawer.on("open", () => {
		revealTween.restart();
		starTween.restart();
	});
}
function initRequestDrawer() {
	const panel = document.querySelector(`[data-drawer="request"] .request-drawer__panel`);
	const hideCloseBtn = gsap.fromTo(".request-drawer__close-btn .reveal-wrap__item",
		{ translateY: "0", scaleY: 1 },
		{ translateY: "-180%", scaleY: 1, duration: 0.3 , ease: "power.inOut", paused: true });
	Observer.create({
		target: panel,
		type: "scroll",
		onUp: () => hideCloseBtn.reverse(),
		onDown: () => panel.scrollTop > 0 && hideCloseBtn.play(),
	})
}
function loadRequestBanner() {
	document.documentElement.querySelector(".request-drawer__banner img")?.setAttribute("loading", "eager");
}
function initScrollTriggerRefresh() {
	let lastHeight = null;
	const target = document.querySelector("body");
	// Refresh all ScrollTriggers on body size change
	new ResizeObserver(throttle(() => {
		if (Math.abs(lastHeight - target.offsetHeight) > window.innerHeight * 0.2) ScrollTrigger.refresh();
		lastHeight = target.offsetHeight;
	}, 25, { leading: false })).observe(target);
}
function initWindowInnerHeightStyleSetter() {
	const set = () => {
		const rootElem = document.documentElement;
		document.documentElement.style.setProperty("--html-client-width", `${rootElem.clientWidth}px`);
		document.documentElement.style.setProperty("--window-inner-height", `${window.innerHeight}px`);
		document.documentElement.style.setProperty("--window-inner-width", `${window.innerWidth}px`);
	}
	window.addEventListener("resize", set);
	set();
}
function initThemes() {
	const storageTheme = localStorage.getItem("theme");
	const selectedTheme = ["dark", "light"].includes(storageTheme) ? storageTheme : "light";
	document.documentElement.setAttribute("data-theme", selectedTheme);
	const themeSwitchElems = document.querySelectorAll("[data-component=theme-switch]");
	if (!themeSwitchElems.length) return;
	setTheme(selectedTheme);
	initControls();

	function initControls() {
		themeSwitchElems.forEach((elem, idx) => {
			adjustClipPathId(elem, idx);
			elem.theme.checked = selectedTheme === "light";
			elem.addEventListener("change", ({ target }) => {
				setTheme(target.checked ? "light" : "dark");
			});
		});
	}
	function setTheme(theme) {
		themeSwitchElems.forEach(elem => {
			var next = theme === "light";
			if (elem.theme.checked == next) return;
			elem.theme.checked = next;
		});
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}
	function adjustClipPathId(root, idx) {
		root.querySelector("#theme-switch-moon").setAttribute("id", `theme-switch-moon-${idx}`);
		root.querySelector("circle").setAttribute("clip-path", `url(#theme-switch-moon-${idx})`);
	}
}
function initSelectionColorChange() {
	let currentIdx = 0;
	const handler = () => setColorIdx(currentIdx < 5 ? ++currentIdx : (currentIdx = 0));
	setColorIdx(currentIdx);
	if ('PointerEvent' in window) {
		document.addEventListener("pointerup", handler);
	} else {
		document.addEventListener("mouseup", handler);
	}
	function setColorIdx(idx) {
		document.documentElement.setAttribute("data-selection-color-idx", `c${idx}`);
	}
}
function shouldShowCookiesAgreement() {
	const cookiesAgreementIsShowed = localStorage.getItem("cookiesAgreementIsShowed");
	return cookiesAgreementIsShowed !== "yes";
}
function setCookiesAgreementIsShowed() {
	localStorage.setItem("cookiesAgreementIsShowed", "yes");
}
class CookiesAgreementPanel {
	@observable accessor isOpen;
	@observable accessor initialized;
	constructor() {
		this.drawer = window.window.app.drawers.get("cookies-agreement");
		this.form = document.querySelector("#cookies-approval");
		this.setOpen(this.drawer.isOpen);
		this.drawer.on("open", () => this.setOpen(true));
		this.drawer.on("close", () => {
			this.setOpen(false);
			setCookiesAgreementIsShowed();
		});
		if (shouldShowCookiesAgreement()) {
			this.drawer.open();
		}
		this.form.addEventListener("change", (e) => this.onChange(e));
		this.setInitialized(true);
	}
	@action
	setOpen(next) {
		this.isOpen = next;
	}
	@action
	setInitialized(next) {
		this.initialized = next;
	}
	onChange() {
		if (this.form["necessary"].checked && this.form["functionality"].checked && this.form["analytics"].checked) {
			this.drawer.close();
		}
	}
}
class Submenu {
	static bindEventHandlers(target, {
		onMouseEnter,
		onMouseLeave,
		onClick
	}) {
		if (onMouseEnter) target.addEventListener("mouseenter", onMouseEnter);
		if (onMouseLeave) target.addEventListener("mouseleave", onMouseLeave);
		if (onClick) target.addEventListener("click", onClick);
	}
	static getRefAlias(elem) {
		const attr = elem.getAttribute("data-submenu-elem");
		const match = attr.match(/(?:(?:body->)|(?:ref->))(.+)/);
		return match ? match[1] : null;
	}
	@observable accessor panelState = "closed";
	@observable accessor hovered = false;
	@observable accessor openedOn;
	@observable accessor closedOn;
	@observable accessor activeSubmenu;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		if (!this.dom.root) return undefined;
		this.id = this.dom.root.getAttribute("id");
		this.dom.refs = Array.from(document.querySelectorAll(`[data-submenu-elem^="${this.id}<-ref"]`));
		this.dom.sections = Array.from(document.querySelectorAll("[data-submenu-elem*=body]"));

		this.createSectionsMap();
		this.createRefsMap();
		this.bindRefHandlers();

		this.bindSubmenuHandlers();
		
		// outside click
		document.addEventListener("click", ({ target }) => {
			if (!["open", "opening"].includes(this.panelState)) return;
			if (target.matches("[data-submenu-elem], [data-submenu-elem] *")) return;
			this.close("outside-click");
		});

		reaction(() => this.panelState, (currentState, prevState) => {
			this.dom.root.classList.remove(prevState);
			this.dom.root.classList.add(currentState);
		});
	}
	createRefsMap() {
		this.refsMap = {};
		this.dom.refs.forEach(elem => {
			const alias = Submenu.getRefAlias(elem);
			if (!alias) return error("No valid alias provided for an reference: ", elem);
			this.refsMap[alias] = elem;
		});
	}
	createSectionsMap() {
		this.sectionsMap = {};
		this.dom.sections.forEach(elem => {
			const alias = Submenu.getRefAlias(elem);
			if (!alias) return error("No valid alias provided for an section: ", elem);
			this.sectionsMap[alias] = elem;
		});
	}
	bindRefHandlers() {
		this.dom.refs.forEach(refElem => Submenu.bindEventHandlers(refElem, {
			onMouseEnter: (event) => this.onRefMouseEnter(event),
			onMouseLeave: (event) => this.onRefMouseLeave(event),
			onClick: (event) => this.onRefClick(event)
		}));
	}
	bindSubmenuHandlers() {
		Submenu.bindEventHandlers(this.dom.root, {
			onMouseEnter: (event) => this.onMouseEnter(event),
			onMouseLeave: (event) => this.onMouseLeave(event),
		});
	}
	@flow
	* onRefMouseEnter({ currentTarget }) {
		this.hovered = true;
		if (this.closedOn === "click") return;
		yield delay(0);
		if (["open", "opening"].includes(this.panelState)) return;
		if (!this.hovered) return;
		this.open("enter");
		this.setActiveSubmenu(Submenu.getRefAlias(currentTarget));
	}
	onRefMouseLeave({ currentTarget }) {
		this.onMouseLeave();
	}
	@action
	onRefClick({ currentTarget }) {
		const refAlias = Submenu.getRefAlias(currentTarget);
		if (this.activeSubmenu === refAlias) {
			this.close("click");
		} else {
			this.setActiveSubmenu(refAlias);
			this.open("click");
		}
	}
	@action
	onMouseEnter() {
		this.hovered = true;
	}
	@flow
	* onMouseLeave() {
		this.hovered = false;
		this.closedOn = null;
		if (this.openedOn === "click") return;
		yield delay(10);
		if (!["open", "opening"].includes(this.panelState)) return;
		if (!this.hovered) this.close("leave");
	}
	@flow
	* open(reason) {
		if (["open", "opening"].includes(this.panelState)) return;
		this.panelState = "opening";
		this.openedOn = reason;
		yield delay(600);
		if (!["open", "opening"].includes(this.panelState)) return;
		this.panelState = "open";
	}
	@flow
	* close(reason) {
		this.setActiveSubmenu(null);
		if (!["open", "opening"].includes(this.panelState)) return;
		this.panelState = "closing";
		this.closedOn = reason;
		yield delay(600);
		if (["open", "opening"].includes(this.panelState)) return;
		this.panelState = "closed";
	}
	@action
	setActiveSubmenu(alias) {
		if (this.activeSubmenu === alias) return;
		if (this.activeSubmenu) this.hideSubmenu(this.activeSubmenu);
		if (alias) this.showSubmenu(alias);
		this.activeSubmenu = alias;
	}
	showSubmenu(alias) {
		if (alias in this.sectionsMap) {
			this.sectionsMap[alias].classList.add("active");
		} else {
			error("No submenu section has been found in the map by retrived alias: ", alias);
		}
		if (alias in this.refsMap) {
			this.refsMap[alias].classList.add("active");
		} else {
			error("No submenu reference has been found in the map by retrived alias: ", alias);
		}
	}
	hideSubmenu(alias) {
		if (alias in this.sectionsMap) {
			this.sectionsMap[alias].classList.remove("active");
		} else {
			error("No submenu section is found in the map by retrived alias: ", alias);
		}
		if (alias in this.refsMap) {
			this.refsMap[alias].classList.remove("active");
		} else {
			error("No submenu reference has been found in the map by retrived alias: ", alias);
		}
	}
}
// function getImageMimeType(ext) {
// 	switch(ext) {
// 		case "jpg":
// 		case "jpeg":
// 			return "image/jpeg";
// 		case "svg":
// 			return "image/svg+xml";
// 		default:
// 			return `image/${ext}`;
// 	}
// }
function initFancybox() {
	Object.assign($.fancybox.defaults, {
		smallBtn: false,
		toolbar: false,
		infobar: false,
		clickSlide: "close",
		clickContent: "close",
		preventCaptionOverlap: false,
		contentFit: true,
		mobile: {
			clickSlide: "close",
			clickContent: "close",
		},
		onInit: () => lock(),
		afterClose: () => {
			window.pageHeader.preventNextHide();
			unlock();
		},
		media: {
			vimeo: {
				params: {
					muted: 1,
					background: 1,
				}
			}
		}
	})
	// $("[data-fancybox]").fancybox({
	// 	autoSize: false,
	// 	content: (_ref, slide) => {
	// 		let rez = "<picture>";

	// 		const media = slide.media.split(";");

	// 		slide.sources.split(";").map((source, index) => {
	// 			rez += `<source
	// 				type=${getImageMimeType(source.slice(source.lastIndexOf(".") + 1))}
	// 				media="${media[index] || ""}"
	// 				srcset="${source}"
	// 			/>`;
	// 		});

	// 		rez += `<img src="${slide.src}" alt="" />`;

	// 		rez += "</picture>";

	// 		return rez;
	// 	},
	// });
}
function initBurgermenuAutoclose() {
	const mediaMatch = matchMedia("(max-width: 1240px)");
	const handler = ({matches}) => {
		if (!matches) window.app.drawers.close("burger-menu");
	}
	mediaMatch.addListener(handler);
	handler(mediaMatch);
}
function initBurgermenuScrollMarker() {
	window.pageHeader.addTrigger(".burger-menu__panel");
}
class BurgerSubmenuAnimation {
	@observable accessor isOpen;
	constructor(target, owner) {
		this.owner = owner;
		this.tween = gsap.fromTo(`.header-link_sub-menu .reveal-wrap__inner > *`, {
			scaleY: 1.2,
			translateY: "1.8em"
		}, {
			scaleY: 1,
			translateY: "0em",
			duration: 0.4,
		});
		this.elem = target;
		if (this.elem.closest(`.disclosure.open`)) setOpen(true);
		this.elem.addEventListener("disclosure.open", async () => {
			this.setOpen(true);
		});
		this.elem.addEventListener("disclosure.close", () => {
			this.setOpen(false);
		});

		autorun(async () => {
			if (this.isOpen && this.owner.isOpen) {
				await delay(300);
				if (this.isOpen && this.owner.isOpen) this.show();
			} else {
				this.hide();
			}
		});
	}
	show() {
		this.tween.timeScale(1);
		this.tween.play();
	}
	hide() {
		this.tween.timeScale(2);
		this.tween.reverse();
	}
	@action
	setOpen(next) {
		this.isOpen = next;
	}
}
class BurgermenuAnimation {
	@observable accessor isOpen;
	drawer = window.window.app.drawers.get("burger-menu");
	constructor() {
		this.openTl = gsap.timeline({
			paused: true
		});
		this.openTl.fromTo("#burger-menu .burger-menu__panel", {
			translateY: "0%"
		}, {
			translateY: "100%",
			duration: 0.4
		});
	
		this.openTl.fromTo("#burger-menu .header-link:not(.header-link_sub-menu) .reveal-wrap__inner > *", {
			scaleY: 1.2,
			translateY: "1.8em"
		}, {
			scaleY: 1,
			translateY: "0em",
			duration: 0.4,
		});
		this.openTl.fromTo(`#burger-menu .burger-menu__header, .burger-menu__nav-section`, {
			"--decor-width": "0vw",
		}, {
			"--decor-width": "100vw",
			stagger: 0.08,
			duration: 0.3,
		}, 0.4);
		this.openTl.fromTo(`[name="burger-theme-switch"]`, {
			opacity: 0
		}, {
			opacity: 1,
			duration: 0.4
		}, 0.4);

		this.drawer.on("open", () => this.open());
		this.drawer.on("close", () => this.close());

		document.querySelectorAll(`.burger-menu .disclosure`).forEach(submenuElem => {
			new BurgerSubmenuAnimation(submenuElem, this);

		});
	}
	@action
	setOpen(next) {
		this.isOpen = next;
	}
	open() {
		this.setOpen(true);
		this.openTl.timeScale(1);
		this.openTl.play();
	}
	close() {
		this.setOpen(false);
		this.openTl.timeScale(2);
		this.openTl.reverse();
	}
}
class FooterLogoAnimation {
	@observable accessor completed = false;
	constructor(footer) {
		this.footer = footer;
		this.dom = {
			container: document.querySelector("#footer-sticky-container"),
			logoSection: document.querySelector("#footer-logo-section"),
		};
		window.app.resizeObserver.on("resize", () => this.onResize());
		this.rebuild();
	}
	@action setCompleted(next) {
		this.completed = next;
	}
	onResize() {
		this.rebuild();
	}
	rebuild = debounce(() => {
		this.logoAnimationCtx?.revert();
		this.logoAnimationCtx = gsap.context(() => {
			const upscaleTween = gsap.fromTo(this.dom.logoSection,
				{ scaleY: 1, transformOrigin: "bottom center" },
				{
					ease: "none",
					scaleY: this.dom.container.clientHeight / this.dom.logoSection.clientHeight,
					transformOrigin: "bottom center",
					paused: true,
				});
			const bounceTween = gsap.from(this.dom.logoSection,
				{
					ease: "bounce.out",
					duration: 0.6,
					scaleY: this.dom.container.clientHeight / this.dom.logoSection.clientHeight,
					transformOrigin: "bottom center",
					paused: true,
				});
			const mainScrollTrigger = ScrollTrigger.create({
				id: "upscale",
				animation: upscaleTween,
				trigger: "#footer-sticky-container",
				start: () => `top+=${this.dom.logoSection.clientHeight}px bottom`,
				end: "bottom+=20px bottom",
				scrub: 0,
				onUpdate: (self) =>  {
					self.progress < 1 && this.setCompleted(false)
				},
				onLeave: () => { // Animation finished;
					mainScrollTrigger.disable();
					if (!this.completed) {
						bounceTween.restart();
						gsap.set(".footer__bottom", { position: "static" });
						this.setCompleted(true);
					}
				},
			});
			// Maion scroll trigger switcher
			ScrollTrigger.create({
				trigger: "#footer-sticky-container",
				start: "top bottom",
				end: "bottom+=20px bottom",
				onLeaveBack: () => {
					mainScrollTrigger.enable();
					if (this.completed) {
						gsap.set(".footer__bottom", { position: "sticky" });
						this.setCompleted(false);
					}
				},
			});
		});
	}, 25);
}
class Footer {
	@observable accessor visible;
	constructor() {
		if (!document.querySelector("footer")) return undefined;
		this.dom = {
			mainContainer: document.querySelector("footer > .footer__container"),
			container: document.querySelector("#footer-sticky-container"),
			ctaMsg: document.querySelector(".footer__cta-msg"),
			logoSection: document.querySelector("#footer-logo-section"),
			decor: document.querySelector(".footer__decor"),
		};
		this.initGoUpButton();
		this.initCtaMsgAnimation();
		setTimeout(() => this.initEnterLeaveTrigger(), 0);
		this.logoAnimation = new FooterLogoAnimation(this);
		autorun(async () => {
			if (this.logoAnimation.completed) {
				this.dom.decor.classList.add("reveal-active");
				await delay(100);
				this.logoAnimation.completed && this.dom.ctaMsg.classList.add("reveal-active");
				await delay(400);
				this.logoAnimation.completed && this.dom.decor.classList.add("rgb-shake-active");
				await delay(900);
				this.logoAnimation.completed && this.dom.decor.classList.remove("rgb-shake-active");
			} else {
				this.dom.decor.classList.remove("reveal-active");
				this.dom.decor.classList.add("reveal-transition");
				//await delay(200);
				!this.logoAnimation.completed && this.dom.ctaMsg.classList.remove("reveal-active");
				!this.logoAnimation.completed && this.dom.ctaMsg.classList.add("reveal-transition");
			}
		});
	}
	initGoUpButton() {
		const btnElem = document.querySelector("#footer-go-up");
		btnElem?.addEventListener("click", () => window.scrollTo({
			top: 0,
			behavior: "smooth",
		}));
	}
	initCtaMsgAnimation() {
		const footerCtaMsgChangingPart = new ChangingWords("#footer-cta-msg-part");
		footerCtaMsgChangingPart.on("next", async (self) => {
			await delay(800);
			const currentWordElem = self.dom.words[self.currentIdx];
			currentWordElem.classList.add("text-rgb-shake_active");
			await delay(900);
			currentWordElem.classList.remove("text-rgb-shake_active");
		});
	}
	@action
	markVisible(next) {
		this.visible = next;
	}
	initEnterLeaveTrigger() {
		this.enterLeaveTrigger = ScrollTrigger.create({
			trigger: "footer",
			start: "top+=65px bottom",
			onEnter: () => this.markVisible(true),
			onLeaveBack: () => this.markVisible(false),
		});
		this.markVisible(this.enterLeaveTrigger.isActive);
		this.enterLeaveTrigger.update();
	}
}
function initScrollIndicator() {
	const target = document.querySelector(".scroll-indicator");
	const observer = Observer.create({
			type: "wheel,touch,scroll,pointer",
			onDown: () => {
				if (window.scrollY > 0) {
					target?.classList.add("hidden");
					observer.disable();
				}
			},
		});
}
function isFullMode() {
	return new URLSearchParams(window.location.search).has("full-mode");
}
function initTitleChanger() {
	var msg = "We miss you 😢";
	var titleElem = document.querySelector("title");
	var initial = titleElem.textContent;
	var timeoutId = null;
	window.addEventListener("focus", () => {
		clearTimeout(timeoutId);
		titleElem.textContent = initial;
	});
	window.addEventListener("blur", () => timeoutId = setTimeout(() => titleElem.textContent = msg, 1500));
}
function initFieldWraps() {
	const elems = document.querySelectorAll(`[class*=field-wrap]`);
	elems.forEach(elem => elem.addEventListener("click", ({ currentTarget }) => {
		currentTarget.querySelector("input, textarea")?.focus();
	}));
}