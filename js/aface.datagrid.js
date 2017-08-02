(function($) {
    var Datagrid = Clazz.create({
        dom : null,
        data : null,
        pagination : {},
        options : {},
        params : {},
        gridTblWidth : null,
        gridTblHeight : null,
        sortFields : {},
        sortType : [ 'DESC', 'ASC' ],
        init : function(options) {
            this.options = $.extend({}, this.__defaults, options);
            this.pagination = $.extend({}, this.__defaults.pagination, this.options.pagination);
            this.render();
        },
        loadData : function(params) {
            var thiz = this;
            thiz.params = $.extend({}, thiz.params, params);
            if (!thiz.options.url) {
                return;
            }
            $.ajax({
                url : thiz.options.url,
                type : 'post',
                data : $.extend({}, {
                    currPage : 1,
                    pageSize : thiz.pagination.pageSize
                }, thiz.params),
                dataType : 'json',
                success : function(httpResult) {
                    if (httpResult != null && httpResult.data != null && httpResult.success) {
                        thiz.data = httpResult.data;
                        thiz.pagination = httpResult.pagination;
                        thiz.renderData();
                        thiz.dom.find('#__checkAll').prop('checked', false);
                    }
                },
                error : function() {}
            });
        },
        loadLocal : function(data) {
            var thiz = this;
            thiz.data = data;
            thiz.pagination = {
                currPage : 1,
                pageSize : data.length + 1,
                totalPages : 1,
                totalResults : data.length
            };
            thiz.renderData();
            thiz.dom.find('#__checkAll').prop('checked', false);
        },
        reloadLocal : function() {
            var thiz = this;
            thiz.pagination = {
                currPage : 1,
                pageSize : thiz.data.length + 1,
                totalPages : 1,
                totalResults : thiz.data.length
            };
            thiz.renderData();
            thiz.dom.find('#__checkAll').prop('checked', false);
        },
        clearLocal : function() {
            var thiz = this;
            thiz.data = [];
            thiz.pagination = {
                currPage : 1,
                pageSize : 20,
                totalPages : 1,
                totalResults : 0
            };
            thiz.renderData();
            thiz.dom.find('#__checkAll').prop('checked', false);
        },
        getSelectedRows : function() {
            var thiz = this;
            var selectedRows = [];
            thiz.dom.find('input[id^="row_"]').each(function(idx, row) {
                $(row).prop('checked') ? selectedRows.push(thiz.data[$(row).attr('id').split('_')[2]]) : false;
            });
            return selectedRows;
        },
        getSelectedRowIds : function() {
            var thiz = this;
            var selectedRowIds = [];
            $.each(thiz.getSelectedRows(), function(idx, row) {
                selectedRowIds.push(row[thiz.options.idField]);
            });
            return selectedRowIds;
        },
        render : function() {
            var thiz = this;
            thiz.dom.empty();
            thiz.dom.addClass('aface').addClass('datagrid');
            
            thiz.renderHeader();
            thiz.renderGrid();
            thiz.renderPagination();
            thiz.loadData(thiz.options.params);
        },
        renderHeader : function() {
            var thiz = this;
            var divHeader = $(thiz.__template.header);          
            var theadHeader = divHeader.find('table.dataheader').find('thead');
            var tr = $('<tr></tr>');
            if (thiz.options.hasCheckbox) {
                var cb = $('<input type="checkbox" id="__checkAll" />').on('click', function(e) {
                    $(this).prop('checked') ? thiz.dom.find('input[id^="row_"]').prop('checked', true) : thiz.dom.find('input[id^="row_"]').prop('checked', false);
                });
                var th = $('<th class="aface cb"></th>');
                tr.append(th.append(cb));
            }
            for (var i = 0; i < thiz.options.columns.length; i++) {
                var th = $('<th class="aface"></th>')
                         .attr('title', thiz.options.columns[i].title)
                         .css({ 'width' : thiz.options.columns[i].width })
                         .html(thiz.options.columns[i].title);
                if (thiz.options.columns[i]['sort']) {
                    th.css({ 'cursor' : 'pointer' });
                    th.data('sort', thiz.options.columns[i]['sort']);
                }
                th.on('click', function(e) {
                    th = $(this);
                    var sort = th.data('sort');
                    if (sort) {
                        th.find('i').remove();
                        (!thiz.sortFields[sort]) ? (thiz.sortFields[sort] = thiz.sortType[0]) : (thiz.sortType[0] == thiz.sortFields[sort] ? (thiz.sortFields[sort] = thiz.sortType[1]) : (thiz.sortFields[sort] = thiz.sortType[0]));
                        thiz.params['sortFields'] = thiz.sortFields;
                        thiz.loadData();
                        switch (thiz.sortFields[sort]) {
                            case 'DESC':
                                th.append('<i>&nbsp;</i><i class="fa fa-sort-amount-desc"></i>');
                                break;
                            case 'ASC':
                                th.append('<i>&nbsp;</i><i class="fa fa-sort-amount-asc"></i>');
                                break;
                            default:
                                break;
                        }
                    }
                });
                tr.append(th);
            }
            // 插入两个超宽列，使得左侧列顶格排列
            tr.append('<th class="aface" style="width: 10000px;"></th>');
            tr.append('<th class="aface" style="width: 10000px;"></th>');
            theadHeader.append(tr);
            thiz.dom.append(divHeader);
        },
        renderGrid : function() {
            var thiz = this;
            var height = thiz.options.hasPagination ? thiz.dom.height() - 80 : thiz.dom.height() - 40; // 表格高度
            var width = thiz.dom.width(); // 表格宽度
            var gridTblWidth = 0; // 总列宽

            // 联动滚动表头
            var divHeader = thiz.dom.find('#__divHeader');
            var divGrid = $(thiz.__template.grid).css({ height : height + 'px' }).on('scroll', function(e) {
                divHeader.scrollLeft($(this).scrollLeft());
            });

            var theadHeader = divGrid.find('table.datagrid').find('thead');
            var tr = $('<tr></tr>');

            // 添加单选框，计算总列宽
            if (thiz.options.hasCheckbox) {
                tr.append('<th class="aface cb"></th>');
                gridTblWidth += 40;
            }
            // 添加列，计算总列宽
            for (var i = 0; i < thiz.options.columns.length; i++) {
                tr.append($('<th class="aface"></th>').css({ 'width' : thiz.options.columns[i].width }));
                gridTblWidth += parseInt(thiz.options.columns[i].width);
            }
            // 根据总列宽，计算显示效果
            if (gridTblWidth <= width) { // 列宽不够填满整个表格区域
                tr.append('<th class="aface" id="__blankHeader" style="width: 10000px;"></th>'); // 添加超宽列，使左侧列顶格
                divGrid.css({ 'overflow-x': 'hidden' }); // 隐藏滚动条
            } else {
                tr.append('<th class="aface" id="__blankHeader" style="width: 35px;"></th>'); // 添加尾列，留出空余
            }

            $(window).on('resize.datagrid', function(e) {
                var height = (thiz.options.hasPagination && thiz.data.length !== 0) ? thiz.dom.height() - 80 : thiz.dom.height() - 40;
                var width = thiz.dom.width();
                divGrid.css({ height: height + 'px' });
                if (gridTblWidth <= width) {
                    divGrid.css({ 'overflow-x': 'hidden' });
                    divGrid.scrollLeft(-10000);
                    divGrid.find('#__blankHeader').css('width', '10000px');
                } else {
                    divGrid.css({ 'overflow-x': 'auto' });
                    divGrid.find('#__blankHeader').css('width', '35px');
                }
            });

            theadHeader.append(tr);
            thiz.gridTblWidth = gridTblWidth;
            thiz.dom.find('#__divHeader').after(divGrid);
        },
        renderData : function() {
            var thiz = this;
            var height = thiz.dom.height();
            var width = thiz.dom.width();
            var gridTblHeight = 0;
            
            var divGrid = thiz.dom.find('#__divGrid');
            var divHeader = thiz.dom.find('#__divHeader');
            var divPagination = thiz.dom.find('#__divPagination');
            var tbodyGrid = divGrid.find('table.datagrid').find('tbody').empty();
            
            // 无返回数据
            if (!thiz.data || thiz.data.length === 0) {
            	divGrid.css({ 'height' : height - 40 });
            	divGrid.append('<div class="noDataHint">' + thiz.options.noDataHint + '</div>');
            	divPagination.addClass('hidden');
                return;
            }

            var tbodyGrid = divGrid.find('table.datagrid').find('tbody').empty();
        	divGrid.css({ 'height' : height - 80 });
            divGrid.find('div.noDataHint').remove();
        	divPagination.removeClass('hidden');
        	
            $(thiz.data).each(function(rowIndex, rowData) {
                gridTblHeight += 35;
            	tr = $('<tr></tr>');
                if (thiz.options.hasCheckbox) {
                    var cb = $('<input type="checkbox" />').attr('id', 'row_' + rowData[thiz.options.idField]).on('click', function(e) {
                        !$(this).prop('checked') ? thiz.dom.find('#__checkAll').prop('checked', false) : false;
                    });
                    tr.append($('<td class="aface cb"></td>').append(cb));
                }
                $(thiz.options.columns).each(function(col, column) {
                    var td = $('<td class="aface"></td>');
                    var text = '';
                    if (typeof column.formatter === 'function') {
                        text = !column.formatter(rowIndex, rowData) ? '' : column.formatter(rowIndex, rowData);
                        tr.append(td.html(text));
                        return true;
                    }
                    text = (null === rowData[column.field] || typeof rowData[column.field] === 'undefined') ? '' : rowData[column.field];
                    if (column.field === thiz.options.stateField) {
                        switch (text) {
                            case '未启用':
                            	text = '<span style="padding: 4px; border-radius: 2px; background-color: #dddddd; color: #555555;">' + text + '</span>'; break;
                            case '已启用':
                            	text = '<span style="padding: 4px; border-radius: 2px; background-color: #5cb85c; color: #ffffff;">' + text + '</span>'; break;
                            case '已停用':
                            	text = '<span style="padding: 4px; border-radius: 2px; background-color: #f2b866; color: #ffffff;">' + text + '</span>'; break;
                            default: break;
                        }
                    }
                    tr.append(td.html(text));
                });
                tr.append('<td class="aface"></td>');
                tr.data('rowIndex', rowIndex);
                tr.data('rowData', rowData);
                if (typeof thiz.options.onClickRow === 'function') {
                    tr.on('click', function(e) {
                        thiz.options.onClickRow($(this).data('rowIndex'), $(this).data('rowData'), e);
                    });
                }
                tbodyGrid.append(tr);
            });
            
            var fromIndex = divPagination.find('b.from');
        	var toIndex = divPagination.find('b.to');
        	var totalResults = divPagination.find('b.totalResults');
        	var currPage = divPagination.find('b.currPage');
        	var totalPages = divPagination.find('b.totalPages');
        	
        	fromIndex.html((thiz.pagination.currPage - 1) * thiz.pagination.pageSize + 1);
        	toIndex.html(thiz.pagination.currPage * thiz.pagination.pageSize < thiz.pagination.totalResults ? thiz.pagination.currPage * thiz.pagination.pageSize : thiz.pagination.totalResults);
        	totalResults.html(thiz.pagination.totalResults);
        	currPage.html(thiz.pagination.currPage);
        	totalPages.html(thiz.pagination.totalPages);
        	
        	var pages = divPagination.find('div.aface.pagination');
        	pages.find('a.aface.pagination').not('.first,.prev,.next,.last').remove();
        	
        	var first = pages.find('a.aface.pagination.first').data('toPage', 1);
        	var prev = pages.find('a.aface.pagination.prev').data('toPage', thiz.pagination.currPage > 2 ? thiz.pagination.currPage - 1 : 1);
        	var next = pages.find('a.aface.pagination.next').data('toPage', thiz.pagination.currPage < thiz.pagination.totalPages ? thiz.pagination.currPage + 1 : thiz.pagination.totalPages);
        	var last = pages.find('a.aface.pagination.last').data('toPage', thiz.pagination.totalPages);
        	
        	var pageArr = [ thiz.pagination.currPage - 2, thiz.pagination.currPage - 1, thiz.pagination.currPage, thiz.pagination.currPage + 1, thiz.pagination.currPage + 2 ];
        	$(pageArr).each(function(idx, page) {
        		if (page > 0 && page <= thiz.pagination.totalPages) {
        			var pageLink = $(thiz.__template.page).html(page).on('click', function(e) {
        				thiz.loadData({ currPage : page });
        			});
        			if (page == thiz.pagination.currPage) {
        				pageLink.addClass('active');
        			}
        			next.before(pageLink);
        		}
        	});
        },
        renderPagination : function() {
        	var thiz = this;
        	
        	var divPagination = $(thiz.__template.pagination);
        	
        	var pageSizeList = divPagination.find('select.aface.pagination').on('change', function(e) {
        		thiz.loadData({ currPage : 1, pageSize : $(this).val() });
        	});
        	$(thiz.options.pageSizeList).each(function(idx, pageSize) {
        		pageSizeList.append($('<option></option>').attr('value', pageSize).html(pageSize));
        	});
        	
        	var pages = $(thiz.__template.pages);
        	pages.find('a.aface.pagination').on('click', function(e) {
        		thiz.loadData({ currPage : $(this).data('toPage') });
        	});
        	thiz.dom.append(divPagination.append(pages));
        },
        __template : {
            header : '<div class="aface datagrid-header" id="__divHeader">'
                   +     '<table class="aface dataheader">'
                   +         '<thead>'
                   +         '</thead>'
                   +     '</table>'
                   + '</div>',
            grid : '<div class="aface datagrid-grid" id="__divGrid">'
                 +     '<table class="aface datagrid">'
                 +         '<thead>'
                 +         '</thead>'
                 +         '<tbody>'
                 +         '</tbody>'
                 +     '</table>'
                 + '</div>',
            pagination : '<div class="aface datagrid-pagination" id="__divPagination">'
            		   +     '<select class="aface pagination"></select>'
            		   +     '<span class="aface pagination">条&nbsp;/&nbsp;页，当前第&nbsp;<b class="from"></b>&nbsp;-&nbsp;<b class="to"></b>&nbsp;条，共&nbsp;<b class="totalResults"></b>&nbsp;条，当前第&nbsp;<b class="currPage"></b>&nbsp;页，共&nbsp;<b class="totalPages"></b>&nbsp;页</span>'
            	       + '</div>',
            pages : '<div class="aface pagination">'
			          + '<a class="aface pagination first" href="javascript:;"><i class="fa fa-angle-double-left"></i></a>'
			    	  + '<a class="aface pagination prev" href="javascript:;"><i class="fa fa-angle-left"></i></a>'
			    	  + '<a class="aface pagination next" href="javascript:;"><i class="fa fa-angle-right"></i></a>'
			    	  + '<a class="aface pagination last" href="javascript:;"><i class="fa fa-angle-double-right"></i></a>'
			      + '</div>',
    	    page : '<a class="aface pagination" href="javascript:;"></a>'
        },
        __defaults : {
            url : null,
            columns : [],
            params : {},
            hasCheckbox : false,
            hasPagination: true,
            idField : 'p_id',
            stateField : 'p_state',
            pageSizeList : [ 10, 20, 50, 100, 1000 ],
            pagination : {
                currPage : 1,
                pageSize : 20
            },
            onClickRow : null,
            afterLoad : null,
            noDataHint : '无数据'
        }
    });
    
    $.fn.datagrid = function(options) {
        var thiz = $(this);
        var datagrid = thiz.data('tar.datagrid');
        if (!datagrid) {
            datagrid = new Datagrid();
            datagrid.dom = thiz;
            datagrid.init(options);
            thiz.data('tar.datagrid', datagrid);
        }
        return datagrid;
    };
})(jQuery);