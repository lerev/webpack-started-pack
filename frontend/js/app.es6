import 'normalize.css';
import 'reset-css';
import '../css/app.scss';

$('.send').on('click', function (e) {
    e.preventDefault();

    let thisForm = $(this).parents('form');
    let formData = new FormData(thisForm[0]);

    if (thisForm[0].checkValidity()) {
        thisForm.find('input, select, textarea, .select-styled').css('border-color', '#51456e');

        setTimeout(function () {
            $.ajax({
                url: thisForm.attr('action'),
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false
            }).done(data => {
                thisForm[0].reset();
                $('#callback-form').fadeIn().delay(1500).fadeOut();
            });
        }, 400);
    } else {
        for (let input of thisForm.find('input, select, textarea')) {
            input.checkValidity() && (input.style.borderColor = '#51456e') || (input.style.borderColor = '#FF0000');
        }
    }
});

