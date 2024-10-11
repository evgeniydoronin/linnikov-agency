<?php
/**
 * Template Name: Brief Branding
 *
 */

get_header();
?>

  <div>
    <main>
      <section class="hero hero_brief">
        <div class="section-container section-container_decor hero__container">
          <div class="section-container__inner hero__inner">
            <h1 class="tg-h1 hero__title">Branding</h1>
            <div class="hero__block">
              <div class="tg-h3 hero__block-title">How well do you understand your product and your customers?</div>
              <p class="tg-regular">Your answers will help us gain a deeper understanding of your business and the core
                objectives of the project, allowing us to provide a more accurate timeline and cost estimate.</p>
            </div>
          </div>
        </div>
      </section>

      <form id="brief-form" class="tg-regular application-form" enctype="multipart/form-data">
        <div class="section-container section-container_decor application-form__container">
          <div class="form__body application-form__body" data-elem="body">
            <div class="animated-separator"></div>
            <div class="section-container__inner contact-form__row contact-form__row_col2">
              <div class="field-wrap_t field-wrap_b field-wrap_save">
                <div class="form-field form-field_width-limit contact-form__field">
                  <input name="contact--name" class="contact-form-input" type="text" placeholder="Name">
                </div>
              </div>
              <div class="animated-separator animated-separator_mobile"></div>
              <div class="field-wrap_t field-wrap_b field-wrap_save">
                <div class="form-field form-field_width-limit contact-form__field">
                  <input name="contact--email" class="contact-form-input" required data-rule-custom-email
                         data-msg-custom-email="Isn't valid email address" type="text" placeholder="E-mail"
                         data-mask="email">
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">What will we work with?</div>
              <div class="app-form-block__body">
                <div class="inline-select">
                  <fieldset class="inline-select__inner">
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Brand Positioning" aria-hidden="true">
                      <div class="text-checkbox__body">Brand Positioning</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Strategy" aria-hidden="true">
                      <div class="text-checkbox__body">Strategy</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Naming" aria-hidden="true">
                      <div class="text-checkbox__body">Naming</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Logo and Brand Identity" aria-hidden="true">
                      <div class="text-checkbox__body">Logo and Brand Identity</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Packaging" aria-hidden="true">
                      <div class="text-checkbox__body">Packaging</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Website" aria-hidden="true">
                      <div class="text-checkbox__body">Website</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Style Guide" aria-hidden="true">
                      <div class="text-checkbox__body">Style Guide</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Other" aria-hidden="true">
                      <div class="text-checkbox__body">Other</div>
                    </label>
                  </fieldset>
                </div>
                <div class="disclosure field-disclosure">
                  <div class="disclosure__body">
                    <div class="disclosure__inner field-disclosure__inner form-field form-field_width-limit"
                         data-elem="disclosure.inner">
                    <textarea name="category--other-desc" class="text-input text-input_p-0" rows="1"
                              data-autoheight="true" placeholder="Your short answer"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">How did you get to know about us?</div>
              <div class="app-form-block__body">
                <div class="inline-select">
                  <fieldset class="inline-select__inner">
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="LinkedIn" aria-hidden="true">
                      <div class="text-checkbox__body">LinkedIn</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Facebook" aria-hidden="true">
                      <div class="text-checkbox__body">Facebook</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Instagram" aria-hidden="true">
                      <div class="text-checkbox__body">Instagram</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Clutch" aria-hidden="true">
                      <div class="text-checkbox__body">Clutch</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="g2" aria-hidden="true">
                      <div class="text-checkbox__body">g2</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Behance" aria-hidden="true">
                      <div class="text-checkbox__body">Behance</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Dribbble" aria-hidden="true">
                      <div class="text-checkbox__body">Dribbble</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Internet Search" aria-hidden="true">
                      <div class="text-checkbox__body">Internet Search</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Advertisement" aria-hidden="true">
                      <div class="text-checkbox__body">Advertisement</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Recommendation" aria-hidden="true">
                      <div class="text-checkbox__body">Recommendation</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="source[]" value="Other" aria-hidden="true">
                      <div class="text-checkbox__body">Other</div>
                    </label>
                  </fieldset>
                </div>
                <div class="disclosure field-disclosure">
                  <div class="disclosure__body">
                    <div class="disclosure__inner field-disclosure__inner form-field form-field_width-limit"
                         data-elem="disclosure.inner">
                    <textarea name="source--other-desc" class="text-input text-input_p-0" rows="1"
                              data-autoheight="true" placeholder="Your short answer"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">Do you have a deadline?</div>
              <div class="app-form-block__body">
                <div class="inline-select inline-select_fit">
                  <fieldset id="has-deadline-radioset" class="inline-select__inner">
                    <label class="text-checkbox" aria-role="button">
                      <input type="radio" name="has-deadline" value="Yes" aria-hidden="true">
                      <div class="text-checkbox__body">Yes</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="radio" name="has-deadline" value="No, no rush" checked="checked" aria-hidden="true">
                      <div class="text-checkbox__body">No, no rush</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="radio" name="has-deadline" value="No, but ASAP please" aria-hidden="true">
                      <div class="text-checkbox__body">No, but ASAP please</div>
                    </label>
                  </fieldset>
                </div>
              </div>
            </div>
            <div class="disclosure field-disclosure">
              <div class="disclosure__body">
                <div class="disclosure__inner" data-elem="disclosure.inner">
                  <div class="animated-separator"></div>
                  <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
                    <div class="app-form-block__cap">When would you like to complete the project?</div>
                    <div class="app-form-block__body">
                      <div class="input-wrap" data-component="date-input-wrap">
                        <input type="date" name="deadline-date">
                        <div class="input-wrap__placeholder">Select date</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">When would you like to start?</div>
              <div class="app-form-block__body">
                <div class="input-wrap" data-component="date-input-wrap">
                  <input type="date" name="start-date">
                  <div class="input-wrap__placeholder">Select date</div>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">What is your budget?</div>
              <div class="app-form-block__body">
                <input id="customRange" name="budget" type="range" data-steps="5" data-labels="{value}$" min="100" max="500"
                       data-component="range-input">
                <script>
                    // window.onload = function() {
                    //     // Массив с произвольными значениями
                    //     const customValues = [100, 180, 230, 356, 497];
                    //
                    //     // Функция для обновления значений в labels и ползунке
                    //     function updateLabelsAndValue() {
                    //         // Получаем все элементы с классом range-input-div__label
                    //         const labels = document.querySelectorAll('.range-input-div__label');
                    //
                    //         // Перебираем и заменяем текст в labels
                    //         labels.forEach((label, idx) => {
                    //             if (customValues[idx] !== undefined) {
                    //                 label.textContent = `${customValues[idx]}$`;
                    //             }
                    //         });
                    //
                    //         // Обновляем значение самого ползунка
                    //         const rangeInput = document.querySelector('input[name="budget"]');
                    //         if (rangeInput) {
                    //             const valueIndex = rangeInput.value; // Индекс текущего значения
                    //             rangeInput.setAttribute('data-real-value', customValues[valueIndex]); // Сохраняем настоящее значение в атрибуте data-real-value
                    //         }
                    //     }
                    //
                    //     // Наблюдатель за изменениями DOM
                    //     const observer = new MutationObserver(function(mutations) {
                    //         mutations.forEach(function(mutation) {
                    //             if (mutation.type === 'childList' || mutation.type === 'subtree') {
                    //                 updateLabelsAndValue();
                    //             }
                    //         });
                    //     });
                    //
                    //     // Запускаем наблюдателя на элементе, где обновляются range-input-div__label
                    //     const rangeInputContainer = document.querySelector('.range-input__body');
                    //     if (rangeInputContainer) {
                    //         observer.observe(rangeInputContainer, { childList: true, subtree: true });
                    //     }
                    //
                    //     // Обновляем значения ползунка при изменении
                    //     const rangeInput = document.querySelector('input[name="budget"]');
                    //     if (rangeInput) {
                    //         rangeInput.addEventListener('input', function() {
                    //             const valueIndex = rangeInput.value; // Индекс текущего значения
                    //             const realValue = customValues[valueIndex]; // Получаем значение из массива
                    //
                    //             // Обновляем текстовые значения
                    //             const labels = document.querySelectorAll('.range-input-div__label');
                    //             labels.forEach((label, idx) => {
                    //                 if (idx == valueIndex) {
                    //                     label.textContent = `${realValue}$`; // Устанавливаем новое значение
                    //                 }
                    //             });
                    //
                    //             // Обновляем "реальное" значение для отправки
                    //             rangeInput.setAttribute('data-real-value', realValue);
                    //         });
                    //     }
                    //
                    //     // Обновляем значения при первой инициализации
                    //     updateLabelsAndValue();
                    //
                    //     // Перехватываем отправку формы
                    //     const form = document.querySelector('form'); // Замените на ваш селектор формы
                    //     if (form) {
                    //         form.addEventListener('submit', function(event) {
                    //             // Перед отправкой формы подставляем реальное значение
                    //             const rangeInput = document.querySelector('input[name="budget"]');
                    //             if (rangeInput) {
                    //                 const realValue = rangeInput.getAttribute('data-real-value');
                    //                 const hiddenInput = document.createElement('input');
                    //                 hiddenInput.type = 'hidden';
                    //                 hiddenInput.name = 'budget';
                    //                 hiddenInput.value = realValue;
                    //                 form.appendChild(hiddenInput); // Добавляем скрытое поле с реальным значением
                    //                 rangeInput.disabled = true; // Отключаем оригинальный input, чтобы не отправлять его
                    //             }
                    //         });
                    //     }
                    // };
                </script>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What will we be working with? Is this a first-time launch or a rebranding? What’s the name of the product or service? Do you already have a website? If so, please share the link with us.</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_1" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What are you most proud of in your company?</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_2" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What are you most proud of about your product?</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_3" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What are the company's plans and objectives? We’re not looking for financial goals like "we want to earn a billion," but rather the company's social responsibility or the purpose behind creating the business.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_4" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What is the nature and lifestyle of your product’s consumer? Please describe all your target groups in detail.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_5" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What other audiences interact with your company and product, besides the end buyer?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_6" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Why do people buy products in your category? For example, cosmetic products can be purchased for various reasons: to hide fatigue, prolong youth, maintain future health, or attract others.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_7" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What barriers keep people from consistently using products in your category? For example, a lack of time may lead people to choose fast food over a traditional cafe.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_8" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What do you promise to people who use products from other categories that solve the same problems? For example, like choosing a train over a plane.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_9" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What prevents people from purchasing your product, either for the first time or as a repeat customer?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_10" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">How do you convince customers that your product is better than competing alternatives?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_11" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What words or phrases do people use when recommending your product or company to friends or on social media?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_12" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What is the one word people most often use to recommend your product or company?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_13" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Who are your competitors, and what do they promise to their audience?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_14" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What can you compare your product or company to? For example, insurance services are often compared to an umbrella.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_15" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">If you were to compare your product or company to a person, what would its nature or character be?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_16" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Where do people typically learn about your product?</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_17" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Are there any limitations that must be considered, such as an existing brand manual, results from marketing research, the product name, logo, or anything else?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_18" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">How do you see your visual identification?(logo, font, color,
                icons, patterns, photo style)What character should suit him?
              </div>
              <div class="app-form-block__body">
                <div id="identification-chars" class="identification-chars">
                  <div class="char-slider">
                    <div>male</div>
                    <input name="sex" type="range" value="3" min="1" max="10" class="range-input">
                    <div>female</div>
                  </div>
                  <div class="char-slider">
                    <div>young</div>
                    <input name="age" type="range" value="3" min="1" max="10" class="range-input">
                    <div>mature</div>
                  </div>
                  <div class="char-slider">
                    <div>luxurious</div>
                    <input name="value" type="range" value="3" min="1" max="10" class="range-input">
                    <div>economical</div>
                  </div>
                  <div class="char-slider">
                    <div>playful</div>
                    <input name="humor" type="range" value="3" min="1" max="10" class="range-input">
                    <div>serious</div>
                  </div>
                  <div class="char-slider">
                    <div>simple</div>
                    <input name="complexity" type="range" value="3" min="1" max="10" class="range-input">
                    <div>complex</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="animated-separator"></div>
          <div class="section-container__inner app-form-block application-form__footer">
            <div class="app-form-block__body">
              <div class="field-with-title">
                <label for="attachments">Attachments</label>
                <div class="form-field form-field_width-limit">
                  <div class="attachments" data-component="file-input">
                    <label class="attachments__body">
                      <input name="attachments" multiple="true" type="file">
                      <span class="icon-cubic-upload attachments__icon"></span>
                      <div class="attachments__cap">Upload files for us</div>
                    </label>
                    <ul class="attachments__list" data-elem="file-input.list"></ul>
                  </div>
                </div>
              </div>
              <div class="form-field form-field_width-limit">
                <label class="checkbox option-field">
                  <input type="checkbox" name="agreement" required="true">
                  <div class="checkbox__body">
                    <div class="checkbox__effect"></div>
                    <div class="checkbox__inner">
                      <div class="checkbox__decor"></div>
                      <div class="checkbox__thumb"></div>
                    </div>
                    <div class="checkbox__right-border">
                      <div class="checkbox__border-spacer"></div>
                    </div>
                  </div>
                  <span class="tg-regular checkbox__cap">Consent to <a
                        href="<?php echo esc_url(site_url('/privacy-policy/')); ?>"
                        class="simple-text-link">personal data processing</a></span>
                </label>
              </div>
            </div>
          </div>
          <div class="section-container__inner application-form__actions">
            <button type="submit" class="btn form__submit-btn" data-elem="submit-btn">
              Send A BRIEF
              <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                <span class="icon-cubic-nav-arrow-right"></span>
                <span class="icon-cubic-nav-arrow-right"></span>
              </div>
            </button>
          </div>
          <div class="tg-h3 form-messages form-messages_fixed form__messages application-form__messages"
               data-component="form-messages">
            <div class="section-container form-messages__inner">
              <div class="form-messages__panel">
                <div class="form-msg form-msg_success" data-elem="msg" data-type="success"
                     data-default="Thank you for reaching out! We’ve sent you an email with the next steps. Check your inbox!"></div>
                <div class="form-msg form-msg_error" data-elem="msg" data-type="error" data-default="Error."></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>

<?php
get_template_part('templates/general/drawers-group');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();
