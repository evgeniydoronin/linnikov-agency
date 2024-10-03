<?php
// Регистрация AJAX обработчиков для старой и новой формы
add_action('wp_ajax_nopriv_submit_contact_form', 'submit_contact_form');
add_action('wp_ajax_submit_contact_form', 'submit_contact_form');
add_action('wp_ajax_nopriv_submit_brief_form', 'submit_brief_form');
add_action('wp_ajax_submit_brief_form', 'submit_brief_form');
add_action('wp_ajax_nopriv_submit_designer_form', 'submit_designer_form');
add_action('wp_ajax_submit_designer_form', 'submit_designer_form');

// Обработка старой формы (submit_contact_form)
function submit_contact_form() {
  // Проверка nonce для безопасности
  check_ajax_referer('submit_contact_form_nonce', 'nonce');

  // Отладка: выводим все данные, которые пришли в форме
  error_log('POST Data: ' . print_r($_POST, true));

  // Получение и обработка данных формы
  $name = sanitize_text_field($_POST['contact--name']);
  $email = sanitize_email($_POST['contact--email']);
  $message = sanitize_textarea_field($_POST['message']);

  // Обработка чекбоксов (category)
  if (isset($_POST['category'])) {
    if (is_array($_POST['category'])) {
      $category = implode(', ', array_map('sanitize_text_field', $_POST['category']));
      error_log('Category is array: ' . print_r($_POST['category'], true));
    } else {
      $category = sanitize_text_field($_POST['category']);
      error_log('Category is not array: ' . $category);
    }
  } else {
    $category = ''; // Если поле category не передано
  }

  $other_desc = sanitize_textarea_field($_POST['category--other-desc']);

  // Проверка корректности email
  if (!is_email($email)) {
    wp_send_json_error('Invalid email address.');
  }

  // Формирование содержимого письма
  $to = 'evgeniydoronin@gmail.com'; // Замените на нужный email
  $subject = 'New message from contact form';
  $body = "Name: $name\nEmail: $email\nCategory: $category\nMessage: $message\nOther: $other_desc";

  // Отправка письма
  if (wp_mail($to, $subject, $body)) {
    wp_send_json_success('Message sent successfully.');
  } else {
    wp_send_json_error('Failed to send the message.');
  }

  wp_die();
}

