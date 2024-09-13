jQuery(document).ready(function($) {
    $('#sortable').sortable({
        placeholder: "ui-state-highlight",
        update: function(event, ui) {
            var order = $(this).sortable('toArray').toString();
            $('#work_order').val(order);
        }
    });
    $('#sortable').disableSelection();

    // Отслеживаем изменение заголовка поста
    $('#title').on('input', function () {
        var newTitle = $(this).val();
        // Проверка, что поле слаг доступно
        if ($('#editable-post-name').length > 0) {
            // Генерация слага из нового заголовка
            var newSlug = newTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
            $('#editable-post-name').text(newSlug);
            $('#post_name').val(newSlug); // Устанавливаем новое значение слага в скрытом поле
        }
    });

    // Обработка загрузки изображения
    $('.linnikov-agency-upload-image').click(function(e) {
        e.preventDefault();
        var button = $(this);
        var targetInput = $(button.data('target')); // Получаем целевое скрытое поле для URL изображения
        var container = button.closest('.linnikov-image-upload-container'); // Получаем родительский контейнер
        var imagePreview = container.find('.image-preview img'); // Получаем элемент изображения для превью

        var customUploader = wp.media({
            title: 'Выберите изображение',
            button: {
                text: 'Использовать это изображение'
            },
            multiple: false // Только одно изображение за раз
        })
            .on('select', function() {
                var attachment = customUploader.state().get('selection').first().toJSON();
                console.log('Выбрано изображение:', attachment); // Отладочное сообщение

                if (attachment.subtype === 'webp') {  // Проверка на формат изображения webp
                    targetInput.val(attachment.url); // Устанавливаем URL в скрытое поле
                    imagePreview.attr('src', attachment.url).show(); // Обновляем URL превью
                    console.log('Изображение установлено:', attachment.url); // Отладочное сообщение
                } else {
                    alert('Пожалуйста, выберите изображение в формате WEBP.'); // Предупреждение, если не webp
                }
            })
            .open();
    });

    // Обработка удаления изображения
    $('.linnikov-agency-remove-image').click(function(e) {
        e.preventDefault();
        var button = $(this);
        var targetInput = $(button.data('target')); // Получаем целевое скрытое поле для URL изображения
        var container = button.closest('.linnikov-image-upload-container'); // Получаем родительский контейнер
        var imagePreview = container.find('.image-preview img'); // Получаем элемент изображения для превью

        targetInput.val(''); // Очистить URL в скрытом поле
        imagePreview.attr('src', '').hide(); // Скрыть превью
    });
});
