<?php
// Function to dequeue unnecessary WordPress styles and scripts
if (!function_exists('dequeue_unnecessary_wp_assets')) {
  function dequeue_unnecessary_wp_assets(): void
  {
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

    // Remove the WordPress version number from the head section
    remove_action('wp_head', 'wp_generator');

    // Remove the WordPress REST API link tag and oEmbed discovery links
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');

    // Remove RSD link from the header
    remove_action('wp_head', 'rsd_link');
  }

  add_action('wp_enqueue_scripts', 'dequeue_unnecessary_wp_assets', 100);
}

// Function to disable WordPress emojis
if (!function_exists('disable_wp_emojicons')) {
  function disable_wp_emojicons(): void
  {
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
    add_filter('tiny_mce_plugins', function ($plugins) {
      if (is_array($plugins)) {
        return array_diff($plugins, array('wpemoji'));
      } else {
        return array();
      }
    });

    // Remove emoji CDN hostname from DNS prefetching hints
    add_filter('wp_resource_hints', function ($urls, $relation_type) {
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
  function dequeue_jquery_migrate(&$scripts)
  {
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
  function linnikov_agency_enqueue_styles_and_scripts(): void
  {

    // Deregister WordPress's default jQuery and register your own version
    wp_deregister_script('jquery');
    wp_enqueue_script('jquery', 'https://code.jquery.com/jquery-3.7.1.min.js', array(), null, false);

    // Enqueue other scripts
    wp_enqueue_script('resize-observer-polyfill', get_template_directory_uri() . '/git-src/build/libs/polyfills/ResizeObserver/ResizeObserver.global.js', array(), null, false);
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

    // Enqueue styles
    wp_enqueue_style('fancybox-css', get_template_directory_uri() . '/git-src/build/libs/fancybox/jquery.fancybox.min.css');
    wp_enqueue_style('common-css', get_template_directory_uri() . '/git-src/build/css/common.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/common.min.css'));

    // Enqueue main scripts
    wp_enqueue_script('common-js', get_template_directory_uri() . '/git-src/build/js/common.min.js', array('jquery'), filemtime(get_template_directory() . '/git-src/build/js/common.min.js'), false);
    // Локализуем параметры для скрипта common.js
    wp_localize_script('common-js', 'ajax_request_params', array(
      'ajax_url' => admin_url('admin-ajax.php'), // WordPress Ajax URL
      'nonce' => wp_create_nonce('submit_request_form_nonce'), // Nonce для безопасности
    ));

    // Подключаем основной файл стилей с меткой времени
    wp_enqueue_style(
      'main-style', // Уникальный идентификатор для стиля
      get_stylesheet_uri(), // URL для основного style.css
      array(), // Зависимости (если нужно подключать другие стили до этого)
      filemtime(get_stylesheet_directory() . '/style.css') // Метка времени, основанная на последней модификации файла
    );

    // Conditionally enqueue for front-page.php
    if (is_front_page()) {
//      wp_enqueue_script('home-js', get_template_directory_uri() . '/git-src/build/js/home.min.js', array(), null, false);
//      wp_enqueue_style('home-css', get_template_directory_uri() . '/git-src/build/css/home.min.css');
      wp_enqueue_script('home-js', get_template_directory_uri() . '/git-src/build/js/home.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/home.min.js'), false);
      wp_enqueue_style('home-css', get_template_directory_uri() . '/git-src/build/css/home.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/home.min.css'));
    }

    // Conditionally enqueue for the works archive page (works.php)
    if (is_post_type_archive('work')) {
//      wp_enqueue_script('works-js', get_template_directory_uri() . '/git-src/build/js/works.min.js', array(), null, false);
//      wp_enqueue_style('works-css', get_template_directory_uri() . '/git-src/build/css/works.min.css');
      wp_enqueue_script('works-js', get_template_directory_uri() . '/git-src/build/js/works.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/works.min.js'), false);
      wp_enqueue_style('works-css', get_template_directory_uri() . '/git-src/build/css/works.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/works.min.css'));
    }

    // Conditionally enqueue for a single WORK page (single-work.php)
    if (is_singular('work')) {
      wp_enqueue_script('page-work-js', get_template_directory_uri() . '/git-src/build/js/single-work.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/single-work.min.js'), false);
      wp_enqueue_style('single-work-css', get_template_directory_uri() . '/git-src/build/css/single-work.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/single-work.min.css'));
