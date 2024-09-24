import { getTargetElem } from "../../../shared/scripts/utils.js";
import { throttle } from "../../../shared/scripts/patterns/throttle.js";
import EventEmitter from "../../../shared/scripts/patterns/EventEmitter.js";

function createAnimationFrameLoop(callback) {
	let id = null, canceled = false;
	const innerCallback = (ts) => {
		callback(ts);
		if (!canceled) id = requestAnimationFrame(innerCallback);
	}
	id = requestAnimationFrame(innerCallback);
	return {
		cancel: () => {
				canceled = true;
				cancelAnimationFrame(id);
			}
	}
}

const zoomTransition = 0.4;
const initialForce = 0.3;
const handlers = {
	pointerdown: function({ clientX, clientY }) {
		this.state.pointerTracking = true;
		this.state.pointerStart = { left: clientX, top: clientY };
		this.moveEventsCache.clean();
		this.state.lastPointerPosition = this.state.pointerStart;
		this.state.scrollLeftStump = this.state.scrollLeft;
		this.state.pointerDown = true;
		document.addEventListener(`${app.state.pointerType}up`, this.pointerUpHandler, { passive: false });
		if (app.state.pointerType === "pointer") {
			document.addEventListener(`pointercancel`, this.pointerCancelHandler);
		}
	},
	pointermove: function(event) {
		const { clientX, clientY, buttons, target } = event;
		if (target.matches("[data-zs-elem*=slide]") || target.closest("[data-zs-elem*=slide]")) {
			if (!this.slow) {
				this.slow = true;
				//if (this.state.swipeInertion < this.state.force) this.state.swipeInertion = this.state.force;
			}
		} else {
			this.slow = false;
		}
		this.state.lastPointerPosition = { left: clientX, top: clientY };
		this.moveEventsCache.add(event);
		if (!this.state.pointerTracking) return;
		if (!(buttons & 1)) {
			this.stopPointerTracking();
		}
		// Нужно определить, будет ли взаимодействие указателя ассоциировано со слайдером, и если да, то отменить поведение по умолчанию
		if (this.isDraged(event)) {
			event.preventDefault();
			const prevEvent = this.moveEventsCache.getBeforeLast();
			if (!prevEvent) return;
			const movementX = clientX - prevEvent.clientX;
			this.hardScroll({ left: movementX });
		}
	},
	pointerup: function(event) {
		const { clientX, clientY } = event;
		this.state.pointerDown = false;
		if (this.dragging) {
			// Calc force
			this.state.swipeInertion = this.moveEventsCache.calcSwipeInertion(event);
			this.dragging = false;
			const preventHandler = (event) => event.preventDefault();
			this.dom.body.addEventListener(`click`, preventHandler, true);
			setTimeout(() => this.dom.body.removeEventListener(`click`, preventHandler, true), 0);
		}
		this.stopPointerTracking();
	},
	pointercancel: function(event) {
		this.state.pointerDown = false;
		this.dragging = false;
		this.stopPointerTracking();
		document.removeEventListener(`pointercancel`, this.pointerCancelHandler);
	}
}
class ZoomTransition {
	canceled = false;
	constructor(slider, to) {
		this.slider = slider;
		this.from = this.slider.currentZoom;
		this.slider.currentZoom = to;
		this.to = to;
		this.transition = `x${this.from}->x${this.to}`;
	}
	selectFrameSlides() {
		const saveSpace = window.innerWidth * 0.2;
		const leftEdge = -saveSpace;
		const rightEdge = window.innerWidth + saveSpace;
		const slides = this.slider.getSlides();
		return slides.filter(elem => {
			const elemBcr = elem.getBoundingClientRect();
			return elemBcr.left > leftEdge && elemBcr.right < rightEdge;
		});
	}
	alignFrames() {
		const anchorSlide = this.srcFrameSlides[0];
		const srcBcr = this.srcSnapshot.get(anchorSlide);
		const destBcr = anchorSlide.getBoundingClientRect();
		this.slider.setScroll(this.slider.state.scrollLeft + destBcr.left - srcBcr.left);
	}
	async exec() {
		this.slider.pause();
		try {
			for await(const _ of this.nextStep());
		} catch(ex) {
			console.info("Canceled zoom tansition");
		}
		if (!this.canceled) this.finnaly();
	}
	async * nextStep() {
		if (this.canceled) return;
		if (!this.from) {
			this.slider.dom.root.setAttribute("data-current-zoom", `x${this.to}`);
			return;
		}
		switch(this.transition) {
			case "x2->x1":
			case "x1->x2":
				// Step 1;
				yield await new Promise((resolve, reject) => {
					this.srcFrameSlides = this.selectFrameSlides();
					this.srcSnapshot = this.getFrameBcrSnapshot(this.srcFrameSlides);
					this.slider.dom.root.setAttribute("data-current-zoom", `x${this.to}`);
					requestAnimationFrame(() => {
						this.alignFrames();
						if (this.canceled) reject(); else resolve();
					});
				});
				// Step 2;
				yield await new Promise((resolve, reject) => {
						this.destFrameSlides = this.selectFrameSlides();
						this.destSnapshot = this.getFrameBcrSnapshot(this.destFrameSlides);
						// С
						// Hide slides from x1
						this.destFrameSlides.forEach(elem => {
							if (this.srcSnapshot.has(elem)) return;
							elem.style.opacity = "0";
						});
						// Animate slides from old position
						const srcSnapshotElems = Array.from(this.srcSnapshot.keys());
						// Slides to be animated different way, will be just moved to their new positions
						const inFrameAnimationSlides = [srcSnapshotElems[2], srcSnapshotElems[3]];
						let style = "";
						// Other slides just go outside of frame
						const translateXDist = window.innerWidth * 1.4;
						srcSnapshotElems.forEach((elem, idx) => {
							const destBcr = elem.getBoundingClientRect();
							const srcBcr = this.srcSnapshot.get(elem);
							const scale = srcBcr.width / destBcr.width;
							if (inFrameAnimationSlides.includes(elem)) {
								style += `
									@keyframes zoom-transition-p${idx} {
										0% { transform: translate(${srcBcr.left - destBcr.left}px, ${srcBcr.top - destBcr.top}px) scale(${scale});  }
										100% { transform: translate(${(srcBcr.left - destBcr.left) / 2}px, ${(srcBcr.top - destBcr.top) / 2}px) scale(${scale + (1 - scale) / 2}); }
									}
								`;
							} else {
								style += `
									@keyframes zoom-transition-p${idx} {
										0% { transform: translate(${srcBcr.left - destBcr.left}px, ${srcBcr.top - destBcr.top}px); }
										100% { transform: translate(${translateXDist}px, ${srcBcr.top - destBcr.top}px); }
									}
								`;
							}
						});
						requestAnimationFrame(() => {
							this.slider.dom.style.textContent = style;
							srcSnapshotElems.forEach((elem, idx) => {
								elem.style.animation = `${zoomTransition * 0.5 }s linear forwards zoom-transition-p${idx}`;
							});
						});
						setTimeout(() => {
							if (this.canceled) {
								reject();
							} else {
								this.cleanFrameAnimations(this.destFrameSlides);
								resolve();
							}
						}, zoomTransition * 500);
					});
				// Step 3;
				if (this.canceled) return;
				return await new Promise((resolve) => {
					const translateXDist = window.innerWidth * 1.4;
					// Animate slides from old position
					const srcSnapshotElems = Array.from(this.srcSnapshot.keys());
					// Slides to be animated different way, will be just moved to their new positions
					const inFrameAnimationSlides = [srcSnapshotElems[2], srcSnapshotElems[3]];
					let style = `
						@keyframes zoom-transition-step-2-c {
							0% { transform: translateX(${translateXDist}px); }
							100% { transform: translateX(0px); }
						}
					`;
					this.destFrameSlides.forEach((elem, idx) => {
						const destBcr = this.destSnapshot.get(elem);
						if (inFrameAnimationSlides.includes(elem)) {
							const srcBcr = this.srcSnapshot.get(elem);
							const scale = srcBcr.width / destBcr.width;
							style += `
								@keyframes zoom-transition-step-2-p${idx} {
									0% { transform: translate(${(srcBcr.left - destBcr.left) / 2}px, ${(srcBcr.top - destBcr.top) / 2}px) scale(${scale + (1 - scale) / 2}); }
									100% { transform: translate(0px, 0px) scale(1); }
								}
							`;
						}
						elem.style.opacity = "1";
					});
					this.slider.dom.style.textContent = style;
					this.destFrameSlides.forEach((elem, idx) => {
						if (inFrameAnimationSlides.includes(elem)) {
							elem.style.animation = `${zoomTransition * 0.5 }s linear zoom-transition-step-2-p${idx}`;
						} else {
							elem.style.animation = `${zoomTransition * 0.5 }s linear zoom-transition-step-2-c`;
						}
					});
					setTimeout(() => {
						this.destFrameSlides.forEach((elem) => {
							elem.style.animation = "";
						});
						resolve();
					}, zoomTransition * 500);
				});
			case "x1->x3":
			case "x2->x3":
				// Step 1;
				yield await new Promise((resolve) => {
					this.srcFrameSlides = this.selectFrameSlides();
					const lastSlideIdx = this.srcFrameSlides.length - 1;
					const lastSlideBcr = this.srcFrameSlides[lastSlideIdx].getBoundingClientRect();
					const translateXDist = window.innerWidth * 1.4;
					const translateYDist = window.innerHeight / ((lastSlideBcr.top + lastSlideBcr.height / 2) < window.innerHeight / 2 ? 2 : -2);
					
					const style = `
						@keyframes zoom-transition-p1 {
							0% { transform: translateX(0px); }
							100% { transform: translateX(${translateXDist}px); }
						}
						@keyframes zoom-transition-p2 {
							0% { transform: translateY(0px); }
							100% { transform: translateY(${translateYDist}px); }
						}
					`;
					this.slider.dom.style.textContent = style;
					
					this.srcFrameSlides.slice(0, lastSlideIdx).forEach(elem => {
						elem.style.animation = `${zoomTransition * 0.5 }s linear zoom-transition-p1`;
					});
					this.srcFrameSlides[lastSlideIdx].style.animation = `${zoomTransition * 0.5 }s ease-in zoom-transition-p2`;
					setTimeout(() => resolve(), zoomTransition * 500);
				});
				// Step 2;
				if (this.canceled) return;
				this.slider.dom.root.setAttribute("data-current-zoom", `x${this.to}`);
				this.cleanFrameAnimations(this.srcFrameSlides);
				this.cleanStyles();
				yield;
				if (this.canceled) return;
				// Step 3;
				return await new Promise((resolve) => {
					this.srcFrameSlides = this.selectFrameSlides();
					const translateXDist = window.innerWidth * 1.4;
					const style = `
						@keyframes zoom-transition {
							0% { transform: scale(0.5) translateX(${translateXDist}px); }
							80% { transform: scale(0.5) translateX(0px); }
							100% { transform: scale(1) translateX(0px); }
						}
					`;
					this.slider.dom.style.textContent = style;
					this.srcFrameSlides.forEach(elem => {
						elem.style.animation = `${zoomTransition * 0.5}s ease-out zoom-transition`;
					});
					setTimeout(() => resolve(), zoomTransition * 500);
				});
			case "x3->x1":
			case "x3->x2":
				// Step 1;
				yield await new Promise((resolve) => {
					this.srcFrameSlides = this.selectFrameSlides();
					const translateXDist = window.innerWidth * 1.4;
					const style = `
						@keyframes zoom-transition {
							0% { transform: scale(0) translateX(0px); }
							10% { transform: scale(0.5) translateX(0px); }
							100% { transform: scale(0.5) translateX(${translateXDist}px); }
						}
					`;
					this.slider.dom.style.textContent = style;
					this.srcFrameSlides.forEach(elem => {
						elem.style.animation = `${zoomTransition * 0.5}s linear zoom-transition`;
					});
					setTimeout(() => resolve(), zoomTransition * 500);
				});
				if (this.canceled) return;
				// Step 2;
				this.slider.dom.root.setAttribute("data-current-zoom", `x${this.to}`);
				this.cleanFrameAnimations(this.srcFrameSlides);
				this.cleanStyles();
				yield;
				if (this.canceled) return;
				// Step 3;
				return await new Promise((resolve) => {
					this.srcFrameSlides = this.selectFrameSlides();
					const lastSlideIdx = this.srcFrameSlides.length - 1;
					const lastSlideBcr = this.srcFrameSlides[lastSlideIdx].getBoundingClientRect();
					const translateXDist = window.innerWidth * 1.4;
					const translateYDist = window.innerHeight / ((lastSlideBcr.top + lastSlideBcr.height / 2) < window.innerHeight / 2 ? 2 : -2);
					
					const style = `
						@keyframes zoom-transition-p1 {
							0% { transform: translateX(${translateXDist}px); }
							100% { transform: translateX(0px); }
						}
						@keyframes zoom-transition-p2 {
							0% { transform: translateY(${translateYDist}px); }
							100% { transform: translateY(0px); }
						}
					`;
					this.slider.dom.style.textContent = style;
					
					this.srcFrameSlides.slice(0, lastSlideIdx).forEach(elem => {
						elem.style.animation = `${zoomTransition * 0.5 }s linear zoom-transition-p1`;
					});
					this.srcFrameSlides[lastSlideIdx].style.animation = `${zoomTransition * 0.66 }s ease-out zoom-transition-p2`;
					setTimeout(() => resolve(), zoomTransition * 500);
				});
		}
	}
	getFrameBcrSnapshot(frame) {
		const map = new Map();
		frame.forEach(elem => map.set(elem, elem.getBoundingClientRect()));
		return map;
	}
	finnaly() {
		this.cleanFrameAnimations(this.srcFrameSlides);
		this.cleanFrameAnimations(this.destFrameSlides);
		this.cleanStyles();
		this.slider.dom.root.setAttribute("data-current-zoom", `x${this.to}`);
		this.slider.resume();
	}
	cleanStyles() {
		this.slider.dom.style.textContent = "";
	}
	cleanFrameAnimations(frame) {
		if (!frame) return;
		frame.forEach(elem => { elem.style.animation = null; elem.style.opacity = null; });
	}
	cancel() {
		this.canceled = true;
		this.finnaly();
	}
}
class SlidesDuplicator {
	executed = false;
	wrapperReplica = null;
	static hasEnoughWidth(container) {
		const frameWidth = window.innerWidth * 1.1;
		const bcr = container.getBoundingClientRect();
		return bcr.width > frameWidth;
	}
	constructor(slider) {
		this.slider = slider;
		this.originalSlides = slider.dom.wrapper.querySelectorAll("[data-zs-elem*=slide]:not([data-zs-elem*=duplicate])");
		this.srcIdxForInitial = 0; // Копируем отсюда, когда размера оригинального враппера не хватает для закрытия окна просмотра
		this.srcIdxForReplica = 0; // Копируем отсюда, когда размера копии враппера не хватает для закрытия окна просмотра
		this.addWrapperReplica();
	}
	// Копировать слайды до тех пор, пока ширины фрейма уникальных слайдов и дублированных слайдов не станет хватать на два экрана
	// Так-же копий должно хватать как минимум на ширину экрана
	// Передергивать механизм по изменению ширины экрана и по изменению зума в большую сторону
	addWrapperReplica() {
		if (this.wrapperReplica) return;
		const { body, wrapper } = this.slider.dom;
		this.wrapperReplica = document.createElement("div");
		this.wrapperReplica.setAttribute("data-zs-elem", "wrapper, replica");
		this.wrapperReplica.classList.add("zoom-slider__wrapper-replica");
		body.append(this.wrapperReplica);
	}
	extendInitialWrapper() {
		const original = this.originalSlides[this.srcIdxForInitial];
		const duplicate = original.cloneNode(true);
		duplicate.setAttribute("data-zs-elem", "slide, duplicate");
		this.slider.dom.wrapper.append(duplicate);
		if (this.srcIdxForInitial < this.originalSlides.length - 1) {
			this.srcIdxForInitial += 1;
		} else {
			this.srcIdxForInitial = 0;
		}
	}
	extendWrapperReplica() {
		const original = this.originalSlides[this.srcIdxForReplica];
		const duplicate = original.cloneNode(true);
		duplicate.setAttribute("data-zs-elem", "slide, duplicate");
		this.wrapperReplica.append(duplicate);
		if (this.srcIdxForReplica < this.originalSlides.length - 1) {
			this.srcIdxForReplica += 1;
		} else {
			this.srcIdxForReplica = 0;
		}
	}
	exec() {
		if (this.executed) return;
		const worker = () => {
			this.executed = true;
			const { wrapper } = this.slider.dom;
			if (SlidesDuplicator.hasEnoughWidth(this.wrapperReplica) &&
				SlidesDuplicator.hasEnoughWidth(wrapper)) return this.executed = false;
			if (!SlidesDuplicator.hasEnoughWidth(this.wrapperReplica)) {
				this.extendWrapperReplica();
			}
			if (!SlidesDuplicator.hasEnoughWidth(wrapper)) {
				this.extendInitialWrapper();
			}
			requestAnimationFrame(worker);
		}
		worker();
	}
}
class MoveEventsCache {
	cache = [];
	clean() {
		this.cache = [];
	}
	add(event) {
		if (this.cache.length > 5) this.cache.shift();
		this.cache.push(event);
	}
	calcSwipeInertion(pointerUpEvent) {
		if (!this.cache.length) return 0;
		const timeDiff = pointerUpEvent.timeStamp - this.cache[0].timeStamp;
		const movementX = pointerUpEvent.clientX - this.cache[0].clientX;
		return -movementX / timeDiff * 20;
	}
	getBeforeLast() {
		return this.cache[this.cache.length - 2];
	}
}
class ZoomSlider extends EventEmitter {
	state = {
		force: initialForce,
		swipeInertion: 0,
		pointerTracking: false,
		dragged: false,
		animation: false,
		status: "idle",
		scrollLeft: 0,
		lastRecalc: null,
		prevBodyHeight: null,
		prevBodyWidth: null,
	}
	moveEventsCache = new MoveEventsCache();

