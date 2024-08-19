import { lock, unlock } from 'tua-body-scroll-lock';
import { deepAssign, getTargetElem } from "../../scripts/utils.js";
import EventEmitter from '../../scripts/patterns/EventEmitter.js';
// v1.2.1
const initialLayerZIndex = 200;
const defaultOptions = {
	overlapping: true,
	static: false,
	closeOnEsc: true,
	closeOnOutsideClick: {
		checkTarget: null,
	},
	closeConfirm: (drawer) => { return true; },
}
class Drawer {
	static openDrawersList = [];
	static state = {
		upperOverlapping: null,
	};
	static get upperOpenDrawer() {
		return Drawer.openDrawersList[Drawer.openDrawersList.length - 1];
	}
	static get upperOverlapping() {
		return Drawer.state.upperOverlapping;
	}
	static set upperOverlapping(drawer) {
		return Drawer.state.upperOverlapping = drawer;
	}
	static resetUpperOverlapping() {
		if (Drawer.upperOverlapping) {
			Drawer.upperOverlapping.upperOverlapping = false;
		}
		const upperOverlapping = Drawer.openDrawersList.find(drawer => drawer.overlapping);
		if (upperOverlapping) {
			upperOverlapping.upperOverlapping = true;
			Drawer.upperOverlapping = upperOverlapping;
		}
	}
	static get upperZIndex() {
		if (Drawer.openDrawersList.length) {
			return Drawer.upperOpenDrawer.zIndex;
		} else {
			return initialLayerZIndex;
		}
	}
	#state = {
		zIndex: null,
		focus: false,
		open: false,
		locked: false,
		upperOverlapping: false,
	};
	subscribers = {
		close: [],
		open: [],
	};
	components = {
		openBtnElems: [],
		closeBtnElems: [],
		toggleBtnElems: [],
	}
	get isOpen() {
		return this.#state.open;
	}
	constructor(elem, alias, options = {}) {
		this.options = options;
		this.elem = elem;
		this.alias = alias;
	}
	set zIndex(val) {
		this.#state.zIndex = val;
		this.elem.style.setProperty("--z-index", val);
	}
	get zIndex() {
		return this.#state.zIndex;
	}
	set focus(value) {
		this.#state.focus = value;
		if (value) {
			this.elem.classList.add("focus");
		} else {
			this.elem.classList.remove("focus");
		}
	}
	set upperOverlapping(value) {
		this.#state.upperOverlapping = value;
		if (value) {
			this.elem.classList.add("upper-overlapping");
		} else {
			this.elem.classList.remove("upper-overlapping");
		}
	}
	get upperOverlapping() {
		return this.#state.upperOverlapping;
	}
	get focus() {
		return this.#state.focus;
	}
	set locked(value) {
		this.#state.locked = value;
		if (value) bodyLock(this.elem);
		else bodyUnlock(this.elem);
	}
	get locked() {
		return this.#state.locked;
	}
	on(type, callback) {
		if (type in this.subscribers) {
			this.subscribers[type].push(callback);
		}
	}
	set overlapping(value) {
		this.options.overlapping = value;
		if (value) this.elem.classList.add("drawer_overlapping");
		else this.elem.classList.remove("drawer_overlapping");
		Drawer.resetUpperOverlapping();
	}
	get overlapping() {
		return this.options.overlapping;
	}
	addOpenBtn(target) {
		const openBtnElem = getTargetElem(target);
		this.components.openBtnElems.push(openBtnElem);
		openBtnElem.addEventListener("click", (event) => {
			if (event.target.disabled) return;
			event.__drawerOpen = true;
			this.open(openBtnElem);
		});
	}
	addCloseBtn(target) {
		const closeBtnElem = getTargetElem(target);
		this.components.closeBtnElems.push(closeBtnElem);

		closeBtnElem.addEventListener("click", (event) => {
			if (event.target.disabled) return;
			event.__drawerClose = true;
			this.close(closeBtnElem);
		});
	}
	addToggleBtn(target) {
		const btnElem = getTargetElem(target);
		this.components.toggleBtnElems.push(btnElem);

		btnElem.addEventListener("click", (event) => {
			if (event.target.disabled) return;
			if (this.#state.open) {
				event.__drawerClose = true;
				this.close(btnElem);
			} else {
				event.__drawerOpen = true;
				this.open(btnElem);
			}
		});
	}
	setBtnsActive() {
		applyToScope(this.components.openBtnElems);
		applyToScope(this.components.toggleBtnElems);
		function applyToScope(scope) {
			scope.forEach(elem => {
				if (elem instanceof HTMLElement) {
					elem.classList.add("active");
				}
			});
		}
	}
	setBtnsInactive() {
		applyToScope(this.components.openBtnElems);
		applyToScope(this.components.toggleBtnElems);
		function applyToScope(scope) {
			scope.forEach(elem => {
				if (elem instanceof HTMLElement) {
					elem.classList.remove("active");
				}
			});
		}
	}
	open(initiator) {
		if (this.#state.open) return;

		this.setBtnsActive();
		
		if (this.options.overlapping || this.options.static) { // Add event listeners
			this.locked = true;
			if (Drawer.upperOverlapping) {
				Drawer.upperOverlapping.upperOverlapping = false;
			}
			this.upperOverlapping = true;
			Drawer.upperOverlapping = this;
		}
		// Get upper overlapping
		this.zIndex = Drawer.upperZIndex + 1;
		this.elem.classList.add("open");
		this.initiator = initiator;
		this.#state.open = true;
		Drawer.openDrawersList.push(this);
		this.subscribers.open.forEach(callback => callback(this));
	}
	close() {
		if (!this.#state.open) return;

		this.setBtnsInactive();

		this.elem.classList.remove("open");
		this.locked = false;
		this.#state.open = false;

		const drawerIdx = Drawer.openDrawersList.findIndex(drawer => drawer.alias === this.alias);
		Drawer.openDrawersList.splice(drawerIdx, 1);
		Drawer.resetUpperOverlapping();

		this.subscribers.close.forEach(callback => callback(this));
	}
	async handleEsc(event) {
		if (this.options.closeOnEsc && !this.options.static) {
			if (await this.options.closeConfirm(this)) this.close();
		}
	}
	async handleOutsideClick(event) {
		if (event.target === this.initiator) return;
		if (this.options.closeOnOutsideClick && !this.options.static) {
			if (await this.options.closeConfirm(this)) this.close();
		}
	}
	async handleUnderlayClick(event) {
		if (this.options.closeOnOutsideClick && !this.options.static) {
			if (await this.options.closeConfirm(this)) this.close();
		}
	}
}
class Kitchen extends EventEmitter {
	drawersMap = {};
	init (options = {}) {
		this.options = deepAssign({}, defaultOptions, options);
		const drawerElems = document.querySelectorAll("[data-drawer]");
		const controlElems = document.querySelectorAll("[data-drawer-open], [data-drawer-close], [data-drawer-toggle]");
		drawerElems.forEach(elem => {
			const drawerAlias = elem.getAttribute("data-drawer");
			this.drawersMap[drawerAlias] = new Drawer(elem, drawerAlias, this.options);
		});
		controlElems.forEach(elem => {
			if (elem.hasAttribute("data-drawer-open")) {
				const drawerAlias = elem.getAttribute("data-drawer-open");
				if (!this.drawersMap[drawerAlias]) return;
				this.drawersMap[drawerAlias].addOpenBtn(elem);
			} else if (elem.hasAttribute("data-drawer-close")) {
				const drawerAlias = elem.getAttribute("data-drawer-close");
				if (!this.drawersMap[drawerAlias]) return;
				this.drawersMap[drawerAlias].addCloseBtn(elem);
			} else {
				const drawerAlias = elem.getAttribute("data-drawer-toggle");
				if (!this.drawersMap[drawerAlias]) return;
				this.drawersMap[drawerAlias].addToggleBtn(elem);
			}
		});

		if (this.options.closeOnOutsideClick) {
			this.addOutsideClickListener();
		}
	}
	addOutsideClickListener = () => {
		const checkTarget = this.options.closeOnOutsideClick.checkTarget;
		document.addEventListener("click", (event) => {
			if (event.__drawerOpen || event.__drawerClose) return;
			const { target } = event;
			const composed = event.composedPath();
				//console.log(event, target, composed);
			if (composed.some((elem) =>
				elem instanceof HTMLElement &&
				(checkTarget && checkTarget(elem) ||
				elem.matches("[data-drawer-panel], [data-drawer-elem=panel]"))))
			{ // Implicit click

			} else {
				const drawerElem = target.closest("[data-drawer]");
				if (drawerElem) { // Underlay click
					const alias = drawerElem.getAttribute("data-drawer");
					this.drawersMap[alias]?.handleUnderlayClick(event);
				} else { // Outside click
					Drawer.openDrawersList.forEach(drawer => drawer.handleOutsideClick(event));
				}
			}
		});
	}
	reset() {
		// To do reset all bindings / events and init again
	}
	assign(target, alias, options) {
		if (alias in this.drawersMap) throw new Error(`There is drawer already created with given alias: "${alias}"`);
		const drawerElem = target instanceof HTMLElement ? target : document.querySelector(target);
		if (drawerElem) throw new Error(`There is no element has been found by given selector: "${target}"`);
		return this.drawersMap[alias] = new Drawer(drawerElem, alias, options);
	}
	open(alias, initiator) {
		if (!(alias in this.drawersMap)) throw new Error(`There is no drawer created with given alias: "${alias}"`);
		this.drawersMap[alias].open(initiator);
	}
	close(alias) {
		if (!(alias in this.drawersMap)) throw new Error(`There is no drawer created with given alias: "${alias}"`);
		this.drawersMap[alias].close();
	}
	get(alias) {
		return this.drawersMap[alias];
	}
	on(alias, type, callback) {
		if (alias) {
			this.get(alias)?.on(type, callback);
		} else {
			Object.keys(this.drawersMap).forEach(alias => this.drawersMap[alias].on(type, callback));
		}
	}
}
if (!window.drawers) {
	window.drawers = new Kitchen();
}
function bodyLock(targetElem) {
	const bodyElem = document.querySelector("body");
	targetElem.classList.add("transition");
	setTimeout(() => {
		targetElem.classList.remove("transition");
	}, 300);
	bodyElem.classList.add("lock");
	if (lock) {
		lock(targetElem);
		const scrollableElems = targetElem.querySelectorAll("[data-scrollable]");
		scrollableElems.forEach(elem => lock(elem));
	}
}
function bodyUnlock(targetElem, removeUnderlay = true, delay = 300) {
	const bodyElem = document.querySelector("body");
	targetElem.classList.add("transition");
	setTimeout(() => {
		if (removeUnderlay) {
			bodyElem.classList.remove("lock");
		}
		targetElem.classList.remove("transition");
		if (unlock) {
			unlock(targetElem);
			const scrollableElems = targetElem.querySelectorAll("[data-scrollable]");
			scrollableElems.forEach(elem => unlock(elem));
		}
	}, delay);
}