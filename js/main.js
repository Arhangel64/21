/**
 * Created by betrayer on 04.04.15.
 */

(function mainjs() {
    var defineArray = [];

    requirejs.config({
        "seed": 1,
        "min": false,
        "baseUrl": "js",
        "waitSeconds": 86400000,
        "shim": {
            "utils/OrbitControls": "bower_components/threejs/build/three.js"
        }
    });

    require(defineArray, function main_preloader_module() {
        var defineArray = [];
        defineArray.push("bower_components/threejs/build/three.js");
        defineArray.push("utils/OrbitControls");
        defineArray.push("core/core");

        require(defineArray, function main_module() {
            var Core =  require("core/core");

            var core = new Core();
            core.loop();
        });
    });
})();