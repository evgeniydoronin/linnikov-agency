<?php
// Remove the WordPress version number from the head section
remove_action('wp_head', 'wp_generator');

// Remove the WordPress REST API link tag and oEmbed discovery links
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');

// Remove RSD link from the header
remove_action('wp_head', 'rsd_link');

// Function to dequeue unnecessary WordPress styles and scripts
if (!function_exists('dequeue_unnecessary_wp_assets')) {
	function dequeue_unnecessary_wp_assets(): void {
		// Dequeue styles
		wp_dequeue_style('wp-block-library'); // WordPress block styles
		wp_dequeue_style('wp-block-library-theme'); // WordPress block theme
		wp_dequeue_style('wc-block-style'); // WooCommerce blocks
		wp_dequeue_style('global-styles'); // Global styles (if any)
		wp_dequeue_style('classic-theme-styles'); // Classic theme styles

		// Dequeue scripts and remove inline styles
		wp_dequeue_script('wp-emoji'); // Emoji script
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('wp_print_styles', 'print_emoji_styles');
		remove_action('wp_head', 'wp_print_styles', 9); // Remove styles from <head>

		// Remove global styles
		remove_action('wp_enqueue_scripts', 'wp_enqueue_global_styles');
		remove_action('wp_footer', 'wp_enqueue_global_styles');
	}
	add_action('wp_enqueue_scripts', 'dequeue_unnecessary_wp_assets', 100);
}

// Function to disable WordPress emojis
if (!function_exists('disable_wp_emojicons')) {
	function disable_wp_emojicons(): void {
		// Remove emoji detection script and styles
		remove_action('wp_head', 'print_emoji_detection_script', 7);
		remove_action('admin_print_scripts', 'print_emoji_detection_script');
		remove_action('wp_print_styles', 'print_emoji_styles');
		remove_action('admin_print_styles', 'print_emoji_styles');

		// Remove emoji-related filters
		remove_filter('the_content_feed', 'wp_staticize_emoji');
		remove_filter('comment_text_rss', 'wp_staticize_emoji');
		remove_filter('wp_mail', 'wp_staticize_emoji_for_email');

		// Remove TinyMCE emoji plugin
		add_filter('tiny_mce_plugins', function($plugins) {
			if (is_array($plugins)) {
				return array_diff($plugins, array('wpemoji'));
			} else {
				return array();
			}
		});

		// Remove emoji CDN hostname from DNS prefetching hints
		add_filter('wp_resource_hints', function($urls, $relation_type) {
			if ('dns-prefetch' === $relation_type) {
				$emoji_svg_url = apply_filters('emoji_svg_url', 'https://s.w.org/images/core/emoji/2/svg/');
				$urls = array_diff($urls, array($emoji_svg_url));
			}
			return $urls;
		}, 10, 2);
	}
	add_action('init', 'disable_wp_emojicons');
}

// Function to dequeue jQuery Migrate
if (!function_exists('dequeue_jquery_migrate')) {
	function dequeue_jquery_migrate(&$scripts) {
		// Check if jQuery is registered
		if (isset($scripts->registered['jquery'])) {
			// Remove the 'jquery-migrate' dependency
			$scripts->registered['jquery']->deps = array_diff(
				$scripts->registered['jquery']->deps,
				['jquery-migrate']
			);
		}
	}
	add_action('wp_default_scripts', 'dequeue_jquery_migrate');
}

