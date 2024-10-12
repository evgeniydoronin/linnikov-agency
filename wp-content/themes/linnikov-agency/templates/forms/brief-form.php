<form id="brief-form" class="tg-regular application-form" enctype="multipart/form-data">
  <!-- Вставляем скрытое поле с nonce -->
  <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('submit_brief_form_nonce'); ?>">

  <input type="hidden" name="brief_type" value="<?php echo esc_attr($brief_type); ?>">

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
          <input name="budget" type="range" data-steps="5" data-labels="<?php echo esc_attr($slider_values_json); ?>"
                 min="100" max="500" data-component="range-input">
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

      <!-- QUESTION START -->

      <?php

      if ($brief_type === 'branding') {
        $questions_count = 18;

        $questions_text = [
          1 => "What will we be working with? Is this a first-time launch or a rebranding? What’s the name of the product or service? Do you already have a website? If so, please share the link with us.",
          2 => "What are you most proud of in your company?",
          3 => "What are you most proud of about your product?",
          4 => "What are the company's plans and objectives?",
          5 => "What is the nature and lifestyle of your product’s consumer?",
          6 => "What other audiences interact with your company and product, besides the end buyer?",
          7 => "Why do people buy products in your category?",
          8 => "What barriers keep people from consistently using products in your category?",
          9 => "What do you promise to people who use products from other categories?",
          10 => "What prevents people from purchasing your product?",
          11 => "How do you convince customers that your product is better?",
          12 => "What words or phrases do people use when recommending your product?",
          13 => "What is the one word people most often use to recommend your product?",
          14 => "Who are your competitors, and what do they promise?",
          15 => "What can you compare your product or company to?",
          16 => "If you were to compare your product or company to a person, what would its nature or character be?",
          17 => "Where do people typically learn about your product?",
          18 => "Are there any limitations that must be considered?",
        ];

        $chart_question = 'How do you envision your visual identity (logo, font, color, icons, patterns, photo style)? What character or personality should it reflect?';
      }
      elseif ($brief_type === 'packaging') {
        $questions_count = 18;

        $questions_text = [
          1 => "What product are we working with? Is this a first-time launch or a redesign? What’s the name of the product? Do you have a website or any existing packaging design? If so, please share the link or details with us.",
          2 => "What are you most proud of in your product's packaging?",
          3 => "What are the company's plans and objectives related to packaging? We’re not looking for financial goals, but rather the company's social responsibility or the purpose behind your packaging choices.",
          4 => "What is the nature and lifestyle of your product’s consumer? Please describe all your target groups in detail, including how packaging influences their decisions.",
          5 => "Why do people buy products in your category? How does packaging contribute to their decision-making process?",
          6 => "What barriers keep people from consistently using products in your category? Could packaging be a factor?",
          7 => "What prevents people from purchasing your product, either for the first time or as a repeat customer? Does packaging play a role in this?",
          8 => "How do you convince customers that your product's packaging is better than competing alternatives?",
          9 => "What words or phrases do people use when recommending your product or company to friends or on social media, specifically regarding its packaging?",
          10 => "Who are your competitors, and what do they promise to their audience through their packaging?",
          11 => "If you were to compare your product's packaging to a person, what would its nature or character be?",
          12 => "Where do people typically learn about your product, and how does packaging affect their first impression?",
          13 => "What is the price positioning within your product category?",
          14 => "What do you want to achieve with the development of the packaging design? What is the main message the packaging design needs to communicate?",
          15 => "What packaging format and materials do you have in mind for manufacturing?",
          16 => "Do you need us to develop a custom packaging form or diecut, or will it be provided by you or the production company?",
          17 => "How many SKUs are there in the product line?",
          18 => "Are there any limitations that must be considered in packaging design, such as an existing brand manual, results from marketing research, the product name, logo, diecuts, or any other technical specifications?",
        ];

        $chart_question = 'How do you envision the packaging design? What character or personality should it convey?';
      }
      elseif ($brief_type === 'website') {
        $questions_count = 14;

        $questions_text = [
          1 => "What will we be working with? Is this a first-time launch or a redesign? What’s the name of the product or service? Do you already have a website? If so, please share the link with us.",
          2 => "What are you most proud of in your company?",
          3 => "What are the company's plans and objectives for the new website? We’re not looking for financial goals, but rather the company's purpose or vision behind this project.",
          4 => "What is the nature and lifestyle of your target user? Please describe your target audiences in detail. How should the website appeal to them?",
          5 => "How do you convince customers that your product is better than competing alternatives, and how should the website support that message?",
          6 => "Who are your competitors, and what are their websites? What do you like or dislike about them?",
          7 => "What design style should the website reflect? (e.g., modern, trustworthy, innovative)? Please share any examples of design styles you like.",
          8 => "What functionality is critical for the website (e.g., e-commerce, booking system, blog)?",
          9 => "What is your timeline for launching the website?",
          10 => "Will content migration be necessary from your current website?",
          11 => "How many pages or sections will the website have approximately, and do you have an existing sitemap?",
          12 => "Do you need integration with any external tools or platforms (e.g., CRM, email marketing, payment gateways)?",
          13 => "Will the website need to support multiple languages? If yes, please list all the languages required.",
          14 => "Are there any limitations that must be considered, such as existing branding, content, CMS, or technical specifications?",
        ];

        $chart_question = 'How do you envision the design style for your website (overall feel, fonts, colors, icons, patterns, photo style)? What character or personality should the website convey?';
      }
      elseif ($brief_type === 'design') {
        $questions_count = 11; // Для "Design" 10 вопросов

        $questions_text = [
          1 => "What is the name of the product or service? Do you have a website? If so, please share the link with us.",
          2 => "What are the company’s plans and objectives with this design project? (We’re not looking for financial goals but rather the purpose or vision behind it.)",
          3 => "Who is your target audience, and how should the design appeal to them?",
          4 => "What are the specific goals you want to achieve with this design?",
          5 => "What specifically should we create for you?",
          6 => "What are the required size, format, or/and number of pages?",
          7 => "Will the design be printed, used digitally, or do you need both versions?",
          8 => "What content will you provide? (e.g., text, photos, illustrations, source files of current visual communication)",
          9 => "What is the main idea or message the design should communicate?",
          10 => "Do you have any preferences or wishes for the style of the design?",
          11 => "Are there any limitations we need to consider, such as an existing brand manual, marketing research results, or specific logos and names?",
        ];

        $chart_question = 'How do you envision your design style (logo, font, color, icons, patterns, photo style)? What character or personality should it reflect?';
      }

      if (!empty($questions_text)) {
        foreach ($questions_text as $question_number => $question) {
          ?>
          <div class="animated-separator"></div>
          <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
            <div class="tg-regular app-form-block__cap">
              <?php echo esc_html($question); ?>
            </div>
            <div class="app-form-block__body">
              <div class="form-field form-field_width-limit">
                    <textarea name="question_<?php echo esc_attr($question_number); ?>"
                              class="text-input text-input_p-0" rows="1" data-autoheight="true"
                              placeholder="Your short answer"></textarea>
              </div>
            </div>
          </div>
          <?php
        }
      }
      ?>


      <!-- QUESTION END -->

      <div class="animated-separator"></div>
      <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
        <div class="tg-regular app-form-block__cap"><?php echo !empty($chart_question) ? $chart_question : ''; ?></div>
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