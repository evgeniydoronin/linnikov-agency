<?php
// Register the main theme settings menu and its pages in the admin menu
function linnikov_agency_register_theme_settings_page()
{
  // Main Theme Settings section (top-level menu item)
  add_menu_page(
    __('Theme Settings', 'linnikov-agency'),  // Page title
    __('Theme Settings', 'linnikov-agency'),  // Menu title
    'manage_options',  // Capability required
    'theme-settings',  // Menu slug
    'linnikov_agency_render_social_media_settings_page',  // No function to render content
    'dashicons-admin-generic',  // Menu icon
    30  // Menu position
  );


  // Adding Work Archive Settings
  add_submenu_page(
    'theme-settings',  // Parent slug
    __('Work Archive Settings', 'linnikov-agency'),  // Page title
    __('Work Archive Settings', 'linnikov-agency'),  // Menu title
    'manage_options',  // Capability required
    'work-archive-settings',  // Submenu slug
    'linnikov_agency_render_work_archive_settings_page'  // Function to render the submenu page
  );

  // Adding Ideas Filter Settings
  add_submenu_page(
    'theme-settings',  // Parent slug
    __('Ideas Filter Settings', 'linnikov-agency'),  // Page title
    __('Ideas Filter Settings', 'linnikov-agency'),  // Menu title
    'manage_options',  // Capability required
    'ideas-filter-settings',  // Submenu slug
    'linnikov_agency_render_ideas_filter_settings_page'  // Function to render the submenu page
  );

  // Adding Main Page Settings
  add_submenu_page(
    'theme-settings',  // Parent slug
    __('Main Page Settings', 'linnikov-agency'),  // Page title
    __('Main Page Settings', 'linnikov-agency'),  // Menu title
    'manage_options',  // Capability required
    'main-page-settings',  // Submenu slug
    'linnikov_agency_render_main_page_settings_page'  // Function to render the submenu page
  );
}

add_action('admin_menu', 'linnikov_agency_register_theme_settings_page');

// Function to render the main "Theme Settings" page
function linnikov_agency_render_theme_settings_page()
{
  if (!current_user_can('manage_options')) {
    return;
  }

  echo '<div class="wrap">';
  echo '<h1>' . __('Theme Settings', 'linnikov-agency') . '</h1>';

  // Include the HTML template from partials
  include plugin_dir_path(__FILE__) . 'partials/theme-settings-page.php';  // Ensure this file exists

  echo '</div>';
}

// Function to render the "Social Media Settings" page
function linnikov_agency_render_social_media_settings_page()
{
  if (!current_user_can('manage_options')) {
    return;
  }

  echo '<div class="wrap">';
  echo '<h1>' . __('General Theme Settings', 'linnikov-agency') . '</h1>';

  // Include the HTML template from partials
  include plugin_dir_path(__FILE__) . 'partials/social-media-settings-page.php';

  echo '</div>';
}

// Function to render the "Work Archive Settings" page
function linnikov_agency_render_work_archive_settings_page()
{
  if (!current_user_can('manage_options')) {
    return;
  }

  echo '<div class="wrap">';

  // Include the HTML template from partials
  include plugin_dir_path(__FILE__) . 'partials/settings-page.php';  // Ensure this file exists

  echo '</div>';
}

// Function to render the "Ideas Filter Settings" page
function linnikov_agency_render_ideas_filter_settings_page()
{
  if (!current_user_can('manage_options')) {
    return;
  }

  echo '<div class="wrap">';

  // Include the HTML template from partials
  include plugin_dir_path(__FILE__) . 'partials/ideas-filter-settings-page.php';  // Ensure this file exists

  echo '</div>';
}

// Function to render the "Main Page Settings" page
function linnikov_agency_render_main_page_settings_page()
{
  if (!current_user_can('manage_options')) {
    return;
  }

  // Сохранение порядка постов для основного контейнера
  if (isset($_POST['main_page_order'])) {
    update_option('_linnikov_agency_main_page_work_order', sanitize_text_field($_POST['main_page_order']));
    echo '<div class="updated"><p>' . __('Main page order saved.', 'linnikov-agency') . '</p></div>';
  }

  // Сохранение порядка постов для второго контейнера
  if (isset($_POST['secondary_order'])) {
    update_option('_linnikov_agency_secondary_work_order', sanitize_text_field($_POST['secondary_order']));
    echo '<div class="updated"><p>' . __('Secondary work order saved.', 'linnikov-agency') . '</p></div>';
  }

  // Получаем текущий порядок постов для главной страницы
  $main_page_order = get_option('_linnikov_agency_main_page_work_order', '');

  // Получаем текущий порядок постов для второго контейнера
  $secondary_order = get_option('_linnikov_agency_secondary_work_order', '');

  // Получаем список всех постов
  $args = array(
    'post_type' => 'work',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    'orderby' => 'menu_order',
    'order' => 'ASC',
  );
  $query = new WP_Query($args);

  // Подключаем HTML шаблон
  include plugin_dir_path(__FILE__) . 'partials/main-settings-page.php';
}
