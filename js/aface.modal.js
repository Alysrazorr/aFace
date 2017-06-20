(function($) {
    var Modal = Clazz.create({
        dom : null,
        modalWindow : null,
        options : null,
        loader : null,
        init : function(options) {
            var thiz = this;
            thiz.options = $.extend({}, thiz.__defaults, options);
            
            thiz.modalWindow = thiz.dom.find('.aface.modal-window');
            thiz.options.title ? thiz.setTitle(thiz.options.title) : false;
            thiz.options.style ? thiz.modalWindow.css(thiz.options.style) : false;
            !thiz.options.hasCheckButton ? thiz.modalWindow.find('i.fa.fa-check').remove() : false;
            !thiz.options.hasTimesButton ? thiz.modalWindow.find('i.fa.fa-times').remove() : false;
            !thiz.options.hasInnerIFrame ? thiz.modalWindow.find('iframe.aface.inner-frame').remove() : $(function() {
                thiz.modalWindow.find('div.aface.modal-body').loader({
                    transparentMask : true,
                    relative2Parent : true
                });
                thiz.loader = thiz.modalWindow.find('div.aface.modal-body').target('loader');
            });
            thiz.modalWindow.find('i.fa.fa-times').on('click', function(e) { thiz.hide(); });
            thiz.modalWindow.find('i.fa.fa-check').on('click', function(e) {
                typeof thiz.options.onClickOk === 'function' ? thiz.options.onClickOk() : false;
            });
        },
        setTitle : function(html) {
            this.dom.find('div.aface.modal-title').find('span.aface.title').html(html);
        },
        setIFrameUrl : function(url) {
            if (this.options.hasInnerIFrame) {
                this.dom.find('iframe.aface.inner-frame').attr('src', url);
            }
        },
        setIFrameBlank : function() {
            if (this.options.hasInnerIFrame) {
                this.dom.find('iframe.aface.inner-frame').remove();
                this.dom.find('div.aface.modal-body').append('<iframe class="aface inner-frame"></iframe>');
            }
        },
        getIFramePageObj : function() {
            if (this.options.hasInnerIFrame) {
                return this.dom.find('iframe.aface.inner-frame')[0].contentWindow.page;
            }
            return null;
        },
        show : function(url) {
            var thiz = this;
            var marginTop = thiz.modalWindow.css('margin-top');
            thiz.modalWindow.css({ 'margin-top' : -100 });
            if (typeof thiz.options.beforeShow === 'function') {
                thiz.options.beforeShow();
            }
            $('html').addClass('of-hidden');
            thiz.dom.show();
            thiz.modalWindow.animate({
                'margin-top' : marginTop
            }, function() {
                if (!url) { return; }
                thiz.modalWindow.find('iframe.aface.inner-frame').on('load', function(e) { thiz.loader.hide(); });
                thiz.loader.show();
                thiz.setIFrameUrl(url);
            });
        },
        hide : function() {
            var thiz = this;
            $('html').removeClass('of-hidden');
            thiz.dom.hide();
            thiz.setIFrameBlank();
            if (typeof thiz.options.afterHide === 'function') {
                thiz.options.afterHide();
            }
        },
        __defaults : {
            style : {},
            beforeShow : null,
            afterHide : null,
            onClickOk : null,
            title : null,
            draggable : false,
            hasCheckButton : true,
            hasTimesButton : true,
            hasInnerIFrame : true
        }
    });
    
    $.fn.modal = function(options) {
        return this.each(function(idx, elem) {
            var thiz = $(this);
            var modal = thiz.data('tar.modal');
            if (!modal) {
                modal = new Modal();
                modal.dom = thiz;
                modal.init(options);
                thiz.data('tar.modal', modal);
            }
        });
    };
    
    var Aface = window.Aface || {};
    Aface.modal = typeof Aface.modal === 'undefined' ? {} : Aface.modal;
    
    Aface.modal.create = function(options) {
        var id = 'modal#' + UUID.generate() + '';
        var __template = '<div class="aface modal-mask" id="' + id +'">'
                       +     '<div class="aface modal-window">'
                       +        '<div class="aface modal-title">'
                       +            '<span class="aface title"></span>'
                       +            '<i class="fa fa-times"></i>'
                       +            '<i class="fa fa-check"></i>'
                       +        '</div>'
                       +        '<div class="aface modal-body">'
                       +            '<iframe class="aface inner-frame"></iframe>'
                       +        '</div>'
                       +    '</div>'
                       +'</div>'
        var dom = $(__template);
        $(window.document.body).append(dom);
        
        dom.modal(options);
        return dom.target('modal');
    };
    window.Aface = Aface;
})(jQuery);

