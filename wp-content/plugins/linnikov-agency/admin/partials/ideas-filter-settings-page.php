<?php
// Сохранение нового порядка, если форма отправлена
if (isset($_POST['ideas_tags_order'])) {
    linnikov_agency_save_ideas_tags_order($_POST['ideas_tags_order']);
}

// Получаем список всех тегов идей
$args = array(
    'taxonomy' => 'idea_tag',
    'orderby' => 'meta_value_num',
    'meta_key' => 'ideas_tag_order',
    'order' => 'ASC',Merge upstream changes from techno-trump repository into git-src
    'hide_empty' => true,
);
$tags = get_terms($args);
?>

<div class="wrap">
    <h1><?php _e('Ideas Filter Settings', 'linnikov-agency'); ?></h1>
    <form method="post">
        <?php wp_nonce_field('linnikov_agency_save_ideas_tags_order_nonce', '_wpnonce_linnikov_agency_save_ideas_tags_order'); ?>
        <ul id="sortable-ideas">
            <?php

            if (!empty($tags)) :
                foreach ($tags as $tag) :
                    ?>
                    <li id="tag-<?php echo esc_attr($tag->term_id); ?>" class="ui-state-default" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; border: 1px solid #ddd; margin-bottom: 10px; background-color: #f9f9f9;">
                        <!-- Иконка перетаскивания -->
                        <div style="display: flex; align-items: center; cursor: move;">
                            <strong><?php echo esc_html($tag->name); ?></strong>
                        </div>
                        <div style="width: 5%; cursor: move;" class="drag-handle">
                            <span style="font-size: 20px;">☰</span> <!-- Иконка для перетаскивания -->
                        </div>
                    </li>
                <?php
                endforeach;
            endif;
            ?>
        </ul>
        <input type="hidden" name="ideas_tags_order" id="ideas_tags_order">
        <button type="submit" class="button button-primary"><?php _e('Save Order', 'linnikov-agency'); ?></button>
        <script>
            jQuery(document).ready(function($) {
                // Инициализация сортировки для Ideas (новый код)
                if ($('#sortable-ideas').length) {
                    $('#sortable-ideas').sortable({
                        handle: '.drag-handle',
                        placeholder: 'ui-state-highlight',
                        update: function(event, ui) {
                            // Извлечение ID тегов после сортировки
                            var order = $('#sortable-ideas li').map(function() {
                                return this.id;
                            }).get();

                            // Выводим порядок для отладки
                            console.log('Sorted IDs:', order);

                            // Сохраняем порядок в скрытое поле
                            $('#ideas_tags_order').val(order.join(','));
                        }
                    });
                    $('#sortable-ideas').disableSelection();
                }
            });
        </script>
    </form>
</div>

