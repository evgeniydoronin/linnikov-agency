import KeenSlider from 'keen-slider';

document.addEventListener("DOMContentLoaded", init);

function init() {
	initSlider();
}
function initSlider() {
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