(function($) {
    var Loader = Clazz.create({
        dom : null,
        loader : null,
        options : null,
        init : function(options) {
            this.options = $.extend({}, this.__default, options);
            this.render();
        },
        render : function() {
            var thiz = this;
            thiz.loader = $(thiz.__template);
            if (thiz.dom && ($(document.body)[0] == thiz.dom[0])) {
                thiz.dom.append(thiz.loader);
            } else {
                thiz.options.relative2Parent ? thiz.dom.css({ position: 'relative' }) : false;
                thiz.dom.append(thiz.loader);
            }
            thiz.options.transparentMask ? thiz.loader.css({ 'background' : 'transparent' }) : false;
                
        },
        show : function() {
            var thiz = this;
            thiz.loader.removeClass('hidden');
            thiz.loader.find('.aface.loader-container').css({
                'margin-top' : (thiz.dom.height() - 50) / 3,
                'margin-left' : (thiz.dom.width() - 50) / 2
            });
        },
        hide : function() {
            this.loader.addClass('hidden');
        },
        __template : '<div class="aface loader-mask hidden">'
                   +         '<div class="aface loader-container">'
                   +             '<div class="aface loader">'
                   +                 '<span class="aface loader-core"></span>'
                   +                 '<span class="aface loader-leaf"></span>'
                   +                 '<span class="aface loader-leaf"></span>'
                   +                 '<span class="aface loader-leaf"></span>'
                   +                 '<span class="aface loader-leaf"></span>'
                   +                 '<span class="aface loader-leaf"></span>'
                   +             '</div>'
                   +         '</div>'
                   + '</div>',
        __defaults : {
            transparentMask : false,
            relative2Parent : false
        }
    });
    
    $.fn.loader = function(options) {
        return this.each(function(idx, elem) {
            var thiz = $(this);
            var loader = thiz.data('tar.loader');
            if (!loader) {
                loader = new Loader();
                loader.dom = thiz;
                loader.init(options);
                thiz.data('tar.loader', loader);
            }
        });
    };
})(jQuery);

(function($) {
    var Tooltip = Clazz.create({
        dom : $(window.document.body),
        options : null,
        uuid : null,
        anchor : null,
        init : function(options) {
            var thiz = this;
            this.uuid = UUID.generate();
            this.options = $.extend({}, thiz.__defaults, options);
            this.render();
        },
        render : function() {
            var thiz = this;
            thiz.tooltip = $(thiz.__template);
            thiz.setMessage(thiz.options.message);
            if (thiz.options.type) { thiz.tooltip.addClass(thiz.options.type); }
            if (thiz.options.id) { thiz.tooltip.attr('id', thiz.options.id); }
            $(window).on('resize.' + thiz.uuid, function(e) {
                if (thiz.anchor && thiz.options.position) {
                    thiz.setPosition(thiz.anchor, thiz.options.position);
                }
            });
            thiz.dom.append(thiz.tooltip);
        },
        setMessage : function(message) {
            var thiz = this;
            thiz.options.message = message;
            thiz.tooltip.find('span.aface.tooltip-content').html(thiz.options.message);
        },
        show : function(anchor, position) {
            this.setPosition(anchor, position);
            this.tooltip.fadeIn(200);
//            this.tooltip.show();
        },
        hide : function() {
            this.tooltip.fadeOut(200);
//            this.tooltip.hide();
        },
        setPosition: function(anchor, position) {
            var thiz = this;
            var top;
            var left;
            thiz.anchor = anchor ? anchor : thiz.anchor;
            thiz.options.position = position ? position : thiz.options.position;
            if ('north' === thiz.options.position) {
                top = anchor.offset().top - 33;
                left = anchor.offset().left;
                thiz.tooltip.addClass('bottom-arrow');
            }
            if ('south' === thiz.options.position) {
                top = anchor.offset().top + anchor.outerHeight() + 3;
                left = anchor.offset().left;
                thiz.tooltip.addClass('top-arrow');
            }
            if ('west' === thiz.options.position) {
                top = anchor.offset().top + (anchor.outerHeight() - 30) / 2;
                left = anchor.offset().left - thiz.tooltip.outerWidth() - 3;
                thiz.tooltip.addClass('left-arrow');
            }
            if ('east' === thiz.options.position) {
                top = anchor.offset().top + (anchor.outerHeight() - 30) / 2;
                left = anchor.offset().left + anchor.outerWidth() + 3;
                thiz.tooltip.addClass('right-arrow');
            }
            thiz.tooltip.css({
                'top' : top,
                'left' : left
            });
        },
        __template : '<div class="aface tooltip">'
                   +     '<span class="aface tooltip-content"></span>'
                   + '</div>',
        __defaults : {
            message : '消息内容',
            position : 'south',
            type : null,
            id : null
        }
    });

    var Aface = window.Aface || {};
    Aface.tooltip = typeof Aface.tooltip === 'undefined' ? {} : Aface.tooltip;
    
    Aface.tooltip = function(options) {
        var t = new Tooltip();
        t.init(options);
        return t;
    }
    window.Aface = Aface;
})(jQuery);