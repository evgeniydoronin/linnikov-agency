<?php
/**
 * Template Name: Brief Website
 *
 */

get_header();
?>

  <div>
    <main>
      <?php get_template_part('templates/brief/hero-section'); ?>

      <?php
      // Определяем тип брифа для этой страницы
      $brief_type = 'website'; // Или другое значение для других страниц
      include locate_template('templates/forms/brief-form.php');
      ?>

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
