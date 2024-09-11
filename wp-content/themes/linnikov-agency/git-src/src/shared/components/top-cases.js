// два пути смены контента
// Грузим все, на сервере постерам из неактивной категории даем class "hidden"
// Далее я манипулирую классами и отигрываю анимции для срытия / отображения нужных постеров (Поше этим путем)
// Второй вариант, отигрываем анимацию скрытия, чистим дом, загружаем новый контент, проигрываем анимацию появления
export default class TopCases {
	static transition = 0.8;
	dom = {};
	currentCategory = null;

	constructor(selector, { onCategoryChangeScroll = false } = {}) {
		this.vars = { onCategoryChangeScroll };
		this.dom.rootElem = document.querySelector(selector);
		this.dom.body = this.dom.rootElem.querySelector("[data-top-cases-elem=body]");
		this.dom.body.style.setProperty("--transition", `${TopCases.transition}s`);
		this.dom.filter = this.dom.rootElem.querySelector(".top-cases__filter");
		this.init();
	}
	init() {
		const defaultCategory = "all";
		const showCategoryByHash = () => {
			const hash = location.hash.slice(1);
			this.showCategory(hash || defaultCategory);
		}
		showCategoryByHash();
		if (this.vars.onCategoryChangeScroll && window.app.state.isMobile) {
			this.dom.filter.addEventListener("click", () => this.scrollToTop());
		}
		window.addEventListener("hashchange", showCategoryByHash);
	}
	scrollToTop() {
		window.lenis.scrollTo(this.dom.filter, { offset: this.vars.onCategoryChangeScroll.offset });
	}
	async showCategory(category) {
		const revBtnElem = this.dom.rootElem.querySelector(`a[href="#${this.currentCategory}"]`);
		revBtnElem?.classList.remove("active");
		const currentBtnElem = this.dom.rootElem.querySelector(`a[href="#${category}"]`);
		currentBtnElem?.classList.add("active");
		this.currentCategory = category;
		const visibleCards = this.selectVisibleCards();
		const categoryCards = this.selectCategoryCards(category);
		//this.unbindFancybox();
		this.markParity(visibleCards);
		await this.animateHidding(visibleCards);
		this.markParity(categoryCards);
		await this.animateShowing(categoryCards);
		//this.bindFancybox();
	}
	async animateHidding(cards) {
		cards.forEach(elem => elem.classList.remove("showing"));
		cards.forEach(elem => elem.classList.add("hidding"));
		await new Promise((resolve) => setTimeout(() => {
			if (this.currentCategory !== "all") {
				const notInCategory = cards.filter(elem => elem.getAttribute("data-category") !== this.currentCategory);
				notInCategory.forEach(elem => elem.classList.add("hidden"));
			}
			cards.forEach(elem => elem.classList.remove("hidding"));
			resolve();
		}, TopCases.transition / 2 * 1000));
	}
	async animateShowing(cards) {
		cards.forEach(elem => elem.classList.remove("hidden"));
		requestAnimationFrame(() => {
			cards.forEach(elem => elem.classList.add("showing"));
		});
		await new Promise((resolve) => setTimeout(() => {
			cards.forEach(elem => elem.classList.remove("showing"));
			resolve();
		}, TopCases.transition / 2 * 1000));
	}
	selectNotInCategoryCards(category) {
		if (category === "all") return [];
		return Array.from(this.dom.body.querySelectorAll(`*:not([data-category*=${category}])`));
	}
	selectCategoryCards(category) {
		const selector = category === "all" ? "*" : `[data-category*=${category}]`;
		return Array.from(this.dom.body.querySelectorAll(selector));
	}
	selectVisibleCards() {
		const selector = "[data-top-cases-elem=body] > *:not(.hidden)";
		return Array.from(this.dom.body.querySelectorAll(selector));
	}
	markParity(cards) {
		cards.forEach((elem, idx)=> idx % 2 ? elem.setAttribute("data-parity", "odd") : elem.setAttribute("data-parity", "even"));
	}
	bindFancybox() {
		$(`[data-top-cases-elem="body"] > *:not(.hidden)`).fancybox({
			smallBtn: false,
			toolbar: false,
			preventCaptionOverlap: false,
			contentFit: true,
		});
	}
	unbindFancybox() {
		$(`[data-top-cases-elem="body"] > *`).unbind('click.fb');
	}
}