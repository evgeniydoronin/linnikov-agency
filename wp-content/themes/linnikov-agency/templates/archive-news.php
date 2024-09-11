<?php get_header(); ?>

  <main id="main" class="site-main">
    <h1><?php post_type_archive_title(); ?></h1>

    <?php if (have_posts()) : ?>
      <div class="posts-wrapper">
        <?php while (have_posts()) : the_post(); ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="entry-summary">
              <?php the_excerpt(); ?>
            </div>
          </article>
        <?php endwhile; ?>
      </div>

      <!-- Пагинация -->
      <div class="pagination">
        <?php
        // Вывод пагинации, если она есть
        the_posts_pagination(array(
          'mid_size' => 2,
          'prev_text' => __('« Previous', 'linnikov-agency'),
          'next_text' => __('Next »', 'linnikov-agency'),
        ));
        ?>
      </div>
    <?php else : ?>
      <p><?php _e('No news posts found.', 'linnikov-agency'); ?></p>
    <?php endif; ?>

  </main>

<?php get_footer(); ?>