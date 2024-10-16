<div class="drawers-group" data-drawers-group="system">

  <?php if (
    is_post_type_archive('news') ||
    is_post_type_archive('ideas') ||
    is_page_template('templates/page-cookie-policy.php')
  ) : ?>
    <section data-lenis-prevent class="drawer drawer_full sign-up-drawer" data-drawer="sign-up">
      <div id="sign-up-panel" class="drawer__panel sign-up-drawer__panel" data-elem="drawer.panel"
           data-scrollable="true">
        <div class="drawer__header">
          <button class="drawer-close-btn drawer__close-btn" data-drawer-close="sign-up">
            <div class="drawer-close-btn__inner">Close form<span class="icon-cubic-plus"></span></div>
          </button>
        </div>
        <div class="section-container sign-up-drawer__container">
          <div class="sign-up-drawer__inner">
            <h2>Sign up for Linnikov' regular update.</h2>
            <p>Hey there,<br>Sending you updates with a newsletter is something we do not take lightly. We treat it like
              an invitation to your home, and we respect that wholeheartedly. We will never share your data or spam you
              with nonsense. The purpose of this newsletter is to send you stories about creativity, design, and
              business
              along with thoughtfully curated links that might be useful to you. We'll also invite you to an event every
              now and then.</p>
            <form id="sign-up-form" class="form form_dark sign-up-form" data-component="sign-up-form">
              <div class="sign-up-form__wrap">
                <div class="form__body sign-up-form__body" data-elem="body">
                  <div class="form-field form-field_decor">
                    <input required id="sign-up--email" class="text-input text-input_no-placeholder" name="email"
                           type="email" placeholder="Email Address">
                    <label for="sign-up--email" class="form-field form-field_width-limit form-field-title">Email
                      Address</label>
                  </div>
                  <div class="form-field form-field_decor">
                    <input id="sign-up--first-name" class="text-input text-input_no-placeholder" name="first-name"
                           type="text" placeholder="First Name">
                    <label for="sign-up--first-name" class="form-field form-field_width-limit form-field-title">First
                      Name</label>
                  </div>
                  <div class="form-field form-field_decor">
                    <input id="sign-up--last-name" class="text-input text-input_no-placeholder" name="last-name"
                           type="text" placeholder="Last Name">
                    <label for="sign-up--last-name" class="form-field form-field_width-limit form-field-title">Last
                      Name</label>
                  </div>
                  <div class="form-field form-field_decor">
                    <input id="sign-up--company" class="text-input text-input_no-placeholder" name="company" type="text"
                           placeholder="Company">
                    <label for="sign-up--company"
                           class="form-field form-field_width-limit form-field-title">Company</label>
                  </div>
                  <div class="form-field form-field_decor">
                    <input id="sign-up--title" class="text-input text-input_no-placeholder" name="title" type="text"
                           placeholder="Title">
                    <label for="sign-up--title" class="form-field form-field_width-limit form-field-title">Title</label>
                  </div>
                </div>
                <div class="tg-h3 form-messages form__messages sign-up-form__messages" data-component="form-messages">
                  <div class="form-messages__inner">
                    <div class="form-messages__panel">
                      <div class="form-msg form-msg_success" data-elem="msg" data-type="success"
                           data-default="Thank you for submitting. Check your email and enjoy!"></div>
                      <div class="form-msg form-msg_error" data-elem="msg" data-type="error"
                           data-default="Error!"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form__bottom form__bottom">
                <button type="submit" class="btn form__submit-btn" data-elem="submit-btn">
                  Subscribe
                  <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                    <span class="icon-cubic-nav-arrow-right"></span>
                    <span class="icon-cubic-nav-arrow-right"></span>
                  </div>
                </button>
                <button type="button" class="btn form__close-btn" data-elem="close-btn" data-drawer-close="sign-up">
                  Close
                  <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                    <span class="icon-cubic-nav-arrow-right"></span>
                    <span class="icon-cubic-nav-arrow-right"></span>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  <?php endif; ?>


  <section class="cookies-panel" data-drawer="cookies-agreement">
    <div class="cookies-panel__container" data-elem="drawer.panel" data-scrollable>
      <form id="cookies-approval" class="cookies-panel__form">
        <h2 class="tg-regular">This websites uses <a href="<?php echo esc_url(site_url('/cookie-policy/')); ?>" class="simple-text-link">cookies</a></h2>
        <div class="cookies-panel__group">
          <div class="cookies-panel__options">
            <label class="cookies-option">
              <span class="tg-service cookies-option__label">Strictly necessary</span>
              <span class="switch">
										<input type="checkbox" name="necessary" checked="checked">
										<div class="switch__thumb"></div>
									</span>
            </label>
            <label class="cookies-option">
              <span class="tg-service cookies-option__label">Funcitionality</span>
              <span class="switch">
										<input type="checkbox" name="functionality" checked="checked">
										<div class="switch__thumb"></div>
									</span>
            </label>
            <label class="cookies-option">
              <span class="tg-service cookies-option__label">Analytics</span>
              <span class="switch">
										<input type="checkbox" name="analytics" checked="checked">
										<div class="switch__thumb"></div>
									</span>
            </label>
          </div>
          <div class="cookies-panel__actions">
            <button type="button" class="btn cookies-panel__accept-btn" data-drawer-close="cookies-agreement">Accept
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>

  <!-- CHAT -->
  <div data-lenis-prevent class="linnikov-chat" id="linnikov-chat" data-drawer="ai-chat">
    <div class="linnikov-chat__panel" data-elem="drawer.panel">
      <!-- chat header -->
      <div class="linnikov-chat__header">
        <button type="button" class="linnikov-chat__header-button linnikov-chat__header-button_hidden"
                data-drawer-close="ai-chat">
          <span class="icon-lightbox-cursor-left"></span><span class="header-button__cap">Close</span>
        </button>
        <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/chat/Linnikov_AI.svg" alt="Linnikov AI"
             loading="lazy" class="linnikov-chat__header-logo">
        <button type="button" class="drawer-close-btn linnikov-chat__header-button" data-drawer-close="ai-chat">
          <div class="drawer-close-btn__inner">Close<span class="icon-cubic-plus"></span></div>
        </button>
      </div>
      <!-- end chat header -->

      <!-- chat body -->
      <div class="linnikov-chat__body">
        <svg id="chat-cartoon" fill="currentColor" class="chat-cartoon linnikov-chat__cartoon"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.64 261.24">
          <path
              d="M20.3805 93.9299C18.4105 93.7799 16.1405 93.8199 13.9605 93.4099C5.55052 91.8099 0.180516 85.5399 0.0605159 76.9899C-0.0094841 71.7599 -0.159484 66.4599 0.600516 61.3199C1.67052 54.0699 7.66052 48.7999 15.0405 48.3299C21.5105 47.9099 28.0305 48.0699 34.5305 48.1199C36.3105 48.1299 37.3405 47.5699 38.3705 46.0899C55.8705 20.9399 79.6905 5.23993 110.061 1.13993C147.441 -3.91007 179.201 7.88993 204.491 36.1299C208.141 40.1999 211.261 44.7499 214.841 49.3499C226.921 40.8299 240.661 36.3799 255.861 36.8099C271.001 37.2399 284.401 42.4399 296.291 51.8899C301.591 43.0799 307.661 35.1699 315.051 28.3599C333.271 11.5699 354.631 1.82993 379.451 0.299928C412.521 -1.74007 440.611 9.31993 463.501 33.2299C467.451 37.3499 470.711 42.1499 474.191 46.7099C474.961 47.7199 475.571 48.2099 476.971 48.1799C483.471 48.0399 489.971 47.9599 496.471 48.1199C506.721 48.3699 513.6 55.4599 513.61 65.6799C513.61 70.4099 513.801 75.2099 513.141 79.8699C511.991 88.0199 505.281 93.5299 497.001 93.7699C495.181 93.8199 493.361 93.7699 491.681 93.7699C491.681 98.3599 491.801 102.74 491.661 107.1C490.771 136.03 479.861 160.56 458.991 180.6C442.931 196.02 423.741 205.4 401.721 208.29C370.531 212.39 342.541 204.53 318.531 183.93C299.151 167.3 287.501 146.18 283.321 121.01C281.521 110.18 281.401 99.2599 283.391 88.4699C284.121 84.5199 281.791 82.4799 279.851 80.2499C266.681 65.0199 242.341 64.7199 228.761 79.5599C228.071 80.3199 227.661 81.8399 227.871 82.8499C237.041 126.39 218.051 170.63 180.041 194.07C142.401 217.29 92.2405 213.79 58.5505 185.46C37.4405 167.72 24.8505 145.13 21.3405 117.79C20.3405 110 20.6705 102.04 20.3805 93.9499V93.9299ZM200.111 104.94C200.531 64.0399 166.701 30.0499 125.421 29.8899C84.4505 29.7299 50.9705 62.9099 50.5505 104.21C50.1505 144.58 82.8105 179.12 125.061 179.33C165.491 179.52 199.691 147.1 200.111 104.94ZM312.131 104.59C312.131 145.75 345.441 179.11 386.791 179.35C427.831 179.59 461.741 145.74 461.701 104.56C461.671 63.4999 428.031 29.9099 386.891 29.8799C345.821 29.8499 312.131 63.5099 312.131 104.58V104.59Z"/>
          <path
              d="M253.959 261.24C230.129 260.59 211.349 250.6 197.899 230.82C195.369 227.09 195.389 222.91 197.769 219.93C200.329 216.73 204.379 215.38 207.989 217.07C209.769 217.9 211.509 219.4 212.589 221.04C219.569 231.63 229.109 238.69 241.329 241.92C253.369 245.1 265.009 243.78 276.179 238.14C285.549 233.41 292.209 226.05 297.519 217.19C300.019 213.02 304.989 212.09 309.279 214.58C313.209 216.86 314.729 221.64 312.599 225.84C306.999 236.86 298.679 245.44 288.139 251.75C277.679 258.01 266.289 261.3 253.959 261.25V261.24Z"/>
          <path class="chat-cartoon__eye_left"
                d="M125.91 127.67C113.26 127.66 102.98 117.41 103 104.81C103.02 92.2 113.29 81.99 125.96 82C138.63 82 148.84 92.2 148.86 104.86C148.88 117.44 138.58 127.68 125.91 127.67Z"/>
          <path class="chat-cartoon__eye_right"
                d="M386.94 127.67C374.21 127.71 364.04 117.62 364 104.91C363.96 92.21 374.09 82.02 386.79 82C399.52 81.98 409.7 92.09 409.73 104.76C409.75 117.49 399.66 127.63 386.94 127.67Z"/>
        </svg>
        <div class="linnikov-chat__decor-line linnikov-chat__decor-line_1"></div>
        <div class="linnikov-chat__decor-line linnikov-chat__decor-line_2"></div>
        <div class="linnikov-chat__decor-line linnikov-chat__decor-line_3"></div>
        <div class="linnikov-chat__decor-line linnikov-chat__decor-line_4"></div>
        <div class="linnikov-chat__body-content">
          <div class="linnikov-chat__line">
            <div class="linnikov-chat__line-icon">
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/chat/chat_icon.svg" alt="Icon"
                   loading="lazy">
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>What brings you here today?</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>22:22</p>
              </div>
            </div>
          </div>
          <div class="linnikov-chat__line linnikov-chat__line_right">
            <div class="linnikov-chat__line-name">
              <p>API</p>
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>For API-related support, please check out the <a href="#">Help Center</a> to see if any of the
                  articles are relevant to your issue.</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>22:22</p>
              </div>
            </div>
          </div>

          <div class="linnikov-chat__line linnikov-chat__line_no-full">
            <div class="linnikov-chat__line-icon">
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/chat/chat_icon.svg" alt="Icon"
                   loading="lazy">
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>For API-related support, please check out the <a href="#">Help Center</a> to see if any of the
                  articles are relevant to your issue.</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>22:22</p>
              </div>
            </div>
          </div>

          <div class="linnikov-chat__line linnikov-chat__line_no-full">
            <div class="linnikov-chat__line-icon">
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/chat/chat_icon.svg" alt="Icon"
                   loading="lazy">
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>Were you able to answer your question using the Help Center?</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>Bot</p>
                <p>Just now.</p>
              </div>
            </div>
          </div>

          <div class="linnikov-chat__line">
            <div class="linnikov-chat__line-icon">
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/chat/chat_icon.svg" alt="Icon"
                   loading="lazy">
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>What brings you here today?</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>22:22</p>
              </div>
            </div>
          </div>

          <div class="linnikov-chat__line linnikov-chat__line_right">
            <div class="linnikov-chat__line-name">
              <p>API</p>
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>For API-related support, please check out the <a href="#">Help Center</a> to see if any of the
                  articles are relevant to your issue.</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>22:22</p>
              </div>
            </div>
          </div>

          <div class="linnikov-chat__line linnikov-chat__line_no-full">
            <div class="linnikov-chat__line-icon">
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/chat/chat_icon.svg" alt="Icon"
                   loading="lazy">
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>For API-related support, please check out the <a href="#">Help Center</a> to see if any of the
                  articles are relevant to your issue.</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>22:22</p>
              </div>
            </div>
          </div>

          <div class="linnikov-chat__line linnikov-chat__line_no-full">
            <div class="linnikov-chat__line-icon">
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/chat/chat_icon.svg" alt="Icon"
                   loading="lazy">
            </div>
            <div class="linnikov-chat__line-body">
              <div class="linnikov-chat__line-body-message">
                <p>Were you able to answer your question using the Help Center?</p>
              </div>
              <div class="linnikov-chat__line-body-info">
                <p>Bot</p>
                <p>Just now.</p>
              </div>
            </div>
          </div>

        </div>
        <!-- submit form -->
        <form action="" class="linnikov-chat__form">
          <input type="text" name="chat_message" class="linnikov-chat__form-field" placeholder="Type message"
                 autocomplete="off">
          <button type="submit" class="linnikov-chat__form-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M17.4898 8.90622L4.36484 1.41482C4.1436 1.29071 3.88983 1.23686 3.63726 1.2604C3.38468 1.28395 3.14525 1.38379 2.95076 1.54665C2.75628 1.70951 2.61594 1.92769 2.54841 2.17221C2.48087 2.41673 2.48933 2.676 2.57265 2.9156L4.99452 9.98357C4.99421 9.98616 4.99421 9.98878 4.99452 9.99138C4.99409 9.99397 4.99409 9.99661 4.99452 9.99919L2.57265 17.0828C2.50592 17.2713 2.48538 17.473 2.51274 17.6711C2.5401 17.8691 2.61458 18.0577 2.72991 18.221C2.84525 18.3844 2.99808 18.5176 3.17557 18.6097C3.35307 18.7017 3.55005 18.7498 3.74999 18.75C3.96692 18.7494 4.18004 18.6929 4.36874 18.5859L17.4867 11.082C17.6802 10.9736 17.8414 10.8157 17.9537 10.6244C18.066 10.4332 18.1254 10.2155 18.1258 9.99369C18.1262 9.7719 18.0676 9.554 17.956 9.36234C17.8443 9.17069 17.6837 9.01219 17.4906 8.9031L17.4898 8.90622ZM3.74999 17.5V17.4929L6.10468 10.625H10.625C10.7908 10.625 10.9497 10.5591 11.0669 10.4419C11.1841 10.3247 11.25 10.1657 11.25 9.99997C11.25 9.83421 11.1841 9.67524 11.0669 9.55803C10.9497 9.44082 10.7908 9.37497 10.625 9.37497H6.11093L3.75468 2.50935L3.74999 2.49997L16.875 9.98669L3.74999 17.5Z"/>
            </svg>
          </button>
        </form>
        <!-- end submit form -->
      </div>
      <!-- end chat body -->
    </div>
  </div>
  <!-- END CHAT -->

  <!--  REQUEST FORM -->
  <section class="drawer drawer_right request-drawer" data-drawer="request">
    <div data-lenis-prevent class="drawer__panel request-drawer__panel" data-elem="drawer.panel" data-scrollable>
      <section class="section-container section-container_decor request-drawer__body">
        <div class="request-drawer__header">
          <div class="request-drawer__close-btn reveal-wrap">
            <div class="reveal-wrap__inner">
              <div class="reveal-wrap__item">
                <button class="drawer-close-btn" data-drawer-close="request">
                  <div class="drawer-close-btn__inner">Close panel<span class="icon-cubic-plus"></span></div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!--  REQUEST FORM-->
        <?php get_template_part('templates/forms/request-form'); ?>
        <div class="request-drawer-banner request-drawer__banner">
          <div class="img-wrap img-wrap_top-left request-drawer-banner__inner">
            <div class="img-wrap__inner">
              <picture>
                <source
                    srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/request/banner-diagonal.webp">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/request/banner-diagonal.jpg"
                     onload="this.parentElement.closest(`.request-drawer-banner`)?.classList.add(`_loaded`);"
                     alt="Linnikov works set" loading="lazy">
              </picture>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
  <!--  REQUEST FORM END -->

  <div class="tg-h3 form-messages form-messages_fixed form__messages request-form__messages"
       data-component="form-messages" data-for="request-form">
    <div class="section-container form-messages__inner">
      <div class="form-messages__panel">
        <div class="form-msg form-msg_success" data-elem="msg" data-type="success"
             data-default="Thank you for reaching out! We’ve sent you an email with the next steps. Check your inbox!"></div>
        <div class="form-msg form-msg_error" data-elem="msg" data-type="error" data-default="Error."></div>
      </div>
    </div>
  </div>
  <section class="drawer drawer_center popup popup_lite-ver lite-version-drawer" data-drawer="lite-version">
    <div data-lenis-prevent class="drawer__panel popup__panel" data-elem="drawer.panel" data-scrollable>
      <section class="tg-h3 popup__body">
        <div class="popup__close-btn">
          <button class="drawer-close-btn" data-drawer-close="lite-version">
            <div class="drawer-close-btn__inner">Close panel<span class="icon-cubic-plus"></span></div>
          </button>
        </div>
        <div class="lite-version-drawer__star-wrap">
          <svg id="lite-version-drawer__star" class="animated-star lite-version-drawer__star" viewBox="0 0 384 388">
            <g mask="url(#lite-version-drawer__star-mask)">
              <rect class="animated-star__bg" x="0" y="0" width="384" height="384" fill="var(--color, currentColor)"/>
              <circle class="animated-star__fill" cx="192" cy="200" r="0" fill="var(--fill-color, #FF0000)"/>
              <path
                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                  class="animated-star__body" stroke="var(--stroke-color, #FF0000)" fill="none"/>
            </g>
            <mask id="lite-version-drawer__star-mask">
              <path
                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                  fill="white"/>
            </mask>
          </svg>
        </div>

        <div class="reveal-wrap">
          <div class="reveal-wrap__inner">
            <div class="lite-version-drawer__msg reveal-wrap__item">To quickly load pages please switch to the</div>
          </div>
        </div>
        <div class="reveal-wrap">
          <div class="reveal-wrap__inner">
            <a href="" class="text-btn lite-version-drawer__link reveal-wrap__item" data-component="animated-link">
              <svg id="lite-version-drawer-link__lightning_1" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#lite-version-drawer-link__lightning_1-clip)"
                   transform="rotate(30 6.8 30) translate(-3)">
                  <rect class="animated-cubic-lightning__top" x="0" y="0" width="3.4" height="20"
                        fill="var(--color, currentColor)"/>
                  <rect class="animated-cubic-lightning__bottom" x="3.4" y="20" width="3.4" height="10"
                        fill="var(--color, currentColor)"/>
                  <rect class="animated-cubic-lightning__top" x="0" y="40" width="3.4" height="20"
                        fill="var(--color, currentColor)"/>
                  <rect class="animated-cubic-lightning__bottom" x="3.4" y="50" width="3.4" height="10"
                        fill="var(--color, currentColor)"/>
                </g>
                <defs>
                  <clipPath id="lite-version-drawer-link__lightning_1-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Light Version</div>
              <svg id="lite-version-drawer-link__lightning_2" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#lite-version-drawer-link__lightning_2-clip)"
                   transform="rotate(30 6.8 30) translate(-3)">
                  <rect class="animated-cubic-lightning__top" x="0" y="0" width="3.4" height="20"
                        fill="var(--color, currentColor)"/>
                  <rect class="animated-cubic-lightning__bottom" x="3.4" y="20" width="3.4" height="10"
                        fill="var(--color, currentColor)"/>
                  <rect class="animated-cubic-lightning__top" x="0" y="40" width="3.4" height="20"
                        fill="var(--color, currentColor)"/>
                  <rect class="animated-cubic-lightning__bottom" x="3.4" y="50" width="3.4" height="10"
                        fill="var(--color, currentColor)"/>
                </g>
                <defs>
                  <clipPath id="lite-version-drawer-link__lightning_2-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  </section>
</div>