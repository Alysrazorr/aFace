var Clazz = window.Clazz || {};
Clazz.create = function(ms) {
	var o = function() {
		for (var m in ms) {
		    this[m] = ms[m];
	    };
		this['init'] = !this['init'] ? undefined : this['init'];
		this['uuid'] = !this['uuid'] ? undefined : this['uuid'];
        this['getLoader'] = function() {
            if (!top.window.page.loader) {
                $(top.window.document.body).loader();
                top.window.page.loader = $(top.window.document.body).target('loader');
            }
            return top.window.page.loader;
        };
        this['hasUrlPermission'] = function(url) {
            var menusMap = top.window.page.menusMap;
            return this.isGod ? true : typeof menusMap[url] === 'undefined' ? false : menusMap[url];
        };
	};
	return o;
};

var UUID = window.UUID || {};
UUID.generate = function() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
};

var StringUtils = window.StringUtils || {};
StringUtils.trim = function(string){
    return string.replace(/(^\s*)|(\s*$)/g, "");
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
	$.fn.target = function(options) {
		return $($(this)[0]).data('tar.' + options);
	};

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

function clearForm(form) {
    $(form).find('input:not([type="radio"])').val('');
    $(form).find('textarea').html('');
    $(form).find('input[type="radio"]').each(function(idx, elem) {
        if ($(this).attr('checked')) { $(this).click(); }
    });
    $(form).find('select').each(function(idx, elem) {
        this.selectedIndex = 0;
    });
};