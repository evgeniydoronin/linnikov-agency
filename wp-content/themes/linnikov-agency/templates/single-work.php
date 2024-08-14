<?php
/**
 * Template Name: Single Work
 *
 * This template displays a single "work" custom post type.
 */

get_header();
?>

  <div class="single-work">
    <div class="work-hero">
      <?php
      // Display the hero image (if set in the meta box)
      $hero_image_jpg = get_post_meta(get_the_ID(), '_linnikov_agency_hero_image_jpg', true);
      $hero_image_webp = get_post_meta(get_the_ID(), '_linnikov_agency_hero_image_webp', true);

      if ($hero_image_jpg && $hero_image_webp) : ?>
        <picture>
          <source type="image/webp" srcset="<?php echo esc_url($hero_image_webp); ?>">
          <img src="<?php echo esc_url($hero_image_jpg); ?>" alt="<?php the_title_attribute(); ?>">
        </picture>
      <?php endif; ?>
    </div>

    <div class="work-content">
      <h1><?php the_title(); ?></h1>

      <?php
      // Display the content or other custom fields
      the_content();
      ?>

      <div class="work-gallery">
        <?php
        // Display the single-line-scroll-slider images
        if (have_rows('single_line_scroll_slider')) :
          while (have_rows('single_line_scroll_slider')) : the_row();
            $image_jpg = get_sub_field('image_jpg');
            $image_webp = get_sub_field('image_webp');
            ?>
            <div class="single-line-scroll-slide">
              <a href="<?php echo esc_url($image_jpg['url']); ?>" data-fancybox="work-media" data-caption="<?php echo esc_attr($image_jpg['alt']); ?>" class="img-wrap">
                <picture>
                  <source type="image/webp" srcset="<?php echo esc_url($image_webp['url']); ?>">
                  <img src="<?php echo esc_url($image_jpg['url']); ?>" alt="<?php echo esc_attr($image_jpg['alt']); ?>">
                </picture>
              </a>
            </div>
          <?php endwhile;
        endif;
        ?>
      </div>
    </div>
  </div>

<?php
get_footer();