export default function createDiagramAnimation(rootSelector) {
	// Diagram
	const setTopPath = gsap.quickSetter(`${rootSelector} .pie-diagram__edge`, "attr");
	const diagramTl = gsap.timeline({
		scrollTrigger: {
			trigger: rootSelector,
			start: "bottom-=40% bottom",
			toggleActions: "play none none reverse",
		}
	})
	diagramTl.fromTo(`${rootSelector} .pie-diagram__a`, {
		strokeDashoffset: `${-100 * Math.PI / 2}%`,
	}, {
		strokeDashoffset: `${-20 * Math.PI / 2}%`,
		ease: "power4.in",
		onUpdate: function() {
			const angle = Math.PI * 0.5 - this._ease(this.progress()) * (2 * Math.PI - 72 / 180 * Math.PI);
			setTopPath({ d: `M150 300 V150 L${150 + 150 * Math.cos(angle)} ${150 + 150 * Math.sin(angle)}` });
		},
		duration: 0.5,
	}, 0);
	diagramTl.fromTo(`${rootSelector} .pie-diagram__b`, {
		strokeDashoffset: `${-100 * Math.PI / 2}%`,
	}, {
		strokeDashoffset: `${-79.9 * Math.PI / 2}%`,
		ease: "none",
		duration: 0.15,
	}, 0.5);
	diagramTl.fromTo(`${rootSelector} .reveal-wrap__item`, {
		scaleY: 1.2,
		translateY: window.innerWidth > 1024 ? "1.8em" : "2.2em"
	}, {
		scaleY: 1,
		translateY: "0em",
		duration: 0.3,
	});
	return diagramTl;
}