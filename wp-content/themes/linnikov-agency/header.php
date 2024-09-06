<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1" interactive-widget="resizes-visual">
  <title><?php wp_title('|', true, 'right'); ?></title>
	<?php wp_head(); ?>
</head>
<body class="<?php
if (is_singular('work')) {
  echo 'single-work';
} elseif (is_page_template('templates/single-work.php')) {
  echo 'template-single-work';
} elseif (is_page_template('templates/another-template.php')) {
  echo 'template-another';
} else {
  echo 'default-class'; // Добавьте свой класс по умолчанию, если это необходимо
}
?>">
