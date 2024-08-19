
import ZoomSlider, { ZoomSliderControl } from "./ZoomSlider.js";
import throttle from "lodash.throttle";
import CardHoverHandler from "../../../shared/components/card-hover-handler.js";
import TopCases from "../../../shared/components/top-cases.js";
gsap.registerPlugin(ScrollTrigger);
document.addEventListener("DOMContentLoaded", init);

const { autorun, observable, action } = window.mobx;

class AnimatedLogo {
	@observable accessor hidden = false;
	@observable accessor animationCompleted = false;
	constructor() {
		this.dom = { root: document.querySelector("#animated-logo-layer"), logo: document.querySelector(".hero__logo") };
		setTimeout(() => this.init(), 0);
	}
	@action
	hide(withTransition) {
		this.hidden = true;
		if (withTransition) {
			this.dom.logo.classList.add("with-transition");
		} else {
			this.dom.logo.classList.remove("with-transition");
		}
		this.dom.logo.classList.add("hidden");
	}
	@action
	show(withTransition) {
		this.hidden = false;
		if (withTransition) {
			this.dom.logo.classList.add("with-transition");
		} else {
			this.dom.logo.classList.remove("with-transition");
		}
		this.dom.logo.classList.remove("hidden");
	}
	@action
	setCompleted(next) {
		this.animationCompleted = next;
		if (next) {
			this.hide(false);
			document.documentElement.classList.add("logo-animation-completed");
		} else {
			this.show(false);
			document.documentElement.classList.remove("logo-animation-completed");
		}
	}
	init() {
		this.initHidding();
		if (!app.state.isMobile) {
			this.initIntercativity();
		}
		this.initAnimation();
	}
	initHidding() {
		let timeout = null;
		window.slider.on("interaction", () => {
			if (matchMedia("(max-width: 1024px)").matches) {
				if (timeout) {
					clearTimeout(timeout);
				} else {
					this.hide(true);
				}
				timeout = setTimeout(() => {
					timeout = null;
					this.show(true);
				}, 2000);
			}
		});
	}
	initIntercativity() {
		LinnikovLOGO.init("#animated-logo");
	}
	initAnimation() {
		window.addEventListener("resize", throttle(() => this.rebuildAnimation(), 25, { leading: false }));
		this.rebuildAnimation();
	}
	rebuildAnimation() {
		if (this.lastWidth === window.innerWidth) return;
		this.lastWidth = window.innerWidth;
		this.animationCtx?.revert();
		this.animationCtx = gsap.context(() => {
			const overlayLogoElem = document.querySelector(`.hero__logo`);
			const headerLogoElem = document.querySelector(".burger-btn-layer__logo");
			const headerLogoBcr = headerLogoElem.getBoundingClientRect();
			ScrollTrigger.create({
				trigger: `#logo-animation-spacer`,
				start: "top bottom",
				end: "top+=1px top",
				onLeave: () => this.setCompleted(true),
				onEnterBack: () => this.setCompleted(false),
			})
			gsap.fromTo(overlayLogoElem, {
				scale: (window.innerWidth < 700 ? window.innerWidth * 0.7 : 510) / gsap.getProperty(this.dom.logo, "--logo-width"),
				translateX: `0px`,
				translateY: `${window.innerHeight / 2 - headerLogoBcr.top - headerLogoBcr.height / 2}px`,
				transformOrigin: `center top`,
				width: `${gsap.getProperty(this.dom.logo, "--logo-width")}px`,
			}, {
				scrollTrigger: {
					trigger: `#logo-animation-spacer`,
					start: "top bottom",
					end: "top top",
					scrub: 1,
				},
				ease: "power1.out",
				scale: 1,
				translateY: "0px",
				translateX: () => {
					const bcr = overlayLogoElem.getBoundingClientRect();
					return `${headerLogoBcr.left + headerLogoBcr.width / 2 - (bcr.left + bcr.width / 2)}px`;
				}
			});
		});
	}
}

