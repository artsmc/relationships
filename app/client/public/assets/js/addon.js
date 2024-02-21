requirejs(
    [
        "handlebars",
        "app",
        "vendor",
        "jquery",
        "owl.carousel.min",
    ],
    function (util) {
        requirejs(["home"]);
    }
);
