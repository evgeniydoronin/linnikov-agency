export default function initAnimatedSeparators() {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(({ target, isIntersecting }) => {
			if (isIntersecting && !target.classList.contains("active")) target.classList.add("active");
		});
	}, {
		rootMargin: "0px 0px -10%",
		threshold: 1,
	});
	document.querySelectorAll(".animated-separator").forEach(elem => observer.observe(elem));
}