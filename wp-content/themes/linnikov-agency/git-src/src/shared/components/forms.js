import { getTargetElem } from "../scripts/utils.js";
import linnikovCustom from "./tom-select/plugins/linnikov-custom.js";
import { Disclosure } from "./disclosure.js";

const phoneMask = Inputmask("+9 (999) 999-99-99");
const currencyMask = Inputmask("currency");
const emailMask = Inputmask({
	mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
	greedy: !1,
	onBeforePaste: function(e, t) {
		return (e = e.toLowerCase()).replace("mailto:", "")
	},
	definitions: {
		"*": {
			validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
			cardinality: 1,
			casing: "lower"
		},
		"-": {
			validator: "[0-9A-Za-z-]",
			cardinality: 1,
			casing: "lower"
		}
	}
});
TomSelect.define('linnikov_custom', linnikovCustom);

$.validator.addMethod("tel-or-email", function(value, element) {
  return $.validator.methods.email.call(this, value, element) || /\+?[\d- \(\)]/.test(value);
});
$.validator.addMethod("custom-tel", function(value, element) {
  return phoneMask.isValid(value);
});
$.validator.addMethod("custom-email", function(value, element) {
  return emailMask.isValid(value);
});

export const initMasks = () => {
	phoneMask.mask("[data-mask=tel]");
	emailMask.mask("[data-mask=email]");
	currencyMask.mask("[data-mask=currency]");
}

class FormMessages {
	activeElem = null;
	timer = null;
	constructor(selector) {
		this.dom = { root: getTargetElem(selector) };
	}
	async show(type, msg, timeout) {
		if (this.activeElem) this.activeElem.classList.remove("active");
		if (this.timer) clearTimeout(this.timer);
		const elem = this.dom.root.querySelector(`[data-type="${type}"]`);
		elem.textContent = msg ? msg : elem.getAttribute("data-default");
		elem.classList.add("active");
		this.activeElem = elem;
		this.dom.root.classList.add("showed");
		if (timeout) {
			return new Promise((resolve) => {
				this.timer = setTimeout(() => {
					resolve();
					this.hide();
				}, timeout);
			});
		}
	}
	hide() {
		if (this.activeElem) this.activeElem.classList.remove("active");
		this.dom.root.classList.remove("showed");
	}
}
export class Form {
	static initTomSelect(elem) {
		const noClearBtn = elem.hasAttribute("data-no-clear-btn");
		const config = {
			controlInput: null,
			plugins: {"linnikov_custom": {}}
		};
		if (!noClearBtn) {
			config.plugins.clear_button = { title:'Remove selected item' };
		}
		new TomSelect(elem, config);
	}
	constructor(selector) {
		this.dom = { root: getTargetElem(selector) };
		this.dom.body = this.dom.root.querySelector("[data-elem=body]");
		this.dom.tomSelects = this.dom.root.querySelectorAll("[data-component=tom-select]");
		this.dom.submitBtn = this.dom.root.querySelector("[data-elem=submit-btn]");
		let messagesRoot = this.dom.root.querySelector(`[data-component="form-messages"]`) ||
			document.querySelector(`[data-component="form-messages"][data-for="${this.dom.root.getAttribute("id")}"]`);
		this.messages = new FormMessages(messagesRoot);
		this.initTomSelects();
		this.initValidator();
	}
	async submitHandler() {
	}
	initTomSelects() {
		this.dom.tomSelects.forEach(elem => {
			Form.initTomSelect(elem);
		});
	}
	initValidator() {
		this.validator = $(this.dom.root).validate({
			ignore: [],
			highlight: function (element, errorClass, validClass) {
				$(element).closest(".form-field").addClass(errorClass);
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).closest(".form-field").removeClass(errorClass);
			},
			errorPlacement: function (error, element) {
				error.appendTo(element.closest(".form-field"));
			},
			// Отправляем данные на сервер
			submitHandler: async (form, event) => {
				event.preventDefault();
				this.disableSubmitBtn();
				this.showSubmitBtnSpiner();
				try {
					await this.submitHandler(form, event);
					this.reset();
				} catch(ex) {
						console.error("Error while submitting form query", ex);
					this.showMessage("error", ex.message, 5000);
				} finally {
					this.enableSubmitBtn();
				}
			},
		});
	}
	disableSubmitBtn() {
		if (!this.dom.submitBtn) return;
		this.dom.submitBtn.disabled = true;
	}
	enableSubmitBtn() {
		if (!this.dom.submitBtn) return;
		this.dom.submitBtn.classList.remove("waiting");
		this.dom.submitBtn.disabled = false;
	}
	showSubmitBtnSpiner() {
		this.dom.submitBtn.classList.add("waiting");
	}
	hideSubmitBtnSpiner() {
		this.dom.submitBtn.classList.remove("waiting");
	}
	reset() {
		this.dom.root.reset();
		this.enableSubmitBtn();
	}
	async showMessage(type, msg, timeout) {
		return await this.messages.show(type, msg, timeout);
	}
	hideMessages() {
		this.messages.hide();
	}
}

