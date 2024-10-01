jQuery(document).ready(function ($) {
    /////////////////////////////////////////////

    // Сортировка элементов (оставляем как есть)
    if ($('#sortable').length) {
        $('#sortable').sortable({
            handle: '.drag-handle', // Используем только .drag-handle для перетаскивания
            placeholder: "ui-state-highlight",
            update: function (event, ui) {
                var order = $(this).sortable('toArray').toString();
                $('#work_order').val(order);
            }
        });
        $('#sortable').disableSelection(); // Отключение возможности выделения текста
    }

    // Отслеживание изменения заголовка поста
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

    /////////////////////////////////////////////

    // Универсальная функция для загрузки изображения
    $(document).on('click', '.linnikov-agency-upload-image', function (e) {
        e.preventDefault();

        var button = $(this);
        var targetInput = $(button.data('target')); // Получаем целевое скрытое поле для URL изображения
        var previewContainer = $(button.data('preview')); // Элемент для превью изображения
        var removeButton = $(button.data('remove-button')); // Кнопка удаления

        // Создаем новый экземпляр медиазагрузчика для каждой загрузки
        var mediaUploader = wp.media({
            title: 'Выберите изображение',
            button: {
                text: 'Использовать это изображение'
            },
            multiple: false // Только одно изображение за раз
        });

        // Когда изображение выбрано, обработка выбора
        mediaUploader.on('select', function () {
            var attachment = mediaUploader.state().get('selection').first().toJSON();

            // Сохраняем URL изображения в скрытое поле
            targetInput.val(attachment.url);

            // Обновляем превью изображения
            if (previewContainer.length) {
                previewContainer.html('<img src="' + attachment.url + '" style="max-width: 200px;">').show();
            }

            // Показываем кнопку удаления
            if (removeButton.length) {
                removeButton.show();
            }
        });

        // Открытие медиазагрузчика
        mediaUploader.open();
    });

    // Универсальная функция для удаления изображения
    $(document).on('click', '.linnikov-agency-remove-image', function (e) {
        e.preventDefault();

        var button = $(this);
        var targetInput = $(button.data('target')); // Получаем целевое скрытое поле для URL изображения
        var previewContainer = $(button.data('preview')); // Элемент для превью изображения

        // Очищаем поле и скрываем превью
        targetInput.val('');
        if (previewContainer.length) {
            previewContainer.html('').hide();
        }

        // Скрываем кнопку удаления
        button.hide();
    });

    // // Универсальная функция для загрузки изображения
    // var mediaUploader;
    // $(document).on('click', '.linnikov-agency-upload-image', function(e) {
    //     e.preventDefault();
    //     var button = $(this);
    //     var targetInput = $(button.data('target')); // Получаем целевое скрытое поле для URL изображения
    //     var previewContainer = $(button.data('preview')); // Элемент для превью изображения
    //
    //     // Открытие медиабиблиотеки
    //     if (mediaUploader) {
    //         mediaUploader.open();
    //         return;
    //     }
    //
    //     mediaUploader = wp.media({
    //         title: 'Выберите изображение',
    //         button: {
    //             text: 'Использовать это изображение'
    //         },
    //         multiple: false // Только одно изображение за раз
    //     })
    //         .on('select', function() {
    //             var attachment = mediaUploader.state().get('selection').first().toJSON();
    //             console.log('Выбрано изображение:', attachment); // Отладка
    //
    //             // Сохраняем URL изображения
    //             targetInput.val(attachment.url); // Установка URL в скрытое поле
    //
    //             // Убедимся, что есть контейнер для превью и обновим его
    //             if (previewContainer.length) {
    //                 previewContainer.html('<img src="' + attachment.url + '" style="max-width: 200px;">').show(); // Обновляем превью
    //             } else {
    //                 console.log('Элемент превью не найден.');
    //             }
    //
    //             console.log('Изображение установлено:', attachment.url); // Отладка
    //             $(button.data('remove-button')).show(); // Показываем кнопку удаления
    //         })
    //         .open();
    // });
    //
    // // Универсальная функция для удаления изображения
    // $(document).on('click', '.linnikov-agency-remove-image', function(e) {
    //     e.preventDefault();
    //     var button = $(this);
    //     var targetInput = $(button.data('target')); // Получаем целевое скрытое поле для URL изображения
    //     var previewContainer = $(button.data('preview')); // Элемент для превью изображения
    //
    //     targetInput.val(''); // Очистка поля URL
    //     if (previewContainer.length) {
    //         previewContainer.html('').hide(); // Скрываем превью
    //     }
    //     button.hide(); // Скрываем кнопку удаления
    // });

    //////////////////////////////////////////////

    // Функция для добавления новой секции Testimonials
    function addTestimonialSection() {
        let index = $('.testimonial-section').length;
        let newSection = `
        <div class="testimonial-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">
            <label>${wp.i18n.__('Company Name', 'linnikov-agency')}</label>
            <input type="text" name="testimonials[${index}][company]" style="width:100%;" />

            <label>${wp.i18n.__('Client Name', 'linnikov-agency')}</label>
            <input type="text" name="testimonials[${index}][client]" style="width:100%;" />

            <label>${wp.i18n.__('Job Title', 'linnikov-agency')}</label>
            <input type="text" name="testimonials[${index}][job]" style="width:100%;" />

            <label>${wp.i18n.__('Client Image', 'linnikov-agency')}</label>
            <input type="hidden" id="testimonial_client_image_${index}" name="testimonials[${index}][image]">
            <button type="button" class="button linnikov-agency-upload-image" data-target="#testimonial_client_image_${index}" data-preview="#testimonial_image_preview_${index}" data-remove-button="#remove_testimonial_image_${index}">${wp.i18n.__('Upload Image', 'linnikov-agency')}</button>
            <button type="button" class="button linnikov-agency-remove-image" id="remove_testimonial_image_${index}" data-target="#testimonial_client_image_${index}" data-preview="#testimonial_image_preview_${index}" style="display:none;">${wp.i18n.__('Remove Image', 'linnikov-agency')}</button>

            <div id="testimonial_image_preview_${index}" style="margin-top: 10px;"></div>

            <label>${wp.i18n.__('Testimonial Part 1', 'linnikov-agency')}</label>
            <textarea name="testimonials[${index}][part1]" rows="4" style="width:100%;"></textarea>

            <label>${wp.i18n.__('Testimonial Part 2', 'linnikov-agency')}</label>
            <textarea name="testimonials[${index}][part2]" rows="4" style="width:100%;"></textarea>

            <button type="button" class="button remove-testimonial-section" style="margin-top: 10px;">${wp.i18n.__('Remove Testimonial', 'linnikov-agency')}</button>
        </div>`;
        $('#testimonials-sections-container').append(newSection);
    }

    // Обработка добавления новой секции
    $('.add-testimonial-section').on('click', function () {
        addTestimonialSection();
    });

    // Обработка удаления секции
    $(document).on('click', '.remove-testimonial-section', function () {
        $(this).closest('.testimonial-section').remove();
    });

    /////////////////////////////////////////////

    // Функция для добавления новой секции Awards
    function addAwardSection() {
        let index = $('.award-section').length;
        let newSection = `
        <li class="award-section" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc;">
            <label>${wp.i18n.__('Award Image', 'linnikov-agency')}</label>
            <input type="hidden" id="award_image_${index}" name="awards[${index}][image]">
            <button type="button" class="button linnikov-agency-upload-image" data-target="#award_image_${index}" data-preview="#award_image_preview_${index}" data-remove-button="#remove_award_image_${index}">${wp.i18n.__('Upload Image', 'linnikov-agency')}</button>
            <button type="button" class="button linnikov-agency-remove-image" id="remove_award_image_${index}" data-target="#award_image_${index}" data-preview="#award_image_preview_${index}" style="display:none;">${wp.i18n.__('Remove Image', 'linnikov-agency')}</button>

            <div id="award_image_preview_${index}" style="margin-top: 10px;"></div>

            <label>${wp.i18n.__('Award Year', 'linnikov-agency')}</label>
            <input type="text" name="awards[${index}][year]" style="width:100%;" />

            <label>${wp.i18n.__('Award Name', 'linnikov-agency')}</label>
            <input type="text" name="awards[${index}][award_name]" style="width:100%;" />

            <label>${wp.i18n.__('Project Name', 'linnikov-agency')}</label>
            <input type="text" name="awards[${index}][project_name]" style="width:100%;" />

            <label>${wp.i18n.__('Award Description', 'linnikov-agency')}</label>
            <textarea name="awards[${index}][description]" rows="4" style="width:100%;"></textarea>

            <button type="button" class="button remove-award-section" style="margin-top: 10px;">${wp.i18n.__('Remove Award', 'linnikov-agency')}</button>
        </li>`;
        $('#awards-sections-container').append(newSection);
    }

    // Обработка добавления новой секции
    $('.add-award-section').on('click', function () {
        addAwardSection();
    });

    // Обработка удаления секции
    $(document).on('click', '.remove-award-section', function () {
        $(this).closest('.award-section').remove();
    });

});
