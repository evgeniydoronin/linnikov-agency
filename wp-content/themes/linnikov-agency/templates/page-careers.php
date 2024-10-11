<?php
/**
 * Template Name: Careers
 *
 */

get_header();
?>

  <div>
    <main>
      <?php
      // Navigation
      $about_navigation = locate_template('templates/general/about-navigation.php');

      if ($about_navigation) {
        require $about_navigation;
      }
      ?>
      <section class="tg-h2 related-posts related-posts_careers-page">
        <div class="section-container section-container_decor">
          <div class="related-posts__inner">
            <ul class="related-posts__list">
              <?php
              // Получаем текущий пост (страницу "Карьеры")
              global $post;

              // Получаем ID выбранных вакансий, сохраненных в метаполе
              $selected_vacancies = get_post_meta($post->ID, '_linnikov_agency_careers_vacancies', true);

              // Проверяем, есть ли выбранные вакансии
              if (!empty($selected_vacancies)) {
                echo '<ul class="related-posts__list">';

                // Проходим по каждому ID вакансии и выводим его
                foreach ($selected_vacancies as $vacancy_id) {
                  // Получаем пост вакансии по ID
                  $vacancy = get_post($vacancy_id);

                  // Проверяем, что пост существует и опубликован
                  if ($vacancy && $vacancy->post_status === 'publish') {
                    $vacancy_url = get_permalink($vacancy_id);
                    $vacancy_title = esc_html($vacancy->post_title);
                    ?>
                    <li class="related-posts__item">
                      <a href="<?php echo esc_url($vacancy_url); ?>" class="related-post-ref">
                        <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                          <span class="icon-cubic-nav-arrow-right"></span>
                          <span class="icon-cubic-nav-arrow-right"></span>
                        </div>
                        <?php echo $vacancy_title; ?>
                      </a>
                      <div class="related-posts__separator"></div>
                    </li>
                    <?php
                  }
                }

                echo '</ul>';
              } else {
                // Если вакансий не выбрано, выводим сообщение
                echo '<p>' . __('No vacancies selected.', 'linnikov-agency') . '</p>';
              }
              ?>
            </ul>
          </div>
        </div>
      </section>
      <section class="leave-cv">
        <div class="section-container section-container_decor">
          <div class="section-container__inner">
            <div class="leave-cv__motto">
              <h2 class="tg-h2">Didn’t find perfect match?<br>Try to send us your CV.</h2>
            </div>
          </div>
        </div>
        <form id="leave-cv-form" class="form leave-cv-form" data-component="leave-cv-form"  enctype="multipart/form-data">
          <!-- Вставляем скрытое поле с nonce -->
          <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('submit_career_form_nonce'); ?>">

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
              <div class="section-container__inner contact-form__row">
                <div class="field-wrap_t field-wrap_b field-wrap_save">
                  <div class="form-field form-field_width-limit contact-form__field">
                  <textarea id="contact--message" class="contact-form-input" name="message" rows="1"
                            data-autoheight="true" placeholder="Message"></textarea>
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
                        <input name="attachments[]" multiple="true" type="file">
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
                    <span class="tg-regular checkbox__cap">Consent to <a href="https://linnikov.agency/policy/"
                                                                         class="simple-text-link">personal data processing</a></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="section-container__inner application-form__actions">
              <button type="submit" class="btn form__submit-btn contact-form__submit-btn" data-elem="submit-btn">
                Send
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
                       data-default="Thank you for submitting. Check your email and enjoy!"></div>
                  <div class="form-msg form-msg_error" data-elem="msg" data-type="error" data-default="Error."></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
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
