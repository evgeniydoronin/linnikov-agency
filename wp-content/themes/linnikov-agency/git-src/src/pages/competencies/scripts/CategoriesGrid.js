

import { delay, getTargetElem, parseCssValue } from "../../../shared/scripts/utils.js";
import { AnimatedIcon } from '../../../shared/components/animatedIcon.js';
import EventEmitter from "../../../shared/scripts/patterns/EventEmitter.js";
import throttle from "lodash.throttle";

class CategoryCard extends EventEmitter {
	hasHoverDevice = matchMedia("(any-hover: hover)").matches;
	constructor(root, grid) {
		super();
		this.grid = grid;
		this.dom = { root };
		this.dom.main = this.dom.root.querySelector("[data-elem=main]");
		this.dom.disclosure = this.dom.root.querySelector("[data-elem=disclosure]");
		this.dom.disclosureInner = this.dom.root.querySelector(`[data-elem="disclosure-inner"]`);
		
		this.dom.icon = this.dom.root.querySelector("[data-component=animated-icon]");
		this.dom.root.addEventListener("click", ({ target }) => {
			if (this.isCloseBtn(target)) return;
			this.isOpen() ? this.close() : this.open();
		});
		this.icon = new AnimatedIcon(this.dom.icon);
		this.dom.root.addEventListener(`${app.state.pointerType}enter`, this.handlePointerEnter);
		this.dom.root.addEventListener(`${app.state.pointerType}leave`, this.handlePointerLeave);
	}
	handlePointerEnter = (event) => {
		if (this.icon.active) return;
		this.icon.restart(false);
	}
	handlePointerLeave = (event) => {
		this.icon.stop();
	}
	get root() {
		return this.dom.root;
	}
	onResize() {
		const gridBcr = this.grid.getBcr();
		const selfBcr = this.dom.root.getBoundingClientRect();
		this.dom.root.style.setProperty("--left-shift", `${gridBcr.left - selfBcr.left}px`);
		this.dom.root.style.setProperty("--card-height", `${selfBcr.height}px`);
		this.dom.root.style.setProperty("--disclosure-height", `${this.dom.disclosureInner.offsetHeight}px`);
		if (!this.dom.root.classList.contains("initialized")) {
			this.dom.root.classList.add("initialized");
		}
	}
	isOpen() {
		return this.dom.root.classList.contains("open");
	}
	async open() {
		this.emit("beforeOpen", this);
		this.dom.root.classList.add("open");
		this.dom.root.setAttribute("data-active", false);
		await delay(200);
		this.dom.disclosure.classList.add("show");
		await delay(200);
	}
	async close() {
		this.emit("beforeClose", this);
		this.dom.disclosure.classList.remove("show");
		this.dom.root.classList.remove("open");
		this.dom.root.classList.add("closing");
		await delay(200);
		this.dom.root.classList.remove("closing");
		this.dom.root.setAttribute("data-active", true);
	}
	async hide() {
		this.dom.root.classList.add("hidden");
		await delay(200);
	}
	async show() {
		this.dom.root.classList.remove("hidden");
		await delay(200);
	}
	isCloseBtn(target) {
		return target.matches("[data-elem=close-btn], [data-elem=close-btn] *");
	}
}
export default class CategoriesGrid {
	activeCard = null;
	columnsNumber = null;
	covered = null;
	rfaId = null;
	prevColumnsNumber = null;
	constructor(selector) {
		this.dom = { root: getTargetElem(selector) };
		this.dom.inner = this.dom.root.querySelector(".categories-grid__inner");
		this.dom.cards = Array.from(this.dom.inner.querySelectorAll(".categories-grid__inner > *"));
		this.cards = this.dom.cards.map(elem => {
			const card = new CategoryCard(elem, this);
			card.on("beforeOpen", () => this.onBeforeCardOpen(card));
			card.on("beforeClose", () => {
				if (card !== this.activeCard) return console.error("Two active cards at the same time");
				this.activeCard = null;
				this.showCovered();
			});
			return card;
		});
		this.initResizeObserver();
		this.onResize();

		document.addEventListener("click", ({ target }) => {
			if (target.matches(".category-card, .category-card *")) return;
			this.handleOutsideClick();
		});
	}
	handleOutsideClick() {
		this.closeActiveCard();
	}
	getBcr() {
		return this.dom.inner.getBoundingClientRect();
	}
	pullGridProps() {
		const style = getComputedStyle(this.dom.inner);
		this.prevColumnsNumber = this.columnsNumber;
		this.columnsNumber = style.getPropertyValue('grid-template-columns')
			//.replace(' 0px', '')
			.split(' ')
			.length;
		this.columnGap = parseCssValue(style.columnGap)?.value;
		this.rowGap = parseCssValue(style.rowGap)?.value;
	}
	onResize() {
		cancelAnimationFrame(this.rfaId);
		this.rfaId = requestAnimationFrame(() => {
			this.rfaId = null;
			this.pullGridProps();
			if (this.prevColumnsNumber !== this.columnsNumber) {
				this.onColumnsNumberChange();
			}
			this.dom.root.style.setProperty("--grid-width", `${this.dom.inner.clientWidth}px`);
			this.dom.root.style.setProperty("--column-gap", `${this.columnGap}px`);
			this.dom.root.style.setProperty("--column-width", `${((this.getBcr().width - this.columnGap * (this.columnsNumber - 1)) / this.columnsNumber).toFixed(2)}px`);
			this.cards.forEach(card => card.onResize());
			this.recalcActiveCardParams();
			this.recalcMaxMainHeight();
			this.recalcMaxDisclosureHeight();
			this.recalcMaxContentHeight();
		});
	}
	recalcMaxMainHeight() {
		this.dom.root.style.setProperty("--max-main-height", `0px`);
		this.maxMainHeight = 0;
		this.cards.forEach(card => this.maxMainHeight = Math.max(card.dom.main.offsetHeight, this.maxMainHeight));
		this.dom.root.style.setProperty("--max-main-height", `${this.maxMainHeight}px`);
	}
	recalcMaxDisclosureHeight() {
		this.dom.root.style.setProperty("--max-disclosure-height", `0px`);
		this.maxDisclosureHeight = 0;
		this.cards.forEach(card => this.maxDisclosureHeight = Math.max(card.dom.disclosureInner.offsetHeight, this.maxDisclosureHeight));
		this.dom.root.style.setProperty("--max-disclosure-height", `${this.maxDisclosureHeight}px`);
	}
	recalcMaxContentHeight() {
		this.dom.root.style.setProperty("--max-content-height", `${Math.max(this.maxDisclosureHeight, this.maxMainHeight)}px`);
	}
	onBeforeCardOpen(card) {
		this.closeActiveCard();
		this.activeCard = card;
		this.recalcActiveCardParams();
		this.hideCovered();
	}
	recalcActiveCardParams() {
		if (!this.activeCard) return;
		const card = this.activeCard;
		card.dom.root.style.setProperty("--open-card-margin-bottom", `0px`);
		this.covered = this.getWillBeCovered(card);
		const cardBcr = card.dom.root.getBoundingClientRect();
		this.coveredBcr = this.getCoveredBcr();
		card.dom.root.style.setProperty("--top-shift", `${this.coveredBcr.top - cardBcr.top}px`);
		card.dom.root.style.setProperty("--open-height", `${Math.max(this.coveredBcr.height, card.dom.disclosure.scrollHeight)}px`);
		card.dom.root.style.setProperty("--open-card-margin-bottom", `${card.dom.disclosure.scrollHeight > this.coveredBcr.height ? card.dom.disclosure.scrollHeight - this.coveredBcr.height : 0}px`);
	}
	onColumnsNumberChange() {
		this.closeActiveCard();
	}
	getCoveredBcr() {
		const leftTopInner = this.cards[this.covered.startIdx]?.dom.root || this.cards[this.covered.activeCardIdx].dom.root;
		const rightBottomInner = this.cards[this.covered.endIdx - 1]?.dom.root || this.cards[this.covered.activeCardIdx].dom.root;
		const leftTopBcr = leftTopInner?.getBoundingClientRect();
		const rightBottomBcr = rightBottomInner?.getBoundingClientRect();
		return {
			top: leftTopBcr.top,
			left: leftTopBcr.left,
			right: rightBottomBcr.right,
			bottom: rightBottomBcr.bottom, 
			width: rightBottomBcr.right - leftTopBcr.left,
			height: rightBottomBcr.bottom - leftTopBcr.top,
		}
	}
	initResizeObserver() {
		this.resizeObserver = new ResizeObserver(throttle(() => this.onResize(), 10, { leading: false }));
		this.resizeObserver.observe(this.dom.inner);
	}
	closeActiveCard() {
		this.activeCard?.close();
	}
	hideCovered() {
		this.covered.cards.forEach(card => card.hide());
	}
	showCovered() {
		this.covered?.cards.forEach(card => card.show());
		this.covered = null;
	}
	getWillBeCovered(activeCard) {
		const result = {
			activeCardIdx: this.cards.findIndex((card) => activeCard.root === card.root)
		};
		const rowIdx = Math.floor(result.activeCardIdx / this.columnsNumber);
		if (this.columnsNumber === 1) return result.cards = [], result;
		if (this.columnsNumber > 2) {
			result.startIdx = rowIdx * this.columnsNumber;
			result.endIdx = result.startIdx + this.columnsNumber;
		} else if (this.columnsNumber === 2) {
			if (this.cards.length - result.activeCardIdx > 2) {
				result.startIdx = rowIdx * 2;
			} else {
				result.startIdx = (rowIdx - 1) * 2;
			}
			result.endIdx = result.startIdx + 4;
		} 
		result.cards = [
			...this.cards.slice(result.startIdx, result.activeCardIdx),
			...this.cards.slice(result.activeCardIdx + 1, result.endIdx)
		];
		return result;
	}
}