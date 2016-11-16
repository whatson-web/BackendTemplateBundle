var whListButtonsWriteTdWidth = function () {
    $('.wh-list-buttons').each(function () {
        var width = 0;
        $($(this).children('li')).each(function () {
            width += $(this).width() + parseInt($(this).css('margin-left')) + parseInt($(this).css('margin-right'));
        });

        var parentTd = $(this).parent('td');
        width += parseInt(parentTd.css('padding-left')) + parseInt(parentTd.css('padding-right'));
        width += 5;

        parentTd.css('width', width + 'px');
    });
};

var whModal = function () {
    $('a[data-modal]').click(function () {
        whLoadModal($(this).data('modal'), $(this).attr('href'));
        $('#' + $(this).data('modal')).modal('show');

        return false;
    });
};

var whHandleModalAjaxForm = function () {
    var form = $('#modalAjax form');

    $(form).find('button[type=submit]').each(function () {
        $(this).click(function () {
            $(form).attr('action', $(form).attr('action') + '?submitButton=' + $(this).data('submit-name'))
        });
    });

    form.on('submit', function () {
        $.post($(this).attr('action'), form.serialize())
            .done(function (data) {
                handleJsonResponse(data);
            });

        return false;
    });
};

var handleJsonResponse = function (data) {
    if (data.success) {
        window.location.href = data.redirect;
    }
};

var whLoadModal = function (modal, href) {
    $('#' + modal + ' .modal-content').load(href);
};

var initCountChars = function () {
    $('.wh-count-chars').each(function () {
        $(this).after('<span class="wh-count-chars-display"></span>');
        setCountChars($(this));
        $(this).on('input', function () {
            setCountChars($(this));
        });
    });
};

var initSelect2 = function () {
    $('select').select2();
};

var setCountChars = function(element) {
    var nbChars = element.val().length;
    element.parent().children('.wh-count-chars-display').html(nbChars + ' caractères');
};

var functionToReloadOnAjaxRequest = function () {
    whListButtonsWriteTdWidth();
    whModal();
    whHandleModalAjaxForm();
    initCountChars();
    initSelect2();
};

$(window).ready(function () {
    whListButtonsWriteTdWidth();
    whModal();
    initCountChars();
    initSelect2();
});