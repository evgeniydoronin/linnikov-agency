<?php

// Универсальная функция для добавления метабоксов
function linnikov_agency_add_meta_box($id, $title, $callback)
{
  add_meta_box(
    $id,         // ID метабокса
    $title,      // Заголовок метабокса
    $callback,   // Функция колбэк
    'page',      // Тип постов
    'normal',    // Позиция метабокса
    'high'       // Приоритет
  );
}

// Добавляем метабоксы для секций только на странице "About Us"
function linnikov_agency_register_meta_boxes($post)
{
  global $post; // Получаем глобальный объект поста

  // Проверяем, что это страница с шаблоном "About Us"
  if ($post && get_page_template_slug($post->ID) === 'templates/page-about-us.php') {
    linnikov_agency_add_meta_box(
      'linnikov_agency_video_meta_box',
      __('Video Section', 'linnikov-agency'),
      'linnikov_agency_video_meta_box_callback'
    );
    linnikov_agency_add_meta_box(
      'linnikov_agency_numbers_meta_box',
      __('Agency in Numbers', 'linnikov-agency'),
      'linnikov_agency_numbers_meta_box_callback'
    );
    linnikov_agency_add_meta_box(
      'linnikov_agency_testimonials_meta_box',
      __('Client Testimonials', 'linnikov-agency'),
      'linnikov_agency_testimonials_meta_box_callback'
    );
    linnikov_agency_add_meta_box(
      'linnikov_agency_awards_meta_box',
      __('Our Awards', 'linnikov-agency'),
      'linnikov_agency_awards_meta_box_callback'
    );
//    linnikov_agency_add_meta_box(
//      'linnikov_agency_achieve_ambitions_meta_box',
//      __('Achieve Ambitions', 'linnikov-agency'),
//      'linnikov_agency_achieve_ambitions_meta_box_callback'
//    );
  }
}

add_action('add_meta_boxes', 'linnikov_agency_register_meta_boxes');

// Callback для метабокса видео
function linnikov_agency_video_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $video_url = get_post_meta($post->ID, '_linnikov_agency_video_url', true);
  $poster_url = get_post_meta($post->ID, '_linnikov_agency_video_poster', true);

  // Nonce для защиты
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_video_nonce');

  // Структура метабокса
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  // Поле для ввода URL видео
  echo '<label for="linnikov_agency_video_url">' . __('Video URL (YouTube or Vimeo)', 'linnikov-agency') . '</label>';
  echo '<input type="text" id="linnikov_agency_video_url" name="linnikov_agency_video_url" value="' . esc_attr($video_url) . '" style="width: 100%; margin-bottom: 10px;">';

  // Поле для загрузки постера
  echo '<label for="linnikov_agency_video_poster">' . __('Video Poster (WebP format)', 'linnikov-agency') . '</label>';
  echo '<input type="hidden" id="linnikov_agency_video_poster" name="linnikov_agency_video_poster" value="' . esc_attr($poster_url) . '">';
  echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#linnikov_agency_video_poster" data-preview="#video_poster_preview" data-remove-button="#remove_video_poster_button">' . __('Upload Poster', 'linnikov-agency') . '</button>';
  echo '<button type="button" class="button linnikov-agency-remove-image" id="remove_video_poster_button" data-target="#linnikov_agency_video_poster" data-preview="#video_poster_preview" style="display:' . ($poster_url ? 'inline-block' : 'none') . ';">' . __('Remove Poster', 'linnikov-agency') . '</button>';

  // Превью постера
  echo '<div id="video_poster_preview" style="margin-top: 10px;">';
  if ($poster_url) {
    echo '<img src="' . esc_url($poster_url) . '" style="max-width: 200px;">';
  }
  echo '</div>';

  echo '</div>';
}

