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

// Include Meta Boxes WORKS
require_once plugin_dir_path( __FILE__ ) . 'includes/meta-boxes.php';

// Include Meta Boxes NEWS
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-news.php';

// Include Meta Boxes TEAM
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-team.php';

// Include Meta Boxes IDEA
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-ideas.php';

// Include Meta Boxes for About Us
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-about-us.php';

// Include Meta Boxes for Competencies
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-competencies.php';

// Include Meta Boxes for Vacancies
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-vacancies.php';

// Include Meta Boxes for Careers
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-careers.php';

// Include Meta Boxes for Contact
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-contact.php';

// Include Meta Boxes for Briefs
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-brief-branding.php';
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-brief-packaging.php';
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-brief-design.php';
require_once plugin_dir_path(__FILE__) . 'includes/meta-boxes-brief-website.php';

// Include Helper Functions
require_once plugin_dir_path( __FILE__ ) . 'includes/helper-functions.php';

// Подключаем формы
include plugin_dir_path(__FILE__) . 'includes/forms.php';

// Подключаем файлы админки
include plugin_dir_path(__FILE__) . 'admin/settings-page.php';
