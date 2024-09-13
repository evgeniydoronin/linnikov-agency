<?php
// Обработка сохранения настроек
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['linnikov_agency_save_social_settings'])) {
  update_option('linnikov_agency_facebook_url', esc_url_raw($_POST['linnikov_agency_facebook_url']));
  update_option('linnikov_agency_twitter_url', esc_url_raw($_POST['linnikov_agency_twitter_url']));
  update_option('linnikov_agency_linkedin_url', esc_url_raw($_POST['linnikov_agency_linkedin_url']));
  update_option('linnikov_agency_instagram_url', esc_url_raw($_POST['linnikov_agency_instagram_url']));
}
?>

<form method="post" action="">
  <h2><?php echo __('Social Media Links', 'linnikov-agency'); ?></h2>

  <table class="form-table">
    <tr valign="top">
      <th scope="row"><?php echo __('Facebook URL', 'linnikov-agency'); ?></th>
      <td>
        <input type="url" name="linnikov_agency_facebook_url" value="<?php echo esc_attr(get_option('linnikov_agency_facebook_url')); ?>" style="width: 100%;" />
      </td>
    </tr>
    <tr valign="top">
      <th scope="row"><?php echo __('Twitter URL', 'linnikov-agency'); ?></th>
      <td>
        <input type="url" name="linnikov_agency_twitter_url" value="<?php echo esc_attr(get_option('linnikov_agency_twitter_url')); ?>" style="width: 100%;" />
      </td>
    </tr>
    <tr valign="top">
      <th scope="row"><?php echo __('LinkedIn URL', 'linnikov-agency'); ?></th>
      <td>
        <input type="url" name="linnikov_agency_linkedin_url" value="<?php echo esc_attr(get_option('linnikov_agency_linkedin_url')); ?>" style="width: 100%;" />
      </td>
    </tr>
    <tr valign="top">
      <th scope="row"><?php echo __('Instagram URL', 'linnikov-agency'); ?></th>
      <td>
        <input type="url" name="linnikov_agency_instagram_url" value="<?php echo esc_attr(get_option('linnikov_agency_instagram_url')); ?>" style="width: 100%;" />
      </td>
    </tr>
  </table>

  <?php submit_button(__('Save Social Media Links', 'linnikov-agency')); ?>
  <input type="hidden" name="linnikov_agency_save_social_settings" value="1" />
</form>