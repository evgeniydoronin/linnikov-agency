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
      <div class="materials-grid__content news-grid__content" data-elem="materials-grid.body">
        <!-- Категория All -->
        <div class="materials-grid__category news-grid__category" data-category="all" style="display: block;"> <!-- По умолчанию отображаемая категория -->
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
          <div class="news-grid__load-more-btn-area">
            <!-- Кнопка для загрузки еще -->
          </div>
        </div>

        <!-- Категории Read, Watch и Listen - по умолчанию скрыты -->
        <?php
        $categories = ['read', 'watch', 'listen'];
        foreach ($categories as $category) : ?>
          <div class="materials-grid__category news-grid__category" data-category="<?php echo $category; ?>" style="display: none;">
            <div class="news-grid__category-grid">
              <!-- Контент категории будет подгружаться через AJAX -->
            </div>
            <div class="news-grid__load-more-btn-area">
              <!-- Кнопка для загрузки еще -->
            </div>
          </div>
        <?php endforeach; ?>
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
    <section class="fixed-materials-filter news-grid__filter" data-component="materials-filter" data-for="news-grid">
      <div class="fixed-materials-filter__panel">
        <div class="section-container fixed-materials-filter__container">
          <nav class="tg-control uppercase keen-slider fixed-materials-filter__slider news-filters" data-elem="slider">
            <a href="#all" class="text-btn keen-slider__slide" data-component="animated-link">
              <svg id="news-filter__lightning_1" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30"
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
              <svg id="news-filter__lightning_2" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30"
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
              <svg id="news-filter__lightning_3" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30"
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
              <svg id="news-filter__lightning_4" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30"
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
          <button class="icon-cubic-nav-arrow-right slider-tips__arrow-right" data-elem="materials-filter.next"></button>
        </div>
      </div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const loadedCategories = {}; // Инициализация состояния загруженных категорий

            // Устанавливаем по умолчанию активный фильтр и отображаем категорию "all"
            const defaultCategory = 'all';
            activateFilter(defaultCategory);

            // Добавление события клика для фильтров категорий
            document.querySelectorAll('.news-filters a').forEach(function (filterLink) {
                filterLink.addEventListener('click', function (e) {
                    e.preventDefault();

                    const category = this.getAttribute('href').substring(1); // Получаем имя категории из href
                    console.log('Выбранная категория:', category); // Проверка выбранной категории

                    // Делаем активным текущий фильтр
                    activateFilter(category);

                    // Скрываем все секции категорий
                    document.querySelectorAll('.materials-grid__category').forEach(function (section) {
                        section.style.display = 'none'; // Скрываем все категории
                    });

                    // Показываем секцию выбранной категории
                    const selectedSection = document.querySelector(`[data-category="${category}"]`);

                    if (selectedSection) {
                        selectedSection.style.display = 'block'; // Показываем выбранную категорию
                        console.log(`Отображаем секцию категории: ${category}`); // Проверка отображаемой секции
                    }

                    // Проверяем, загружена ли категория
                    if (!loadedCategories[category]) { // Если категория еще не загружена
                        console.log(`Загружаем посты для категории: ${category}`); // Проверка загрузки постов для категории
                        loadCategoryPosts(category); // Загрузка постов для выбранной категории
                    }
                });
            });

            // Функция установки активного фильтра
            function activateFilter(category) {
                // Удаляем класс 'active' у всех фильтров
                document.querySelectorAll('.news-filters a').forEach(function (filterLink) {
                    filterLink.classList.remove('active');
                });

                // Добавляем класс 'active' выбранному фильтру
                document.querySelector(`.news-filters a[href="#${category}"]`).classList.add('active');
                console.log(`Активен фильтр: ${category}`); // Проверка активного фильтра
            }

            // Функция загрузки постов для категории с помощью AJAX
            function loadCategoryPosts(category) {
                const container = document.querySelector(`[data-category="${category}"] .news-grid__category-grid`);
                container.innerHTML = ''; // Очистить контейнер перед загрузкой новых постов

                console.log('Selected category:', category); // Проверяем переданный category
                console.log('Selected categoryMap:', categoryMap); // Проверяем переданный category

                const urlBase = '/wp-json/wp/v2/news?per_page=10&_embed'; // Базовый URL для запроса
                let url = urlBase;

                // Если выбрана категория, отличная от 'all', добавляем параметр фильтрации по ID категории
                if (category !== 'all') {
                    const categoryId = categoryMap[category]; // Получаем ID категории из динамического объекта
                    if (categoryId) {
                        url += `&news_category=${categoryId}`; // Используем параметр 'news_category' с ID категории
                    } else {
                        return; // Выход из функции, если ID не найден
                    }
                }

                console.log('Request URL:', url); // Проверяем URL запроса

                fetch(url)
                    .then(response => response.json())
                    .then(posts => {
                        console.log('Полученные посты:', posts); // Проверка полученных данных из API

                        // Генерируем HTML для постов
                        posts.forEach(post => {
                            const imageUrl = post._embedded && post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '';
                            console.log('URL изображения:', imageUrl); // Проверка URL изображения
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
                            container.innerHTML += postHTML;
                        });

                        // Отмечаем категорию как загруженную
                        loadedCategories[category] = true;
                        console.log(`Категория ${category} загружена.`); // Подтверждение, что категория загружена
                    })
                    .catch(error => {
                        console.error('Ошибка при загрузке постов:', error); // Проверка ошибок загрузки постов
                    });
            }
        });
    </script>

  </main>

<?php
get_template_part('templates/general/drawers-group-subscribe');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();