	constructor(target) {
		super();
		this.dom = {
			root: getTargetElem(target)
		}
		this.dom.body = this.dom.root.querySelector(`[data-zs-elem=body]`);
		this.dom.wrapper = this.dom.body.querySelector(`[data-zs-elem=wrapper]`);
		this.dom.style = this.dom.root.querySelector(`[data-zs-elem=style]`);
		this.bindEventHandlers();
		this.duplicator = new SlidesDuplicator(this);
		this.duplicator.exec();
		this.initResizeObserver();
		this.speedChangeByViewportSize();
		this.dom.root.classList.add("initialized");
	}
	get dragged() {
		return this.state.dragging;
	}
	set dragged(value) {
		this.state.dragging = value;
	}
	speedChangeByViewportSize() {
		const mediaMatch = matchMedia("(max-width: 992px)");
		const matchHandler = ({ matches }) => {
			if (matches) {
				this.state.force = initialForce * 2;
			} else {
				this.state.force = initialForce;
			}
		};
		mediaMatch.addListener(matchHandler);
		matchHandler(mediaMatch);
	}
	bindEventHandlers() {
		this.dom.body.addEventListener(`${app.state.pointerType}down`, this.pointerDownHandler, { passive: false });
		document.addEventListener(`${app.state.pointerType}move`, this.pointerMoveHandler, { passive: false });
		this.dom.body.addEventListener(`dragstart`, (e) => e.preventDefault(), { passive: false, capture: true });
		window.addEventListener(`resize`, throttle(() => this.duplicator.exec(), 25));
	}
	initResizeObserver() {
		this.resizeObserver = new ResizeObserver(() => this.resetSlidesSize());
		this.resizeObserver.observe(this.dom.root);
	}
	resetSlidesSize() {
		const bodyBcr = this.dom.body?.getBoundingClientRect();
		if (this.prevBodyHeight === bodyBcr?.height) return;
		this.dom.body.style.setProperty("--slide-size-l", `${bodyBcr.height * 0.6}px`);
		this.dom.body.style.setProperty("--slide-size-m", `${bodyBcr.height * 0.4}px`);
		this.dom.body.style.setProperty("--slide-size-s", `${bodyBcr.height * 0.2}px`);
		this.dom.body.style.setProperty("--slide-size-mm", `${bodyBcr.height * 0.333333}px`);
	}
	stopPointerTracking() {
		this.state.pointerTracking = false;
		//document.removeEventListener(`${app.state.pointerType}move`, this.pointerMoveHandler);
		document.removeEventListener(`${app.state.pointerType}up`, this.pointerUpHandler);
	}
	isDraged({ clientX, clientY }) {
		if (this.dragging) return true;
		if (Math.abs(this.state.pointerStart.left - clientX) < 4) return false;
		if (Math.abs(this.state.pointerStart.left - clientX) > Math.abs(this.state.pointerStart.top - clientY)) {
			return this.dragging = true;
		} else {
			return this.dragging = false;
		}
	}
	hardScroll({ left }) {
		const recalcScroll = this.recalcScrollOnEdge();
		this.setScroll(recalcScroll - left);
		this.emit("interaction");
	}
	setScroll(value) {
		this.state.scrollLeft = Math.max(0, value);
		//this.dom.body.scrollLeft = this.state.scrollLeft;
		//this.dom.body.style.transform = `translateX(${-this.state.scrollLeft}px)`;
		this.dom.body.style.setProperty("--translate-x", `${-this.state.scrollLeft}px`);
	}
	recalcScrollOnEdge() {
		const wrapperReplica = this.duplicator.wrapperReplica;
		const wrapperReplicaBcr = wrapperReplica.getBoundingClientRect();
		const wrapper = this.dom.wrapper;
		const wrapperBcr = wrapper.getBoundingClientRect();
		if (wrapperReplicaBcr.right <= window.innerWidth || wrapperBcr.left >= -10) {
			if (wrapperBcr.left >= -10) { // Go to duplicate
				return this.state.scrollLeft + wrapperReplicaBcr.left - wrapperBcr.left;
			} else { // Return to original
				return this.state.scrollLeft - wrapperReplicaBcr.left + wrapperBcr.left;
			}
		}
		return this.state.scrollLeft;
	}
	play() {
		if (this.state.status === "paused" || this.state.status === "idle") {
			this.state.status = "play";
			this.startAnimation();
		}
	}
	stop() {
		if (this.state.status === "paused" || this.state.status === "play") {
			this.state.status = "idle";
			this.stopAnimation();
		}
	}
	resume() {
		if (this.state.status === "paused") {
			this.startAnimation();
		}
	}
	pause() {
		if (this.state.status === "play") {
			this.state.status = "paused";
			this.stopAnimation();
		}
	}
	startAnimation() {
		const recalc = () => {
			this.state.scrollLeft = this.recalcScrollOnEdge();
			if (this.state.swipeInertion !== 0) {
				const sign = this.state.swipeInertion < 0 ? -1 : 1;
				this.state.swipeInertion = Math.floor(Math.abs(this.state.swipeInertion) / 1.1 * 10) / 10 * sign;
				this.state.scrollLeft += this.state.force + this.state.swipeInertion;
			} else {
				if (this.slow) {
					this.state.scrollLeft += this.state.force / 3;
				} else {
					this.state.scrollLeft += this.state.force;
				}
			}
			this.setScroll(this.state.scrollLeft);
		}
		const worker = () => {
			if (!this.state.animation) {
				clearInterval(this.intervalId);
				return;
			};
			if (!this.state.pointerDown) requestAnimationFrame(() => recalc());
		}
		clearInterval(this.intervalId);
		this.intervalId = setInterval(worker, 30);
		this.state.animation = true;
	}
	stopAnimation() {
		this.state.animation = false;
	}
	getSlides() {
		return Array.from(this.dom.body.querySelectorAll("[data-zs-elem*=slide]"));
	}
	setZoom(value) {
		if (this.currentTransition) this.currentTransition.cancel();
		this.currentTransition = new ZoomTransition(this, value);
		this.currentTransition.exec();
		// this.dom.root.setAttribute("data-prev-zoom", this.state.currentZoom ? `x${}` : "");
		// this.state.currentZoom = value;
		// this.dom.root.setAttribute("data-current-zoom", `x${this.state.currentZoom}`);
		// this.duplicator.exec();
	}
	pointerDownHandler = handlers.pointerdown.bind(this);
	pointerMoveHandler = handlers.pointermove.bind(this);
	pointerUpHandler = handlers.pointerup.bind(this);
	pointerCancelHandler = handlers.pointercancel.bind(this);
}
export class ZoomSliderControl {
	constructor(target, slider) {
		this.dom = {
			root: getTargetElem(target),
		}
		this.dom.bar = this.dom.root.querySelector("[data-zsc-bar]");
		this.dom.zoomOutBtn = this.dom.root.querySelector("[data-zsc-zoom-out-btn]");
		this.dom.zoomInBtn = this.dom.root.querySelector("[data-zsc-zoom-in-btn]");
		this.slider = slider;
		this.setZoom(1);
		this.dom.zoomOutBtn.addEventListener("click", () => this.zoomOut());
		this.dom.zoomInBtn.addEventListener("click", () => this.zoomIn());
		this.dom.bar.addEventListener("click", ({ clientX }) => {
			const barBcr = this.dom.bar.getBoundingClientRect();
			const diff = clientX - barBcr.left;
			this.setZoom(Math.ceil(diff / (barBcr.width / 3)).clamp(1, 3));
		});

		// Allways max zoom on mobile
		const mediaMatch = matchMedia("(max-width: 992px)");
		const matchHandler = ({ matches }) => {
			if (matches) {
				this.setZoom(3);
			}
		};
		mediaMatch.addListener(matchHandler);
		matchHandler(mediaMatch);
	}
	zoomOut() {
		if (this.currentZoom < 2) return;
		this.setZoom(this.currentZoom - 1);
	}
	zoomIn() {
		if (this.currentZoom > 2) return;
		this.setZoom(this.currentZoom + 1);
	}
	setZoom(value) {
		if (this.currentZoom === value) return;
		this.dom.root.setAttribute("data-prev-zoom", this.currentZoom ? `x${this.currentZoom}` : "");
		this.currentZoom = value;
		this.dom.root.setAttribute("data-current-zoom", `x${this.currentZoom}`);
		this.slider.setZoom(value);
	}
}
export default ZoomSlider;
