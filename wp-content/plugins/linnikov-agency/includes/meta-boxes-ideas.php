<?php

// Добавляем метабокс для указания порядка поста
function linnikov_agency_add_ideas_order_meta_box() {
  add_meta_box(
    'ideas_order_meta_box',  // ID метабокса
    __('Post Order', 'linnikov-agency'),  // Название метабокса
    'linnikov_agency_render_ideas_order_meta_box',  // Функция для рендера содержимого метабокса
    'ideas',  // Тип поста, к которому добавляем метабокс
    'side',   // Расположение метабокса (в правой колонке)
    'default' // Приоритет отображения метабокса
  );
}
add_action('add_meta_boxes', 'linnikov_agency_add_ideas_order_meta_box');

// Функция для рендера метабокса
function linnikov_agency_render_ideas_order_meta_box($post) {
  // Получаем текущее значение метаполя
  $ideas_order = get_post_meta($post->ID, '_ideas_order', true);

  // Поле для ввода порядка
  ?>
  <label for="ideas_order_field"><?php _e('Set the order of this post', 'linnikov-agency'); ?></label>
  <input type="number" name="ideas_order_field" id="ideas_order_field" value="<?php echo esc_attr($ideas_order); ?>" style="width: 100%;" />
  <?php
  // Поле nonce для безопасности
  wp_nonce_field('linnikov_agency_save_ideas_order_nonce', 'linnikov_agency_ideas_order_nonce');
}

// Сохранение значения метаполя
function linnikov_agency_save_ideas_order_meta($post_id) {
  // Проверка, что это не автосохранение
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // Проверка прав доступа пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  // Проверка nonce
  if (!isset($_POST['linnikov_agency_ideas_order_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_ideas_order_nonce'], 'linnikov_agency_save_ideas_order_nonce')) {
    return;
  }

  // Проверка и сохранение значения метаполя
  if (isset($_POST['ideas_order_field'])) {
    $ideas_order = intval($_POST['ideas_order_field']);
    update_post_meta($post_id, '_ideas_order', $ideas_order);
  }
}
add_action('save_post', 'linnikov_agency_save_ideas_order_meta');