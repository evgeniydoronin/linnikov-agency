<?php
/**
 * Template Name: Single Vacancies
 *
 */

get_header();

$vacancy_subtitle = get_post_meta(get_the_ID(), '_vacancy_subtitle', true);
$vacancy_description = get_post_meta(get_the_ID(), '_vacancy_description', true);
?>

  <div>
    <main>
      <section class="hero hero_designer-application">
        <div class="section-container section-container_decor hero__container">
          <div class="section-container__inner hero__inner">
            <h1 class="tg-h1 hero__title"><?php echo get_the_title(); ?></h1>
            <div class="tg-regular hero__block">
              <h2 class="tg-h3 hero__block-title"><?php echo $vacancy_subtitle; ?></h2>
              <?php echo $vacancy_description; ?>
            </div>
          </div>
        </div>
      </section>
      <form id="designer-application-form" class="tg-regular application-form"  enctype="multipart/form-data">
        <!-- Вставляем скрытое поле с nonce -->
        <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('submit_designer_form_nonce'); ?>">

        <!-- Hidden reCAPTCHA token field -->
        <input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response">

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
              <div class="tg-regular app-form-block__cap">Link to you Portfolio</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="link-to-portfolio" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">Which of the following reflects your experience? Choose whatever suits
                you.
              </div>
              <div class="app-form-block__body">
                <div class="inline-select">
                  <fieldset class="inline-select__inner">
                    <?php
                    // Получаем все термины из таксономии 'experience' для текущей вакансии
                    $terms_experience = get_the_terms(get_the_ID(), 'experience');

                    if ($terms_experience && !is_wp_error($terms_experience)) {
                      // Проходим по каждому термину и выводим его
                      foreach ($terms_experience as $term) {
                        ?>
                        <label class="text-checkbox" aria-role="button">
                          <input type="radio" name="experience" value="<?php echo esc_attr($term->slug); ?>"
                                 aria-hidden="true">
                          <div class="text-checkbox__body"><?php echo esc_html($term->name); ?></div>
                        </label>
                        <?php
                      }
                    } else {
                      echo 'No experience tags found.';
                    }
                    ?>
                  </fieldset>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">What types of projects have you worked on previously? Choose whatever
                suits
                you.
              </div>
              <div class="app-form-block__body">
                <div class="inline-select">
                  <fieldset class="inline-select__inner">
                    <?php
                    // Получаем все термины из таксономии 'experience' для текущей вакансии
                    $terms_project_types = get_the_terms(get_the_ID(), 'project_types');

                    if ($terms_project_types && !is_wp_error($terms_project_types)) {
                      // Проходим по каждому термину и выводим его
                      foreach ($terms_project_types as $term) {
                        ?>
                        <label class="text-checkbox" aria-role="button">
                          <input type="checkbox" name="project_types[]" value="<?php echo esc_attr($term->slug); ?>"
                                 aria-hidden="true">
                          <div class="text-checkbox__body"><?php echo esc_html($term->name); ?></div>
                        </label>
                        <?php
                      }
                    } else {
                      echo 'No experience tags found.';
                    }
                    ?>
                  </fieldset>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="app-form-block__cap">Tools. Choose whatever suits you.</div>
              <div class="app-form-block__body">
                <div class="inline-select">
                  <fieldset class="inline-select__inner">
                    <?php
                    // Получаем все термины из таксономии 'experience' для текущей вакансии
                    $terms_tools = get_the_terms(get_the_ID(), 'tools');

                    if ($terms_tools && !is_wp_error($terms_tools)) {
                      // Проходим по каждому термину и выводим его
                      foreach ($terms_tools as $term) {
                        ?>
                        <label class="text-checkbox" aria-role="button">
                          <input type="checkbox" name="tools[]" value="<?php echo esc_attr($term->slug); ?>"
                                 aria-hidden="true">
                          <div class="text-checkbox__body"><?php echo esc_html($term->name); ?></div>
                        </label>
                        <?php
                      }
                    } else {
                      echo 'No experience tags found.';
                    }
                    ?>
                  </fieldset>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Cover letter</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="cover-letter" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner contact-form__row contact-form__row_col2">
              <div class="app-form-block field-wrap_t field-wrap_b">
                <div class="tg-regular app-form-block__cap">Desired Salary</div>
                <div class="app-form-block__body">
                  <div class="tg-control tg-control_sm time-value">
                    <select name="period" class="time-value__select" data-component="tom-select"
                            data-no-clear-btn="true">
                      <option value="Hourly" selected="selected">Hourly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                    <input type="text" name="salary" class="time-value__value" data-mask="currency">
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
                        <div class="attachments__cap">Upload resume</div>
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
                Send
                <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                  <span class="icon-cubic-nav-arrow-right"></span>
                  <span class="icon-cubic-nav-arrow-right"></span>
                </div>
              </button>
            </div>
          </div>
          <div class="tg-h3 form-messages form-messages_fixed form__messages application-form__messages"
               data-component="form-messages">
            <div class="section-container form-messages__inner">
              <div class="form-messages__panel">
                <div class="form-msg form-msg_success" data-elem="msg" data-type="success"
                     data-default="Thank you for submitting. Check your email and enjoy!"></div>
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
