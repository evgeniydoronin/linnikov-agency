jQuery(document).ready(function($) {
    $('#contact-form').on('submit', function(e) {
        e.preventDefault(); // Останавливаем стандартное действие отправки формы

        // Собираем данные формы
        var formData = new FormData(this);
        formData.append('action', 'submit_contact_form'); // Действие для PHP обработчика
        formData.append('nonce', ajax_params.nonce); // Наша nonce для безопасности

        // Очищаем предыдущие сообщения
        $('.form-msg').text('').hide();

        // Выполняем AJAX запрос
        $.ajax({
            url: ajax_params.ajax_url, // URL обработчика
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    // Показать сообщение об успехе
                    $('.form-msg_success').text(response.data).show();
                    $('#contact-form')[0].reset(); // Сбросить форму
                } else {
                    // Показать сообщение об ошибке
                    console.log('Показать сообщение об ошибке')
                    $('.form-msg_error').text(response.data).show();
                }
            },
            error: function() {
                // Показать сообщение об ошибке
                $('.form-msg_error').text('An error occurred. Please try again.').show();
            }
        });
    });
});