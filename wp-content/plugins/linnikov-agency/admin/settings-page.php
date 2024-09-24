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


    // Adding Work Archive Settings page under Theme Settings
    add_submenu_page(
        'theme-settings',  // Parent slug
        __('Work Archive Settings', 'linnikov-agency'),  // Page title
        __('Work Archive Settings', 'linnikov-agency'),  // Menu title
        'manage_options',  // Capability required
        'work-archive-settings',  // Submenu slug
        'linnikov_agency_render_work_archive_settings_page'  // Function to render the submenu page
    );

    // Adding Ideas Filter Settings page under Theme Settings
    add_submenu_page(
        'theme-settings',  // Parent slug
        __('Ideas Filter Settings', 'linnikov-agency'),  // Page title
        __('Ideas Filter Settings', 'linnikov-agency'),  // Menu title
        'manage_options',  // Capability required
        'ideas-filter-settings',  // Submenu slug
        'linnikov_agency_render_ideas_filter_settings_page'  // Function to render the submenu page
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
function linnikov_agency_render_ideas_filter_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    echo '<div class="wrap">';

    // Include the HTML template from partials
    include plugin_dir_path(__FILE__) . 'partials/ideas-filter-settings-page.php';  // Ensure this file exists

    echo '</div>';
}