//      wp_enqueue_script('single-work-js', get_template_directory_uri() . '/git-src/build/js/single-work.min.js', array(), null, false);
//      wp_enqueue_style('single-work-css', get_template_directory_uri() . '/git-src/build/css/single-work.min.css');
    }

    // Conditionally enqueue for the NEWS archive page (news.php)
    if (is_post_type_archive('news')) {
      wp_enqueue_script('linnikov-news', get_template_directory_uri() . '/git-src/build/js/news.min.js', array(), null, false);
      wp_enqueue_style('news-css', get_template_directory_uri() . '/git-src/build/css/news.min.css');

      $terms = get_terms(array(
        'taxonomy' => 'news_category',
        'hide_empty' => false,
      ));

      $category_map = array();
      foreach ($terms as $term) {
        $category_map[$term->slug] = $term->term_id;
      }

      // Передаем данные в JavaScript
      wp_localize_script('linnikov-news', 'linnikov_category_map', $category_map);
    }

    // Conditionally enqueue for a single work page (single-news.php)
    if (is_singular('news')) {
      wp_enqueue_script('single-news-js', get_template_directory_uri() . '/git-src/build/js/single-post.min.js', array(), null, false);
      wp_enqueue_style('single-news-css', get_template_directory_uri() . '/git-src/build/css/single-post.min.css');
    }

    // Conditionally enqueue for a page-about-us.php
    if (is_page_template('templates/page-about-us.php')) {
//      wp_enqueue_script('page-about-js', get_template_directory_uri() . '/git-src/build/js/about-us.min.js', array(), null, false);
      wp_enqueue_script('page-about-js', get_template_directory_uri() . '/git-src/build/js/about-us.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/about-us.min.js'), false);
      wp_enqueue_style('page-about-css', get_template_directory_uri() . '/git-src/build/css/about-us.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/about-us.min.css'));
    }

    // Conditionally enqueue for a page-team.php
    if (is_page_template('templates/page-team.php')) {
//      wp_enqueue_script('page-team-js', get_template_directory_uri() . '/git-src/build/js/team.min.js', array(), null, false);
//      wp_enqueue_style('page-team-css', get_template_directory_uri() . '/git-src/build/css/team.min.css');
      wp_enqueue_script('page-team-js', get_template_directory_uri() . '/git-src/build/js/team.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/team.min.js'), false);
      wp_enqueue_style('page-team-css', get_template_directory_uri() . '/git-src/build/css/team.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/team.min.css'));
    }

    // Conditionally enqueue for a page-ideas.php
    if (is_post_type_archive('ideas')) {
//      wp_enqueue_style('page-ideas-css', get_template_directory_uri() . '/git-src/build/css/ideas.min.css');
//      wp_enqueue_script('page-ideas-js', get_template_directory_uri() . '/git-src/build/js/ideas.min.js', array(), null, false);
      wp_enqueue_script('page-ideas-js', get_template_directory_uri() . '/git-src/build/js/ideas.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/ideas.min.js'), false);
      wp_enqueue_style('page-ideas-css', get_template_directory_uri() . '/git-src/build/css/ideas.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/ideas.min.css'));
    }

    // Conditionally enqueue for a page-careers.php
    if (is_page_template('templates/page-careers.php')) {
//      wp_enqueue_script('page-careers-js', get_template_directory_uri() . '/git-src/build/js/careers.min.js', array(), null, false);
//      wp_enqueue_style('page-careers-css', get_template_directory_uri() . '/git-src/build/css/careers.min.css');
      wp_enqueue_script('page-careers-js', get_template_directory_uri() . '/git-src/build/js/careers.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/careers.min.js'), false);
      wp_enqueue_style('page-careers-css', get_template_directory_uri() . '/git-src/build/css/careers.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/careers.min.css'));

      // Локализуем параметры для Ajax
      wp_localize_script('page-careers-js', 'ajax_career_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('submit_career_form_nonce'),
      ));
    }

    // Conditionally enqueue for a page-competencies.php
    if (is_page_template('templates/page-competencies.php')) {
      if (function_exists('wp_is_mobile')) {
        if (wp_is_mobile()) {
          wp_enqueue_script('page-competencies-js', get_template_directory_uri() . '/git-src/build/js/competencies-mob.min.js', array('jquery'), null, false);
          wp_enqueue_style('page-competencies-css', get_template_directory_uri() . '/git-src/build/css/competencies-mob.min.css');
        } else {
          wp_enqueue_script('page-competencies-js', get_template_directory_uri() . '/git-src/build/js/competencies.min.js', array('jquery'), null, false);
          wp_enqueue_style('page-competencies-css', get_template_directory_uri() . '/git-src/build/css/competencies.min.css');
        }
      }
      wp_enqueue_script('createjs', 'https://code.createjs.com/1.0.0/createjs.min.js', array('gsap-core', 'jquery'), null, false);
      wp_enqueue_script('animated-icons-01', get_template_directory_uri() . '/git-src/build/libs/animated-icons/01.js', array('jquery'), null, false);
      wp_enqueue_script('animated-icons-02', get_template_directory_uri() . '/git-src/build/libs/animated-icons/02.js', array('jquery'), null, false);
      wp_enqueue_script('animated-icons-03', get_template_directory_uri() . '/git-src/build/libs/animated-icons/03.js', array('jquery'), null, false);
      wp_enqueue_script('animated-icons-04', get_template_directory_uri() . '/git-src/build/libs/animated-icons/04.js', array('jquery'), null, false);
      wp_enqueue_script('animated-icons-05', get_template_directory_uri() . '/git-src/build/libs/animated-icons/05.js', array('jquery'), null, false);
      wp_enqueue_script('animated-icons-06', get_template_directory_uri() . '/git-src/build/libs/animated-icons/06.js', array('jquery'), null, false);
      wp_enqueue_script('animated-icons-07', get_template_directory_uri() . '/git-src/build/libs/animated-icons/07.js', array('jquery'), null, false);
      wp_enqueue_script('animated-icons-08', get_template_directory_uri() . '/git-src/build/libs/animated-icons/08.js', array('jquery'), null, false);
    }

    // Conditionally enqueue for a page-careers.php
    if (is_page_template('templates/page-privacy-policy.php')) {
//      wp_enqueue_style('page-privacy-policy-css', get_template_directory_uri() . '/git-src/build/css/privacy-policy.min.css');
      wp_enqueue_script('page-privacy-policy-js', get_template_directory_uri() . '/git-src/build/js/privacy-policy.min.js', array(), null, false);
      wp_enqueue_style('page-privacy-policy-css', get_template_directory_uri() . '/git-src/build/css/privacy-policy.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/privacy-policy.min.css'));
    }

    // Conditionally enqueue for a page-careers.php
    if (is_singular('vacancies')) {
      wp_enqueue_script('page-vacancies-js', get_template_directory_uri() . '/git-src/build/js/designer-application.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/designer-application.min.js'), false);
      wp_enqueue_style('page-vacancies-css', get_template_directory_uri() . '/git-src/build/css/designer-application.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/designer-application.min.css'));

      // Локализуем параметры для Ajax
      wp_localize_script('page-vacancies-js', 'ajax_designer_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('submit_designer_form_nonce'),
      ));
    }

    // Conditionally enqueue for a page-contact.php
    if (is_page_template('templates/page-contact.php')) {
//      wp_enqueue_script('page-contact-js', get_template_directory_uri() . '/git-src/build/js/contact.min.js', array(), null, false);
      wp_enqueue_script('page-contact-js', get_template_directory_uri() . '/git-src/build/js/contact.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/contact.min.js'), false);
      wp_enqueue_style('page-contact-css', get_template_directory_uri() . '/git-src/build/css/contact.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/contact.min.css'));

      // Локализация параметров для Ajax
      wp_localize_script('page-contact-js', 'ajax_contact_params', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('submit_contact_form_nonce'),
      ));
    }

    // Conditionally enqueue for a page-express-brand-audit.php
    if (is_page_template('templates/page-express-brand-audit.php')) {
      wp_enqueue_script('page-minpack-exclusive-js', get_template_directory_uri() . '/git-src/build/js/minpack-exclusive-complimentary.min.js', array(), null, false);
      wp_enqueue_style('page-minpack-exclusive-css', get_template_directory_uri() . '/git-src/build/css/minpack-exclusive-complimentary.min.css');
    }

    // Conditionally enqueue for a page-cookie-policy.php
    if (is_page_template('templates/page-cookie-policy.php')) {
      wp_enqueue_script('page-cookies-js', get_template_directory_uri() . '/git-src/build/js/cookies.min.js', array(), null, false);
      wp_enqueue_style('page-cookies-css', get_template_directory_uri() . '/git-src/build/css/cookies.min.css', array(), filemtime(get_template_directory() . '/git-src/build/css/cookies.min.css'));
    }

    // Вызов универсальной функции для страниц слайдера
    enqueue_brief_assets('page-brief-branding.php', '_linnikov_agency_slider_branding_values', [100, 200, 300, 400, 500]);
    enqueue_brief_assets('page-brief-packaging.php', '_linnikov_agency_slider_packaging_values', [100, 200, 300, 400, 500]);
    enqueue_brief_assets('page-brief-design.php', '_linnikov_agency_slider_design_values', [100, 200, 300, 400, 500]);
    enqueue_brief_assets('page-brief-website.php', '_linnikov_agency_slider_website_values', [100, 200, 300, 400, 500]);

  }

  add_action('wp_enqueue_scripts', 'linnikov_agency_enqueue_styles_and_scripts');
}

