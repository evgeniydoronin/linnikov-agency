import { getTargetElem, deepAssign } from "../scripts/utils.js";

const defaultOptions = {
	steps: 5,
	labels: false, // true | function render() { return <></>; }
	breakpoints: {},
};

export class RangeInput {
	_hoveredSection = null;
	constructor(target, options = {}) {
		this._vars = deepAssign({}, defaultOptions);
		this.setOptions(options);
		this.dom = { input: getTargetElem(target) };
		this.update();
	}
	setOptions(options, update = true) {
		if (update) {
			deepAssign(this._vars, options);
		} else {
			this._vars = options;
		}
		if (this.initialized) this.update();
	}
	update() {
		if (this.initialized) this.destruct();
		this.initBreakpoints();
		this.readInputAttributes();
		this.recalcSectionSize();
		this.updateDom();
		this.alignStep();
		this.initActions();
		this.hasLabels = Boolean(this._vars.labels);
		this.initialized = true;
	}
	recalcSectionSize() {
		this._sectionSize = this._size / (this.getVar("steps") - 1);
	}
	initBreakpoints() {
		this._mediaQueries = [];
		for (var media in this._vars.breakpoints) {
			const mediaMatch = matchMedia(media);
			this._mediaQueries.push(mediaMatch);
			mediaMatch.onchange = (mediaMatch) => this.onMediaChange(mediaMatch);
			this.onMediaChange(mediaMatch);
		}
	}
	onMediaChange({ matches, media }) {
		this.activeMedia = null;
		if (matches) this.activeMedia = media;
		if (this.initialized) this.update();
	}
	readInputAttributes() {
		this._min = Number(this.dom.input.getAttribute("min") || 0);
		this._max = Number(this.dom.input.getAttribute("max") || 100);
		this._size = this._max - this._min;
	}
	set activeMedia(next) {
		this._activeMedia = next;
	}
	get activeMedia() {
		return this._activeMedia;
	}
	set hasLabels(next) {
		this._hasLabels = next;
		this.dom.root?.classList.toggle("_has-labels", next);
	}
	get hasLabels() {
		return this._hasLabels;
	}
	set initialized(next) {
		this._initialized = next;
		this.dom.root?.classList.toggle("_initialized", next);
	}
	get initialized() {
		return this._initialized;
	}
	set hoveredSection(next) {
		this._hoveredSection = next;
		this.updateThumbPosition();
	}
	get hoveredSection() {
		return this._hoveredSection;
	}
	set activeStep(next) {
		console.log(`Setting active step to: ${next}`); // Логирование значения шага
		// Логируем текущее состояние до изменения
		console.log(`Previous active step: ${this._activeStep}`);

		// Удаляем класс "_selected" у предыдущего активного шага
		this.dom.sections[this._activeStep]?.classList.remove("_selected");

		// Устанавливаем новое значение активного шага
		this._activeStep = next;

		// Добавляем класс "_selected" новому активному шагу
		this.dom.sections[next]?.classList.add("_selected");

		// Устанавливаем значение ползунка, соответствующее текущему шагу
		this.value = this.getStepValue(next);

		// Обновляем позицию бегунка (thumb)
		this.updateThumbPosition();

		// Логируем состояние после изменения
		console.log(`Active step successfully set to: ${this._activeStep}`);
		console.log(`New value: ${this.value}`);
	}
	get activeStep() {
		return this._activeStep;
	}
	set value(next) {
		this.dom.input.value = next;
		this.dom.input.dispatchEvent(new Event("change", { bubbles: true }));
	}
	get value() {
		return this.dom.input.value;
	}
	destruct() {
		this.dom.root.replaceWith(this.dom.input);
		this._mediaQueries.forEach(query => query.onchange = null);
		this._mediaQueries = null;
		this.initialized = false;
	}
	getStepValue(idx) {
		const assigned = this.getVar("getStepValue");
		const def = () => this._min + this._sectionSize * idx;
		return assigned ? assigned(idx, self) : def();
	}
	renderLabel(idx) {
		var labelText;
		if (typeof this._vars.labels === "string") {
			labelText = this._vars.labels.replace("{value}", this.getStepValue(idx));
		} else if (typeof this._vars.labels === "boolean") {
			labelText = this.getStepValue(idx);
		} else if (this._vars.labels instanceof Array) {
			labelText = this._vars.labels[idx];
		} else if (this._vars.labels instanceof Function) {
			labelText = this._vars.labels(idx, this.getStepValue(idx));
		} 
		return `<div class="range-input-div__label">${labelText}</div>`;
	}
	renderSection(idx) {
		return `<div data-idx="${idx}" data-active="true" class="range-input-div range-input__div">
							<div class="range-input-div__inner">
								<div class="range-input-div__mark"></div>
								${this._vars.labels ? this.renderLabel(idx) : ""}
							</div>
						</div>`;
	}
	getVar(alias) {
		const mediaVars = this._vars.breakpoints && this._activeMedia ? this._vars.breakpoints[this._activeMedia] : {};
		return alias in mediaVars ? mediaVars[alias] : this._vars[alias];
	}
	updateDom() {
		this.dom.root = document.createElement("div");
		this.dom.root.classList.add("range-input");
		this.sectionsNumber = this.getVar("steps") - 1;
		const sections = [];
		for (var idx = 0; idx < this.getVar("steps"); idx++) {
			sections.push(this.renderSection(idx));
		}
		this.dom.root.innerHTML = `<div class="range-input__body"><div class="range-input__inner">${sections.join("")}</div></div>`;
		this.dom.sections = Array.from(this.dom.root.querySelectorAll(".range-input-div"));
		this.dom.root.style.setProperty("--sections-number", this.getVar("steps") - 1);
		this.dom.root.style.setProperty("--inner-marks", this.getVar("steps") - 2);
		this.dom.input.replaceWith(this.dom.root);
		this.dom.root.append(this.dom.input);
	}
	initActions() {
		this.dom.root.addEventListener("click", ({ target }) => {
			if (!target.matches(".range-input-div, .range-input-div *")) return;
			const root = target.closest(".range-input-div");
			this.activeStep = Number(root.getAttribute("data-idx"));
		});
		if (!app.state.isMobile) this.bindHoverTracking();
	}
	bindHoverTracking() {
		this.dom.sections.forEach((elem, idx) => {
			elem.addEventListener(`${app.state.pointerType}leave`, () => this.hoveredSection = null);
			elem.addEventListener(`${app.state.pointerType}enter`, () => this.hoveredSection = idx);
		});
	}
	getStepFromValue(value) {
		return Math.round((value - this._min) / this._sectionSize);
	}
	alignStep() {
		var value = this.dom.input.value;
		this.activeStep = this.getStepFromValue(value);
	}
	updateThumbPosition() {
		if (this._hoveredSection !== null) {
			this.setThumbPosition(this._hoveredSection);
		} else {
			this.setThumbPosition(this._activeStep);
		}
	}
	setThumbPosition(next) {
		this.dom.root.style.setProperty("--thumb-position", next);
	}
}
const parseLabels = (value) => {
	if (!value) return undefined;
	if (value === "true" || value === "yes") return true;
	try {
		return JSON.parse(value); // string[]
	} catch (ex) {
		return value;
	}
}
const getOptions = (elem) => {
	return {
		steps: Number(elem.getAttribute("data-steps") || 5),
		labels: parseLabels(elem.getAttribute("data-labels"))
	}
}
export default function initRangeInputs() {
	document.querySelectorAll(`[data-component="range-input"]`).forEach(elem => new RangeInput(elem, getOptions(elem)));
}