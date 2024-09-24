import KeenSlider from 'keen-slider';
import { AnimatedIcon } from '../../../shared/components/animatedIcon.js';
import debounce from 'lodash.debounce';

const { observable, action, computed, autorun } = mobx;

document.addEventListener("DOMContentLoaded", init);
class IdeasAnimation {
	constructor(root) {
		this.dom = {
			root,
			body: root.querySelector(".la-archetypes-ideas__body"),
			slider: root.querySelector(".la-archetypes-ideas__slider")
		};
		this.progressBar = new SliderProgressBar(document.querySelector(".la-archetypes-ideas__progress-bar"), {
			slidesNumber: 3,
			activeSlide: 0,
		});
		window.app.windowResizeObserver.on("resize", () => this.onResize());
		this.rebuild();
	}
	onResize() {
		this.rebuild();
	}
	rebuild = debounce(() => {
		this.ctx?.revert();
		this.ctx = gsap.context(() => {
			const sliderWidth = this.dom.body.offsetWidth;
			gsap.set(".la-archetypes-ideas__slide", {
				width: `${sliderWidth}px`
			});
			ScrollTrigger.create({
				trigger: this.dom.root,
				start: "top top",
				end: "bottom bottom",
				markers: true,
				onUpdate: (self) => {
					if (self.progress === 0) {
						gsap.to(".la-archetypes-ideas__slider", {
							x: 0,
							duration: 0.5,
						});
						this.progressBar.setActiveSlide(0);
					} else if (self.progress < 0.5) {
						gsap.to(".la-archetypes-ideas__slider", {
							x: `-${sliderWidth + window.innerWidth * 0.15}px`,
							duration: 0.5,
						});
						this.progressBar.setActiveSlide(1);
					} else {
						gsap.to(".la-archetypes-ideas__slider", {
							x: `-${sliderWidth * 2 + window.innerWidth * 0.3}px`,
							duration: 0.5,
						});
						this.progressBar.setActiveSlide(2);
					}
				}
			});
			function calcThumbShift(activeSlide) {
				return (this.width - this.thumbWidth) / 2 * activeSlide;
			}
		});
	}, 25);
}
class SliderProgressBar {
	@observable accessor width = null;
	@observable accessor slidesNumber = null;
	@observable accessor activeSlide = null;
	constructor(root, initialState) {
		this._dom = { root, thumb: root.querySelector(".slider-progress-bar__thumb") };
		this.setWidth(this._dom.root.offsetWidth);
		this.setSlidesNumber(initialState.slidesNumber);
		this.setActiveSlide(initialState.activeSlide);
		this.init();
	}
	init() {
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
}
class IdeaFrame {
	constructor(root) {
		this.fig = root.querySelector(`[data-component="animated-icon"]`);
		this.animation = new AnimatedIcon(this.fig);
		this.animation.restart(true);
	}
}
function init() {
	initMainSlider();
	let docAnimationActivated = false;
	initIdeasAnimation();
	new IdeasAnimation(document.querySelector("#ideas-animation"));
	const docAnimationElem = document.querySelector("#doc-animation");
	const docAnimation = new AnimatedIcon(docAnimationElem);
	const observer = new IntersectionObserver((entries) => {
		if (entries[0]?.isIntersecting && !docAnimationActivated) {
			docAnimationActivated = true;
			docAnimation.restart(false);
		}
	}, { threshold: 0 });
	observer.observe(docAnimationElem);
}
function initIdeasAnimation() {
	// const root = document.querySelector("#ideas-slider");
	// const slider = new KeenSlider(
	// 	root.querySelector(".la-slider__body"),
	// 	{
	// 		selector: ".la-slider__slide",
	// 	}
	// );
	document.querySelectorAll(".la-archetypes-ideas .la-idea-frame")
		.forEach(slide => new IdeaFrame(slide));

	gsap.createCo
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