// Обработка новой формы (submit_brief_form)
function submit_brief_form() {
  // Проверка nonce для безопасности
  if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'submit_brief_form_nonce')) {
    wp_send_json_error('Nonce verification failed.');
    wp_die();
  }

  // Логируем данные для отладки
  error_log('POST Data: ' . print_r($_POST, true));
  error_log('FILES Data: ' . print_r($_FILES, true));

  // Получение и обработка данных формы
  $name = sanitize_text_field($_POST['contact--name']);
  $email = sanitize_email($_POST['contact--email']);

  // Обработка поля для сообщений, проверка на его наличие
  $message = isset($_POST['plans']) ? sanitize_textarea_field($_POST['plans']) : ''; // Используем поле "plans" как сообщение

  // Обработка множественных значений чекбоксов для категории и источника
  $categories = isset($_POST['category']) && is_array($_POST['category']) ? implode(', ', array_map('sanitize_text_field', $_POST['category'])) : '';
  $sources = isset($_POST['source']) && is_array($_POST['source']) ? implode(', ', array_map('sanitize_text_field', $_POST['source'])) : '';

  // Получение остальных данных формы
  $category_other_desc = sanitize_textarea_field($_POST['category--other-desc']);
  $source_other_desc = sanitize_textarea_field($_POST['source--other-desc']);
  $has_deadline = sanitize_text_field($_POST['has-deadline']);
  $deadline_date = sanitize_text_field($_POST['deadline-date']);
  $start_date = sanitize_text_field($_POST['start-date']);
  $budget = sanitize_text_field($_POST['budget']);
  $proud_of_company = sanitize_textarea_field($_POST['proud-of-in-company']);
  $proud_of_product = sanitize_textarea_field($_POST['proud-of-in-product']);
  $consumer_nature = sanitize_textarea_field($_POST['consumer-nature']);
  $others = sanitize_textarea_field($_POST['others']);
  $why_people_buy = sanitize_textarea_field($_POST['why-people-buy-products']);
  $what_prevents_using = sanitize_textarea_field($_POST['what-prevents-constantly-using']);
  $promises = sanitize_textarea_field($_POST['promises']);
  $what_prevents_first_buy = sanitize_textarea_field($_POST['what-prevents-first-buy']);
  $why_product_is_better = sanitize_textarea_field($_POST['why-product-is-better']);
  $recommendation_words = sanitize_textarea_field($_POST['recomendation-words']);
  $recommendation_one_word = sanitize_textarea_field($_POST['recomendation-one-word']);
  $competitors_desc = sanitize_textarea_field($_POST['competitors-desc']);
  $association = sanitize_textarea_field($_POST['association']);
  $company_character = sanitize_textarea_field($_POST['company-character']);
  $where_people_find = sanitize_textarea_field($_POST['where-people-find']);
  $limitations = sanitize_textarea_field($_POST['limitations']);
  $sex = sanitize_text_field($_POST['sex']);
  $age = sanitize_text_field($_POST['age']);
  $value = sanitize_text_field($_POST['value']);
  $humor = sanitize_text_field($_POST['humor']);
  $complexity = sanitize_text_field($_POST['complexity']);

  // Обработка файла (в случае загрузки)
  if (!empty($_FILES['attachments']['name'])) {
    error_log('Files detected.');
    $uploaded_files = array();

    if (is_array($_FILES['attachments']['name'])) {
      foreach ($_FILES['attachments']['name'] as $key => $value) {
        if ($_FILES['attachments']['error'][$key] == UPLOAD_ERR_OK) {
          $file_tmp_name = $_FILES['attachments']['tmp_name'][$key];
          $original_file_name = sanitize_file_name($_FILES['attachments']['name'][$key]);

          // Создаем уникальное имя файла
          $unique_file_name = uniqid() . '-' . time() . '-' . $original_file_name;
          $upload = wp_upload_bits($unique_file_name, null, file_get_contents($file_tmp_name));

          if (!$upload['error']) {
            $uploaded_files[] = $upload['url'];
            error_log('Uploaded file: ' . $upload['url']);
          } else {
            error_log('File upload error: ' . $upload['error']);
          }
        }
      }
    } else {
      // Если это одиночный файл
      if ($_FILES['attachments']['error'] == UPLOAD_ERR_OK) {
        $file_tmp_name = $_FILES['attachments']['tmp_name'];
        $original_file_name = sanitize_file_name($_FILES['attachments']['name']);

        // Создаем уникальное имя файла
        $unique_file_name = uniqid() . '-' . time() . '-' . $original_file_name;
        $upload = wp_upload_bits($unique_file_name, null, file_get_contents($file_tmp_name));

        if (!$upload['error']) {
          $uploaded_files[] = $upload['url'];
          error_log('Uploaded file: ' . $upload['url']);
        } else {
          error_log('File upload error: ' . $upload['error']);
        }
      }
    }
  } else {
    $uploaded_files = array();
    error_log('No files uploaded.');
  }

  // Формирование содержимого письма
  $recipient_email = 'evgeniydoronin@gmail.com'; // Замените на нужный email
  $subject = 'New brief form submission';
  $body = "Name: $name\nEmail: $email\nCategories: $categories\nCategory Other Desc: $category_other_desc\nSources: $sources\nSource Other Desc: $source_other_desc\nHas Deadline: $has_deadline\nDeadline Date: $deadline_date\nStart Date: $start_date\nBudget: $budget\nProud of Company: $proud_of_company\nProud of Product: $proud_of_product\nConsumer Nature: $consumer_nature\nOthers: $others\nWhy People Buy: $why_people_buy\nWhat Prevents Using: $what_prevents_using\nPromises: $promises\nWhat Prevents First Buy: $what_prevents_first_buy\nWhy Product is Better: $why_product_is_better\nRecommendation Words: $recommendation_words\nRecommendation One Word: $recommendation_one_word\nCompetitors Desc: $competitors_desc\nAssociation: $association\nCompany Character: $company_character\nWhere People Find: $where_people_find\nLimitations: $limitations\nSex: $sex\nAge: $age\nValue: $value\nHumor: $humor\nComplexity: $complexity";

  // Если были загружены файлы, добавляем их ссылки
  if (!empty($uploaded_files)) {
    $body .= "\n\nAttachments:\n" . implode("\n", $uploaded_files);
  }

  // Логирование тела письма перед отправкой
  error_log("Email body: $body");

  // Отправка письма
  if (wp_mail($recipient_email, $subject, $body)) {
    error_log('Email sent successfully.');
    wp_send_json_success('Brief submitted successfully.');
  } else {
    error_log('Failed to send email.');
    wp_send_json_error('Failed to submit the brief.');
  }

  wp_die();
}

