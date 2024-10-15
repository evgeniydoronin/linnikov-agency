<style>
    .admin-content-box {
        background: white;
        padding: 1rem;
        border: 1px solid #cecece;
        margin-bottom: 2rem; /* Отступ между контейнерами */
    }
    h2 {
        font-size: 1.3rem;
    }
</style>

<div class="wrap">
  <h1><?php _e('Main Page Settings', 'linnikov-agency'); ?></h1>

  <!-- Первый контейнер -->
  <div class="admin-content-box">
    <h2>Slider Work section</h2>
    <form id="secondary-page-settings-form" method="post">
      <?php wp_nonce_field('linnikov_agency_save_secondary_order_nonce', '_wpnonce_linnikov_agency_save_secondary_order'); ?>
      <div style="display: flex; gap: 30px;">
        <!-- Блок со всеми постами -->
        <div>
          <h3><?php _e('All Works', 'linnikov-agency'); ?></h3>
          <ul id="secondary-all-posts" class="post-list"
              style="min-width: 300px; max-height: 400px; overflow-y: scroll; border: 1px solid #ddd; padding: 10px;">
            <?php if ($query->have_posts()) : ?>
              <?php while ($query->have_posts()) : $query->the_post(); ?>
                <?php
                // Пропускаем посты, которые уже выбраны в "Secondary Selected Works"
                if (!empty($secondary_order) && in_array(get_the_ID(), explode(',', $secondary_order))) {
                  continue;
                }
                ?>
                <li id="post-<?php the_ID(); ?>" class="post-item" data-id="<?php the_ID(); ?>"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 5px; border-bottom: 1px solid #ddd;">
                  <?php the_title(); ?>
                  <div style="width: 5%; cursor: move;" class="drag-handle">
                    <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
                  </div>
                </li>
              <?php endwhile; ?>
            <?php endif; ?>
            <?php wp_reset_postdata(); ?>
          </ul>
        </div>

        <!-- Блок для перетаскивания выбранных постов -->
        <div>
          <h3><?php _e('Selected Works', 'linnikov-agency'); ?></h3>
          <ul id="secondary-selected-posts" class="post-list"
              style="min-width: 300px; min-height: 300px; border: 1px solid #ddd; padding: 10px;">
            <?php
            if (!empty($secondary_order)) {
              $selected_secondary_posts = explode(',', $secondary_order);
              foreach ($selected_secondary_posts as $post_id) {
                $post = get_post($post_id);
                if ($post) {
                  echo '<li id="post-' . $post->ID . '" class="post-item" data-id="' . $post->ID . '" style="display: flex; align-items: center; justify-content: space-between; padding: 5px; border-bottom: 1px solid #ddd;">' . esc_html($post->post_title) . '<div style="width: 5%; cursor: move;" class="drag-handle">
                  <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
                </div></li>';
                }
              }
            }
            ?>
          </ul>
        </div>
      </div>
      <input type="hidden" name="secondary_order" id="secondary_order">
      <button type="submit" class="button button-primary"><?php _e('Save Secondary Order', 'linnikov-agency'); ?></button>
    </form>
  </div>

  <!-- Второй контейнер -->
  <div class="admin-content-box">
    <h2>Work section</h2>
    <form id="main-page-settings-form" method="post">
      <?php wp_nonce_field('linnikov_agency_save_main_page_order_nonce', '_wpnonce_linnikov_agency_save_main_page_order'); ?>
      <div style="display: flex; gap: 30px;">
        <!-- Блок со всеми постами -->
        <div>
          <h3><?php _e('All Works', 'linnikov-agency'); ?></h3>
          <ul id="all-posts" class="post-list"
              style="min-width: 300px; max-height: 400px; overflow-y: scroll; border: 1px solid #ddd; padding: 10px;">
            <?php if ($query->have_posts()) : ?>
              <?php while ($query->have_posts()) : $query->the_post(); ?>
                <?php
                // Пропускаем посты, которые уже выбраны в "Selected Works"
                if (!empty($main_page_order) && in_array(get_the_ID(), explode(',', $main_page_order))) {
                  continue;
                }
                ?>
                <li id="post-<?php the_ID(); ?>" class="post-item" data-id="<?php the_ID(); ?>"
                    style="display: flex; align-items: center; justify-content: space-between; padding: 5px; border-bottom: 1px solid #ddd;">
                  <?php the_title(); ?>
                  <div style="width: 5%; cursor: move;" class="drag-handle">
                    <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
                  </div>
                </li>
              <?php endwhile; ?>
            <?php endif; ?>
            <?php wp_reset_postdata(); ?>
          </ul>
        </div>

        <!-- Блок для перетаскивания выбранных постов -->
        <div>
          <h3><?php _e('Selected Works (Max 8)', 'linnikov-agency'); ?></h3>
          <ul id="selected-posts" class="post-list"
              style="min-width: 300px; min-height: 300px; border: 1px solid #ddd; padding: 10px;">
            <?php
            if (!empty($main_page_order)) {
              $selected_posts = explode(',', $main_page_order);
              foreach ($selected_posts as $post_id) {
                $post = get_post($post_id);
                if ($post) {
                  echo '<li id="post-' . $post->ID . '" class="post-item" data-id="' . $post->ID . '" style="display: flex; align-items: center; justify-content: space-between; padding: 5px; border-bottom: 1px solid #ddd;">' . esc_html($post->post_title) . '<div style="width: 5%; cursor: move;" class="drag-handle">
                  <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
                </div></li>';
                }
              }
            }
            ?>
          </ul>
        </div>
      </div>
      <input type="hidden" name="main_page_order" id="main_page_order">
      <button type="submit" class="button button-primary"><?php _e('Save Order', 'linnikov-agency'); ?></button>
    </form>
  </div>

