<?php
get_header();
?>

  <main>
    <section class="hero">
      <div class="section-container section-container_decor hero__container">
        <h1 class="tg-h1">Works</h1>
      </div>
    </section>
    <section class="top-cases works__top-cases" id="top-cases">
      <div class="section-container section-container_decor top-cases__container">
        <nav class="materials-filter_center top-cases__filter top-cases__filter_center">
          <div class="tg-control uppercase materials-filter__inner">
            <a href="#all" class="text-btn" data-component="animated-link">
              <svg id="materials-filter__lightning_1" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#materials-filter__lightning_1-clip)"
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
                  <clipPath id="materials-filter__lightning_1-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">All</div>
            </a>
            <a href="#branding" class="text-btn" data-component="animated-link">
              <svg id="materials-filter__lightning_2" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#materials-filter__lightning_2-clip)"
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
                  <clipPath id="materials-filter__lightning_2-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Branding</div>
            </a>
            <a href="#packaging" class="text-btn" data-component="animated-link">
              <svg id="materials-filter__lightning_3" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#materials-filter__lightning_3-clip)"
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
                  <clipPath id="materials-filter__lightning_3-clip">
                    <rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>
                    <rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>
                  </clipPath>
                </defs>
              </svg>
              <div class="text-btn__cap">Packaging</div>
            </a>
            <a href="#digital" class="text-btn" data-component="animated-link">
              <svg id="materials-filter__lightning_4" class="animated-cubic-lightning text-btn__lightning"
                   viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g class="animated-cubic-lightning__body" clip-path="url(#materials-filter__lightning_4-clip)"
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
                  <clipPath id="materials-filter__lightning_4-clip">
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
        // Получение настроенного порядка из опции
        $work_order = get_option('linnikov_agency_work_order', '');

        if (!empty($work_order)) {
          $work_order = explode(',', $work_order); // Преобразуем строку в массив
        } else {
          $work_order = array(); // Используем пустой массив по умолчанию
        }

        $args = array(
          'post_type' => 'work',
          'posts_per_page' => -1, // Вывод всех работ
          'orderby' => 'post__in', // Используем порядок, заданный в 'post__in'
          'post__in' => $work_order, // Устанавливаем порядок работ
        );

        // Если порядок пустой, убираем параметр 'post__in'
        if (empty($work_order)) {
          unset($args['post__in']);
          $args['orderby'] = 'menu_order'; // Устанавливаем порядок по menu_order
        }

        $query = new WP_Query($args);
        ?>

        <div class="top-cases__body" data-top-cases-elem="body">
          <?php
          if ($query->have_posts()) :
            while ($query->have_posts()) : $query->the_post();
              $work_tags = get_the_terms(get_the_ID(), 'work_tag'); // Получаем теги работы
              $categories = '';
              if ($work_tags && !is_wp_error($work_tags)) {
                $categories = join(', ', wp_list_pluck($work_tags, 'slug')); // Преобразуем массив тегов в строку
              }
              // Получаем Hero image из метаполя
              $hero_image_webp = get_post_meta(get_the_ID(), '_linnikov_agency_hero_image_webp', true);
              $hero_image_jpg = str_replace('.webp', '.jpg', $hero_image_webp); // Предполагаем, что JPG изображение имеет тот же путь, что и WebP, но с другим расширением
              ?>
              <a href="<?php the_permalink(); ?>" class="img-wrap img-wrap_cover case-poster case-poster_top" data-caption="<?php the_title(); ?>" data-category="<?php echo esc_attr($categories); ?>">
                <div class="img-wrap__inner">
                  <picture>
                    <source type="image/webp" srcset="<?php echo esc_url($hero_image_webp); ?>">
                    <img src="<?php echo esc_url($hero_image_jpg); ?>" alt="<?php the_title(); ?>" loading="lazy">
                  </picture>
                </div>
              </a>
            <?php
            endwhile;
            wp_reset_postdata();
          endif;
          ?>
        </div>
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