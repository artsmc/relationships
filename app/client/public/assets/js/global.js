const parts = window.location.pathname.split('/');
function validationError(text) {
    Toastify({
        text,
        duration: 3000
    }).showToast();
}
function successToast(text) {
    Toastify({
        text,
        backgroundColor: '#faeabe',
        style: {
            color: "#2d2d2d",
        },
        duration: 3000
    }).showToast();
}

