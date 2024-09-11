<?php
// Сохранение нового порядка, если форма отправлена
if (isset($_POST['work_order'])) {
  linnikov_agency_save_work_order($_POST['work_order']);
}

// Получаем список всех работ
$args = array(
  'post_type' => 'work',
  'posts_per_page' => -1,
  'orderby' => 'menu_order',
  'order' => 'ASC',
);
$query = new WP_Query($args);
?>

<div class="wrap">
  <h1><?php _e('Work Archive Settings', 'linnikov-agency'); ?></h1>
  <form method="post">
    <?php wp_nonce_field('linnikov_agency_save_work_order_nonce', '_wpnonce_linnikov_agency_save_work_order'); ?>
    <ul id="sortable">
      <?php
      if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
          // Получаем URL изображения Hero из метаполя
          $hero_image_webp = get_post_meta(get_the_ID(), '_linnikov_agency_hero_image_webp', true);
          // Если URL изображения Hero пуст, используем миниатюру записи
          $image_url = $hero_image_webp ? esc_url($hero_image_webp) : get_the_post_thumbnail_url(get_the_ID(), 'thumbnail');
          ?>
          <li id="item-<?php the_ID(); ?>" class="ui-state-default" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; border: 1px solid #ddd; margin-bottom: 10px; background-color: #f9f9f9;">
            <!-- Иконка перетаскивания справа -->
            <div style="display: flex; align-items: center; cursor: move;">
              <img src="<?php echo $image_url; ?>" alt="<?php the_title(); ?>" style="width: 50px; height: auto; margin-right: 15px;">
              <div>
                <strong><?php the_title(); ?></strong>
              </div>
            </div>
            <!-- Область для перетаскивания -->
            <div style="width: 5%; cursor: move;" class="drag-handle">
              <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
            </div>
          </li>
        <?php
        endwhile;
        wp_reset_postdata();
      endif;
      ?>
    </ul>
    <input type="hidden" name="work_order" id="work_order">
    <button type="submit" class="button button-primary"><?php _e('Save Order', 'linnikov-agency'); ?></button>
  </form>
</div>
