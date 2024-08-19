import { NewsGrid } from "../../../shared/components/materials-grid.js";
import { SignUpForm } from "../../../shared/components/forms.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
	new NewsGrid("#news-grid", { filter: "panel" });
	new SignUpForm("#sign-up-form");
}