<?php
/**
 * Template Name: Brief Website
 *
 */

get_header();
?>

  <div>
    <main>
      <?php get_template_part('templates/brief/hero-section'); ?>

      <form id="brief-form" class="tg-regular application-form" enctype="multipart/form-data">

        <input type="hidden" name="brief_type" value="website">

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
                      <input type="checkbox" name="category[]" value="Naming" aria-hidden="true">
                      <div class="text-checkbox__body">Naming</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Logo and Brand Identity" aria-hidden="true">
                      <div class="text-checkbox__body">Logo and Brand Identity</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Website Design" aria-hidden="true">
                      <div class="text-checkbox__body">Website Design</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Front-End Development" aria-hidden="true">
                      <div class="text-checkbox__body">Front-End Development</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Back-End Development" aria-hidden="true">
                      <div class="text-checkbox__body">Back-End Development</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="E-Commerce" aria-hidden="true">
                      <div class="text-checkbox__body">E-Commerce</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="CMS Setup" aria-hidden="true">
                      <div class="text-checkbox__body">CMS Setup</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Hosting Setup" aria-hidden="true">
                      <div class="text-checkbox__body">Hosting Setup</div>
                    </label>
                    <label class="text-checkbox" aria-role="button">
                      <input type="checkbox" name="category[]" value="Content Migration" aria-hidden="true">
                      <div class="text-checkbox__body">Content Migration</div>
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
              <div class="tg-regular app-form-block__cap">What will we be working with? Is this a first-time launch or a
                redesign? What’s the name of the product or service? Do you already have a website? If so, please share
                the link with us.
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
              <div class="tg-regular app-form-block__cap">What are the company's plans and objectives for the new
                website? We’re not looking for financial goals, but rather the company's purpose or vision behind this
                project.
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
              <div class="tg-regular app-form-block__cap">What is the nature and lifestyle of your target user? Please
                describe your target audiences in detail. How should the website appeal to them?
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
              <div class="tg-regular app-form-block__cap">How do you convince customers that your product is better than
                competing alternatives, and how should the website support that message?
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
              <div class="tg-regular app-form-block__cap">Who are your competitors, and what are their websites? What do
                you like or dislike about them?
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
              <div class="tg-regular app-form-block__cap">What design style should the website reflect? (e.g., modern,
                trustworthy, innovative)? Please share any examples of design styles you like.
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
              <div class="tg-regular app-form-block__cap">What functionality is critical for the website (e.g.,
                e-commerce, booking system, blog)?
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
              <div class="tg-regular app-form-block__cap">What is your timeline for launching the website?
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
              <div class="tg-regular app-form-block__cap">Will content migration be necessary from your current website?
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
              <div class="tg-regular app-form-block__cap">How many pages or sections will the website have
                approximately, and do you have an existing sitemap?
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
              <div class="tg-regular app-form-block__cap">Do you need integration with any external tools or platforms
                (e.g., CRM, email marketing, payment gateways)?
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
              <div class="tg-regular app-form-block__cap">Will the website need to support multiple languages? If yes,
                please list all the languages required.
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
              <div class="tg-regular app-form-block__cap">Are there any limitations that must be considered, such as
                existing branding, content, CMS, or technical specifications?
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
              <div class="tg-regular app-form-block__cap">How do you envision your design style (logo, font, color,
                icons, patterns, photo style)? What character or personality should it reflect?
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
