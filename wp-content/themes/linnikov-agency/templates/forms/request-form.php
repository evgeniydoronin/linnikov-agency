<form id="request-form" class="request-form request-drawer__form" enctype="multipart/form-data">

  <!-- Вставляем скрытое поле с nonce -->
  <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('submit_request_form_nonce'); ?>">

  <div class="request-form__header">
    <h1 class="tg-h1 request-form__title">Request</h1>
    <div class="tg-h3 request-form__msg">Make your brand the first choice among many connect with us</div>
  </div>
  <div class="tg-regular request-form__body">
    <div class="field-with-title request-form__category-select">
      <div>Select category</div>
      <div class="inline-select">
        <fieldset class="inline-select__inner">
          <label class="text-checkbox" aria-role="button">
            <input type="checkbox" name="category[]" value="branding" aria-hidden="true">
            <div class="text-checkbox__body">Branding</div>
          </label>
          <label class="text-checkbox" aria-role="button">
            <input type="checkbox" name="category[]" value="website" aria-hidden="true">
            <div class="text-checkbox__body">Website</div>
          </label>
          <label class="text-checkbox" aria-role="button">
            <input type="checkbox" name="category[]" value="packaging" aria-hidden="true">
            <div class="text-checkbox__body">Packaging</div>
          </label>
          <label class="text-checkbox" aria-role="button">
            <input type="checkbox" name="category[]" value="design" aria-hidden="true">
            <div class="text-checkbox__body">Design</div>
          </label>
          <label class="text-checkbox" aria-role="button">
            <input type="checkbox" name="category[]" value="Other" aria-hidden="true">
            <div class="text-checkbox__body">Other</div>
          </label>
        </fieldset>
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
    <div class="contact-form__row request-form__row_col2">
      <div class="animated-separator"></div>
      <div class="field-wrap_t field-wrap_b field-wrap_save">
        <div class="form-field form-field_width-limit contact-form__field">
          <input name="contact--name" class="contact-form-input" type="text" placeholder="Name">
        </div>
      </div>
      <div class="animated-separator request-form__separator_desc"></div>
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
    <div class="animated-separator"></div>
  </div>
  <div class="tg-regular request-form__footer">
    <div class="field-with-title request-form__attachments">
      <label for="attachments">Attachments</label>
      <div class="form-field">
        <div class="attachments" data-component="file-input">
          <label class="attachments__body">
            <input name="attachments" multiple="true" type="file">
            <span class="icon-cubic-upload attachments__icon"></span>
            <div class="tg-regular attachments__cap">Upload files for us</div>
          </label>
          <ul class="attachments__list" data-elem="file-input.list"></ul>
        </div>
      </div>
    </div>
    <div class="form-field">
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
  <div class="request-form__actions">
    <button type="submit" class="btn form__submit-btn" data-elem="submit-btn">
      Send A BRIEF
      <div class="ref-arrow-icon ref-arrow-icon_horizontal">
        <span class="icon-cubic-nav-arrow-right"></span>
        <span class="icon-cubic-nav-arrow-right"></span>
      </div>
    </button>
  </div>
</form>