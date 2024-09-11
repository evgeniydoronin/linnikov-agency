import KeenSlider from 'keen-slider';
import { AnimatedIcon } from '../../../shared/components/animatedIcon.js';

const { observable, action, computed, autorun } = mobx;

document.addEventListener("DOMContentLoaded", init);
class SliderProgressBar {
	@observable accessor width = null;
	@observable accessor slidesNumber = null;
	@observable accessor activeSlide = null;
	constructor(root, slider) {
		this._dom = { root, thumb: root.querySelector(".slider-progress-bar__thumb") };
		this._slider = slider;
		this.init();
	}
	init() {
		this.setSlidesNumber(this._slider.slides.length);
		this.setActiveSlide(this._slider.track.details.rel);
		this.setWidth(this._dom.root.offsetWidth);
		this._slider.on("optionsChanged", () => this.setSlidesNumber(this._slider.slides.length));
		this._slider.on("slideChanged", () => this.setActiveSlide(this._slider.track.details.rel));
		autorun(() => this._dom.root.style.setProperty("--slides-number", this.slidesNumber));
		autorun(() => this._dom.root.style.setProperty("--active-slide", this.activeSlide));
		autorun(() => this._dom.root.style.setProperty("--thumb-width", `${this.thumbWidth}px`));
		autorun(() => this._dom.root.style.setProperty("--thumb-shift", `${this.thumbShift}px`));
		window.app.resizeObserver.observe(this._dom.root, () => this.setWidth(this._dom.root.offsetWidth));
	}
	@action
	setSlidesNumber(next) {
		this.slidesNumber = next;
	}
	@action
	setActiveSlide(next) {
		this.activeSlide = next;
	}
	@action
	setWidth(next) {
		this.width = next;
	}
	@computed
	get thumbWidth() {
		return Math.min(this.width, Math.max(100, this.width / this.slidesNumber));
	}
	@computed
	get thumbShift() {
		return this.slidesNumber > 1 ? (this.width - this.thumbWidth) / (this.slidesNumber - 1) * this.activeSlide : 0;
	}
	update() {

	}
}
class IdeaFrame {
	@observable accessor sliderAnimationCompleted = true;
	@observable accessor active = false;
	constructor(root, slider) {
		this.fig = root.querySelector(`[data-component="animated-icon"]`);
		this.animation = new AnimatedIcon(this.fig);
		const isActive = () => slider.slides[slider.track.details.rel] === root;
		this.setActive(isActive());
		slider.on("animationStarted", () => this.setSliderAnimationCompleted(false));
		slider.on("animationEnded", () => this.setSliderAnimationCompleted(true));
		slider.on("slideChanged", () => this.setActive(isActive()));

		autorun(() => {
			if (this.active && this.sliderAnimationCompleted) {
				this.animation.restart(true);
			} else {
				this.animation.stop();
			}
		})
	}
	@action
	setSliderAnimationCompleted(next) {
		this.sliderAnimationCompleted = next;
	}
	@action
	setActive(next) {
		this.active = next;
	}
}
function init() {
	initMainSlider();
	const ideasSlider = initIdeasSlider();
}
function initIdeasSlider() {
	const root = document.querySelector("#ideas-slider");
	const slider = new KeenSlider(
		root.querySelector(".la-slider__body"),
		{
			selector: ".la-slider__slide",
		}
	);
	slider.slides.forEach(slide => new IdeaFrame(slide, slider));
	const progressBar = new SliderProgressBar(root.querySelector(".slider-progress-bar"), slider);
	return slider;
}
function initMainSlider() {
	const slider = new KeenSlider(
		'#archetypes-slider',
		{
			loop: true,
			renderMode: "custom",
		},
		[radialSlider]
	);
	window.archSlider = slider;
	initNavBtn("#archetypes-slider-next", "next");
	initNavBtn("#archetypes-slider-prev", "prev");
	initCategoryNav();

	function initNavBtn(selector, type) {
		const btnElem = document.querySelector(selector);
		btnElem.addEventListener("click", (event) => {
			slider[type]();
		});
	}
	function initCategoryNav() {
		toCategoryByHash();
		window.addEventListener("hashchange", () => toCategoryByHash());

		function toCategoryByHash() {
			const currentHash = getCurrentHash();
			if (currentHash.length) toCategory(currentHash);
		}
		function toCategory(category) {
			const slideElem = slider.container.querySelector(`[data-anchor=${category}]`);
			if (!slideElem) return;
			slider.moveToIdx(Number(slideElem.getAttribute("data-idx")));
		}
		function getCurrentHash() {
			return location.hash.slice(1);
		}
	}
}
const radialSlider = (slider) => {
  function updateStyles() {
		slider.slides.forEach((element, idx) => {
			const { slides: slidesState } = slider.track.details;
				//console.log(JSON.stringify(slider.track.details));
			element.style.transform = `rotateZ(${slidesState[idx].distance * 7.5}deg)`;
		});
  }
  slider.on("created", () => {
    slider.slides.forEach((element, idx) => {
			element.style.setProperty("transform-origin", "50% 3000px");
			element.setAttribute("data-idx", idx);
		});
    updateStyles();
  })
  slider.on("detailsChanged", updateStyles)
}