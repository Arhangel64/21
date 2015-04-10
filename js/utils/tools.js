/**
 * Created by betrayer on 07.04.15.
 */
(function tools_js() {
    var moduleName = "utils/tools";

    var defineArray = [];

    define(moduleName, defineArray, function tools_module() {
        var Extend = function () {
            var target = arguments[0] || {};
            var index = 1;
            var length = arguments.length;
            var deep = false;
            var options, name, src, copy, copyIsArray, clone;

            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                index = 2;
            }

            // Handle case when target is a string or something (possible in deep
            // copy)
            if (typeof target !== "object" && typeof target != "function") {
                target = {};
            }

            if (length === index) {
                target = this;
                --index;
            }

            for (; index < length; index++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[index]) != undefined) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];

                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }

                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (Object.isObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && Array.isArray(src) ? src : [];

                            } else {
                                clone = src && Object.isObject(src) ? src : {};
                            }

                            // Never move original objects, clone them
                            target[name] = Object.extend(deep, clone, copy);

                            // Don't bring in undefined values
                        } else {
                            if (copy !== undefined) {
                                target[name] = copy;
                            }
                        }
                    }
                }
            }

            // Return the modified object
            return target;
        };

        return {
            Extend: Extend
        }
    })
})();