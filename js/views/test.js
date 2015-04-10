/**
 * Created by betrayer on 08.04.15.
 */
(function view_test_js() {
    var moduleName = "views/test";
    var defineArray = [];
    defineArray.push("views/object");
    defineArray.push("utils/tools");
    define(moduleName, defineArray, function view_test_module() {
        var Object = require("views/object");
        var Tools = require("utils/tools");

        var Test = Object.inherit({
            constructor: function(options) {
                var that = this;
                options = options || {};
                var base = {
                    segments: 50,
                    r: 1,
                    thickness: 0.1,
                    space: Math.PI/4,
                    height: 2
                };
                Tools.Extend(base, options);

                Object.fn.constructor.call(that, base);
                that.initGeometry(base);
            },
            initGeometry: function(base) {
                var that = this;

                var main = new THREE.CylinderGeometry(base.r, base.r, base.height, base.segments, 1, true, 0, 2*Math.PI - base.space);
                var inside = new THREE.Geometry();
                var thetaLength = 2*Math.PI - base.space;
                var heightHalf = base.height / 2;

                var vertices = [], uvs = [];
                for ( var y = 0; y <= 1; y ++ ) {
                    var verticesRow = [];
                    var uvsRow = [];
                    var radius = base.r - base.thickness;
                    for ( var x = 0; x <= base.segments; x ++ ) {
                        var u = x / base.segments;
                        var vertex = new THREE.Vector3();
                        vertex.x = radius * Math.sin( u * thetaLength );
                        vertex.y = - y * base.height + heightHalf;
                        vertex.z = radius * Math.cos( u * thetaLength  );
                        inside.vertices.push( vertex );
                        verticesRow.push( inside.vertices.length - 1 );
                        uvsRow.push( new THREE.Vector2( u, 1 - y ) );
                    }
                    vertices.push( verticesRow );
                    uvs.push( uvsRow );
                }
                for ( x = 0; x < base.segments; x ++ ) {
                    var na = inside.vertices[ vertices[ 0 ][ x ] ].clone();
                    var nb = inside.vertices[ vertices[ 0 ][ x + 1 ] ].clone();

                    na.setY(0).normalize();
                    nb.setY(0).normalize();

                    var v1 = vertices[ 0 ][ x ];
                    var v2 = vertices[  1 ][ x ];
                    var v3 = vertices[ 1 ][ x + 1 ];
                    var v4 = vertices[ 0 ][ x + 1 ];
                    var n1 = na.clone().negate();
                    var n2 = na.clone().negate();
                    var n3 = nb.clone().negate();
                    var n4 = nb.clone().negate();
                    var uv1 = uvs[ 0 ][ x ].clone();
                    var uv2 = uvs[ 1 ][ x ].clone();
                    var uv3 = uvs[ 1 ][ x + 1 ].clone();
                    var uv4 = uvs[ 0 ][ x + 1 ].clone();
                    inside.faces.push( new THREE.Face3( v1, v4, v2, [ n1, n4, n2 ] ) );
                    inside.faceVertexUvs[ 0 ].push( [ uv1, uv4, uv2 ] );
                    inside.faces.push( new THREE.Face3( v2, v4, v3, [ n2.clone(), n4.clone(), n3 ] ) );
                    inside.faceVertexUvs[ 0 ].push( [ uv2.clone(), uv4.clone(), uv3 ] );
                }

                main.merge(inside);
                main.mergeVertices();
                var mat = base.material || new THREE.MeshPhongMaterial({ color: 0xff0000 , side: THREE.DoubleSide});

                var mesh = new THREE.Mesh(main, mat);
                that.three.add(mesh);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });
        return Test;
    });
})();