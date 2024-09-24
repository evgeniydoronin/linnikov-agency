<?php
/**
 * Template Name: Team
 *
 */

get_header();
?>

  <div>
    <main>
      <?php
      // Navigation
      $about_navigation = locate_template('templates/general/about-navigation.php');

      if ($about_navigation) {
        require $about_navigation;
      }
      ?>
      <section id="team-board" class="team-board" data-component="team-board">
        <div class="section-container section-container_decor team-board__container">
          <div class="team-board-poiner-tip team-board__tip">
            <span class="team-board-poiner-tip__icon icon-cubic-plus"></span>
            <div class="team-board-poiner-tip__cap">Profile</div>
          </div>
          <ul class="team-board__members" data-elem="team-board.members">
            <?php
            // Запрос для получения всех постов типа 'team'
            $team_members = new WP_Query(array(
              'post_type' => 'team',
              'posts_per_page' => -1, // Получаем всех членов команды
            ));

            if ($team_members->have_posts()) :
              $counter = 1; // Инициализация счётчика для порядкового номера
              while ($team_members->have_posts()) : $team_members->the_post();
                // Получаем данные метаполей
                $position = get_post_meta(get_the_ID(), '_team_member_position', true); // Должность
                $quote = get_post_meta(get_the_ID(), '_team_member_quote', true); // Цитата (если нужно)
                $description = get_post_meta(get_the_ID(), '_team_member_description', true); // Описание (если нужно)

                // Получаем данные тегов (таксономия)
                $terms = get_the_terms(get_the_ID(), 'team_tag'); // Убедитесь, что таксономия называется 'team_tag'
                $tags = $terms ? implode(', ', wp_list_pluck($terms, 'name')) : '';

                // Получаем URL изображения (featured image)
                $image_url = get_the_post_thumbnail_url(get_the_ID(), 'full'); // Полный URL изображения
                // Получаем путь к изображению без расширения
                $image_url_without_extension = preg_replace('/\.[^.]+$/', '', $image_url);
                ?>
                <li class="team-board-card keen-slider__slide"
                    data-id="<?php echo $image_url; ?>"
                    data-drawer-target="member-<?php echo get_the_ID(); ?>"
                    data-category="<?php echo esc_attr($tags); ?>">
                  <div class="img-wrap img-wrap_cover team-board-card__img team-member-photo">
                    <div class="img-wrap__inner">
                      <picture>
                        <source srcset="<?php echo esc_url($image_url); ?>">
                        <img src="<?php echo esc_url($image_url); ?>" alt="<?php the_title(); ?>">
                      </picture>
                    </div>
                  </div>
                  <div class="team-board-card__info">
                    <div class="tg-h4 team-board-card__title"><?php the_title(); ?></div> <!-- Заголовок поста -->
                    <div class="tg-h4 team-board-card__role"><?php echo esc_html($position); ?></div>
                    <!-- Должность из метаполя -->
                  </div>
                </li>
                <?php
                $counter++; // Увеличиваем счётчик на 1 после каждого поста
              endwhile;
              wp_reset_postdata();
            else :
              echo '<p>No team members found.</p>';
            endif;
            ?>
          </ul>
          <div class="team-board__right">
            <div class="team-board-card team-board-card_selected team-board__selected">
              <div class="img-wrap img-wrap_cover team-board-card__img team-member-photo">
                <div class="img-wrap__inner">
                  <picture>
                    <source srcset="">
                    <img src="">
                  </picture>
                </div>
              </div>
              <div class="team-board-card__info">
                <div class="tg-h4 team-board-card__title reveal-wrap">
                  <div class="reveal-wrap__inner">
                    <div class="reveal-wrap__item">Dmytro Lynnyk</div>
                  </div>
                </div>
                <div class="tg-h4 team-board-card__role reveal-wrap">
                  <div class="reveal-wrap__inner">
                    <div class="reveal-wrap__item">creative director, co-faunder</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="double-cubic-decor team-board__decor"></div>
            <div class="team-board-filter team-board__filter" data-elem="team-booard.filter">
              <div class="team-board-filter__inner">
                <?php
                // Получаем все термины таксономии 'team_tag'
                $tags = get_terms(array(
                  'taxonomy' => 'team_tag',
                  'hide_empty' => false, // Устанавливаем в false, чтобы показать все термины, даже те, которые не связаны с постами
                ));

                // Проверяем, есть ли термины
                if (!empty($tags) && !is_wp_error($tags)) :
                  foreach ($tags as $tag) :
                    ?>
                    <button type="button" class="tg-h4 team-board-filter-btn"
                            data-category="<?php echo esc_attr($tag->name); ?>">
                      <svg class="team-board-filter-btn__icon" data-component="morph-ref-icon" viewBox="0 0 20 22"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M3.36311 3.10174L6.39702 0.0678244L9.39746 3.06826L6.36355 6.10218L3.36311 3.10174ZM15.4318 3.03479L12.4314 0.0343513L9.39746 3.06826L12.3979 6.0687L0.00148475 18.4651L3.00192 21.4656L15.3983 9.06914L15.3481 18.1207L19.615 18.097L19.689 4.77324L19.9659 1.5011L18.4657 0.000878304L15.4318 3.03479Z"
                              fill="currentColor"/>
                      </svg>
                      <div class="team-board-filter-btn__cap"><?php echo esc_html($tag->name); ?></div>
                    </button>
                  <?php
                  endforeach;
                else :
                  echo '<p>No tags found.</p>'; // Выводим сообщение, если нет тегов
                endif;
                ?>
              </div>
            </div>
          </div>
        </div>
        <div class="drawers-group" data-drawers-group="team-members">
          <?php
          // Запрос для получения всех постов типа 'team'
          $team_members = new WP_Query(array(
            'post_type' => 'team',
            'posts_per_page' => -1, // Получаем все посты команды
          ));

          if ($team_members->have_posts()) :
            while ($team_members->have_posts()) : $team_members->the_post();
              $post_id = get_the_ID(); // Получаем ID поста
              $position = get_post_meta($post_id, '_team_member_position', true); // Получаем должность
              $quote = get_post_meta($post_id, '_team_member_quote', true); // Получаем цитату
              $description = get_post_meta($post_id, '_team_member_description', true); // Получаем описание
              // Получаем URL изображения (featured image)
              $image_url = get_the_post_thumbnail_url(get_the_ID(), 'full'); // Полный URL изображения
              ?>
              <section class="drawer drawer_right member-profile-drawer"
                       data-modal="true"
                       data-drawer="member-<?php echo $post_id; ?>">
                <div data-lenis-prevent class="drawer__panel" data-elem="drawer.panel" data-scrollable>
                  <section class="section-container section-container_decor member-profile-drawer__container">
                    <div class="member-profile-drawer__header">
                      <h2 class="member-profile-drawer__title">
                        <span class="icon-cubic-plus"></span>
                        <div class="uppercase">Profile</div>
                      </h2>
                      <button class="drawer-close-btn member-profile-drawer__close-btn"
                              data-drawer-close="member-<?php echo $post_id; ?>">
                        <div class="drawer-close-btn__inner">Close panel<span class="icon-cubic-plus"></span></div>
                      </button>
                    </div>
                    <div class="member-profile-drawer__info">
                      <div class="member-profile-info">
                        <div class="img-wrap team-member-photo">
                          <div class="img-wrap__inner">
                            <picture>
                              <source srcset="<?php echo get_the_post_thumbnail_url($post_id, 'full'); ?>">
                              <img src="<?php echo get_the_post_thumbnail_url($post_id, 'full'); ?>"
                                   alt="<?php echo esc_attr(get_the_title($post_id)); ?>">
                            </picture>
                          </div>
                        </div>
                        <div class="double-cubic-decor member-profile-info__decor"></div>
                        <div class="member-profile-info__identity">
                          <div
                              class="tg-h4 member-profile-info__title"><?php echo esc_html(get_the_title($post_id)); ?></div>
                          <div class="tg-h4 member-profile-info__role"><?php echo esc_html($position); ?></div>
                        </div>
                      </div>
                    </div>
                    <div class="member-profile-drawer__desc">
                      <blockquote class="tg-h3"><?php echo esc_html($quote); ?></blockquote>
                      <p class="tg-regular"><?php echo esc_html($description); ?></p>
                    </div>
                  </section>
                </div>
              </section>

            <?php endwhile;
            wp_reset_postdata();
          endif;
          ?>
          <style>
              /*.drawer_opening {*/
              /*    transform: translateX(0); !* Примерная анимация *!*/
              /*    transition: transform 1s ease;*/
              /*    --z-index: 1;*/
              /*}*/

              /*.drawer_closing {*/
              /*    transform: translateX(100%); !* Примерная анимация *!*/
              /*    transition: transform 1s ease;*/
              /*    --z-index: 1;*/
              /*}*/

              /*.drawer_open {*/
              /*    transform: translateX(0); !* Позиция по умолчанию *!*/
              /*}*/
          </style>
          <script>
              document.querySelectorAll('.team-board-card.keen-slider__slide').forEach(function (card) {
                  card.addEventListener('click', function () {
                      const drawerTarget = this.getAttribute('data-drawer-target'); // Получаем значение data-drawer-target

                      if (drawerTarget) {
                          // Закрываем все открытые профили с анимацией закрытия
                          document.querySelectorAll('.drawer.member-profile-drawer').forEach(function (drawer) {
                              if (drawer.classList.contains('drawer_open')) {
                                  drawer.classList.remove('drawer_open');
                                  drawer.classList.add('drawer_closing');

                                  // Удаляем класс 'drawer_closing' через 1 секунду (время анимации)
                                  setTimeout(function() {
                                      drawer.classList.remove('drawer_closing');
                                  }, 100);
                              }
                          });

                          // Открываем нужный профиль с анимацией открытия
                          const targetDrawer = document.querySelector(`[data-drawer="${drawerTarget}"]`);
                          if (targetDrawer) {
                              targetDrawer.classList.add('drawer_opening');

                              // После завершения анимации открытия меняем класс на 'drawer_open'
                              setTimeout(function() {
                                  targetDrawer.classList.remove('drawer_opening');
                                  targetDrawer.classList.add('drawer_open');
                              }, 100); // Время анимации
                          }
                      }
                  });
              });

              document.querySelectorAll('.member-profile-drawer').forEach(function(drawer) {
                  // Добавляем событие клика на сам drawer
                  drawer.addEventListener('click', function(event) {
                      const panel = drawer.querySelector('.drawer__panel');

                      // Если клик произошел вне .drawer__panel
                      if (!panel.contains(event.target)) {
                          drawer.classList.remove('drawer_open');
                      }
                  });
              });

              // Обработчик для закрытия профиля по клику на кнопку "Close"
              document.querySelectorAll('.drawer-close-btn.member-profile-drawer__close-btn').forEach(function (button) {
                  button.addEventListener('click', function () {
                      const drawerCloseTarget = this.getAttribute('data-drawer-close'); // Получаем значение data-drawer-close

                      if (drawerCloseTarget) {
                          const targetDrawer = document.querySelector(`[data-drawer="${drawerCloseTarget}"]`); // Ищем секцию профиля по атрибуту data-drawer
                          if (targetDrawer) {
                              // Добавляем класс для анимации закрытия
                              targetDrawer.classList.add('drawer_closing');
                              targetDrawer.classList.remove('drawer_open');

                              // Удаляем класс 'drawer_closing' через 1 секунду (время анимации)
                              setTimeout(function() {
                                  targetDrawer.classList.remove('drawer_closing');
                              }, 500);
                          }
                      }
                  });
              });

              // Находим первую карточку команды
              const firstCard = document.querySelector('.team-board-card.keen-slider__slide');

              if (firstCard) {
                  const drawerTarget = firstCard.getAttribute('data-drawer-target'); // Получаем значение data-drawer-target

                  if (drawerTarget) {
                      // Ищем нужную секцию профиля
                      const targetDrawer = document.querySelector(`[data-drawer="${drawerTarget}"]`);

                      if (targetDrawer) {
                          // Обновляем правый блок с информацией о члене команды
                          updateRightSection(targetDrawer);
                      }
                  }
              }

              // Функция для обновления правого блока
              function updateRightSection(drawerElement) {
                  const rightSection = document.querySelector('.team-board__right .team-board-card_selected');

                  if (rightSection && drawerElement) {
                      // Находим элементы, которые нужно обновить
                      const pictureSource = rightSection.querySelector('picture source');
                      const pictureImage = rightSection.querySelector('picture img');
                      const titleElement = rightSection.querySelector('.team-board-card__title .reveal-wrap__item');
                      const roleElement = rightSection.querySelector('.team-board-card__role .reveal-wrap__item');

                      // Получаем данные из выбранной секции профиля
                      const drawerPictureSource = drawerElement.querySelector('picture source').getAttribute('srcset');
                      const drawerPictureImage = drawerElement.querySelector('picture img').getAttribute('src');
                      const drawerTitle = drawerElement.querySelector('.member-profile-info__title').textContent.trim();
                      const drawerRole = drawerElement.querySelector('.member-profile-info__role').textContent.trim();

                      // Обновляем элементы в правом блоке
                      if (pictureSource) pictureSource.setAttribute('srcset', drawerPictureSource);
                      if (pictureImage) pictureImage.setAttribute('src', drawerPictureImage);
                      if (titleElement) titleElement.textContent = drawerTitle;
                      if (roleElement) roleElement.textContent = drawerRole;
                  }
              }
          </script>
        </div>
      </section>
    </main>
  </div>


<?php
get_template_part('templates/general/drawers-group');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();
