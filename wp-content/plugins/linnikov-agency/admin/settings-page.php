<?php
function linnikov_agency_register_settings_page() {
  add_menu_page(
    __('Work Archive Settings', 'linnikov-agency'),
    __('Work Archive', 'linnikov-agency'),
    'manage_options',
    'work-archive-settings',
    'linnikov_agency_render_settings_page',
    'dashicons-admin-generic',
    20
  );
}
add_action('admin_menu', 'linnikov_agency_register_settings_page');

function linnikov_agency_render_settings_page() {
  if (!current_user_can('manage_options')) {
    return;
  }

  // Подключаем HTML шаблон из partials
  include plugin_dir_path(__FILE__) . 'partials/settings-page.php';
}

function linnikov_agency_enqueue_admin_assets($hook) {
  if ($hook !== 'toplevel_page_work-archive-settings') {
    return;
  }

  // Подключаем стили и скрипты
  wp_enqueue_style('linnikov-admin-styles', plugin_dir_url(__FILE__) . 'css/admin-styles.css');
  wp_enqueue_script('linnikov-admin-scripts', plugin_dir_url(__FILE__) . 'js/admin-scripts.js', array('jquery', 'jquery-ui-sortable'), null, true);
}
add_action('admin_enqueue_scripts', 'linnikov_agency_enqueue_admin_assets');