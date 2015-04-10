/**
 * Created by betrayer on 07.04.15.
 */
(function view_object_js() {
    var moduleName = "views/object";

    var defineArray = [];
    defineArray.push("utils/class");

    define(moduleName, defineArray, function view_object_module() {
        var Class = require("utils/class");

        var Object = Class.inherit({
            constructor: function(options) {
                var that = this;

                Class.call(that);

                that.three = new THREE.Object3D(options);
            },
            position: function(vector) {
                var that = this;

                var m = new THREE.Matrix4();
                m.setPosition(vector);
                that.three.applyMatrix(m);
            }/*,
            applyMatrix: function() {
                return this.three.applyMatrix(arguments);
            },
            translateX: function() {
                return this.three.translateX(arguments);
            },
            translateY: function() {
                return this.three.translateY(arguments);
            },
            translateZ: function() {
                return this.three.translateZ(arguments);
            },
            localToWorld: function() {
                return this.three.localToWorld(arguments);
            },
            worldToLocal: function() {
                return this.three.worldToLocal(arguments);
            },
            lookAt: function() {
                return this.three.lookAt(arguments);
            },
            add: function() {
                return this.three.add(arguments);
            },
            remove: function() {
                return this.three.remove(arguments);
            },
            traverse: function() {
                return this.three.traverse(arguments);
            },
            traverseVisible: function() {
                return this.three.traverseVisible(arguments);
            },
            traverseAncestors: function() {
                return this.three.traverseAncestors(arguments);
            },
            updateMatrix: function() {
                return this.three.updateMatrix(arguments);
            },
            updateMatrixWorld: function() {
                return this.three.updateMatrixWorld(arguments);
            },
            clone: function() {
                return this.three.clone(arguments);
            },
            getObjectByName: function() {
                return this.three.getObjectByName(arguments);
            },
            getObjectById: function() {
                return this.three.getObjectById(arguments);
            },
            translateOnAxis: function() {
                return this.three.translateOnAxis(arguments);
            },
            rotateOnAxis: function() {
                return this.three.rotateOnAxis(arguments);
            },
            raycast: function() {
                return this.three.raycast(arguments);
            }*/
        });
        return Object;
    });
})();