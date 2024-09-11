<?php
/**
 * Plugin Name: Linnikov Agency Plugin
 * Plugin URI:  https://example.com/
 * Description: Custom functionalities for the Linnikov Agency theme.
 * Version:     1.0.0
 * Author:      ED
 * Author URI:  https://example.com/
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: linnikov-agency
 * Domain Path: /languages
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

// Include custom post types, meta boxes, and other functionalities here.<?php
// Include Custom Post Types
require_once plugin_dir_path( __FILE__ ) . 'includes/post-types.php';

// Include Meta Boxes
require_once plugin_dir_path( __FILE__ ) . 'includes/meta-boxes.php';

// Include Helper Functions
require_once plugin_dir_path( __FILE__ ) . 'includes/helper-functions.php';

// Подключаем файлы админки
include plugin_dir_path(__FILE__) . 'admin/settings-page.php';
