<?php
// Register Custom Post Type Works
function linnikov_agency_create_post_type() {
  $labels = array(
    'name' => __('Works', 'linnikov-agency'),
    'singular_name' => __('Work', 'linnikov-agency'),
    // Other labels...
  );

  $args = array(
    'labels' => $labels,
    'public' => true,
    'has_archive' => true,
    'supports' => array('title', 'editor', 'thumbnail'),
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'works'),
  );

  register_post_type('work', $args);
}
add_action('init', 'linnikov_agency_create_post_type');

// Регистрация таксономии 'tags' для типа записи 'work'
function linnikov_agency_create_work_tags_taxonomy() {
  $labels = array(
    'name' => __('Tags', 'linnikov-agency'),
    'singular_name' => __('Tag', 'linnikov-agency'),
    'search_items' => __('Search Tags', 'linnikov-agency'),
    'all_items' => __('All Tags', 'linnikov-agency'),
    'edit_item' => __('Edit Tag', 'linnikov-agency'),
    'update_item' => __('Update Tag', 'linnikov-agency'),
    'add_new_item' => __('Add New Tag', 'linnikov-agency'),
    'new_item_name' => __('New Tag Name', 'linnikov-agency'),
    'menu_name' => __('Tags', 'linnikov-agency'),
  );

  $args = array(
    'hierarchical' => true, // Устанавливаем в true для использования чекбоксов
    'labels' => $labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array('slug' => 'work-tag'),
  );

  register_taxonomy('work_tag', 'work', $args);
}
add_action('init', 'linnikov_agency_create_work_tags_taxonomy');