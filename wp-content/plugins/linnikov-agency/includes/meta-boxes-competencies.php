<?php

// Универсальная функция для добавления метабоксов
function linnikov_agency_add_meta_box_competencies($id, $title, $callback)
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

// Добавляем метабоксы для секций только на странице "Competencies"
function linnikov_agency_register_meta_boxes_competencies($post)
{
  global $post; // Получаем глобальный объект поста

  // Проверяем, что это страница с шаблоном "About Us"
  if ($post && get_page_template_slug($post->ID) === 'templates/page-competencies.php') {
    // Добавление метабокса для сетки категорий
    linnikov_agency_add_meta_box(
      'linnikov_agency_categories_grid_meta_box',
      __('Categories Grid', 'linnikov-agency'),
      'linnikov_agency_categories_grid_meta_box_callback'
    );

    linnikov_agency_add_meta_box(
      'linnikov_agency_competencies_tools_meta_box',
      __('Competencies Tools', 'linnikov-agency'),
      'linnikov_agency_competencies_tools_meta_box_callback'
    );

    linnikov_agency_add_meta_box(
      'linnikov_agency_faq_meta_box',
      __('FAQ Section', 'linnikov-agency'),
      'linnikov_agency_faq_meta_box_callback'
    );
  }
}

add_action('add_meta_boxes', 'linnikov_agency_register_meta_boxes_competencies');

// Callback для метабокса Categories Grid
function linnikov_agency_categories_grid_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $categories_grid = get_post_meta($post->ID, '_linnikov_agency_categories_grid', true);

  // Nonce для безопасности
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_categories_grid_nonce');

  // HTML для отображения сетки с 8 категориями
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<div id="categories-grid-container">';

  // Генерируем 8 полей
  for ($i = 0; $i < 8; $i++) {
    $title = isset($categories_grid[$i]['title']) ? esc_attr($categories_grid[$i]['title']) : '';
    $title2 = isset($categories_grid[$i]['title2']) ? esc_attr($categories_grid[$i]['title2']) : '';
    $description = isset($categories_grid[$i]['description']) ? esc_textarea($categories_grid[$i]['description']) : '';

    echo '<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';
    echo '<label>' . __('Title', 'linnikov-agency') . '</label>';
    echo '<input type="text" name="categories_grid[' . $i . '][title]" value="' . $title . '" style="width:100%;" />';

    echo '<label style="display:block; margin-top:5px;">' . __('Title 2', 'linnikov-agency') . '</label>';
    echo '<input type="text" name="categories_grid[' . $i . '][title2]" value="' . $title2 . '" style="width:100%;" />';

    echo '<label style="display:block; margin-top:5px;">' . __('Description', 'linnikov-agency') . '</label>';
    echo '<textarea name="categories_grid[' . $i . '][description]" rows="4" style="width:100%;">' . $description . '</textarea>';
    echo '</div>';
  }

  echo '</div>'; // Закрываем общий блок
  echo '</div>'; // Закрываем основной блок
}

// Сохранение данных для метабокса Categories Grid
function linnikov_agency_save_categories_grid_meta_box($post_id)
{
  // Проверка nonce и прав
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_categories_grid_nonce', basename(__FILE__))) {
    return $post_id;
  }

  // Сохранение данных
  if (isset($_POST['categories_grid']) && is_array($_POST['categories_grid'])) {
    $clean_data = array();
    foreach ($_POST['categories_grid'] as $index => $category) {
      $clean_data[$index]['title'] = sanitize_text_field($category['title']);
      $clean_data[$index]['title2'] = sanitize_text_field($category['title2']);
      $clean_data[$index]['description'] = sanitize_textarea_field($category['description']);
    }

    update_post_meta($post_id, '_linnikov_agency_categories_grid', $clean_data);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_categories_grid');
  }
}

add_action('save_post', 'linnikov_agency_save_categories_grid_meta_box');

// Callback для метабокса Competencies Tools
function linnikov_agency_competencies_tools_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $competencies_tools = get_post_meta($post->ID, '_linnikov_agency_competencies_tools', true);

  // Nonce для безопасности
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_competencies_tools_nonce');

  // HTML для отображения списка из трех пунктов
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<div id="competencies-tools-container">';

  // Генерируем 3 поля для списка
  for ($i = 0; $i < 3; $i++) {
    $title = isset($competencies_tools[$i]['title']) ? esc_attr($competencies_tools[$i]['title']) : '';
    $description = isset($competencies_tools[$i]['description']) ? esc_textarea($competencies_tools[$i]['description']) : '';
    $link = isset($competencies_tools[$i]['link']) ? esc_attr($competencies_tools[$i]['link']) : '';

    echo '<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';

    // Поле для заголовка
    echo '<label>' . __('Title', 'linnikov-agency') . '</label>';
    echo '<input type="text" name="competencies_tools[' . $i . '][title]" value="' . $title . '" style="width:100%;" />';

    // Поле для описания
    echo '<label style="display:block; margin-top:5px;">' . __('Description', 'linnikov-agency') . '</label>';
    echo '<textarea name="competencies_tools[' . $i . '][description]" rows="4" style="width:100%;">' . $description . '</textarea>';

    // Поле для ссылки
    echo '<label style="display:block; margin-top:5px;">' . __('Link', 'linnikov-agency') . '</label>';
    echo '<input type="text" name="competencies_tools[' . $i . '][link]" value="' . $link . '" style="width:100%;" />';

    echo '</div>';
  }

  echo '</div>'; // Закрываем общий блок
  echo '</div>'; // Закрываем основной блок
}