// Функция для подключения стилей и скриптов для слайдера
function enqueue_brief_assets($template_name, $meta_key, $default_values)
{
  global $post;

  if (is_page_template('templates/' . $template_name)) {
    $slider_values = get_post_meta($post->ID, $meta_key, true);

    // Если мета-поле пустое, используем значения по умолчанию
    if (!is_array($slider_values)) {
      $slider_values = $default_values;
    }

    // Передаем данные в JavaScript
    wp_localize_script('common-js', 'briefSliderValues', array(
      'values' => $slider_values
    ));

    wp_enqueue_script('page-brief-branding-js', get_template_directory_uri() . '/git-src/build/js/brief.min.js', array(), filemtime(get_template_directory() . '/git-src/build/js/brief.min.js'), false);
    wp_enqueue_style('page-brief-branding-css', get_template_directory_uri() . '/git-src/build/css/brief.min.css');

    // Локализация параметров для Ajax
    wp_localize_script('page-brief-branding-js', 'ajax_brief_params', array(
      'ajax_url' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('submit_brief_form_nonce'),
    ));

  }
}

// Function to add defer attribute to scripts
if (!function_exists('add_defer_attribute')) {
  function add_defer_attribute($tag, $handle)
  {
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
  function linnikov_agency_register_menus(): void
  {
    register_nav_menus(array(
      'header-menu' => __('Header Menu', 'linnikov-agency'),
      'footer-menu' => __('Footer Menu', 'linnikov-agency'),
      'about-menu' => __('About Menu', 'linnikov-agency'),
    ));
  }

  add_action('init', 'linnikov_agency_register_menus');
}

// Add support for post thumbnails
add_theme_support('post-thumbnails');

// Add support for title tag
add_theme_support('title-tag');

function linnikov_get_news_categories()
{
  $categories = get_terms(array(
    'taxonomy' => 'news_category',  // Замените на вашу таксономию
    'hide_empty' => false,
  ));

  $category_map = array();
  foreach ($categories as $category) {
    $category_map[$category->slug] = $category->term_id;
  }

  // Выводим JavaScript-код с данными категорий
  ?>
  <script>
      const categoryMap = <?php echo json_encode($category_map); ?>;
      console.log('Category Map:', categoryMap); // Выводим объект в консоль
  </script>
  <?php
}

add_action('wp_footer', 'linnikov_get_news_categories');


add_action('phpmailer_init', 'custom_phpmailer_init');

use PHPMailer\PHPMailer\PHPMailer;

function custom_phpmailer_init(PHPMailer $phpmailer)
{
//  $phpmailer->isSMTP();
//  $phpmailer->Host = 'smtp.gmail.com';  // SMTP сервер Gmail
//  $phpmailer->SMTPAuth = true;
//  $phpmailer->Port = 587;  // Порт для TLS
//  $phpmailer->Username = 'evgenedoronin@gmail.com';  // Ваш Gmail логин
//  $phpmailer->Password = 'srem wmgy mfge nvsr';  // Пароль приложения (не обычный пароль)
//  $phpmailer->SMTPSecure = 'tls';  // Используйте TLS для безопасности
//  $phpmailer->From = 'evgenedoronin@linnikov.agency';  // Ваш адрес Gmail в качестве отправителя
//  $phpmailer->FromName = 'Evgene Doronin';  // Имя отправителя

  $phpmailer->isSMTP();
  $phpmailer->Host = 'smtp.gmail.com';  // SMTP сервер Gmail
  $phpmailer->SMTPAuth = true;
  $phpmailer->Port = 465;  // Порт для TLS
  $phpmailer->Username = 'info@linnikov.agency';  // Ваш Gmail логин
  $phpmailer->Password = 'vgzo cvip uzvb rhoh';  // Пароль приложения (не обычный пароль)
  $phpmailer->SMTPSecure = 'ssl';  // Используйте TLS для безопасности
  $phpmailer->From = 'info@linnikov.agency';  // Ваш адрес Gmail в качестве отправителя
  $phpmailer->FromName = 'Linnikov.Agency';  // Имя отправителя
}


