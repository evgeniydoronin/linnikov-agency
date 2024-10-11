import TripleMsgDecorAnimation from "../../../shared/components/triple-msg-decor-animation.js"

document.addEventListener("DOMContentLoaded", init);

function init() {
	const msgAnimation = new TripleMsgDecorAnimation(document.querySelector("#title"));
	document.querySelector("#to-booking")
		.addEventListener("click", () => lenis.scrollTo('#booking', { offset: -50 }));
}