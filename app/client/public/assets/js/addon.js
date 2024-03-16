requirejs(
    [
        "handlebars",
        "app",
        "vendor",
        "jquery",
        "global"
    ],
    function (util) {
        requirejs(["pixi.app"], function (konvaStage) {
            requirejs(["home"], function (splineApp) {
                
            })
        });
    }
);
