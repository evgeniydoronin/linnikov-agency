<?php

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
function linnikov_agency_hero_meta_box_callback($post) {
  // Используем nonce для верификации
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_hero_nonce');

  // Получаем сохраненные значения (если они есть)
  $hero_image_jpg = get_post_meta($post->ID, '_linnikov_agency_hero_image_jpg', true);
  $hero_image_webp = get_post_meta($post->ID, '_linnikov_agency_hero_image_webp', true);

  // Используем первое изображение для предпросмотра
  $preview_image = 'http://localhost:8000/wp-content/uploads/2024/08/05@1560.webp';

  // HTML для полей загрузки изображений
  ?>
  <div style="display: flex; align-items: center;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <?php if ($preview_image): ?>
      <div class="eye-icon-wrapper-slider" style="position: relative; cursor: pointer;">
        <span class="eye-icon" style="font-size: 20px;">👁️</span>
        <div class="image-preview-tooltip" style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <img src="<?php echo esc_attr($preview_image); ?>" alt="Preview" style="max-width: 600px;">
        </div>
      </div>
    <?php endif; ?>
  </div>

  <div class="slider-image-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
      <div style="width: 48%;">
        <label for="linnikov_agency_hero_image_jpg" style="display:block; margin-bottom: 5px;">
          <?php _e('JPG', 'linnikov-agency'); ?>
          <?php if ($hero_image_jpg): ?>
            <img src="<?php echo esc_attr($hero_image_jpg); ?>" alt="JPG Preview" style="display:block; margin-top: 5px; width: 150px;">
          <?php endif; ?>
        </label>
        <input type="text" name="linnikov_agency_hero_image_jpg" id="linnikov_agency_hero_image_jpg" value="<?php echo esc_attr($hero_image_jpg); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
        <input type="button" class="button upload-slider-image-jpg" id="linnikov_agency_hero_image_jpg_button" value="<?php _e('Upload JPG', 'linnikov-agency'); ?>" />
      </div>

      <div style="width: 48%;">
        <label for="linnikov_agency_hero_image_webp" style="display:block; margin-bottom: 5px;">
          <?php _e('WebP', 'linnikov-agency'); ?>
          <?php if ($hero_image_webp): ?>
            <img src="<?php echo esc_attr($hero_image_webp); ?>" alt="WebP Preview" style="display:block; margin-top: 5px; width: 150px;">
          <?php endif; ?>
        </label>
        <input type="text" name="linnikov_agency_hero_image_webp" id="linnikov_agency_hero_image_webp" value="<?php echo esc_attr($hero_image_webp); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
        <input type="button" class="button upload-slider-image-webp" id="linnikov_agency_hero_image_webp_button" value="<?php _e('Upload WebP', 'linnikov-agency'); ?>" />
      </div>
    </div>

    <div style="text-align: right;">
      <input type="button" class="button remove-hero-images" id="linnikov_agency_remove_hero_images_button" value="<?php _e('Remove Images', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;" />
    </div>
  </div>

  <script>
      jQuery(document).ready(function($){
          $('#linnikov_agency_hero_image_jpg_button').click(function(e) {
              e.preventDefault();
              var image = wp.media({
                  title: '<?php _e('Upload Image', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  $('#linnikov_agency_hero_image_jpg').val(image_url);
              });
          });

          $('#linnikov_agency_hero_image_webp_button').click(function(e) {
              e.preventDefault();
              var image = wp.media({
                  title: '<?php _e('Upload Image', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  $('#linnikov_agency_hero_image_webp').val(image_url);
              });
          });

          $('#linnikov_agency_remove_hero_images_button').click(function(e) {
              e.preventDefault();
              $('#linnikov_agency_hero_image_jpg').val('');
              $('#linnikov_agency_hero_image_webp').val('');
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
  $new_jpg = (isset($_POST['linnikov_agency_hero_image_jpg']) ? sanitize_text_field($_POST['linnikov_agency_hero_image_jpg']) : '');
  $new_webp = (isset($_POST['linnikov_agency_hero_image_webp']) ? sanitize_text_field($_POST['linnikov_agency_hero_image_webp']) : '');

  update_post_meta($post_id, '_linnikov_agency_hero_image_jpg', $new_jpg);
  update_post_meta($post_id, '_linnikov_agency_hero_image_webp', $new_webp);
}
add_action('save_post', 'linnikov_agency_save_hero_meta_box');

// Добавление метабокса для редактирования Permalink
if (!function_exists('linnikov_agency_add_permalink_meta_box')) {
  function linnikov_agency_add_permalink_meta_box()
  {
    add_meta_box('edit_permalink', __('Permalink', 'linnikov-agency'), 'linnikov_agency_permalink_meta_box', 'work', 'side', 'high');
  }

  add_action('add_meta_boxes', 'linnikov_agency_add_permalink_meta_box');
}

// Функция вывода метабокса с полем редактирования Permalink
if (!function_exists('linnikov_agency_permalink_meta_box')) {
  function linnikov_agency_permalink_meta_box($post)
  {
    $permalink = get_permalink($post);
    $slug = basename(untrailingslashit($permalink));
    ?>
    <div id="linnikov-agency-permalink-box">
      <label for="editable-slug"><?php _e('Permalink:', 'linnikov-agency'); ?></label>
      <input type="text" id="editable-slug" name="post_name" value="<?php echo esc_attr($slug); ?>"/>
      <p><a href="<?php echo esc_url($permalink); ?>" target="_blank"><?php echo $permalink; ?></a></p>
      <button type="button" class="button button-primary"
              id="save-permalink-button"><?php _e('Save Permalink', 'linnikov-agency'); ?></button>
    </div>
    <?php
    // Nonce для безопасности
    wp_nonce_field('save_permalink_nonce', 'linnikov_agency_permalink_nonce');
  }
}

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
function linnikov_agency_slider_meta_box_callback($post) {
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_slider_nonce');
  $slider_images = get_post_meta($post->ID, '_linnikov_agency_slider_images', true);

  if (!is_array($slider_images) || empty($slider_images)) {
    $slider_images = [['jpg' => '', 'webp' => '']]; // Если нет изображений, используем пустой массив
  }

  // Используем первое изображение для предпросмотра
  $preview_image = 'http://localhost:8000/wp-content/uploads/2024/08/05@1560.webp';
  ?>

  <div style="display: flex; align-items: center;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <?php if ($preview_image): ?>
      <div class="eye-icon-wrapper-slider" style="position: relative; cursor: pointer;">
        <span class="eye-icon" style="font-size: 20px;">👁️</span>
        <div class="image-preview-tooltip" style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <img src="<?php echo esc_attr($preview_image); ?>" alt="Preview" style="max-width: 600px;">
        </div>
      </div>
    <?php endif; ?>
  </div>

  <div id="slider-images-wrapper">
    <?php foreach ($slider_images as $index => $image): ?>
      <div class="slider-image-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="width: 48%;">
            <label for="slider_images_<?php echo $index; ?>_jpg" style="display:block; margin-bottom: 5px;">
              <?php _e('JPG', 'linnikov-agency'); ?>
              <?php if ($image['jpg']): ?>
                <img src="<?php echo esc_attr($image['jpg']); ?>" alt="JPG Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="slider_images[<?php echo $index; ?>][jpg]" id="slider_images_<?php echo $index; ?>_jpg" value="<?php echo esc_attr($image['jpg']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-slider-image-jpg" value="<?php _e('Upload JPG', 'linnikov-agency'); ?>" />
          </div>

          <div style="width: 48%;">
            <label for="slider_images_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <?php _e('WebP', 'linnikov-agency'); ?>
              <?php if ($image['webp']): ?>
                <img src="<?php echo esc_attr($image['webp']); ?>" alt="WebP Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="slider_images[<?php echo $index; ?>][webp]" id="slider_images_<?php echo $index; ?>_webp" value="<?php echo esc_attr($image['webp']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-slider-image-webp" value="<?php _e('Upload WebP', 'linnikov-agency'); ?>" />
          </div>
        </div>

        <div style="text-align: right;">
          <input type="button" class="button remove-slider-image" value="<?php _e('Remove Image', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;" />
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <p><input type="button" class="button add-slider-image" value="<?php _e('Add New Image', 'linnikov-agency'); ?>" /></p>

  <script>
      jQuery(document).ready(function($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-slider').hover(function() {
              $(this).find('.image-preview-tooltip').toggle();
          });

          // Добавление новой строки для изображения
          function addImageRow() {
              var index = $('#slider-images-wrapper .slider-image-row').length;
              var newRow = `
                    <div class="slider-image-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <div style="width: 48%;">
                                <label for="slider_images_${index}_jpg" style="display:block; margin-bottom: 5px;"><?php _e('JPG', 'linnikov-agency'); ?></label>
                                <input type="text" name="slider_images[${index}][jpg]" id="slider_images_${index}_jpg" size="50" style="width: 100%; margin-bottom: 10px;" />
                                <input type="button" class="button upload-slider-image-jpg" value="<?php _e('Upload JPG', 'linnikov-agency'); ?>" />
                            </div>
                            <div style="width: 48%;">
                                <label for="slider_images_${index}_webp" style="display:block; margin-bottom: 5px;"><?php _e('WebP', 'linnikov-agency'); ?></label>
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

          $('#slider-images-wrapper').on('click', '.upload-slider-image-jpg', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload JPG', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          $('#slider-images-wrapper').on('click', '.upload-slider-image-webp', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
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
        'jpg' => sanitize_text_field($image['jpg']),
        'webp' => sanitize_text_field($image['webp']),
      ];
    }, $_POST['slider_images']);

    update_post_meta($post_id, '_linnikov_agency_slider_images', $slider_images);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_slider_images');
  }
}

add_action('save_post', 'linnikov_agency_save_slider_meta_box');

// 3. Блок: work-pictures-tails
// Добавление метабокса для блока work-pictures-tails
function linnikov_agency_add_work_pictures_tails_meta_box() {
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
function linnikov_agency_work_pictures_tails_meta_box_callback($post) {
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_work_pictures_tails_nonce');
  $pictures = get_post_meta($post->ID, '_linnikov_agency_work_pictures', true);
  $video_url = get_post_meta($post->ID, '_linnikov_agency_work_video_url', true);

  // Инициализация массива для изображений, если он пустой
  if (!is_array($pictures) || empty($pictures)) {
    $pictures = [
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => '']
    ];
  }

  // Используем первое изображение для предпросмотра
  $preview_image = 'http://localhost:8000/wp-content/uploads/2024/08/06@1560.webp';

  ?>

  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <?php if ($preview_image): ?>
      <div class="eye-icon-wrapper-tails" style="position: relative; cursor: pointer;">
        <span class="eye-icon" style="font-size: 20px;">👁️</span>
        <div class="image-preview-tooltip-tails" style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <img src="<?php echo esc_attr($preview_image); ?>" alt="Preview" style="max-width: 600px;">
        </div>
      </div>
    <?php endif; ?>
  </div>

  <div id="work-pictures-wrapper">
    <?php foreach ($pictures as $index => $picture): ?>
      <div class="work-picture-row-tails" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="width: 48%;">
            <label for="work_picture_<?php echo $index; ?>_jpg" style="display:block; margin-bottom: 5px;">
              <?php _e('JPG', 'linnikov-agency'); ?>
              <?php if ($picture): ?>
                <img src="<?php echo esc_attr($picture['jpg']); ?>" alt="JPG Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="work_pictures[<?php echo $index; ?>][jpg]" id="work_picture_<?php echo $index; ?>_jpg" value="<?php echo esc_attr($picture['jpg']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-work-picture-jpg-tails" value="<?php _e('Upload JPG', 'linnikov-agency'); ?>" />
          </div>

          <div style="width: 48%;">
            <label for="work_picture_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <?php _e('WebP', 'linnikov-agency'); ?>
              <?php if ($picture): ?>
                <img src="<?php echo esc_attr($picture['webp']); ?>" alt="JPG Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="work_pictures[<?php echo $index; ?>][webp]" id="work_picture_<?php echo $index; ?>_webp" value="<?php echo esc_attr($picture['webp']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-work-picture-webp-tails" value="<?php _e('Upload WebP', 'linnikov-agency'); ?>" />
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-work-picture-tails" value="<?php _e('Clear Image', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;" />
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <div style="margin-bottom: 20px;">
    <label for="work_video_url" style="display:block; margin-bottom: 5px;"><?php _e('Video URL', 'linnikov-agency'); ?></label>
    <input type="text" name="work_video_url" id="work_video_url" value="<?php echo esc_attr($video_url); ?>" size="50" style="width: 100%;" />
  </div>

  <script>
      jQuery(document).ready(function($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-tails').hover(function() {
              $(this).find('.image-preview-tooltip-tails').toggle();
          });

          $('#work-pictures-wrapper').on('click', '.upload-work-picture-jpg-tails', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload JPG', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          $('#work-pictures-wrapper').on('click', '.upload-work-picture-webp-tails', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          // Очистка полей изображения
          $('#work-pictures-wrapper').on('click', '.clear-work-picture-tails', function(e) {
              e.preventDefault();
              var row = $(this).closest('.work-picture-row-tails');
              row.find('input[type="text"]').val('');
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса work-pictures-tails
function linnikov_agency_save_work_pictures_tails_meta_box($post_id) {
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
        'jpg' => sanitize_text_field($picture['jpg']),
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
}

add_action('save_post', 'linnikov_agency_save_work_pictures_tails_meta_box');


// 4. Блок: two-lines-scroll-slider
// Добавление метабокса для блока two-lines-scroll-slider
function linnikov_agency_add_two_lines_scroll_slider_meta_box() {
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
function linnikov_agency_two_lines_scroll_slider_meta_box_callback($post) {
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_two_lines_scroll_slider_nonce');
  $pictures = get_post_meta($post->ID, '_linnikov_agency_two_lines_scroll_slider_images', true);

  if (!is_array($pictures) || empty($pictures)) {
    $pictures = [
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => '']
    ];
  }

  $preview_image = $pictures[0]['webp'] ? $pictures[0]['webp'] : $pictures[0]['jpg'];
  ?>

  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <?php if ($preview_image): ?>
      <div class="eye-icon-wrapper-two-lines" style="position: relative; cursor: pointer;">
        <span class="eye-icon" style="font-size: 20px;">👁️</span>
        <div class="image-preview-tooltip-two-lines" style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <img src="<?php echo esc_attr($preview_image); ?>" alt="Preview" style="max-width: 600px;">
        </div>
      </div>
    <?php endif; ?>
  </div>

  <div id="two-lines-scroll-slider-wrapper">
    <?php foreach ($pictures as $index => $picture): ?>
      <div class="two-lines-scroll-slider-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="width: 5%; cursor: move;" class="drag-handle">
            <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
          </div>
          <div style="width: 45%;">
            <label for="two_lines_scroll_slider_<?php echo $index; ?>_jpg" style="display:block; margin-bottom: 5px;">
              <?php _e('JPG', 'linnikov-agency'); ?>
              <?php if ($picture['jpg']): ?>
                <img src="<?php echo esc_attr($picture['jpg']); ?>" alt="JPG Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="two_lines_scroll_slider_images[<?php echo $index; ?>][jpg]" id="two_lines_scroll_slider_<?php echo $index; ?>_jpg" value="<?php echo esc_attr($picture['jpg']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-two-lines-scroll-slider-jpg" value="<?php _e('Upload JPG', 'linnikov-agency'); ?>" />
          </div>

          <div style="width: 45%;">
            <label for="two_lines_scroll_slider_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <?php _e('WebP', 'linnikov-agency'); ?>
              <?php if ($picture['webp']): ?>
                <img src="<?php echo esc_attr($picture['webp']); ?>" alt="WebP Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="two_lines_scroll_slider_images[<?php echo $index; ?>][webp]" id="two_lines_scroll_slider_<?php echo $index; ?>_webp" value="<?php echo esc_attr($picture['webp']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-two-lines-scroll-slider-webp" value="<?php _e('Upload WebP', 'linnikov-agency'); ?>" />
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-two-lines-scroll-slider" value="<?php _e('Clear Image', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;" />
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <script>
      jQuery(document).ready(function($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-two-lines').hover(function() {
              $(this).find('.image-preview-tooltip-two-lines').toggle();
          });

          $('#two-lines-scroll-slider-wrapper').sortable({
              handle: '.drag-handle', // Перетаскивание только за иконку
              update: function(event, ui) {
                  // Здесь можно обновить порядок, если это нужно сделать в реальном времени
              }
          });

          $('#two-lines-scroll-slider-wrapper').on('click', '.upload-two-lines-scroll-slider-jpg', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload JPG', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          $('#two-lines-scroll-slider-wrapper').on('click', '.upload-two-lines-scroll-slider-webp', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          // Очистка полей изображения
          $('#two-lines-scroll-slider-wrapper').on('click', '.clear-two-lines-scroll-slider', function(e) {
              e.preventDefault();
              var row = $(this).closest('.two-lines-scroll-slider-row');
              row.find('input[type="text"]').val('');
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса two-lines-scroll-slider
function linnikov_agency_save_two_lines_scroll_slider_meta_box($post_id) {
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
        'jpg' => sanitize_text_field($picture['jpg']),
        'webp' => sanitize_text_field($picture['webp']),
      ];
    }, $_POST['two_lines_scroll_slider_images']);

    update_post_meta($post_id, '_linnikov_agency_two_lines_scroll_slider_images', $pictures);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_two_lines_scroll_slider_images');
  }
}

add_action('save_post', 'linnikov_agency_save_two_lines_scroll_slider_meta_box');

// 5. Блок: before-after-slider
// Добавление метабокса для блока before-after-slider
function linnikov_agency_add_before_after_slider_meta_box() {
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
function linnikov_agency_before_after_slider_meta_box_callback($post) {
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_before_after_slider_nonce');
  $before_after_images = get_post_meta($post->ID, '_linnikov_agency_before_after_images', true);

  // Инициализация массива для изображений, если он пустой
  if (!is_array($before_after_images) || empty($before_after_images)) {
    $before_after_images = [
      'before' => ['jpg' => '', 'webp' => ''],
      'after' => ['jpg' => '', 'webp' => '']
    ];
  }

  ?>

  <div id="before-after-slider-wrapper">
    <?php foreach (['before', 'after'] as $key): ?>
      <div class="before-after-slider-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">
        <h4><?php echo ucfirst($key); ?> Image</h4>

        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <div style="width: 48%;">
            <label for="before_after_<?php echo $key; ?>_jpg" style="display:block; margin-bottom: 5px;">
              <?php _e('JPG Image URL', 'linnikov-agency'); ?>
              <?php if ($before_after_images[$key]['jpg']): ?>
                <img src="<?php echo esc_attr($before_after_images[$key]['jpg']); ?>" alt="JPG Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="before_after_images[<?php echo $key; ?>][jpg]" id="before_after_<?php echo $key; ?>_jpg" value="<?php echo esc_attr($before_after_images[$key]['jpg']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-before-after-slider-jpg" value="<?php _e('Upload JPG', 'linnikov-agency'); ?>" />
          </div>

          <div style="width: 48%;">
            <label for="before_after_<?php echo $key; ?>_webp" style="display:block; margin-bottom: 5px;">
              <?php _e('WebP Image URL', 'linnikov-agency'); ?>
              <?php if ($before_after_images[$key]['webp']): ?>
                <img src="<?php echo esc_attr($before_after_images[$key]['webp']); ?>" alt="WebP Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="before_after_images[<?php echo $key; ?>][webp]" id="before_after_<?php echo $key; ?>_webp" value="<?php echo esc_attr($before_after_images[$key]['webp']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-before-after-slider-webp" value="<?php _e('Upload WebP', 'linnikov-agency'); ?>" />
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-before-after-slider" value="<?php _e('Clear Image', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;" />
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <script>
      jQuery(document).ready(function($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-before-after').hover(function() {
              $(this).find('.image-preview-tooltip-before-after').toggle();
          });

          $('#before-after-slider-wrapper').on('click', '.upload-before-after-slider-jpg', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload JPG', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          $('#before-after-slider-wrapper').on('click', '.upload-before-after-slider-webp', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          // Очистка полей изображения
          $('#before-after-slider-wrapper').on('click', '.clear-before-after-slider', function(e) {
              e.preventDefault();
              var row = $(this).closest('.before-after-slider-row');
              row.find('input[type="text"]').val('');
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса before-after-slider
function linnikov_agency_save_before_after_slider_meta_box($post_id) {
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
        'jpg' => sanitize_text_field($image['jpg']),
        'webp' => sanitize_text_field($image['webp']),
      ];
    }, $_POST['before_after_images']);

    update_post_meta($post_id, '_linnikov_agency_before_after_images', $before_after_images);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_before_after_images');
  }
}

add_action('save_post', 'linnikov_agency_save_before_after_slider_meta_box');

// 6. Блок: nine-tiles
// Добавление метабокса для блока nine-tiles
function linnikov_agency_add_nine_tiles_meta_box() {
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
function linnikov_agency_nine_tiles_meta_box_callback($post) {
  wp_nonce_field(basename(__FILE__), 'linnikov_agency_nine_tiles_nonce');
  $pictures = get_post_meta($post->ID, '_linnikov_agency_nine_tiles_images', true);

  if (!is_array($pictures) || empty($pictures)) {
    $pictures = [
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => ''],
      ['jpg' => '', 'webp' => '']
    ];
  }

  $preview_image = 'http://localhost:8000/wp-content/uploads/2024/08/06@1560.webp';
  ?>

  <div style="display: flex; align-items: center; margin-bottom: 20px;">
    <span style="display: inline-block; margin-right: 10px"><?php _e('section preview', 'linnikov-agency'); ?></span>
    <?php if ($preview_image): ?>
      <div class="eye-icon-wrapper-nine-tiles" style="position: relative; cursor: pointer;">
        <span class="eye-icon" style="font-size: 20px;">👁️</span>
        <div class="image-preview-tooltip-nine-tiles" style="display: none; position: absolute; top: 0px; left: 25px; z-index: 10; background: #fff; border: 1px solid #ccc; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
          <img src="<?php echo esc_attr($preview_image); ?>" alt="Preview" style="max-width: 600px;">
        </div>
      </div>
    <?php endif; ?>
  </div>

  <div id="nine-tiles-wrapper">
    <?php foreach ($pictures as $index => $picture): ?>
      <div class="nine-tiles-row" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; background-color: #f9f9f9;">

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="width: 5%; cursor: move;" class="drag-handle">
            <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
          </div>
          <div style="width: 45%;">
            <label for="nine_tiles_<?php echo $index; ?>_jpg" style="display:block; margin-bottom: 5px;">
              <?php _e('JPG', 'linnikov-agency'); ?>
              <?php if ($picture['jpg']): ?>
                <img src="<?php echo esc_attr($picture['jpg']); ?>" alt="JPG Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="nine_tiles_images[<?php echo $index; ?>][jpg]" id="nine_tiles_<?php echo $index; ?>_jpg" value="<?php echo esc_attr($picture['jpg']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-nine-tiles-jpg" value="<?php _e('Upload JPG', 'linnikov-agency'); ?>" />
          </div>

          <div style="width: 45%;">
            <label for="nine_tiles_<?php echo $index; ?>_webp" style="display:block; margin-bottom: 5px;">
              <?php _e('WebP', 'linnikov-agency'); ?>
              <?php if ($picture['webp']): ?>
                <img src="<?php echo esc_attr($picture['webp']); ?>" alt="WebP Preview" style="display:block; margin-top: 5px; width: 150px;">
              <?php endif; ?>
            </label>
            <input type="text" name="nine_tiles_images[<?php echo $index; ?>][webp]" id="nine_tiles_<?php echo $index; ?>_webp" value="<?php echo esc_attr($picture['webp']); ?>" size="50" style="width: 100%; margin-bottom: 10px;" />
            <input type="button" class="button upload-nine-tiles-webp" value="<?php _e('Upload WebP', 'linnikov-agency'); ?>" />
          </div>
        </div>
        <div style="text-align: right;">
          <input type="button" class="button clear-nine-tiles" value="<?php _e('Clear Image', 'linnikov-agency'); ?>" style="background-color: #dc3232; color: #fff;" />
        </div>
      </div>
    <?php endforeach; ?>
  </div>

  <script>
      jQuery(document).ready(function($) {
          // Показ/скрытие всплывающей подсказки с изображением при наведении на иконку глаза
          $('.eye-icon-wrapper-nine-tiles').hover(function() {
              $(this).find('.image-preview-tooltip-nine-tiles').toggle();
          });

          $('#nine-tiles-wrapper').sortable({
              handle: '.drag-handle', // Перетаскивание только за иконку
              update: function(event, ui) {
                  // Здесь можно обновить порядок, если это нужно сделать в реальном времени
              }
          });

          $('#nine-tiles-wrapper').on('click', '.upload-nine-tiles-jpg', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload JPG', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          $('#nine-tiles-wrapper').on('click', '.upload-nine-tiles-webp', function(e) {
              e.preventDefault();
              var button = $(this);
              var image = wp.media({
                  title: '<?php _e('Upload WebP', 'linnikov-agency'); ?>',
                  multiple: false
              }).open().on('select', function() {
                  var uploaded_image = image.state().get('selection').first();
                  var image_url = uploaded_image.toJSON().url;
                  button.prev().val(image_url);
              });
          });

          // Очистка полей изображения
          $('#nine-tiles-wrapper').on('click', '.clear-nine-tiles', function(e) {
              e.preventDefault();
              var row = $(this).closest('.nine-tiles-row');
              row.find('input[type="text"]').val('');
          });
      });
  </script>
  <?php
}

// Сохранение данных метабокса nine-tiles
function linnikov_agency_save_nine_tiles_meta_box($post_id) {
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

  // Сохранение данных изображений
  if (isset($_POST['nine_tiles_images'])) {
    $pictures = array_map(function ($picture) {
      return [
        'jpg' => sanitize_text_field($picture['jpg']),
        'webp' => sanitize_text_field($picture['webp']),
      ];
    }, $_POST['nine_tiles_images']);

    update_post_meta($post_id, '_linnikov_agency_nine_tiles_images', $pictures);
  } else {
    delete_post_meta($post_id, '_linnikov_agency_nine_tiles_images');
  }
}

add_action('save_post', 'linnikov_agency_save_nine_tiles_meta_box');

// 7. Блок: more-works
// Добавление метабокса для блока more-works
function linnikov_agency_add_more_works_meta_box() {
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
function linnikov_agency_more_works_meta_box_callback($post) {
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
      document.addEventListener('DOMContentLoaded', function() {
          const selectAllCheckbox = document.getElementById('select-all-works');
          const workCheckboxes = document.querySelectorAll('.related-work-checkbox');

          // Обработка нажатия на чекбокс "Select All"
          selectAllCheckbox.addEventListener('change', function() {
              workCheckboxes.forEach(function(checkbox) {
                  checkbox.checked = selectAllCheckbox.checked;
              });
          });

          // Если один из чекбоксов изменяется вручную, отменяем выбор "Select All"
          workCheckboxes.forEach(function(checkbox) {
              checkbox.addEventListener('change', function() {
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
function linnikov_agency_save_more_works_meta_box($post_id) {
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