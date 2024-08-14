<?php
// Функция для удаления редактора контента, если она ещё не существует
if (!function_exists('linnikov_agency_remove_editor_support')) {
  function linnikov_agency_remove_editor_support() {
    remove_post_type_support('work', 'editor');
  }
  add_action('init', 'linnikov_agency_remove_editor_support');
}

// Обновление пермалинков
if (!function_exists('linnikov_agency_filter_post_type_links')) {
  function linnikov_agency_filter_post_type_links($post_link, $post) {
    if ($post->post_type === 'work') {
      return home_url('/works/' . $post->post_name . '/');
    } elseif ($post->post_type === 'portfolio') {
      return home_url('/portfolio/' . $post->post_name . '/');
    }
    return $post_link;
  }
  add_filter('post_type_link', 'linnikov_agency_filter_post_type_links', 10, 2);
}

// Подключение скрипта для обработки нажатия кнопки
add_action('admin_footer', 'linnikov_agency_permalink_meta_box_script');
function linnikov_agency_permalink_meta_box_script() {
  ?>
  <script type="text/javascript">
      jQuery(document).ready(function($) {
          $('#save-permalink-button').on('click', function() {
              var postID = $('#post_ID').val();
              var newSlug = $('#editable-slug').val();
              var nonce = $('#linnikov_agency_permalink_nonce').val();

              $.ajax({
                  url: ajaxurl,
                  type: 'POST',
                  data: {
                      action: 'linnikov_agency_save_permalink',
                      post_id: postID,
                      post_name: newSlug,
                      security: nonce
                  },
                  success: function(response) {
                      if (response.success) {
                          console.log('Permalink saved: ' + response.data);
                      } else {
                          alert('Error: ' + response.data);
                      }
                  },
                  error: function() {
                      alert('Error saving permalink');
                  }
              });
          });
      });
  </script>
  <?php
}

// Обработка AJAX-запроса для сохранения пермалинка
if (!function_exists('linnikov_agency_save_permalink_ajax')) {
  function linnikov_agency_save_permalink_ajax() {
    // Проверка nonce
    check_ajax_referer('save_permalink_nonce', 'security');

    $post_id = intval($_POST['post_id']);
    $new_slug = sanitize_title($_POST['post_name']);

    // Проверка прав пользователя
    if (!current_user_can('edit_post', $post_id)) {
      wp_send_json_error('User cannot edit this post');
    }

    // Сохранение пермалинка
    $updated_post = array(
      'ID' => $post_id,
      'post_name' => $new_slug,
    );

    $result = wp_update_post($updated_post, true);

    if (is_wp_error($result)) {
      wp_send_json_error($result->get_error_message());
    } else {
      wp_send_json_success($new_slug);
    }
  }
  add_action('wp_ajax_linnikov_agency_save_permalink', 'linnikov_agency_save_permalink_ajax');
}

// Внутри includes/linnikov-agency.php

// Скрипты для админки
function linnikov_agency_enqueue_admin_scripts($hook) {
  global $post_type;

  // Проверяем, что мы находимся на странице редактирования кастомного типа записи 'work'
  if (($hook == 'post.php' || $hook == 'post-new.php') && $post_type == 'work') {
    // Подключаем jQuery UI Sortable
    wp_enqueue_script('jquery-ui-sortable');
  }
}
add_action('admin_enqueue_scripts', 'linnikov_agency_enqueue_admin_scripts');
