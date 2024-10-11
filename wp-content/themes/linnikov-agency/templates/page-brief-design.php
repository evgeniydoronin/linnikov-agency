<?php
/**
 * Template Name: Brief Design
 *
 */

get_header();
?>

  <div>
    <main>
      <?php get_template_part('templates/brief/hero-section'); ?>

      <form id="brief-form" class="tg-regular application-form" enctype="multipart/form-data">

        <input type="hidden" name="brief_type" value="design">

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
                      <input type="checkbox" name="category[]" value="Design Concept" aria-hidden="true">
                      <div class="text-checkbox__body">Design Concept</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Visual Identity Design" aria-hidden="true">
                      <div class="text-checkbox__body">Visual Identity Design</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Design Layout" aria-hidden="true">
                      <div class="text-checkbox__body">Design Layout</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Presentation Design" aria-hidden="true">
                      <div class="text-checkbox__body">Presentation Design</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Advertising Design" aria-hidden="true">
                      <div class="text-checkbox__body">Advertising Design</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Trade Show Design" aria-hidden="true">
                      <div class="text-checkbox__body">Trade Show Design</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Prepress" aria-hidden="true">
                      <div class="text-checkbox__body">Prepress</div>
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
            <div id="budget-container" class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">What is your budget?</div>
              <div class="app-form-block__body">
                <?php
                $post_id = get_the_ID(); // Получаем ID текущего поста

                // Получаем значения из метаполя _linnikov_agency_slider_branding_values
                $slider_values = get_post_meta($post_id, '_linnikov_agency_slider_branding_values', true);

                // Преобразуем массив в JSON для вывода в атрибут
                $slider_values_json = json_encode($slider_values);

                // Устанавливаем первое значение из массива как начальное
                $initial_value = !empty($slider_values) ? $slider_values[0] : 100;
                ?>
                <input name="budget" type="range" data-steps="5"
                       data-labels="<?php echo esc_attr($slider_values_json); ?>" min="100" max="500"
                       data-component="range-input">
                <input type="hidden" name="custom_budget" value="">

                <script>
                    // Ждем отправки формы
                    document.querySelector('#brief-form').addEventListener('submit', function (event) {
                        console.log('Форма отправляется');

                        // Находим input с именем "budget"
                        const rangeInput = document.querySelector('input[name="budget"]');
                        const hiddenInput = document.querySelector('input[name="custom_budget"]');

                        if (!rangeInput || !hiddenInput) {
                            console.error('Поле "budget" или скрытое поле не найдено');
                            return;
                        }

                        console.log('Поле найдено:', rangeInput);

                        // Логируем текущее значение ползунка (до изменения)
                        const step = rangeInput.value;
                        console.log('Текущее значение ползунка (стандартное):', step);

                        // Определяем кастомные метки
                        const customLabels = JSON.parse(rangeInput.getAttribute('data-labels'));
                        console.log('Кастомные значения меток:', customLabels);

                        // Рассчитываем индекс текущего шага на основе стандартного значения
                        const stepIndex = Math.round((step - rangeInput.min) / ((rangeInput.max - rangeInput.min) / (customLabels.length - 1)));
                        console.log('Индекс текущего шага:', stepIndex);

                        // Получаем кастомное значение
                        const customValue = customLabels[stepIndex];
                        console.log('Кастомное значение, которое будет отправлено:', customValue);

                        // Записываем кастомное значение в скрытое поле
                        hiddenInput.value = customValue;

                        // Логируем новое значение скрытого поля
                        console.log('Новое значение скрытого поля (для отправки):', hiddenInput.value);
                    });
                </script>

              </div>
            </div>


            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What is the name of the product or service? Do you have a
                website? If so, please share the link with us.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_1" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What are the company’s plans and objectives with this design
                project? (We’re not looking for financial goals but rather the purpose or vision behind it.)
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_2" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Who is your target audience, and how should the design appeal
                to them?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="question_3" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>

            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What are the specific goals you want to achieve with this
                design?
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
              <div class="tg-regular app-form-block__cap">What specifically should we create for you?
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
              <div class="tg-regular app-form-block__cap">What are the required size, format, or/and number of pages?
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
              <div class="tg-regular app-form-block__cap">Will the design be printed, used digitally, or do you need
                both versions?
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
              <div class="tg-regular app-form-block__cap">What content will you provide? (e.g., text, photos,
                illustrations, source files of current visual communication)
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
              <div class="tg-regular app-form-block__cap">What is the main idea or message the design should
                communicate?
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
              <div class="tg-regular app-form-block__cap">Do you have any preferences or wishes for the style of the
                design?
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
              <div class="tg-regular app-form-block__cap">Are there any limitations we need to consider, such as an
                existing brand manual, marketing research results, or specific logos and names?
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
              <div class="tg-regular app-form-block__cap">How do you envision the design style for your website (overall
                feel, fonts, colors, icons, patterns, photo style)? What character or personality should the website
                convey?
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
