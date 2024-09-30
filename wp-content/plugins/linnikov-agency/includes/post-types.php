<?php
// Register Custom Post Type Works and News
function linnikov_agency_create_post_types()
{
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
        'supports' => array('title', 'thumbnail'),
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'works'),
        'menu_icon' => 'dashicons-art',
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
        'supports' => array('title', 'thumbnail'),
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'news'),
        'menu_icon' => 'dashicons-megaphone',
    );

    register_post_type('news', $news_args);

    $team_labels = array(
        'name' => __('Team Members', 'linnikov-agency'),
        'singular_name' => __('Team Member', 'linnikov-agency'),
        'menu_name' => __('Team', 'linnikov-agency'),
        'name_admin_bar' => __('Team Member', 'linnikov-agency'),
        'add_new' => __('Add New', 'linnikov-agency'),
        'add_new_item' => __('Add New Team Member', 'linnikov-agency'),
        'new_item' => __('New Team Member', 'linnikov-agency'),
        'edit_item' => __('Edit Team Member', 'linnikov-agency'),
        'view_item' => __('View Team Member', 'linnikov-agency'),
        'all_items' => __('All Team Members', 'linnikov-agency'),
        'search_items' => __('Search Team Members', 'linnikov-agency'),
        'parent_item_colon' => __('Parent Team Members:', 'linnikov-agency'),
        'not_found' => __('No team members found.', 'linnikov-agency'),
        'not_found_in_trash' => __('No team members found in Trash.', 'linnikov-agency'),
    );

    $team_args = array(
        'labels' => $team_labels,
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'thumbnail'),
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'teams'),
        'menu_icon' => 'dashicons-groups', // Иконка для админ-панели
    );

    register_post_type('team', $team_args);

    $ideas_labels = array(
        'name' => __('Ideas', 'linnikov-agency'),
        'singular_name' => __('Idea', 'linnikov-agency'),
        'menu_name' => __('Ideas', 'linnikov-agency'),
        'name_admin_bar' => __('Idea', 'linnikov-agency'),
        'add_new' => __('Add New', 'linnikov-agency'),
        'add_new_item' => __('Add New Idea', 'linnikov-agency'),
        'new_item' => __('New Idea', 'linnikov-agency'),
        'edit_item' => __('Edit Idea', 'linnikov-agency'),
        'view_item' => __('View Idea', 'linnikov-agency'),
        'all_items' => __('All Ideas', 'linnikov-agency'),
        'search_items' => __('Search Ideas', 'linnikov-agency'),
        'parent_item_colon' => __('Parent Ideas:', 'linnikov-agency'),
        'not_found' => __('No ideas found.', 'linnikov-agency'),
        'not_found_in_trash' => __('No ideas found in Trash.', 'linnikov-agency'),
    );

    $ideas_args = array(
        'labels' => $ideas_labels,
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'ideas'),
        'menu_icon' => 'dashicons-lightbulb', // Иконка для админ-панели
    );

    register_post_type('ideas', $ideas_args);

  // Labels for Vacancies post type
  $vacancies_labels = array(
    'name' => __('Vacancies', 'linnikov-agency'),
    'singular_name' => __('Vacancy', 'linnikov-agency'),
    'menu_name' => __('Vacancies', 'linnikov-agency'),
    'name_admin_bar' => __('Vacancy', 'linnikov-agency'),
    'add_new' => __('Add New', 'linnikov-agency'),
    'add_new_item' => __('Add New Vacancy', 'linnikov-agency'),
    'new_item' => __('New Vacancy', 'linnikov-agency'),
    'edit_item' => __('Edit Vacancy', 'linnikov-agency'),
    'view_item' => __('View Vacancy', 'linnikov-agency'),
    'all_items' => __('All Vacancies', 'linnikov-agency'),
    'search_items' => __('Search Vacancies', 'linnikov-agency'),
    'parent_item_colon' => __('Parent Vacancies:', 'linnikov-agency'),
    'not_found' => __('No vacancies found.', 'linnikov-agency'),
    'not_found_in_trash' => __('No vacancies found in Trash.', 'linnikov-agency'),
  );

  // Arguments for Vacancies post type
  $vacancies_args = array(
    'labels' => $vacancies_labels,
    'public' => true,
    'has_archive' => true,
    'supports' => array('title', 'thumbnail'),
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'vacancies'),
    'menu_icon' => 'dashicons-businessperson',
  );

  register_post_type('vacancies', $vacancies_args);


}

