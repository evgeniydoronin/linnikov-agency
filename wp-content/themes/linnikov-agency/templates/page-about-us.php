<?php
/**
 * Template Name: About us
 *
 */

get_header();
?>

  <main>
    <?php
    // Navigation
    $about_navigation = locate_template('templates/general/about-navigation.php');

    if ($about_navigation) {
      require $about_navigation;
    }
    $post_id = get_the_ID(); // Получаем ID текущего поста
    ?>
    <section class="video-section video-section_interactive" data-component="interactive-video-section">
      <div class="section-container section-container_decor video-section__container">
        <div data-cursor="none" class="work-video video-section__video" data-component="work-video">
          <div class="img-wrap img-wrap_cover work-video__poster">
            <div class="img-wrap__inner">
              <?php
              // Получаем значение метаполя 'linnikov_agency_video_poster'
              $video_poster = get_post_meta($post_id, '_linnikov_agency_video_poster', true);
              if (!empty($video_poster)) : ?>
                <picture>
                  <source type="image/avif"
                          src="<?php echo $video_poster; ?>">
                  <img src="<?php echo $video_poster; ?>"
                       alt="Iguana video poster">
                </picture>
              <?php endif; ?>
            </div>
          </div>
          <div class="work-video__player-wrap">
            <?php
            // Получаем значение метаполя 'linnikov_agency_video_url'
            $video_url = get_post_meta($post_id, '_linnikov_agency_video_url', true);
            if (!empty($video_url)) : ?>
              <iframe data-elem="work-video.video"
                      src="<?php echo $video_url; ?>"
                      frameborder="0" allow="autoplay; fullscreen" allowfullscreen class="work-video__player">
              </iframe>
            <?php endif; ?>
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
    <section class="agency-in-numbers">
      <div class="section-container section-container_decor">
        <div class="section-container__inner agency-in-numbers__body">
          <h2 class="tg-h2 agency-in-numbers__title">Linnikov<br>in numbers</h2>
          <?php
          // Получаем данные из метаполя
          $count_up_sections = get_post_meta(get_the_ID(), '_linnikov_agency_count_up_sections', true);

          if (is_array($count_up_sections) && !empty($count_up_sections)) {
            echo '<dl class="agency-rates">';

            foreach ($count_up_sections as $section) {
              echo '<div>';

              // Проверяем, есть ли параметр 'plus'
              if ($section['plus']) {
                echo '<dd class="tg-huge"><span data-count-up class="count-up_spacing-sm">' . esc_html($section['count']) . '</span>+</dd>';
              } else {
                echo '<dd data-count-up class="tg-huge">' . esc_html($section['count']) . '</dd>';
              }

              // Выводим текст
              echo '<dt class="tg-h3">' . wp_kses_post($section['text']) . '</dt>';
              echo '</div>';
            }

            echo '</dl>';
          }
          ?>
        </div>
      </div>
    </section>
    <section id="testimonials" class="testimonials about-us__testimonials">
      <div class="section-container section-container_decor testimonials__container">
        <div class="testimonials__wrap">
          <?php
          // Получаем данные testimonials из метаполя
          $testimonials = get_post_meta(get_the_ID(), '_linnikov_agency_testimonials', true);
          ?>
          <div class="testimonials__inner">
            <div class="testimonials__decor">“</div>
            <?php
            function format_company_name($company)
            {
              // Преобразуем строку в нижний регистр и заменяем пробелы на дефисы
              return strtolower(str_replace(' ', '-', sanitize_title($company)));
            }

            if (is_array($testimonials) && !empty($testimonials)) {
              // Keen-slider container
              echo '<div class="keen-slider testimonials__header">';

              foreach ($testimonials as $testimonial) {
                $company_name_formatted = format_company_name($testimonial['company']);

                // Выводим каждый слайд в keen-slider
                echo '<div class="keen-slider__slide">';
                echo '<button type="button" class="testimonials-btn testimonials__client" data-name="' . esc_attr($company_name_formatted) . '" data-default-selected="true">';
                echo '<div class="testimonials-btn__cap">Select by ' . esc_html($testimonial['company']) . '</div>';
                echo '<img src="' . esc_url($testimonial['image']) . '" class="testimonials-btn__logo" alt="' . esc_attr($testimonial['company']) . '">';
                echo '</button>';
                echo '</div>';
              }

              echo '</div>'; // Закрываем keen-slider

              // Testimonials body container
              echo '<div class="testimonials__body">';

              foreach ($testimonials as $testimonial) {
                $company_name_formatted = format_company_name($testimonial['company']);

                // Выводим каждую testimonial-card
                echo '<div class="testimonials-card" data-name="' . esc_attr($company_name_formatted) . '">';
                echo '<div class="testimonials-card__inner">';
                echo '<div class="testimonials-card__info tg-service uppercase">';
                echo '<div class="testimonials-card__name">' . esc_html($testimonial['client']) . '</div>';
                echo '<div class="testimonials-card__title">' . esc_html($testimonial['job']) . '</div>';
                echo '</div>';

                echo '<div class="testimonials-card__quote">';
                echo '<div class="tg-h3 testimonials-quote">';
                echo '<span class="testimonials-quote-sign testimonials-quote-sign_open">“</span>';
                echo '<span data-to-split>';
                echo esc_html($testimonial['part1']) . ' <span class="white-space-nowrap">' . esc_html($testimonial['part2']);
                echo '<span class="testimonials-quote-sign testimonials-quote-sign_close">”</span></span>';
                echo '</span>';
                echo '</div>';
                echo '</div>'; // Закрываем testimonials-card__quote

                echo '</div>'; // Закрываем testimonials-card__inner
                echo '</div>'; // Закрываем testimonials-card
              }

              echo '</div>'; // Закрываем testimonials__body
            }

            ?>
          </div>
          <div class="testimonials-pagination testimonials__pagination"></div>
        </div>
      </div>
    </section>
    <section class="our-awards">
      <div class="section-container section-container_decor">
        <div class="section-container__inner our-awards__header">
          <h2 class="tg-h2">Our awards</h2>
        </div>
      </div>
      <div class="section-container section-container_decor">
        <div class="section-container__inner our-awards__body">
          <div class="awards-showcase-flex">
            <?php
            // Получаем данные из метаполя
            $awards = get_post_meta(get_the_ID(), '_linnikov_agency_awards', true);

            if (is_array($awards) && !empty($awards)) {
              echo '<ul class="awards-showcase-flex__inner">';

              // Выводим первый элемент с уникальной версткой
              $first_award = $awards[0];

              echo '<li class="awards-showcase-flex__item">';
              echo '<a href="' . esc_url($first_award['link']) . '" class="award-card award-card_rate">';
              echo '<div class="award-card__top">';
              echo '<div class="award-card__top-inner">';
              echo '<div class="award-card__top-layout">';

              // Изображение проекта
              echo '<div class="img-wrap award-card__img">';
              echo '<div class="img-wrap__inner">';
              echo '<img src="' . esc_url($first_award['file']) . '" alt="' . esc_attr($first_award['project_name']) . '">';
              echo '</div>';
              echo '</div>';

              // Оценка и отзывы
              echo '<div class="award-card__rate">';
              echo '<div class="icon-star"></div>';
              echo '<div class="icon-star"></div>';
              echo '<div class="icon-star"></div>';
              echo '<div class="icon-star"></div>';
              echo '<div class="icon-star"></div>';
              echo '</div>'; // Закрываем rate

              echo '<div class="award-card__reviews">' . esc_html($first_award['reviews']) . '</div>';

              echo '</div>'; // Закрываем top-layout
              echo '</div>'; // Закрываем top-inner
              echo '</div>'; // Закрываем top

              echo '<div class="award-card__separator"></div>';

              // Название награды и проект
              echo '<div class="award-card__bottom">';
              echo '<div class="award-card__info">';
              echo '<div class="award-card__award-name">' . esc_html($first_award['award_name']) . '</div>';
              echo '<h4 class="award-card__project-name">' . esc_html($first_award['project_name']) . '</h4>';
              echo '</div>';

              echo '<span class="ref-arrow-icon award-card__arrow">';
              echo '<span class="icon-cubic-ref-arrow"></span>';
              echo '<span class="icon-cubic-ref-arrow"></span>';
              echo '</span>'; // Закрываем стрелку

              echo '</div>'; // Закрываем bottom
              echo '</a>';
              echo '</li>'; // Закрываем первый элемент

              // Вывод остальных элементов с другой версткой
              for ($i = 1; $i < count($awards); $i++) {
                $award = $awards[$i];

                echo '<li class="awards-showcase-flex__item">';
                echo '<div class="award-card">';
                echo '<div class="award-card__top">';

                // Год награды
                echo '<div class="award-card__year">‘' . esc_html($award['year']) . '</div>';

                // Изображение проекта
                echo '<div class="img-wrap award-card__img">';
                echo '<img src="' . esc_url($award['image']) . '" alt="' . esc_attr($award['project_name']) . '">';
                echo '</div>';

                echo '</div>'; // Закрываем top
                echo '<div class="award-card__separator"></div>';

                // Название награды и проект
                echo '<div class="award-card__award-name">' . esc_html($award['award_name']) . '</div>';
                echo '<h4 class="award-card__project-name">' . esc_html($award['project_name']) . '</h4>';

                // Описание награды
                echo '<div class="award-card__place">' . esc_html($award['description']) . '</div>';

                echo '</div>'; // Закрываем award-card
                echo '</li>';
              }

              echo '</ul>'; // Закрываем общий контейнер
            }
            ?>
          </div>
        </div>
      </div>
    </section>
    <div id="about-us-motto" class="about-us-motto" data-track-intersection>
      <div class="section-container section-container_decor">
        <div class="section-container__inner about-us-motto__inner">
          <div class="about-us-motto__body">
            <div class="reveal-wrap about-us-motto__star-wrap">
              <div class="reveal-wrap__inner">
                <svg id="about-us-motto-star" class="animated-star reveal-wrap__item about-us-motto__star"
                     viewBox="0 0 384 388">
                  <g mask="url(#about-us-motto-star-mask)">
                    <rect class="animated-star__bg" x="0" y="0" width="384" height="384"
                          fill="var(--color, currentColor)"/>
                    <circle class="animated-star__fill" cx="192" cy="200" r="0"
                            fill="var(--fill-color, #FF0000)"/>
                    <path
                        d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                        class="animated-star__body" stroke="var(--stroke-color, #FF0000)"
                        fill="none"/>
                  </g>
                  <mask id="about-us-motto-star-mask">
                    <path
                        d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                        fill="white"/>
                  </mask>
                </svg>
              </div>
            </div>
            <div class="tg-h2 about-us-motto__msg uppercase">
              <div class="reveal-wrap">
                <div class="reveal-wrap__inner">
                  <div class="reveal-wrap__item">Achieve</div>
                </div>
              </div>
              <div class="reveal-wrap">
                <div class="reveal-wrap__inner">
                  <div class="reveal-wrap__item">ambitions</div>
                </div>
              </div>
            </div>
            <div class="reveal-wrap about-us-motto__decor-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item about-us-motto__decor double-cubic-decor"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="falling-leaf-cards" class="falling-leaf-cards">
      <div class="falling-leaf-cards__sticky-wrap">
        <div class="only-vetical-overflow">
          <div class="section-container section-container_decor falling-leaf-cards__container">
            <div class="falling-leaf-cards__bg">
              <span>AchieveAc<br>ambitions</span>
            </div>
            <div class="falling-leaf-cards__inner">
              <div id="falling-leaf-cards-container" class="falling-leaf-cards__cards">
                <div id="card-01" class="about-us-card about-us-card_t1">
                  <div class="about-us-card__container">
                    <div class="about-us-card__inner">
                      <h4 class="about-us-card__title">
                        <div>Branding is a tool for realizing ambitions!</div>
                      </h4>
                      <div class="steps-animation about-us-card__steps-animation">
                        <div class="steps-animation__inner">
                          <svg id="card-1-steps-animation" class="steps-animation__svg"
                               viewBox="0 0 432 268" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <clipPath id="step-2-clip">
                                <rect x="82.0469" y="207.386" width="79" height="14"/>
                              </clipPath>
                              <clipPath id="step-3-clip">
                                <rect x="169.047" y="182.386" width="79" height="14"/>
                              </clipPath>
                              <clipPath id="step-4-clip">
                                <rect x="239.047" y="151.386" width="66" height="14"/>
                              </clipPath>
                              <clipPath id="step-5-clip">
                                <rect x="301.047" y="121.386" width="47" height="14"/>
                              </clipPath>
                              <clipPath id="step-6-clip">
                                <rect x="344.047" y="93.3857" width="34" height="14"/>
                              </clipPath>
                            </defs>
                            <g class="steps">
                              <g class="step step_01">
                                <g class="step__inner">
                                  <rect x="12.0234" y="248" width="64" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="76.0234" y="258" width="48" height="10"
                                        fill="var(--light-black)"/>
                                </g>
                              </g>
                              <g class="step step_02" clip-path="url(#step-2-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="82.0469"
                                        y="207.386" width="75" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="87.0469" y="212.386" width="73" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_03" clip-path="url(#step-3-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="169.047"
                                        y="182.386" width="75" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="174.047" y="187.386" width="73" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_04" clip-path="url(#step-4-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="239.047"
                                        y="151.386" width="62" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="244.047" y="156.386" width="60" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_05" clip-path="url(#step-5-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="301.047"
                                        y="121.386" width="43" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="306.047" y="126.386" width="41" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_06" clip-path="url(#step-6-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="344.047"
                                        y="93.3857" width="30" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="349.047" y="98.3857" width="28" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                            </g>
                            <g class="star-1">
                              <path class="star__shadow" opacity="0.15"
                                    d="M30.0781 162.438L0 154.938L4.6875 139.859L33.6719 152.359L31.25 119H47.0312L44.2969 152.828L73.0469 140.562L77.8125 155.875L47.2656 163.062L67.8125 188.375L54.9219 197.828L38.3594 169L21.875 196.969L8.90625 187.984L30.0781 162.438Z"
                                    fill="var(--light-black)"/>
                              <path d="M3.75806 159.908L32.2939 167.023L12.1363 191.346L11.4407 192.186L12.3368 192.806L25.3055 201.791L26.1901 202.404L26.7365 201.477L42.3483 174.988L58.0548 202.326L58.6117 203.296L59.5132 202.635L72.4039 193.181L73.2509 192.56L72.5889 191.745L53.0472 167.671L82.0415 160.848L83.0863 160.603L82.7673 159.578L78.0017 144.265L77.6727 143.208L76.6545 143.643L49.427 155.259L52.028 123.081L52.1153 122H51.0312H35.25H34.1748L34.2526 123.072L36.5552 154.789L9.08351 142.941L8.06263 142.501L7.73258 143.563L3.04508 158.641L2.73078 159.652L3.75806 159.908Z"
                                    stroke="var(--card-snowflake-color)" stroke-width="2"/>
                            </g>
                            <path class="star-2"
                                  d="M344.078 43.4375L314 35.9375L318.688 20.8594L347.672 33.3594L345.25 0H361.031L358.297 33.8281L387.047 21.5625L391.812 36.875L361.266 44.0625L381.812 69.375L368.922 78.8281L352.359 50L335.875 77.9688L322.906 68.9844L344.078 43.4375Z"
                                  fill="var(--card-snowflake-color)"/>
                            <g class="card-animation-boxes">
                              <rect class="card-animation-box" x="107.023" y="172.386"
                                    width="13" height="13"
                                    fill="var(--card-snowflake-color)"/>
                              <rect class="card-animation-box" x="169.094" y="125.386"
                                    width="13" height="13"
                                    transform="rotate(22.9417 169.094 125.386)"
                                    fill="var(--card-snowflake-color)"/>
                              <rect class="card-animation-box" x="238.516" y="135.174"
                                    width="13" height="13"
                                    transform="rotate(-34.1442 238.516 135.174)"
                                    fill="var(--card-snowflake-color)"/>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="card-02" class="about-us-card about-us-card_t2">
                  <div class="about-us-card__container">
                    <div class="about-us-card__inner">
                      <h4 class="about-us-card__title">
                        <div>Ambition is the motivation for evolution.</div>
                      </h4>
                      <div class="steps-animation about-us-card__steps-animation">
                        <div class="steps-animation__inner">
                          <svg id="card-2-steps-animation" class="steps-animation__svg"
                               viewBox="0 0 432 268" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <clipPath id="step-2-clip">
                                <rect x="82.0469" y="207.386" width="79" height="14"/>
                              </clipPath>
                              <clipPath id="step-3-clip">
                                <rect x="169.047" y="182.386" width="79" height="14"/>
                              </clipPath>
                              <clipPath id="step-4-clip">
                                <rect x="239.047" y="151.386" width="66" height="14"/>
                              </clipPath>
                              <clipPath id="step-5-clip">
                                <rect x="301.047" y="121.386" width="47" height="14"/>
                              </clipPath>
                              <clipPath id="step-6-clip">
                                <rect x="344.047" y="93.3857" width="34" height="14"/>
                              </clipPath>
                            </defs>
                            <g class="steps">
                              <g class="step step_01">
                                <g class="step__inner">
                                  <rect x="12.0234" y="248" width="64" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="76.0234" y="258" width="48" height="10"
                                        fill="var(--light-black)"/>
                                </g>
                              </g>
                              <g class="step step_02" clip-path="url(#step-2-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="82.0469"
                                        y="207.386" width="75" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="87.0469" y="212.386" width="73" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_03" clip-path="url(#step-3-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="169.047"
                                        y="182.386" width="75" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="174.047" y="187.386" width="73" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_04" clip-path="url(#step-4-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="239.047"
                                        y="151.386" width="62" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="244.047" y="156.386" width="60" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_05" clip-path="url(#step-5-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="301.047"
                                        y="121.386" width="43" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="306.047" y="126.386" width="41" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                              <g class="step step_06" clip-path="url(#step-6-clip)">
                                <g class="step__inner">
                                  <rect class="step__shadow" opacity="0.15" x="344.047"
                                        y="93.3857" width="30" height="10"
                                        fill="var(--light-black)"/>
                                  <rect x="349.047" y="98.3857" width="28" height="8"
                                        stroke="var(--light-black)" stroke-width="2"/>
                                </g>
                              </g>
                            </g>
                            <g class="star-1">
                              <path class="star__shadow" opacity="0.15"
                                    d="M30.0781 162.438L0 154.938L4.6875 139.859L33.6719 152.359L31.25 119H47.0312L44.2969 152.828L73.0469 140.562L77.8125 155.875L47.2656 163.062L67.8125 188.375L54.9219 197.828L38.3594 169L21.875 196.969L8.90625 187.984L30.0781 162.438Z"
                                    fill="var(--light-black)"/>
                              <path d="M3.75806 159.908L32.2939 167.023L12.1363 191.346L11.4407 192.186L12.3368 192.806L25.3055 201.791L26.1901 202.404L26.7365 201.477L42.3483 174.988L58.0548 202.326L58.6117 203.296L59.5132 202.635L72.4039 193.181L73.2509 192.56L72.5889 191.745L53.0472 167.671L82.0415 160.848L83.0863 160.603L82.7673 159.578L78.0017 144.265L77.6727 143.208L76.6545 143.643L49.427 155.259L52.028 123.081L52.1153 122H51.0312H35.25H34.1748L34.2526 123.072L36.5552 154.789L9.08351 142.941L8.06263 142.501L7.73258 143.563L3.04508 158.641L2.73078 159.652L3.75806 159.908Z"
                                    stroke="var(--card-snowflake-color)" stroke-width="2"/>
                            </g>
                            <path class="star-2"
                                  d="M344.078 43.4375L314 35.9375L318.688 20.8594L347.672 33.3594L345.25 0H361.031L358.297 33.8281L387.047 21.5625L391.812 36.875L361.266 44.0625L381.812 69.375L368.922 78.8281L352.359 50L335.875 77.9688L322.906 68.9844L344.078 43.4375Z"
                                  fill="var(--card-snowflake-color)"/>
                            <g class="card-animation-boxes">
                              <rect class="card-animation-box" x="107.023" y="172.386"
                                    width="13" height="13"
                                    fill="var(--card-snowflake-color)"/>
                              <rect class="card-animation-box" x="169.094" y="125.386"
                                    width="13" height="13"
                                    transform="rotate(22.9417 169.094 125.386)"
                                    fill="var(--card-snowflake-color)"/>
                              <rect class="card-animation-box" x="238.516" y="135.174"
                                    width="13" height="13"
                                    transform="rotate(-34.1442 238.516 135.174)"
                                    fill="var(--card-snowflake-color)"/>
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="card-03" class="about-us-card about-us-card_t3">
                  <div class="about-us-card__container">
                    <div class="about-us-card__inner">
                      <div class="about-us-card__body">
                        <div class="about-us-card__star">
                          <svg>
                            <use href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/snowflake.svg#1"></use>
                          </svg>
                        </div>
                        <div class="tg-h3 about-us-card__msg">
                          <div>Evolution is the most powerful force in the Universe and the only
                            process that continues continuously, stimulating the development of
                            everything from the tiniest particle to a massive galaxy.
                          </div>
                        </div>
                      </div>
                      <div class="reveal-wrap">
                        <div class="reveal-wrap__inner">
                          <div class="reveal-wrap__item about-us-card__decor"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="card-04" class="about-us-card about-us-card_t4">
                  <div class="about-us-card__container">
                    <div class="about-us-card__inner">
                      <div class="about-us-card__body">
                        <div class="about-us-card__star">
                          <svg>
                            <use href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/snowflake.svg#1"></use>
                          </svg>
                        </div>
                        <div class="tg-h2 about-us-card__msg uppercase">
                          <div class="reveal-wrap">
                            <div class="reveal-wrap__inner">
                              <div class="reveal-wrap__item">Achieve</div>
                            </div>
                          </div>
                          <div class="reveal-wrap">
                            <div class="reveal-wrap__inner">
                              <div class="reveal-wrap__item">ambitions</div>
                            </div>
                          </div>
                        </div>
                        <div class="reveal-wrap">
                          <div class="reveal-wrap__inner">
                            <div class="reveal-wrap__item about-us-card__decor"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="our-offer" class="our-offer" data-track-intersection>
      <div class="section-container section-container_decor our-offer__container">
        <div class="section-container__inner our-offer__inner">
          <h2 id="our-offer-msg" class="tg-h0 our-offer-msg">
            <div style="position: relative;" class="reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">We
                </div>
              </div>
            </div>
            <div class="our-offer-msg__star-wrap reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  <svg id="our-offer-msg-star" class="animated-star our-offer-msg__star"
                       viewBox="0 0 384 388"
                       style="translate: none; rotate: none; scale: none; transform-origin: 50% 50%; transform: rotate(1080deg);">
                    <g mask="url(#our-offer-msg-star-mask)">
                      <rect class="animated-star__bg" x="0" y="0" width="384" height="384"
                            fill="var(--color, currentColor)"></rect>
                      <circle class="animated-star__fill our-offer-msg__star-fill" cx="192" cy="200"
                              r="0" fill="var(--fill-color, #FF0000)" style="r: 210px;"></circle>
                      <path
                          d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                          class="animated-star__body" stroke="var(--stroke-color, #FF0000)"
                          fill="none"></path>
                    </g>
                    <mask id="our-offer-msg-star-mask">
                      <path
                          d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                          fill="white"></path>
                    </mask>
                  </svg>
                </div>
              </div>
            </div>
            <div style="position: relative;" class="reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  offer
                </div>
              </div>
            </div>
            <br>
            <div style="position: relative;" class="reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">the
                </div>
              </div>
            </div>
            <div style="position: relative;" class="reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  following
                </div>
              </div>
            </div>
            <br>
            <div class="our-offer-msg__lightning reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  <svg id="our-offer-msg-lightning" class="animated-lightning" viewBox="0 0 59 120"
                       fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g class="animated-lightning__body">
                      <g clip-path="url(#our-offer-msg-lightning-clip)">
                        <path class="animated-lightning__p1" d="M0 0V59.73H29.43L0 0Z"
                              fill="var(--color, currentColor)" data-svg-origin="0 0"
                              transform="matrix(1,0,0,1,0,0)"
                              style="translate: none; rotate: none; scale: none; transform-origin: 0px 0px; --color: #0000FF;"></path>
                      </g>
                      <path class="animated-lightning__p2"
                            d="M29.4297 59.73L58.8497 119.46V59.73H29.4297Z"
                            fill="var(--color, currentColor)"
                            data-svg-origin="29.42970085144043 59.72999954223633"
                            transform="matrix(1,0,0,1,0,0)"
                            style="translate: none; rotate: none; scale: none; transform-origin: 0px 0px; --color: #0000FF;"></path>
                    </g>
                    <defs>
                      <clipPath id="our-offer-msg-lightning-clip">
                        <rect x="0" y="0" width="29.43" height="59.73"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div style="position: relative;" class="reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  brand
                </div>
              </div>
            </div>
            <div class="our-offer-msg__infinity-wrap reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  <svg>
                    <use class="our-offer-msg__infinity"
                         href="<?php echo get_template_directory_uri(); ?>/git-src/build/img/decor-symbols.svg#infinity"
                         style="stroke-dashoffset: -684px; --color: #0CFF7C;"></use>
                  </svg>
                </div>
              </div>
            </div>
            <br>
            <div style="position: relative;" class="reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  development
                </div>
              </div>
            </div>
            <div style="position: relative;" class="reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="reveal-wrap__item"
                     style="translate: none; rotate: none; scale: none; transform: translate(0px, 0px);">
                  services
                </div>
              </div>
            </div>
          </h2>
          <a href="competencies.html"
             class="btn form__submit-btn contact-form__submit-btn contact-form__submit-btn_desc">
            Check our competincies
            <div class="ref-arrow-icon ref-arrow-icon_horizontal">
              <span class="icon-cubic-nav-arrow-right"></span>
              <span class="icon-cubic-nav-arrow-right"></span>
            </div>
          </a>
          <a href="competencies-mob.html"
             class="btn form__submit-btn contact-form__submit-btn contact-form__submit-btn_mob">
            Check our competincies
            <div class="ref-arrow-icon ref-arrow-icon_horizontal">
              <span class="icon-cubic-nav-arrow-right"></span>
              <span class="icon-cubic-nav-arrow-right"></span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </main>

<?php
get_template_part('templates/general/drawers-group-subscribe');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();