// Function to enqueue styles and scripts
if (!function_exists('linnikov_agency_enqueue_styles_and_scripts')) {
	function linnikov_agency_enqueue_styles_and_scripts(): void {
		// Polyfills and libraries
		wp_enqueue_script('resize-observer-polyfill', get_template_directory_uri() . '/git-src/build/libs/polyfills/ResizeObserver/ResizeObserver.global.js', array(), null, false);

		// Deregister WordPress's default jQuery
		wp_deregister_script('jquery');

		// Enqueue the desired version of jQuery
		wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.7.1.min.js', array(), null, false);

		// Additional scripts
		wp_enqueue_script('jquery-validate', get_template_directory_uri() . '/git-src/build/libs/jqueryValidate/jquery.validate.min.js', array('jquery'), null, false);
		wp_enqueue_script('inputmask', get_template_directory_uri() . '/git-src/build/libs/inputmask.min.js', array('jquery'), null, false);
		wp_enqueue_script('fancybox', get_template_directory_uri() . '/git-src/build/libs/fancybox/jquery.fancybox.min.js', array('jquery'), null, false);
		wp_enqueue_script('tom-select', 'https://cdn.jsdelivr.net/npm/tom-select@2.3.1/dist/js/tom-select.complete.min.js', array(), null, false);
		wp_enqueue_script('vimeo-player', 'https://player.vimeo.com/api/player.js', array(), null, false);
		wp_enqueue_script('vanilla-drawers', 'https://cdn.jsdelivr.net/npm/vanilla-drawers@1.1.21/dist/drawers.umd.js', array(), null, false);
		wp_enqueue_script('gsap-core', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), null, false);
		wp_enqueue_script('gsap-flip', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Flip.min.js', array('gsap-core'), null, false);
		wp_enqueue_script('gsap-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', array('gsap-core'), null, false);
		wp_enqueue_script('gsap-observer', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Observer.min.js', array('gsap-core'), null, false);
		wp_enqueue_script('gsap-custom-ease', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/CustomEase.min.js', array('gsap-core'), null, false);
		wp_enqueue_script('gsap-scrollto', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js', array('gsap-core'), null, false);
		wp_enqueue_script('gsap-splittext', get_template_directory_uri() . '/git-src/build/libs/gsap-premium/SplitText.min.js', array('gsap-core'), null, false);
		wp_enqueue_script('gsap-physics-props', get_template_directory_uri() . '/git-src/build/libs/gsap-premium/PhysicsPropsPlugin.min.js', array('gsap-core'), null, false);
		wp_enqueue_script('gsap-morphsvg', get_template_directory_uri() . '/git-src/build/libs/gsap-premium/MorphSVGPlugin.js', array('gsap-core'), null, false);
		wp_enqueue_script('mobx', 'https://unpkg.com/mobx@6.12.3/dist/mobx.umd.production.min.js', array(), null, false);
		wp_enqueue_script('common-js', get_template_directory_uri() . '/git-src/build/js/common.min.js', array(), null, false);

		// Styles
		wp_enqueue_style('fancybox-css', get_template_directory_uri() . '/git-src/build/libs/fancybox/jquery.fancybox.min.css');
		wp_enqueue_style('common-css', get_template_directory_uri() . '/git-src/build/css/common.min.css');

		// Enqueue specific scripts and styles for the front page
		if (is_front_page()) {
			wp_enqueue_style('home-style', get_template_directory_uri() . '/git-src/build/css/home.min.css');
			wp_enqueue_script('home-script', get_template_directory_uri() . '/git-src/build/js/home.min.js', array('jquery'), null, true);
		}

		// Enqueue specific scripts and styles for the contact page
		if (is_page('contact')) {
			wp_enqueue_style('contact-style', get_template_directory_uri() . '/git-src/build/css/contact.min.css');
			wp_enqueue_script('contact-script', get_template_directory_uri() . '/git-src/build/js/contact.min.js', array('jquery'), null, true);
		}
	}
	add_action('wp_enqueue_scripts', 'linnikov_agency_enqueue_styles_and_scripts');
}

// Function to add defer attribute to scripts
if (!function_exists('add_defer_attribute')) {
	function add_defer_attribute($tag, $handle) {
		// Check if not in admin and tag contains 'src'
		if (!is_admin() && strpos($tag, 'src') !== false) {
			return str_replace('<script', '<script defer="defer"', $tag);
		}
		return $tag;
	}
	add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);
}

// Function to register menus
if (!function_exists('linnikov_agency_register_menus')) {
	function linnikov_agency_register_menus(): void {
		register_nav_menus(array(
			'header-menu' => __('Header Menu', 'linnikov-agency'),
			'footer-menu' => __('Footer Menu', 'linnikov-agency'),
		));
	}
	add_action('init', 'linnikov_agency_register_menus');
}

// Add support for post thumbnails
add_theme_support('post-thumbnails');

// Function to initialize widget areas
if (!function_exists('linnikov_agency_widgets_init')) {
	function linnikov_agency_widgets_init(): void {
		register_sidebar(array(
			'name' => __('Sidebar', 'linnikov-agency'),
			'id' => 'sidebar-1',
			'description' => __('Main sidebar that appears on the right.', 'linnikov-agency'),
			'before_widget' => '<div class="widget %2$s">',
			'after_widget' => '</div>',
			'before_title' => '<h2 class="widget-title">',
			'after_title' => '</h2>',
		));
	}
	add_action('widgets_init', 'linnikov_agency_widgets_init');
}

// Add support for title tag
add_theme_support('title-tag');

// Function to set up custom logo support
if (!function_exists('linnikov_agency_custom_logo_setup')) {
	function linnikov_agency_custom_logo_setup(): void {
		$defaults = array(
			'height'      => 100,
			'width'       => 400,
			'flex-height' => true,
			'flex-width'  => true,
		);
		add_theme_support('custom-logo', $defaults);
	}
	add_action('after_setup_theme', 'linnikov_agency_custom_logo_setup');
}