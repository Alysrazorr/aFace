(function($) {
    var Datagrid = Clazz.create({
        dom : null,
        data : null,
        pagination : null,
        options : null,
        params : null,
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
            thiz.loader.show();
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
                        typeof thiz.options.onAfterLoad === 'function' ? thiz.options.onAfterLoad(thiz.data) : false;
                    }
                    thiz.loader.hide();
                }
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
            var selectedRows = new Array();
            thiz.dom.find('input[id^="row_"]').each(function(idx, elem) {
                if ($(elem).prop('checked')) {
                    var id = $(elem).attr('id');
                    var idx = id.split('_')[2];
                    selectedRows.push(thiz.data[idx]);
                }
            });
            return selectedRows;
        },
        getSelectedRowIds : function() {
            var thiz = this;
            var ids = new Array();
            $.each(thiz.getSelectedRows(), function(idx, elem) {
                ids.push(elem[thiz.options.idField]);
            });
            return ids;
        },
        selectByIds : function(ids) {
            var thiz = this;
            $.each(ids, function(idx, id) {
                thiz.dom.find('input[id^="row_' + id + '"]').prop('checked', true);
            });
        },
        deleteSelectedRows : function() {
            var thiz = this;
            $.each(thiz.getSelectedRowIds(), function(idx, id) {
                console.log(id);
                $('input[id^=row_' + id + ']').parent().parent().remove();
            });
        },
        render : function() {
            var thiz = this;
            thiz.dom.empty();
            thiz.dom.addClass('aface').addClass('datagrid');
            thiz.dom.loader({
                transparentMask : true
            });
            thiz.loader = thiz.dom.target('loader');
            
            thiz.renderHeader();
            thiz.renderGrid();
            thiz.renderPagination();
            thiz.loadData(thiz.options.params, thiz.options.onAfterLoad);
        },
        renderHeader : function() {
            var thiz = this;
            var divHeader = $(thiz.__template.header);          
            var theadHeader = divHeader.find('table.dataheader').find('thead');
            var tr = $('<tr></tr>');
            if (thiz.options.hasCheckbox) {
                tr.append('<th class="aface cb"><input type="checkbox" id="__checkAll" /></th>');
                tr.find('input#__checkAll').on('click', function(e) {
                    if ($(this).prop('checked')) {
                        thiz.dom.find('input[id^="row_"]').prop('checked', true);
                    } else {
                        thiz.dom.find('input[id^="row_"]').prop('checked', false);
                    }
                });
            }
            if (thiz.options.hasSerialNumber) {
                tr.append('<th class="aface sn"><i class="fa fa-hashtag"></i></th>');
            }
            for (var i = 0; i < thiz.options.columns.length; i++) {
                var th = $('<th class="aface" style="width: ' + thiz.options.columns[i].width + ';" title="' + thiz.options.columns[i].title
                          + '"' + (thiz.options.columns[i]['sort'] ? (' data-sort=' + thiz.options.columns[i]['sort']) : '') + '>' + thiz.options.columns[i].title + '</th>');
                if (thiz.options.columns[i]['sort']) {
                    th.css({ 'cursor' : 'pointer' });
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
            tr.append('<th class="aface" style="width: 10000px;"></th>');
            tr.append('<th class="aface" style="width: 10000px;"></th>');
            theadHeader.append(tr);
            thiz.dom.append(divHeader);
        },
        renderGrid : function() {
            var thiz = this;
            var height = thiz.options.hasPagination ? thiz.dom.height() - 80 : thiz.dom.height() - 40;
            var width = thiz.dom.width();
            var gridTblWidth = 0;
            var divHeader = thiz.dom.find('#__divHeader');
            var divGrid = $(thiz.__template.grid).css({ height : height + 'px' }).on('scroll', function(e) {
                divHeader.scrollLeft($(this).scrollLeft());
            });
            var theadHeader = divGrid.find('table.datagrid').find('thead');
            var tr = $('<tr></tr>');
            if (thiz.options.hasCheckbox) {
                tr.append('<th class="aface cb"></th>');
                gridTblWidth += 40;
            }
            if (thiz.options.hasSerialNumber) {
                tr.append('<th class="aface sn"></th>');
                gridTblWidth += 35;
            }
            for (var i = 0; i < thiz.options.columns.length; i++) {
                tr.append('<th class="aface" style="width: ' + thiz.options.columns[i].width + ';"></th>');
                gridTblWidth += parseInt(thiz.options.columns[i].width);
            }
            if (gridTblWidth <= width) {
                tr.append('<th class="aface" id="__blankHeader" style="width: 10000px;"></th>');
                divGrid.css({ 'overflow-x': 'hidden' });
            } else {
                tr.append('<th class="aface" id="__blankHeader" style="width: 35px;"></th>');
            }
            $(window).on('resize.datagrid', function(e) {
                var height = thiz.options.hasPagination ? thiz.dom.height() - 80 : thiz.dom.height() - 40;
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
            if (!thiz.data) {
                return;
            }
            var height = thiz.dom.outerHeight();
            var width = thiz.dom.outerWidth();
            var gridTblHeight = 0;
            var snBegin = thiz.pagination.pageSize * (thiz.pagination.currPage - 1);
            
            var divGrid = thiz.dom.find('#__divGrid');
            var divHeader = thiz.dom.find('#__divHeader');
            var tbodyGrid = divGrid.find('table.datagrid').find('tbody').empty();
            var num = {
                num : parseInt(thiz.pagination.currPage * thiz.pagination.pageSize),
                times : 1
            };
            num = slj(num);
            divHeader.find('.aface.sn').css('width', (num.times * 10 + 30) + 'px');
            divGrid.find('.aface.sn').css('width', (num.times * 10 + 30) + 'px');
            for (var i = 0; i < thiz.data.length; i++) {
                var row = thiz.data[i];
                tr = $('<tr></tr>');
                if (thiz.options.hasCheckbox) {
                    var iptCb = $('<input type="checkbox" id="row_' + row[thiz.options.idField] + '_' + i + '" />').on('click', function(e) {
                        if (!$(this).prop('checked')) {
                            thiz.dom.find('#__checkAll').prop('checked', false);
                        }
                    });
                    tr.append($('<td class="aface cb"></td>').append(iptCb));
                }
                if (thiz.options.hasSerialNumber) {
                    tr.append('<td class="aface sn">' + (i + 1 + snBegin) + '</td>');
                }
                gridTblHeight += 35;
                for (var j = 0; j < thiz.options.columns.length; j++) {
                    var text = '';
                    var text0 = '';
                    if (typeof thiz.options.columns[j].formatter == 'function') {
                        text = !thiz.options.columns[j].formatter(i, row) ? '' : thiz.options.columns[j].formatter(i, row);
                        tr.append('<td class="aface ' + (thiz.options.columns[j].autowrap ? 'autowrap' : 'nowrap') + (thiz.options.columns[j].nopadding ? ' nopadding' : '') + '">' + text + '</td>');
                        continue;
                    }
                    text = (null === row[thiz.options.columns[j].field] || typeof row[thiz.options.columns[j].field] === 'undefined') ?
                            '' : row[thiz.options.columns[j].field];
                    if (thiz.options.columns[j].field === 'p_state') {
                        switch (text) {
                            case '未启用':
                                text0 = '<span style="padding: 4px; border-radius: 2px; background-color: #dddddd; color: #555555;">' + text + '</span>';break;
                            case '已启用':
                                text0 = '<span style="padding: 4px; border-radius: 2px; background-color: #5cb85c; color: #ffffff;">' + text + '</span>';break;
                            case '已停用':
                                text0 = '<span style="padding: 4px; border-radius: 2px; background-color: #f2b866; color: #ffffff;">' + text + '</span>';break;
                        }
                    } else {
                        text0 = text;
                    }
                    tr.append('<td class="aface ' + (thiz.options.columns[j].autowrap ? 'autowrap' : 'nowrap') + (thiz.options.columns[j].nopadding ? ' nopadding' : '')
                            + '" title="' + text + '">' + text0 + '</td>');
                }
                tr.append('<td class="aface"></td>');
                tr.data('rowIndex', i);
                tr.data('rowData', row);
                if (typeof thiz.options.onClickRow === 'function') {
                    tr.on('click', function(e) {
                        thiz.options.onClickRow($(this).data('rowIndex'), $(this).data('rowData'), e);
                    });
                }
                tbodyGrid.append(tr);
                if (i === thiz.data.length - 1 && (gridTblHeight - 1) >= divGrid.height() && thiz.gridTblWidth <= divGrid.width()) {
                    tr.find('td').css('border-bottom-width', '0');
                }
                if (i === thiz.data.length - 1 && thiz.options.noLastBottomBorder && thiz.data.length == thiz.options.pagination.pageSize) {
                    tr.find('td').css('border-bottom-width', '0');
                }
            }
            
            var divPagination = thiz.dom.find('#__divPagination');
            divPagination.find('button[id^=__btn]').each(function(idx, btn) {
                $(btn).parent().removeClass('hidden');
            });
            divPagination.find('#__iptCurrPage').val(thiz.pagination.currPage);
            divPagination.find('#__spCurrPage').html(thiz.pagination.currPage);
            divPagination.find('#__spTotalPages').html(thiz.pagination.totalPages);
            divPagination.find('#__spTotalResults').html(thiz.pagination.totalResults);
            divPagination.find('#__spBegin').html(snBegin + 1);
            divPagination.find('#__spEnd').html((thiz.pagination.pageSize * thiz.pagination.currPage) > thiz.pagination.totalResults ? thiz.pagination.totalResults : (thiz.pagination.pageSize * thiz.pagination.currPage));
            
            var btnFirstPage = divPagination.find('#__btnFirstPage');
            var btnPreviousPage = divPagination.find('#__btnPreviousPage');
            var btnNextPage = divPagination.find('#__btnNextPage');
            var btnLastPage = divPagination.find('#__btnLastPage');
            
            if (thiz.pagination.currPage == 1) {
                btnFirstPage.parent().addClass('hidden');
                btnPreviousPage.parent().addClass('hidden');
            }
            if (thiz.pagination.currPage == thiz.pagination.totalPages) {
                btnNextPage.parent().addClass('hidden');
                btnLastPage.parent().addClass('hidden');
            }
            if (typeof thiz.options.afterLoad === 'function') {
                thiz.options.afterLoad();
            }
        },
        renderPagination : function() {
            var thiz = this;
            if (!thiz.options.hasPagination) {
                return false;
            }
            var snBegin = thiz.pagination.pageSize * (thiz.pagination.currPage - 1);
            var divPagination = $(thiz.__template.pagination);
            divPagination.find('#__iptCurrPage').val(thiz.pagination.currPage);
            divPagination.find('#__spCurrPage').html(thiz.pagination.currPage);
            divPagination.find('#__spTotalPages').html(thiz.pagination.totalPages);
            divPagination.find('#__spTotalResults').html(thiz.pagination.totalResults);
            divPagination.find('#__spBegin').html(snBegin + 1);
            divPagination.find('#__spEnd').html(thiz.pagination.pageSize * thiz.pagination.currPage);
            
            var btnFirstPage = divPagination.find('#__btnFirstPage');
            btnFirstPage.on('click', function(e) {
                thiz.loadData({
                    currPage : 1,
                    pageSize : thiz.pagination.pageSize
                });
            });
            var btnPreviousPage = divPagination.find('#__btnPreviousPage');
            btnPreviousPage.on('click', function(e) {
                thiz.loadData({
                    currPage : parseInt(thiz.pagination.currPage) - 1,
                    pageSize : thiz.pagination.pageSize
                });
            });
            var btnNextPage = divPagination.find('#__btnNextPage');
            btnNextPage.on('click', function(e) {
                thiz.loadData({
                    currPage : parseInt(thiz.pagination.currPage) + 1,
                    pageSize : thiz.pagination.pageSize
                });
            });
            var btnLastPage = divPagination.find('#__btnLastPage');
            btnLastPage.on('click', function(e) {
                thiz.loadData({
                    currPage : thiz.pagination.totalPages,
                    pageSize : thiz.pagination.pageSize
                });
            });
            var iptCurrPage = divPagination.find('#__iptCurrPage');
            iptCurrPage.on({
                'keydown' : function(e) {
                    if ((e.keyCode > 47 && e.keyCode < 58) || (e.keyCode > 95 && e.keyCode < 106) || e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 13) {
                        if (e.keyCode === 13) {
                            if (iptCurrPage.val().trim() == '') {
                                iptCurrPage.val(1);
                            }
                            thiz.loadData({
                                currPage : parseInt(iptCurrPage.val()) > thiz.pagination.totalPages ? thiz.pagination.totalPages : parseInt(iptCurrPage.val()),
                                pageSize : thiz.pagination.pageSize
                            });
                        }
                    } else {
                        e.preventDefault();
                    }
                }
            });
            thiz.dom.append(divPagination);
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
                       +     '<ul class="aface list horizontal pull-left">'
                       +         '<li class="aface list-item"><button class="aface button" id="__btnFirstPage"><i class="fa fa-angle-double-left"></i></button></li>'
                       +         '<li class="aface list-item"><button class="aface button" id="__btnPreviousPage"><i class="fa fa-angle-left"></i></button></li>'
                       +         '<li class="aface list-item"><input class="aface textbox" type="text" id="__iptCurrPage" />&nbsp;/&nbsp;<span id="__spTotalPages"></span>&nbsp;</li>'
                       +         '<li class="aface list-item"><button class="aface button" id="__btnNextPage"><i class="fa fa-angle-right"></i></button></li>'
                       +         '<li class="aface list-item"><button class="aface button" id="__btnLastPage"><i class="fa fa-angle-double-right"></i></button></li>'
                       +         '<li class="aface list-item">当前第&nbsp;<span id="__spBegin"></span>&nbsp;至&nbsp;<span id="__spEnd"></span>&nbsp;条，共&nbsp;<span id="__spTotalResults"></span>&nbsp;条数据&nbsp;</li>'
                       +     '</ul>'
                       + '</div>'
        },
        __defaults : {
            url : null,
            columns : [],
            params : {},
            hasCheckbox : false,
            hasSerialNumber : false,
            hasPagination: true,
            hasStateField : true,
            idField : 'p_id',
            pageSizeList : [ 20, 50, 100 ],
            pagination : {
                currPage : 1,
                pageSize : 20
            },
            onClickRow : null,
            afterLoad : null
        }
    });
    
    $.fn.datagrid = function(options) {
        return this.each(function(idx, elem) {
            var thiz = $(this);
            var datagrid = thiz.data('tar.datagrid');
            if (!datagrid) {
                datagrid = new Datagrid();
                datagrid.dom = thiz;
                datagrid.init(options);
                thiz.data('tar.datagrid', datagrid);
            }
        });
    };
    
    function slj(num) {
        var y = num.num / 100;
        if (y > 1) {
            num.times = num.times + 1;
        }
        if (y > 100) {
            num.num = y;
            return slj(num);
        }
        return num;
    }
})(jQuery);