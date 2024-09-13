<?php
// Функция для добавления метабоксов для типа поста News
function linnikov_agency_add_news_metaboxes() {
  // Секция 1: Заголовок и одна колонка
  add_meta_box(
    'linnikov_news_section_1', // ID метабокса
    __('Section 1: Single Column', 'linnikov-agency'), // Заголовок метабокса
    'linnikov_agency_news_section_1_callback', // Callback функция для вывода контента метабокса
    'news', // Тип поста
    'normal', // Контекст
    'default' // Приоритет
  );

  // Секция 2: Цитата
  add_meta_box(
    'linnikov_news_section_2',
    __('Section 2: Quote', 'linnikov-agency'),
    'linnikov_agency_news_section_2_callback',
    'news',
    'normal',
    'default'
  );

  // Секция 3: Картинки
  add_meta_box(
    'linnikov_news_section_3',
    __('Section 3: Images + text', 'linnikov-agency'),
    'linnikov_agency_news_section_3_callback',
    'news',
    'normal',
    'default'
  );

  // Секция 4: Большая врезка
  add_meta_box(
    'linnikov_news_section_4',
    __('Section 4: Large Inset', 'linnikov-agency'),
    'linnikov_agency_news_section_4_callback',
    'news',
    'normal',
    'default'
  );

  // Секция 5: Колонка с картинкой
  add_meta_box(
    'linnikov_news_section_5',
    __('Section 5: Column with Image', 'linnikov-agency'),
    'linnikov_agency_news_section_5_callback',
    'news',
    'normal',
    'default'
  );
}
add_action('add_meta_boxes', 'linnikov_agency_add_news_metaboxes');

// Callback функции для метабоксов

// Callback функция для метабокса Секции 1: Одна колонка
function linnikov_agency_news_section_1_callback($post) {
  // Nonce поле для проверки
  wp_nonce_field('linnikov_agency_news_nonce_action', 'linnikov_agency_news_nonce');

  // Получаем текущее значение из метаполя
  $section_1_content = get_post_meta($post->ID, '_linnikov_news_section_1_content', true);

  // Стиль для секции и заголовок
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  // Редактор кода для контента Секции 1
  wp_editor(
    $section_1_content, // Содержимое редактора
    'linnikov_agency_section_1_content', // ID поля
    array(
      'textarea_name' => 'linnikov_agency_section_1_content',
      'textarea_rows' => 8,
      'media_buttons' => false, // Скрыть кнопку добавления медиафайлов, если не требуется
    )
  );

  echo '</div>';
}

// Callback функция для метабокса Секции 2: Цитата
function linnikov_agency_news_section_2_callback($post) {
  // Nonce поле для проверки
  wp_nonce_field('linnikov_agency_news_nonce_action', 'linnikov_agency_news_nonce');

  // Получение текущих значений из метаполей
  $quote = get_post_meta($post->ID, '_linnikov_news_section_2_quote', true);
  $name = get_post_meta($post->ID, '_linnikov_news_section_2_name', true);
  $position = get_post_meta($post->ID, '_linnikov_news_section_2_position', true);

  // Вывод полей для ввода данных
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  // Поле для цитаты
  echo '<label for="linnikov_news_section_2_quote">' . __('Quote', 'linnikov-agency') . '</label>';
  echo '<input type="text" id="linnikov_news_section_2_quote" name="linnikov_news_section_2_quote" value="' . esc_attr($quote) . '" maxlength="255" style="width: 100%; margin-bottom: 10px;" />';

  // Поле для ФИО
  echo '<label for="linnikov_news_section_2_name">' . __('Full Name', 'linnikov-agency') . '</label>';
  echo '<input type="text" id="linnikov_news_section_2_name" name="linnikov_news_section_2_name" value="' . esc_attr($name) . '" maxlength="255" style="width: 100%; margin-bottom: 10px;" />';

  // Поле для должности
  echo '<label for="linnikov_news_section_2_position">' . __('Position', 'linnikov-agency') . '</label>';
  echo '<input type="text" id="linnikov_news_section_2_position" name="linnikov_news_section_2_position" value="' . esc_attr($position) . '" maxlength="255" style="width: 100%; margin-bottom: 10px;" />';

  echo '</div>';
}

