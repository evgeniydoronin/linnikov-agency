
import {  getTargetElem } from "../../../shared/scripts/utils.js";
import CategoriesGrid from "./CategoriesGrid.js";
import throttle from "lodash.throttle";
import { RevealWrap } from "../../../shared/components/revealWrap.js";
import createDiagramAnimation from "./diagramAnimation.js";
import { FramesStack } from "../../../shared/components/frames-stack.js";
import { LevelsComposition } from "../../../shared/components/levels-composition.js";
import { FaqComposition } from "../../../shared/components/faq-composition.js";
gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", init);

function wrapPhrase(scope) {
	while(scope[0]?.textContent.trim() === "") scope.shift();
	while(scope.at(-1)?.textContent.trim() === "") scope.pop();
	if (!scope.length) return null;
	const wrap = document.createElement("div");
	wrap.classList.add("phrase");
	scope[0].replaceWith(wrap);
	wrap.append(...scope);
	return wrap;
}
class Msg02 {
	constructor(owner) {
		this.owner = owner;
		this.dom = { root: document.querySelector(`.cs-msg-02`) };
	}
	resetDomRefs() {
		this.dom.focusPhrase = null;
		this.dom.focusLine = null;
		this.dom.topScope = [];
		this.dom.bottomScope = [];
	}
	updateMarkup() {
		this.resetDomRefs();
		if (this.spliter) {
			this.spliter.revert();
			this.spliter.split();
		} else {
			this.spliter = new SplitText(this.dom.root, { type: "words, lines", wordsClass: "word", linesClass: "line" });
		}

		this.spliter.lines.forEach(line => {
			if (!this.dom.focusPhrase) {
				const focusElem = line.querySelector(".cs-msg-02__focus");
				if (focusElem) {
					this.dom.focusPhrase = focusElem;
					const childNodes = Array.from(line.childNodes);
					const focusGroupIdx = childNodes.findIndex(node => node.nodeType === Node.ELEMENT_NODE && node.matches(".cs-msg-02__focus-group"));
					const focusGroupNodes = Array.from(childNodes[focusGroupIdx].childNodes);
					this.dom.leftScope = wrapPhrase(childNodes.slice(0, focusGroupIdx));
					focusGroupNodes.splice(focusGroupNodes.indexOf(this.dom.focusPhrase), 1);
					this.dom.rightScope = wrapPhrase([...focusGroupNodes, ...childNodes.slice(focusGroupIdx + 1)]);
					this.dom.focusLine = line;
					line.querySelectorAll(".word").forEach(elem => new RevealWrap(elem));
				} else {
					new RevealWrap(line);
					this.dom.topScope.push(line);
				}
			} else {
				new RevealWrap(line);
				this.dom.bottomScope.push(line);
			}
		});
	}
	createAnimation() {
		this.tl = gsap.timeline();
		// Весь текст появляется из-за "бордюра"
		this.tl.fromTo(`.cs-msg-02 .reveal-wrap__item`,
			{ translateY: window.innerWidth >= 1250 ? `1.6em` : `1.8em`, scaleY: 1.2 },
			{ translateY: `0em`, scaleY: 1, duration: 0.1 }
		);
		// Увеличивается фокус-фраза
		this.tl.fromTo(this.dom.focusPhrase,
			{ scale: 1, translateX: 0, translateY: 0 },
			{
				scale: (_, target) => this.owner.dom.inner.offsetWidth / target.offsetWidth,
				translateX: (_, target) => {
					const selftBcr = target.getBoundingClientRect();
					const innerBcr = this.owner.dom.inner.getBoundingClientRect();
					return `${(innerBcr.left + innerBcr.width / 2 - (selftBcr.left + selftBcr.width / 2) * 1.03)}px`;
				},
				translateY: (_, target) => {
					const selftBcr = target.getBoundingClientRect();
					const frameBcr = this.owner.dom.frame01.getBoundingClientRect();
					return `${(frameBcr.top + frameBcr.height / 2 - (selftBcr.top + selftBcr.height / 2))}px`;
				},
				ease: "none",
				duration: 0.2,
			}
		);
		// Вместе с увеличением фокус-фразы улетает верхняя часть
		this.tl.fromTo(this.dom.topScope,
			{ translateY: 0 },
			{
				keyframes: [
					{ translateY: `-100vh`, ease: "none", duration: 0.25 },
					{ translateX: "-100vw", ease: "none", duration: 0.2, delay: -0.05 }
				],
			},
			0.1
		);
		// Вместе с увеличением фокус-фразы улетает левая часть
		this.tl.fromTo(this.dom.leftScope,
			{ translateX: 0 },
			{
				keyframes: [
					{
						translateX: (_, target) => {
							const selftBcr = target.getBoundingClientRect();
							const frameBcr = this.owner.dom.frame01.getBoundingClientRect();
							return `${frameBcr.left - selftBcr.right - gsap.getProperty(target, "fontSize")}px`;
						},
						ease: "none", duration: 0.2
					},
					{ translateX: `-100vw`, ease: "none", duration: 0.05 },
					{ visibility: "hidden" }
				],
			},
			0.1
		);
		// ... правая часть
		this.tl.fromTo(this.dom.rightScope,
			{ translateX: 0 },
			{
				keyframes: [
					{
						translateX: (_, target) => {
							const selftBcr = target.getBoundingClientRect();
							const frameBcr = this.owner.dom.frame01.getBoundingClientRect();
							return `${frameBcr.right - selftBcr.left + gsap.getProperty(target, "fontSize")}px`;
						},
						ease: "none", duration: 0.2
					},
					{ translateX: `100vw`, ease: "none", duration: 0.05 }
				],
			},
			0.1
		);
		return this.tl;
	}
}
class Msg06 {
	constructor(owner) {
		this.owner = owner;
		this.dom = { root: document.querySelector(`.cs-msg-06`) };
	}
	resetDomRefs() {
		this.dom.focusPhrase = null;
		this.dom.focusLine = null;
	}
	updateMarkup() {
		this.resetDomRefs();
		if (this.spliter) {
			this.spliter.revert();
			this.spliter.split();
		} else {
			this.spliter = new SplitText(this.dom.root, { type: "words, lines", wordsClass: "word", linesClass: "line" });
		}

		this.spliter.lines.forEach(line => {
			if (!this.dom.focusPhrase) {
				const focusElem = line.querySelector(".msg-focus");
				if (focusElem) {
					this.dom.focusPhrase = focusElem;
					line.querySelectorAll(".word").forEach(elem => new RevealWrap(elem));
				} else {
					new RevealWrap(line);
				}
			} else {
				new RevealWrap(line);
			}
		});
	}
	createAnimation() {
		this.tl = gsap.timeline({
			scrollTrigger: { trigger: this.dom.root, start: "bottom+=25% bottom", end: `bottom+=${window.innerHeight}px bottom`, scrub: 1 }
		});
		// Появление текста из-за бардюра
		this.tl.fromTo(this.dom.root.querySelectorAll(".reveal-wrap__item"),
			{ scaleY: 1.2, translateY: window.innerWidth > 1024 ? "1.8em" : "2.2em" },
			{ scaleY: 1, translateY: "0em", duration: 0.1 }
		);
		// 20% scale
		this.tl.fromTo(this.dom.root.querySelector(".msg-focus"),
			{ scale: 1, translateY: "0%" },
			{
				scale: () => window.innerWidth > 1024 ? 4.25 : 4.1,
				translateY: "-2.5%",
				ease: "power2.out",
				duration: 0.2,
			},
			0.09
		);
		return this.tl;
	}
}
class Msg07 {
	constructor(owner) {
		this.owner = owner;
		this.dom = { root: document.querySelector(`.cs-msg-07`) };
	}
	updateMarkup() {
		if (this.spliter) {
			this.spliter.revert();
			this.spliter.split();
		} else {
			this.spliter = new SplitText(this.dom.root, { type: "lines", linesClass: "line" });
		}
		this.spliter.lines.forEach(line => {
			new RevealWrap(line);
		});
	}
	createAnimation() {
		return gsap.fromTo(this.dom.root.querySelectorAll(".reveal-wrap__item"), {
			scaleY: 1.2,
			translateY: window.innerWidth > 1024 ? "1.8em" : "2.2em"
		}, {
			scrollTrigger: {
				trigger: this.dom.root,
				start: "bottom bottom",
				toggleActions: "play none none reverse",
			},
			scaleY: 1,
			translateY: "0em",
			duration: 0.6,
		});
	}
}

