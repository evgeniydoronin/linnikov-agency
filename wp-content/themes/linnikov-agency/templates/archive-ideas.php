<?php
/**
 * Template Name: Ideas
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
    ?>

    <section id="ideas-grid" class="ideas-grid" data-component="materials-grid">
      <div class="section-container section-container_decor ideas-grid__container">
        <div class="ideas-grid__body" data-elem="materials-grid.body">
          <?php
          // WP_Query для получения всех постов типа ideas, отсортированных по метаполю '_ideas_order'
          $args = array(
            'post_type' => 'ideas',
            'posts_per_page' => -1,
            'meta_key' => '_ideas_order',      // Используем метаполе для сортировки
            'orderby' => 'meta_value_num',     // Сортируем по числовому значению метаполя
            'order' => 'ASC',
          );

          $ideas_query = new WP_Query($args);

          if ($ideas_query->have_posts()) :
            $post_count = 1; // Счётчик постов для data-column
            while ($ideas_query->have_posts()) : $ideas_query->the_post();

              // Получаем привязанные теги (только первый тег, если их несколько)
              $tags = get_the_terms(get_the_ID(), 'idea_tag');
              $first_tag = $tags && !is_wp_error($tags) ? $tags[0] : null;
              $tag_slug = $first_tag ? $first_tag->slug : 'uncategorized'; // Слаг тега или 'uncategorized'
              $tag_name = $first_tag ? $first_tag->name : 'Uncategorized'; // Название тега или 'Uncategorized'

              // Получаем метаполе '_ideas_order' для вывода в data-column
              $ideas_order = get_post_meta(get_the_ID(), '_ideas_order', true);

              // Получаем изображение и проверяем его тип
              $featured_img_id = get_post_thumbnail_id();
              $featured_img = wp_get_attachment_image_src($featured_img_id, 'full');
              $featured_img_avif = wp_get_attachment_image_src($featured_img_id, 'full', false, array('type' => 'image/avif'));
              $image_type = wp_check_filetype($featured_img[0])['ext']; // Расширение файла (jpg, avif, svg и т.д.)

              ?>

              <a href="." class="idea-card ideas-grid__card" data-column="<?php echo $ideas_order; ?>" data-category="<?php echo esc_attr($tag_slug); ?>">
                <div class="idea-card__img">
                  <picture>
                    <?php
                    // Проверяем формат изображения
                    if ($image_type === 'avif') : ?>
                      <source type="image/avif" srcset="<?php echo esc_url($featured_img_avif[0]); ?>">
                      <img src="<?php echo esc_url($featured_img[0]); ?>" alt="<?php the_title(); ?>">
                    <?php elseif ($image_type === 'svg') : ?>
                      <img src="<?php echo esc_url($featured_img[0]); ?>" type="image/svg+xml" alt="<?php the_title(); ?>">
                    <?php elseif ($image_type === 'jpg' || $image_type === 'jpeg') : ?>
                      <img src="<?php echo esc_url($featured_img[0]); ?>" alt="<?php the_title(); ?>">
                    <?php elseif ($image_type === 'png') : ?>
                      <img src="<?php echo esc_url($featured_img[0]); ?>" alt="<?php the_title(); ?>">
                    <?php else : ?>
                      <!-- Если формат неизвестен, просто выводим изображение как стандартное -->
                      <img src="<?php echo esc_url($featured_img[0]); ?>" alt="<?php the_title(); ?>">
                    <?php endif; ?>
                  </picture>
                </div>
                <div class="idea-card__body">
                  <div class="idea-card__category">
                    <span class="icon-cubic-zip"></span><?php echo esc_html($tag_name); ?>
                  </div>
                  <h4 class="idea-card__title"><?php the_title(); ?></h4>
                </div>
              </a>

            <?php
            endwhile;
            wp_reset_postdata();
          else :
            echo '<p>' . __('No ideas found', 'linnikov-agency') . '</p>';
          endif;
          ?>
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
          <?php
          // Получаем теги с записями (связанные с хотя бы одной записью)
          $args = array(
            'taxonomy' => 'idea_tag',
            'hide_empty' => true, // Убедись, что тег связан с хотя бы одной записью
            'meta_key' => 'ideas_tag_order', // Используем метаполе для сортировки
            'orderby' => 'meta_value_num',   // Сортировка по сохранённому порядку
            'order' => 'ASC',
          );
          $tags = get_terms($args);

          // Начальное значение для номера в ID (начиная с 3, как в твоём примере)
          $id_number = 3;
          ?>

          <nav class="tg-control uppercase keen-slider fixed-materials-filter__slider" data-elem="slider">
            <!-- Первая ссылка с "All" - оставляем без изменений -->
            <a href="#all" class="keen-slider__slide text-btn" data-component="animated-link">
              <svg id="ideas-filter__lightning_2" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_2-clip)" transform="rotate(30 6.8 30) translate(-3)">
                  <rect class="animated-cubic-lightning__top" x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)" />
                  <rect class="animated-cubic-lightning__bottom" x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)" />
                  <rect class="animated-cubic-lightning__top" x="0" y="40" width="3.4" height="20" fill="var(--color, currentColor)" />
                  <rect class="animated-cubic-lightning__bottom" x="3.4" y="50" width="3.4" height="10" fill="var(--color, currentColor)" />
                </g>
                <defs>
                  <clipPath id="ideas-filter__lightning_2-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)" />
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)" />
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">All</div>
            </a>

            <?php if (!empty($tags)) : ?>
              <?php foreach ($tags as $tag) : ?>
                <a href="#<?php echo esc_attr($tag->slug); ?>" class="keen-slider__slide text-btn" data-component="animated-link">
                  <svg id="ideas-filter__lightning_<?php echo $id_number; ?>" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g class="animated-cubic-lightning__body" clip-path="url(#ideas-filter__lightning_<?php echo $id_number; ?>-clip)" transform="rotate(30 6.8 30) translate(-3)">
                      <rect class="animated-cubic-lightning__top" x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)" />
                      <rect class="animated-cubic-lightning__bottom" x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)" />
                      <rect class="animated-cubic-lightning__top" x="0" y="40" width="3.4" height="20" fill="var(--color, currentColor)" />
                      <rect class="animated-cubic-lightning__bottom" x="3.4" y="50" width="3.4" height="10" fill="var(--color, currentColor)" />
                    </g>
                    <defs>
                      <clipPath id="ideas-filter__lightning_<?php echo $id_number; ?>-clip">
                        <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)" />
                        <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div class="text-btn__cap"><?php echo esc_html($tag->name); ?></div>
                </a>
                <?php $id_number++; // Увеличиваем номер для следующего тега ?>
              <?php endforeach; ?>
            <?php endif; ?>
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
get_template_part('templates/general/drawers-group-subscribe');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');

get_footer();