function init() {
	window.slider = new ZoomSlider("#cases-slider");
	const sliderControl = new ZoomSliderControl("#cases-slider-control", slider);
	setTimeout(() => {
		autorun(() => {
			if (window.cookiesAgreementPanel?.initialized && !window.cookiesAgreementPanel?.isOpen) {
				slider.play();
			}
		});
	}, 0);
	window.animatedLogo = new AnimatedLogo();
	const topCases = new TopCases("#top-cases", { onCategoryChangeScroll: { offset: -50 } });
	new CardHoverHandler({
		container: topCases.dom.body,
		targetSelector: ".case-poster",
		className: "case-poster__title"
	});
	initAboutSection();
	reflectWelcomeAnimationCompletion();
	initViewportScrollTrigger();
}
function initViewportScrollTrigger() {
	var about = document.querySelector("#about");
	var logoSpacer = document.querySelector("#logo-animation-spacer");
	var snaping = false;
	// Snapping scroll trigger, also turns on/off lenis scroll
	// var snapingTrigger = ScrollTrigger.create({
	// 	target: window,
	// 	start: -1,
	// 	end: getPageTop(about),
	// 	snap: {
	// 		delay: 0,
	// 		snapTo: 0.5,
	// 		directional: true,
	// 		inertia: false,
	// 	},

	// });
	function scrollTo(offset, stopLenis) {
		if (!window.lenis.isStopped) window.lenis.stop();
		//snapingTrigger.disable(false, false);
		snaping = gsap.to(window, {
			scrollTo: { y: Math.round(offset), autoKill: false },
			duration: 1,
			onComplete: () => { snaping = null;  window.lenis.start(); }, // snapingTrigger.enable(false);
			overwrite: true
		});
	}
	const handleUp = () => {
		const aboutTop = getPageTop(about);
		const logoSpacerTop = getPageTop(logoSpacer);
		const logoSpacerBottom = getPageBottom(logoSpacer);
		if (window.scrollY >= 0 && window.scrollY < logoSpacerTop) {
			scrollTo(window.app.state.isMobile ? aboutTop : logoSpacerTop, true);
		} else if (window.scrollY >= logoSpacerTop && window.scrollY < logoSpacerBottom) {
			scrollTo(aboutTop, true);
		}
	};
	const handleDown = () => {
		const logoSpacerTop = getPageTop(logoSpacer);
		const logoSpacerBottom = getPageBottom(logoSpacer);
		if (window.scrollY >= 0 && window.scrollY <= logoSpacerTop) {
			scrollTo(0, true);
		} else if (window.scrollY >= logoSpacerTop && window.scrollY <= logoSpacerBottom) {
			scrollTo(window.app.state.isMobile ? 0 : logoSpacerTop, false);
		}
	};
	Observer.create({
		target: window,
		type: "wheel,touch,pointer",
		wheelSpeed: -1,
		dragMinimum: 10,
		lockAxis: true,
		onUp: (self) => {
			if (snaping) return;
			const aboutTop = getPageTop(about);
			if (window.scrollY >= 0 && window.scrollY < aboutTop) {
				self.event.preventDefault();
				handleUp();
			}
		},
		onDown: (self) => {
			if (snaping) return;
			const aboutTop = getPageTop(about);
			if (window.scrollY >= 0 && window.scrollY < aboutTop) {
				self.event.preventDefault();
				handleDown();
			}
		}
	});
	function getPageTop(elem) {
		return elem.getBoundingClientRect().top + window.scrollY;
	}
	function getPageBottom(elem) {
		return elem.getBoundingClientRect().bottom + window.scrollY;
	}
	
	// async function disableScroll() {
	// 	if (scrollDisabled) return;
	// 	scrollDisabled = true;
	// 	const currentScroll = window.scrollY;
	// 	console.log("stopScroll", currentScroll);
	// 	document.documentElement.style.overflow = "hidden";
	// 	requestAnimationFrame(() => document.documentElement.style.overflow = "");
	// 	window.scrollTo({ top: currentScroll });
	// 	scrollDisabled = false;
	// }
}
function initAboutSection() {
	const rootElem = document.querySelector("#about");
	const nextSibling = rootElem.nextElementSibling;
	let currentShift = null;
	//let lastMoveTs = null;
	const updateTranslate = throttle(() => {
		const siblingBcr = nextSibling.getBoundingClientRect();
		const targetBcr = rootElem.getBoundingClientRect();
		if (siblingBcr.top <= targetBcr.height) return setTranslate(0);
		setTranslate((siblingBcr.top - targetBcr.height) / window.innerHeight * targetBcr.height);

		function setTranslate(value) {
			if (currentShift === value) return;
			currentShift = value;
			// const currentMoveTs = performance.now();
			// let transition = lastMoveTs == null ? 0 : currentMoveTs - lastMoveTs;
			// lastMoveTs = currentMoveTs;
			rootElem.style.setProperty("--translateY", `${-value}px`);
		}
	}, 20);
	const updateStickyPosition = () => {
		const targetBcr = rootElem.getBoundingClientRect();
		rootElem.style.setProperty("--sticky-bottom", `${window.innerHeight - targetBcr.height}px`);
	}
	const update = () => {
		updateStickyPosition();
		updateTranslate();
	}
	const resizeObserver = new ResizeObserver(update);
	resizeObserver.observe(rootElem);
	window.addEventListener("scroll", updateTranslate);
	window.addEventListener("resize", update);
	updateStickyPosition();
	updateTranslate();
}
async function reflectWelcomeAnimationCompletion() {
	const root = document.querySelector(`#about`);
	const slidingTextElem = root.querySelector(`[data-component="sliding-text"]`);
	const slidingText = await slidingTextElem.useModule("slidingText");
	autorun(() => {
		if (slidingText.completed) {
			root.classList.add("animation_completed");
			document.documentElement.classList.add("welcome-animation-completed");
		} else {
			root.classList.remove("animation_completed");
			document.documentElement.classList.remove("welcome-animation-completed");
		}
	});
}