// Callback для метабокса Agency in Numbers
function linnikov_agency_numbers_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $count_up_sections = get_post_meta($post->ID, '_linnikov_agency_count_up_sections', true);

  // Nonce для защиты
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_numbers_nonce');

  // Структура метабокса
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Count-up Cells', 'linnikov-agency') . '</h4>';
  echo '<div id="count-up-sections-container">';

  if (is_array($count_up_sections) && !empty($count_up_sections)) {
    foreach ($count_up_sections as $index => $section) {
      echo '<div class="count-up-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';

      echo '<label>';
      echo '<input type="checkbox" name="count_up_sections[' . $index . '][plus]" value="1"' . checked($section['plus'], 1, false) . ' />';
      echo __('Plus', 'linnikov-agency');
      echo '</label>';

      echo '<label style="display:block; margin-top:5px;">' . __('Count', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="count_up_sections[' . $index . '][count]" value="' . esc_attr($section['count']) . '" style="width:100%;" />';

      echo '<label style="display:block; margin-top:5px;">' . __('Text', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="count_up_sections[' . $index . '][text]" value="' . esc_attr($section['text']) . '" style="width:100%;" />';

      echo '<button type="button" class="button remove-count-up-section red" style="margin-top: 10px;">' . __('Remove Section', 'linnikov-agency') . '</button>';

      echo '</div>';
    }
  }

  echo '</div>';
  echo '<button type="button" class="button add-count-up-section" style="margin-top: 10px;">' . __('Add New Section', 'linnikov-agency') . '</button>';
  echo '</div>';

  // Вставляем jQuery скрипт прямо в колбэк
  ?>
  <script>
      jQuery(document).ready(function ($) {
          // Функция для добавления новой секции Count-up Cell
          function addCountUpSection() {
              let index = $('.count-up-section').length;
              let newSection = `
            <div class="count-up-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">
                <label><input type="checkbox" name="count_up_sections[${index}][plus]" value="1" /> ${wp.i18n.__('Plus', 'linnikov-agency')}</label>
                <label style="display:block; margin-top:5px;">${wp.i18n.__('Count', 'linnikov-agency')}</label>
                <input type="text" name="count_up_sections[${index}][count]" style="width:100%;" />
                <label style="display:block; margin-top:5px;">${wp.i18n.__('Text', 'linnikov-agency')}</label>
                <input type="text" name="count_up_sections[${index}][text]" style="width:100%;" />
                <button type="button" class="button remove-count-up-section" style="margin-top: 5px;">${wp.i18n.__('Remove Section', 'linnikov-agency')}</button>
            </div>`;
              $('#count-up-sections-container').append(newSection);
          }

          // Обработка добавления новой секции
          $('.add-count-up-section').on('click', function () {
              addCountUpSection();
          });

          // Обработка удаления секции
          $(document).on('click', '.remove-count-up-section', function () {
              $(this).closest('.count-up-section').remove();
          });
      });
  </script>
  <?php
}

// Callback для метабокса Testimonials
function linnikov_agency_testimonials_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $testimonials = get_post_meta($post->ID, '_linnikov_agency_testimonials', true);

  // Nonce для защиты
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_testimonials_nonce');

  // Структура метабокса
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Client Testimonials', 'linnikov-agency') . '</h4>';
  echo '<div id="testimonials-sections-container">';

  if (is_array($testimonials) && !empty($testimonials)) {
    foreach ($testimonials as $index => $testimonial) {
      echo '<div class="testimonial-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';

      echo '<label>' . __('Company Name', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="testimonials[' . $index . '][company]" value="' . esc_attr($testimonial['company']) . '" style="width:100%;" />';

      echo '<label>' . __('Client Name', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="testimonials[' . $index . '][client]" value="' . esc_attr($testimonial['client']) . '" style="width:100%;" />';

      echo '<label>' . __('Job Title', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="testimonials[' . $index . '][job]" value="' . esc_attr($testimonial['job']) . '" style="width:100%;" />';

      // Поле для загрузки изображения клиента
      echo '<label>' . __('Client Image (WebP recommended)', 'linnikov-agency') . '</label>';
      echo '<input type="hidden" id="testimonial_client_image_' . $index . '" name="testimonials[' . $index . '][image]" value="' . esc_attr($testimonial['image']) . '">';
      echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#testimonial_client_image_' . $index . '" data-preview="#testimonial_image_preview_' . $index . '" data-remove-button="#remove_testimonial_image_' . $index . '">' . __('Upload Image', 'linnikov-agency') . '</button>';
      echo '<button type="button" class="button linnikov-agency-remove-image" id="remove_testimonial_image_' . $index . '" data-target="#testimonial_client_image_' . $index . '" data-preview="#testimonial_image_preview_' . $index . '" style="display:' . ($testimonial['image'] ? 'inline-block' : 'none') . ';">' . __('Remove Image', 'linnikov-agency') . '</button>';

      // Превью изображения клиента
      echo '<div id="testimonial_image_preview_' . $index . '" style="margin-top: 10px;">';
      if ($testimonial['image']) {
        echo '<img src="' . esc_url($testimonial['image']) . '" style="max-width: 200px;">';
      }
      echo '</div>';

      echo '<label>' . __('Testimonial Part 1', 'linnikov-agency') . '</label>';
      echo '<textarea name="testimonials[' . $index . '][part1]" rows="4" style="width:100%;">' . esc_textarea($testimonial['part1']) . '</textarea>';

      echo '<label>' . __('Testimonial Part 2', 'linnikov-agency') . '</label>';
      echo '<textarea name="testimonials[' . $index . '][part2]" rows="4" style="width:100%;">' . esc_textarea($testimonial['part2']) . '</textarea>';

      echo '<button type="button" class="button remove-testimonial-section red" style="margin-top: 10px;">' . __('Remove Testimonial', 'linnikov-agency') . '</button>';

      echo '</div>';
    }
  }

  echo '</div>';
  echo '<button type="button" class="button add-testimonial-section" style="margin-top: 10px;">' . __('Add New Testimonial', 'linnikov-agency') . '</button>';
  echo '</div>';
}

// Callback для метабокса Our Awards
function linnikov_agency_awards_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $awards = get_post_meta($post->ID, '_linnikov_agency_awards', true);

  // Убедимся, что $awards инициализирован как массив
  if (!is_array($awards)) {
    $awards = [];
  }

  // Nonce для защиты
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_awards_nonce');

  // Структура метабокса
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Our Awards', 'linnikov-agency') . '</h4>';
  echo '<ul id="awards-sections-container">';

  // Первый уникальный элемент
  echo '<li class="award-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';
  echo '<h5>' . __('Main Award', 'linnikov-agency') . '</h5>';

  // Проверяем, существует ли первый элемент массива
  $first_award = isset($awards[0]) ? $awards[0] : [];

  // Поле для загрузки файла
  echo '<label>' . __('File', 'linnikov-agency') . '</label>';
  echo '<input type="hidden" id="award_file" name="awards[0][file]" value="' . esc_attr(isset($first_award['file']) ? $first_award['file'] : '') . '">';
  echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#award_file" data-preview="#award_file_preview" data-remove-button="#remove_award_file">' . __('Upload File', 'linnikov-agency') . '</button>';
  echo '<button type="button" class="button linnikov-agency-remove-image" id="remove_award_file" data-target="#award_file" data-preview="#award_file_preview" style="display:' . (isset($first_award['file']) && $first_award['file'] ? 'inline-block' : 'none') . ';">' . __('Remove File', 'linnikov-agency') . '</button>';
  echo '<div id="award_file_preview" style="margin-top: 10px;">';
  if (isset($first_award['file']) && $first_award['file']) {
    echo '<img src="' . esc_url($first_award['file']) . '" style="max-width: 200px;">';
  }
  echo '</div>';

  // Текстовые поля для первого элемента
  echo '<label>' . __('Project Name', 'linnikov-agency') . '</label>';
  echo '<input type="text" name="awards[0][project_name]" value="' . esc_attr(isset($first_award['project_name']) ? $first_award['project_name'] : '') . '" style="width:100%;" />';

  echo '<label>' . __('Reviews', 'linnikov-agency') . '</label>';
  echo '<input type="text" name="awards[0][reviews]" value="' . esc_attr(isset($first_award['reviews']) ? $first_award['reviews'] : '') . '" style="width:100%;" />';

  echo '<label>' . __('Award Name', 'linnikov-agency') . '</label>';
  echo '<input type="text" name="awards[0][award_name]" value="' . esc_attr(isset($first_award['award_name']) ? $first_award['award_name'] : '') . '" style="width:100%;" />';

  echo '<label>' . __('Link', 'linnikov-agency') . '</label>';
  echo '<input type="text" name="awards[0][link]" value="' . esc_attr(isset($first_award['link']) ? $first_award['link'] : '') . '" style="width:100%;" />';

  echo '</li>';

  // Остальные элементы наград
  if (count($awards) > 1) {
    for ($index = 1; $index < count($awards); $index++) {
      $award = $awards[$index];

      echo '<li class="award-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';

      // Поле для загрузки изображения
      echo '<label>' . __('Award Image', 'linnikov-agency') . '</label>';
      echo '<input type="hidden" id="award_image_' . $index . '" name="awards[' . $index . '][image]" value="' . esc_attr(isset($award['image']) ? $award['image'] : '') . '">';
      echo '<button type="button" class="button linnikov-agency-upload-image" data-target="#award_image_' . $index . '" data-preview="#award_image_preview_' . $index . '" data-remove-button="#remove_award_image_' . $index . '">' . __('Upload Image', 'linnikov-agency') . '</button>';
      echo '<button type="button" class="button linnikov-agency-remove-image" id="remove_award_image_' . $index . '" data-target="#award_image_' . $index . '" data-preview="#award_image_preview_' . $index . '" style="display:' . (isset($award['image']) && $award['image'] ? 'inline-block' : 'none') . ';">' . __('Remove Image', 'linnikov-agency') . '</button>';

      echo '<div id="award_image_preview_' . $index . '" style="margin-top: 10px;">';
      if (isset($award['image']) && $award['image']) {
        echo '<img src="' . esc_url($award['image']) . '" style="max-width: 200px;">';
      }
      echo '</div>';

      // Остальные текстовые поля
      echo '<label>' . __('Award Year', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="awards[' . $index . '][year]" value="' . esc_attr(isset($award['year']) ? $award['year'] : '') . '" style="width:100%;" />';

      echo '<label>' . __('Award Name', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="awards[' . $index . '][award_name]" value="' . esc_attr(isset($award['award_name']) ? $award['award_name'] : '') . '" style="width:100%;" />';

      echo '<label>' . __('Project Name', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="awards[' . $index . '][project_name]" value="' . esc_attr(isset($award['project_name']) ? $award['project_name'] : '') . '" style="width:100%;" />';

      echo '<label>' . __('Award Description', 'linnikov-agency') . '</label>';
      echo '<textarea name="awards[' . $index . '][description]" rows="4" style="width:100%;">' . esc_textarea(isset($award['description']) ? $award['description'] : '') . '</textarea>';

      echo '<button type="button" class="button remove-award-section" style="margin-top: 10px;">' . __('Remove Award', 'linnikov-agency') . '</button>';

      echo '</li>';
    }
  }

  echo '</ul>';
  echo '<button type="button" class="button add-award-section" style="margin-top: 10px;">' . __('Add New Award', 'linnikov-agency') . '</button>';
  echo '</div>';
}

// Callback для метабокса Achieve Ambitions
function linnikov_agency_achieve_ambitions_meta_box_callback($post) {
  // Получаем сохраненные данные
  $ambitions = get_post_meta($post->ID, '_linnikov_agency_achieve_ambitions', true);

  // Nonce для безопасности
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_achieve_ambitions_nonce');

  // Начало HTML метабокса
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Achieve Ambitions', 'linnikov-agency') . '</h4>';
  echo '<ul id="achieve-ambitions-list" style="list-style: none; margin: 0; padding: 0;">';

  if (is_array($ambitions) && !empty($ambitions)) {
    foreach ($ambitions as $index => $ambition) {
      echo '<li style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;" data-index="' . esc_attr($index) . '">';

      // Поле для описания достижения
      echo '<label>' . __('Ambition Description', 'linnikov-agency') . '</label>';
      echo '<textarea name="achieve_ambitions[' . esc_attr($index) . '][description]" rows="4" style="width:100%;">' . esc_textarea($ambition['description']) . '</textarea>';

      echo '</li>';
    }
  }

  echo '</ul>';
  echo '<button type="button" class="button add-achieve-ambition" style="margin-top: 10px;">' . __('Add New Ambition', 'linnikov-agency') . '</button>';
  echo '</div>'; // Закрываем общий блок

  // Встраиваем скрипт для динамического добавления новых полей
  ?>
  <script>
      jQuery(document).ready(function ($) {
          // Функция для добавления новой секции Achieve Ambition с уникальным индексом
          function addAchieveAmbitionSection() {
              let index = Date.now(); // Используем временную метку для уникального индекса
              let newSection = `
            <li class="achieve-ambition-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;" data-index="` + index + `">
                <label><?php echo esc_html__('Ambition Description', 'linnikov-agency'); ?></label>
                <textarea name="achieve_ambitions[` + index + `][description]" rows="4" style="width:100%;"></textarea>
            </li>`;
              $('#achieve-ambitions-list').append(newSection);
          }

          // Обработка добавления новой секции
          $('.add-achieve-ambition').on('click', function () {
              addAchieveAmbitionSection();
          });
      });
  </script>
  <?php
}

// Универсальная функция для проверки безопасности перед сохранением
function linnikov_agency_check_nonce_and_permissions($post_id, $nonce_field_name, $nonce_action)
{
  // Проверка nonce
  if (!isset($_POST[$nonce_field_name]) || !wp_verify_nonce($_POST[$nonce_field_name], $nonce_action)) {
    return false; // Не сохраняем, если nonce не валиден
  }

  // Проверка, является ли это автосохранением
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return false; // Не сохраняем при автосохранении
  }

  // Проверка прав пользователя на редактирование поста
  if (!current_user_can('edit_post', $post_id)) {
    return false; // Не сохраняем, если нет прав
  }

  return true; // Всё в порядке
}

// Функция для сохранения метабокса Video Section
function linnikov_agency_save_video_meta_box($post_id)
{
  // Используем универсальную функцию для проверки
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_video_nonce', basename(__FILE__))) {
    return; // Прерываем, если проверка не пройдена
  }

  // Сохраняем URL видео
  if (isset($_POST['linnikov_agency_video_url'])) {
    update_post_meta($post_id, '_linnikov_agency_video_url', esc_url_raw($_POST['linnikov_agency_video_url']));
  }

  // Сохраняем URL постера
  if (isset($_POST['linnikov_agency_video_poster'])) {
    update_post_meta($post_id, '_linnikov_agency_video_poster', esc_url_raw($_POST['linnikov_agency_video_poster']));
  }
}

add_action('save_post', 'linnikov_agency_save_video_meta_box');

// Функция для сохранения метабокса Agency in Numbers
function linnikov_agency_save_numbers_meta_box($post_id)
{
  // Используем универсальную функцию для проверки
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_numbers_nonce', basename(__FILE__))) {
    return; // Прерываем, если проверка не пройдена
  }

  // Сохранение данных count-up sections, если они были переданы
  if (isset($_POST['count_up_sections']) && is_array($_POST['count_up_sections'])) {
    $clean_data = array();
    foreach ($_POST['count_up_sections'] as $index => $section) {
      $clean_data[$index]['plus'] = isset($section['plus']) ? 1 : 0;
      $clean_data[$index]['count'] = sanitize_text_field($section['count']);
      $clean_data[$index]['text'] = sanitize_text_field($section['text']);
    }
    update_post_meta($post_id, '_linnikov_agency_count_up_sections', $clean_data);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_count_up_sections');
  }
}

add_action('save_post', 'linnikov_agency_save_numbers_meta_box');

// Функция для сохранения данных метабокса Testimonials
function linnikov_agency_save_testimonials_meta_box($post_id)
{
  // Используем универсальную функцию для проверки безопасности
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_testimonials_nonce', basename(__FILE__))) {
    return; // Прерываем, если проверка не пройдена
  }

  // Сохранение данных testimonials, если они были переданы
  if (isset($_POST['testimonials']) && is_array($_POST['testimonials'])) {
    $clean_data = array();
    foreach ($_POST['testimonials'] as $index => $testimonial) {
      $clean_data[$index]['company'] = sanitize_text_field($testimonial['company']);
      $clean_data[$index]['client'] = sanitize_text_field($testimonial['client']);
      $clean_data[$index]['job'] = sanitize_text_field($testimonial['job']);
      $clean_data[$index]['image'] = esc_url_raw($testimonial['image']);
      $clean_data[$index]['part1'] = sanitize_textarea_field($testimonial['part1']);
      $clean_data[$index]['part2'] = sanitize_textarea_field($testimonial['part2']);
    }
    update_post_meta($post_id, '_linnikov_agency_testimonials', $clean_data);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_testimonials');
  }
}

add_action('save_post', 'linnikov_agency_save_testimonials_meta_box');

// Функция для сохранения метабокса Our Awards
function linnikov_agency_save_awards_meta_box($post_id)
{
  // Используем универсальную функцию для проверки безопасности
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_awards_nonce', basename(__FILE__))) {
    return; // Прерываем, если проверка не пройдена
  }

  // Сохранение данных awards, если они были переданы
  if (isset($_POST['awards']) && is_array($_POST['awards'])) {
    $clean_data = array();
    foreach ($_POST['awards'] as $index => $award) {
      $clean_data[$index]['file'] = isset($award['file']) ? esc_url_raw($award['file']) : '';
      $clean_data[$index]['project_name'] = sanitize_text_field($award['project_name']);
      $clean_data[$index]['reviews'] = sanitize_text_field($award['reviews']);
      $clean_data[$index]['award_name'] = sanitize_text_field($award['award_name']);
      $clean_data[$index]['link'] = esc_url_raw($award['link']);
      $clean_data[$index]['year'] = sanitize_text_field($award['year']);
      $clean_data[$index]['description'] = sanitize_textarea_field($award['description']);
      $clean_data[$index]['image'] = esc_url_raw($award['image']);
    }
    update_post_meta($post_id, '_linnikov_agency_awards', $clean_data);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_awards');
  }
}

add_action('save_post', 'linnikov_agency_save_awards_meta_box');

// Функция для сохранения метабокса Achieve Ambitions
function linnikov_agency_save_achieve_ambitions_meta_box($post_id) {
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_achieve_ambitions_nonce', basename(__FILE__))) {
    return; // Прерываем, если проверка не пройдена
  }

  // Сохранение данных
  if (isset($_POST['achieve_ambitions']) && is_array($_POST['achieve_ambitions'])) {
    $clean_data = array();
    foreach ($_POST['achieve_ambitions'] as $index => $ambition) {
      $clean_data[$index]['description'] = sanitize_textarea_field($ambition['description']);
    }
    update_post_meta($post_id, '_linnikov_agency_achieve_ambitions', $clean_data);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_achieve_ambitions');
  }
}
add_action('save_post', 'linnikov_agency_save_achieve_ambitions_meta_box');