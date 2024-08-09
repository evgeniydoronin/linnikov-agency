import EventEmmitter from "../scripts/patterns/EventEmitter.js";
import KeenSlider from "keen-slider";
import { getTargetElem } from "../scripts/utils.js";

export class MaterialsFilter extends EventEmmitter {
	constructor(selector, options = {}) {
		super();
		const defaultFilter = "all";
		this.dom = { root: getTargetElem(selector) };
		if (!this.dom.root) {
			throw new Error(`Cannot find MaterialsFilter root by provided selector: ${selector}`);
		}
		const hash = location.hash.slice(1);
		this.currentFilter = hash || defaultFilter;
		this.switchTo(this.currentFilter);

		this.dom.root.addEventListener("click", ({ target }) => {
			const linkElem = target.hasAttribute("href") ? target : target.closest("[href]");
			if (!linkElem) return;
			const selectedCategory = linkElem.getAttribute("href").slice(1);
			this.switchTo(selectedCategory);
		});
	}
	switchTo(category) {
		this.prevFilter = this.currentFilter;
		if (this.prevFilter) this.setInactive(this.prevFilter);
		this.currentFilter = category;
		this.setActive(category);
		this.emit("switchTo", { prevCategory: this.prevFilter, category });
	}
	setActive(category) {
		const target = this.dom.root.querySelector(`[href="#${category}"]`);
		target?.classList.add("active");
	}
	setInactive(category) {
		const target = this.dom.root.querySelector(`[href="#${category}"]`);
		target?.classList.remove("active");
	}
}
export class MaterialsFilterPanel extends MaterialsFilter {
	constructor(selector) {
		super(selector);
		this.dom.slider = this.dom.root.querySelector("[data-elem=slider]");
		this.dom.tips = this.dom.root.querySelector("[data-elem=tips]");
		this.dom.prevBtn = this.dom.root.querySelector(`[data-elem="materials-filter.prev"]`);
		this.dom.nextBtn = this.dom.root.querySelector(`[data-elem="materials-filter.next"]`);
		document.documentElement.classList.add("has-fixed-filter-panel");
		this.initSlider(this.dom.slider);
	}
	initSlider(selector) {
		this.slider = new KeenSlider(selector, {
			mode: "free",
			slides: {
				perView: "auto",
				spacing: 50,
			},
			breakpoints: {
				"(max-width: 520px)": {
					slides: {
						perView: "auto",
						spacing: 24,
					},
				}
			},
			updated: () => this.handleSliderUpdate(),
			created: () => this.handleSliderUpdate(),
		});
		this.dom.prevBtn.addEventListener("click", () => this.slider.prev());
		this.dom.nextBtn.addEventListener("click", () => this.slider.next());
	}
	handleSliderUpdate() {
		if (this.dom.slider.offsetWidth < this.dom.slider.scrollWidth) {
			this.showTips();
		} else {
			this.hideTips();
		}
	}
	isTipsShowed() {
		return this.dom.root.classList.contains("show-tips");
	}
	showTips() {
		if (this.isTipsShowed()) return;
		this.dom.root.classList.add("show-tips");
	}
	hideTips() {
		if (!this.isTipsShowed()) return;
		this.dom.root.classList.remove("show-tips");
	}
	hide() {
		document.documentElement.classList.add("fixed-filter-hidden");
		this.dom.root.setAttribute("aria-hidden", true);
		this.dom.root.classList.add("hidden");
	}
	show() {
		document.documentElement.classList.remove("fixed-filter-hidden");
		this.dom.root.setAttribute("aria-hidden", false);
		this.dom.root.classList.remove("hidden");
	}
}