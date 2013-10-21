var el = function() {
    var propName = arguments[0];
    var attrs = {}, children = [], content = false;
    
    var addAttr = function(k, v) {
        var key = k.toLowerCase();
        if (attrs.hasOwnProperty(key)) {
            console.error("Element", propname, "already has key", key, "- overwriting");
        }
        attrs[key] = v;
    }
    
    var output = function() {
        var renderedAttrs = [];
        for (var k in attrs) {
            renderedAttrs.push(k + '="' + attrs[k].replace(/"/g, '\"') + '"');
        }
        var inner = content ? content : "";
        if (children.length) {
            var childs = [];
            children.map(function(child) {
                childs.push(child.output());
            });
            inner = childs.join("");
        }
        return "<" + propName + (renderedAttrs.length ? " " : "") + renderedAttrs.join(" ") + ">" + inner + "</" + propName + ">";
    }
    
    var handlerFunction;
    handlerFunction = function() {
        var args = Array.prototype.slice.call(arguments);
        if (!args.length) {
            return output();
        } else if (args.length == 1 && Object.prototype.toString.call(args[0]) == "[object Array]") {
            children = children.concat(args[0]);
        } else if (args.length == 1 && Object.prototype.toString.call(args[0]) == "[object Object]") {
            children.push(args[0]);
        } else if (args.length == 1) {
            content = args[0];
        } else if (args.length >= 2 && Object.prototype.toString.call(args[0]) == "[object String]") {
            addAttr(args[0], args[1]);
        } else {
            console.error("Not sure what to do with inputs", args);
        }
        handlerFunction.output = output;
        return handlerFunction;
    }
    handlerFunction.output = output;
    return handlerFunction;
}