// Callback функция для метабокса Секции 3: Картинки
function linnikov_agency_news_section_3_callback($post) {
  // Nonce поле для проверки
  wp_nonce_field('linnikov_agency_news_nonce_action', 'linnikov_agency_news_nonce');

  // Получение текущих значений из метаполей
  $image_1 = get_post_meta($post->ID, '_linnikov_news_section_3_image_1', true);
  $image_2 = get_post_meta($post->ID, '_linnikov_news_section_3_image_2', true);
  $image_3 = get_post_meta($post->ID, '_linnikov_news_section_3_image_3', true);
  $content = get_post_meta($post->ID, '_linnikov_news_section_3_content', true);

  // Стиль для секции и заголовок
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  // Поле загрузки первой картинки
  echo '<div class="linnikov-image-upload-container" id="image-upload-container-3-1">';
  echo '<label for="linnikov_news_section_3_image_1">' . __('Image 1 (WebP)', 'linnikov-agency') . '</label><br>';
  echo '<input type="hidden" id="linnikov_news_section_3_image_1" name="linnikov_news_section_3_image_1" value="' . esc_attr($image_1) . '" />';
  echo '<div class="image-preview"><img src="' . esc_url($image_1) . '" style="' . ( !empty($image_1) ? 'display: block;' : 'display: none;' ) . ' " /></div>';
  echo '<div class="button_box">';
  echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#linnikov_news_section_3_image_1">' . __('Upload Image', 'linnikov-agency') . '</button>';
  echo '<button type="button" class="button linnikov-agency-remove-image" data-target="#linnikov_news_section_3_image_1">' . __('Remove Image', 'linnikov-agency') . '</button>';
  echo '</div>';
  echo '</div>';

  // Поле загрузки второй картинки
  echo '<div class="linnikov-image-upload-container" id="image-upload-container-3-2">';
  echo '<label for="linnikov_news_section_3_image_2">' . __('Image 2 (WebP)', 'linnikov-agency') . '</label><br>';
  echo '<input type="hidden" id="linnikov_news_section_3_image_2" name="linnikov_news_section_3_image_2" value="' . esc_attr($image_2) . '" />';
  echo '<div class="image-preview"><img src="' . esc_url($image_2) . '" style="' . ( !empty($image_2) ? 'display: block;' : 'display: none;' ) . ' " /></div>';
  echo '<div class="button_box">';
  echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#linnikov_news_section_3_image_2">' . __('Upload Image', 'linnikov-agency') . '</button>';
  echo '<button type="button" class="button linnikov-agency-remove-image" data-target="#linnikov_news_section_3_image_2">' . __('Remove Image', 'linnikov-agency') . '</button>';
  echo '</div>';
  echo '</div>';

  // Поле загрузки третьей картинки
  echo '<div class="linnikov-image-upload-container" id="image-upload-container-3-3">';
  echo '<label for="linnikov_news_section_3_image_3">' . __('Image 3 (WebP)', 'linnikov-agency') . '</label><br>';
  echo '<input type="hidden" id="linnikov_news_section_3_image_3" name="linnikov_news_section_3_image_3" value="' . esc_attr($image_3) . '" />';
  echo '<div class="image-preview"><img src="' . esc_url($image_3) . '" style="' . ( !empty($image_3) ? 'display: block;' : 'display: none;' ) . ' " /></div>';
  echo '<div class="button_box">';
  echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#linnikov_news_section_3_image_3">' . __('Upload Image', 'linnikov-agency') . '</button>';
  echo '<button type="button" class="button linnikov-agency-remove-image" data-target="#linnikov_news_section_3_image_3">' . __('Remove Image', 'linnikov-agency') . '</button>';
  echo '</div>';
  echo '</div>';

  // Редактор контента
  wp_editor(
    $content,
    'linnikov_agency_section_3_content',
    array(
      'textarea_name' => 'linnikov_agency_section_3_content',
      'textarea_rows' => 6,
      'media_buttons' => false, // Скрыть кнопку добавления медиафайлов, если не требуется
    )
  );

  echo '</div>';
}

// Callback функция для метабокса Секции 4: Большая врезка
function linnikov_agency_news_section_4_callback($post) {
  // Nonce поле для проверки
  wp_nonce_field('linnikov_agency_news_nonce_action', 'linnikov_agency_news_nonce');

  // Получение текущего значения из метаполя
  $excerpt_text = get_post_meta($post->ID, '_linnikov_news_section_4_excerpt', true);

  // Вывод поля для ввода данных
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<textarea id="linnikov_news_section_4_excerpt" name="linnikov_news_section_4_excerpt" maxlength="255" style="width: 100%; height: 3em; margin-top: 10px;">' . esc_textarea($excerpt_text) . '</textarea>';
  echo '</div>';
}

