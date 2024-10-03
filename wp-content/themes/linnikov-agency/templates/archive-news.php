<?php get_header(); ?>

  <main>
    <?php
    // Navigation
    $about_navigation = locate_template('templates/general/about-navigation.php');

    if ($about_navigation) {
      require $about_navigation;
    }
    ?>
    <section class="materials-grid news-grid" id="news-grid" data-component="materials-grid">
      <div class="section-container section-container_decor news-grid__container">
        <div class="materials-grid__content news-grid__content" data-elem="materials-grid.body">
          <!-- Категория All -->
          <div class="materials-grid__category news-grid__category active" data-category="all" aria-hidden="false">
            <div class="news-grid__category-grid">
              <?php
              // Запрос для получения 10 последних постов
              $all_posts = new WP_Query(array(
                'post_type' => 'news',
                'posts_per_page' => 10,
              ));
              if ($all_posts->have_posts()) :
                while ($all_posts->have_posts()) : $all_posts->the_post(); ?>
                  <a href="<?php the_permalink(); ?>" class="news-card news-grid__card">
                    <div class="img-wrap img-wrap_cover news-card__img">
                      <div class="img-wrap__inner">
                        <?php if (has_post_thumbnail()) : ?>
                          <?php the_post_thumbnail('full', ['class' => 'news-card__img', 'loading' => 'lazy']); ?>
                        <?php endif; ?>
                      </div>
                    </div>
                    <div class="news-card__bottom">
                      <h4 class="news-card__title"><?php the_title(); ?></h4>
                      <div class="news-card__date"><?php echo get_the_date(); ?></div>
                    </div>
                  </a>
                <?php endwhile;
                wp_reset_postdata();
              endif;
              ?>
            </div>

            <!-- Контейнер кнопки "Load more" -->
            <div class="news-grid__load-more-btn-area">
              <a href="#" type="button" class="btn" data-materials-grid-elem="load-more-btn" data-category="all">
                Load more
                <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                  <span class="icon-cubic-nav-arrow-right"></span>
                  <span class="icon-cubic-nav-arrow-right"></span>
                </div>
              </a>
            </div>
          </div>

          <!-- Категории Read, Watch и Listen -->
          <?php
          $categories = ['read', 'watch', 'listen'];
          foreach ($categories as $category) : ?>
            <div class="materials-grid__category news-grid__category" data-category="<?php echo $category; ?>" aria-hidden="true">
              <div class="news-grid__category-grid">
                <!-- Контент категории будет подгружаться через AJAX -->
              </div>
              <div class="news-grid__load-more-btn-area">
                <a href="#" type="button" class="btn" data-materials-grid-elem="load-more-btn" data-category="<?php echo $category; ?>">
                  Load more
                  <div class="ref-arrow-icon ref-arrow-icon_horizontal">
                    <span class="icon-cubic-nav-arrow-right"></span>
                    <span class="icon-cubic-nav-arrow-right"></span>
                  </div>
                </a>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- JS для работы с AJAX подгрузкой -->
      <script>
          console.log(`linnikov_category_map: ${linnikov_category_map}`);
          document.addEventListener('DOMContentLoaded', function () {
              const loadedCategories = {}; // Состояние загруженных категорий
              const offsetCounts = {all: 10, read: 0, watch: 0, listen: 0}; // Счётчик смещения для каждой категории

              // Устанавливаем активный фильтр по умолчанию ("all")
              const defaultCategory = 'all';
              activateFilter(defaultCategory);

              // Обработчик кликов по фильтрам категорий
              document.querySelectorAll('.news-filters a').forEach(function (filterLink) {
                  filterLink.addEventListener('click', function (e) {
                      e.preventDefault();
                      const category = this.getAttribute('href').substring(1); // Получаем категорию из href

                      // Устанавливаем активный фильтр и отображаем нужную категорию
                      activateFilter(category);

                      // Проверяем, загружена ли категория
                      if (!loadedCategories[category]) {
                          loadCategoryPosts(category);
                      }
                  });
              });

              // Функция установки активного фильтра
              function activateFilter(category) {
                  // Удаляем класс 'active' у всех категорий и устанавливаем aria-hidden
                  document.querySelectorAll('.materials-grid__category').forEach(function (categorySection) {
                      categorySection.classList.remove('active');
                      categorySection.setAttribute('aria-hidden', 'true');
                  });

                  // Устанавливаем активный класс и aria-hidden="false" для выбранной категории
                  const selectedSection = document.querySelector(`[data-category="${category}"]`);
                  if (selectedSection) {
                      selectedSection.classList.add('active');
                      selectedSection.setAttribute('aria-hidden', 'false');
                  }
              }

              // Функция загрузки постов для категории
              function loadCategoryPosts(category, loadMore = false) {
                  const container = document.querySelector(`[data-category="${category}"] .news-grid__category-grid`);
                  const loadMoreArea = document.querySelector(`[data-category="${category}"] .news-grid__load-more-btn-area`);

                  if (!container || !loadMoreArea) {
                      console.error(`Container or Load More button for category ${category} not found.`);
                      return;
                  }

                  let url = `/wp-json/wp/v2/news?per_page=10&_embed`;

                  // Добавляем фильтрацию по категории, если не "all"
                  if (category !== 'all') {
                      const categoryId = linnikov_category_map[category];
                      if (!categoryId) {
                          console.error(`Category ID for ${category} not found.`);
                          return;
                      }
                      url += `&news_category=${categoryId}`;
                  }

                  // Добавляем смещение, если необходимо подгрузить больше постов
                  if (loadMore) {
                      url += `&offset=${offsetCounts[category]}`;
                  }

                  fetch(url)
                      .then(response => response.json())
                      .then(posts => {
                          if (!Array.isArray(posts)) {
                              console.error('Invalid data format, expected an array:', posts);
                              return;
                          }

                          // Генерация HTML для новых постов
                          posts.forEach(post => {
                              const imageUrl = post._embedded && post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '';
                              const postHTML = `
                    <a href="${post.link}" class="news-card news-grid__card">
                        <div class="img-wrap img-wrap_cover news-card__img">
                            <div class="img-wrap__inner">
                                <img src="${imageUrl}" alt="${post.title.rendered}" loading="lazy">
                            </div>
                        </div>
                        <div class="news-card__bottom">
                            <h4 class="news-card__title">${post.title.rendered}</h4>
                            <div class="news-card__date">${new Date(post.date).toLocaleDateString()}</div>
                        </div>
                    </a>`;
                              container.insertAdjacentHTML('beforeend', postHTML);
                          });

                          // Увеличиваем смещение для следующего запроса
                          offsetCounts[category] += 10;

                          // Если постов меньше 10, скрываем кнопку "Load more"
                          if (posts.length < 10) {
                              loadMoreArea.style.display = 'none';
                          }

                          // Отмечаем категорию как загруженную
                          loadedCategories[category] = true;
                      })
                      .catch(error => {
                          console.error('Ошибка при загрузке постов:', error);
                      });
              }

              // Обработчик кнопки "Load more"
              document.querySelectorAll('[data-materials-grid-elem="load-more-btn"]').forEach(function (btn) {
                  btn.addEventListener('click', function (e) {
                      e.preventDefault();
                      const category = this.getAttribute('data-category');
                      loadCategoryPosts(category, true);
                  });
              });
          });
      </script>
    </section>
    <section class="fixed-materials-filter news-grid__filter" data-component="materials-filter" data-for="news-grid">
      <div class="fixed-materials-filter__panel">
        <div class="section-container fixed-materials-filter__container">
          <nav class="tg-control uppercase keen-slider fixed-materials-filter__slider news-filters" data-elem="slider">
            <a href="#all" class="text-btn keen-slider__slide" data-component="animated-link">
              <svg id="news-filter__lightning_1" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#news-filter__lightning_1-clip)"
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
                  <clipPath id="news-filter__lightning_1-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">All</div>
            </a>
            <a href="#read" class="text-btn keen-slider__slide" data-component="animated-link">
              <svg id="news-filter__lightning_2" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#news-filter__lightning_2-clip)"
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
                  <clipPath id="news-filter__lightning_2-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Read</div>
            </a>
            <a href="#watch" class="text-btn keen-slider__slide" data-component="animated-link">
              <svg id="news-filter__lightning_3" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#news-filter__lightning_3-clip)"
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
                  <clipPath id="news-filter__lightning_3-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Watch</div>
            </a>
            <a href="#listen" class="text-btn keen-slider__slide" data-component="animated-link">
              <svg id="news-filter__lightning_4" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30"
                   fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#news-filter__lightning_4-clip)"
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
                  <clipPath id="news-filter__lightning_4-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Listen</div>
            </a>
          </nav>
        </div>
        <div class="fixed-materials-filter__tips slider-tips" data-elem="tips">
          <button class="icon-cubic-nav-arrow-left slider-tips__arrow-left" data-elem="materials-filter.prev"></button>
          <div class="slider-tips__square"></div>
          <button class="icon-cubic-nav-arrow-right slider-tips__arrow-right"
                  data-elem="materials-filter.next"></button>
        </div>
      </div>
    </section>


  </main>

<?php
get_template_part('templates/general/drawers-group-subscribe');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();