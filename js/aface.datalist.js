(function($) {
    var Datalist = Clazz.create({
        dom : null,
        facade : null,
        val : null,
        list : null,
        data : null,
        options : null,
        init : function(options) {
            this.options = $.extend({}, this.__defaults, options);
            this.loadLocal(this.options.data);
        },
        render : function() {
            var thiz = this;
            typeof thiz.options.onInputStateChanged === 'function' ? thiz.dom.on('input', function(e) {
               thiz.options.onInputStateChanged(); 
            }) : false;
            var width = thiz.dom.outerWidth();
            thiz.facade = $(thiz.__template.facade);
            thiz.facade.css({ width : width });
            thiz.dom.css({ width : width - 22 });
            !thiz.dom.attr('placeholder') ? thiz.dom.attr('placeholder', '请选择') : false;
            thiz.val = $(thiz.__template.val);
            thiz.val.attr({ name : thiz.dom.attr('name') });
            thiz.dom.removeAttr('name');
            if (!thiz.options.editable) {
                thiz.dom.attr('readonly', 'readonly');
                thiz.dom.css('cursor', 'pointer');
            }
            thiz.list = $(thiz.__template.list);
            thiz.list.css({ width : width });
            thiz.arrow = $(thiz.__template.arrow);
            thiz.dom.wrap(thiz.facade);
            thiz.dom.after(thiz.val);
            thiz.dom.after(thiz.arrow);
            thiz.dom.after(thiz.list);
            thiz.dom.parent().on('click.datalist', function(e) {
                thiz.expand();
                e.stopPropagation();
            });
            thiz.list.on('click.datalist', function(e) { e.stopPropagation(); });
            if (thiz.options.defaultValue) {
                thiz.selectByVal(thiz.options.defaultValue);
            }
            if (thiz.options.readonly) {
                thiz.setReadOnly(thiz.options.readonly);
            }
            if (thiz.dom.data('datalist-value')) {
                thiz.selectByVal(thiz.dom.data('datalist-value'));
            }
            thiz.renderData();
            $(window).on('click.datalist', function(e) { thiz.collapse(); }); // 点击屏幕其他空白处关闭菜单
        },
        renderData : function() {
            var thiz = this;
            var list = thiz.dom.parent().find('ul.aface.facade.datalist.list').empty();
            $.each(thiz.data, function(idx, elem) {
                var li = $('<li class="aface list-item" data-datalist-value="' + elem.value + '" data-datalist-text="' + elem.text + '">' + elem.text + '</li>');
                li.on('click.datalist_item_select', function(e) {
                    thiz.list.find('li.aface.list-item').each(function(idx, elem) {
                        $(this).removeData('datalist-selected');
                    });
                    $(this).data('datalist-selected', true);
                    thiz.selectByVal($(this).data('datalist-value'));
                    thiz.collapse();
                    typeof thiz.options.onChange === 'function' ? thiz.options.onChange($(this).data('datalist-text'), $(this).data('datalist-value'), e) : false;
                });
                thiz.list.append(li);
            });
        },
        expand : function() {
            var thiz = this;
            $(window).trigger('click.datalist');
            if (!this.options.readonly) {
                this.list.removeClass('hidden');
                this.arrow.addClass('rotate');
                this.dom.parent().addClass('active');
            }
        },
        collapse : function() {
            if (!this.options.readonly) {
                this.list.addClass('hidden');
                this.arrow.removeClass('rotate');
                this.dom.parent().removeClass('active');
            }
        },
        loadLocal : function(data) {
            this.data = data;
            this.render();
        },
        loadRemote : function(url, params) {
            var thiz = this;
            $.post(url, params, function(httpResult) {
                if (httpResult.success) {
                    thiz.data = httpResult.data;
                    thiz.renderData();
                }
            });
        },
        selectByVal : function(value) {
            var thiz = this;
            var text;
            var flag = false;
            $.each(thiz.data, function(idx, elem) {
                if (elem.value == value) {
                    text = elem.text;
                    flag = true;
                }
            });
            if (flag) {
                thiz.dom.val(text);
                thiz.val.val(value);
            } else {
                thiz.val.removeAttr('value');
            }
        },
        getSelectedVal : function() {
            return this.val.val();
        },
        getSelectedTxt : function() {
            return this.dom.val();
        },
        setReadOnly : function(flag) {
            var thiz = this;
            thiz.options.readonly = flag;
            thiz.dom.attr('readonly', 'readonly');
            thiz.arrow.css('cursor', 'default');
        },
        __defaults : {
            data : null,
            defaultValue : null,
            readonly : false,
            editable : true,
            onChange : null,
            onInputStateChange : null
        },
        __template : {
            facade : '<span class="aface facade datalist"></span>',
            val : '<input type="hidden" class="hidden" />',
            list : '<ul class="aface facade datalist list hidden"></ul>',
            arrow : '<i class="fa fa-angle-down"></i>'
        }
    });
    
    $.fn.datalist = function(options) {
        return this.each(function(idx, elem) {
            var thiz = $(this);
            var datalist = thiz.data('tar.datalist');
            if (!datalist) {
                datalist = new Datalist();
                datalist.dom = thiz;
                datalist.init(options);
                thiz.data('tar.datalist', datalist);
            }
        });
    }
})(jQuery);