<?php

// Универсальная функция для добавления метабоксов для страницы "Карьеры"
function linnikov_agency_add_meta_box_careers($id, $title, $callback)
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

// Добавляем метабоксы для страницы "Карьеры"
function linnikov_agency_register_careers_meta_boxes($post)
{
  global $post;

  // Проверяем, что это страница с шаблоном "Careers"
  if ($post && get_page_template_slug($post->ID) === 'templates/page-careers.php') {
    linnikov_agency_add_meta_box_careers(
      'linnikov_agency_careers_vacancies_meta_box',
      __('Select Vacancies', 'linnikov-agency'),
      'linnikov_agency_careers_vacancies_meta_box_callback'
    );
  }
}
add_action('add_meta_boxes', 'linnikov_agency_register_careers_meta_boxes');

// Колбэк-функция для вывода метабокса
// Колбэк-функция для вывода метабокса
function linnikov_agency_careers_vacancies_meta_box_callback($post) {
  // Получаем сохраненные данные
  $selected_vacancies = get_post_meta($post->ID, '_linnikov_agency_careers_vacancies', true);

  // Получаем все вакансии (посты типа 'vacancies')
  $vacancies_query = new WP_Query(array(
    'post_type' => 'vacancies',
    'posts_per_page' => -1,
    'post_status' => 'publish'
  ));

  // Открываем стилизованный контейнер
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  // Если вакансии есть, выводим их
  if ($vacancies_query->have_posts()) {
    echo '<ul>';
    while ($vacancies_query->have_posts()) {
      $vacancies_query->the_post();
      $vacancy_id = get_the_ID();
      $vacancy_title = get_the_title();

      // Проверяем, выбрана ли вакансия (сравниваем с сохраненными значениями)
      $checked = in_array($vacancy_id, (array) $selected_vacancies) ? 'checked="checked"' : '';
      echo '<li>';
      echo '<label>';
      echo '<input type="checkbox" name="linnikov_agency_careers_vacancies[]" value="' . esc_attr($vacancy_id) . '" ' . $checked . '>';
      echo esc_html($vacancy_title);
      echo '</label>';
      echo '</li>';
    }
    echo '</ul>';
  } else {
    echo '<p>' . __('No vacancies found.', 'linnikov-agency') . '</p>';
  }

  // Закрываем стилизованный контейнер
  echo '</div>';

  // Возвращаем состояние поста
  wp_reset_postdata();

  // Nonce для безопасности
  wp_nonce_field('linnikov_agency_save_careers_vacancies', 'linnikov_agency_careers_vacancies_nonce');
}

// Сохранение данных при сохранении страницы
function linnikov_agency_save_careers_vacancies($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_careers_vacancies_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_careers_vacancies_nonce'], 'linnikov_agency_save_careers_vacancies')) {
    return;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  // Сохраняем выбранные вакансии
  if (isset($_POST['linnikov_agency_careers_vacancies'])) {
    $selected_vacancies = array_map('intval', $_POST['linnikov_agency_careers_vacancies']);
    update_post_meta($post_id, '_linnikov_agency_careers_vacancies', $selected_vacancies);
  } else {
    // Если ни одной вакансии не выбрано, удаляем мета-данные
    delete_post_meta($post_id, '_linnikov_agency_careers_vacancies');
  }
}
add_action('save_post', 'linnikov_agency_save_careers_vacancies');