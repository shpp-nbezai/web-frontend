$(function () {
    const modalEdit  = $('#modal-edit');
    const modalClose = $('.modal-close');
    const editButton = $('.edit-button');

    editButton.on( "click", function() {
        modalEdit.addClass("is-active");
    });

    modalClose.on( "click", function() {
        modalEdit.removeClass("is-active");
    });
});