class Animation {
	constructor() {
		this.dom = { root: getTargetElem("#cs-animation") };
		this.dom.inner = this.dom.root.querySelector(`[data-elem="cs-animation.inner"]`);
		this.dom.frame01 = this.dom.root.querySelector(`[data-elem="cs-animation.frame-01"]`);
		this.dom.frame02 = this.dom.root.querySelector(`[data-elem="cs-animation.frame-02"]`);
		// First message dom
		this.dom.msg01 = this.dom.root.querySelector(`[data-elem="cs-animation.msg-01"]`);
		this.dom.msg01p1 = this.dom.root.querySelector(`[data-elem="cs-animation.msg-01"] .cs-msg-01__p1`);
		this.dom.msg01p2 = this.dom.root.querySelector(`[data-elem="cs-animation.msg-01"] .cs-msg-01__p2`);

		this.msg02 = new Msg02(this);
		this.msg06 = new Msg06(this);
		this.msg07 = new Msg07(this);

		// Second message dom
		window.addEventListener("resize", throttle(() => this.onResize(), 25, { leading: false }));
		this.resizeObserver = new ResizeObserver(throttle(() => { this.onResize(true); }, 25, { leading: false }));
		this.resizeObserver.observe(this.dom.msg01p1);
	}
	onResize(force) {
		if (!force && this.lastWidth === window.innerWidth) return;
		this.lastWidth = window.innerWidth;
		cancelAnimationFrame(this.onResizeFrame);
		this.onResizeFrame = requestAnimationFrame(() => {
			this.applyMarkupModifications();
			this.rebuildAnimations();
		});
	}
	applyMarkupModifications() {
		this.msg02.updateMarkup();
		this.msg06.updateMarkup();
		this.msg07.updateMarkup();
	}
	rebuildAnimations() {
		const self = this;
		if (this.context) this.context.revert();
		const msg01Scale = window.innerWidth >= 1650 ? 3.4 : 2.65 + (window.innerWidth - 320) / 1330 * 0.75;
		this.context = gsap.context(() => {
			this.tl = gsap.timeline({
				scrollTrigger: {
					trigger: `[data-elem="cs-animation.container"]`,
					start: `top-=${window.innerHeight * 0.2} top`,
					end: "bottom bottom",
					scrub: 1,
					//markers: true
				}
			});
			// First message animation
			// "Feeling" scale and moving out of viewport
			this.tl.fromTo(this.dom.msg01p1, {
				scale: 1,
			}, {
				keyframes: [
					{ translateY: () => `0vh`, transformOrigin: "0.105em center", scale: msg01Scale, ease: "none", duration: 0.2 },
					{ translateY: () => `-100vh`, ease: "none", duration: 0.2 }
				]
			}, 0);
			// Send whole block to center
			this.tl.to(this.dom.msg01, {
				translateY: () => {
					const frame01Bcr = this.dom.frame01.getBoundingClientRect();
					const msg01p2Bcr = this.dom.msg01p2.getBoundingClientRect();
					const msgTopOffet = msg01p2Bcr.top - frame01Bcr.top;
					return `${window.innerHeight / 2 - this.dom.msg01p2.offsetHeight / 2 - msgTopOffet}px`;
				},
				duration: 0.2,
			}, 0);
			// Move the second part along "feeling" growing
			this.tl.to(this.dom.msg01p2, {
				translateX: () => `${this.dom.msg01p1.offsetWidth * (msg01Scale - 1)}px`,
				ease: "none",
				duration: 0.2,
			}, 0);
			// Send the second part out of viewport
			this.tl.to(this.dom.msg01p2, {
				translateX: () => `${this.dom.msg01p1.offsetWidth * (msg01Scale - 1) + window.innerWidth / 2}px`,
				duration: 0.1,
			}, 0.2);
			this.tl.add(this.msg02.createAnimation(), 0.218);
			// First frame go out
			this.tl.fromTo(`[data-elem="cs-animation.frame-01"]`, {
				translateX: "0vw",
			}, {
				translateX: "100vw",
				ease: "none",
				duration: 0.2,
			}, 0.5);
			// Second frame go in
			this.tl.fromTo(`[data-elem="cs-animation.frame-02"]`, {
				translateX: "-100vw",
			}, {
				translateX: "0vw",
				ease: "none",
				duration: 0.2,
			}, 0.47);
			// Third msg (80%)
			this.tl.fromTo(`[data-elem="cs-animation.msg-03"]`, {
				scale: 1,
				rotate: "0deg",
				transformOrigin: () => {
					if (window.innerWidth > 1024) return "17.5% 52.4%";
					if (window.innerWidth > 720) return "17% 52.2%";
					if (window.innerWidth > 340) return "17.2% 52%";
					return "17.5% 51.8%";
				},
				translateX: 0,
				force3D: false,
			}, {
				keyframes: [
					{
						scale: () => {
							if (window.innerWidth > 1024) return 18;
							if (window.innerWidth > 800) return 22;
							if (window.innerWidth > 400) return 36;
							return 38;
						},
						rotate: "45deg",
						translateX: "33%",
						duration: 0.2,
					},
					{
						scale: 50,
						rotate: "90deg",
						duration: 0.2,
					}
				]
				
			}, 0.67);
			// Forth msg
			// Rotate of whole block
			this.tl.fromTo(`[data-elem="cs-animation.msg-04"]`, {
				scale: () => {
					if (window.innerWidth > 800) return 0.85;
					return 0.65;
				},
				rotate: "-65deg",
			}, {
				scale: 1,
				rotate: "0deg",
				duration: 0.35,
			}, 0.8);
			// Reveal of lines
			this.tl.fromTo(`[data-elem="cs-animation.msg-04"] .reveal-wrap__item`, {
				translateY: "1.85em",
			}, {
				translateY: "0",
				scale: 1,
				duration: 0.2,
			}, 0.8);
			// Scale
			this.tl.fromTo(`[data-elem="cs-animation.msg-04"] .cs-msg-04__scale`, {
				scale: 1,
				translateX: 0,
				transformOrigin: (idx, self) => {
					const anchor = self.querySelector(".cs-msg-04__anchor");
					return `${(anchor.offsetLeft + anchor.offsetWidth * 0.54) / self.offsetWidth * 100}% 60%`;
				},
				
			}, {
				scale: (idx, self) => {
					const anchor = self.querySelector(".cs-msg-04__anchor");
					return window.innerWidth / anchor.offsetWidth * (window.innerWidth > 1024 ? 3 : 5);
				},
				translateX: (idx, self) => {
					const wrapBcr = self.parentElement.getBoundingClientRect();
					const anchor = self.querySelector(".cs-msg-04__anchor");
					return `${window.innerWidth / 2 - (wrapBcr.left + anchor.offsetLeft + anchor.offsetWidth / 2)}px`;
				},
				ease: "power4.in",
				duration: 0.1,
				force3D: false,
			}, 1.15);
			this.tl.fromTo(`[data-elem="cs-animation.msg-04"] .cs-msg-04__top`, {
				translateY: 0,
			}, {
				translateY: (idx, self) => {
					const anchor = self.parentElement.querySelector(".cs-msg-04__anchor");
					const scale = window.innerWidth / anchor.offsetWidth * (window.innerWidth > 1024 ? 3 : 5);
					return `-${(anchor.offsetHeight * scale - anchor.offsetHeight) / 2}px`;
				},
				ease: "power4.in",
				duration: 0.1,
			}, 1.15);
			this.tl.fromTo(`[data-elem="cs-animation.msg-04"] .cs-msg-04__bottom`, {
				translateY: 0,
			}, {
				translateY: (idx, self) => {
					const anchor = self.parentElement.querySelector(".cs-msg-04__anchor");
					const scale = window.innerWidth / anchor.offsetWidth * (window.innerWidth > 1024 ? 3 : 5);
					return `${(anchor.offsetHeight * scale - anchor.offsetHeight) / 2}px`;
				},
				ease: "power4.in",
				duration: 0.1,
			}, 1.15);
			// Trigger change
			this.tl.fromTo(`[data-elem="cs-animation.msg-05"]`, {
				scale: (idx, self) => {
					const anchor = self.querySelector(".cs-msg-05__anchor");
					return window.innerWidth / anchor.offsetWidth * (window.innerWidth > 1024 ? 3 : 5);
				},
				transformOrigin: (idx, self) => {
					const anchor = self.querySelector(".cs-msg-05__anchor");
					return `${(anchor.offsetLeft + anchor.offsetWidth * (window.innerWidth > 1024 ? 0.54 : 0.52)) / self.offsetWidth * 100}% 63%`;
				},
				translateX: (idx, self) => {
					const selfAnchor = self.querySelector(".cs-msg-05__anchor");
					const wrapAnchorBcr = self.parentElement.getBoundingClientRect();
					return `${window.innerWidth / 2 - (wrapAnchorBcr.left + self.offsetLeft + selfAnchor.offsetLeft + selfAnchor.offsetWidth * 0.5)}px`;
				},
				force3D: false,
			}, {
				ease: "power4.out",
				scale: 1,
				translateX: 0,
				duration: 0.3,
				force3D: false,
			}, 1.25);
			this.msg06.createAnimation();
			this.msg07.createAnimation();
			createDiagramAnimation(".cs-conclusion__diagram");
		});
	}
}

function init() {
	const grid = new CategoriesGrid("#categories-grid");
	//const writeUsForm = new WriteUsForm("#write-us-form");
	// initNav();
	new Animation();
	new LevelsComposition("#levels-composition");
	window.faqFrames = new FramesStack("#tools-frames");
	new FaqComposition("#faq-items");
}