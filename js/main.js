/**
 * Created by betrayer on 04.04.15.
 */

(function mainjs() {
    var defineArray = [];

    requirejs.config({
        "seed": 1,
        "min": false,
        "baseUrl": "js",
        "waitSeconds": 86400000/*,
        "shim": {
            "/vendor/bower_components/bootstrap/dist/js/bootstrap": "/vendor/bower_components/jquery/dist/jquery"
        }*/
    });

    require(defineArray, function main_preloader_module() {
        var defineArray = [];
        defineArray.push("bower_components/threejs/build/three.js");
        defineArray.push("core/core");

        require(defineArray, function main_module() {
            var Core =  require("core/core");

            new Core();
        });
    });
})();