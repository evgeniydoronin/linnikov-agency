<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1" interactive-widget="resizes-visual">
  <!-- Favicon for all devices and platforms -->
  <link rel="apple-touch-icon" sizes="180x180"
        href="<?php echo get_template_directory_uri(); ?>/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32"
        href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16"
        href="<?php echo get_template_directory_uri(); ?>/favicon/favicon-16x16.png">
  <link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/favicon/site.webmanifest">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon/favicon.ico">
  <link rel="icon" sizes="192x192"
        href="<?php echo get_template_directory_uri(); ?>/favicon/android-chrome-192x192.png">
  <link rel="icon" sizes="512x512"
        href="<?php echo get_template_directory_uri(); ?>/favicon/android-chrome-512x512.png">
  <title><?php wp_title('|', true, 'right'); ?></title>

  <script src="https://www.google.com/recaptcha/api.js?render=6LeySEgqAAAAAJPJdoC2slB0x-4BFIPaX4_pPTyO"></script>

  <?php wp_head(); ?>
</head>
<body class="<?php
if (is_front_page()) {
  echo 'home';
} elseif (is_singular('work')) {
  echo 'single-work';
} elseif (is_page_template('templates/single-work.php')) {
  echo 'template-single-work';
} elseif (is_page_template('templates/single-vacancies.php')) {
  echo 'designer-application';
} elseif (is_page_template('templates/page-about-us.php')) {
  echo 'about-us';
} elseif (is_page_template('templates/page-ideas.php')) {
  echo 'ideas';
} elseif (is_page_template('templates/page-careers.php')) {
  echo 'careers-page';
} elseif (is_page_template('templates/page-contact.php')) {
  echo 'contact-page';
} elseif (is_page_template('templates/page-team.php')) {
  echo 'team-page';
} elseif (is_page_template('templates/page-cookie-policy.php.php')) {
  echo 'cookies';
} elseif (is_page_template('templates/page-express-brand-audit.php')) {
  echo 'minpack-exclusive-complimentary tg-regular';
} elseif (is_page_template('templates/page-competencies.php')) {
  echo 'competencies';
} elseif (is_page_template('templates/page-brief-branding.php') ||
          is_page_template('templates/page-brief-packaging.php') ||
          is_page_template('templates/page-brief-design.php') ||
          is_page_template('templates/page-brief-website.php')
) {
  echo 'brief-page';
} elseif (is_post_type_archive('work')) {
  echo 'works';
} elseif (is_post_type_archive('news')) {
  echo 'news';
}
?>">

<?php
// Инициализируем массив для классов
$classes = ['header'];

// Добавляем классы на основе условий
if (is_front_page()) {
  $classes[] = 'header_fixed';
  $classes[] = 'home__header';
}

if (is_single()) {
  $classes[] = '';
}

if (is_page('about')) {
  $classes[] = '';
}

if (is_404()) {
  $classes[] = '';
}

// Преобразуем массив в строку для атрибута class
$header_classes = implode(' ', $classes);
?>

<header class="<?php echo esc_attr($header_classes); ?>">
  <div class="section-container section-container_decor header__container">
    <div class="header__main">
      <nav class="header-nav header-nav_left header__left">
        <div class="header-nav__inner">
          <a href="<?php echo esc_url(get_post_type_archive_link('work')); ?>" class="header-link text-btn"
             data-component="animated-link">
            <div class="text-btn__cap">Works</div>
          </a>
          <button type="button" data-submenu-elem="header-submenu<-ref->about"
                  class="header-link text-btn header-link_ref header-nav__item" data-component="animated-link">
            <div class="text-btn__cap">About</div>
            <span class="icon-cubic-check-arrow"></span>
          </button>
          <a href="<?php echo esc_url(site_url('/competencies/')); ?>" class="header-link text-btn header-link_desc"
             data-component="animated-link">
            <div class="text-btn__cap">Competencies</div>
          </a>
          <a href="<?php echo esc_url(site_url('/competencies/')); ?>" class="header-link text-btn header-link_mob"
             data-component="animated-link">
            <div class="text-btn__cap">Competencies</div>
          </a>
        </div>
      </nav>
      <a href="<?php echo get_home_url(); ?>" class="logo header__logo">
        <figure>
          <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/logo-dark.svg" class="logo__img"
               alt="Light Logo">
          <figcaption aria-hidden="true">Main page</figcaption>
        </figure>
      </a>
      <nav class="header-nav header-nav_right header__right">
        <div class="header-nav__inner">
          <a href="<?php echo esc_url(site_url('/contact/')); ?>" class="header-link text-btn"
             data-component="animated-link">
            <div class="text-btn__cap">Contact</div>
          </a>
          <form name="header-theme-switch" class="theme-switch header__theme-switch" data-component="theme-switch">
            <label class="switch switch_theme">
              <input type="checkbox" name="theme" checked="checked">
              <svg class="switch__thumb theme-switch__thumb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <defs>
                  <clipPath id="theme-switch-moon">
                    <path d="M0 0 H30 a 10 10 0 0 0 6 18 V 20 H 0 V 0z" class="switch__moon-clip"/>
                  </clipPath>
                </defs>
                <circle cx="10" cy="10" r="10" fill="var(--inc-switch-thumb-color)"
                        clip-path="url(#theme-switch-moon)"/>
              </svg>
            </label>
          </form>
        </div>
      </nav>
      <button type="button" class="burger-btn header__burger-btn" data-drawer-toggle="burger-menu">
        <span></span>
        <span></span>
      </button>
    </div>
    <nav id="header-submenu" class="header-submenu header__submenu" data-component="disclosure"
         data-component="submenu">
      <div class="header-submenu__inner">
        <div class="header-submenu__body" data-elem="disclosure.inner">
          <section class="header-submenu__section" data-submenu-elem="body->about">
            <?php
            if (has_nav_menu('about-menu')) {
              wp_nav_menu(array(
                'theme_location' => 'about-menu',  // Локация зарегистрированного меню
                'menu_class' => 'desktop-menu',  // Класс для десктопной версии
                'container' => false,  // Убираем обертку div
                'items_wrap' => '%3$s',  // Убираем обертки ul и li
                'walker' => new Custom_Nav_Walker(),  // Используем кастомный Walker
                'fallback_cb' => false,  // Отключаем автоматический вывод, если меню не задано
              ));
            }
            ?>
          </section>
        </div>
      </div>
    </nav>
  </div>
