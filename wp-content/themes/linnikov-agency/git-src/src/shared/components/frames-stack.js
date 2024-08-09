import throttle from "lodash.throttle";
import { getTargetElem, toIndex } from "../scripts/utils.js";
const { autorun, observable, action } = mobx;

gsap.registerPlugin(ScrollTrigger);

class Frame {
	@observable accessor isDocked = false;
	initialized = false;
	constructor(elem, owner, idx) {
		this.owner = owner;
		this.idx = idx;
		this.dom = {
			root: elem,
			wrap: elem.querySelector(`[data-elem="frames-stack.frame.wrap"]`),
			inner: elem.querySelector(`[data-elem="frames-stack.frame.inner"]`),
		};
		this.observer = new ResizeObserver(throttle(() => this.onResize(), 25, { leading: false }));
		this.observer.observe(elem);
	}
	@action
	setDocked(next) {
		this.isDocked = next;
		this.dom.root.classList.toggle("_docked", next);
	}
	setInitialized(next) {
		this.initialized = next;
		this.dom.root.classList.toggle("_initialized", next);
	}
	onResize() {
		this.recalc();
	}
	recalc() {
		cancelAnimationFrame(this.recalcAfr);
		this.recalcAfr = requestAnimationFrame(() => {
			this.resetMarginTop();
			this.resetBottom();
			this.resetRootHeight();
			this.owner.dockingTracker.reset();
			this.setInitialized(true);
		});
	}
	getDecorHeight() {
		return gsap.getProperty(this.dom.root, "--decor-height");
	}
	getContainerHeight() {
		return this.dom.root.offsetHeight;
	}
	calcInViewHeight() {
		return this.owner.getBaseShift() + this.owner.getShift() * (this.owner.frames.length - this.idx - 1) + (this.owner.frames[this.idx]?.getDecorHeight() || 0) / 2;
	}
	calcBottom() {
		return this.calcInViewHeight() - this.getContentHeight();
	}
	calcMarginTop() {
		if (this.idx === 0) return 0;
		if (!this.owner.frames) return undefined;
		return this.owner.frames[0].getDecorHeight() / 2 + this.owner.getShift() * this.idx - this.getDecorHeight() / 2;
	}
	getContentHeight() {
		return this.dom.wrap.offsetHeight;
	}
	getRootHeight() {
		return this.dom.root.offsetHeight;
	}
	calcRootHeight() {
		if (this.idx === 0) return this.getContentHeight();
		return this.owner.frames[this.idx - 1].getRootHeight() + this.getContentHeight() - this.getDecorHeight();
	}
	resetMarginTop() {
		this.dom.root.style.setProperty("--root-padding-top", `${this.calcMarginTop()}px`);
	}
	resetBottom() {
		this.dom.root.style.setProperty("--bottom", `${this.calcBottom()}px`);
	}
	resetRootHeight() {
		this.dom.root.style.setProperty("--root-height", `${this.calcRootHeight()}px`);
	}
}
class DockingTracker {
	constructor(owner) {
		this.owner = owner;
	}
	reset() {
		cancelAnimationFrame(this.afr);
		this.afr = requestAnimationFrame(() => {
			if (this.gsapCtx) this.gsapCtx.revert();
			this.gsapCtx = gsap.context(() => {
				const visibleAreaHeight = this.owner.getVisibleAreaHeight();
				const edges = [visibleAreaHeight / this.owner.dom.root.offsetHeight];
				for (let i = 0; i < this.owner.frames.length - 1; i++) {
					const pathLeft = this.owner.frames[i].getContentHeight() - this.owner.getShift() - this.owner.frames[i].getDecorHeight();
					edges[i + 1] = edges[i] + pathLeft / this.owner.dom.root.offsetHeight;
				}
				const handleUpdate = (trigger) => {
					edges.forEach((value, idx) => {
						this.owner.frames[idx].setDocked(trigger.progress <= value);
					});
				}
				this.dockTrigger = ScrollTrigger.create({
					trigger: this.owner.dom.root,
					start: `top bottom`,
					end: `bottom bottom`,
					onUpdate: handleUpdate,
				});
			});
		});
	}
}
export class FramesStack {
	constructor(target, options = {}) {
		this.vars = options;
		this.dom = { root: getTargetElem(target) };
		this.dom.frames = Array.from(this.dom.root.querySelectorAll(".frames-stack__frame"));
		this.frames = this.dom.frames.map((elem, idx) => new Frame(elem, this, idx));
		this.dockingTracker = new DockingTracker(this);
		this.dockingTracker.reset();
	}
	// Смещение фрейма по центу декорации
	getShift() {
		return gsap.getProperty(this.dom.root, "--shift");
	}
	// Смещение всей композиции от низа окна просмотра
	getBaseShift() {
		return gsap.getProperty(this.dom.root, "--base-shift");
	}
	getBasePaddingTop() {
		return gsap.getProperty(this.dom.root, "--base-padding-top");
	}
	getVisibleAreaHeight() {
		return this.frames[0].getDecorHeight() / 2 + this.getShift() * (this.frames.length - 1) + this.getBaseShift();
	}
}