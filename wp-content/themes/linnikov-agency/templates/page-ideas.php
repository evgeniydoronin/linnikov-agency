<?php
/**
 * Template Name: Ideas
 *
 */

get_header();
?>

  <main>
    <section class="hero">
      <div class="section-container section-container_decor hero__container">
        <nav id="nav" class="tg-control materials-filter_center hero__nav">
          <div class="tg-control uppercase materials-filter__inner">
            <?php
            if (has_nav_menu('about-menu')) {
              wp_nav_menu(array(
                'theme_location' => 'about-menu',  // Локация зарегистрированного меню
                'menu_class' => 'ideas-page-menu',  // Класс для меню страницы "Ideas"
                'container' => false,  // Убираем обертку div
                'items_wrap' => '%3$s',  // Убираем обертки ul и li
                'walker' => new Custom_Nav_Walker(),  // Используем кастомный Walker
                'fallback_cb' => false,  // Отключаем автоматический вывод, если меню не задано
              ));
            }
            ?>
          </div>
        </nav>
        <h1 class="tg-h1">Ideas</h1>
      </div>
    </section>
    <section id="ideas-grid" class="ideas-grid" data-component="materials-grid">
      <div class="section-container section-container_decor ideas-grid__container">
        <div class="ideas-grid__body" data-elem="materials-grid.body">
          <a href="." class="idea-card ideas-grid__card" data-column="1" data-category="strategy">
            <div class="idea-card__img">
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/PSIHOTIP.svg" alt="Psychotypes">
            </div>
            <div class="idea-card__body">
              <div class="idea-card__category">
                <span class="icon-cubic-zip"></span>Strategy
              </div>
              <h4 class="idea-card__title">Psychotypes</h4>
            </div>
          </a>
          <a href="." class="idea-card ideas-grid__card" data-column="2" data-category="design">
            <div class="idea-card__img">
              <picture>
                <source type="image/avif" srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-02.avif">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-02.jpg"
                     alt="Design is not what we make. Design is what we make possible.">
              </picture>
            </div>
            <div class="idea-card__body">
              <div class="idea-card__category">
                <span class="icon-cubic-zip"></span>Design
              </div>
              <h4 class="idea-card__title">Design is not what we make. Design is what we make possible.</h4>
            </div>
          </a>
          <a href="." class="idea-card ideas-grid__card" data-column="2" data-category="design">
            <div class="idea-card__img">
              <picture>
                <source type="image/avif" srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-03.avif">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-03.jpg" alt="How to Slay aPlastic Dragon">
              </picture>
            </div>
            <div class="idea-card__body">
              <div class="idea-card__category">
                <span class="icon-cubic-zip"></span>Design
              </div>
              <h4 class="idea-card__title">How to Slay aPlastic Dragon</h4>
            </div>
          </a>
          <a href="." class="idea-card ideas-grid__card" data-column="1" data-category="strategy">
            <div class="idea-card__img">
              <picture>
                <source type="image/avif" srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/archetypes.svg">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/archetypes.svg" alt="Archetypes">
              </picture>
            </div>
            <div class="idea-card__body">
              <div class="idea-card__category">
                <span class="icon-cubic-zip"></span>Strategy
              </div>
              <h4 class="idea-card__title">Archetypes</h4>
            </div>
          </a>
          <a href="." class="idea-card ideas-grid__card" data-column="1" data-category="strategy">
            <div class="idea-card__img">
              <picture>
                <source type="image/avif" srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-05.avif">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-05.jpg"
                     alt="Design is not what we make. Design is what we make possible.">
              </picture>
            </div>
            <div class="idea-card__body">
              <div class="idea-card__category">
                <span class="icon-cubic-zip"></span>Strategy
              </div>
              <h4 class="idea-card__title">Design is not what we make. Design is what we make possible.</h4>
            </div>
          </a>
          <a href="." class="idea-card ideas-grid__card" data-column="2" data-category="design">
            <div class="idea-card__img">
              <picture>
                <source type="image/avif" srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-06.avif">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-06.jpg" alt="How to Slay aPlastic Dragon">
              </picture>
            </div>
            <div class="idea-card__body">
              <div class="idea-card__category">
                <span class="icon-cubic-zip"></span>Design
              </div>
              <h4 class="idea-card__title">How to Slay aPlastic Dragon</h4>
            </div>
          </a>
          <a href="." class="idea-card ideas-grid__card" data-column="3" data-category="business">
            <div class="idea-card__img">
              <picture>
                <source type="image/avif" srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-07.avif">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/ideas/placeholder-07.jpg"
                     alt="Cora’s fearless Founder, Molly Hayward, on how being audacious attracts new audiences">
              </picture>
            </div>
            <div class="idea-card__body">
              <div class="idea-card__category">
                <span class="icon-cubic-zip"></span>Business
              </div>
              <h4 class="idea-card__title">Cora’s fearless Founder, Molly Hayward, on how being audacious attracts new
                audiences</h4>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="subscription">
      <div class="section-container section-container_decor subscription__container">
        <div class="subscription__separator"></div>
        <h2 class="tg-h1">Subscribe on our newsletter</h2>
        <button type="button" class="btn" data-drawer-open="sign-up">
          Subscribe
          <div class="ref-arrow-icon ref-arrow-icon_horizontal">
            <span class="icon-cubic-nav-arrow-right"></span>
            <span class="icon-cubic-nav-arrow-right"></span>
          </div>
        </button>
      </div>
    </section>

    <section class="fixed-materials-filter ideas-grid__filter" data-component="materials-filter" data-for="ideas-grid">
      <div class="fixed-materials-filter__panel">
        <div class="section-container fixed-materials-filter__container">
          <nav class="tg-control uppercase keen-slider fixed-materials-filter__slider" data-elem="slider">
            <a href="#all" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_2" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_2-clip)"
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
                  <clipPath id="ideas-filter__lightning_2-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">All</div>
            </a>
            <a href="#strategy" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_3" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_3-clip)"
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
                  <clipPath id="ideas-filter__lightning_3-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Strategy</div>
            </a>
            <a href="#design" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_4" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_4-clip)"
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
                  <clipPath id="ideas-filter__lightning_4-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Design</div>
            </a>
            <a href="#business" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_5" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_5-clip)"
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
                  <clipPath id="ideas-filter__lightning_5-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Business</div>
            </a>
            <a href="#success-stories" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_6" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_6-clip)"
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
                  <clipPath id="ideas-filter__lightning_6-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Success stories</div>
            </a>
            <a href="#work-culture" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_7" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_7-clip)"
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
                  <clipPath id="ideas-filter__lightning_7-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">WORK CULTURE</div>
            </a>
            <a href="#trends" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_8" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_8-clip)"
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
                  <clipPath id="ideas-filter__lightning_8-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Trends</div>
            </a>
          </nav>
        </div>
        <div class="fixed-materials-filter__tips slider-tips" data-elem="tips">
          <button class="icon-cubic-nav-arrow-left slider-tips__arrow-left" data-elem="materials-filter.prev"></button>
          <div class="slider-tips__square"></div>
          <button class="icon-cubic-nav-arrow-right slider-tips__arrow-right" data-elem="materials-filter.next"></button>
        </div>
      </div>
    </section>
  </main>

<?php
get_template_part('templates/general/drawers-group-ideas');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();