// Сохранение данных для метабокса Competencies Tools
function linnikov_agency_save_competencies_tools_meta_box($post_id)
{
  // Проверка nonce и прав
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_competencies_tools_nonce', basename(__FILE__))) {
    return $post_id;
  }

  // Сохранение данных
  if (isset($_POST['competencies_tools']) && is_array($_POST['competencies_tools'])) {
    $clean_data = array();
    foreach ($_POST['competencies_tools'] as $index => $tool) {
      $clean_data[$index]['title'] = sanitize_text_field($tool['title']);
      $clean_data[$index]['description'] = sanitize_textarea_field($tool['description']);
      $clean_data[$index]['link'] = esc_url_raw($tool['link']);
    }

    update_post_meta($post_id, '_linnikov_agency_competencies_tools', $clean_data);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_competencies_tools');
  }
}

add_action('save_post', 'linnikov_agency_save_competencies_tools_meta_box');

// Callback для метабокса FAQ Section
function linnikov_agency_faq_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $faq_section = get_post_meta($post->ID, '_linnikov_agency_faq_section', true);

  // Nonce для безопасности
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_faq_nonce');

  // HTML для отображения списка из 5 вопросов
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<div id="faq-section-container">';

  // Генерируем 5 вопросов
  for ($i = 0; $i < 5; $i++) {
    $title = isset($faq_section[$i]['title']) ? esc_attr($faq_section[$i]['title']) : '';
    $subtitle = isset($faq_section[$i]['subtitle']) ? esc_attr($faq_section[$i]['subtitle']) : '';
    $answers = isset($faq_section[$i]['answers']) ? $faq_section[$i]['answers'] : array('');

    echo '<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';

    // Поле для вопроса (заголовок)
    echo '<label>' . __('Question', 'linnikov-agency') . '</label>';
    echo '<input type="text" name="faq_section[' . $i . '][title]" value="' . $title . '" style="width:100%;" />';

    // Поле для деталей вопроса (подзаголовок)
    echo '<label style="display:block; margin-top:5px;">' . __('Question Detail', 'linnikov-agency') . '</label>';
    echo '<input type="text" name="faq_section[' . $i . '][subtitle]" value="' . $subtitle . '" style="width:100%;" />';

    // Список для ответов
    echo '<label style="display:block; margin-top:10px;">' . __('Answers', 'linnikov-agency') . '</label>';
    echo '<div class="answers-list" id="faq-answers-list-' . $i . '">';

    // Отображаем уже существующие ответы
    foreach ($answers as $index => $answer) {
      echo '<div style="margin-bottom: 10px;">';
      echo '<input type="text" name="faq_section[' . $i . '][answers][]" value="' . esc_attr($answer) . '" style="width:90%;" />';
      echo '<button type="button" class="button remove-answer" style="margin-left: 10px;">' . __('Remove', 'linnikov-agency') . '</button>';
      echo '</div>';
    }

    // Кнопка для добавления нового ответа
    echo '</div>'; // Закрываем answers-list
    echo '<button type="button" class="button add-answer" data-index="' . $i . '" style="margin-top: 10px;">' . __('Add Answer', 'linnikov-agency') . '</button>';
    echo '</div>'; // Закрываем блок вопроса
  }

  echo '</div>'; // Закрываем основной контейнер
  echo '</div>'; // Закрываем общий блок
  ?>
  <script>
      jQuery(document).ready(function ($) {
          // Добавление нового ответа
          $('.add-answer').click(function () {
              var index = $(this).data('index');
              var container = $('#faq-answers-list-' + index);
              var newAnswer = `
            <div style="margin-bottom: 10px;">
                <input type="text" name="faq_section[` + index + `][answers][]" style="width:90%;" />
                <button type="button" class="button remove-answer" style="margin-left: 10px;">Remove</button>
            </div>
        `;
              container.append(newAnswer);
          });

          // Удаление ответа
          $(document).on('click', '.remove-answer', function () {
              $(this).closest('div').remove();
          });
      });
  </script>
  <?php
}

// Сохранение данных для метабокса FAQ Section
function linnikov_agency_save_faq_meta_box($post_id)
{
  // Проверка nonce и прав
  if (!linnikov_agency_check_nonce_and_permissions($post_id, 'linnikov_agency_faq_nonce', basename(__FILE__))) {
    return $post_id;
  }

  // Сохранение данных
  if (isset($_POST['faq_section']) && is_array($_POST['faq_section'])) {
    $clean_data = array();
    foreach ($_POST['faq_section'] as $index => $faq_item) {
      $clean_data[$index]['title'] = sanitize_text_field($faq_item['title']);
      $clean_data[$index]['subtitle'] = sanitize_text_field($faq_item['subtitle']);
      $clean_data[$index]['answers'] = array_map('sanitize_text_field', $faq_item['answers']);
    }

    update_post_meta($post_id, '_linnikov_agency_faq_section', $clean_data);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_faq_section');
  }
}

add_action('save_post', 'linnikov_agency_save_faq_meta_box');