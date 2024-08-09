import { delay } from "../scripts/utils.js";
import { throttle } from "../scripts/patterns/throttle.js";

gsap.registerPlugin(ScrollTrigger);

export class GoUpWidget {
	static initialized = false;
	constructor() {
		if (GoUpWidget.initialized) return;
		this.dom = { root: document.querySelector("#go-up") };
		if (!this.dom.root) return null;
		ScrollTrigger.create({
			trigger: "main",
			start: () => `top+=${window.innerHeight}px top`,
			endTrigger: "footer",
			end: "top bottom-=2px",
			onToggle: ({ isActive }) => {
				if (isActive) return this.show();
				this.hide();
			},
			onUpdate: throttle(({ progress, start, end }) => {
				this.dom.root.style.setProperty("--rotate", `${(end - start) * progress / 2000 * 360}deg`);
			}, 25),
		});

		this.dom.root.addEventListener("click", () => setTimeout(() => this.scrollToStart(), 300));
		
		GoUpWidget.initialized = true;
	}
	async hide() {
		this.dom.root.classList.remove("show");
		await delay(200);
		// if (window.ctaWidget) {
		// 	await window.ctaWidget.show();
		// }
	}
	async show() {
		// if (window.ctaWidget) {
		// 	await window.ctaWidget.hide();
		// }
		this.dom.root.classList.add("show");
		return await delay(200);
	}
	get hidden() {
		return !this.dom.root.classList.has("show");
	}
	scrollToStart() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}
}