// Callback функция для метабокса Секции 5: Колонка с картинкой
function linnikov_agency_news_section_5_callback($post) {
  // Nonce поле для проверки
  wp_nonce_field('linnikov_agency_news_nonce_action', 'linnikov_agency_news_nonce');

  // Получение текущих значений из метаполей
  $image_1 = get_post_meta($post->ID, '_linnikov_news_section_5_image_1', true);
  $content_1 = get_post_meta($post->ID, '_linnikov_news_section_5_content_1', true);
  $content_2 = get_post_meta($post->ID, '_linnikov_news_section_5_content_2', true);
  $image_2 = get_post_meta($post->ID, '_linnikov_news_section_5_image_2', true);

  // Стиль для секции и заголовок
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  // Поле загрузки первой картинки
  echo '<div class="linnikov-image-upload-container" id="image-upload-container-1">';
  echo '<label for="linnikov_news_section_5_image_1">' . __('Image 1 (WebP)', 'linnikov-agency') . '</label><br>';
  echo '<input type="hidden" id="linnikov_news_section_5_image_1" name="linnikov_news_section_5_image_1" value="' . esc_attr($image_1) . '" />';
  echo '<div class="image-preview"><img src="' . esc_url($image_1) . '" style="' . ( !empty($image_1) ? 'display: block;' : 'display: none;' ) . '" /></div>';
  echo '<div class="button_box">';
  echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#linnikov_news_section_5_image_1">' . __('Upload Image', 'linnikov-agency') . '</button>';
  echo '<button type="button" class="button linnikov-agency-remove-image" data-target="#linnikov_news_section_5_image_1">' . __('Remove Image', 'linnikov-agency') . '</button>'; // Кнопка удаления
  echo '</div>';
  echo '</div>'; // Закрываем контейнер первой картинки

  // Первый редактор контента
  wp_editor(
    $content_1,
    'linnikov_agency_section_5_content_1',
    array(
      'textarea_name' => 'linnikov_agency_section_5_content_1',
      'textarea_rows' => 6,
      'media_buttons' => false, // Скрыть кнопку добавления медиафайлов, если не требуется
    )
  );

  // Второй редактор контента
  wp_editor(
    $content_2,
    'linnikov_agency_section_5_content_2',
    array(
      'textarea_name' => 'linnikov_agency_section_5_content_2',
      'textarea_rows' => 6,
      'media_buttons' => false, // Скрыть кнопку добавления медиафайлов, если не требуется
    )
  );

  // Поле загрузки второй картинки
  echo '<div class="linnikov-image-upload-container" id="image-upload-container-2">';
  echo '<label for="linnikov_news_section_5_image_2">' . __('Image 2 (WebP)', 'linnikov-agency') . '</label><br>';
  echo '<input type="hidden" id="linnikov_news_section_5_image_2" name="linnikov_news_section_5_image_2" value="' . esc_attr($image_2) . '" />';
  echo '<div class="image-preview"><img src="' . esc_url($image_2) . '" style="' . ( !empty($image_2) ? 'display: block;' : 'display: none;' ) . '" /></div>';
  echo '<div class="button_box">';
  echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#linnikov_news_section_5_image_2">' . __('Upload Image', 'linnikov-agency') . '</button>';
  echo '<button type="button" class="button linnikov-agency-remove-image" data-target="#linnikov_news_section_5_image_2">' . __('Remove Image', 'linnikov-agency') . '</button>'; // Кнопка удаления
  echo '</div>';
  echo '</div>'; // Закрываем контейнер второй картинки

  echo '</div>'; // Закрываем основной контейнер
}

