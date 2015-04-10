/**
 * Created by betrayer on 04.04.15.
 */
(function core_js() {
    var moduleName = "core/core";
    var defineArray = [];
    defineArray.push("utils/class");
    defineArray.push("views/lightSphere");
    defineArray.push("views/test");

    define(moduleName, defineArray, function core_module() {
        var Class = require("utils/class");
        var SphereLight = require("views/lightSphere");
        var Test = require("views/test");

        var Core = Class.inherit({
            constructor: function(options) {
                var that = this;
                window.core = that;

                var base = {
                    active: true
                };
                Class.call(that);
                that.initialize(base);

                var test = new Test({r:50, height: 100});
                that.add(test);
                test.position(new THREE.Vector3(0, 50, 0));

                //var test2 = new Test();
                //that.add(test2);
                //test2.position(new THREE.Vector3(0,0,-3));
                //
                //that.animate({
                //    name:"test",
                //    object:test,
                //    handler: function() {
                //        this.three.rotation.y += 0.01;
                //    }
                //});

                //var cubeG = new THREE.BoxGeometry(100,100,100);
                //var cube = new THREE.Mesh(cubeG, new THREE.MeshPhongMaterial({color: 0x00ff00}));
                //that.scene.add(cube);
                //cube.position.y = 50;
                //cube.castShadow = true;
                //cube.receiveShadow = true;

                var planeG = new THREE.PlaneGeometry(1000,1000);
                var plane = new THREE.Mesh(planeG, new THREE.MeshPhongMaterial({color: 0x00ff00}));
                that.scene.add(plane);

                plane.rotateX(-Math.PI/2);
                plane.receiveShadow = true;

                var light = new THREE.DirectionalLight(0xffffff, 1);
                light.castShadow = true;
                light.shadowMapWidth = 2048*2;
                light.shadowMapHeight = 2048*2;
                //light.shadowCascade = true;
                that.scene.add(light);
                light.position.y = 1500;
                light.position.x = 2000;
                light.position.z = 1700;
            },
            loop: function() {
                var that = this;

                if (that.active) {
                    requestAnimationFrame( that.proxy.loop );

                    for (var key in that.animations) {
                        if (that.animations.hasOwnProperty(key)) {
                            that.animations[key].handler.call(that.animations[key].object, that.time);
                        }
                    }
                    that.time++;
                    that.renderer.render( that.scene, that.camera );
                }
            },
            animate: function(param) {
                var that = this;

                if (!param.name || !param.handler || !param.object || that.animations[param.name]) return;

                that.animations[param.name] = {
                    handler: param.handler,
                    object: param.object
                }
            },
            stopAnimation: function(name) {
                var that = this;
                if (!name) return;
                delete that.animations[name];
            },
            add: function(view) {
                var that = this;

                that.scene.add(view.three);
            },
            initialize: function(base) {
                var that = this;

                that.active = base.active;
                that.proxy = {
                    loop: that.loop.bind(that)
                };
                that.animations = {};
                that.time = 0;

                var scene = that.scene = new THREE.Scene();
                var camera = that.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

                var renderer = that.renderer = new THREE.WebGLRenderer({antialias: true});
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.shadowMapEnabled = true;
                renderer.shadowMapType = THREE.PCFSoftShadowMap;
                renderer.shadowMapCascade = true;
                document.body.appendChild(renderer.domElement);


                var alight = new THREE.AmbientLight( 0x404040 ); // soft white light
                scene.add( alight );
                camera.position.z = 200;

                new THREE.OrbitControls(camera, document, renderer.domElement);
            }
        });

        return Core;
    });
})();