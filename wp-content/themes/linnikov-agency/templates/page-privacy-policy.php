<?php
/**
 * Template Name: Privacy Policy
 *
 */
get_header(); ?>

  <div>
    <main>
      <section class="hero hero_privacy-policy">
        <div class="section-container section-container_decor hero__container">
          <div class="section-container__inner hero__inner">
            <h1 class="tg-h1 hero__title"><?php echo get_the_title(); ?></h1>
          </div>
        </div>
      </section>
      <div class="section-container section-container_decor">
        <div class="tg-regular section-container__inner article-body">
          <?php echo get_the_content(); ?>
        </div>
      </div>
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
