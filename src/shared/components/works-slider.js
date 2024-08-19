import { getTargetElem } from "../scripts/utils.js";

const { computed, observable, action, autorun } = mobx;
export class WorksSlider {
	@observable accessor viewOffset = 0;
	@observable accessor mode = null;
	@observable accessor direction = null;
	@observable accessor gesturesActive = true;
	@observable accessor inView = 0;
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.body = this.dom.root.querySelector(`[data-elem="works-slider.body"]`);
		this.dom.prev = this.dom.root.querySelector(`[data-elem="works-slider.prev"]`);
		this.dom.next = this.dom.root.querySelector(`[data-elem="works-slider.next"]`);
		this.dom.slides = Array.from(this.dom.root.querySelectorAll(`[data-elem="works-slider.slide"]`));
		this.disableDrugging();
		this.initModeSetter();
		this.initInViewTracker();
		this.initGestures();
		this.initAction();
		window?.app?.resizeObserver.on("resize", () => this.onViewportResize());
		this.dom.root.classList.add("_initialized");
		setTimeout(() => this.initAnimation(), 0);
	}
	initInViewTracker() {
		ScrollTrigger.create({
			trigger: this.dom.root,
			start: `top-=${window.innerWidth > 768 ? 160 : 100}px top`,
			end: "bottom top",
			onToggle: (self) => this.setInView(self.isActive),
		})
	}
	onViewportResize() {
		gsap.set(this.nextSlides, { translateX: `${this.dom.body.offsetWidth}px` });
		gsap.set(this.prevSlides, { translateX: `${-this.dom.body.offsetWidth}px` });
	}
	disableDrugging() {
		this.dom.slides.forEach(elem => elem.setAttribute("draggable", "false"));
	}
	initGestures() {
		Observer.create({
			target: this.dom.root,
			type: "touch, pointer",
			axis: "x",
			lockAxis: true,
			onLeft: () => this.onGesture(() => this.next()),
			onRight: () => this.onGesture(() => this.prev()),
			onRelease: () => gsap.set(this.dom.root, { pointerEvents: "all" }),
			onPress: () => this.setGesturesActive(true),
		});
	}
	onGesture(callback) {
			console.log("onGesture");
		if (!this.gesturesActive) return;
		gsap.set(this.dom.root, { pointerEvents: "none" });
		callback();
		this.setGesturesActive(false);
	}
	initAction() {
		this.dom.prev.addEventListener("click", () => this.prev());
		this.dom.next.addEventListener("click", () => this.next());
	}
	@action
	setGesturesActive(next) {
			console.log("setGesturesActive", next);
		this.gesturesActive = next;
	}
	@action
	setDirection(next) {
		this.direction  = next;
	}
	@action
	setMode(next) {
		this.mode  = next;
	}
	@action
	setInView(next) {
		this.inView  = next;
	}
	@action
	setViewOffset(next) {
		this.viewOffset = next;
	}
	@computed
	get realViewOffset() {
		return this.viewOffset % this.dom.slides.length;
	}
	@computed
	get slidesPerView() {
		return this.mode === "mob" ? 1 : 2;
	}
	@computed
	get prevSlides() {
		const res = [];
		for (var i = 1; i <= this.slidesPerView; i++) {
			res.push(this.dom.slides.at((this.realViewOffset - i) % this.dom.slides.length));
		}
		return res;
	}
	@computed
	get activeSlides() {
		const res = [];
		for (var i = 0; i < this.slidesPerView; i++) {
				console.log(`i: ${i}, this.realViewOffset: ${this.realViewOffset}, number: ${this.dom.slides.length}`);
			res.push(this.dom.slides.at((this.realViewOffset + i) % this.dom.slides.length));
		}
		return res;
	}
	@computed
	get nextSlides() {
		const res = [];
		for (var i = 0; i < this.slidesPerView; i++) {
			const idx = (this.realViewOffset + this.slidesPerView + i) % this.dom.slides.length;
			res.push(this.dom.slides.at(idx));
		}
		return res;
	}
	initAnimation() {
		autorun(() => {
			this.tweens = [];
			gsap.set(this.dom.slides, { opacity: 0 });
			gsap.set(this.nextSlides.concat(this.prevSlides).concat(this.activeSlides), { opacity: 1 });
			console.log(this.prevSlides, this.activeSlides, this.nextSlides);
			if (this.direction === "forward") {
				gsap.set(this.nextSlides, { translateX: `${this.dom.body.offsetWidth}px` });
				this.tweens.push(gsap.to(this.activeSlides, {
					keyframes: [
						{ scale: 0.9, duration: 0.1 },
						{ translateX: 0, scale: 0.9, duration: 0.2 },
						{ translateX: 0, scale: 1, duration: 0.1 },
					]
				}));
				this.tweens.push(gsap.to(this.prevSlides, {
					keyframes: [
						{ scale: 0.9, duration: 0.1 },
						{ translateX: `${-this.dom.body.offsetWidth}px`, scale: 0.9, duration: 0.2 },
						{ translateX: `${-this.dom.body.offsetWidth}px`, scale: 1, duration: 0.1 },
					]
				}));
			} else {
				gsap.set(this.prevSlides, { opacity: 1, translateX: `${-this.dom.body.offsetWidth}px` });
				//gsap.set(this.nextSlides, { opacity: 1 });
				this.tweens.push(gsap.to(this.activeSlides, {
					keyframes: [
						{ scale: 0.9, duration: 0.1 },
						{ translateX: 0, scale: 0.9, duration: 0.2 },
						{ translateX: 0, scale: 1, duration: 0.1 },
					]
				}));
				this.tweens.push(gsap.to(this.nextSlides, {
					keyframes: [
						{ scale: 0.9, duration: 0.1 },
						{ translateX: `${this.dom.body.offsetWidth}px`, scale: 0.9, duration: 0.2 },
						{ translateX: `${this.dom.body.offsetWidth}px`, scale: 1, duration: 0.1 },
					]
				}));
			}
		});
	}
	initModeSetter() {
		const media = matchMedia("(max-width: 768px)");
		const handleChange = ({ matches }) => this.setMode(matches ? "mob" : "desc");
		media.addEventListener("change", handleChange);
		handleChange(media);
	}
	@action
	next() {
		this.setViewOffset(this.viewOffset + this.slidesPerView);
		this.setDirection("forward");
	}
	@action
	prev() {
		this.setViewOffset(this.viewOffset - this.slidesPerView);
		this.setDirection("backward");
	}
}