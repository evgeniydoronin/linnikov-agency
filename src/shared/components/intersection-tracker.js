import { getTargetElem } from "../scripts/utils.js";

function track(target, threshold = 0.01) {
	const targetElem = getTargetElem(target);
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(({ target, isIntersecting }) => {
			target.classList.toggle("is-intersecting", isIntersecting);
		})
	}, { threshold });
	observer.observe(targetElem);
}

export function initIntersectionTracking() {
	document.querySelectorAll("[data-track-intersection]").forEach(elem => {
		const threshold = elem.getAttribute("data-track-intersection");
		track(elem, threshold && Number(threshold));
	});
}