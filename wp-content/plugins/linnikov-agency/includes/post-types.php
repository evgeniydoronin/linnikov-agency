<?php
// Register Custom Post Type Works and News
function linnikov_agency_create_post_types() {
  // Labels for Work post type
  $work_labels = array(
    'name' => __('Works', 'linnikov-agency'),
    'singular_name' => __('Work', 'linnikov-agency'),
    'menu_name' => __('Works', 'linnikov-agency'),
    'name_admin_bar' => __('Work', 'linnikov-agency'),
    'add_new' => __('Add New', 'linnikov-agency'),
    'add_new_item' => __('Add New Work', 'linnikov-agency'),
    'new_item' => __('New Work', 'linnikov-agency'),
    'edit_item' => __('Edit Work', 'linnikov-agency'),
    'view_item' => __('View Work', 'linnikov-agency'),
    'all_items' => __('All Works', 'linnikov-agency'),
    'search_items' => __('Search Works', 'linnikov-agency'),
    'parent_item_colon' => __('Parent Works:', 'linnikov-agency'),
    'not_found' => __('No works found.', 'linnikov-agency'),
    'not_found_in_trash' => __('No works found in Trash.', 'linnikov-agency'),
  );

  // Arguments for Work post type
  $work_args = array(
    'labels' => $work_labels,
    'public' => true,
    'has_archive' => true,
    'supports' => array('title', 'editor', 'thumbnail'),
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'works'),
  );

  register_post_type('work', $work_args);

  // Labels for News post type
  $news_labels = array(
    'name' => __('News', 'linnikov-agency'),
    'singular_name' => __('News', 'linnikov-agency'),
    'menu_name' => __('News', 'linnikov-agency'),
    'name_admin_bar' => __('News', 'linnikov-agency'),
    'add_new' => __('Add New', 'linnikov-agency'),
    'add_new_item' => __('Add New News', 'linnikov-agency'),
    'new_item' => __('New News', 'linnikov-agency'),
    'edit_item' => __('Edit News', 'linnikov-agency'),
    'view_item' => __('View News', 'linnikov-agency'),
    'all_items' => __('All News', 'linnikov-agency'),
    'search_items' => __('Search News', 'linnikov-agency'),
    'parent_item_colon' => __('Parent News:', 'linnikov-agency'),
    'not_found' => __('No news found.', 'linnikov-agency'),
    'not_found_in_trash' => __('No news found in Trash.', 'linnikov-agency'),
  );

  // Arguments for News post type
  $news_args = array(
    'labels' => $news_labels,
    'public' => true,
    'has_archive' => true,
    'supports' => array('title', 'editor', 'thumbnail'),
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'news'),
  );

  register_post_type('news', $news_args);
}
add_action('init', 'linnikov_agency_create_post_types');

// Register Taxonomy for 'work' post type
function linnikov_agency_create_work_tags_taxonomy() {
  $work_labels = array(
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

  $work_args = array(
    'hierarchical' => true,
    'labels' => $work_labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array('slug' => 'work-tag'),
  );

  register_taxonomy('work_tag', 'work', $work_args);
}
add_action('init', 'linnikov_agency_create_work_tags_taxonomy');

// Register Taxonomy for 'news' post type
function linnikov_agency_create_news_tags_taxonomy() {
  $news_labels = array(
    'name' => __('News Tags', 'linnikov-agency'),
    'singular_name' => __('News Tag', 'linnikov-agency'),
    'search_items' => __('Search News Tags', 'linnikov-agency'),
    'all_items' => __('All News Tags', 'linnikov-agency'),
    'edit_item' => __('Edit News Tag', 'linnikov-agency'),
    'update_item' => __('Update News Tag', 'linnikov-agency'),
    'add_new_item' => __('Add New News Tag', 'linnikov-agency'),
    'new_item_name' => __('New News Tag Name', 'linnikov-agency'),
    'menu_name' => __('News Tags', 'linnikov-agency'),
  );

  $news_args = array(
    'hierarchical' => true,
    'labels' => $news_labels,
    'show_ui' => true,
    'show_admin_column' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array('slug' => 'news-tag'),
  );

  register_taxonomy('news_tag', 'news', $news_args);
}
add_action('init', 'linnikov_agency_create_news_tags_taxonomy');