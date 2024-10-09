<?php

// Скрипты для админки
function linnikov_agency_enqueue_admin_scripts($hook)
{
  global $post_type;

  wp_enqueue_script('wp-i18n');
  // Подключаем скрипты медиабиблиотеки
  wp_enqueue_media();
  // Подключаем jQuery UI Sortable
  wp_enqueue_script('jquery-ui-sortable');

  // Подключаем основной файл скриптов для админки
  wp_enqueue_script('linnikov-agency-admin-scripts', plugin_dir_url(__FILE__) . '../admin/js/admin-scripts.js', array('jquery', 'jquery-ui-sortable'), null, true);

  // Подключаем стили для админки
  wp_enqueue_style('linnikov-agency-admin-styles', plugin_dir_url(__FILE__) . '../admin/css/admin-styles.css');
}

add_action('admin_enqueue_scripts', 'linnikov_agency_enqueue_admin_scripts');

// Фильтрация шаблонов по типу страницы
function linnikov_agency_work_template($template)
{
  // Проверка для кастомного типа записи 'work'
  if (is_singular('work')) {
    $custom_template = locate_template('templates/single-work.php');
    if ($custom_template) {
      return $custom_template;
    }
  }

  // Проверка для страницы, использующей шаблон 'page-ideas.php'
  if (is_post_type_archive('ideas')) {
    $page_template = locate_template('templates/archive-ideas.php');
    if ($page_template) {
      return $page_template;
    }
  }

  // Проверка для типа записи 'post'
  if (is_singular('news')) {
    $custom_template = locate_template('templates/single-news.php');
    if ($custom_template) {
      return $custom_template;
    }
  }

  // Проверка для архива пользовательского типа записи 'work'
  if (is_post_type_archive('work')) {
    $archive_template = locate_template('templates/archive-work.php');
    if ($archive_template) {
      return $archive_template;
    }
  }

  // Проверка для архива пользовательского типа записи 'news'
  if (is_post_type_archive('news')) {
    $archive_template = locate_template('templates/archive-news.php');
    if ($archive_template) {
      return $archive_template;
    }
  }

  // Проверка для страницы, использующей шаблон 'page-about-us.php'
  if (is_page_template('page-about-us.php')) {
    $page_template = locate_template('templates/page-about-us.php');
    if ($page_template) {
      return $page_template;
    }
  }

  // Проверка для страницы с десктопной и мобильной версией шаблона
  if (is_page_template('templates/page-competencies.php')) {
    if (function_exists('wp_is_mobile')) {
      if (wp_is_mobile()) {
        $mobile_template = locate_template('templates/competencies/competencies-mobile.php');
        if ($mobile_template) {
          return $mobile_template;
        }
      } else {
        $desktop_template = locate_template('templates/competencies/competencies-desktop.php');
        if ($desktop_template) {
          return $desktop_template;
        }
      }
    }
  }

  // Проверка для кастомного типа записи 'vacancies'
  if (is_singular('vacancies')) {
    $custom_template = locate_template('templates/single-vacancies.php');
    if ($custom_template) {
      return $custom_template;
    }
  }

  return $template; // Возвращаем стандартный шаблон, если условия не выполняются
}

add_filter('template_include', 'linnikov_agency_work_template');

// Отключаем автоматическое добавление <p> и <br>
function custom_tiny_mce_options($initArray)
{
  $initArray['wpautop'] = false;
  $initArray['remove_redundant_brs'] = false;
  $initArray['valid_elements'] = '*[*]';
  $initArray['forced_root_block'] = false;

  return $initArray;
}

add_filter('tiny_mce_before_init', 'custom_tiny_mce_options');

// Разрешение загрузки SVG
function linnikov_agency_mime_types($mimes)
{
  $mimes['svg'] = 'image/svg+xml';
  // Разрешаем загрузку AVIF файлов
  $mimes['avif'] = 'image/avif';
  return $mimes;
}

add_filter('upload_mimes', 'linnikov_agency_mime_types');

// Правка стилей SVG в админке
function linnikov_agency_fix_svg()
{
  echo '<style>
        .attachment-266x266, .thumbnail img {
            width: 100% !important;
            height: auto !important;
        }
    </style>';
}

add_action('admin_head', 'linnikov_agency_fix_svg');

// Коррекция MIME-типа SVG
function linnikov_agency_svg_mime_type($data, $file, $filename, $mimes)
{
  $ext = pathinfo($filename, PATHINFO_EXTENSION);
  if ($ext === 'svg') {
    $data['ext'] = 'svg';
    $data['type'] = 'image/svg+xml';
  }
  return $data;
}

add_filter('wp_check_filetype_and_ext', 'linnikov_agency_svg_mime_type', 10, 4);

