<?php get_header(); ?>

  <div>
    <main>
      <section class="hero background">
        <div class="section-container section-container_decor">
          <div id="cases-slider" class="zoom-slider hero__slider">
            <style data-zs-elem="style"></style>
            <div class="zoom-slider__body" data-zs-elem="body">
              <div class="zoom-slider__wrapper" data-zs-elem="wrapper">
                <?php
                // Получаем сохраненный порядок постов для второго контейнера
                $secondary_order = get_option('_linnikov_agency_secondary_work_order', '');

                if (!empty($secondary_order)) {
                  // Преобразуем строку в массив ID постов
                  $selected_secondary_posts = explode(',', $secondary_order);

                  // Запрос для получения постов по сохраненному порядку
                  $args = array(
                    'post_type' => 'work',
                    'post__in' => $selected_secondary_posts,
                    'orderby' => 'post__in',
                    'posts_per_page' => -1,
                    'post_status' => 'publish',
                  );
                  $query = new WP_Query($args);

                  if ($query->have_posts()) :
                    while ($query->have_posts()) : $query->the_post();
                      // Получаем URL изображения из featured image
                      $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large');
                      $image_webp = get_the_post_thumbnail_url(get_the_ID(), 'full-webp'); // Для webp, если поддерживается
                      $title = get_the_title();
                      $permalink = get_permalink();
                      ?>
                      <a href="<?php echo esc_url($permalink); ?>" class="img-wrap img-wrap_cover case-poster case-poster_home-slider zoom-slider__slide"
                         data-caption="<?php echo esc_attr($title); ?>" data-zs-elem="slide">
                        <div class="img-wrap__inner">
                          <picture>
                            <?php if ($image_webp): ?>
                              <source type="image/webp" srcset="<?php echo esc_url($image_webp); ?>">
                            <?php endif; ?>
                            <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($title); ?>" loading="lazy">
                          </picture>
                        </div>
                        <div class="reveal-wrap case-poster__title">
                          <div class="reveal-wrap__inner">
                            <div class="line"><?php echo esc_html($title); ?></div>
                          </div>
                        </div>
                      </a>
                    <?php
                    endwhile;
                    wp_reset_postdata();
                  endif;
                }
                ?>
              </div>
            </div>
            <div id="cases-slider-control" class="zoom-slider-control zoom-slider__control">
              <div class="zoom-slider-control__label">Move for scale photos</div>
              <div class="zoom-slider-control__body">
                <button class="zoom-slider-control__zoom-out-btn" data-zsc-zoom-out-btn>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div class="zoom-slider-control__bar" data-active="true" data-zsc-bar>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <button class="zoom-slider-control__zoom-in-btn" data-zsc-zoom-in-btn>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="animated-logo-layer" class="hero__logo-layer">
          <div class="section-container hero__logo-container">
            <div class="hero__logo">
              <div id="animated-logo" class="hero__animated-logo"></div>
              <div class="logo hero__mob-logo">
                <figure>
                  <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/logo-bright.svg"
                       class="logo__img" alt="Light Logo">
                  <figcaption aria-hidden="true">Main page</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="logo-animation-spacer">
      </section>
      <section id="about" class="about background" data-track-intersection>
        <div class="section-container section-container_decor about__container">
          <div class="section-container__inner" data-component="sliding-text">
            <h1 class="text-rgb-shake" data-elem="text">
              <div class="about-text-wrap" data-elem="main-text">Linnikov is a transformation branding agency specializing in business evolution</div>
              <div class="text-rgb-shake__set about__rgb-set" aria-hidden="true" data-elem="rgb-set">
                <div class="about-text-wrap">Linnikov is a transformation branding agency specializing in business evolution</div>
                <div class="about-text-wrap">Linnikov is a transformation branding agency specializing in business evolution</div>
                <div class="about-text-wrap">Linnikov is a transformation branding agency specializing in business evolution</div>
              </div>
            </h1>
            <div class="section-decor about__decor" data-elem="decor">
              <div class="section-decor__inner" data-elem="decor.inner">
                <div class="reveal-wrap section-decor__item">
                  <div class="reveal-wrap__inner">
                    <div class="section-decor__item-body"></div>
                  </div>
                </div>
                <div class="reveal-wrap section-decor__item">
                  <div class="reveal-wrap__inner">
                    <div class="section-decor__item-body"></div>
                  </div>
                </div>
                <div class="reveal-wrap section-decor__item">
                  <div class="reveal-wrap__inner">
                    <div class="section-decor__item-body"></div>
                  </div>
                </div>
                <div class="reveal-wrap section-decor__item">
                  <div class="reveal-wrap__inner">
                    <div class="section-decor__item-body"></div>
                  </div>
                </div>
              </div>
              <div class="section-decor__rgb-set">
                <div class="section-decor">
                  <div class="section-decor__inner">
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="section-decor">
                  <div class="section-decor__inner">
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="section-decor">
                  <div class="section-decor__inner">
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                    <div class="reveal-wrap section-decor__item">
                      <div class="reveal-wrap__inner">
                        <div class="section-decor__item-body"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="top-cases background home__top-cases" id="top-cases">
        <div class="section-container section-container_decor top-cases__container">
          <nav class="materials-filter top-cases__filter">
            <div class="tg-control uppercase materials-filter__inner">
              <a href="#all" class="text-btn" data-component="animated-link">
                <svg id="works-filter__lightning_1" class="animated-cubic-lightning text-btn__lightning"
                     viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="animated-cubic-lightning__body" clip-path="url(#works-filter__lightning_1-clip)"
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
                    <clipPath id="works-filter__lightning_1-clip">
                      <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                      <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                    </clipPath>
                  </defs>
                </svg>
                <div class="text-btn__cap">All</div>
              </a>
              <a href="#branding" class="text-btn" data-component="animated-link">
                <svg id="works-filter__lightning_2" class="animated-cubic-lightning text-btn__lightning"
                     viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="animated-cubic-lightning__body" clip-path="url(#works-filter__lightning_2-clip)"
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
                    <clipPath id="works-filter__lightning_2-clip">
                      <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                      <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                    </clipPath>
                  </defs>
                </svg>
                <div class="text-btn__cap">Branding</div>
              </a>
              <a href="#packaging" class="text-btn" data-component="animated-link">
                <svg id="works-filter__lightning_3" class="animated-cubic-lightning text-btn__lightning"
                     viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="animated-cubic-lightning__body" clip-path="url(#works-filter__lightning_3-clip)"
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
                    <clipPath id="works-filter__lightning_3-clip">
                      <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                      <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                    </clipPath>
                  </defs>
                </svg>
                <div class="text-btn__cap">Packaging</div>
              </a>
              <a href="#digital" class="text-btn" data-component="animated-link">
                <svg id="works-filter__lightning_4" class="animated-cubic-lightning text-btn__lightning"
                     viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g class="animated-cubic-lightning__body" clip-path="url(#works-filter__lightning_4-clip)"
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
                    <clipPath id="works-filter__lightning_4-clip">
                      <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                      <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                    </clipPath>
                  </defs>
                </svg>
                <div class="text-btn__cap">Digital</div>
              </a>
            </div>
          </nav>

          <?php
          // Получаем сохраненный порядок постов
          $main_page_order = get_option('_linnikov_agency_main_page_work_order', '');

          if (!empty($main_page_order)) {
            // Преобразуем строку с ID постов в массив
            $post_ids = explode(',', $main_page_order);

            // Создаем запрос для получения постов в указанном порядке
            $args = array(
              'post_type' => 'work',
              'post__in' => $post_ids,
              'orderby' => 'post__in', // Порядок по ID
            );
            $query = new WP_Query($args);

            if ($query->have_posts()) {
              echo '<div class="top-cases__body" data-top-cases-elem="body">';
              while ($query->have_posts()) {
                $query->the_post();

                // Получаем теги (таксономия work_tag)
                $tags = get_the_terms(get_the_ID(), 'work_tag');
                $tag_slugs = array();
                if ($tags) {
                  foreach ($tags as $tag) {
                    $tag_slugs[] = $tag->slug;
                  }
                }

                // Преобразуем теги в строку через запятую
                $tag_data = implode(', ', $tag_slugs);

                // Получаем Hero image из метаполя
                $main_image_webp = get_post_meta(get_the_ID(), '_linnikov_agency_main_image_webp', true);
                $main_image_jpg = str_replace('.webp', '.jpg', $main_image_webp); // Предполагаем, что JPG изображение имеет тот же путь, что и WebP, но с другим расширением
                // $image_url = get_the_post_thumbnail_url(get_the_ID(), 'large'); // Получаем URL изображения

                $title = get_the_title();

                // Вывод работы
                echo '
                    <a href="' . get_permalink() . '" class="img-wrap img-wrap_cover case-poster case-poster_top" data-caption="' . esc_attr($title) . '" data-category="' . esc_attr($tag_data) . '">
                        <div class="img-wrap__inner">
                            <picture>
                                <img src="' . esc_url($main_image_webp) . '" alt="' . esc_attr($title) . '" loading="lazy">
                            </picture>
                        </div>
                    </a>';
              }
              echo '</div>';
              wp_reset_postdata(); // Сбрасываем глобальные данные постов
            }
          } else {
            echo '<p>No posts available.</p>';
          }
          ?>

          <div class="top-cases__all-works">
            <?php
            // Получаем ссылку на архив всех работ
            $archive_url = get_post_type_archive_link('work'); ?>
            <a href="<?php echo esc_url($archive_url); ?>" class="tg-control text-btn" data-component="animated-link">
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
              <div class="text-btn__cap">All works</div>
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
    </main>

    <?php
    get_template_part('templates/general/drawers-group');
    get_template_part('templates/general/scroll-indicator.php');
    get_template_part('templates/general/toasts');
    get_template_part('templates/general/cursor');
    get_template_part('templates/general/ref-to-clipboard');
    get_template_part('templates/general/cta-widget');
    get_template_part('templates/general/main-footer');
    ?>
  </div>
<?php
get_footer();