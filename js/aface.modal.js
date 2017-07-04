(function($) {
    var Loader = Clazz.create({
        template : '<div class="aface full-window-mask little-white">'
                     + '<div class="aface loader"></div>'
                 + '</div>',
        dom : null,
        loader : null,
        init : function() {
            this.loader = $(this.template);
            this.dom.append(this.loader);
        },
        show : function() {
            this.loader.fadeIn();
        },
        hide : function() {
            this.loader.fadeOut();
        }
    });

    $.fn.loader = function(options) {
        var thiz = $(this);
        var obj = thiz.data('tar.loader');
        if (!obj) {
            obj = new Loader();
            obj.dom = thiz;
            obj.init(options);
            thiz.data('tar.loader', obj);
        }
        return obj;
    }

    Aface.topLoader = $(top.window.document.body).loader();
    Aface.showLoader = function() {
        Aface.topLoader.show();
    }
    Aface.hideLoader = function() {
        Aface.topLoader.hide();
    }
})(jQuery);

(function($) {
    var PopMessage = Clazz.create({
        template :  '<div class="aface full-window-mask little-black">'
                      + '<div class="aface pop-message">'
                          + '<div class="aface pop-message-icon"><i class="fa fa-check"></i></div>'
                          + '<div class="aface pop-message-content"></div>'
                      + '</div>'
                  + '</div>',
        dom : null,
        mask : null,
        message : null,
        icon : null,
        content : null,
        init : function() {
            var thiz = this;
            this.mask = $(this.template);
            this.message = this.mask.find('div.aface.pop-message');
            this.icon = this.message.find('div.aface.pop-message-icon');
            this.content = this.message.find('div.aface.pop-message-content');
            this.mask.on('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                thiz.hide();
            });
            this.dom.append(this.mask);
        },
        show : function(type, message) {
            var thiz = this;
            thiz.message.removeClass('info').removeClass('success').removeClass('failure');
            var icon = $('<i class="fa"></i>');
            switch (type) {
                case 'default':
                    icon.addClass('fa-bell');
                    break;
                case 'info':
                    icon.addClass('fa-info');
                    thiz.message.addClass('info');
                    break;
                case 'success':
                    icon.addClass('fa-check');
                    thiz.message.addClass('success');
                    break;
                case 'failure':
                    icon.addClass('fa-times');
                    thiz.message.addClass('failure');
                    break;
                default: break;
            }
            thiz.icon.empty().append(icon);
            thiz.content.html(message);

            thiz.mask.fadeIn();
            thiz.message.animate({ 'margin' : '6%'}, 200);
        },
        hide : function() {
            var thiz = this;
            thiz.mask.fadeOut();
            thiz.message.animate({ 'margin' : '5%'}, 200);
        }
    });

    $.fn.popMessage = function(options) {
        var thiz = $(this);
        var obj = thiz.data('tar.popMessage');
        if (!obj) {
            obj = new PopMessage();
            obj.dom = thiz;
            obj.init(options);
            thiz.data('tar.popMessage', obj);
        }
        return obj;
    }

    Aface.topPopMessage = $(top.window.document.body).popMessage();
    Aface.showMessage = function(type, message) {
        Aface.topPopMessage.show(type, message);
    }
})(jQuery);