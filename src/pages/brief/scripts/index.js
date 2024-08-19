
import { BriefForm } from "../../../shared/components/forms.js";
import { RangeInput } from "../../../shared/components/range-input.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
	initSliders();
	new BriefForm("#brief-form");
}
function initSliders() {
	const options = {
		steps: 10,
		breakpoints: {
			"(max-width: 768px)": {
				steps: 5
			}
		}
	};
	document.querySelectorAll("#identification-chars input[type=range]")
		.forEach(elem => new RangeInput(elem, options));
}