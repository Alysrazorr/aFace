(function($) {
    var Fileupload = Clazz.create({
        dom : null,
        form : null,
        facade : null,
        val : null,
        loader : null,
        options : null,
        init : function(options) {
            var thiz = this;
            thiz.uuid = UUID.generate();
            thiz.options = $.extend({}, thiz.__defaults, options);
            thiz.render();
        },
        render : function() {
            var thiz = this;
            var width = thiz.dom.outerWidth();
            var formId = 'ftpfile_upload_form_' + thiz.uuid;
            thiz.form = $('<form id="' + formId + '"></form>');
            thiz.facade = $(thiz.__template.facade);
            thiz.facade.css({
                'width' : width
            });
            thiz.val = $(thiz.__template.val);
            thiz.dom.wrap(thiz.facade);
            thiz.dom.before(thiz.val);
            thiz.dom.after(thiz.form);
            if (thiz.options.savePath) {
                thiz.form.append('<input type="hidden" name="path" value="' + thiz.options.savePath + '"/>');
            }
            thiz.dom.attr({
                form : formId,
                name : 'files'
            });
            thiz.dom.on('change', function(e) {
                var names = '';
                for (var i = 0; i < thiz.dom[0].files.length; i++) {
                    names += thiz.dom[0].files[i].name;
                    if (i !== thiz.dom[0].files.length - 1) {
                        names += ' | ';
                    }
                }
                thiz.val.val(names);
            });
            if (thiz.dom.data('filename') ? thiz.dom.data('filename').length > 0 : false) {
                thiz.val.val(thiz.dom.data('filename'));
            }
        },
        doUpload : function(success) {
            var thiz = this;
            var formId = 'ftpfile_upload_form_' + thiz.uuid;
            var formData = new FormData($('#' + formId)[0]);
            window.event.preventDefault();
            if (thiz.dom[0].files.length === 0) {
                alert('请选择要上传的文件！');
                return false;
            }
            $(top.window.document.body).loader();
            thiz.loader = $(top.window.document.body).target('loader');
            thiz.loader.show();
            $.ajax({
                url : thiz.options.url,
                type : 'post',
                data : formData,
                async : true,
                cache : false,
                contentType : false,
                processData : false,
                success : function(httpResult) {
                    console.log(httpResult);
                    alert(httpResult.message);
                    thiz.loader.hide();
                    if (typeof success === 'function') {
                        success(httpResult);
                    }
                }
            });
        },
        reset : function() {
            var fi = this.dom;
            var sourceParent = fi.parent();

            $("<form id='tempForm'></form>").appendTo(document.body);

            var tempForm = $("#tempForm");

            tempForm.append(fi);
            tempForm.get(0).reset();

            sourceParent.append(fi);
            tempForm.remove();
        },
        getFileNames : function() {
            return this.val.val();
        },
        __defaults : {
            url : null,
            savePath : null
        },
        __template : {
            facade : '<span class="aface facade fileupload"></span>',
            val : '<input class="aface textbox" type="text" readonly="readonly" placeholder="请选择" />'
        }
    });

    $.fn.fileupload = function(options) {
        return this.each(function(idx, elem) {
            var thiz = $(this);
            var fileupload = thiz.data('tar.fileupload');
            if (!fileupload) {
                fileupload = new Fileupload();
                fileupload.dom = thiz;
                fileupload.init(options);
                thiz.data('tar.fileupload', fileupload);
            }
        });
    }
})(jQuery);
