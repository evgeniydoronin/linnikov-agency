<?php
// Регистрация AJAX обработчика для неавторизованных пользователей
add_action('wp_ajax_nopriv_submit_contact_form', 'submit_contact_form');
add_action('wp_ajax_submit_contact_form', 'submit_contact_form');

function submit_contact_form() {
  // Проверка nonce для безопасности
  check_ajax_referer('submit_contact_form_nonce', 'nonce');

  // Получение и обработка данных формы
  $name = sanitize_text_field($_POST['contact--name']);
  $email = sanitize_email($_POST['contact--email']);
  $message = sanitize_textarea_field($_POST['message']);
  $category = isset($_POST['category']) ? implode(', ', $_POST['category']) : '';
  $other_desc = sanitize_textarea_field($_POST['category--other-desc']);

  // Проверка корректности email
  if (!is_email($email)) {
    wp_send_json_error('Invalid email address.');
  }

  // Формирование и отправка письма
  $to = 'evgeniydoronin@gmail.com'; // Замените на ваш email
  $subject = 'New message from contact form';
  $body = "Name: $name\nEmail: $email\nCategory: $category\nMessage: $message\nOther: $other_desc";
  $headers = array('Content-Type: text/plain; charset=UTF-8', 'From: '.$name.' <'.$email.'>');

  if (wp_mail($to, $subject, $body, $headers)) {
    wp_send_json_success('Message sent successfully.');
  } else {
    wp_send_json_error('Failed to send the message.');
  }

  wp_die();
}

// Подключение скрипта с передачей ajax_url и nonce
function custom_enqueue_ajax_script() {
  // Подключаем файл contact-form.js из вашего плагина
  wp_enqueue_script(
    'custom-ajax-script',
    plugin_dir_url(__FILE__) . '../frontend/js/contact-form.js', // Путь к файлу в плагине
    array('jquery'), // Зависимость от jQuery
    null, // Версия файла, можно оставить null
    true // Подключаем в footer
  );

  // Передаем параметры AJAX в JavaScript (URL для AJAX запросов и nonce)
  wp_localize_script('custom-ajax-script', 'ajax_params', array(
    'ajax_url' => admin_url('admin-ajax.php'), // URL для admin-ajax.php
    'nonce'    => wp_create_nonce('submit_contact_form_nonce'), // Создаем nonce для защиты
  ));
}
add_action('wp_enqueue_scripts', 'custom_enqueue_ajax_script');