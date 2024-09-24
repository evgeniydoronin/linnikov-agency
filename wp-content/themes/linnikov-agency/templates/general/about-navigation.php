<?php
if (is_page_template('templates/page-team.php')) : ?>
<section class="hero hero_team-page" data-track-intersection>
<?php else: ?>
<section class="hero">
<?php endif; ?>
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
      <?php
      if (is_page_template('templates/page-about-us.php')) : ?>
          <h1 class="tg-h1 hero__title">About us</h1>
      <?php elseif (is_page_template('templates/page-ideas.php')) : ?>
          <h1 class="tg-h1">Ideas</h1>
      <?php elseif (is_page_template('templates/page-careers.php')) : ?>
          <h1 class="tg-h1 hero__title">Careers</h1>
          <div id="careers-motto" class="tg-h0 hero__motto motto">
              Tell
              <div class="team-motto__star-wrap">
                  <svg id="careers-motto-star-1" class="animated-star motto__star motto__star_1"
                       viewBox="0 0 384 388">
                      <g mask="url(#careers-motto-star-1-mask)">
                          <rect class="animated-star__bg" x="0" y="0" width="384" height="384"
                                fill="var(--color, currentColor)"/>
                          <circle class="animated-star__fill" cx="192" cy="200" r="0"
                                  fill="var(--fill-color, #FF0000)"/>
                          <path
                                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                                  class="animated-star__body" stroke="var(--stroke-color, #FF0000)" fill="none"/>
                      </g>
                      <mask id="careers-motto-star-1-mask">
                          <path
                                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                                  fill="white"/>
                      </mask>
                  </svg>
              </div>
              us
              <div class="team-motto__star-wrap">
                  <svg id="careers-motto-star-2" class="animated-star motto__star motto__star_2"
                       viewBox="0 0 384 388">
                      <g mask="url(#careers-motto-star-2-mask)">
                          <rect class="animated-star__bg" x="0" y="0" width="384" height="384"
                                fill="var(--color, currentColor)"/>
                          <circle class="animated-star__fill" cx="192" cy="200" r="0"
                                  fill="var(--fill-color, #FF0000)"/>
                          <path
                                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                                  class="animated-star__body" stroke="var(--stroke-color, #FF0000)" fill="none"/>
                      </g>
                      <mask id="careers-motto-star-2-mask">
                          <path
                                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                                  fill="white"/>
                      </mask>
                  </svg>
              </div>
              about your talents
          </div>
          <div class="tg-big hero__sub-motto">
              We always look forward to see brave, creative, professional emplyees in our team.
          </div>
      <?php elseif (is_page_template('templates/page-team.php')) : ?>
          <h1 class="tg-h1">Team</h1>
          <div id="team-motto" class="tg-h0 motto">Amazing
              <div class="motto__star-wrap">
                  <svg id="team-motto-star" class="animated-star motto__star" viewBox="0 0 384 388">
                      <g mask="url(#team-motto-star-mask)">
                          <rect class="animated-star__bg" x="0" y="0" width="384" height="384"
                                fill="var(--color, currentColor)"/>
                          <circle class="animated-star__fill" cx="192" cy="200" r="0"
                                  fill="var(--fill-color, #FF0000)"/>
                          <path
                                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                                  class="animated-star__body" stroke="var(--stroke-color, #FF0000)" fill="none"/>
                      </g>
                      <mask id="team-motto-star-mask">
                          <path
                                  d="M148.914 213.881L0.867188 176.965L23.9395 102.749L166.603 164.275L154.682 0.0771484H232.359L218.9 166.583L360.41 106.21L383.867 181.58L233.513 216.957L334.646 341.548L271.198 388.077L189.675 246.182L108.538 383.847L44.7045 339.625L148.914 213.881Z"
                                  fill="white"/>
                      </mask>
                  </svg>
              </div>
              people creates
              <div class="motto__lightning-wrap">
                  <svg id="team-motto-lightning" class="animated-lightning motto__lightning" viewBox="0 0 59 120"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                      <g class="animated-lightning__body">
                          <g clip-path="url(#team-motto-lightning-clip)">
                              <path class="animated-lightning__p1" d="M0 0V59.73H29.43L0 0Z"
                                    fill="var(--color, currentColor)"/>
                          </g>
                          <path class="animated-lightning__p2" d="M29.4297 59.73L58.8497 119.46V59.73H29.4297Z"
                                fill="var(--color, currentColor)"/>
                      </g>
                      <defs>
                          <clipPath id="team-motto-lightning-clip">
                              <rect x="0" y="0" width="29.43" height="59.73"/>
                          </clipPath>
                      </defs>
                  </svg>
              </div>
              amazing things
          </div>
      <?php elseif (is_post_type_archive('news')) : ?>
          <h1 class="tg-h1">News</h1>
      <?php endif; ?>

    </div>
</section>