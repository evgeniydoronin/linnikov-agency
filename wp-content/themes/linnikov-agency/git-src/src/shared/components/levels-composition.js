import { getTargetElem } from "../scripts/utils.js";

const { observable, action, autorun, computed } = mobx;

class CompositionItem {
	leaveTimeoutId = null;
	constructor(root, level, composition) {
		this.composition = composition;
		this.level = level;
		this.root = root;
		this.addListeners();
		autorun(() => {
			this.root.classList.toggle("_active", this.level === this.composition.activeLevel);
		});
	}
	addListeners() {
		this.root.addEventListener(`${app.state.pointerType}over`, () => this.onHover());
		//this.root.addEventListener(`${app.state.pointerType}leave`, () => this.onLeave());
	}
	setHovered(next) {
		this.root.classList.toggle("_hovered", next);
	}
	onHover() {
		if (this.leaveTimeoutId !== null) clearTimeout(this.leaveTimeoutId);
		this.setHovered(true);
		this.composition.setActiveLevel(this.level);
		this.composition.setHasHoveredItem(true);
	}
	onLeave() {
		this.setHovered(false);
		this.leaveTimeoutId = setTimeout(() => {
			this.leaveTimeoutId = null;
			if (this.composition.activeLevel === this.level) {
				this.composition.setHasHoveredItem(false);
			}
		}, 400);
	}
}

class ListItem extends CompositionItem {
	constructor(root, level, composition) {
		super(root, level, composition);
	}
}
class LevelsList {
	constructor(composition) {
		this.composition = composition;
		this.dom = { root: composition.dom.root.querySelector(".levels-list") };
		this.dom.items = Array.from(this.dom.root.querySelectorAll(".levels-list__item"));
		this.items = this.dom.items.map((elem, idx) => new ListItem(elem, idx, composition));
	}
}
class ChartItem extends CompositionItem {
	constructor(root, level, composition) {
		super(root, level, composition);
	}
}
class LevelsChart {
	constructor(composition) {
		this.dom = { root: composition.dom.root.querySelector(".levels-chart") };
		this.dom.items = Array.from(this.dom.root.querySelectorAll(".levels-chart__item"));
		this.items = this.dom.items.map((elem, idx) => new ChartItem(elem, idx, composition));
	}
}
export class LevelsComposition {
	@observable accessor activeLevel = 0;
	@observable accessor hasHoveredItem = false;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.list = new LevelsList(this);
		this.chart = new LevelsChart(this);
		autorun(() => {
			this.dom.root.setAttribute("data-active-section", this.activeSection);
		});
		this.setActiveLevel(0);
		this.setHasHoveredItem(true);
	}
	@action
	setActiveLevel(next) {
		this.activeLevel = next;
		this.dom.root.style.setProperty("--active-level", next);
		this.dom.root.setAttribute("data-active-level", next);
	}
	@action
	setHasHoveredItem(next) {
		this.hasHoveredItem = next;
		this.dom.root.classList.toggle("has-hovered-item", next);
	}
	@computed
	get activeSection() {
		return this.activeLevel === 0 ? "person" : "other";
	}
}