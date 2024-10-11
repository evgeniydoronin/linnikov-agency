import {getTargetElem} from "../scripts/utils.js";
import linnikovCustom from "./tom-select/plugins/linnikov-custom.js";
import {Disclosure} from "./disclosure.js";

const phoneMask = Inputmask("+9 (999) 999-99-99");
const currencyMask = Inputmask("currency");
const emailMask = Inputmask({
    mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
    greedy: !1,
    onBeforePaste: function (e, t) {
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

$.validator.addMethod("tel-or-email", function (value, element) {
    return $.validator.methods.email.call(this, value, element) || /\+?[\d- \(\)]/.test(value);
});
$.validator.addMethod("custom-tel", function (value, element) {
    return phoneMask.isValid(value);
});
$.validator.addMethod("custom-email", function (value, element) {
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
        this.dom = {root: getTargetElem(selector)};
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
            config.plugins.clear_button = {title: 'Remove selected item'};
        }
        new TomSelect(elem, config);
    }

    constructor(selector) {
        this.dom = {root: getTargetElem(selector)};
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
                } catch (ex) {
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
        this.dom = {input: getTargetElem(target)};
        this.dom.wrap = this.dom.input.closest(".form-field");
        try {
            this.disclosure = new Disclosure(this.dom.input.closest(".field-disclosure"));
        } catch (ex) {
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

    async submitHandler(form, event) {
        // const response = await fetch("...", {
        // 		type: "POST",
        // 		body: new FormData(form)
        // 	});
        const response = await new Promise((resolve) => setTimeout(() => resolve({ok: true}), 1000));
        if (response.ok) {
            this.hideSubmitBtn();
            this.showCloseBtn();
            this.showMessage("success");
            return null;
        } else {
            throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
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
        const response = await new Promise((resolve) => setTimeout(() => resolve({ok: true}), 1000));
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
        const formData = new FormData(form); // Собираем данные формы

        // Собираем все выбранные значения чекбоксов "category[]"
        const categories = Array.from(form.querySelectorAll('input[name="category[]"]:checked'))
            .map(input => input.value);

        // Удаляем старые поля, если они есть, и добавляем новые значения
        formData.delete('category[]');
        categories.forEach(category => formData.append('category[]', category));

        // Добавляем nonce и действие для WordPress
        formData.append('action', 'submit_contact_form');
        formData.append('nonce', ajax_contact_params.nonce); // Nonce для безопасности

        // Очищаем предыдущие сообщения
        document.querySelectorAll('.form-msg').forEach(el => el.textContent = '');

        // Отправляем запрос через fetch
        try {
            const response = await fetch(ajax_contact_params.ajax_url, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json(); // Получаем ответ в формате JSON

            this.hideSubmitBtnSpiner();

            if (result.success) {
                return this.showMessage("success", null, 5000); // Успешная отправка
            } else {
                throw new Error(result.data || 'Unknown error occurred');
            }
        } catch (error) {
            // Обрабатываем возможные ошибки
            this.showMessage('error', 'An error occurred. Please try again.', 5000);
            console.error('Error:', error);
        } finally {
            this.hideSubmitBtnSpiner(); // Скрываем спиннер кнопки отправки
        }
    }

    initLogic() {
        this.dom.root.querySelector(`[name="category[]"][value="Other"]`).addEventListener("change", ({target}) => {
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
        this.dom.root.querySelector(`[name="category[]"][value="Other"]`).addEventListener("change", ({target}) => {
            this.categoryOtherDesc.setHidden(!target.checked);
            this.categoryOtherDesc.setRequired(target.checked);
            if (!target.checked) this.categoryOtherDesc.clear();
        });
        this.dom.root.querySelector(`[name="source[]"][value="Other"]`).addEventListener("change", ({target}) => {
            this.sourceOtherDesc.setHidden(!target.checked);
            this.sourceOtherDesc.setRequired(target.checked);
            if (!target.checked) this.sourceOtherDesc.clear();
        });
        this.dom.root.querySelector(`#has-deadline-radioset`).addEventListener("change", ({target}) => {
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
        const formData = new FormData(form); // Собираем данные формы

        // Собираем все выбранные значения чекбоксов "category[]" и "source[]"
        const categories = Array.from(form.querySelectorAll('input[name="category[]"]:checked')).map(input => input.value);
        const sources = Array.from(form.querySelectorAll('input[name="source[]"]:checked')).map(input => input.value);

        // Удаляем старые поля и добавляем новые значения
        formData.delete('category[]');
        categories.forEach(category => formData.append('category[]', category));

        formData.delete('source[]');
        sources.forEach(source => formData.append('source[]', source));

        // Добавляем nonce и действие для WordPress
        formData.append('action', 'submit_brief_form');
        formData.append('nonce', ajax_brief_params.nonce); // Nonce для безопасности

        // Очищаем предыдущие сообщения
        document.querySelectorAll('.form-msg').forEach(el => el.textContent = '');

        // Отправляем запрос через fetch
        try {
            const response = await fetch(ajax_brief_params.ajax_url, {
                method: 'POST',
                body: formData,
            });

            // Проверяем успешность запроса
            if (response.ok) {
                const result = await response.json(); // Читаем JSON ответ
                this.hideSubmitBtnSpiner();

                if (result.success) {
                    return this.showMessage("success", null, 5000); // Успешная отправка
                } else {
                    throw new Error(result.data || 'Unknown error occurred');
                }
            } else {
                throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
            }
        } catch (error) {
            await this.showMessage('error', 'An error occurred. Please try again.', 5000);
            console.error('Error:', error);
        } finally {
            this.hideSubmitBtnSpiner(); // Скрываем спиннер кнопки отправки
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
        this.dom.root.querySelector(`[name="category[]"][value="Other"]`).addEventListener("change", ({target}) => {
            this.categoryOtherDesc.setHidden(!target.checked);
            this.categoryOtherDesc.setRequired(target.checked);
            if (!target.checked) this.categoryOtherDesc.clear();
        });
    }

    // initRelatedLogic() {

    // }
    async submitHandler(form, event) {
        try {
            const formData = new FormData(form); // Collect the form data

            // Collect all selected category values
            const categories = Array.from(form.querySelectorAll('input[name="category[]"]:checked'))
                .map(input => input.value);
            formData.delete('category[]'); // Remove any previous category values from the form
            categories.forEach(category => formData.append('category[]', category)); // Add selected categories

            // Add nonce and action for WordPress processing
            formData.append('nonce', ajax_request_params.nonce); // Use nonce for security
            formData.append('action', 'submit_request_form'); // Set the action for the backend handler

            // Prepare the file uploads
            const files = form.querySelector('input[name="attachments"]').files;
            for (let i = 0; i < files.length; i++) {
                formData.append('attachments[]', files[i]); // Append each file to FormData
            }

            // Clear previous messages
            document.querySelectorAll('.form-msg').forEach(el => el.textContent = '');

            // Make the request to WordPress via admin-ajax.php
            const response = await fetch(ajax_request_params.ajax_url, {
                method: 'POST', // POST method
                body: formData, // Send form data
            });

            // Check if the response is successful
            if (response.ok) {
                const result = await response.json(); // Parse the JSON response
                this.hideSubmitBtnSpiner(); // Hide spinner

                if (result.success) {
                    return this.showMessage("success", null, 5000); // Show success message
                } else {
                    throw new Error(result.data || 'Unknown error occurred'); // Handle error
                }
            } else {
                throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
            }
        } catch (error) {
            this.hideSubmitBtnSpiner(); // Hide spinner in case of error
            console.error(error); // Log the error for debugging
            await this.showMessage("error", error.message, 5000); // Show error message
        }
    }
}

export class DesignerApplicationForm extends Form {
    constructor(selector) {
        super(selector);
    }

    async submitHandler(form, event) {
        event.preventDefault(); // Останавливаем стандартное действие отправки формы

        const formData = new FormData(form); // Собираем данные формы

        // Собираем все выбранные значения чекбоксов "project_types[]" и "tools[]"
        const project_types = Array.from(form.querySelectorAll('input[name="project_types[]"]:checked'))
            .map(input => input.value);
        const tools = Array.from(form.querySelectorAll('input[name="tools[]"]:checked'))
            .map(input => input.value);

        // Удаляем старые поля, если они есть, и добавляем новые значения
        formData.delete('project_types[]');
        project_types.forEach(type => formData.append('project_types[]', type));

        formData.delete('tools[]');
        tools.forEach(tool => formData.append('tools[]', tool));

        // Добавляем nonce и действие для WordPress
        formData.append('action', 'submit_designer_form');
        formData.append('nonce', ajax_designer_params.nonce); // Nonce для безопасности

        // Очищаем предыдущие сообщения
        document.querySelectorAll('.form-msg').forEach(el => el.textContent = '');

        // Отправляем запрос через fetch
        try {
            const response = await fetch(ajax_designer_params.ajax_url, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json(); // Получаем ответ в формате JSON

            // Обрабатываем успешный ответ
            if (result.success) {
                this.showMessage('success', null, 5000); // Показать сообщение об успехе
                form.reset(); // Сброс формы
            } else {
                throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
            }
        } catch (error) {
            // Обрабатываем возможные ошибки
            this.showMessage('error', 'An error occurred. Please try again.', 5000);
            console.error('Error:', error);
        } finally {
            this.hideSubmitBtnSpiner(); // Скрываем спиннер кнопки отправки
        }
    }
}

export class LeaveCVForm extends Form {
    constructor(selector) {
        super(selector);
    }

    async submitHandler(form, event) {
        try {
            const formData = new FormData(form); // Собираем данные формы

            // Добавляем nonce в FormData
            formData.append('nonce', ajax_career_params.nonce);
            formData.append('action', 'submit_career_form'); // Добавляем параметр 'action' для обработки формы

            // Выполняем запрос к WordPress через admin-ajax.php
            const response = await fetch(ajax_career_params.ajax_url, {
                method: 'POST', // Используем POST-запрос
                body: formData, // Передаем данные формы
            });

            // Проверяем успешность запроса
            if (response.ok) {
                const result = await response.json(); // Читаем JSON ответ
                this.hideSubmitBtnSpiner();

                if (result.success) {
                    return this.showMessage("success", null, 5000); // Успешная отправка
                } else {
                    throw new Error(result.data || 'Unknown error occurred');
                }
            } else {
                throw new Error(`Error (status: ${response.status}) sending the form: ${response.statusText}`);
            }
        } catch (error) {
            this.hideSubmitBtnSpiner();
            console.error(error); // Логируем ошибку для отладки
            await this.showMessage("error", error.message, 5000); // Показать сообщение об ошибке
        }
    }
}