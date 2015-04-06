/**
 * Created by betrayer on 04.04.15.
 */
(function classjs() {
    var moduleName = "utils/class";

    var defineArray = [];

    define(moduleName, defineArray, function class_module() {
        var Class = function () {};

        Class.inherit = function (proto) {
            var that = this;
            var base = function () {};

            var subclass = proto && proto.init || proto.constructor ? proto.init || proto.constructor : function () {
                that.apply(this, arguments);
            };

            base.prototype = that.prototype;
            var fn = subclass.fn = subclass.prototype = new base();

            for (var member in proto) {
                if (typeof proto[member] === "object" && !(proto[member] instanceof Array) && proto[member] !== undefined) {
                    // Merge object members
                    fn[member] = $.extend(true, {}, base.prototype[member], proto[member]);
                } else {
                    fn[member] = proto[member];
                }
            }

            fn.constructor = subclass;
            subclass.inherit = that.inherit;

            return subclass;
        };

        return Class.inherit({
            "constructor": function () {
                var that = this;

                if (!(that instanceof Class)) {
                    throw new SyntaxError("Didn't call \"new\" operator");
                }

                Class.call(that);
                that.uncyclic = [];
            },
            "destructor": function () {
                var that = this;

                for (var index = 0; index < that.uncyclic.length; ++index) {
                    that.uncyclic[index].call();
                }

                for (var key in that) {
                    if (that.hasOwnProperty(key)) {
                        that[key] = undefined;
                        delete that[key];
                    }
                }
            }
        });
    });
})();