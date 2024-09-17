<?php
// Добавляем метабоксы для кастомных полей типа поста Team
function linnikov_agency_add_team_meta_boxes() {
  add_meta_box(
    'team_member_details',
    __('Team Member Details', 'linnikov-agency'),
    'linnikov_agency_render_team_meta_boxes',
    'team', // Название типа записи
    'normal', // Нормальная позиция
    'default' // По умолчанию
  );
}
add_action('add_meta_boxes', 'linnikov_agency_add_team_meta_boxes');

// Рендер метабоксов для типа поста Team
function linnikov_agency_render_team_meta_boxes($post) {
  // Используем nonce для защиты
  wp_nonce_field('linnikov_agency_save_team_meta_boxes', 'linnikov_agency_team_meta_box_nonce');

  // Получаем сохраненные значения (если есть)
  $position = get_post_meta($post->ID, '_team_member_position', true);
  $quote = get_post_meta($post->ID, '_team_member_quote', true);
  $description = get_post_meta($post->ID, '_team_member_description', true);
  ?>

  <div class="meta-box-item">
    <label for="team_member_position"><?php _e('Position', 'linnikov-agency'); ?></label>
    <input type="text" id="team_member_position" name="team_member_position" value="<?php echo esc_attr($position); ?>" maxlength="255" style="width: 100%;" />
  </div>

  <div class="meta-box-item">
    <label for="team_member_quote"><?php _e('Quote', 'linnikov-agency'); ?></label>
    <input type="text" id="team_member_quote" name="team_member_quote" value="<?php echo esc_attr($quote); ?>" maxlength="255" style="width: 100%;" />
  </div>

  <div class="meta-box-item">
    <label for="team_member_description"><?php _e('Description', 'linnikov-agency'); ?></label>
    <textarea id="team_member_description" name="team_member_description" maxlength="500" rows="4" style="width: 100%;"><?php echo esc_textarea($description); ?></textarea>
  </div>

  <?php
}

// Сохранение данных метабоксов
function linnikov_agency_save_team_meta_boxes($post_id) {
  // Проверка nonce-поля для безопасности
  if (!isset($_POST['linnikov_agency_team_meta_box_nonce']) || !wp_verify_nonce($_POST['linnikov_agency_team_meta_box_nonce'], 'linnikov_agency_save_team_meta_boxes')) {
    return;
  }

  // Проверяем права пользователя
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }

  // Проверяем тип записи
  if (get_post_type($post_id) !== 'team') {
    return;
  }

  // Сохраняем данные кастомных полей
  if (isset($_POST['team_member_position'])) {
    update_post_meta($post_id, '_team_member_position', sanitize_text_field($_POST['team_member_position']));
  }

  if (isset($_POST['team_member_quote'])) {
    update_post_meta($post_id, '_team_member_quote', sanitize_text_field($_POST['team_member_quote']));
  }

  if (isset($_POST['team_member_description'])) {
    update_post_meta($post_id, '_team_member_description', sanitize_textarea_field($_POST['team_member_description']));
  }
}
add_action('save_post', 'linnikov_agency_save_team_meta_boxes');