<?php
// Добавляем метабокс для редактирования значений ползунка
function linnikov_agency_register_brief_design_meta_boxes($post) {
  global $post;

  // Добавляем метабокс только для страницы с нужным шаблоном (например, 'Brief Branding')
  if ($post && get_page_template_slug($post->ID) === 'templates/page-brief-design.php') {
    linnikov_agency_add_meta_box(
      'linnikov_agency_slider_design_values',   // ID метабокса
      __('Slider Values', 'linnikov-agency'),   // Заголовок
      'linnikov_agency_slider_design_values_callback', // Колбэк-функция
      'page',   // Тип поста
      'normal', // Контекст (где показывать метабокс)
      'high'    // Приоритет
    );
  }
}
add_action('add_meta_boxes', 'linnikov_agency_register_brief_design_meta_boxes');

// Колбэк-функция для метабокса с полями для ввода значений ползунка
function linnikov_agency_slider_design_values_callback($post) {
  // Получаем сохраненные данные
  $slider_values = get_post_meta($post->ID, '_linnikov_agency_slider_design_values', true);

  // Если нет данных, задаем значения по умолчанию
  if (!is_array($slider_values)) {
    $slider_values = [100, 200, 300, 400, 500]; // Значения по умолчанию
  }

  // Nonce для безопасности
  wp_nonce_field('linnikov_agency_save_slider_values', 'linnikov_agency_slider_nonce');

  echo '<p>' . __('Enter the slider values:', 'linnikov-agency') . '</p>';

  // Выводим 5 полей для ввода значений
  for ($i = 0; $i < 5; $i++) {
    echo '<label for="linnikov_agency_slider_value_' . $i . '">' . __('Value ' . ($i + 1), 'linnikov-agency') . ':</label>';
    echo '<input type="number" id="linnikov_agency_slider_value_' . $i . '" name="linnikov_agency_slider_values[]" value="' . esc_attr($slider_values[$i]) . '" style="width: 100%; margin-bottom: 10px;">';
  }
}

// Сохраняем значения ползунка из метабокса
function linnikov_agency_save_slider_design_values($post_id) {
  // Проверка, что это не автосохранение
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // Проверка Nonce
  if (!isset($_POST['linnikov_agency_slider_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_slider_nonce'], 'linnikov_agency_save_slider_values')) {
    return;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  // Сохранение данных
  if (isset($_POST['linnikov_agency_slider_values']) && is_array($_POST['linnikov_agency_slider_values'])) {
    $slider_values = array_map('intval', $_POST['linnikov_agency_slider_values']); // Преобразуем значения в массив чисел
    $slider_values = array_slice($slider_values, 0, 5); // Ограничиваем до 5 значений
    update_post_meta($post_id, '_linnikov_agency_slider_design_values', $slider_values);
  }
}
add_action('save_post', 'linnikov_agency_save_slider_design_values');