class FormField {
	constructor(target) {
		this.dom = { input: getTargetElem(target) };
		this.dom.wrap = this.dom.input.closest(".form-field");
		try {
			this.disclosure = new Disclosure(this.dom.input.closest(".field-disclosure"));
		} catch(ex) {
			console.log("No disclosure for field", ex);
		}
	}
	clear() {
		this.dom.input.value = null;
	}
	setRequired(next) {
		if (next) {
			this.dom.input.setAttribute("required", true);
		} else {
			this.dom.input.removeAttribute("required");
		}
	}
	setHidden(next) {
		if (this.disclosure) {
			this.disclosure.toggle(!next);
		} else {
			if (next) {
				this.dom.wrap.classList.add("_hidden");
			} else {
				this.dom.wrap.classList.remove("_hidden");
			}
		}
	}
}
export class SignUpForm extends Form {
    constructor(selector) {
        super(selector);

        this.dom.closeBtn = this.dom.root.querySelector("[data-elem=close-btn]");
        this.dom.closeBtn.addEventListener("click", () => this.onClose());
    }

    // Отправка формы через AJAX
    async submitHandler(form, event) {
        event.preventDefault(); // Отключение стандартного действия формы

        try {
            // Создаем FormData из формы
            const formData = new FormData(form);
            formData.append('action', 'submit_contact_form'); // Добавляем действие для AJAX
            formData.append('nonce', ajax_params.nonce); // Добавляем nonce для защиты

            // Отправка данных на сервер
            const response = await fetch(ajax_params.ajax_url, {
                method: 'POST',
                body: formData
            });

            // Проверяем, что запрос выполнен успешно
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    // Успешная отправка формы
                    this.hideSubmitBtn();
                    this.showCloseBtn();
                    this.showMessage("success", result.data); // Показать сообщение об успехе
                } else {
                    // Ошибка при отправке формы
                    this.showMessage("error", result.data); // Показать сообщение об ошибке
                }
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.error("Error while submitting the form:", error);
            this.showMessage("error", "Failed to submit the form.");
        }
    }

    onClose() {
        this.hideCloseBtn();
        this.showSubmitBtn();
        this.hideMessages();
    }

    hideSubmitBtn() {
        this.dom.submitBtn.classList.add("hidden");
    }

    showSubmitBtn() {
        this.dom.submitBtn.classList.remove("hidden");
    }

    showCloseBtn() {
        this.dom.closeBtn.classList.add("active");
    }

    hideCloseBtn() {
        this.dom.closeBtn.classList.remove("active");
    }
}
export class WriteUsForm extends Form {
	constructor(selector) {
		super(selector);
	}
	async submitHandler(form, event) {
		// const response = await fetch("...", {
		// 		type: "POST",
		// 		body: new FormData(form)
		// 	});
		const response = await new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000));
		this.hideSubmitBtnSpiner();
		if (response.ok) {
			return this.showMessage("success", null, 5000);
		} else {
			throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
		}
	}
}
export class ContactForm extends Form {
	constructor(selector) {
		super(selector);
		this.categoryOtherDesc = new FormField(this.dom.root.querySelector(`[name="category--other-desc"]`));
		this.initLogic();
	}
	async submitHandler(form, event) {
		// const response = await fetch("...", {
		// 		type: "POST",
		// 		body: new FormData(form)
		// 	});
		const response = await new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000));
		this.hideSubmitBtnSpiner();
		if (response.ok) {
			return this.showMessage("success", null, 5000);
		} else {
			throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
		}
	}
	initLogic() {
		this.dom.root.querySelector(`[name="category"][value="Other"]`).addEventListener("change", ({ target }) => {
			this.categoryOtherDesc.setHidden(!target.checked);
			this.categoryOtherDesc.setRequired(target.checked);
			if (!target.checked) this.categoryOtherDesc.clear();
		});
	}
}
export class BriefForm extends Form {
	constructor(selector) {
		super(selector);
		this.categoryOtherDesc = new FormField(this.dom.root.querySelector(`[name="category--other-desc"]`));
		this.sourceOtherDesc = new FormField(this.dom.root.querySelector(`[name="source--other-desc"]`));
		this.deadlineDate = new FormField(this.dom.root.querySelector(`[name="deadline-date"]`));
		this.initLogic();
	}
	initLogic() {
		this.dom.root.querySelector(`[name="category"][value="Other"]`).addEventListener("change", ({ target }) => {
			this.categoryOtherDesc.setHidden(!target.checked);
			this.categoryOtherDesc.setRequired(target.checked);
			if (!target.checked) this.categoryOtherDesc.clear();
		});
		this.dom.root.querySelector(`[name="source"][value="Other"]`).addEventListener("change", ({ target }) => {
			this.sourceOtherDesc.setHidden(!target.checked);
			this.sourceOtherDesc.setRequired(target.checked);
			if (!target.checked) this.sourceOtherDesc.clear();
		});
		this.dom.root.querySelector(`#has-deadline-radioset`).addEventListener("change", ({ target }) => {
			const isYes = target.value === "Yes";
			this.deadlineDate.setHidden(!isYes);
			this.deadlineDate.setRequired(isYes);
			if (!isYes) this.deadlineDate.clear();
		});
		// $(`#source`).on("change", ({ currentTarget }) => {
		// 	const checked = Boolean(currentTarget.querySelector(`input[value="Other"]:checked`));
		// 	this.sourceOtherDesc.setHidden(!checked);
		// 	this.sourceOtherDesc.setRequired(checked);
		// 	if (!checked) this.sourceOtherDesc.clear();
		// });
	}

