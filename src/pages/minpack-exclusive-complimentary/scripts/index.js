
document.addEventListener("DOMContentLoaded", init);

function init() {
	document.querySelector("#to-booking")
		.addEventListener("click", () => lenis.scrollTo('#booking', { offset: -50 }));
}