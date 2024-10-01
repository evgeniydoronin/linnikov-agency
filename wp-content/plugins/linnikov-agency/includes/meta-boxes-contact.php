<?php

// Универсальная функция для добавления метабоксов
function linnikov_agency_add_meta_box_contact($id, $title, $callback)
{
  add_meta_box(
    $id,         // ID метабокса
    $title,      // Заголовок метабокса
    $callback,   // Функция колбэк
    'page',      // Тип постов
    'normal',    // Позиция метабокса
    'high'       // Приоритет
  );
}

// Добавляем метабоксы только на страницу "Контакты"
function linnikov_agency_register_contact_meta_boxes($post)
{
  global $post; // Получаем глобальный объект поста

  // Проверяем, что это страница с шаблоном "Контакты"
  if ($post && get_page_template_slug($post->ID) === 'templates/page-contact.php') {
    linnikov_agency_add_meta_box_contact(
      'linnikov_agency_contact_phone_meta_box',
      __('Contact Phone', 'linnikov-agency'),
      'linnikov_agency_contact_phone_meta_box_callback'
    );
    linnikov_agency_add_meta_box_contact(
      'linnikov_agency_contact_address_meta_box',
      __('Contact Address', 'linnikov-agency'),
      'linnikov_agency_contact_address_meta_box_callback'
    );
  }
}

add_action('add_meta_boxes', 'linnikov_agency_register_contact_meta_boxes');

// Колбэк для метабокса телефона
function linnikov_agency_contact_phone_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $phone = get_post_meta($post->ID, '_linnikov_agency_contacts_phone', true);

  // Открываем стилизованный контейнер
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  echo '<label for="linnikov_agency_contacts_phone">' . __('Phone Number', 'linnikov-agency') . '</label>';
  echo '<input type="text" id="linnikov_agency_contacts_phone" name="linnikov_agency_contacts_phone" value="' . esc_attr($phone) . '" style="width: 100%;">';

  // Закрываем стилизованный контейнер
  echo '</div>';

  // Nonce для безопасности
  wp_nonce_field('linnikov_agency_save_contacts_phone', 'linnikov_agency_contacts_phone_nonce');
}

// Колбэк для метабокса адреса
function linnikov_agency_contact_address_meta_box_callback($post)
{
  // Получаем сохраненные данные
  $address = get_post_meta($post->ID, '_linnikov_agency_contacts_address', true);

  // Открываем стилизованный контейнер
  echo '<div style="padding: 15px; background-color: #f9f9f9; border: 1px solid #ddd; margin-bottom: 20px;">';

  echo '<label for="linnikov_agency_contacts_address">' . __('Address', 'linnikov-agency') . '</label>';

  // Используем wp_editor для текстового поля с поддержкой разметки
  wp_editor($address, 'linnikov_agency_contacts_address', array(
    'textarea_name' => 'linnikov_agency_contacts_address',
    'textarea_rows' => 5,
    'media_buttons' => false,
    'tinymce' => true,
    'quicktags' => true,
  ));

  // Закрываем стилизованный контейнер
  echo '</div>';

  // Nonce для безопасности
  wp_nonce_field('linnikov_agency_save_contacts_address', 'linnikov_agency_contacts_address_nonce');
}

// Сохранение данных метабоксов для страницы "Контакты"
function linnikov_agency_save_contact_meta($post_id)
{
  // Проверка nonce для телефона
  if (!isset($_POST['linnikov_agency_contacts_phone_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_contacts_phone_nonce'], 'linnikov_agency_save_contacts_phone')) {
    return;
  }

  // Проверка nonce для адреса
  if (!isset($_POST['linnikov_agency_contacts_address_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_contacts_address_nonce'], 'linnikov_agency_save_contacts_address')) {
    return;
  }

  // Проверка прав пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  // Сохраняем телефон
  if (isset($_POST['linnikov_agency_contacts_phone'])) {
    update_post_meta($post_id, '_linnikov_agency_contacts_phone', sanitize_text_field($_POST['linnikov_agency_contacts_phone']));
  }

  // Сохраняем адрес
  if (isset($_POST['linnikov_agency_contacts_address'])) {
    $address = wp_kses($_POST['linnikov_agency_contacts_address'], $allowed_tags);
    update_post_meta($post_id, '_linnikov_agency_contacts_address', $address);
  }
}
add_action('save_post', 'linnikov_agency_save_contact_meta');