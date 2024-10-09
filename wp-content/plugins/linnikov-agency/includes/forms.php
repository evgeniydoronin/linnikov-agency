<?php
// Регистрация AJAX обработчиков для старой и новой формы
add_action('wp_ajax_nopriv_submit_contact_form', 'submit_contact_form');
add_action('wp_ajax_submit_contact_form', 'submit_contact_form');
add_action('wp_ajax_nopriv_submit_brief_form', 'submit_brief_form');
add_action('wp_ajax_submit_brief_form', 'submit_brief_form');
add_action('wp_ajax_nopriv_submit_designer_form', 'submit_designer_form');
add_action('wp_ajax_submit_designer_form', 'submit_designer_form');

// Обработка формы (submit_contact_form)
function submit_contact_form()
{
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
    wp_send_json_success('Thank you for reaching out! We’ve sent you an email with the next steps. Check your inbox!');
  } else {
    wp_send_json_error('Failed to send the message.');
  }

  wp_die();
}

// Обработка формы (submit_brief_form)
function submit_brief_form()
{
  // Проверка nonce для безопасности
  if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'submit_brief_form_nonce')) {
    wp_send_json_error('Nonce verification failed.');
    wp_die();
  }

  // Логирование данных для отладки
  error_log('POST Data: ' . print_r($_POST, true));
  error_log('FILES Data: ' . print_r($_FILES, true));

  // Получение типа брифа
  $brief_type = sanitize_text_field($_POST['brief_type']);

  // Получение и обработка данных формы
  $name = sanitize_text_field($_POST['contact--name']);
  $email = sanitize_email($_POST['contact--email']);

  // Определение количества вопросов для каждого типа брифа
  $questions_count = 0;
  if ($brief_type === 'branding') {
    $questions_count = 18;

    $questions_text = [
      1 => "What will we be working with? Is this a first-time launch or a rebranding? What’s the name of the product or service? Do you already have a website? If so, please share the link with us.",
      2 => "What are you most proud of in your company?",
      3 => "What are you most proud of about your product?",
      4 => "What are the company's plans and objectives?",
      5 => "What is the nature and lifestyle of your product’s consumer?",
      6 => "What other audiences interact with your company and product, besides the end buyer?",
      7 => "Why do people buy products in your category?",
      8 => "What barriers keep people from consistently using products in your category?",
      9 => "What do you promise to people who use products from other categories?",
      10 => "What prevents people from purchasing your product?",
      11 => "How do you convince customers that your product is better?",
      12 => "What words or phrases do people use when recommending your product?",
      13 => "What is the one word people most often use to recommend your product?",
      14 => "Who are your competitors, and what do they promise?",
      15 => "What can you compare your product or company to?",
      16 => "If you were to compare your product or company to a person, what would its nature or character be?",
      17 => "Where do people typically learn about your product?",
      18 => "Are there any limitations that must be considered?",
    ];
  } elseif ($brief_type === 'packaging') {
    $questions_count = 18;

    $questions_text = [
      1 => "What product are we working with? Is this a first-time launch or a redesign? What’s the name of the product? Do you have a website or any existing packaging design? If so, please share the link or details with us.",
      2 => "What are you most proud of in your product's packaging?",
      3 => "What are the company's plans and objectives related to packaging? We’re not looking for financial goals, but rather the company's social responsibility or the purpose behind your packaging choices.",
      4 => "What is the nature and lifestyle of your product’s consumer? Please describe all your target groups in detail, including how packaging influences their decisions.",
      5 => "Why do people buy products in your category? How does packaging contribute to their decision-making process?",
      6 => "What barriers keep people from consistently using products in your category? Could packaging be a factor?",
      7 => "What prevents people from purchasing your product, either for the first time or as a repeat customer? Does packaging play a role in this?",
      8 => "How do you convince customers that your product's packaging is better than competing alternatives?",
      9 => "What words or phrases do people use when recommending your product or company to friends or on social media, specifically regarding its packaging?",
      10 => "Who are your competitors, and what do they promise to their audience through their packaging?",
      11 => "If you were to compare your product's packaging to a person, what would its nature or character be?",
      12 => "Where do people typically learn about your product, and how does packaging affect their first impression?",
      13 => "What is the price positioning within your product category?",
      14 => "What do you want to achieve with the development of the packaging design? What is the main message the packaging design needs to communicate?",
      15 => "What packaging format and materials do you have in mind for manufacturing?",
      16 => "Do you need us to develop a custom packaging form or diecut, or will it be provided by you or the production company?",
      17 => "How many SKUs are there in the product line?",
      18 => "Are there any limitations that must be considered in packaging design, such as an existing brand manual, results from marketing research, the product name, logo, diecuts, or any other technical specifications?",
    ];
  } elseif ($brief_type === 'design') {
    $questions_count = 14;

    $questions_text = [
      1 => "What will we be working with? Is this a first-time launch or a redesign? What’s the name of the product or service? Do you already have a website? If so, please share the link with us.",
      2 => "What are you most proud of in your company?",
      3 => "What are the company's plans and objectives for the new website? We’re not looking for financial goals, but rather the company's purpose or vision behind this project.",
      4 => "What is the nature and lifestyle of your target user? Please describe your target audiences in detail. How should the website appeal to them?",
      5 => "How do you convince customers that your product is better than competing alternatives, and how should the website support that message?",
      6 => "Who are your competitors, and what are their websites? What do you like or dislike about them?",
      7 => "What design style should the website reflect? (e.g., modern, trustworthy, innovative)? Please share any examples of design styles you like.",
      8 => "What functionality is critical for the website (e.g., e-commerce, booking system, blog)?",
      9 => "What is your timeline for launching the website?",
      10 => "Will content migration be necessary from your current website?",
      11 => "How many pages or sections will the website have approximately, and do you have an existing sitemap?",
      12 => "Do you need integration with any external tools or platforms (e.g., CRM, email marketing, payment gateways)?",
      13 => "Will the website need to support multiple languages? If yes, please list all the languages required.",
      14 => "Are there any limitations that must be considered, such as existing branding, content, CMS, or technical specifications?",
    ];
  } elseif ($brief_type === 'website') {
    $questions_count = 11; // Для "Design" 10 вопросов

    $questions_text = [
      1 => "What is the name of the product or service? Do you have a website? If so, please share the link with us.",
      2 => "What are the company’s plans and objectives with this design project? (We’re not looking for financial goals but rather the purpose or vision behind it.)",
      3 => "Who is your target audience, and how should the design appeal to them?",
      4 => "What are the specific goals you want to achieve with this design?",
      5 => "What specifically should we create for you?",
      6 => "What are the required size, format, or/and number of pages?",
      7 => "Will the design be printed, used digitally, or do you need both versions?",
      8 => "What content will you provide? (e.g., text, photos, illustrations, source files of current visual communication)",
      9 => "What is the main idea or message the design should communicate?",
      10 => "Do you have any preferences or wishes for the style of the design?",
      11 => "Are there any limitations we need to consider, such as an existing brand manual, marketing research results, or specific logos and names?",
    ];
  }

  // Обработка множественных значений чекбоксов для категории и источника
  $categories = isset($_POST['category']) && is_array($_POST['category']) ? implode(', ', array_map('sanitize_text_field', $_POST['category'])) : '';
  $sources = isset($_POST['source']) && is_array($_POST['source']) ? implode(', ', array_map('sanitize_text_field', $_POST['source'])) : '';
  $category_other_desc = sanitize_textarea_field($_POST['category--other-desc']);
  $source_other_desc = sanitize_textarea_field($_POST['source--other-desc']);
  $has_deadline = sanitize_text_field($_POST['has-deadline']);
  $deadline_date = sanitize_text_field($_POST['deadline-date']);
  $start_date = sanitize_text_field($_POST['start-date']);
  $budget = sanitize_text_field($_POST['custom_budget']);

  // Получение всех вопросов в зависимости от типа брифа
  $questions = [];
  for ($i = 1; $i <= $questions_count; $i++) {
    $questions[] = sanitize_textarea_field($_POST["question_$i"]);
  }

  // Дополнительные поля
  $sex = sanitize_text_field($_POST['sex']);
  $age = sanitize_text_field($_POST['age']);
  $value = sanitize_text_field($_POST['value']);
  $humor = sanitize_text_field($_POST['humor']);
  $complexity = sanitize_text_field($_POST['complexity']);

  // Обработка файлов (в случае загрузки)
  $uploaded_files = [];
  if (!empty($_FILES['attachments']['name'])) {
    error_log('Files detected.');

    if (is_array($_FILES['attachments']['name'])) {
      // Множественная загрузка файлов
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
      // Одиночная загрузка файла
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
    error_log('No files uploaded.');
  }

  // Формирование содержимого письма в заданном порядке
  $body = "
  Name: $name\n
  Email: $email\n
  Type of brief: $brief_type\n
  Categories: $categories\n
  Category Other Desc: $category_other_desc\n
  Sources: $sources\n
  Source Other Desc: $source_other_desc\n
  Has Deadline: $has_deadline\n
  Deadline Date: $deadline_date\n
  Start Date: $start_date\n
  Budget: $budget\n\n
  Questions: $budget\n\n";

  // Добавляем вопросы с их заголовками и ответами в нужной последовательности
  foreach ($questions as $index => $answer) {
    // Изменяем $index + 1 на просто $index, так как $questions начинается с 1
    if (isset($questions_text[$index + 1])) {
      $body .= ($index + 1) . ". " . $questions_text[$index + 1] . "\nAnswer:\n $answer\n\n";
    }
  }

  // Добавляем дополнительные поля
  $body .= "
  Sex: $sex\n
  Age: $age\n
  Value: $value\n
  Humor: $humor\n
  Complexity: $complexity\n";

  // Если были загружены файлы, добавляем их ссылки
  if (!empty($uploaded_files)) {
    $body .= "\n\nAttachments:\n" . implode("\n", $uploaded_files);
  }

  // Логирование тела письма перед отправкой
  error_log("Email body: $body");

  // Отправка письма
  $recipient_email = 'evgeniydoronin@gmail.com'; // Замените на нужный email
  $subject = 'New brief form submission';

  if (wp_mail($recipient_email, $subject, $body)) {
    error_log('Thank you for reaching out! We’ve sent you an email with the next steps. Check your inbox!');
    wp_send_json_success('Brief submitted successfully.');
  } else {
    error_log('Failed to send email.');
    wp_send_json_error('Failed to submit the brief.');
  }

  wp_die();
}

// Обработка формы (submit_designer_form)
function submit_designer_form()
{
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
function custom_enqueue_ajax_script()
{
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
    'nonce' => wp_create_nonce('submit_contact_form_nonce'),
  ));

  // Локализация для формы брифа
  wp_localize_script('custom-ajax-script', 'ajax_brief_params', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce' => wp_create_nonce('submit_brief_form_nonce'),
  ));

  // Локализация для формы заявки дизайнера
  wp_localize_script('custom-ajax-script', 'ajax_designer_params', array(
    'ajax_url' => admin_url('admin-ajax.php'),
    'nonce' => wp_create_nonce('submit_designer_form_nonce'),
  ));
}

add_action('wp_enqueue_scripts', 'custom_enqueue_ajax_script');