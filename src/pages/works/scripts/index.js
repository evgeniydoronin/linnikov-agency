import CardHoverHandler from "../../../shared/components/card-hover-handler.js";
import TopCases from "../../../shared/components/top-cases.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
	const topCases = new TopCases("#top-cases");
	new CardHoverHandler({
		container: topCases.dom.body,
		targetSelector: ".case-poster",
		className: "case-poster__title"
	});
}