(function($) {
    var Tabs = Clazz.create({
        dom : null,
        options : null,
		lastSelectedTabIndex : null,
        init : function(options) {
            var thiz = this;
			this.uuid = UUID.generate();
            this.options = $.extend({}, thiz.defaultOptions, options);
            this.render();
            this.selectByIndex(this.options.selectedTabIndex);
        },
        render : function() {
            var thiz = this;
            var indices = thiz.dom.find('li.aface.tab-index');
            $.each(indices, function(idx, elem) {
                $(elem).on('click', function(e) {
					if (idx !== thiz.lastSelectedTabIndex) {
						thiz.selectByIndex(idx);
						if (typeof thiz.options.onSelectedTabChange === 'function') {
							// idx : Tab的Index
							// e : click的js事件
							thiz.options.onSelectedTabChange(idx, e);
						}
					}
                })
            });
        },
        selectByIndex : function(idx) {
            var thiz = this;
			// TabIndex，清除所有选择
            var indices = thiz.dom.find('li.aface.tab-index');
            $.each(indices, function(idx, elem) {
                $(elem).removeClass('active');
            });
			
			// TabContent，清除所有选择
            var contents = thiz.dom.find('div.aface.tab-content');
            $.each(contents, function(idx, elem) {
                $(elem).removeClass('active');
            })
			
			// 选中Tab
            $(contents[idx]).addClass('active');
            $(indices[idx]).addClass('active');
			
			// 保存选中的Index
            thiz.lastSelectedTabIndex = idx;
        },
		getSelectedTabIndex : function() {
			return this.lastSelectedTabIndex;
		},
        defaultOptions : {
            selectedTabIndex : 0,
            onSelectedTabChange : null
        }
    });
    
    $.fn.tabs = function(options) {
        return this.each(function(idx, elem) {
            var thiz = $(this);
            var tabs = thiz.data('tar.tabs');
            if (!tabs) {
                tabs = new Tabs();
                tabs.dom = thiz;
                tabs.init(options);
                thiz.data('tar.tabs', tabs);
            }
        });
    };
})(jQuery);