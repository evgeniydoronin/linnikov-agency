<?php
/**
 * Template Name: Brief Website
 *
 */

get_header();
?>

  <div>
    <main>
      <section class="hero hero_brief">
        <div class="section-container section-container_decor hero__container">
          <div class="section-container__inner hero__inner">
            <h1 class="tg-h1 hero__title">Website</h1>
            <div class="hero__block">
              <div class="tg-h3 hero__block-title">How well do you understand your product and your customers?</div>
              <p class="tg-regular">Your answers will help us gain a deeper understanding of your business and the core
                objectives of the project, allowing us to provide a more accurate timeline and cost estimate.</p>
            </div>
          </div>
        </div>
      </section>

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
