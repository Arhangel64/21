/**
 * Created by betrayer on 07.04.15.
 */
(function view_lightSphere_js () {
    var moduleName = "views/lightSphere";

    var defineArray = [];
    defineArray.push("views/object");
    defineArray.push("utils/tools");

    define(moduleName, defineArray, function view_lightSphere_module() {
        var Object = require("views/object");
        var Tools = require("utils/tools");

        var LigntSphere = Object.inherit({
            constructor: function(options) {
                var that = this;

                options = options || {};
                var base = {
                    r: 0.01
                };
                Tools.Extend(base, options);

                Object.fn.constructor.call(that, base);

                var light = new THREE.SpotLight(0xffffff, 2);
                light.castShadow = true;
                light.shadowMapWidth = 1024;
                light.shadowMapHeight = 1024;

                light.shadowCameraNear = 500;
                light.shadowCameraFar = 4000;
                light.shadowCameraFov = 30;
                that.three.add(light);
                that.three.add(new THREE.Mesh(new THREE.SphereGeometry(base.r, 20, 20), new THREE.MeshPhongMaterial({
                    color: 0xffff80,
                    shininess: 100,
                    specular: 0xffff80
                })));
                that.three.castShadow = true;
            },
            rotate: function(param) {
                var that = this;
                that.position(param.center);
                that._rotation = {
                    x: that.three.position.x,
                    y: that.three.position.y,
                    z: that.three.position.z,
                    dx: 0,
                    dy: 0,
                    dz: 0,
                    axis: param.axis,
                    speed: param.speed,
                    r: param.radius
                };
                switch (param.axis) {
                    case "x":
                    case "y":
                        that._rotation.dz = Math.PI/2;
                        break;
                    case "z":
                        that._rotation.dy = Math.PI/2;
                        break;
                    default :
                        return;
                }
                core.animate({
                    name: that.three.uuid + "sphereLightRotation", //todo
                    object: that,
                    handler: function(t) {
                        var that = this;
                        if (that._rotation.axis !== "x") {
                            that.three.position.x = that._rotation.x + that._rotation.r * Math.sin(that._rotation.speed * (2*Math.PI*t/3600) + that._rotation.dx);
                        }
                        if (that._rotation.axis !== "y") {
                            that.three.position.y = that._rotation.y + that._rotation.r * Math.sin(that._rotation.speed *(2*Math.PI*t/3600) + that._rotation.dy);
                        }
                        if (that._rotation.axis !== "z") {
                            that.three.position.z = that._rotation.z + that._rotation.r * Math.sin(that._rotation.speed *(2*Math.PI*t/3600) + that._rotation.dz);
                        }
                    }
                })
            }
        });

        return LigntSphere;
    });
})();