<?php
/**
 * Template Name: Express Brand Audit
 *
 */

 get_header();
?>

  <div>
    <main>
      <section class="hero hero_minpack-exclusive-complimentary">
        <div class="section-container section-container_decor hero__container">
          <div class="section-container__inner hero__inner _center">
            <h1 id="title" class="tg-h0 our-offer-msg our-offer-msg_mec uppercase">
              <div class="our-offer-msg__star-wrap">
                <svg id="our-offer-msg-star" class="animated-star our-offer-msg__star" viewBox="0 0 384 388">
                  <g mask="url(#our-offer-msg-star-mask)">
                    <rect class="animated-star__bg" x="0" y="0" width="384" height="384"
                          fill="var(--color, currentColor)"/>
                    <circle class="animated-star__fill our-offer-msg__star-fill" cx="192" cy="200" r="0"
                            fill="var(--fill-color, #FF0000)"/>
                    <path
                      d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                      class="animated-star__body" stroke="var(--stroke-color, #FF0000)" fill="none"/>
                  </g>
                  <mask id="our-offer-msg-star-mask">
                    <path
                      d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                      fill="white"/>
                  </mask>
                </svg>
              </div>
              <span class="our-offer-msg__p_1">Exclusive</span><br>
              <div class="our-offer-msg__lightning-wrap">
                <div class="our-offer-msg__lightning">
                  <svg id="our-offer-msg-lightning" class="animated-lightning" viewBox="0 0 59 120" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <g class="animated-lightning__body">
                      <g clip-path="url(#our-offer-msg-lightning-clip)">
                        <path class="animated-lightning__p1" d="M0 0V59.73H29.43L0 0Z" fill="var(--color, currentColor)"/>
                      </g>
                      <path class="animated-lightning__p2" d="M29.4297 59.73L58.8497 119.46V59.73H29.4297Z"
                            fill="var(--color, currentColor)"/>
                    </g>
                    <defs>
                      <clipPath id="our-offer-msg-lightning-clip">
                        <rect x="0" y="0" width="29.43" height="59.73"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              Complimentary<br><span class="our-offer-msg__p_3">Consultation</span>
              <div class="our-offer-msg__infinity-wrap">
                <svg>
                  <use class="our-offer-msg__infinity" href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/decor-symbols.svg#infinity"></use>
                </svg>
              </div>
              <br><span class="tg-h3 our-offer-msg__p_2">for MinnPack Attendees</span></h1>
            <p class="tg-h3">It was a pleasure meeting you at the MinnPack trade show! Take advantage of a complimentary
              40-minute consultation, exclusively for MinnPack participants, and learn how you can strengthen your
              branding and packaging to make your brand more recognizable and increase sales.</p>
          </div>
        </div>
      </section>
      <section class="video-section video-section_interactive" data-component="interactive-video-section">
        <div class="section-container section-container_decor video-section__container">
          <div data-cursor="none" class="work-video work-video_mce video-section__video" data-component="work-video">
            <div class="img-wrap img-wrap_cover work-video__poster">
              <div class="img-wrap__inner">
                <picture>
                  <source type="image/avif" src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/about-us/video-poster.avif">
                  <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/about-us/video-poster.avif" alt="Iguana video poster">
                </picture>
              </div>
            </div>
            <div class="work-video__player-wrap">
              <iframe data-elem="work-video.video"
                      src="https://player.vimeo.com/video/1017111988?title=0&byline=0&portrait=0&background=1&controls=0&muted=1"
                      frameborder="0" allow="autoplay; fullscreen" allowfullscreen class="work-video__player">
              </iframe>
            </div>
            <button data-elem="work-video.playback-btn"
                    class="work-video-play-btn work-video__btn work-video__btn_playback">
              <div class="work-video-play-btn__title">Video play / pause</div>
              <div class="work-video-play-btn__inner">
                <span class="icon-play work-video-play-btn__icon work-video-play-btn__icon_play"></span>
                <span class="icon-pause work-video-play-btn__icon work-video-play-btn__icon_pause"></span>
              </div>
            </button>
            <button data-elem="work-video.sound-toggle-btn"
                    class="work-sound-toggle-btn work-video__btn work-video__btn_sound">
              <div class="work-sound-toggle-btn__title">Sound on / off</div>
              <div class="work-sound-toggle-btn__inner">
                <span class="icon-sound-on work-sound-toggle-btn__icon work-sound-toggle-btn__icon_on"></span>
                <span class="icon-sound-off work-sound-toggle-btn__icon work-sound-toggle-btn__icon_off"></span>
              </div>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div class="section-container section-container_decor">
          <div class="section-container__inner section-container__inner_space _center">
            <button id="to-booking" type="button" class="btn">
              Book a Consultation
              <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                <span class="icon-cubic-nav-arrow-right"></span>
                <span class="icon-cubic-nav-arrow-right"></span>
              </div>
            </button>
          </div>
        </div>
      </section>
      <section class="la-article">
        <div class="section-container section-container_decor">
          <div class="section-container__inner section-container__inner_bottom-space la-article__inner">
            <h2 class="tg-h1 la-article__title uppercase">What Our Clients Say</h2>
            <div class="la-article__section la-feedback-list">
              <div class="la-article-feedback">
                <div class="la-article-feedback__text">
                  <h3 class="tg-h3">Linnikov.agency are true professionals!</h3>
                  <div class="la-article-quote la-article-quote_double la-article-feedback__main">
                    <div class="la-article-quote__inner">We had the task of redesigning the packaging for pastilles. After
                      completing a comprehensive brief, the team approached the project with a holistic view. The result
                      was radically different from our initial vision, but we are extremely satisfied. Highly recommend!
                      Thank you!
                    </div>
                  </div>
                  <div class="la-article-feedback__from"><b>TeGusto</b></div>
                </div>
                <a href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/01_w.jpg" data-fancybox="works"
                   data-caption="Iguana energy drink"
                   class="la-article-feedback__img img-wrap img-wrap_cover la-article-img la-article-img_quad">
                  <div class="img-wrap__inner">
                    <picture>
                      <source srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/01.jpg" media="(min-width: 1201px)">
                      <source srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/01_w.jpg" media="(max-width: 1200px)">
                      <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/01_w.jpg" alt="01.jpg">
                    </picture>
                  </div>
                </a>
                <div class="double-cubic-decor la-article-feedback__decor la-article-feedback__decor_shift"></div>
                <div class="la-article-feedback__add tg-h3">
                  After redesigning retail sales increased by<br>
                  <div class="tg-huge">
                    <div data-count-up>44</div>
                    %
                  </div>
                </div>
                <div class="double-cubic-decor la-article-feedback__decor"></div>
              </div>
              <div class="la-article-feedback">
                <div class="la-article-feedback__text">
                  <h3 class="tg-h3">Linnikov team has been instrumental in the success of our brand</h3>
                  <div class="la-article-quote la-article-quote_double la-article-feedback__main">
                    <div class="la-article-quote__inner">We tasked the Linnikov agency with creating the design concept
                      for the Karamat cosmetics line and our perfume division. Thanks to Dmytro's leadership, more than 30
                      products with their designs have launched, and we've seen a direct impact on consumer interest and
                      revenue growth of 30-80%. Without the Linnikov team’s expertise, we wouldn't have achieved such
                      remarkable success in the international market.
                    </div>
                  </div>
                  <div class="la-article-feedback__from"><b>Karamat</b></div>
                </div>
                <a href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/02_w.jpg" data-fancybox="works"
                   data-caption="Iguana energy drink"
                   class="la-article-feedback__img img-wrap img-wrap_cover la-article-img la-article-img_quad">
                  <div class="img-wrap__inner">
                    <picture>
                      <source srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/02.jpg" media="(min-width: 1201px)">
                      <source srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/02_w.jpg" media="(max-width: 1200px)">
                      <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/02_w.jpg" alt="02.jpg">
                    </picture>
                  </div>
                </a>
                <div class="double-cubic-decor la-article-feedback__decor la-article-feedback__decor_shift"></div>
              </div>
              <div class="la-article-feedback">
                <div class="la-article-feedback__text">
                  <h3 class="tg-h3">This is one of the best creative agencies I’ve ever worked with. We were exceedingly
                    happy from start to finish.</h3>
                  <div class="la-article-quote la-article-quote_double la-article-feedback__main">
                    <div class="la-article-quote__inner">Linnikov was absolutely perfect. They performed above and beyond
                      expectations and were exceptional throughout the process. The team handled our nitpicking with
                      grace, offered valuable ideas, and communicated with the professionalism of those who take their
                      work seriously. I'll be bringing all of my future projects back to them. Thank you again!
                    </div>
                  </div>
                  <div class="la-article-feedback__from"><b>Nilo Brands</b></div>
                </div>
                <a href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/03_w.jpg" data-fancybox="works"
                   data-caption="Iguana energy drink"
                   class="la-article-feedback__img img-wrap img-wrap_cover la-article-img la-article-img_quad">
                  <div class="img-wrap__inner">
                    <picture>
                      <source srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/03.jpg" media="(min-width: 1201px)">
                      <source srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/03_w.jpg" media="(max-width: 1200px)">
                      <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/minpack-exclusive-complimentary/03_w.jpg" alt="03.jpg">
                    </picture>
                  </div>
                </a>
                <div class="double-cubic-decor la-article-feedback__decor la-article-feedback__decor_shift"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="booking" class="date-appointment">
        <div class="section-container section-container_decor">
          <div class="section-container__inner _center">
            <h2 class="tg-h2 date-appointment__title">Claim Your Complimentary 40-Minute Consultation</h2>
            <p class="tg-h4 date-appointment__cta-msg"><b>Select a Convenient Time for Your Meeting</b></p>
            <div class="date-appointment__calendar">
              <div class="calendly-inline-widget"
                   data-url="https://calendly.com/linnikov_agency/brand-audit?hide_event_type_details=1&hide_gdpr_banner=1"
                   style="min-width:320px;height:700px;"></div>
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
            </div>
            <p class="tg-h3 date-appointment__msg">We're excited to meet with you and discuss how we can help elevate your
              brand. Be prepared for an insightful conversation that could spark major growth for your business. See you
              soon!</p>
          </div>
        </div>
      </section>
    </main>
  </div>

<?php
get_template_part('templates/general/drawers-group');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
//get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();

