<?php
/**
 * Template Name: Contact
 *
 */

get_header();
?>

  <main itemscope itemtype="http://schema.org/Organization">
    <section id="hero" class="hero contact-page__hero">
      <div class="section-container section-container_decor hero__container contact-page__container">
        <h1 id="hero__title" class="reveal-wrap tg-h1">
          <div class="reveal-wrap__inner">
            <div class="line">Contact</div>
          </div>
        </h1>
      </div>
    </section>
    <section id="mail-to-us" class="mail-to-us">
      <div class="section-container section-container_decor mail-to-us__container-decor"></div>
      <div class="mail-to-us__box">
        <div class="section-container section-container_decor section-container_inverted mail-to-us__box-decor"></div>
        <div class="section-container mail-to-us__box-container">
          <div class="mail-to-us__cta-msg">Make your brand the first choice among many connect with us</div>
          <div class="mail-ref-apart mail-to-us__spacer-ref" aria-hidden="true">
          <span class="mail-ref-apart__p1"><span class="mail-ref-apart__p2">info@</span><span
                class="mail-ref-apart__p3">linnikov</span></span>
            <span class="mail-ref-apart__p4"><span aria-hidden="true" class="mail-ref-apart__p6">.agency</span></span>
          </div>
        </div>
      </div>
      <div class="mail-to-us__sticky-container">
        <div class="mail-to-us__container-rollback mail-to-us__sticky-wrap">
          <div class="mail-to-us__sticky-inner">
            <div class="section-container">
              <a class="mail-ref-apart mail-to-us__ref" data-email-to-clipboard itemprop="email"
                 href="mailto:info@linnikov.agency" target="_blank">
              <span class="mail-ref-apart__p1"><span class="mail-ref-apart__p2">info@</span><span
                    class="mail-ref-apart__p3">linnikov</span></span>
                <span class="mail-ref-apart__p4"><span aria-hidden="true" class="mail-ref-apart__p5">linnikov</span><span
                      class="mail-ref-apart__p6">.agency</span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="tabs contact-page-forms contact-page__forms" data-component="tabs" data-type="disclosure-based">
      <div id="contacts-inner">
        <section class="contact-page-forms__header">
          <div class="section-container section-container_decor">
            <div class="section-container__inner">
              <form class="tg-regular tabs__controls contact-page-forms__tabs-controls" data-tabs-elem="controls">
                <label class="text-checkbox" aria-role="button">
                  <input type="radio" name="active-tab" checked="checked" value="0" aria-hidden="true">
                  <div class="text-checkbox__body">Form</div>
                </label>
                <span>or</span>
                <label class="text-checkbox" aria-role="button">
                  <input type="radio" name="active-tab" value="1" aria-hidden="true">
                  <div class="text-checkbox__body">Brief</div>
                </label>
              </form>
            </div>
          </div>
        </section>
        <div class="tabs__body contact-page-forms__tabs-body">
          <div class="disclosure" data-tabs-elem="tab" data-component="disclosure">
            <div class="disclosure__body">
              <form id="contact-form" class="tg-regular form disclosure__inner contact-form" data-component="contact-form"
                    data-elem="disclosure.inner">
                <div class="form__main">
                  <div class="contact-page-forms__field-with-title">
                    <div class="section-container section-container_decor">
                      <div class="section-container__inner field-wrap_t field-wrap_b">
                        <div class="field-with-title">
                          <div class="field-with-title__title">Select category</div>
                          <div class="tg-regular inline-select">
                            <fieldset class="inline-select__inner">
                              <label class="text-checkbox" aria-role="button">
                                <input type="checkbox" name="category[]" value="Branding" aria-hidden="true">
                                <div class="text-checkbox__body">Branding</div>
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
                                <input type="checkbox" name="category[]" value="Design" aria-hidden="true">
                                <div class="text-checkbox__body">Design</div>
                              </label>
                              <label class="text-checkbox" aria-role="button">
                                <input type="checkbox" name="category[]" value="Other" aria-hidden="true">
                                <div class="text-checkbox__body">Other</div>
                              </label>
                            </fieldset>
                          </div>
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
                  </div>
                  <div class="form__wrap">
                    <div class="form__body contact-form__body" data-elem="body">
                      <div class="section-container section-container_decor">
                        <div class="section-container__inner">
                          <div class="contact-form__row contact-form__row_col2">
                            <div class="animated-separator"></div>
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
                          <div class="contact-form__row">
                            <div class="animated-separator"></div>
                            <div class="field-wrap_t field-wrap_b field-wrap_save">
                              <div class="form-field form-field_width-limit contact-form__field">
                              <textarea id="contact--message" class="contact-form-input" name="message" rows="1"
                                        data-autoheight="true" placeholder="Message"></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="animated-separator"></div>
                    </div>
                    <div class="tg-h3 form-messages form-messages_fixed form__messages contact-form__messages"
                         data-component="form-messages">
                      <div class="section-container form-messages__inner">
                        <div class="form-messages__panel">
                          <div class="form-msg form-msg_success" data-elem="msg" data-type="success"
                               data-default="Thank you for reaching out! We’ve sent you an email with the next steps. Check your inbox!"></div>
                          <div class="form-msg form-msg_error" data-elem="msg" data-type="error"
                               data-default="Error."></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="section-container section-container_decor form__bottom contact-form__bottom">
                  <div class="section-container__inner">
                    <button type="submit" class="btn form__submit-btn contact-form__submit-btn" data-elem="submit-btn">
                      Send
                      <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                        <span class="icon-cubic-nav-arrow-right"></span>
                        <span class="icon-cubic-nav-arrow-right"></span>
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="disclosure" data-tabs-elem="tab" data-component="disclosure">
            <div class="disclosure__body">
              <div class="disclosure__inner contact-page-forms__field-with-title" data-elem="disclosure.inner">
                <div class="section-container section-container_decor">
                  <div class="section-container__inner field-wrap_t">
                    <div class="field-with-title">
                      <div class="tg-regular field-with-title__title">Select category</div>
                      <div class="tg-regular inline-select">
                        <fieldset class="inline-select__inner">
                          <a href="<?php echo esc_url(site_url('/brief-branding#Branding')); ?>" class="text-checkbox">
                            <div class="text-checkbox__body">Branding</div>
                          </a>
                          <a href="<?php echo esc_url(site_url('/brief-packaging#Packaging')); ?>" class="text-checkbox">
                            <div class="text-checkbox__body">Packaging</div>
                          </a>
                          <a href="<?php echo esc_url(site_url('/brief-website#Website')); ?>" class="text-checkbox">
                            <div class="text-checkbox__body">Website</div>
                          </a>
                          <a href="<?php echo esc_url(site_url('/brief-design#Design')); ?>" class="text-checkbox">
                            <div class="text-checkbox__body">Design</div>
                          </a>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contacts-container" class="section-container section-container_decor contact-page__contacts">
      <div class="contact-page__contacts-inner">
        <?php
        // Получаем значения метаполей для телефона и адреса
        $phone = get_post_meta(get_the_ID(), '_linnikov_agency_contacts_phone', true);
        $address = get_post_meta(get_the_ID(), '_linnikov_agency_contacts_address', true);
        ?>
        <div class="contact-block">
          <dt>Phone number</dt>
          <dd><a itemprop="telephone" href="tel:+14692560962" target="_blank"><?php echo esc_html($phone); ?></a></dd>
        </div>
        <div class="contact-block">
          <dt>Address</dt>
          <dd>
            <a href="https://maps.app.goo.gl/tB2maHEMEFxBVjjd8" target="_blank">
              <?php echo $address; ?>
            </a>
          </dd>
        </div>
      </div>
      <div class="animated-separator"></div>
    </section>
  </main>

<?php
get_template_part('templates/general/drawers-group');
get_template_part('templates/general/scroll-indicator');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();
