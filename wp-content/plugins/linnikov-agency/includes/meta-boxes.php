<?php

// Добавление метабокса для сортировки контейнеров
function linnikov_agency_work_add_sorting_meta_box() {
  add_meta_box(
    'linnikov_agency_work_sorting_meta_box', // ID метабокса
    __('Sort Containers', 'linnikov-agency'), // Название метабокса
    'linnikov_agency_work_sorting_meta_box_callback', // Функция обратного вызова для метабокса
    'work', // Название кастомного поста
    'side', // Положение метабокса
    'default' // Приоритет
  );
}
add_action('add_meta_boxes', 'linnikov_agency_work_add_sorting_meta_box');

// Функция коллбэк для метабокса сортировки
function linnikov_agency_work_sorting_meta_box_callback($post) {
  // Получаем сохраненный порядок контейнеров (если есть)
  $sorted_order = get_post_meta($post->ID, '_sorted_container_order', true);
  $containers = ['single-line-scroll-slider', 'work-pictures-tails', 'two-lines-scroll-slider', 'before-after-slider', 'nine-tiles'];

  // Фильтруем отключённые контейнеры
  $active_containers = [];
  foreach ($containers as $container) {
    $disable_meta_key = '_disable_' . str_replace('-', '_', $container);
    if (get_post_meta($post->ID, $disable_meta_key, true) !== 'on') {
      $active_containers[] = $container; // Контейнер активен, добавляем его в список
    }
  }

  // Если порядок сохранен, сортируем активные контейнеры
  if ($sorted_order) {
    $sorted_containers = explode(',', $sorted_order);
    $active_containers = array_intersect($sorted_containers, $active_containers); // Убедимся, что сохраняем только активные контейнеры
    $active_containers = array_merge($sorted_containers, array_diff($containers, $sorted_containers)); // Добавляем неотсортированные элементы
  }


  ?>
  <ul id="sortable-containers">
    <?php foreach ($active_containers as $container): ?>
      <li class="ui-state-default" data-id="<?php echo esc_attr($container); ?>">
        <?php echo ucfirst(str_replace('-', ' ', $container)); ?>
      </li>
    <?php endforeach; ?>
  </ul>
  <input type="hidden" name="sorted_container_order" id="sorted_container_order" value="<?php echo esc_attr(implode(',', $active_containers)); ?>" />

  <script>
      jQuery(function($) {
          // Инициализация sortable
          $('#sortable-containers').sortable({
              update: function(event, ui) {
                  var sortedIDs = $('#sortable-containers').sortable('toArray', { attribute: 'data-id' });
                  $('#sorted_container_order').val(sortedIDs.join(','));
              }
          });

          // Функция для показа/скрытия контейнеров на основе состояния чекбоксов
          function updateSortableContainersOnClient() {
              var containerCheckboxMap = {
                  'single-line-scroll-slider': 'input[name="disable_single_line_slider"]',
                  'work-pictures-tails': 'input[name="disable_work_pictures_tails"]',
                  'two-lines-scroll-slider': 'input[name="disable_two_lines_scroll_slider"]',
                  'before-after-slider': 'input[name="disable_before_after_slider"]',
                  'nine-tiles': 'input[name="disable_nine_tiles"]'
              };

              $.each(containerCheckboxMap, function(container, checkboxSelector) {
                  var checkbox = $(checkboxSelector);
                  var containerItem = $('#sortable-containers').find('li[data-id="' + container + '"]');

                  // Логирование чекбокса и его состояния
                  console.log('Checkbox element for ' + container + ':', checkbox);
                  console.log('Checking checkbox for container: ' + container + ' Checked: ' + checkbox.prop('checked'));

                  if (checkbox.length > 0 && !checkbox.prop('checked')) {
                      // Показываем контейнер, если чекбокс не отмечен
                      containerItem.show();
                  } else {
                      // Скрываем контейнер, если чекбокс отмечен
                      containerItem.hide();
                  }
              });

              // Логирование текущего состояния видимых контейнеров
              var visibleContainers = $('#sortable-containers').children(':visible').map(function() {
                  return $(this).data('id');
              }).get();
              console.log('Visible containers:', visibleContainers);
          }

          // Отслеживаем изменение состояния чекбоксов
          $('input[type="checkbox"]').on('change', function() {
              updateSortableContainersOnClient(); // Обновляем видимость при изменении состояния чекбоксов
          });

          // Инициализируем состояние контейнеров при загрузке страницы
          updateSortableContainersOnClient();
      });
  </script>
  <?php
}

