<?php
// Handle saving settings
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['linnikov_agency_save_settings'])) {
  // Here we save settings
  update_option('linnikov_agency_setting_example', sanitize_text_field($_POST['linnikov_agency_setting_example']));
}
?>

<form method="post" action="">
  <h2><?php echo __('General Settings', 'linnikov-agency'); ?></h2>

  <table class="form-table">
    <tr valign="top">
      <th scope="row"><?php echo __('Example Setting', 'linnikov-agency'); ?></th>
      <td>
        <input type="text" name="linnikov_agency_setting_example" value="<?php echo esc_attr(get_option('linnikov_agency_setting_example')); ?>" />
      </td>
    </tr>
  </table>

  <?php submit_button(__('Save Settings', 'linnikov-agency')); ?>
</form>