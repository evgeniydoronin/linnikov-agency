jQuery(document).ready(function($) {
    // $('#contact-form').on('submit', function(e) {
    //     e.preventDefault(); // Останавливаем стандартное действие отправки формы
    //
    //     // Собираем данные формы
    //     var formData = new FormData(this);
    //     formData.append('action', 'submit_contact_form'); // Действие для PHP обработчика
    //     formData.append('nonce', ajax_params.nonce); // Наша nonce для безопасности
    //
    //     // Отладка: выводим данные формы в консоль
    //     console.log('Отправка данных формы:');
    //     console.log([...formData.entries()]); // Выводим все поля формы и их значения
    //
    //     // Очищаем предыдущие сообщения
    //     $('.form-msg').text('').hide();
    //
    //     // Выполняем AJAX запрос
    //     $.ajax({
    //         url: ajax_params.ajax_url, // URL обработчика
    //         type: 'POST',
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         success: function(response) {
    //             if (response.success) {
    //                 // Показать сообщение об успехе
    //                 $('.form-msg_success').text(response.data).show();
    //                 $('#contact-form')[0].reset(); // Сбросить форму
    //             } else {
    //                 // Показать сообщение об ошибке
    //                 console.log('Показать сообщение об ошибке')
    //                 $('.form-msg_error').text(response.data).show();
    //             }
    //         },
    //         error: function() {
    //             // Показать сообщение об ошибке
    //             $('.form-msg_error').text('An error occurred. Please try again.').show();
    //         }
    //     });
    // });
    //
    // $('#brief-form').on('submit', function(e) {
    //     e.preventDefault(); // Останавливаем стандартное действие отправки формы
    //
    //     var formData = new FormData(this);
    //
    //     // Собираем все выбранные значения чекбоксов "category[]" и "source[]"
    //     var categories = [];
    //     $('input[name="category[]"]:checked').each(function() {
    //         categories.push($(this).val());
    //     });
    //     var sources = [];
    //     $('input[name="source[]"]:checked').each(function() {
    //         sources.push($(this).val());
    //     });
    //
    //     // Добавляем массивы категорий и источников в данные формы
    //     formData.delete('category[]'); // Удаляем старое поле, если оно было
    //     categories.forEach(function(category) {
    //         formData.append('category[]', category);
    //     });
    //
    //     formData.delete('source[]'); // Удаляем старое поле, если оно было
    //     sources.forEach(function(source) {
    //         formData.append('source[]', source);
    //     });
    //
    //     // Добавляем дополнительные данные для запроса (например, nonce)
    //     formData.append('action', 'submit_brief_form'); // Действие для PHP обработчика
    //     formData.append('nonce', ajax_brief_params.nonce); // Наша nonce для безопасности
    //
    //     // Отладка: выводим все данные формы перед отправкой
    //     console.log('Form data before send:');
    //     for (var pair of formData.entries()) {
    //         console.log(pair[0] + ': ' + pair[1]);
    //     }
    //
    //     // Очищаем предыдущие сообщения
    //     $('.form-msg').text('').hide();
    //
    //     // Выполняем AJAX запрос
    //     $.ajax({
    //         url: ajax_brief_params.ajax_url,
    //         type: 'POST',
    //         data: formData,
    //         processData: false, // Не обрабатываем данные, так как это FormData
    //         contentType: false, // Не устанавливаем content-type, он будет установлен автоматически
    //         success: function(response) {
    //             if (response.success) {
    //                 $('.form-msg_success').text(response.data).show();
    //                 $('#brief-form')[0].reset(); // Сбросить форму
    //             } else {
    //                 $('.form-msg_error').text(response.data).show();
    //             }
    //         },
    //         error: function() {
    //             $('.form-msg_error').text('An error occurred. Please try again.').show();
    //         }
    //     });
    // });

    // $('#designer-application-form').on('submit', function(e) {
    //     e.preventDefault(); // Останавливаем стандартное действие отправки формы
    //
    //     var formData = new FormData(this);
    //
    //     // Собираем все выбранные значения чекбоксов "project_types[]" и "tools[]"
    //     var project_types = [];
    //     $('input[name="project_types[]"]:checked').each(function() {
    //         project_types.push($(this).val());
    //     });
    //
    //     var tools = [];
    //     $('input[name="tools[]"]:checked').each(function() {
    //         tools.push($(this).val());
    //     });
    //
    //     // Добавляем массивы категорий и инструментов в данные формы
    //     formData.delete('project_types[]'); // Удаляем старое поле, если оно было
    //     project_types.forEach(function(type) {
    //         formData.append('project_types[]', type);
    //     });
    //
    //     formData.delete('tools[]'); // Удаляем старое поле, если оно было
    //     tools.forEach(function(tool) {
    //         formData.append('tools[]', tool);
    //     });
    //
    //     // Добавляем дополнительные данные для запроса (например, nonce)
    //     formData.append('action', 'submit_designer_form'); // Действие для PHP обработчика
    //     formData.append('nonce', ajax_designer_params.nonce); // Наша nonce для безопасности
    //
    //     // Выводим все данные формы перед отправкой
    //     console.log('Form data before send:');
    //     for (var pair of formData.entries()) {
    //         console.log(pair[0]+ ': ' + pair[1]);
    //     }
    //
    //     // Очищаем предыдущие сообщения
    //     $('.form-msg').text('').hide();
    //
    //     // Выполняем AJAX запрос
    //     $.ajax({
    //         url: ajax_designer_params.ajax_url,
    //         type: 'POST',
    //         data: formData,
    //         processData: false, // Не обрабатываем данные, так как это FormData
    //         contentType: false, // Не устанавливаем content-type, он будет установлен автоматически
    //         success: function(response) {
    //             if (response.success) {
    //                 $('.form-msg_success').text(response.data).show();
    //                 $('#designer-application-form')[0].reset(); // Сбросить форму
    //             } else {
    //                 $('.form-msg_error').text(response.data).show();
    //             }
    //         },
    //         error: function() {
    //             $('.form-msg_error').text('An error occurred. Please try again.').show();
    //         }
    //     });
    // });
});