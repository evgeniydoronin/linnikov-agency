<?php
/**
 * Template Name: Brief
 *
 */

get_header();
?>

  <div>
    <main>
      <section class="hero hero_brief">
        <div class="section-container section-container_decor hero__container">
          <div class="section-container__inner hero__inner">
            <h1 class="tg-h1 hero__title">Brief</h1>
            <div class="hero__block">
              <div class="tg-h3 hero__block-title">How well do you know your product and customers?</div>
              <p class="tg-regular">Your answers will help us to better understand the business, essence of the task, and
                more accurately evaluate the timeline and cost of the project.</p>
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
                      <input type="checkbox" name="category[]" value="Guidebook" aria-hidden="true">
                      <div class="text-checkbox__body">Guidebook</div>
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
                <input name="budget" type="range" data-steps="5" data-labels="{value}$" min="100" max="500"
                       data-component="range-input">
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What are you proud of in your company?</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="proud-of-in-company" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What are you proud of in your product?</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="proud-of-in-product" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Plans and objectives of the company? Not financial plans like
                "we want to earn a billion," but the social responsibility of the manufacturer or the reason for creating
                a business.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="plans" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What is the nature and lifestyle of your product consumer?</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="consumer-nature" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What other audiences interact with your company and product,
                besides end-buyer?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="others" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Why do people buy products in your category? For example,
                cosmetic products can be bought due to different reasons: hide fatigue, prolong youth, take care of future
                health, attract people.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="why-people-buy-products" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What prevents people from constantly using products in your
                category? For example, because of lack of time, people prefer fast food to a traditional cafe.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="what-prevents-constantly-using" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What do you promise to people who use products of other
                categories solving the same problems? For example, when they choose a train instead of a plane.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="promises" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What prevents people from buying your product for the first time
                or repeatedly?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="what-prevents-first-buy" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">How do you convince customers that your product is better than
                counterparts?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="why-product-is-better" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What words do people use to recommend the product or company to
                friends or in social networks?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="recomendation-words" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What is the one word people use to recommend your product or
                company?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="recomendation-one-word" class="text-input text-input_p-0" rows="1"
                          data-autoheight="true" placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Who are your competitors and what do they promise the
                audience?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="competitors-desc" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">What can you compare your product or company to? For example,
                the services of an insurance company are often compared to an umbrella.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="association" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">If you compare it to a person, what is the nature or character
                of your product or company?
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="company-character" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Where do people find out about your product?</div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="where-people-find" class="text-input text-input_p-0" rows="1" data-autoheight="true"
                          placeholder="Your short answer"></textarea>
                </div>
              </div>
            </div>
            <div class="animated-separator"></div>
            <div class="section-container__inner field-wrap_t field-wrap_b app-form-block">
              <div class="tg-regular app-form-block__cap">Limitations that must be considered: existing brand manual,
                results of marketing research, name, logo or other.
              </div>
              <div class="app-form-block__body">
                <div class="form-field form-field_width-limit">
                <textarea name="limitations" class="text-input text-input_p-0" rows="1" data-autoheight="true"
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
                      <span class="icon-attachment attachments__icon"></span>
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
                  <span class="tg-regular checkbox__cap">Consent to <a href="<?php echo esc_url(site_url('/privacy-policy/')); ?>"
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