// Кастомный вывод меню для страницы "Ideas"
class Custom_Nav_Walker extends Walker_Nav_Menu
{
  function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
  {
    $classes = empty($item->classes) ? array() : (array)$item->classes;

    // Добавляем класс '_active' для активного пункта меню
    if ($item->current || $item->current_item_ancestor || $item->current_item_parent) {
      $classes[] = '_active';
    }

    $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
    $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';

    if ($args->menu_class === 'desktop-menu') {
      $output .= '<a href="' . esc_url($item->url) . '" class="header-link text-btn header-link_sub-menu" data-component="animated-link"' . $class_names . '>';
      $output .= '<div class="text-btn__cap">' . apply_filters('the_title', $item->title, $item->ID) . '</div>';
      $output .= '</a>';
    } else if ($args->menu_class === 'mobile-menu') {
      $output .= '<a href="' . esc_url($item->url) . '" class="reveal-wrap header-link header-link_sub-menu"' . $class_names . '>';
      $output .= '<div class="reveal-wrap__inner">';
      $output .= '<div class="line">' . apply_filters('the_title', $item->title, $item->ID) . '</div>';
      $output .= '</div>';
      $output .= '</a>';
    } else if ($args->menu_class === 'ideas-page-menu') {
      // Создаем уникальные ID для SVG-элементов
      $lightning_id = 'page-nav__lightning_' . $item->ID;

      // Генерируем HTML для активного и неактивного пункта меню в ideas-page-menu
      $output .= '<a href="' . esc_url($item->url) . '" class="text-btn' . ($item->current ? ' _active' : '') . '" data-component="animated-link"' . $class_names . '>';
      $output .= '<svg id="' . $lightning_id . '" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">';
      $output .= '<g class="animated-cubic-lightning__body" clip-path="url(#' . $lightning_id . '-clip)" transform="rotate(30 6.8 30) translate(-3)">';
      $output .= '<rect class="animated-cubic-lightning__top" x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>';
      $output .= '<rect class="animated-cubic-lightning__bottom" x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>';
      $output .= '<rect class="animated-cubic-lightning__top" x="0" y="40" width="3.4" height="20" fill="var(--color, currentColor)"/>';
      $output .= '<rect class="animated-cubic-lightning__bottom" x="3.4" y="50" width="3.4" height="10" fill="var(--color, currentColor)"/>';
      $output .= '</g>';
      $output .= '<defs>';
      $output .= '<clipPath id="' . $lightning_id . '-clip">';
      $output .= '<rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>';
      $output .= '<rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>';
      $output .= '</clipPath>';
      $output .= '</defs>';
      $output .= '</svg>';
      $output .= '<div class="text-btn__cap">' . apply_filters('the_title', $item->title, $item->ID) . '</div>';
      $output .= '</a>';
    }
  }
}

// Функция для сохранения порядка работ на странице Работ
function linnikov_agency_save_work_order($order)
{
  if (!current_user_can('manage_options')) {
    return;
  }

  // Проверка nonce для безопасности
  if (!isset($_POST['_wpnonce_linnikov_agency_save_work_order']) || !wp_verify_nonce($_POST['_wpnonce_linnikov_agency_save_work_order'], 'linnikov_agency_save_work_order_nonce')) {
    wp_die(__('Nonce verification failed. Please try again.', 'linnikov-agency'));
  }

  // Обновляем порядок
  $order = explode(',', $order);
  $work_order = array(); // Массив для сохранения нового порядка

  foreach ($order as $index => $item_id) {
    $item_id = (int)str_replace('item-', '', $item_id);
    wp_update_post(array(
      'ID' => $item_id,
      'menu_order' => $index
    ));
    $work_order[] = $item_id; // Сохраняем ID в массиве
  }

  // Сохраняем порядок в опцию
  update_option('linnikov_agency_work_order', implode(',', $work_order));
}

// Функция для сохранения порядка тегов на странице Идей
function linnikov_agency_save_ideas_tags_order($order)
{
  // Проверка nonce для безопасности
  if (!isset($_POST['_wpnonce_linnikov_agency_save_ideas_tags_order']) || !wp_verify_nonce($_POST['_wpnonce_linnikov_agency_save_ideas_tags_order'], 'linnikov_agency_save_ideas_tags_order_nonce')) {
    return;
  }

  // Проверка, что передан порядок тегов
  if (empty($order)) {
    error_log('Order is empty');
    return;
  }

  // Преобразуем строку в массив
  $tag_ids = explode(',', $order);

  // Сохраняем порядок тегов
  foreach ($tag_ids as $index => $tag_id) {
    $term_id = (int)str_replace('tag-', '', $tag_id);

    if ($term_id > 0) {
      // Сохраняем порядок в метаполе для каждого тега
      update_term_meta($term_id, 'ideas_tag_order', $index);
      error_log('Order saved for tag ' . $term_id . ': ' . $index);  // Для отладки
    } else {
      error_log('Invalid tag ID: ' . $tag_id);
    }
  }
}

// Опускаем стандартный пункт меню "Комментарии"
function linnikov_move_comments_menu()
{
  // Убираем стандартный пункт меню "Комментарии"
  remove_menu_page('edit-comments.php');

  // Добавляем пункт меню "Комментарии" ниже с новым приоритетом (например, 60)
  add_menu_page(
    __('Comments'),       // Название страницы
    __('Comments'),       // Название пункта меню
    'manage_options',     // Права доступа
    'edit-comments.php',  // Ссылка на пункт меню
    '',                   // Функция рендера (пуста, так как рендер выполняется самим WordPress)
    'dashicons-admin-comments', // Иконка "Комментарии"
    60                    // Позиция в меню
  );
}

add_action('admin_menu', 'linnikov_move_comments_menu');


function linnikov_agency_allow_custom_html($allowed_tags) {
  // Добавляем разрешенные теги и атрибуты
  $allowed_tags['span'] = array(
    'itemprop' => true, // Разрешаем атрибут itemprop
    'class' => true,    // Разрешаем атрибут class
  );
  $allowed_tags['br'] = array(); // Разрешаем тег <br> без атрибутов

  return $allowed_tags;
}
add_filter('wp_kses_allowed_html', 'linnikov_agency_allow_custom_html', 10, 1);

