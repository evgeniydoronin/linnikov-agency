<?php

// Скрипты для админки
function linnikov_agency_enqueue_admin_scripts($hook)
{
  global $post_type;

  // Проверяем, что мы находимся на странице редактирования кастомного типа записи 'work'
  if ($hook == 'post.php' ||
      $hook == 'post-new.php' ||
      $post_type == 'work') {
    wp_enqueue_script('wp-i18n');
    // Подключаем скрипты медиабиблиотеки
    wp_enqueue_media();
    // Подключаем jQuery UI Sortable
    wp_enqueue_script('jquery-ui-sortable');

    wp_enqueue_script('linnikov-agency-admin-scripts', plugin_dir_url(__FILE__) . '../admin/js/admin-scripts.js', array('jquery'), null, true);
    wp_enqueue_style('linnikov-agency-admin-styles', plugin_dir_url(__FILE__) . '../admin/css/admin-styles.css');

  }
}

add_action('admin_enqueue_scripts', 'linnikov_agency_enqueue_admin_scripts');

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
  if (is_page_template('page-ideas.php')) {
    $page_template = locate_template('templates/page-ideas.php');
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

  // Разделение шаблонов на десктопные и мобильные версии
  // Проверка для страницы, использующей шаблон 'page-competencies.php'
  if (is_page_template('templates/page-competencies.php')) {
    // Проверяем, если WordPress функция существует, чтобы избежать ошибок.
    if (function_exists('wp_is_mobile')) {
      // Проверяем, является ли устройство мобильным
      if (wp_is_mobile()) {
        // Если мобильное устройство, подключаем шаблон мобильной версии
        $mobile_template = locate_template('templates/competencies/competencies-mobile.php');
        if ($mobile_template) {
          return $mobile_template;
        }
      } else {
        // Если не мобильное устройство, подключаем шаблон десктопной версии
        $desktop_template = locate_template('templates/competencies/competencies-desktop.php');
        if ($desktop_template) {
          return $desktop_template;
        }
      }
    }
  }

  return $template; // Возвращаем стандартный шаблон, если условия не выполняются
}

add_filter('template_include', 'linnikov_agency_work_template');

//	•	Отключает автоматическое добавление и удаление <p> и <br>.
//	•	Убирает ограничения на элементы и атрибуты HTML.
//	•	Убирает принудительное добавление блоков (например, параграфов).
function custom_tiny_mce_options($initArray)
{
  // Отключаем удаление пустых параграфов
  $initArray['wpautop'] = false;
  $initArray['remove_redundant_brs'] = false;

  // Отключаем удаление невалидных элементов
  $initArray['valid_elements'] = '*[*]';

  // Отключаем принудительное удаление p и br
  $initArray['forced_root_block'] = false;

  return $initArray;
}

add_filter('tiny_mce_before_init', 'custom_tiny_mce_options');

// SVG
function linnikov_agency_mime_types($mimes)
{
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}

add_filter('upload_mimes', 'linnikov_agency_mime_types');

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

/// /////////////////////////////////////////
/// Навигация
/// /////////////////////////////////////////
///
// Навигация из основного пункта ABOUT
function linnikov_agency_register_menus()
{
  register_nav_menus(array(
    'about-menu' => __('About Menu', 'linnikov-agency'),
    // Добавьте другие меню здесь
    // 'another-menu' => __('Another Menu', 'linnikov-agency'),
  ));
}

add_action('init', 'linnikov_agency_register_menus');

class Custom_Nav_Walker extends Walker_Nav_Menu
{
  // Начало элемента меню
  function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
  {
    // Логирование информации о $item
    // error_log(print_r($item, true)); // Отладка объекта $item

    $classes = empty($item->classes) ? array() : (array)$item->classes;

    // Добавляем класс '_active' если пункт активен
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
      // Только для секции ideas-page-menu
      // Добавляем класс '_active' если пункт активен
      if (in_array('current-menu-item', $classes) || in_array('current_page_item', $classes) || !empty($item->current)) {
        $classes[] = '_active';
      }

      $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
      $class_names = $class_names ? ' class="text-btn ' . esc_attr($class_names) . '"' : ' class="text-btn"';

      $output .= '<a href="' . esc_url($item->url) . '"' . $class_names . ' data-component="animated-link">';
      $output .= '<svg id="page-nav__lightning_' . $item->ID . '" class="animated-cubic-lightning text-btn__lightning" viewBox="0 -1 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">';
      $output .= '<g class="animated-cubic-lightning__body" clip-path="url(#page-nav__lightning_' . $item->ID . '-clip)" transform="rotate(30 6.8 30) translate(-3)">';
      $output .= '<rect class="animated-cubic-lightning__top" x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>';
      $output .= '<rect class="animated-cubic-lightning__bottom" x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>';
      $output .= '<rect class="animated-cubic-lightning__top" x="0" y="40" width="3.4" height="20" fill="var(--color, currentColor)"/>';
      $output .= '<rect class="animated-cubic-lightning__bottom" x="3.4" y="50" width="3.4" height="10" fill="var(--color, currentColor)"/>';
      $output .= '</g>';
      $output .= '<defs>';
      $output .= '<clipPath id="page-nav__lightning_' . $item->ID . '-clip">';
      $output .= '<rect x="0" y="0" width="3.4" height="20" fill="var(--color, currentColor)"/>';
      $output .= '<rect x="3.4" y="20" width="3.4" height="10" fill="var(--color, currentColor)"/>';
      $output .= '</clipPath>';
      $output .= '</defs>';
      $output .= '</svg>';
      $output .= '<div class="text-btn__cap">' . apply_filters('the_title', $item->title, $item->ID) . '</div>';
      $output .= '</a>';
    }
  }

  // Закрытие элемента меню (не используется)
  function end_el(&$output, $item, $depth = 0, $args = null)
  {
    $output .= '';
  }

  // Начало уровня меню (не используется)
  function start_lvl(&$output, $depth = 0, $args = null)
  {
    $output .= '';
  }

  // Закрытие уровня меню (не используется)
  function end_lvl(&$output, $depth = 0, $args = null)
  {
    $output .= '';
  }
}

// Функция для сохранения нового порядка работ
function linnikov_agency_save_work_order($order)
{
  if (!current_user_can('manage_options')) {
    return;
  }

  // Проверка nonce для безопасности
  if (!isset($_POST['_wpnonce_linnikov_agency_save_work_order']) || !wp_verify_nonce($_POST['_wpnonce_linnikov_agency_save_work_order'], 'linnikov_agency_save_work_order_nonce')) {
    wp_die(__('Nonce verification failed. Please try again.', 'linnikov-agency'));
  }

  // Обрабатываем данные и обновляем порядок
  $order = explode(',', $order);
  $work_order = array(); // Массив для сохранения порядка

  foreach ($order as $index => $item_id) {
    $item_id = (int)str_replace('item-', '', $item_id);
    wp_update_post(array(
      'ID' => $item_id,
      'menu_order' => $index
    ));
    $work_order[] = $item_id; // Сохраняем ID в массиве порядка
  }

  // Сохраняем новый порядок в опцию
  update_option('linnikov_agency_work_order', implode(',', $work_order));
}