</div>

<script>
    jQuery(document).ready(function ($) {
        // Перетаскивание и сортировка элементов для первого контейнера
        $("#all-posts, #selected-posts").sortable({
            connectWith: "#all-posts, #selected-posts", // Связываем списки внутри первого контейнера
            items: "li",
            handle: ".drag-handle", // Добавляем обработку за элементы с классом .drag-handle
            placeholder: "ui-state-highlight", // Стиль для placeholder
            receive: function (event, ui) {
                if ($('#selected-posts li').length > 8) { // Ограничение до 8 постов
                    alert("You can select up to 8 posts.");
                    $(ui.sender).sortable('cancel');
                } else {
                    updateSelectedPosts(); // Обновляем скрытое поле после добавления элемента
                }
            },
            update: function (event, ui) {
                // Обновляем скрытое поле при изменении порядка
                updateSelectedPosts();
            }
        }).disableSelection();

        // Перетаскивание и сортировка элементов для второго контейнера
        $("#secondary-all-posts, #secondary-selected-posts").sortable({
            connectWith: "#secondary-all-posts, #secondary-selected-posts", // Связываем списки внутри второго контейнера
            items: "li",
            handle: ".drag-handle", // Добавляем обработку за элементы с классом .drag-handle
            placeholder: "ui-state-highlight", // Стиль для placeholder
            receive: function (event, ui) {
                // Обновляем скрытое поле после добавления элемента
                updateSecondarySelectedPosts();
            },
            update: function (event, ui) {
                // Обновляем скрытое поле при изменении порядка
                updateSecondarySelectedPosts();
            }
        }).disableSelection();

        // Функция для обновления скрытого поля для первого контейнера
        function updateSelectedPosts() {
            var selectedPostIds = $('#selected-posts li').map(function () {
                return $(this).data('id');
            }).get();
            $('#main_page_order').val(selectedPostIds.join(','));
        }

        // Функция для обновления скрытого поля для второго контейнера
        function updateSecondarySelectedPosts() {
            var selectedPostIds = $('#secondary-selected-posts li').map(function () {
                return $(this).data('id');
            }).get();
            $('#secondary_order').val(selectedPostIds.join(','));
        }
    });
</script>