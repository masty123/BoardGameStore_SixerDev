$(function () {
    $('input[name="promotion_code"]').hide();

    //show it when the checkbox is clicked
    $('input[name="promotion_check"]').on('click', function () {
        if ($(this).prop('checked')) {
            $('input[name="promotion_code"]').fadeIn();
        } else {
            $('input[name="promotion_code"]').hide();
        }
    });
});
