import throttle from "lodash.throttle";
import { Tabs } from "../../../shared/components/tabs.js";
import { ContactForm } from "../../../shared/components/forms.js";
import { setBlockSizeVars } from "../../../shared/scripts/blockSizeVars.js";
import { HoverablesGroup } from "../../../shared/components/hoverables-group.js";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const { autorun } = window.mobx;

document.addEventListener("DOMContentLoaded", init);

function init() {
	new ContactForm("#contact-form");
	new MainAnimation();
	document.querySelectorAll("[data-component=tabs]").forEach(elem => new Tabs(elem));
	document.querySelectorAll("[data-component=hoverables-group]").forEach(elem => new HoverablesGroup(elem));
	setBlockSizeVars("#contacts-container", { container: "main", prefix: "section", withUnit: true });
	setBlockSizeVars("#contacts-inner", { container: "main", prefix: "inner", withUnit: true });
	initTitleHiding();
}
function initTitleHiding() {
	const target = document.querySelector("#hero__title");
	autorun(() => {
		if (["open", "opening"].includes(window.submenu?.panelState)) {
			target.classList.add("reveal-wrap_hidding");
			target.classList.remove("reveal-wrap_active");
		} else {
			target.classList.add("reveal-wrap_active");
		}
	});
};
class MainAnimation {
	constructor() {
		this.dom = { root: document.querySelector("#mail-to-us") }
		this.dom.container = this.dom.root.querySelector(".mail-to-us__sticky-container");
		this.dom.wrap = this.dom.root.querySelector(".mail-to-us__sticky-wrap");
		this.dom.ref = this.dom.root.querySelector(".mail-to-us__ref");
		this.dom.refP1 = this.dom.ref.querySelector(".mail-ref-apart__p1"); // Верх вместе
		this.dom.refP2 = this.dom.ref.querySelector(".mail-ref-apart__p2"); // Часть до собачки
		this.dom.refP3 = this.dom.ref.querySelector(".mail-ref-apart__p3"); // Часть верха после собачки
		this.dom.refP4 = this.dom.ref.querySelector(".mail-ref-apart__p4"); // Низ
		this.dom.refP5 = this.dom.ref.querySelector(".mail-ref-apart__p5"); // Часть низа для дальнейщего скрытия
		this.dom.refP6 = this.dom.ref.querySelector(".mail-ref-apart__p6"); // Всегда видимая часть низа
		window.app.windowResizeObserver.on("resize", () => this.onResize());
		this.onResize();
	}
	onResize() {
		this.rebuildAnimations();
	}
	rebuildAnimations() {
		const self = this;
		if (this.context) this.context.revert();
		this.context = gsap.context(() => {
			this.tl = gsap.timeline({
				scrollTrigger: {
					trigger: "#hero",
					start: "top top",
					endTrigger: "#mail-to-us",
					end: "bottom-=10% bottom",
					scrub: 0.5,
					invalidateOnRefresh: true,
				}
			});
			// Устанавливаем изначальные позиции топа
			gsap.set(this.dom.refP2, {
				translateX: () => `-${window.innerWidth}px`,
				translateY: () => `${window.innerHeight}px`,
			});
			gsap.set(this.dom.refP3, {
				translateX: () => `${window.innerWidth}px`,
				translateY: () => `${window.innerHeight}px`,
			});
			// Анимация верха, возврат из положения увод в стороны и вниз
			this.tl.add(gsap.fromTo(this.dom.refP2, 
				{
					translateX: () => `-${window.innerWidth}px`,
					translateY: () => `${window.innerHeight}px`,
				},
				{
					id: "top-left",
					translateX: `0px`,
					translateY: `0px`,
					duration: 0.4
				}), 0.24);
			this.tl.add(gsap.fromTo(this.dom.refP3, {
				translateX: () => `${window.innerWidth}px`,
				translateY: () => `${window.innerHeight}px`,
			},
			{
				id: "top-right",
				translateX: `0px`,
				translateY: `0px`,
				duration: 0.4
			}), 0.24);
			// --
			this.tl.add(gsap.timeline({
					id: "bottom-to-left",
					onUpdate: function () {
						gsap.set(self.dom.refP4, {
							translateX: () => `-${self.dom.refP5.offsetWidth / self.dom.refP4.offsetWidth  * 100 * gsap.getProperty(self.dom.refP4, "scale") * this.progress()}%`,
						});
					},
					duration: 0.24
				}), 0.00);
			this.tl.add(gsap.fromTo(self.dom.refP5, {
				translateX: "0%",
			},{
				id: "bottom-first-part-to-outside",
				translateX: "-100%",
				duration: 0.4
			}), 0.24);
			// Устанавливаем изначальный масштаб
			gsap.set(this.dom.refP4, {
				"transform-origin": "bottom left",
				scale: window.innerWidth <= 768 ? 1.45 : 2.25,
			});
			this.tl.add(gsap.timeline({
				id: "bottom-scale",
				onUpdate: function () {
					const scale = 1 + (window.innerWidth <= 768 ? 0.45 : 1.25) * (1 - this.progress());
					gsap.set(self.dom.refP4, {
						scale,
						translateX: () => `-${self.dom.refP5.offsetWidth / self.dom.refP4.offsetWidth  * 100 * scale}%`,
					});
				},
				duration: 0.4
			}), 0.24);
			this.tl.fromTo(this.dom.wrap, {
					bottom: `${(window.innerHeight - this.dom.wrap.offsetHeight) / 2}px`, // this.dom.wrap.offsetHeight
				},
				{
					id: "sticky-position-decrease",
					bottom: `${gsap.getProperty(this.dom.container, "paddingBottom") / 2}px`, // gsap.getProperty(this.dom.container, "paddingBottom"),
					duration: 0.2,
					ease: "none",
				}, 0.8);
		});
	}
}
