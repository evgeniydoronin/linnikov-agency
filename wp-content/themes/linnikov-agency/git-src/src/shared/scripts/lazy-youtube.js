class LazyYoutube {
	constructor(target) {
		this.rootElem = target;
		this.innerElem = target.querySelector(".lazy-yotube-container__inner");
		this.btnElem = target.querySelector(".lazy-yotube-container__btn");

		this.btnElem.addEventListener("click", (event) => {
			if (this.rootElem.classList.contains("lazy-yotube-container_active")) return;
			const frameElem = this.#createFrameElem(this.rootElem.getAttribute("data-lazy-youtube"));
			this.innerElem.prepend(frameElem);
			this.rootElem.classList.add("lazy-yotube-container_active");
		});
	}
	#createFrameElem(src) {
		const elem = document.createElement("iframe");
		elem.setAttribute("allowfullscreen", 1);
		elem.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
		elem.setAttribute("title", "Youtube Video Container");
		elem.setAttribute("src", src);
		return elem;
	}
}


export const initLazyYoutube = () => { // { prefix, container, include }
	const elems = document.querySelectorAll("[data-lazy-youtube]");

	elems.forEach(elem => {
		new LazyYoutube(elem);
	});
};