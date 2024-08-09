import { MaterialsFilter, MaterialsFilterPanel } from "./materials-filter.js";
import { deepAssign } from "../scripts/utils.js";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Observer);

const defaultOptions = {
	filter: "static", // "static" | "panel"
}
export class MaterialsGrid {
	static transition = 0.8;
	dom = {};
	currentCategory = null;
	constructor(selector, options = {}) {
		this.options = deepAssign({}, defaultOptions, options);
		this.dom.root = document.querySelector(selector);
		this.dom.body = this.dom.root.querySelector(`[data-elem="materials-grid.body"]`);
		this.id = this.dom.root.getAttribute("id");
		this.setTransition(0.8);
		const filterSelector = `[data-component="materials-filter"][data-for="${this.id}"]`;
		if (this.options.filter === "static") {
			this.filter = new MaterialsFilter(filterSelector);
		} else {
			this.filter = new MaterialsFilterPanel(filterSelector);
			this.initFilterHidding();
		}
		if (!this.filter) console.error("No filter for materials grid");
		this.filter.on("switchTo", ({ category }) => this.switchTo(category));
		setTimeout(() => this.switchTo(this.filter.currentFilter), 0);
	}
	setTransition(value) {
		this.dom.body.style.setProperty("--transition", `${value}s`);
	}
	getSectionElem(category) {
		return this.dom.body.querySelector(`[data-category="${category}"]`);
	}
	scrollToStart() {
		const bcr = this.dom.root.getBoundingClientRect();
		window.lenis?.scrollTo("top");
	}
	showFilter() {
		if (!("show" in this.filter)) return;
		this.filter.show();
		document.documentElement.classList.add("fixed-filter-panel-is-visible");
	}
	hideFilter() {
		if (!("hide" in this.filter)) return;
		this.filter.hide();
		document.documentElement.classList.remove("fixed-filter-panel-is-visible");
	}
	initFilterHidding() {
		// Init filter hiding;
		this.scrollTrigger = ScrollTrigger.create({
			trigger: this.dom.root,
			start: "top bottom",
			end: "bottom top",
			onEnter: () => this.showFilter(),
			onEnterBack: () => this.showFilter(),
			onLeave: () => this.hideFilter(),
			onLeaveBack: () => this.hideFilter(),
		});
	}
}
export class NewsGrid extends MaterialsGrid {
	constructor(selector, options = {}) {
		super(selector, options);
	}
	async switchTo(category) {
		this.prevCategory = this.currentCategory;
		this.currentCategory = category;
		if (this.prevCategory) await this.hide(this.prevCategory);
		this.scrollToStart();
		if (this.currentCategory) await this.show(this.currentCategory);
	}
	async hide(category) {
		const target = this.getSectionElem(category);
		target.setAttribute("aria-hidden", true);
		target.classList.add("hidding");
		await new Promise((resolve) => setTimeout(() => {
			target.classList.remove("hidding");
			target.classList.remove("active");
			resolve();
		}, MaterialsGrid.transition / 2 * 1000));
	}
	async show(category) {
		const target = this.getSectionElem(category);
		target.setAttribute("aria-hidden", false);
		target.classList.add("active");
		requestAnimationFrame(() => {
			target.classList.add("showing");
		});
		await new Promise((resolve) => setTimeout(() => {
			target.classList.remove("showing");
			resolve();
		}, MaterialsGrid.transition / 2 * 1000));
	}
}
export class IdeasGrid extends MaterialsGrid {
	state = {};
	constructor(selector, options = {}) {
		super(selector, options);
		this.selectItems();
		this.initItemsHoverTracking();
	}
	selectItems() {
		this.dom.items = Array.from(this.dom.root.querySelectorAll(`[data-elem="materials-grid.body"] > *`));
	}
	get hasHovered() {
		return this.dom.root.classList.contains("has-hovered-item");
	}
	set hasHovered(value) {
		if (value) {
			this.filter.dom.root.classList.add("grid-has-hovered-item");
			this.dom.root.classList.add("has-hovered-item");
		} else {
			this.filter.dom.root.classList.remove("grid-has-hovered-item");
			this.dom.root.classList.remove("has-hovered-item");
		}
	}
	initItemsHoverTracking() {
		this.dom.items.forEach(elem => {
			Observer.create({
				target: elem,
				type: "pointer",
				onHover: () => {
					this.hasHovered = true;
				},
				onHoverEnd: () => {
					this.hasHovered = false;
				},
				onMove: ({ x, y }) => {
					if (!this.hasHovered) return false;
					const bcr = elem.getBoundingClientRect();
					const shiftLeft = ((x - bcr.left) / bcr.width) * 50;
					const shiftTop = ((y - bcr.top) / bcr.height) * 50;
					elem.style.setProperty("--img-shift-left", `${shiftLeft}px`);
					elem.style.setProperty("--img-shift-top", `${shiftTop}px`);
				}
			});
		})
	}
	async switchTo(category, passive) {
		this.prevCategory = this.currentCategory;
		this.currentCategory = category;
		if (!passive) this.scrollToStart();
		await this.animateHiddingAll();
		this.hideNotInCategory();
		await this.showFromCategory(this.currentCategory);
		setTimeout(() => this.scrollTrigger.refresh(), 1200);
	}
	async animateHiddingAll() {
		this.dom.items.forEach(elem => {
			elem.classList.add("hidding");
		});
		return new Promise(resolve => setTimeout(resolve, 200));
	}
	hideNotInCategory(category) {
		if (category === "all") return;
		this.dom.items.forEach(elem => {
			if (elem.getAttribute("data-category") === category) return;
			elem.setAttribute("aria-hidden", true);
			elem.classList.add("hidden");
			elem.classList.remove("hidding");
		});
	}
	async showFromCategory(category) {
		this.dom.items.forEach(elem => {
			if (category !== "all" && elem.getAttribute("data-category") !== category) return;
			elem.setAttribute("aria-hidden", false);
			elem.classList.remove("hidden");
			requestAnimationFrame(() => elem.classList.add("showing"));
		});
		await new Promise(resolve => setTimeout(resolve, 200));
		this.dom.items.forEach(elem => {
			if (category !== "all" && elem.getAttribute("data-category") !== category) return;
			elem.classList.remove("showing");
		});
	}
}