</header>
<div class="header-underlay">
</div>
<div data-lenis-prevent id="burger-menu" class="burger-menu" data-drawer="burger-menu">
  <div class="burger-menu__panel" data-elem="drawer.panel" data-scrollable>
    <div class="section-container burger-menu__container">
      <div class="burger-menu__inner">
        <div class="burger-menu__header">
          <a href="." class="logo burger-menu__logo">
            <figure>
              <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/logo-bright.svg"
                   class="logo__img" alt="Light Logo">
              <figcaption aria-hidden="true">Main page</figcaption>
            </figure>
          </a>
          <button type="button" class="drawer-close-btn burger-menu__close-btn" data-drawer-close="burger-menu">
            <div class="drawer-close-btn__inner">Close burger menu<span class="icon-cubic-plus"></span></div>
          </button>
        </div>
        <nav class="burger-menu__nav">
          <div class="burger-menu__nav-section">
            <a href="<?php echo esc_url(get_post_type_archive_link('work')); ?>" class="header-link reveal-wrap">
              <div class="reveal-wrap__inner">
                <div class="line">WORKS</div>
              </div>
            </a>
          </div>
          <div class="disclosure burger-menu__nav-section" data-component="disclosure">
            <button type="button"
                    class="reveal-wrap header-link header-link_ref header-link_pointer burger-menu__disclosure-btn"
                    data-elem="disclosure.toggle-btn">
              <div class="reveal-wrap__inner">
                <div class="line">About<span class="icon-cubic-check-arrow"></span></div>
              </div>
            </button>
            <div class="disclosure__body">
              <div class="disclosure__inner" data-elem="disclosure.inner">
                <div class="burger-submenu">
                  <div class="burger-submenu__inner">
                    <?php
                    if (has_nav_menu('about-menu')) {
                      wp_nav_menu(array(
                        'theme_location' => 'about-menu',  // Локация зарегистрированного меню
                        'menu_class' => 'mobile-menu',  // Класс для мобильной версии
                        'container' => false,  // Убираем обертку div
                        'items_wrap' => '%3$s',  // Убираем обертки ul и li
                        'walker' => new Custom_Nav_Walker(),  // Используем кастомный Walker
                        'fallback_cb' => false,  // Отключаем автоматический вывод, если меню не задано
                      ));
                    }
                    ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="burger-menu__nav-section">
            <a href="<?php echo esc_url(site_url('/competencies/')); ?>"
               class="reveal-wrap header-link header-link_desc">
              <div class="reveal-wrap__inner">
                <div class="line">Competencies</div>
              </div>
            </a>
            <a href="<?php echo esc_url(site_url('/competencies/')); ?>"
               class="reveal-wrap header-link header-link_mob">
              <div class="reveal-wrap__inner">
                <div class="line">Competencies</div>
              </div>
            </a>
          </div>
          <div class="burger-menu__nav-section">
            <a href="<?php echo esc_url(site_url('/contact/')); ?>" class="reveal-wrap header-link">
              <div class="reveal-wrap__inner">
                <div class="line">Contact</div>
              </div>
            </a>
          </div>
        </nav>
        <form name="burger-theme-switch" class="theme-switch burger-menu__theme-switch" data-component="theme-switch">
          <label class="switch switch_theme">
            <input type="checkbox" name="theme" checked="checked">
            <svg class="switch__thumb theme-switch__thumb" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <defs>
                <clipPath id="theme-switch-moon">
                  <path d="M0 0 H30 a 10 10 0 0 0 6 18 V 20 H 0 V 0z" class="switch__moon-clip"/>
                </clipPath>
              </defs>
              <circle cx="10" cy="10" r="10" fill="var(--inc-switch-thumb-color)"
                      clip-path="url(#theme-switch-moon)"/>
            </svg>
          </label>
        </form>
      </div>
    </div>
  </div>
</div>

<section class="burger-btn-layer">
  <div class="section-container burger-btn-layer__container">
    <div class="burger-btn-layer__inner">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo burger-btn-layer__logo">
        <figure>
          <img src="<?php echo get_template_directory_uri(); ?>/git-src/build/img/logo-bright.svg" class="logo__img"
               alt="Light Logo">
          <figcaption aria-hidden="true">Main page</figcaption>
        </figure>
      </a>
      <button type="button" class="burger-btn burger-btn-layer__btn" data-drawer-toggle="burger-menu">
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</section>