// Сохранение данных метаполей
function linnikov_agency_save_news_metabox_data($post_id) {
  // Проверка nonce поля
  if (!isset($_POST['linnikov_agency_news_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_news_nonce'], 'linnikov_agency_news_nonce_action')) {
    return;
  }

  // Проверка на автосохранение
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }

  // Проверка прав пользователя
  if (isset($_POST['post_type']) && 'news' == $_POST['post_type']) {
    if (!current_user_can('edit_post', $post_id)) {
      return;
    }
  }

  // Сохранение значения метаполя для Секции 1: Одна колонка
  if (isset($_POST['linnikov_agency_section_1_content'])) {
    update_post_meta($post_id, '_linnikov_news_section_1_content', wp_kses_post($_POST['linnikov_agency_section_1_content']));
  }

  // Сохранение значений метаполей для Секции 2: Цитата
  if (isset($_POST['linnikov_news_section_2_quote'])) {
    update_post_meta($post_id, '_linnikov_news_section_2_quote', sanitize_text_field($_POST['linnikov_news_section_2_quote']));
  }
  if (isset($_POST['linnikov_news_section_2_name'])) {
    update_post_meta($post_id, '_linnikov_news_section_2_name', sanitize_text_field($_POST['linnikov_news_section_2_name']));
  }
  if (isset($_POST['linnikov_news_section_2_position'])) {
    update_post_meta($post_id, '_linnikov_news_section_2_position', sanitize_text_field($_POST['linnikov_news_section_2_position']));
  }

  // Сохранение значений метаполей для Секции 3
  if (isset($_POST['linnikov_news_section_3_image_1'])) {
    $image_1 = esc_url_raw($_POST['linnikov_news_section_3_image_1']); // Очистка URL
    update_post_meta($post_id, '_linnikov_news_section_3_image_1', $image_1);
  } else {
    delete_post_meta($post_id, '_linnikov_news_section_3_image_1'); // Удаление метаполя, если пустое
  }

  if (isset($_POST['linnikov_news_section_3_image_2'])) {
    $image_2 = esc_url_raw($_POST['linnikov_news_section_3_image_2']); // Очистка URL
    update_post_meta($post_id, '_linnikov_news_section_3_image_2', $image_2);
  } else {
    delete_post_meta($post_id, '_linnikov_news_section_3_image_2'); // Удаление метаполя, если пустое
  }

  if (isset($_POST['linnikov_news_section_3_image_3'])) { // Новое поле
    $image_3 = esc_url_raw($_POST['linnikov_news_section_3_image_3']); // Очистка URL
    update_post_meta($post_id, '_linnikov_news_section_3_image_3', $image_3);
  } else {
    delete_post_meta($post_id, '_linnikov_news_section_3_image_3'); // Удаление метаполя, если пустое
  }

  if (isset($_POST['linnikov_agency_section_3_content'])) {
    update_post_meta($post_id, '_linnikov_news_section_3_content', wp_kses_post($_POST['linnikov_agency_section_3_content']));
  }

  // Сохранение значения метаполя для Секции 4: Большая врезка
  if (isset($_POST['linnikov_news_section_4_excerpt'])) {
    $excerpt_text = sanitize_text_field($_POST['linnikov_news_section_4_excerpt']); // Очистка входных данных
    update_post_meta($post_id, '_linnikov_news_section_4_excerpt', $excerpt_text);
  } else {
    delete_post_meta($post_id, '_linnikov_news_section_4_excerpt'); // Удаление метаполя, если пустое
  }

  // Сохранение значений метаполей для Секции 5
  if (isset($_POST['linnikov_news_section_5_image_1'])) {
    $image_1 = esc_url_raw($_POST['linnikov_news_section_5_image_1']); // Очистка URL
    update_post_meta($post_id, '_linnikov_news_section_5_image_1', $image_1);
  } else {
    delete_post_meta($post_id, '_linnikov_news_section_5_image_1'); // Удаление метаполя, если пустое
  }

  if (isset($_POST['linnikov_agency_section_5_content_1'])) {
    update_post_meta($post_id, '_linnikov_news_section_5_content_1', wp_kses_post($_POST['linnikov_agency_section_5_content_1']));
  }

  if (isset($_POST['linnikov_agency_section_5_content_2'])) {
    update_post_meta($post_id, '_linnikov_news_section_5_content_2', wp_kses_post($_POST['linnikov_agency_section_5_content_2']));
  }

  if (isset($_POST['linnikov_news_section_5_image_2'])) {
    $image_2 = esc_url_raw($_POST['linnikov_news_section_5_image_2']); // Очистка URL
    update_post_meta($post_id, '_linnikov_news_section_5_image_2', $image_2);
  } else {
    delete_post_meta($post_id, '_linnikov_news_section_5_image_2'); // Удаление метаполя, если пустое
  }
}
add_action('save_post', 'linnikov_agency_save_news_metabox_data');