add_action('init', 'linnikov_agency_create_post_types');

// Register Taxonomy for 'work' post type
function linnikov_agency_create_work_tags_taxonomy()
{
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
function linnikov_agency_create_news_tags_taxonomy()
{
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

// Register Custom Taxonomy for 'news' post type
function linnikov_agency_create_news_categories_taxonomy()
{
    $news_category_labels = array(
        'name' => __('News Categories', 'linnikov-agency'),
        'singular_name' => __('News Category', 'linnikov-agency'),
        'search_items' => __('Search News Categories', 'linnikov-agency'),
        'all_items' => __('All News Categories', 'linnikov-agency'),
        'parent_item' => __('Parent News Category', 'linnikov-agency'),
        'parent_item_colon' => __('Parent News Category:', 'linnikov-agency'),
        'edit_item' => __('Edit News Category', 'linnikov-agency'),
        'update_item' => __('Update News Category', 'linnikov-agency'),
        'add_new_item' => __('Add New News Category', 'linnikov-agency'),
        'new_item_name' => __('New News Category Name', 'linnikov-agency'),
        'menu_name' => __('News Categories', 'linnikov-agency'),
    );

    $news_category_args = array(
        'hierarchical' => true, // Иерархическая таксономия как категории
        'labels' => $news_category_labels,
        'show_ui' => true, // Показать пользовательский интерфейс
        'show_admin_column' => true, // Показать в колонке администратора
        'query_var' => true,
        'rewrite' => array('slug' => 'news-category'),
        'show_in_rest' => true, // Показать в REST API для поддержки Gutenberg
    );

    register_taxonomy('news_category', 'news', $news_category_args); // Регистрируем таксономию 'news_category' для типа записи 'news'
}

add_action('init', 'linnikov_agency_create_news_categories_taxonomy');

// Register Custom Taxonomy for 'team' post type
function linnikov_agency_create_team_tags_taxonomy()
{
    $team_tag_labels = array(
        'name' => __('Team Tags', 'linnikov-agency'),
        'singular_name' => __('Team Tag', 'linnikov-agency'),
        'search_items' => __('Search Team Tags', 'linnikov-agency'),
        'all_items' => __('All Team Tags', 'linnikov-agency'),
        'edit_item' => __('Edit Team Tag', 'linnikov-agency'),
        'update_item' => __('Update Team Tag', 'linnikov-agency'),
        'add_new_item' => __('Add New Team Tag', 'linnikov-agency'),
        'new_item_name' => __('New Team Tag Name', 'linnikov-agency'),
        'menu_name' => __('Team Tags', 'linnikov-agency'),
    );

    $team_tag_args = array(
        'hierarchical' => true, // Теги не иерархические, в отличие от категорий
        'labels' => $team_tag_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'update_count_callback' => '_update_post_term_count',
        'query_var' => true,
        'rewrite' => array('slug' => 'team-tag'),
        'show_in_rest' => true, // Показать в REST API для поддержки редактора Gutenberg
    );

    register_taxonomy('team_tag', 'team', $team_tag_args);
}

add_action('init', 'linnikov_agency_create_team_tags_taxonomy');

// Register Custom Taxonomy for 'ideas' post type
function linnikov_agency_create_ideas_tags_taxonomy()
{
    $ideas_tag_labels = array(
        'name' => __('Idea Tags', 'linnikov-agency'),
        'singular_name' => __('Idea Tag', 'linnikov-agency'),
        'search_items' => __('Search Idea Tags', 'linnikov-agency'),
        'all_items' => __('All Idea Tags', 'linnikov-agency'),
        'edit_item' => __('Edit Idea Tag', 'linnikov-agency'),
        'update_item' => __('Update Idea Tag', 'linnikov-agency'),
        'add_new_item' => __('Add New Idea Tag', 'linnikov-agency'),
        'new_item_name' => __('New Idea Tag Name', 'linnikov-agency'),
        'menu_name' => __('Idea Tags', 'linnikov-agency'),
    );

    $ideas_tag_args = array(
        'hierarchical' => true, // Теги не иерархические, в отличие от категорий
        'labels' => $ideas_tag_labels,
        'show_ui' => true,
        'show_admin_column' => true,
        'update_count_callback' => '_update_post_term_count',
        'query_var' => true,
        'rewrite' => array('slug' => 'idea-tag'),
        'show_in_rest' => true, // Показать в REST API для поддержки редактора Gutenberg
    );

    register_taxonomy('idea_tag', 'ideas', $ideas_tag_args);
}

add_action('init', 'linnikov_agency_create_ideas_tags_taxonomy');

// Register Taxonomies for Vacancies
function linnikov_agency_register_vacancies_taxonomies()
{
  // Категория 1: Опыт
  $experience_labels = array(
    'name' => __('Experience', 'linnikov-agency'),
    'singular_name' => __('Experience', 'linnikov-agency'),
    'search_items' => __('Search Experiences', 'linnikov-agency'),
    'all_items' => __('All Experiences', 'linnikov-agency'),
    'edit_item' => __('Edit Experience', 'linnikov-agency'),
    'view_item' => __('View Experience', 'linnikov-agency'),
    'update_item' => __('Update Experience', 'linnikov-agency'),
    'add_new_item' => __('Add New Experience', 'linnikov-agency'),
    'new_item_name' => __('New Experience', 'linnikov-agency'),
    'menu_name' => __('Experience', 'linnikov-agency'),
  );

  $experience_args = array(
    'labels' => $experience_labels,
    'hierarchical' => true, // Используем теги, а не категории
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'experience'),
  );

  register_taxonomy('experience', array('vacancies'), $experience_args);

  // Категория 2: Типы проектов
  $project_types_labels = array(
    'name' => __('Project Types', 'linnikov-agency'),
    'singular_name' => __('Project Type', 'linnikov-agency'),
    'search_items' => __('Search Project Types', 'linnikov-agency'),
    'all_items' => __('All Project Types', 'linnikov-agency'),
    'edit_item' => __('Edit Project Type', 'linnikov-agency'),
    'view_item' => __('View Project Type', 'linnikov-agency'),
    'update_item' => __('Update Project Type', 'linnikov-agency'),
    'add_new_item' => __('Add New Project Type', 'linnikov-agency'),
    'new_item_name' => __('New Project Type', 'linnikov-agency'),
    'menu_name' => __('Project Types', 'linnikov-agency'),
  );

  $project_types_args = array(
    'labels' => $project_types_labels,
    'hierarchical' => true,
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'project-types'),
  );

  register_taxonomy('project_types', array('vacancies'), $project_types_args);

  // Категория 3: Инструменты
  $tools_labels = array(
    'name' => __('Tools', 'linnikov-agency'),
    'singular_name' => __('Tool', 'linnikov-agency'),
    'search_items' => __('Search Tools', 'linnikov-agency'),
    'all_items' => __('All Tools', 'linnikov-agency'),
    'edit_item' => __('Edit Tool', 'linnikov-agency'),
    'view_item' => __('View Tool', 'linnikov-agency'),
    'update_item' => __('Update Tool', 'linnikov-agency'),
    'add_new_item' => __('Add New Tool', 'linnikov-agency'),
    'new_item_name' => __('New Tool', 'linnikov-agency'),
    'menu_name' => __('Tools', 'linnikov-agency'),
  );

  $tools_args = array(
    'labels' => $tools_labels,
    'hierarchical' => true,
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'tools'),
  );

  register_taxonomy('tools', array('vacancies'), $tools_args);

  // Категория 4: Лейблы для категории тегов контактов
  $contact_tags_labels = array(
    'name' => __('Contact Tags', 'linnikov-agency'),
    'singular_name' => __('Contact Tag', 'linnikov-agency'),
    'search_items' => __('Search Contact Tags', 'linnikov-agency'),
    'all_items' => __('All Contact Tags', 'linnikov-agency'),
    'edit_item' => __('Edit Contact Tag', 'linnikov-agency'),
    'view_item' => __('View Contact Tag', 'linnikov-agency'),
    'update_item' => __('Update Contact Tag', 'linnikov-agency'),
    'add_new_item' => __('Add New Contact Tag', 'linnikov-agency'),
    'new_item_name' => __('New Contact Tag', 'linnikov-agency'),
    'menu_name' => __('Contact Tags', 'linnikov-agency'),
  );

  // Аргументы для регистрации таксономии
  $contact_tags_args = array(
    'labels' => $contact_tags_labels,
    'hierarchical' => true, // Иерархическая структура
    'show_in_rest' => true, // Отображать в REST API
    'rewrite' => array('slug' => 'contact-tags'),
  );

  // Регистрируем таксономию для постов типа Vacancies
  register_taxonomy('contact_tags', array('vacancies'), $contact_tags_args);
}

add_action('init', 'linnikov_agency_register_vacancies_taxonomies');