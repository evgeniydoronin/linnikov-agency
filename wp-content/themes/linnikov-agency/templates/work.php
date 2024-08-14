<?php
/**
 * Template Name: Works Archive
 *
 * This template displays an archive of all "work" custom post types.
 */

get_header();
?>

  <div class="works-archive">
    <h1><?php _e('Our Works', 'linnikov-agency'); ?></h1>

    <?php if (have_posts()) : ?>
      <div class="works-grid">
        <?php while (have_posts()) : the_post(); ?>
          <div class="work-item">
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
              <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('medium'); ?>
              <?php endif; ?>
              <h2><?php the_title(); ?></h2>
            </a>
          </div>
        <?php endwhile; ?>
      </div>

      <div class="pagination">
        <?php
        // Custom pagination function or WordPress pagination function
        the_posts_pagination();
        ?>
      </div>
    <?php else : ?>
      <p><?php _e('No works found.', 'linnikov-agency'); ?></p>
    <?php endif; ?>
  </div>

<?php
get_footer();