// Сохранение данных метабокса сортировки
function linnikov_agency_work_save_sorting_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['sorted_container_order']) || !wp_verify_nonce($_POST['linnikov_agency_slider_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Логирование значения перед сохранением
  error_log('Saving sorted container order: ' . $_POST['sorted_container_order']);

  // Сохранение порядка контейнеров
  if (isset($_POST['sorted_container_order'])) {
    update_post_meta($post_id, '_sorted_container_order', sanitize_text_field($_POST['sorted_container_order']));
  }
}
add_action('save_post', 'linnikov_agency_work_save_sorting_meta_box');

// 1. Блок: hero.
// Добавляем метабокс для изображения Hero
function linnikov_agency_add_hero_meta_box()
{
  add_meta_box(
    'linnikov_agency_hero_meta_box',
    __('Hero Image', 'linnikov-agency'),
    'linnikov_agency_hero_meta_box_callback',
    'work',  // Для какого типа постов добавляем метабокс
    'normal',  // Положение метабокса
    'high'  // Приоритет
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_hero_meta_box');

// Коллбэк функция для метабокса Hero Image
function linnikov_agency_hero_meta_box_callback($post)
{
  // Используем nonce для верификации
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_hero_nonce');

  // Получаем сохраненные значения (если они есть)
  $hero_image_webp = get_post_meta($post->ID, '_linnikov_agency_hero_image_webp', true);

  // Используем изображение 'portfolio.jpeg' по умолчанию
  $preview_image = get_template_directory_uri() . '/src/img/portfolio.jpeg';

  // HTML для полей загрузки изображений
  ?>
  <div style="display: flex; align-items: center;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <div class="eye-icon-wrapper-slider" style="position: relative; cursor: pointer;">
      <span class="eye-icon" style="font-size: 20px;">👁️</span>
      <div class="image-preview-tooltip"
           style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
        <!-- Элемент <img> для предпросмотра изображения -->
        <img src="<?php echo $preview_image; ?>" alt="Preview" id="hero_image_preview"
             style="max-width: 600px; <?php echo empty($preview_image) ? 'display: none;' : ''; ?>">
      </div>
    </div>
  </div>

  <div class="slider-image-row"
       style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

    <div style="width: 100%;">
      <label for="linnikov_agency_hero_image_webp" style="display:block; margin-bottom: 5px;">
        <p style="margin-bottom: 0"><?php _e('WebP', 'linnikov-agency'); ?></p>
        <!-- Элемент <img> для предпросмотра изображения -->
        <img src="<?php echo $hero_image_webp; ?>" alt="WebP Preview" id="current_hero_image_preview"
             style="display:block; margin-top: 5px; width: 150px; <?php echo empty($preview_image) ? 'display: none;' : ''; ?>">
      </label>
      <input type="text" name="linnikov_agency_hero_image_webp" id="linnikov_agency_hero_image_webp"
             value="<?php echo esc_attr($hero_image_webp); ?>" size="50" style="width: 100%; margin-bottom: 10px;"/>
      <input type="button" class="button upload-slider-image-webp" id="linnikov_agency_hero_image_webp_button"
             value="<?php _e('Upload WebP', 'linnikov-agency'); ?>"/>
    </div>

    <div style="text-align: right; margin-top: 10px;">
      <input type="button" class="button remove-hero-images" id="linnikov_agency_remove_hero_images_button"
             value="<?php _e('Remove Image', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;"/>
    </div>
  </div>

  <script>
      jQuery(document).ready(function ($) {
          $('#linnikov_agency_hero_image_webp_button').click(function (e) {
              e.preventDefault();
              var image = wp.media({
                  title: '<?php _e('Upload Image', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function () {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  $('#linnikov_agency_hero_image_webp').val(image_url);

                  // Обновление превью после добавления изображения
                  $('#current_hero_image_preview').attr('src', image_url).show();
                  $('#hero_image_preview').attr('src', image_url).show();
              });
          });

          $('#linnikov_agency_remove_hero_images_button').click(function (e) {
              e.preventDefault();
              $('#linnikov_agency_hero_image_webp').val('');
              $('#current_hero_image_preview').hide();
              $('#hero_image_preview').hide();
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса Hero
function linnikov_agency_save_hero_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_hero_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_hero_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных
  $new_webp = (isset($_POST['linnikov_agency_hero_image_webp']) ? sanitize_text_field($_POST['linnikov_agency_hero_image_webp']) : '');

  update_post_meta($post_id, '_linnikov_agency_hero_image_webp', $new_webp);
}

add_action('save_post', 'linnikov_agency_save_hero_meta_box');

// 2. Блок: single-line-scroll-slider.
// Добавление метабокса для слайдера
function linnikov_agency_add_slider_meta_box()
{
  add_meta_box(
    'linnikov_agency_slider_meta_box',
    __('Single Line Scroll Slider', 'linnikov-agency'),
    'linnikov_agency_slider_meta_box_callback',
    'work',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_slider_meta_box');

// Коллбэк функция для метабокса слайдера
function linnikov_agency_slider_meta_box_callback($post)
{
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_slider_nonce');
  $slider_images = get_post_meta($post->ID, '_linnikov_agency_slider_images', true);

  if (!is_array($slider_images) || empty($slider_images)) {
    $slider_images = [['webp' => '']]; // Если нет изображений, используем пустой массив
  }
  // Добавление чекбокса для отключения контейнера
  $disable_slider = get_post_meta($post->ID, '_disable_single_line_slider', true);
  ?>
  <p style="background: lightcoral; padding: 1rem">
    <input type="checkbox" name="disable_single_line_slider"
           id="disable_single_line_slider" <?php checked($disable_slider, 'on'); ?> />
    <label for="disable_single_line_slider"><?php _e('Disable this on frontend', 'linnikov-agency'); ?></label>
  </p>
  <?php

  // Используем изображение 'portfolio.jpeg' по умолчанию
  $preview_image = get_template_directory_uri() . '/src/img/portfolio2.jpeg';

  // HTML для полей загрузки изображений
  ?>
  <div style="display: flex; align-items: center;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <div class="eye-icon-wrapper-slider" style="position: relative; cursor: pointer;">
      <span class="eye-icon" style="font-size: 20px;">👁️</span>
      <div class="image-preview-tooltip"
           style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
        <img src="<?php echo $preview_image; ?>" alt="Preview" id="slider_hero_image_preview"
             style="max-width: 600px; <?php echo empty($preview_image) ? 'display: none;' : ''; ?>">
      </div>
    </div>
  </div>

  <div id="slider-images-wrapper">
    <?php foreach ($slider_images as $index => $image): ?>
      <div class="slider-image-row"
           style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="width: 100%;">
            <label for="slider_images_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <p style="margin-bottom: 0"><?php _e('WebP', 'linnikov-agency'); ?></p>
              <img src="<?php echo esc_attr($image['webp']); ?>" alt="WebP Preview"
                   id="current_slider_image_preview_<?php echo $index; ?>"
                   style="display: <?php echo $image['webp'] ? 'block' : 'none'; ?>; margin-top: 5px; width: 150px;">
            </label>
            <input type="text" name="slider_images[<?php echo $index; ?>][webp]"
                   id="slider_images_<?php echo $index; ?>_webp" value="<?php echo esc_attr($image['webp']); ?>"
                   size="50" style="width: 100%; margin-bottom: 10px;"/>
            <input type="button" class="button upload-slider-image-webp"
                   value="<?php _e('Upload WebP', 'linnikov-agency'); ?>"/>
          </div>
        </div>

        <div style="text-align: right;">
          <input type="button" class="button remove-slider-image"
                 value="<?php _e('Remove Image', 'linnikov-agency'); ?>"
                 style="background-color: #dc3232; color: #fff;"/>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <p><input type="button" class="button add-slider-image" value="<?php _e('Add New Image', 'linnikov-agency'); ?>"/></p>

  <script>
      jQuery(document).ready(function ($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-slider').hover(function () {
              $(this).find('.image-preview-tooltip').toggle();
          });

          // Добавление новой строки для изображения
          function addImageRow() {
              var index = $('#slider-images-wrapper .slider-image-row').length;
              var newRow = `
                    <div class="slider-image-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <div style="width: 100%;">
                                <label for="slider_images_${index}_webp" style="display:block; margin-bottom: 5px;"><?php _e('WebP', 'linnikov-agency'); ?></label>
                                <img src="" alt="WebP Preview" id="current_slider_image_preview_${index}" style="display: none; margin-top: 5px; width: 150px;">
                                <input type="text" name="slider_images[${index}][webp]" id="slider_images_${index}_webp" size="50" style="width: 100%; margin-bottom: 10px;" />
                                <input type="button" class="button upload-slider-image-webp" value="<?php _e('Upload WebP', 'linnikov-agency'); ?>" />
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <input type="button" class="button remove-slider-image" value="<?php _e('Remove Image', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;" />
                        </div>
                    </div>`;
              $('#slider-images-wrapper').append(newRow);
          }

          function removeImageRow(event) {
              $(event.target).closest('.slider-image-row').remove();
          }

          // Загрузка изображения WebP и обновление превью
          $('#slider-images-wrapper').on('click', '.upload-slider-image-webp', function (e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function () {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;

                  // Находим соответствующее превью и обновляем его
                  button.closest('.slider-image-row').find('img').attr('src', image_url).show();
                  button.prev().val(image_url);
              });
          });

          $('#slider-images-wrapper').on('click', '.remove-slider-image', removeImageRow);

          $('.add-slider-image').on('click', addImageRow);
      });
  </script>
  <?php
}

// Сохранение данных метабокса слайдера
function linnikov_agency_save_slider_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_slider_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_slider_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных слайдера
  if (isset($_POST['slider_images'])) {
    $slider_images = array_map(function ($image) {
      return [
        'webp' => sanitize_text_field($image['webp']),
      ];
    }, $_POST['slider_images']);

    update_post_meta($post_id, '_linnikov_agency_slider_images', $slider_images);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_slider_images');
  }

  // Сохранение состояния чекбокса для отключения контейнера
  if (isset($_POST['disable_single_line_slider']) && $_POST['disable_single_line_slider'] === 'on') {
    update_post_meta($post_id, '_disable_single_line_slider', 'on');
  } else {
    update_post_meta($post_id, '_disable_single_line_slider', 'off');
  }
}

add_action('save_post', 'linnikov_agency_save_slider_meta_box');

// 3. Блок: work-pictures-tails
// Добавление метабокса для блока work-pictures-tails
function linnikov_agency_add_work_pictures_tails_meta_box()
{
  add_meta_box(
    'linnikov_agency_work_pictures_tails_meta_box',
    __('Work Pictures Tails', 'linnikov-agency'),
    'linnikov_agency_work_pictures_tails_meta_box_callback',
    'work',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_work_pictures_tails_meta_box');

// Коллбэк функция для метабокса work-pictures-tails
function linnikov_agency_work_pictures_tails_meta_box_callback($post)
{
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_work_pictures_tails_nonce');
  $pictures = get_post_meta($post->ID, '_linnikov_agency_work_pictures', true);
  $video_url = get_post_meta($post->ID, '_linnikov_agency_work_video_url', true);
  $video_poster_webp = get_post_meta($post->ID, '_linnikov_agency_work_video_poster_webp', true);

  // Используем изображение 'portfolio.jpeg' по умолчанию
  $preview_image = get_template_directory_uri() . '/src/img/portfolio3.jpeg';

  // Инициализация массива для изображений, если он пустой
  if (!is_array($pictures) || empty($pictures)) {
    $pictures = [
      ['webp' => ''],
      ['webp' => ''],
      ['webp' => '']
    ];
  }

  // Добавление чекбокса для отключения контейнера
  $disable_slider = get_post_meta($post->ID, '_disable_work_pictures_tails', true);
  ?>
  <p style="background: lightcoral; padding: 1rem">
    <input type="checkbox" name="disable_work_pictures_tails"
           id="disable_work_pictures_tails" <?php checked($disable_slider, 'on'); ?> />
    <label for="disable_work_pictures_tails"><?php _e('Disable this on frontend', 'linnikov-agency'); ?></label>
  </p>
  <?php

  // HTML для полей загрузки изображений
  ?>

  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <div class="eye-icon-wrapper-tails" style="position: relative; cursor: pointer;">
      <span class="eye-icon" style="font-size: 20px;">👁️</span>
      <div class="image-preview-tooltip-tails"
           style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
        <img src="<?php echo $preview_image; ?>" alt="Preview" id="work_picture_preview"
             style="max-width: 600px; <?php echo empty($preview_image) ? 'display: none;' : ''; ?>">
      </div>
    </div>
  </div>

  <div id="work-pictures-wrapper">
    <?php foreach ($pictures as $index => $picture): ?>
      <div class="work-picture-row-tails"
           style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="width: 100%;">
            <label for="work_picture_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <p style="margin-bottom: 0"><?php _e('WebP', 'linnikov-agency'); ?></p>
              <img src="<?php echo esc_attr($picture['webp']); ?>" alt="WebP Preview"
                   id="current_work_picture_preview_<?php echo $index; ?>"
                   style="display: <?php echo $picture['webp'] ? 'block' : 'none'; ?>; margin-top: 5px; width: 150px;">
            </label>
            <input type="text" name="work_pictures[<?php echo $index; ?>][webp]"
                   id="work_picture_<?php echo $index; ?>_webp" value="<?php echo esc_attr($picture['webp']); ?>"
                   size="50" style="width: 100%; margin-bottom: 10px;"/>
            <input type="button" class="button upload-work-picture-webp-tails"
                   value="<?php _e('Upload WebP', 'linnikov-agency'); ?>"/>
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-work-picture-tails"
                 value="<?php _e('Clear Image', 'linnikov-agency'); ?>"
                 style="background-color: #dc3232; color: #fff;"/>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <div style="margin-bottom: 20px;">
    <label for="work_video_url"
           style="display:block; margin-bottom: 5px;"><?php _e('Video URL', 'linnikov-agency'); ?></label>
    <input type="text" name="work_video_url" id="work_video_url" value="<?php echo esc_attr($video_url); ?>" size="50"
           style="width: 100%;"/>
  </div>

  <div class="video-poster-wrapper" style="margin-bottom: 20px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <div style="width: 100%;">
        <label for="work_video_poster_webp" style="display:block; margin-bottom: 5px;">
          <?php _e('Video Poster WebP', 'linnikov-agency'); ?>
          <img src="<?php echo esc_attr($video_poster_webp); ?>" alt="Poster WebP Preview"
               style="display: <?php echo $video_poster_webp ? 'block' : 'none'; ?>; margin-top: 5px; width: 150px;">
        </label>
        <input type="text" name="work_video_poster_webp" id="work_video_poster_webp"
               value="<?php echo esc_attr($video_poster_webp); ?>" size="50" style="width: 100%; margin-bottom: 10px;"/>
        <input type="button" class="button upload-video-poster-webp"
               value="<?php _e('Upload WebP', 'linnikov-agency'); ?>"/>
      </div>
    </div>
  </div>

  <script>
      jQuery(document).ready(function ($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-tails').hover(function () {
              $(this).find('.image-preview-tooltip-tails').toggle();
          });

          // Загрузка изображения WebP и обновление превью
          $('#work-pictures-wrapper').on('click', '.upload-work-picture-webp-tails', function (e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function () {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;

                  // Находим соответствующее превью и обновляем его
                  button.closest('.work-picture-row-tails').find('img').attr('src', image_url).show();
                  button.prev().val(image_url);
              });
          });

          // Загрузка постеров для видео и обновление превью
          $('.video-poster-wrapper').on('click', '.upload-video-poster-webp', function (e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function () {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;

                  // Находим элемент <img> для превью постера и обновляем его
                  button.prev('input[type="text"]').val(image_url); // обновляем поле
                  button.prevAll('label').find('img').attr('src', image_url).show(); // обновляем превью
              });
          });

          // Очистка полей изображения
          $('#work-pictures-wrapper').on('click', '.clear-work-picture-tails', function (e) {
              e.preventDefault();
              var row = $(this).closest('.work-picture-row-tails');
              row.find('input[type="text"]').val('');
              row.find('img').attr('src', '').hide();
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса work-pictures-tails
function linnikov_agency_save_work_pictures_tails_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_work_pictures_tails_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_work_pictures_tails_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных изображений
  if (isset($_POST['work_pictures'])) {
    $pictures = array_map(function ($picture) {
      return [
        'webp' => sanitize_text_field($picture['webp']),
      ];
    }, $_POST['work_pictures']);

    update_post_meta($post_id, '_linnikov_agency_work_pictures', $pictures);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_work_pictures');
  }

  // Сохранение ссылки на видео
  if (isset($_POST['work_video_url'])) {
    $video_url = sanitize_text_field($_POST['work_video_url']);
    update_post_meta($post_id, '_linnikov_agency_work_video_url', $video_url);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_work_video_url');
  }

  // Сохранение постеров для видео
  if (isset($_POST['work_video_poster_webp'])) {
    $video_poster_webp = sanitize_text_field($_POST['work_video_poster_webp']);
    update_post_meta($post_id, '_linnikov_agency_work_video_poster_webp', $video_poster_webp);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_work_video_poster_webp');
  }

  // Сохранение состояния чекбокса для отключения контейнера
  if (isset($_POST['disable_work_pictures_tails'])) {
    update_post_meta($post_id, '_disable_work_pictures_tails', 'on');
  } else {
    update_post_meta($post_id, '_disable_work_pictures_tails', 'off');
  }
}

add_action('save_post', 'linnikov_agency_save_work_pictures_tails_meta_box');


// 4. Блок: two-lines-scroll-slider
// Добавление метабокса для блока two-lines-scroll-slider
function linnikov_agency_add_two_lines_scroll_slider_meta_box()
{
  add_meta_box(
    'linnikov_agency_two_lines_scroll_slider_meta_box',
    __('Two Lines Scroll Slider', 'linnikov-agency'),
    'linnikov_agency_two_lines_scroll_slider_meta_box_callback',
    'work',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_two_lines_scroll_slider_meta_box');

// Коллбэк функция для метабокса two-lines-scroll-slider
function linnikov_agency_two_lines_scroll_slider_meta_box_callback($post)
{
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_two_lines_scroll_slider_nonce');
  $pictures = get_post_meta($post->ID, '_linnikov_agency_two_lines_scroll_slider_images', true);

  if (!is_array($pictures) || empty($pictures)) {
    $pictures = [
      ['webp' => ''],
      ['webp' => ''],
      ['webp' => ''],
      ['webp' => ''],
      ['webp' => ''],
      ['webp' => '']
    ];
  }

  // Используем изображение 'portfolio.jpeg' по умолчанию
  $preview_image = get_template_directory_uri() . '/src/img/portfolio4.jpeg';

  // Добавление чекбокса для отключения контейнера
  $disable_slider = get_post_meta($post->ID, '_disable_two_lines_scroll_slider', true);
  ?>
  <p style="background: lightcoral; padding: 1rem">
    <input type="checkbox" name="disable_two_lines_scroll_slider"
           id="disable_two_lines_scroll_slider" <?php checked($disable_slider, 'on'); ?> />
    <label for="disable_two_lines_scroll_slider"><?php _e('Disable this on frontend', 'linnikov-agency'); ?></label>
  </p>

  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <div class="eye-icon-wrapper-two-lines" style="position: relative; cursor: pointer;">
      <span class="eye-icon" style="font-size: 20px;">👁️</span>
      <div class="image-preview-tooltip-two-lines"
           style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
        <img src="<?php echo esc_attr($preview_image); ?>" alt="Preview" style="max-width: 600px;"
             id="two_lines_preview_image">
      </div>
    </div>
  </div>

  <div id="two-lines-scroll-slider-wrapper">
    <?php foreach ($pictures as $index => $picture): ?>
      <div class="two-lines-scroll-slider-row"
           style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="width: 5%; cursor: move;" class="drag-handle">
            <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
          </div>

          <div style="width: 90%;">
            <label for="two_lines_scroll_slider_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <p style="margin-bottom: 0"><?php _e('WebP', 'linnikov-agency'); ?></p>
              <img src="<?php echo esc_attr($picture['webp']); ?>" alt="WebP Preview"
                   id="current_two_lines_scroll_slider_preview_<?php echo $index; ?>"
                   style="display: <?php echo $picture['webp'] ? 'block' : 'none'; ?>; margin-top: 5px; width: 150px;">
            </label>
            <input type="text" name="two_lines_scroll_slider_images[<?php echo $index; ?>][webp]"
                   id="two_lines_scroll_slider_<?php echo $index; ?>_webp"
                   value="<?php echo esc_attr($picture['webp']); ?>" size="50"
                   style="width: 100%; margin-bottom: 10px;"/>
            <input type="button" class="button upload-two-lines-scroll-slider-webp"
                   value="<?php _e('Upload WebP', 'linnikov-agency'); ?>"/>
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-two-lines-scroll-slider"
                 value="<?php _e('Clear Image', 'linnikov-agency'); ?>"
                 style="background-color: #dc3232; color: #fff;"/>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <script>
      jQuery(document).ready(function ($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-two-lines').hover(function () {
              $(this).find('.image-preview-tooltip-two-lines').toggle();
          });

          $('#two-lines-scroll-slider-wrapper').sortable({
              handle: '.drag-handle', // Перетаскивание только за иконку
              update: function (event, ui) {
                  // Здесь можно обновить порядок, если это нужно сделать в реальном времени
              }
          });

          // Загрузка изображения WebP и обновление превью
          $('#two-lines-scroll-slider-wrapper').on('click', '.upload-two-lines-scroll-slider-webp', function (e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function () {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;

                  // Находим соответствующее превью и обновляем его
                  button.closest('.two-lines-scroll-slider-row').find('label img').attr('src', image_url).show();
                  button.prev().val(image_url);
              });
          });

          // Очистка полей изображения
          $('#two-lines-scroll-slider-wrapper').on('click', '.clear-two-lines-scroll-slider', function (e) {
              e.preventDefault();
              var row = $(this).closest('.two-lines-scroll-slider-row');
              row.find('input[type="text"]').val('');
              row.find('img').attr('src', '').hide();
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса two-lines-scroll-slider
function linnikov_agency_save_two_lines_scroll_slider_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_two_lines_scroll_slider_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_two_lines_scroll_slider_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных изображений
  if (isset($_POST['two_lines_scroll_slider_images'])) {
    $pictures = array_map(function ($picture) {
      return [
        'webp' => sanitize_text_field($picture['webp']),
      ];
    }, $_POST['two_lines_scroll_slider_images']);

    update_post_meta($post_id, '_linnikov_agency_two_lines_scroll_slider_images', $pictures);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_two_lines_scroll_slider_images');
  }

  // Сохранение состояния чекбокса для отключения контейнера
  if (isset($_POST['disable_two_lines_scroll_slider'])) {
    update_post_meta($post_id, '_disable_two_lines_scroll_slider', 'on');
  } else {
    update_post_meta($post_id, '_disable_two_lines_scroll_slider', 'off');
  }
}

add_action('save_post', 'linnikov_agency_save_two_lines_scroll_slider_meta_box');

// 5. Блок: before-after-slider
// Добавление метабокса для блока before-after-slider
function linnikov_agency_add_before_after_slider_meta_box()
{
  add_meta_box(
    'linnikov_agency_before_after_slider_meta_box',
    __('Before-After Slider', 'linnikov-agency'),
    'linnikov_agency_before_after_slider_meta_box_callback',
    'work',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_before_after_slider_meta_box');

// Коллбэк функция для метабокса before-after-slider
function linnikov_agency_before_after_slider_meta_box_callback($post)
{
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_before_after_slider_nonce');
  $before_after_images = get_post_meta($post->ID, '_linnikov_agency_before_after_images', true);

  // Инициализация массива для изображений, если он пустой
  if (!is_array($before_after_images) || empty($before_after_images)) {
    $before_after_images = [
      'before' => ['webp' => ''],
      'after' => ['webp' => '']
    ];
  }

  // Добавление чекбокса для отключения контейнера
  $disable_slider = get_post_meta($post->ID, '_disable_before_after_slider', true);
  ?>
  <p style="background: lightcoral; padding: 1rem">
    <input type="checkbox" name="disable_before_after_slider"
           id="disable_before_after_slider" <?php checked($disable_slider, 'on'); ?> />
    <label for="disable_before_after_slider"><?php _e('Disable this on frontend', 'linnikov-agency'); ?></label>
  </p>

  <div id="before-after-slider-wrapper">
    <?php foreach (['before', 'after'] as $key): ?>
      <div class="before-after-slider-row"
           style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">
        <h4><?php echo ucfirst($key); ?> Image</h4>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="width: 100%;">
            <label for="before_after_<?php echo $key; ?>_webp" style="display:block; margin-bottom: 5px;">
              <p style="margin-bottom: 0"><?php _e('WebP Image URL', 'linnikov-agency'); ?></p>
              <img src="<?php echo esc_attr($before_after_images[$key]['webp']); ?>" alt="WebP Preview"
                   id="current_before_after_<?php echo $key; ?>_preview"
                   style="display: <?php echo $before_after_images[$key]['webp'] ? 'block' : 'none'; ?>; margin-top: 5px; width: 150px;">
            </label>
            <input type="text" name="before_after_images[<?php echo $key; ?>][webp]"
                   id="before_after_<?php echo $key; ?>_webp"
                   value="<?php echo esc_attr($before_after_images[$key]['webp']); ?>" size="50"
                   style="width: 100%; margin-bottom: 10px;"/>
            <input type="button" class="button upload-before-after-slider-webp"
                   value="<?php _e('Upload WebP', 'linnikov-agency'); ?>"/>
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-before-after-slider"
                 value="<?php _e('Clear Image', 'linnikov-agency'); ?>"
                 style="background-color: #dc3232; color: #fff;"/>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <script>
      jQuery(document).ready(function ($) {
          // Загрузка изображения WebP и обновление превью
          $('#before-after-slider-wrapper').on('click', '.upload-before-after-slider-webp', function (e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function () {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;

                  // Находим соответствующее превью и обновляем его
                  button.prev().val(image_url);  // Обновляем значение текстового поля
                  button.closest('.before-after-slider-row').find('label img').attr('src', image_url).show();  // Обновляем превью
              });
          });

          // Очистка полей изображения
          $('#before-after-slider-wrapper').on('click', '.clear-before-after-slider', function (e) {
              e.preventDefault();
              var row = $(this).closest('.before-after-slider-row');
              row.find('input[type="text"]').val('');
              row.find('img').attr('src', '').hide();
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса before-after-slider
function linnikov_agency_save_before_after_slider_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_before_after_slider_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_before_after_slider_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных изображений
  if (isset($_POST['before_after_images'])) {
    $before_after_images = array_map(function ($image) {
      return [
        'webp' => sanitize_text_field($image['webp']),
      ];
    }, $_POST['before_after_images']);

    update_post_meta($post_id, '_linnikov_agency_before_after_images', $before_after_images);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_before_after_images');
  }
  // Сохранение состояния чекбокса для отключения контейнера
  if (isset($_POST['disable_before_after_slider'])) {
    update_post_meta($post_id, '_disable_before_after_slider', 'on');
  } else {
    update_post_meta($post_id, '_disable_before_after_slider', 'off');
  }
}

add_action('save_post', 'linnikov_agency_save_before_after_slider_meta_box');

// 6. Блок: nine-tiles
// Добавление метабокса для блока nine-tiles
function linnikov_agency_add_nine_tiles_meta_box()
{
  add_meta_box(
    'linnikov_agency_nine_tiles_meta_box',
    __('Nine Tiles', 'linnikov-agency'),
    'linnikov_agency_nine_tiles_meta_box_callback',
    'work',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_nine_tiles_meta_box');

// Коллбэк функция для метабокса nine-tiles
function linnikov_agency_nine_tiles_meta_box_callback($post)
{
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_nine_tiles_nonce');
  $items = get_post_meta($post->ID, '_linnikov_agency_nine_tiles_items', true);

  if (!is_array($items) || empty($items)) {
    $items = [
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => ''],
      ['type' => 'image', 'webp' => '', 'video' => '']
    ];
  }

  // Используем изображение 'portfolio.jpeg' по умолчанию
  $preview_image = get_template_directory_uri() . '/src/img/portfolio5.jpeg';
// Добавление чекбокса для отключения контейнера
  $disable_slider = get_post_meta($post->ID, '_disable_nine_tiles', true);
  ?>
  <p style="background: lightcoral; padding: 1rem">
    <input type="checkbox" name="disable_nine_tiles" id="disable_nine_tiles" <?php checked($disable_slider, 'on'); ?> />
    <label for="disable_nine_tiles"><?php _e('Disable this on frontend', 'linnikov-agency'); ?></label>
  </p>


  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <div class="eye-icon-wrapper-nine-tiles" style="position: relative; cursor: pointer;">
      <span class="eye-icon" style="font-size: 20px;">👁️</span>
      <div class="image-preview-tooltip-nine-tiles"
           style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
        <img src="<?php echo esc_attr($preview_image); ?>" alt="Preview" style="max-width: 600px;"
             id="nine_tiles_preview">
      </div>
    </div>
  </div>

  <div id="nine-tiles-wrapper">
    <?php foreach ($items as $index => $item): ?>
      <div class="nine-tiles-row"
           style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="width: 5%; cursor: move;" class="drag-handle">
            <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
          </div>
          <div style="width: 20%;">
            <label for="nine_tiles_<?php echo $index; ?>_type" style="display:block; margin-bottom: 5px;">
              <?php _e('Type', 'linnikov-agency'); ?>
            </label>
            <select name="nine_tiles_items[<?php echo $index; ?>][type]" id="nine_tiles_<?php echo $index; ?>_type"
                    class="nine-tiles-type" style="width: 100%;">
              <option
                  value="image" <?php selected($item['type'], 'image'); ?>><?php _e('Image', 'linnikov-agency'); ?></option>
              <option
                  value="video" <?php selected($item['type'], 'video'); ?>><?php _e('Video', 'linnikov-agency'); ?></option>
            </select>
          </div>
          <div class="nine-tiles-image-fields"
               style="width: 30%; <?php if ($item['type'] == 'video') echo 'display:none;'; ?>">
            <label for="nine_tiles_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <?php _e('WebP', 'linnikov-agency'); ?>
              <img src="<?php echo esc_attr($item['webp']); ?>" alt="WebP Preview"
                   id="current_nine_tiles_<?php echo $index; ?>_preview"
                   style="display: <?php echo $item['webp'] ? 'block' : 'none'; ?>; margin-top: 5px; width: 150px;">
            </label>
            <input type="text" name="nine_tiles_items[<?php echo $index; ?>][webp]"
                   id="nine_tiles_<?php echo $index; ?>_webp" value="<?php echo esc_attr($item['webp']); ?>" size="50"
                   style="width: 100%; margin-bottom: 10px;"/>
            <input type="button" class="button upload-nine-tiles-webp"
                   value="<?php _e('Upload WebP', 'linnikov-agency'); ?>"/>
          </div>

          <div class="nine-tiles-video-field"
               style="width: 65%; <?php if ($item['type'] == 'image') echo 'display:none;'; ?>">
            <label for="nine_tiles_<?php echo $index; ?>_video" style="display:block; margin-bottom: 5px;">
              <?php _e('Video URL', 'linnikov-agency'); ?>
            </label>
            <input type="text" name="nine_tiles_items[<?php echo $index; ?>][video]"
                   id="nine_tiles_<?php echo $index; ?>_video" value="<?php echo esc_attr($item['video']); ?>" size="50"
                   style="width: 100%; margin-bottom: 10px;"/>
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-nine-tiles" value="<?php _e('Clear', 'linnikov-agency'); ?>"
                 style="background-color: #dc3232; color: #fff;"/>
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <script>
      jQuery(document).ready(function ($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-nine-tiles').hover(function () {
              $(this).find('.image-preview-tooltip-nine-tiles').toggle();
          });

          $('#nine-tiles-wrapper').sortable({
              handle: '.drag-handle', // Перетаскивание только за иконку
              update: function (event, ui) {
                  // Здесь можно обновить порядок, если это нужно сделать в реальном времени
              }
          });

          $('.nine-tiles-type').change(function () {
              var type = $(this).val();
              var row = $(this).closest('.nine-tiles-row');
              if (type === 'image') {
                  row.find('.nine-tiles-image-fields').show();
                  row.find('.nine-tiles-video-field').hide();
              } else if (type === 'video') {
                  row.find('.nine-tiles-image-fields').hide();
                  row.find('.nine-tiles-video-field').show();
              }
          });

          // Загрузка изображения WebP и обновление превью
          $('#nine-tiles-wrapper').on('click', '.upload-nine-tiles-webp', function (e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function () {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;

                  // Находим соответствующее превью и обновляем его
                  button.prev().val(image_url);  // Обновляем значение текстового поля
                  button.closest('.nine-tiles-image-fields').find('img').attr('src', image_url).show();  // Обновляем превью
              });
          });

          // Очистка полей изображения и видео
          $('#nine-tiles-wrapper').on('click', '.clear-nine-tiles', function (e) {
              e.preventDefault();
              var row = $(this).closest('.nine-tiles-row');
              row.find('input[type="text"]').val('');
              row.find('img').attr('src', '').hide();
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса nine-tiles
function linnikov_agency_save_nine_tiles_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_nine_tiles_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_nine_tiles_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных изображений и видео
  if (isset($_POST['nine_tiles_items'])) {
    $items = array_map(function ($item) {
      return [
        'type' => sanitize_text_field($item['type']),
        'webp' => sanitize_text_field($item['webp']),
        'video' => sanitize_text_field($item['video']),
      ];
    }, $_POST['nine_tiles_items']);

    update_post_meta($post_id, '_linnikov_agency_nine_tiles_items', $items);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_nine_tiles_items');
  }

  // Сохранение состояния чекбокса для отключения контейнера
  if (isset($_POST['disable_nine_tiles'])) {
    update_post_meta($post_id, '_disable_nine_tiles', 'on');
  } else {
    update_post_meta($post_id, '_disable_nine_tiles', 'off');
  }
}

add_action('save_post', 'linnikov_agency_save_nine_tiles_meta_box');

// 7. Блок: more-works
// Добавление метабокса для блока more-works
function linnikov_agency_add_more_works_meta_box()
{
  add_meta_box(
    'linnikov_agency_more_works_meta_box',
    __('Related Works', 'linnikov-agency'),
    'linnikov_agency_more_works_meta_box_callback',
    'work',
    'normal',
    'high'
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_more_works_meta_box');

// Коллбэк функция для метабокса more-works
function linnikov_agency_more_works_meta_box_callback($post)
{
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_more_works_nonce');

  // Получаем список всех работ (постов типа "work")
  $args = array(
    'post_type' => 'work',
    'posts_per_page' => -1,
    'post_status' => 'publish',
    // 'post__not_in' => array($post->ID), // исключаем текущий пост
  );
  $works = get_posts($args);

  // Получаем сохраненные связанные работы
  $selected_works = get_post_meta($post->ID, '_linnikov_agency_related_works', true);
  if (!is_array($selected_works)) {
    $selected_works = [];
  }

  // Чекбокс для выбора всех работ
  echo '<label>';
  echo '<input type="checkbox" id="select-all-works" /> ';
  echo __('Select All Works', 'linnikov-agency');
  echo '</label>';

  echo '<ul id="works-list">';
  foreach ($works as $work) {
    $checked = in_array($work->ID, $selected_works) ? 'checked' : '';
    echo '<li>';
    echo '<label>';
    echo '<input type="checkbox" name="related_works[]" value="' . esc_attr($work->ID) . '" ' . $checked . ' class="related-work-checkbox" /> ';
    echo esc_html($work->post_title);
    echo '</label>';
    echo '</li>';
  }
  echo '</ul>';

  // Добавляем скрипт для управления выбором всех чекбоксов
  ?>
  <script>
      document.addEventListener('DOMContentLoaded', function () {
          const selectAllCheckbox = document.getElementById('select-all-works');
          const workCheckboxes = document.querySelectorAll('.related-work-checkbox');

          // Обработка нажатия на чекбокс "Select All"
          selectAllCheckbox.addEventListener('change', function () {
              workCheckboxes.forEach(function (checkbox) {
                  checkbox.checked = selectAllCheckbox.checked;
              });
          });

          // Если один из чекбоксов изменяется вручную, отменяем выбор "Select All"
          workCheckboxes.forEach(function (checkbox) {
              checkbox.addEventListener('change', function () {
                  if (!checkbox.checked) {
                      selectAllCheckbox.checked = false;
                  } else if (Array.from(workCheckboxes).every(cb => cb.checked)) {
                      selectAllCheckbox.checked = true;
                  }
              });
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса more-works
function linnikov_agency_save_more_works_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_more_works_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_more_works_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение выбранных работ
  if (isset($_POST['related_works'])) {
    $related_works = array_map('sanitize_text_field', $_POST['related_works']);
    update_post_meta($post_id, '_linnikov_agency_related_works', $related_works);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_related_works');
  }
}

add_action('save_post', 'linnikov_agency_save_more_works_meta_box');

// 8. Блок: work-details
// Добавление метабокса для Project Info
function linnikov_agency_add_project_info_meta_box()
{
  add_meta_box(
    'linnikov_agency_project_info_meta_box', // Идентификатор метабокса
    __('Project Info', 'linnikov-agency'), // Заголовок метабокса
    'linnikov_agency_project_info_meta_box_callback', // Коллбэк-функция для вывода полей
    'work', // Тип поста
    'normal', // Позиция
    'high' // Приоритет
  );
}

add_action('add_meta_boxes', 'linnikov_agency_add_project_info_meta_box');

// Коллбэк-функция для метабокса Project Info
function linnikov_agency_project_info_meta_box_callback($post)
{
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_project_info_nonce');

  // Получаем сохраненные значения
  $challenge_description = get_post_meta($post->ID, '_linnikov_agency_challenge_description', true);
  $strategy_description = get_post_meta($post->ID, '_linnikov_agency_strategy_description', true);
  $strategy_quote = get_post_meta($post->ID, '_linnikov_agency_strategy_quote', true);
  $strategy_author = get_post_meta($post->ID, '_linnikov_agency_strategy_author', true);
  $strategy_role = get_post_meta($post->ID, '_linnikov_agency_strategy_role', true);
  $solution_description = get_post_meta($post->ID, '_linnikov_agency_solution_description', true);
  // Получаем сохраненные значения для секции Results
  $results_description = get_post_meta($post->ID, '_linnikov_agency_results_description', true);
  $count_up_sections = get_post_meta($post->ID, '_linnikov_agency_count_up_sections', true); // Здесь хранятся все секции Count-up

  $team_members = get_post_meta($post->ID, '_linnikov_agency_team_members', true);

  // Получаем сохраненные значения для секции Awards
  $awards = get_post_meta($post->ID, '_linnikov_agency_awards', true);


  // Секция Challenge
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Challenge', 'linnikov-agency') . '</h4>';

  echo '<label for="linnikov_agency_challenge_description">' . __('Description', 'linnikov-agency') . '</label>';
  wp_editor(
    $challenge_description, // Содержимое редактора
    'linnikov_agency_challenge_description', // ID поля
    array(
      'textarea_name' => 'linnikov_agency_challenge_description',
      'textarea_rows' => 6,
      'media_buttons' => false, // Скрыть кнопку добавления медиафайлов, если не требуется
    )
  );
  echo '</div>';

  // Секция Strategy
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Strategy', 'linnikov-agency') . '</h4>';

  echo '<label for="linnikov_agency_strategy_description">' . __('Description', 'linnikov-agency') . '</label>';
  wp_editor($strategy_description, 'linnikov_agency_strategy_description', array(
    'textarea_name' => 'linnikov_agency_strategy_description',
    'textarea_rows' => 6,
    'media_buttons' => false,
  ));

  echo '<label for="linnikov_agency_strategy_quote" style="margin-top: 15px;">' . __('Quote', 'linnikov-agency') . '</label>';
  echo '<textarea name="linnikov_agency_strategy_quote" rows="4" style="width:100%;">' . esc_textarea($strategy_quote) . '</textarea>';

  echo '<label for="linnikov_agency_strategy_author" style="margin-top: 15px;">' . __('Author', 'linnikov-agency') . '</label>';
  echo '<input type="text" name="linnikov_agency_strategy_author" value="' . esc_attr($strategy_author) . '" style="width:100%;" />';

  echo '<label for="linnikov_agency_strategy_role" style="margin-top: 15px;">' . __('Role', 'linnikov-agency') . '</label>';
  echo '<input type="text" name="linnikov_agency_strategy_role" value="' . esc_attr($strategy_role) . '" style="width:100%;" />';

  echo '</div>';

  // Секция Solution
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Solution', 'linnikov-agency') . '</h4>';

  wp_editor(
    $solution_description, // Содержимое редактора
    'linnikov_agency_solution_description', // ID поля
    array(
      'textarea_name' => 'linnikov_agency_solution_description',
      'textarea_rows' => 6,
      'media_buttons' => false, // Скрыть кнопку добавления медиафайлов, если не требуется
    )
  );

  echo '</div>';

  // Секция Results
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Results', 'linnikov-agency') . '</h4>';

  wp_editor(
    $results_description, // Содержимое редактора
    'linnikov_agency_results_description', // ID поля
    array(
      'textarea_name' => 'linnikov_agency_results_description',
      'textarea_rows' => 6,
      'media_buttons' => false, // Скрыть кнопку добавления медиафайлов, если не требуется
    )
  );

  echo '</div>';

  // Секция Count-up Cells
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Count-up Cells', 'linnikov-agency') . '</h4>';
  echo '<div id="count-up-sections-container">';

  if (is_array($count_up_sections) && !empty($count_up_sections)) {
    foreach ($count_up_sections as $index => $section) {
      echo '<div class="count-up-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">';

      echo '<label>';
      echo '<input type="checkbox" name="count_up_sections[' . $index . '][plus]" value="1"' . checked($section['plus'], 1, false) . ' />';
      echo __('Plus', 'linnikov-agency');
      echo '</label>';

      echo '<label style="display:block; margin-top:5px;">' . __('Count', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="count_up_sections[' . $index . '][count]" value="' . esc_attr($section['count']) . '" style="width:100%;" />';

      echo '<label style="display:block; margin-top:5px;">' . __('Text', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="count_up_sections[' . $index . '][text]" value="' . esc_attr($section['text']) . '" style="width:100%;" />';

      echo '<button type="button" class="button remove-count-up-section red" style="margin-top: 10px;">' . __('Remove Section', 'linnikov-agency') . '</button>';

      echo '</div>';
    }
  }

  echo '</div>';
  echo '<button type="button" class="button add-count-up-section" style="margin-top: 10px;">' . __('Add New Section', 'linnikov-agency') . '</button>';
  echo '</div>';

  // Секция Team
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Team', 'linnikov-agency') . '</h4>';
  echo '<div id="team-members-container">';

  if (is_array($team_members) && !empty($team_members)) {
    foreach ($team_members as $index => $member) {
      echo '<div class="team-member-item" style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc;">';
      echo '<label>' . __('Name', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="team_members[' . $index . '][name]" value="' . esc_attr($member['name']) . '" style="width:100%; margin-bottom:10px" maxlength="255" />';
      echo '<label style="margin-top: 5px;">' . __('Position', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="team_members[' . $index . '][position]" value="' . esc_attr($member['position']) . '" style="width:100%;" maxlength="255" />';
      echo '<button type="button" class="button remove-team-member red" style="margin-top: 10px;">' . __('Remove Member', 'linnikov-agency') . '</button>';
      echo '</div>';
    }
  }

  echo '</div>';
  echo '<button type="button" class="button add-team-member" style="margin-top: 10px;">' . __('Add New Member', 'linnikov-agency') . '</button>';
  echo '</div>';


  // Секция Awards
  // Внутри функции linnikov_agency_project_info_meta_box_callback
  // Секция Awards
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';
  echo '<h4>' . __('Awards', 'linnikov-agency') . '</h4>';
  echo '<div id="awards-container">';

  if (is_array($awards) && !empty($awards)) {
    foreach ($awards as $index => $award) {
      echo '<div class="award-item" style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc;">';
      echo '<div class="award-item-content">';
      echo '<label>' . __('Year', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="awards[' . $index . '][year]" value="' . esc_attr($award['year']) . '" style="width:100%;" />';
      echo '</div>';

      echo '<div class="award-item-content">';
      echo '<label>' . __('Image', 'linnikov-agency') . '</label>';
      echo '<div class="image-preview-wrapper" style="margin-bottom: 10px;">';
      echo '<img src="' . esc_url($award['img']) . '" alt="' . __('No image selected', 'linnikov-agency') . '" class="image-preview" style="max-width: 150px; display: block;"/>';
      echo '</div>';
      echo '<input type="hidden" name="awards[' . $index . '][img]" class="award-image-url" value="' . esc_attr($award['img']) . '" />';
      echo '<input type="button" class="button upload-award-image" value="' . __('Upload Image', 'linnikov-agency') . '" />';
      echo '</div>';

      echo '<div class="award-item-content">';
      echo '<label>' . __('Award Name', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="awards[' . $index . '][award_name]" value="' . esc_attr($award['award_name']) . '" style="width:100%;" />';
      echo '</div>';

      echo '<div class="award-item-content">';
      echo '<label>' . __('Project Name', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="awards[' . $index . '][project_name]" value="' . esc_attr($award['project_name']) . '" style="width:100%;" />';
      echo '</div>';

      echo '<div class="award-item-content">';
      echo '<label>' . __('Award Place', 'linnikov-agency') . '</label>';
      echo '<input type="text" name="awards[' . $index . '][award_place]" value="' . esc_attr($award['award_place']) . '" style="width:100%;" />';
      echo '</div>';

      echo '<button type="button" class="button remove-award red" style="margin-top: 5px;">' . __('Remove', 'linnikov-agency') . '</button>';
      echo '</div>';
    }
  }

  echo '</div>';
  echo '<button type="button" id="add-award" class="button add-award">' . __('Add New Award', 'linnikov-agency') . '</button>';
  echo '</div>';

  ?>


  <script>
      jQuery(document).ready(function ($) {
          // Функция для добавления новой секции Count-up Cell
          function addCountUpSection() {
              let index = $('.count-up-section').length;
              let newSection = `
            <div class="count-up-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">
                <label><input type="checkbox" name="count_up_sections[${index}][plus]" value="1" /> ${wp.i18n.__('Plus', 'linnikov-agency')}</label>
                <label style="display:block; margin-top:5px;">${wp.i18n.__('Count', 'linnikov-agency')}</label>
                <input type="text" name="count_up_sections[${index}][count]" style="width:100%;" />
                <label style="display:block; margin-top:5px;">${wp.i18n.__('Text', 'linnikov-agency')}</label>
                <input type="text" name="count_up_sections[${index}][text]" style="width:100%;" />
                <button type="button" class="button remove-count-up-section" style="margin-top: 5px;">${wp.i18n.__('Remove Section', 'linnikov-agency')}</button>
            </div>`;
              $('#count-up-sections-container').append(newSection);
          }

          // Обработка добавления новой секции
          $('.add-count-up-section').on('click', function () {
              addCountUpSection();
          });

          // Обработка удаления секции
          $(document).on('click', '.remove-count-up-section', function () {
              $(this).closest('.count-up-section').remove();
          });

          // Функция для добавления нового участника команды
          function addTeamMember() {
              let index = $('.team-member-item').length;
              let newMember = `
                <div class="team-member-item" style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc;">
                    <label>${wp.i18n.__('Name', 'linnikov-agency')}</label>
                    <input type="text" name="team_members[${index}][name]" style="width:100%;" maxlength="255" />
                    <label style="margin-top:5px;">${wp.i18n.__('Position', 'linnikov-agency')}</label>
                    <input type="text" name="team_members[${index}][position]" style="width:100%;" maxlength="255" />
                    <button type="button" class="button remove-team-member" style="margin-top: 5px;">${wp.i18n.__('Remove Member', 'linnikov-agency')}</button>
                </div>`;
              $('#team-members-container').append(newMember);
          }

          // Обработка клика на кнопку добавления участника команды
          $('.add-team-member').on('click', function () {
              addTeamMember();
          });

          // Обработка клика на кнопку удаления участника команды
          $(document).on('click', '.remove-team-member', function () {
              $(this).closest('.team-member-item').remove();
          });

          // Функция для добавления новой карточки Award
          function addAward() {
              let index = $('.award-item').length;
              let newAward = `
            <div class="award-item" style="margin-bottom: 10px; padding: 10px; border: 1px solid #ccc;">
                <div class="award-item-content">
                <label>${wp.i18n.__('Year', 'linnikov-agency')}</label>
                <input type="text" name="awards[${index}][year]" style="width:100%;" />
                </div>

                <div class="award-item-content">
                <label>${wp.i18n.__('Image', 'linnikov-agency')}</label>
                <div class="image-preview-wrapper" style="margin-bottom: 10px;">
                    <img src="" alt="${wp.i18n.__('No image selected', 'linnikov-agency')}" class="image-preview" style="max-width: 150px; display: block;"/>
                </div>
                <input type="hidden" name="awards[${index}][img]" class="award-image-url" />
                <input type="button" class="button upload-award-image" value="${wp.i18n.__('Upload Image', 'linnikov-agency')}" />
                </div>

                <div class="award-item-content">
                <label>${wp.i18n.__('Award Name', 'linnikov-agency')}</label>
                <input type="text" name="awards[${index}][award_name]" style="width:100%;" />
                </div>

                <div class="award-item-content">
                <label>${wp.i18n.__('Project Name', 'linnikov-agency')}</label>
                <input type="text" name="awards[${index}][project_name]" style="width:100%;" />
                </div>

                <div class="award-item-content">
                <label>${wp.i18n.__('Award Place', 'linnikov-agency')}</label>
                <input type="text" name="awards[${index}][award_place]" style="width:100%;" />
                </div>

                <button type="button" class="button remove-award" style="margin-top: 5px;">${wp.i18n.__('Remove', 'linnikov-agency')}</button>
            </div>`;
              $('#awards-container').append(newAward);
          }

          // Обработка клика на кнопку "Add New Award"
          $('#add-award').on('click', function () {
              addAward();
          });

          // Обработка клика на кнопку "Remove" для удаления карточки
          $(document).on('click', '.remove-award', function () {
              $(this).closest('.award-item').remove();
          });

          // Обработка загрузки изображения через медиабиблиотеку
          $(document).on('click', '.upload-award-image', function (e) {
              e.preventDefault();

              let button = $(this);
              let custom_uploader = wp.media({
                  title: wp.i18n.__('Choose Image', 'linnikov-agency'),
                  button: {
                      text: wp.i18n.__('Use this image', 'linnikov-agency')
                  },
                  multiple: false
              }).on('select', function () {
                  let attachment = custom_uploader.state().get('selection').first().toJSON();

                  // Получаем относительный путь
                  let relativeUrl = attachment.url.replace(location.protocol + '//' + location.host + '/', '/');

                  // Обновляем hidden поле с URL изображения и показываем превью
                  button.siblings('.award-image-url').val(relativeUrl);
                  button.siblings('.image-preview-wrapper').find('.image-preview').attr('src', relativeUrl);
              }).open();
          });
      });
  </script>

  <?php
}

// Сохранение данных метабокса Project Info
function linnikov_agency_save_project_info_meta_box($post_id)
{
  // Проверка nonce
  if (!isset($_POST['linnikov_agency_project_info_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_project_info_nonce'], basename(__FILE__))) {
    return $post_id;
  }

  // Проверка автосохранения
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return $post_id;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return $post_id;
  }

  // Сохранение данных блока Challenge
  $new_challenge_description = (isset($_POST['linnikov_agency_challenge_description']) ? wp_kses_post($_POST['linnikov_agency_challenge_description']) : '');
  update_post_meta($post_id, '_linnikov_agency_challenge_description', $new_challenge_description);

  // Сохранение данных блока Strategy
  $new_strategy_description = (isset($_POST['linnikov_agency_strategy_description']) ? wp_kses_post($_POST['linnikov_agency_strategy_description']) : '');
  update_post_meta($post_id, '_linnikov_agency_strategy_description', $new_strategy_description);

  $new_strategy_quote = (isset($_POST['linnikov_agency_strategy_quote']) ? sanitize_textarea_field($_POST['linnikov_agency_strategy_quote']) : '');
  update_post_meta($post_id, '_linnikov_agency_strategy_quote', $new_strategy_quote);

  $new_strategy_author = (isset($_POST['linnikov_agency_strategy_author']) ? sanitize_text_field($_POST['linnikov_agency_strategy_author']) : '');
  update_post_meta($post_id, '_linnikov_agency_strategy_author', $new_strategy_author);

  $new_strategy_role = (isset($_POST['linnikov_agency_strategy_role']) ? sanitize_text_field($_POST['linnikov_agency_strategy_role']) : '');
  update_post_meta($post_id, '_linnikov_agency_strategy_role', $new_strategy_role);

  // Сохранение данных блока Solution
  $new_solution_description = isset($_POST['linnikov_agency_solution_description']) ? wp_kses_post($_POST['linnikov_agency_solution_description']) : '';
  update_post_meta($post_id, '_linnikov_agency_solution_description', $new_solution_description);

  // Сохранение данных блока Results
  $new_results_description = isset($_POST['linnikov_agency_results_description']) ? wp_kses_post($_POST['linnikov_agency_results_description']) : '';
  update_post_meta($post_id, '_linnikov_agency_results_description', $new_results_description);

  // Сохранение данных для Count-up Cells
  if (isset($_POST['count_up_sections']) && is_array($_POST['count_up_sections'])) {
    $count_up_sections = [];

    foreach ($_POST['count_up_sections'] as $section) {
      $count_up_sections[] = [
        'plus' => isset($section['plus']) ? 1 : 0,
        'count' => sanitize_text_field($section['count']),
        'text' => sanitize_text_field($section['text']),
      ];
    }

    update_post_meta($post_id, '_linnikov_agency_count_up_sections', $count_up_sections);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_count_up_sections');
  }

  // Сохранение данных блока Team
  if (isset($_POST['team_members']) && is_array($_POST['team_members'])) {
    $team_members = [];

    foreach ($_POST['team_members'] as $member) {
      $team_members[] = [
        'name' => sanitize_text_field($member['name']),
        'position' => sanitize_text_field($member['position']),
      ];
    }

    update_post_meta($post_id, '_linnikov_agency_team_members', $team_members);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_team_members');
  }

  // Сохранение данных для секции Awards
  if (isset($_POST['awards']) && is_array($_POST['awards'])) {
    $awards = [];

    foreach ($_POST['awards'] as $award) {
      $awards[] = [
        'year' => sanitize_text_field($award['year']),
        'img' => esc_url_raw($award['img']),
        'award_name' => sanitize_text_field($award['award_name']),
        'project_name' => sanitize_text_field($award['project_name']),
        'award_place' => sanitize_text_field($award['award_place']),
      ];
    }

    update_post_meta($post_id, '_linnikov_agency_awards', $awards);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_awards');
  }
}

add_action('save_post', 'linnikov_agency_save_project_info_meta_box');


