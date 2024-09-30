<?php

// Добавляем метабоксы для кастомных полей "Подзаголовок" и "Описание вакансии" для вакансий
function linnikov_agency_add_vacancy_meta_box() {
  add_meta_box(
    'linnikov_agency_vacancy_meta_box', // ID метабокса
    __('Vacancy Details', 'linnikov-agency'), // Заголовок метабокса
    'linnikov_agency_vacancy_meta_box_callback', // Функция колбэк
    'vacancies', // Тип постов
    'normal', // Позиция
    'high' // Приоритет
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_vacancy_meta_box');

// Функция колбэк для метабокса
function linnikov_agency_vacancy_meta_box_callback($post) {
  // Получаем существующие значения, если они есть
  $vacancy_subtitle = get_post_meta($post->ID, '_vacancy_subtitle', true);
  $vacancy_description = get_post_meta($post->ID, '_vacancy_description', true);

  // Nonce для безопасности
  wp_nonce_field('linnikov_agency_save_vacancy_meta_box', 'linnikov_agency_vacancy_nonce');
  ?>

  <p>
    <label for="vacancy_subtitle"><?php _e('Subtitle', 'linnikov-agency'); ?></label>
    <input type="text" id="vacancy_subtitle" name="vacancy_subtitle" value="<?php echo esc_attr($vacancy_subtitle); ?>" style="width:100%;" />
  </p>
  <p>
    <label for="vacancy_description"><?php _e('Vacancy Description', 'linnikov-agency'); ?></label>
    <?php
    // Используем wp_editor для редактора описания вакансии
    wp_editor(
      $vacancy_description, // Содержимое поля
      'vacancy_description', // ID редактора
      array(
        'textarea_name' => 'vacancy_description', // Имя поля
        'textarea_rows' => 10, // Количество строк
        'media_buttons' => true, // Включение кнопок загрузки медиа
        'tinymce' => true // Использование TinyMCE
      )
    );
    ?>
  </p>
  <?php
}

// Сохранение кастомных полей для вакансий
function linnikov_agency_save_vacancy_meta_box($post_id) {
  // Проверка nonce для безопасности
  if (!isset($_POST['linnikov_agency_vacancy_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_vacancy_nonce'], 'linnikov_agency_save_vacancy_meta_box')) {
    return $post_id; // Прерываем сохранение
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя на редактирование поста
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных поля "Подзаголовок"
  if (isset($_POST['vacancy_subtitle'])) {
    update_post_meta($post_id, '_vacancy_subtitle', sanitize_text_field($_POST['vacancy_subtitle']));
  } else {
    delete_post_meta($post_id, '_vacancy_subtitle');
  }

  // Сохранение данных поля "Описание вакансии"
  if (isset($_POST['vacancy_description'])) {
    update_post_meta($post_id, '_vacancy_description', sanitize_textarea_field($_POST['vacancy_description']));
  } else {
    delete_post_meta($post_id, '_vacancy_description');
  }
}

add_action('save_post', 'linnikov_agency_save_vacancy_meta_box');