// Обработка новой формы (submit_designer_form)
function submit_designer_form() {
  // Проверка nonce
  if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'submit_designer_form_nonce')) {
    error_log('Nonce verification failed.');
    wp_send_json_error('Nonce verification failed.');
    wp_die();
  }

  error_log('Nonce verification successful.');

  // Логируем данные, которые пришли
  error_log('POST Data: ' . print_r($_POST, true));
  error_log('FILES Data: ' . print_r($_FILES, true));

  // Получение данных формы
  $name = sanitize_text_field($_POST['contact--name']);
  $email = sanitize_email($_POST['contact--email']);
  $portfolio_link = sanitize_text_field($_POST['link-to-portfolio']);
  $experience = sanitize_text_field($_POST['experience']);
  $cover_letter = sanitize_textarea_field($_POST['cover-letter']);
  $salary = sanitize_text_field($_POST['salary']);
  $period = sanitize_text_field($_POST['period']);

  // Обработка множественных значений чекбоксов для типов проектов и инструментов
  $project_types = isset($_POST['project_types']) && is_array($_POST['project_types']) ? implode(', ', array_map('sanitize_text_field', $_POST['project_types'])) : 'No project types selected';
  $tools = isset($_POST['tools']) && is_array($_POST['tools']) ? implode(', ', array_map('sanitize_text_field', $_POST['tools'])) : 'No tools selected';

  // Логируем данные для отладки
  error_log("Name: $name");
  error_log("Email: $email");
  error_log("Portfolio: $portfolio_link");
  error_log("Experience: $experience");
  error_log("Cover Letter: $cover_letter");
  error_log("Salary: $salary");
  error_log("Period: $period");
  error_log("Project Types: $project_types");
  error_log("Tools: $tools");

  // Обработка файлов (если они загружены)
  if (!empty($_FILES['attachments']['name'])) {
    error_log('Files detected.');
    $uploaded_files = array();

    // Проверка, является ли это массивом (несколько файлов)
    if (is_array($_FILES['attachments']['name'])) {
      foreach ($_FILES['attachments']['name'] as $key => $value) {
        if ($_FILES['attachments']['error'][$key] == UPLOAD_ERR_OK) {
          $file_tmp_name = $_FILES['attachments']['tmp_name'][$key];
          $original_file_name = sanitize_file_name($_FILES['attachments']['name'][$key]);

          // Создаем уникальное имя файла
          $unique_file_name = uniqid() . '-' . time() . '-' . $original_file_name;
          $upload = wp_upload_bits($unique_file_name, null, file_get_contents($file_tmp_name));

          if (!$upload['error']) {
            $uploaded_files[] = $upload['url'];
            error_log('Uploaded file: ' . $upload['url']);
          } else {
            error_log('File upload error: ' . $upload['error']);
          }
        }
      }
    } else {
      // Если загружен только один файл
      if ($_FILES['attachments']['error'] == UPLOAD_ERR_OK) {
        $file_tmp_name = $_FILES['attachments']['tmp_name'];
        $original_file_name = sanitize_file_name($_FILES['attachments']['name']);

        // Создаем уникальное имя файла
        $unique_file_name = uniqid() . '-' . time() . '-' . $original_file_name;
        $upload = wp_upload_bits($unique_file_name, null, file_get_contents($file_tmp_name));

        if (!$upload['error']) {
          $uploaded_files[] = $upload['url'];
          error_log('Uploaded file: ' . $upload['url']);
        } else {
          error_log('File upload error: ' . $upload['error']);
        }
      }
    }
  } else {
    $uploaded_files = array();
    error_log('No files uploaded.');
  }

  // Формируем тело письма
  $to = 'evgeniydoronin@gmail.com'; // Ваш email
  $subject = 'New Designer Application';
  $body = "Name: $name\nEmail: $email\nPortfolio Link: $portfolio_link\nExperience: $experience\nCover Letter: $cover_letter\nSalary: $salary\nPeriod: $period\nProject Types: $project_types\nTools: $tools";

  // Если есть загруженные файлы, добавляем их ссылки в тело письма
  if (!empty($uploaded_files)) {
    $body .= "\n\nAttachments:\n" . implode("\n", $uploaded_files);
  }

  error_log("Email body: $body");

  // Отправка письма
  if (wp_mail($to, $subject, $body)) {
    wp_send_json_success('Application sent successfully.');
  } else {
    wp_send_json_error('Failed to send application.');
  }

  wp_die();
}



// Подключение скриптов для обеих форм
function custom_enqueue_ajax_script() {
  wp_enqueue_script(
    'custom-ajax-script',
    plugin_dir_url(__FILE__) . '../frontend/js/forms.js', // Путь к файлу скрипта
    array('jquery'),
    null,
    true
  );

  // Локализация для контактной формы
  wp_localize_script('custom-ajax-script', 'ajax_params', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce'    => wp_create_nonce('submit_contact_form_nonce'),
  ));

  // Локализация для формы брифа
  wp_localize_script('custom-ajax-script', 'ajax_brief_params', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce'    => wp_create_nonce('submit_brief_form_nonce'),
  ));

  // Локализация для формы заявки дизайнера
  wp_localize_script('custom-ajax-script', 'ajax_designer_params', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce'    => wp_create_nonce('submit_designer_form_nonce'),
  ));
}
add_action('wp_enqueue_scripts', 'custom_enqueue_ajax_script');