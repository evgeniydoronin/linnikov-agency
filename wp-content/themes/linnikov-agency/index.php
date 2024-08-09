<?php get_header(); ?>

	<main>
		<?php
		if ( have_posts() ) {
			while ( have_posts() ) {
				the_post();
				// Выводим содержимое поста
				the_content();
			}
		} else {
			echo '<p>No content found</p>';
		}
		?>
	</main>

<?php get_footer();