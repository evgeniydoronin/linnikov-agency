<?php
/**
 * Template Name: Single Work
 *
 * This template displays a single "work" custom post type.
 */

get_header();
?>

  <main>
    <?php
    // Получаем данные из метаполей
    // $hero_image_jpg = get_post_meta(get_the_ID(), '_linnikov_agency_hero_image_jpg', true);
    $hero_image_webp = get_post_meta(get_the_ID(), '_linnikov_agency_hero_image_webp', true);
    ?>

    <!--    1. Блок: hero.-->
    <section class="hero">
      <?php if ($hero_image_webp): ?>
        <a href="<?php echo esc_url($hero_image_webp); ?>"
           data-srcset="<?php echo esc_url($hero_image_webp); ?>"
           data-fancybox="work-media" class="hero__bg-img">
          <picture>
            <source type="image/webp"
                    srcset="<?php echo esc_url($hero_image_webp); ?>">
            <img src="<?php echo esc_url($hero_image_webp); ?>"
                 alt="Hero Image">
          </picture>
        </a>
      <?php endif; ?>
    </section>

    <!--    2. Блок: single-line-scroll-slider.-->
    <section id="single-line-scroll-slider" class="single-line-scroll-slider background">
      <div class="section-container section-container_decor single-line-scroll-slider__container" data-elem="container">
        <div class="single-line-scroll-slider__wrap" data-elem="wrap">
          <div class="single-line-scroll-slider__inner" data-elem="inner">
            <div class="section-container">
              <?php
              // Получаем данные из метаполя
              $slider_images = get_post_meta(get_the_ID(), '_linnikov_agency_slider_images', true);

              // Проверяем, есть ли сохраненные изображения
              if (is_array($slider_images) && !empty($slider_images)) : ?>
                <div class="single-line-scroll-slider__body" data-elem="body">
                  <?php foreach ($slider_images as $image) : ?>
                    <div class="single-line-scroll-slide">
                      <a href="<?php echo esc_url($image['webp']); ?>"
                         data-fancybox="work-media"
                         srcset="<?php echo esc_url($image['webp']); ?>"
                         data-caption="Iguana energy drink"
                         class="img-wrap img-wrap_cover single-line-scroll-slide__img">
                        <div class="img-wrap__inner">
                          <picture>
                            <?php if (!empty($image['webp'])) : ?>
                              <source type="image/webp" srcset="<?php echo esc_url($image['webp']); ?>">
                            <?php endif; ?>
                            <img src="<?php echo esc_url($image['webp']); ?>" alt="Iguana energy drink">
                          </picture>
                        </div>
                      </a>
                    </div>
                  <?php endforeach; ?>
                </div>
              <?php endif; ?>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--    3. Блок: work-pictures-tails-->
    <section class="work-pictures-tails background">
      <?php
      // Получаем данные из метаполей
      $pictures = get_post_meta(get_the_ID(), '_linnikov_agency_work_pictures', true);
      $video_url = get_post_meta(get_the_ID(), '_linnikov_agency_work_video_url', true);
      $video_poster_webp = get_post_meta(get_the_ID(), '_linnikov_agency_work_video_poster_webp', true);

      // Проверяем, есть ли сохраненные изображения и видео
      if (is_array($pictures) && !empty($pictures)) :
        ?>
        <div class="section-container section-container_decor work-pictures-tails__container"
             id="work-pictures-tails-container">
          <?php foreach ($pictures as $picture) : ?>
            <a href="<?php echo esc_url($picture['webp']); ?>"
               data-fancybox="work-media"
               srcset="<?php echo esc_url($picture['webp']); ?>"
               data-caption="Iguana energy drink"
               class="img-wrap img-wrap_cover work-pictures-tails__item">
              <div class="img-wrap__inner">
                <picture>
                  <?php if (!empty($picture['webp'])) : ?>
                    <source type="image/webp" srcset="<?php echo esc_url($picture['webp']); ?>">
                  <?php endif; ?>
                  <img src="<?php echo esc_url($picture['webp']); ?>" alt="Iguana energy drink">
                </picture>
              </div>
            </a>
          <?php endforeach; ?>

          <?php if (!empty($video_url)) : ?>
            <a href="<?php echo esc_url($video_url); ?>" data-cursor="none"
               data-fancybox="work-media" data-caption="Iguana energy drink"
               class="work-video work-pictures-tails__item work-pictures-tails__item_video" data-component="work-video">
              <div class="img-wrap img-wrap_cover work-video__poster">
                <div class="img-wrap__inner">
                  <picture>
                    <source type="image/webp" src="<?php echo esc_url($video_poster_webp); ?>">
                    <img src="<?php echo esc_url($video_poster_webp); ?>"
                         alt="">
                  </picture>
                </div>
              </div>
              <div class="work-video__player-wrap">
                <iframe data-elem="work-video.video"
                        src="<?php echo esc_url($video_url); ?>"
                        frameborder="0" allow="autoplay; fullscreen" class="work-video__player">
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
            </a>
          <?php endif; ?>
        </div>
      <?php endif; ?>
    </section>

    <!--    4. Блок: two-lines-scroll-slider-->
    <section id="two-lines-scroll-slider" class="two-lines-scroll-slider single-work__two-lines-slider">
      <div class="section-container section-container_decor two-lines-scroll-slider__container" data-elem="container">
        <div class="two-lines-scroll-slider__wrap" data-elem="wrap">
          <div class="two-lines-scroll-slider__inner" data-elem="inner">
            <?php
            $pictures = get_post_meta(get_the_ID(), '_linnikov_agency_two_lines_scroll_slider_images', true);

            if (is_array($pictures) && !empty($pictures)): ?>
              <div class="two-lines-scroll-slider__body" data-elem="body">
                <?php foreach ($pictures as $picture): ?>
                  <?php if (!empty($picture['webp'])): ?>
                    <a href="<?php echo esc_url($picture['webp']); ?>"
                       data-fancybox="work-media"
                       data-srcset="<?php echo esc_url($picture['webp']); ?>"
                       data-caption="Iguana energy drink"
                       class="two-lines-scroll-slider-slide">
                      <div class="img-wrap img-wrap_cover two-lines-scroll-slider-slide__img">
                        <div class="img-wrap__inner">
                          <picture>
                            <?php if (!empty($picture['webp'])): ?>
                              <source type="image/webp" srcset="<?php echo esc_url($picture['webp']); ?>">
                            <?php endif; ?>
                            <?php if (!empty($picture['webp'])): ?>
                              <img src="<?php echo esc_url($picture['webp']); ?>" alt="">
                            <?php endif; ?>
                          </picture>
                        </div>
                      </div>
                    </a>
                  <?php endif; ?>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </section>

    <!--    5. Блок: before-after-slider-->
    <section class="before-after-slider single-work__before-after-slider" data-component="before-after-slider">
      <?php
      $before_after_images = get_post_meta(get_the_ID(), '_linnikov_agency_before_after_images', true);

      if (is_array($before_after_images) && !empty($before_after_images)): ?>
        <div class="before-after-slider__inner" data-elem="inner">
          <?php if (!empty($before_after_images['after']['webp'])): ?>
            <div class="before-after-slider__after" data-elem="after">
              <div class="img-wrap img-wrap_cover">
                <div class="img-wrap__inner">
                  <picture>
                    <?php if (!empty($before_after_images['after']['webp'])): ?>
                      <source type="image/webp" srcset="<?php echo esc_url($before_after_images['after']['webp']); ?>">
                    <?php endif; ?>
                    <?php if (!empty($before_after_images['after']['webp'])): ?>
                      <img src="<?php echo esc_url($before_after_images['after']['webp']); ?>" alt="After Image">
                    <?php endif; ?>
                  </picture>
                </div>
              </div>
            </div>
          <?php endif; ?>

          <?php if (!empty($before_after_images['before']['webp'])): ?>
            <div class="before-after-slider__before" data-elem="before">
              <div class="img-wrap img-wrap_cover">
                <div class="img-wrap__inner">
                  <picture>
                    <?php if (!empty($before_after_images['before']['webp'])): ?>
                      <source type="image/webp" srcset="<?php echo esc_url($before_after_images['before']['webp']); ?>">
                    <?php endif; ?>
                    <?php if (!empty($before_after_images['before']['webp'])): ?>
                      <img src="<?php echo esc_url($before_after_images['before']['webp']); ?>" alt="Before Image">
                    <?php endif; ?>
                  </picture>
                </div>
              </div>
            </div>
          <?php endif; ?>

          <div class="before-after-slider__thumb" data-active="true" data-elem="thumb"></div>
        </div>
      <?php endif; ?>
    </section>

    <!--    6. Блок: nine-tiles-->
    <section id="nine-tiles" class="nine-tiles" data-component="nine-tiles">
      <div class="section-container section-container_decor nine-tiles__underlay"></div>
      <div class="nine-tiles__inner">
        <?php
        // Получаем данные из метаполя
        $items = get_post_meta(get_the_ID(), '_linnikov_agency_nine_tiles_items', true);

        if (is_array($items) && !empty($items)) {
          foreach ($items as $item) {
            if ($item['type'] === 'image') {
              // Выводим изображение
              ?>
              <div class="img-wrap img-wrap_cover">
                <div class="img-wrap__inner">
                  <picture>
                    <?php if (!empty($item['webp'])): ?>
                      <source type="image/webp" srcset="<?php echo esc_url($item['webp']); ?>">
                    <?php endif; ?>
                    <?php if (!empty($item['webp'])): ?>
                      <img src="<?php echo esc_url($item['webp']); ?>" alt="Tile Image">
                    <?php endif; ?>
                  </picture>
                </div>
              </div>
              <?php
            } elseif ($item['type'] === 'video') {
              // Выводим видео
              ?>
              <iframe src="<?php echo esc_url($item['video']); ?>" frameborder="0" allow="autoplay; fullscreen"
                      class="nine-tiles__video"></iframe>
              <?php
            }
          }
        }
        ?>
      </div>
    </section>

    <!--    7. Блок: more-works-->
    <?php
    // Получаем ID связанных работ
    $related_works = get_post_meta(get_the_ID(), '_linnikov_agency_related_works', true);


    if (is_array($related_works) && !empty($related_works)) {
      // Получаем посты, соответствующие сохраненным ID
      $args = array(
        'post_type' => 'work',
        'post__in' => $related_works,
        'orderby' => 'post__in', // сохраняем порядок
        'posts_per_page' => -1,
      );
      $works_query = new WP_Query($args);

      if ($works_query->have_posts()) :

        ?>
          <section class="more-works single-work__more-works" id="more-works">
              <div class="section-container section-container_decor more-works__container"></div>
              <h2>More works</h2>
              <div class="more-works__body" data-elem="works-slider.body">
                <?php
                // Цикл для вывода постов
                while ($works_query->have_posts()) : $works_query->the_post();
                  // Получаем изображение из метаполя
                  $hero_image_webp = get_post_meta(get_the_ID(), '_linnikov_agency_hero_image_webp', true);

                  // Если метаполе не пустое, выводим картинку
                  if ($hero_image_webp) : ?>
                      <a href="<?php the_permalink(); ?>" data-title="<?php the_title(); ?>" class="img-wrap img-wrap_cover case-poster case-poster_top more-works__item"
                         data-elem="works-slider.slide">
                          <div class="img-wrap__inner">
                              <picture>
                                  <source type="image/webp" srcset="<?php echo esc_url($hero_image_webp); ?>">
                                  <img src="<?php echo esc_url($hero_image_webp); ?>" alt="<?php the_title(); ?>">
                              </picture>
                          </div>
                      </a>
                  <?php endif;
                endwhile; ?>
              </div>
              <div class="more-works__footer">
                  <div class="section-container">
                      <div class="double-cubic-decor more-works__decor"></div>
                      <div class="tg-h3 more-works__nav">
                          <button type="button" class="text-btn" data-elem="works-slider.prev">
                              <div class="ref-arrow-icon ref-arrow-icon_horizontal ref-arrow-icon_flip">
                                  <span class="icon-cubic-nav-arrow-right"></span>
                                  <span class="icon-cubic-nav-arrow-right"></span>
                              </div>
                              Prev
                          </button>
                          <button type="button" class="text-btn" data-elem="works-slider.next">
                              Next
                              <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                                  <span class="icon-cubic-nav-arrow-right"></span>
                                  <span class="icon-cubic-nav-arrow-right"></span>
                              </div>
                          </button>
                      </div>
                  </div>
              </div>
          </section>
        <?php wp_reset_postdata(); ?>
      <?php endif;
    }
    ?>

    <!--    8. Блок: work-details-->
    <section data-lenis-prevent class="drawer drawer_full work-details" data-drawer="work-details">
      <div id="detail-panel" class="drawer__panel work-details__panel" data-elem="drawer.panel" data-scrollable="true">
        <div class="section-container work-details__container">
          <div class="work-details__inner">
            <nav id="article-nav" class="article-nav work-details__nav">
              <div class="article-nav__inner">
                <div class="article-nav__body">
                  <?php
                  // Проверяем наличие данных для каждого блока и выводим пункт навигации, если данные есть

                  // Challenge
                  $challenge_description = get_post_meta(get_the_ID(), '_linnikov_agency_challenge_description', true);
                  if (!empty($challenge_description)): ?>
                    <a href="#ap-challenge" class="article-nav-ref active">Challenge</a>
                  <?php endif; ?>

                  <?php
                  // Strategy
                  $strategy_description = get_post_meta(get_the_ID(), '_linnikov_agency_strategy_description', true);
                  $strategy_quote = get_post_meta(get_the_ID(), '_linnikov_agency_strategy_quote', true);
                  if (!empty($strategy_description)) : ?>
                    <a href="#ap-strategy" class="article-nav-ref">Strategy</a>
                  <?php endif; ?>

                  <?php
                  // Solution
                  $solution_description = get_post_meta(get_the_ID(), '_linnikov_agency_solution_description', true);
                  if (!empty($solution_description)): ?>
                    <a href="#ap-solution" class="article-nav-ref">Solution</a>
                  <?php endif; ?>

                  <?php
                  // Results
                  $results_description = get_post_meta(get_the_ID(), '_linnikov_agency_results_description', true);
                  $count_up_sections = get_post_meta(get_the_ID(), '_linnikov_agency_count_up_sections', true);
                  if (!empty($results_description)): ?>
                    <a href="#ap-results" class="article-nav-ref">Results</a>
                  <?php endif; ?>

                  <?php
                  // Team
                  $team_members = get_post_meta(get_the_ID(), '_linnikov_agency_team_members', true);
                  if (is_array($team_members) && !empty($team_members)): ?>
                    <a href="#ap-team" class="article-nav-ref">Team</a>
                  <?php endif; ?>

                  <?php
                  // Awards
                  $awards = get_post_meta(get_the_ID(), '_linnikov_agency_awards', true);
                  if (is_array($awards) && !empty($awards)): ?>
                    <a href="#ap-awards" class="article-nav-ref">Awards</a>
                  <?php endif; ?>
                </div>
              </div>
            </nav>
            <article class="work-details-content work-details__content">
              <?php
              // Получаем данные из мета-поля "Challenge"
              $challenge_description = get_post_meta(get_the_ID(), '_linnikov_agency_challenge_description', true);

              // Выводим секцию Challenge, если описание заполнено
              if (!empty($challenge_description)) : ?>
                <section class="work-details-content-section">
                  <span id="ap-challenge" class="work-details-content-section__anchor"></span>
                  <h3><?php _e('Challenge', 'linnikov-agency'); ?></h3>
                  <?php echo wp_kses_post($challenge_description); // Выводим описание, разрешая безопасные HTML-теги ?>
                </section>
              <?php endif; ?>

              <?php
              // Получение данных из мета-полей
              $strategy_quote = get_post_meta(get_the_ID(), '_linnikov_agency_strategy_quote', true);
              $strategy_author = get_post_meta(get_the_ID(), '_linnikov_agency_strategy_author', true);
              $strategy_role = get_post_meta(get_the_ID(), '_linnikov_agency_strategy_role', true);
              ?>

              <?php if (!empty($strategy_description)): ?>
                <section class="work-details-content-section">
                  <span id="ap-strategy" class="work-details-content-section__anchor"></span>
                  <h3>Strategy</h3>

                  <?php echo wpautop(wp_kses_post($strategy_description)); ?>

                  <?php if (!empty($strategy_quote)): ?>
                    <div class="article-quote">
                      <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/quotes.svg" alt="Quotes"
                           class="article-quote__quotes-img">
                      <p class="article-quote__body"><?php echo wp_kses_post($strategy_quote); ?></p>
                      <?php if (!empty($strategy_author)): ?>
                        <div class="article-quote__author"><?php echo esc_html($strategy_author); ?></div>
                      <?php endif; ?>
                      <?php if (!empty($strategy_role)): ?>
                        <div class="article-quote__role"><?php echo esc_html($strategy_role); ?></div>
                      <?php endif; ?>
                    </div>
                  <?php endif; ?>
                </section>
              <?php endif; ?>

              <?php if (!empty($solution_description)): ?>
                <section class="work-details-content-section">
                  <span id="ap-solution" class="work-details-content-section__anchor"></span>
                  <h3>Solution</h3>

                  <?php echo apply_filters('the_content', $solution_description); ?>
                </section>
              <?php endif; ?>


              <?php if (!empty($results_description)): ?>
                <section class="work-details-content-section">
                  <span id="ap-results" class="work-details-content-section__anchor"></span>
                  <h3>Results</h3>
                  <?php echo wpautop($results_description); ?>
                  <?php
                  // Получаем данные из мета-поля
                  $count_up_sections = get_post_meta(get_the_ID(), '_linnikov_agency_count_up_sections', true);

                  if (is_array($count_up_sections) && !empty($count_up_sections)) {
                    echo '<dl class="agency-rates">';

                    foreach ($count_up_sections as $section) {
                      echo '<div>';

                      if (isset($section['plus']) && $section['plus']) {
                        // Если установлен чекбокс 'plus', выводим с плюсом
                        echo '<dd class="tg-h0"><span data-count-up class="count-up_spacing-sm">' . esc_html($section['count']) . '</span>+</dd>';
                      } else {
                        // Если 'plus' не установлен, выводим обычное значение
                        echo '<dd data-count-up class="tg-h0">' . esc_html($section['count']) . '</dd>';
                      }

                      echo '<dt class="tg-h3">' . wp_kses_post($section['text']) . '</dt>';
                      echo '</div>';
                    }

                    echo '</dl>';
                  }
                  ?>
                </section>
              <?php endif; ?>

              <section class="work-details-content-section">
                <span id="ap-team" class="work-details-content-section__anchor"></span>
                <h3>Team</h3>
                <?php
                // Получаем данные из мета-поля
                $team_members = get_post_meta(get_the_ID(), '_linnikov_agency_team_members', true);

                if (is_array($team_members) && !empty($team_members)) {
                  echo '<dl class="work-details-team">';

                  foreach ($team_members as $member) {
                    echo '<div>';
                    echo '<dd>';
                    echo '<div class="work-details-team__separator"></div>';
                    echo esc_html($member['name']);
                    echo '</dd>';
                    echo '<dt>' . esc_html($member['position']) . '</dt>';
                    echo '</div>';
                  }

                  echo '</dl>';
                }
                ?>
              </section>

              <?php if (is_array($awards) && !empty($awards)): ?>
              <section class="work-details-content-section">
                <span id="ap-awards" class="work-details-content-section__anchor"></span>
                <h3>Awards</h3>
                <?php
                // Получаем данные из мета-поля
                $awards = get_post_meta(get_the_ID(), '_linnikov_agency_awards', true);

                  echo '<ul class="awards-showcase">';

                  foreach ($awards as $award) {
                    echo '<li class="award-card">';
                    echo '<div class="award-card__top">';
                    echo '<div class="award-card__year">‘' . esc_html($award['year']) . '</div>';
                    echo '<div class="img-wrap award-card__img">';
                    echo '<img src="' . esc_url($award['img']) . '" alt="' . esc_attr($award['award_name']) . '">';
                    echo '</div>';
                    echo '</div>';
                    echo '<div class="award-card__separator"></div>';
                    echo '<div class="award-card__award-name">' . esc_html($award['award_name']) . '</div>';
                    echo '<h4 class="award-card__project-name">' . esc_html($award['project_name']) . '</h4>';
                    echo '<div class="award-card__place">' . esc_html($award['award_place']) . '</div>';
                    echo '</li>';
                  }

                  echo '</ul>';
                ?>
              </section>
              <?php endif; ?>

            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="work-details-overlay">
      <div class="section-container work-details__container">
        <button id="details-open-close-btn" class="open-close-btn work-details__open-close-btn"
                data-drawer-toggle="work-details">
          <div class="open-close-btn__inner">
            <span class="icon-cubic-plus-big open-close-btn__icon"></span>
            Project Info
          </div>
        </button>
      </div>
    </section>

  </main>

<?php
get_template_part('templates/general/drawers-group');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();