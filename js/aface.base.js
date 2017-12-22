var Clazz = window.Clazz || {};
Clazz.create = function(ms) {
	var obj = function() {
		for (var m in ms) {
		    this[m] = ms[m];
	    };
		this['init'] = !this['init'] ? undefined : this['init'];
		this['uuid'] = !this['uuid'] ? undefined : this['uuid'];
	};
	return obj;
};

var UUID = window.UUID || {};
UUID.generate = function() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
};

var Aface = window.Aface || {};

var StringUtils = window.StringUtils || {};
StringUtils.trim = function(string){
    return string.replace(/(^\s*)|(\s*$)/g, "");
};
StringUtils.isBlank = function() {

};
StringUtils.isNotBlank = function(string) {
    if (string) {
        if ('' === StringUtils.trim(string + '')) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};
StringUtils.isNotNull = function(string) {
    if ("null" == string) {
        return false;
    } else {
        return StringUtils.isNotBlank(string);
    }
};

(function($) {
    jQuery.prototype.serializeObject = function() {
        var a, o, h, i, e;
        a = this.serializeArray();
        o = {};
        h = o.hasOwnProperty;
        for (i = 0; i < a.length; i++) {
            e = a[i];
            if (!h.call(o, e.name)) {
                o[e.name] = e.value.trim();
            }
        }
        return o;
    };
})(jQuery);