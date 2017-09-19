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
        $('.loader').css('display', 'inline-block');
        $.post($(this).attr('action'), form.serialize())
            .done(function (data) {
                handleJsonResponse(data);
            });

        return false;
    });
};

var handleJsonResponse = function (data) {
    if (data.success) {
        if (data.redirect) {
            window.location.href = data.redirect;
        }
        if (data.reload) {
            window.location.reload();
        }
    }
};

var whLoadModal = function (modal, href) {
    $('#' + modal + ' .modal-content').html('');
    $.get(href)
        .done(function (data) {
            $('#' + modal + ' .modal-content').html(data);
        });
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
    $('select').select2({
        width: '100%'
    });
};

var setCountChars = function (element) {
    var nbChars = element.val().length;
    element.parent().children('.wh-count-chars-display').html(nbChars + ' characters');
};

var whFormFieldMultiple = function () {
    $('.wh-form-field-multiple').each(function () {
        var tbody = $(this).find('tbody');
        $(this).find('thead a').click(function () {
            var trNumbers = tbody.find('tr').length;

            var newTr = tbody.attr('data-prototype');
            newTr = newTr.replace(/__name__/g, trNumbers);
            newTr = jQuery('<tr></tr>').html(newTr);

            newTr.appendTo(tbody);
            whFormFieldMultipleDelete();
            whListButtonsWriteTdWidth();
            initSelect2();
            initTinyMCE();

            return false;
        });
    });
};

var whFormFieldMultipleDelete = function () {
    $('.wh-form-field-multiple a[data-btn-remove]').click(function () {
        $(this).closest('tr').remove();
        return false;
    });
};

var initCollectionSortable = function () {
    $('tbody').each(function () {
        var tbody = $(this);

        if (tbody.data('sortable')) {
            var list = $(this);

            list.sortable({
                placeholder: 'highlight',
                axis: 'y',
                stop: function () {
                    var nbChildren = tbody.children('tr').length;
                    tbody.children('tr').each(function (key, value) {
                        $(this).find('.sortable-field').val(nbChildren - key);
                    });
                }
            });

            $(this).disableSelection();
        }

    });
};

var writeHrefWhenReady = function () {
    $('a[data-href]').each(function () {
        $(this).attr('href', $(this).attr('data-href'));
    });
};

var functionToReloadOnAjaxRequest = function () {
    whListButtonsWriteTdWidth();
    writeHrefWhenReady();
    whModal();
    whHandleModalAjaxForm();
    whFormFieldMultiple();
    whFormFieldMultipleDelete();
    initCountChars();
    initSelect2();
    initCollectionSortable();
};

$(window).ready(function () {
    whListButtonsWriteTdWidth();
    writeHrefWhenReady();
    whModal();
    whFormFieldMultiple();
    whFormFieldMultipleDelete();
    initCountChars();
    initSelect2();
    initCollectionSortable();
});