	async submitHandler(form, event) {
		// const response = await fetch("...", {
		// 		type: "POST",
		// 		body: new FormData(form)
		// 	});
		const response = await new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000));
		this.hideSubmitBtnSpiner();
		if (response.ok) {
			return this.showMessage("success", null, 5000);
		} else {
			throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
		}
	}
}
export class RequestForm extends Form {
	constructor(selector) {
		super(selector);
		this.categoryOtherDesc = new FormField(this.dom.root.querySelector(`[name="category--other-desc"]`));
		this.initLogic();
		//setTimeout(() => this.initRelatedLogic(), 0);
	}
	initLogic() {
		this.dom.root.querySelector(`[name="category"][value="Other"]`).addEventListener("change", ({ target }) => {
			this.categoryOtherDesc.setHidden(!target.checked);
			this.categoryOtherDesc.setRequired(target.checked);
			if (!target.checked) this.categoryOtherDesc.clear();
		});
	}
	// initRelatedLogic() {

	// }
	async submitHandler(form, event) {
		// const response = await fetch("...", {
		// 		type: "POST",
		// 		body: new FormData(form)
		// 	});
		const response = await new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000));
		this.hideSubmitBtnSpiner();
		if (response.ok) {
			return this.showMessage("success", null, 5000);
		} else {
			throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
		}
	}
}
export class DesignerApplicationForm extends Form {
	constructor(selector) {
		super(selector);
	}
	async submitHandler(form, event) {
		// const response = await fetch("...", {
		// 		type: "POST",
		// 		body: new FormData(form)
		// 	});
		const response = await new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000));
		this.hideSubmitBtnSpiner();
		if (response.ok) {
			return this.showMessage("success", null, 5000);
		} else {
			throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
		}
	}
}
export class LeaveCVForm extends Form {
	constructor(selector) {
		super(selector);
	}
	async submitHandler(form, event) {
		// const response = await fetch("...", {
		// 		type: "POST",
		// 		body: new FormData(form)
		// 	});
		const response = await new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 1000));
		this.hideSubmitBtnSpiner();
		if (response.ok) {
			return this.showMessage("success", null, 5000);
		} else {
			throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
		}
	}
}