jQuery(document).ready(function($) {
    $('#sortable').sortable({
        placeholder: "ui-state-highlight",
        update: function(event, ui) {
            var order = $(this).sortable('toArray').toString();
            $('#work_order').val(order);
        }
    });
    $('#sortable').disableSelection();
});
