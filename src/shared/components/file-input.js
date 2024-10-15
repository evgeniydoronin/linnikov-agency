import { getTargetElem } from "../scripts/utils.js";
class FileInput {
	static renderItem(file, idx) {
		return `<li class="attachments__item" data-idx="${idx}"><a href=${URL.createObjectURL(file)} download="${file.name}" class="attachments__file-name">${file.name}</a><button type="button" class="delete-btn attachments__delete-btn"><div class="delete-btn__inner">Delete<span class="icon-cubic-plus"></span></div></button></li>`;
	}
	constructor(target) {
		this.dom = { root: getTargetElem(target) };
		this.dom.input = this.dom.root.querySelector("input");
		this.dom.list = this.dom.root.querySelector(`[data-elem="file-input.list"]`);
		this.init();
	}
	init() {
		this.dom.input.addEventListener("change", () => this.rebuildList());
		this.dom.list.addEventListener("click", ({ target }) => {
			if (!target.matches("button, button *")) return;
			const itemElem = target.closest(".attachments__item");
			this.deleteFile(itemElem.getAttribute("data-idx"));
		})
	}
	deleteFile(tIdx) {
		const newList = new DataTransfer();
		for (var idx = 0; idx < this.dom.input.files.length; idx++) {
			if (idx == tIdx) continue;
			newList.items.add(this.dom.input.files.item(idx));
		}
		this.dom.input.files = newList.files;
		this.dom.input.dispatchEvent(new Event("change", { bubbles: true }));
		this.rebuildList();
	}
	rebuildList() {
		this.dom.root.classList.toggle("_selected", this.dom.input.value);
		this.dom.list.innerHTML = Array.from(this.dom.input.files).map((file, idx) => FileInput.renderItem(file, idx)).join("");
		$(this.dom.input).valid();
	}
}

export default function init() {
	document.querySelectorAll(`[data-component="file-input"]`).forEach(elem => new FileInput(elem));
}