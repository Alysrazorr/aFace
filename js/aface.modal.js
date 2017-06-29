(function($) {
    var Loader = Clazz.create({
        template : '<div class="aface loader-mask" style="display: none;">'
                     + '<div class="aface loader"></div>'
                 + '</div>',
        loader : null,
        init : function(parent) {
            this.loader = $(this.template);
            parent.append(this.loader);
        },
        show : function() {
            this.loader.fadeIn(200);
        },
        hide : function() {
            this.loader.fadeOut(200);
        }
    });
    var Aface = window.Aface || {};
    Aface.topLoader = new Loader();
    Aface.topLoader.init($(top.window.document.body));
})(jQuery);