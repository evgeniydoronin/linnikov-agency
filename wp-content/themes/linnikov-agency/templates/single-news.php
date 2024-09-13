<?php
get_header(); ?>

  <main>
    <article class="post">
      <div class="section-container section-container_decor post__container">
        <div class="post__inner">
          <h1 class="tg-h1 post__title"><?php the_title(); ?></h1>
          <div class="post-content">
            <?php
            // Получаем данные метаполя для Секции 1
            $section_1_content = get_post_meta(get_the_ID(), '_linnikov_news_section_1_content', true);

            // Проверяем, есть ли данные, и выводим их
            if (!empty($section_1_content)) {
              echo apply_filters('the_content', $section_1_content); // Применяем фильтр the_content для рендеринга контента как в редакторе WordPress
            }
            ?>

            <?php
            // Получаем данные метаполей для Секции 2
            $quote = get_post_meta(get_the_ID(), '_linnikov_news_section_2_quote', true);
            $name = get_post_meta(get_the_ID(), '_linnikov_news_section_2_name', true);
            $position = get_post_meta(get_the_ID(), '_linnikov_news_section_2_position', true);

            if (!empty($quote)) : ?>

              <div class="article-quote post-content__quote">
                <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/quotes-dark.svg" alt="Quotes"
                     class="article-quote__quotes-img article-quote__quotes-img_rgb-dark">
                <p class="article-quote__body"><?php echo $quote; ?></p>
                <div class="article-quote__author"><?php echo $name; ?></div>
                <div class="article-quote__role"><?php echo $position; ?></div>
              </div>

            <?php endif; ?>

            <?php
            // Получаем данные метаполей для Секции 3
            $image_1 = get_post_meta(get_the_ID(), '_linnikov_news_section_3_image_1', true);
            $image_2 = get_post_meta(get_the_ID(), '_linnikov_news_section_3_image_2', true);
            $image_3 = get_post_meta(get_the_ID(), '_linnikov_news_section_3_image_3', true);
            $content = get_post_meta(get_the_ID(), '_linnikov_news_section_3_content', true);
            ?>


            <div class="article-img-set post-content__img-set">
              <div class="img-wrap">
                <div class="img-wrap__inner">
                  <picture>
                    <source type="image/webp" srcset="<?php echo esc_url($image_1); ?>">
                    <img src="<?php echo esc_url($image_1); ?>">
                  </picture>
                </div>
              </div>
              <div class="img-wrap">
                <div class="img-wrap__inner">
                  <picture>
                    <source type="image/webp" srcset="<?php echo esc_url($image_2); ?>">
                    <img src="<?php echo esc_url($image_2); ?>">
                  </picture>
                </div>
              </div>
              <div class="img-wrap">
                <div class="img-wrap__inner">
                  <picture>
                    <source type="image/webp" srcset="<?php echo esc_url($image_3); ?>">
                    <img src="<?php echo esc_url($image_3); ?>">
                  </picture>
                </div>
              </div>
            </div>
            <?php echo apply_filters('the_content', $content); // Применяем фильтр the_content для рендеринга контента как в редакторе WordPress ?>
            <?php
            // Получаем данные метаполя для Секции 4
            $excerpt_text = get_post_meta(get_the_ID(), '_linnikov_news_section_4_excerpt', true);

            // Проверяем и выводим данные
            if (!empty($excerpt_text)) {
              echo '<span class="article-important">' . esc_html($excerpt_text) . '</span>'; // Безопасный вывод текста
            }
            ?>

            <p>“We are trying to fix a system that is broken, one we as designers should re-imagine and build from the
              ground up.” Share So now - let’s imagine a future that will take us to better place. And let’s stop
              rehashing the past that’s kept us all from thriving together.</p>
            <div class="article-composition post-content__composition">
              <div class="img-wrap">
                <div class="img-wrap__inner">
                  <picture>
                    <source type="image/webp"
                            srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/single-post/fuck-around.webp">
                    <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/single-post/fuck-around.jpg"
                         alt="News poster">
                  </picture>
                </div>
              </div>
              <p>“What if we thought of the experiences of Black people beyond the traumatic, narrow narratives of slave
                ships and pyramids? What if instead we used metaphors of space travel and the narratives of technology?
                What if we started looking at futuristic metaphors to tell stories about Black people? Not only would
                that
                revise how we engage race, but it would also provide a map of the future in which Black people play a
                central and significant part.”</p>
            </div>
            <div class="img-wrap article-img post-content__img">
              <div class="img-wrap__inner">
                <picture>
                  <source type="image/webp"
                          srcset="<?php echo get_template_directory_uri(); ?>/git-src/build/img/single-post/bug-01.webp">
                  <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/single-post/bug-01.jpg"
                       alt="News poster">
                </picture>
              </div>
            </div>
          </div>
        </div>
        <section class="share-it">
          <div class="share-it__inner">
            <h2>Like idea? Share&nbsp;it</h2>
            <div class="share-it__links">
              <?php
              // Get the current post URL, title, and excerpt
              $current_post_url = get_permalink();
              $current_post_title = get_the_title();
              $current_post_excerpt = get_the_excerpt();
              $site_name = get_bloginfo('name');

              // Prepare sharing URLs
              $facebook_share_url = 'https://www.facebook.com/sharer/sharer.php?u=' . urlencode($current_post_url);
              $twitter_share_url = 'https://twitter.com/intent/tweet?url=' . urlencode($current_post_url) . '&text=' . urlencode($current_post_title);
              $linkedin_share_url = 'https://www.linkedin.com/shareArticle?mini=true&url=' . urlencode($current_post_url) . '&title=' . urlencode($current_post_title) . '&summary=' . urlencode($current_post_excerpt) . '&source=' . urlencode($site_name);

              // Instagram does not support direct URL-based sharing; offer a copy link feature
              ?>

              <a href="<?php echo esc_url($facebook_share_url); ?>" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="<?php echo esc_url($twitter_share_url); ?>" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="<?php echo esc_url($linkedin_share_url); ?>" target="_blank" rel="noopener noreferrer">LinkedIn</a>

            </div>
          </div>
        </section>
      </div>
    </article>
  </main>

<?php
get_template_part('templates/general/drawers-group');
get_template_part('templates/general/toasts');
get_template_part('templates/general/cursor');
get_template_part('templates/general/ref-to-clipboard');
get_template_part('templates/general/cta-widget');
get_template_part('templates/general/main-footer');
get_footer();
