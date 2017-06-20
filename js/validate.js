///**
// * 模块：表单校验.通用页面校验处理
// * 说明：在 xx.jsp 页面引入此文件
// * 调用：submitValidate(function(){ ...执行提交... })
// * 说明：在 <input>, <select>, <radio>, <area> 标签中增加相关属性用于表明要校验什么 
// *         校验属性 validate 说明 
// *           require    : 必录项 
// *           number     : 全是数字 
// *           en         : 全是英文 
// *           cn         : 全是中文 
// *           text       : 去除些非法的默认字符, 如：~`#$^&|''<>@ 
// *           email      : 电子邮件 
// *           url        : url 网址 
// *           date       : 日期时间 
// *           creditcare : 合法信用卡号 
// *           phone      : 电话 
// *           mobile     : 手机 
// *           ip         : ip地址, 当下只支持 IPv4 
// *           money      : 金额, 小数3位 
// *           variable   : 变量命名方式， 字母，下划线，数字 
// *           password   : 密码， 只能输入6-20个字母、数字、下划线 
// *           postcode   : 邮编 
// *           [vmsg]     : 自定义错误的提示内容
// *           [ovalidate]: 其它自定义 (记录相关的正则表达式), 为单独的一个属性 
// *           [minlength]: 最小长度, 为单独的一个属性 
// *           [maxlength]: 最大长度, 为单独的一个属性 
// *           
// *           如：<input type=text id='xx' value='yy' validate='require,number', minlength=2, maxlength=5, ovlidate=/^[0-9]$/g  />
// * 版本：2014-10-16 1530, jie.zou, 初稿 
// *       2014-10-22 1315, jie.zou, 增加自定义校验函数 
// */
//
//var jquery_validate={numberFL:{message:'无效输入',rex:/^[\((][0-9]*,[0-9]*[\))]$/},port:{message:'无效端口号',rex:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/},scale:{message:'无效比例尺',rex:/^[0-9]*:[0-9]*$/},float:{message:'无效浮点数', rex:/^[0-9]*.[0-9]*$/},text:{message:'\u65e0\u6548\u5b57\u7b26 \uff0c\u5982\uff1a*.&#\\!'\'=<>',rex:/^[^*.&#\\!''!=<>]+$/},require:{message:'\u8be5\u9879\u4e0d\u80fd\u4e3a\u7a7a',rex:''},number:{message:'\u65e0\u6548\u6570\u5b57',rex:/^[1-9]\d*$/},en:{message:'\u8be5\u9879\u4e3a\u5168\u82f1\u6587',rex:/^[A-Za-z]+$/},cn:{message:'\u8be5\u9879\u4e3a\u5168\u4e2d\u6587',rex:/^[\u4e00-\u9fa5]+$$/},email:{message:'\u65e0\u6548\u90ae\u4ef6\u5730\u5740',rex:/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/},url:{message:'\u65e0\u6548\u7f51\u5740',
//rex:/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i},date:{message:'\u65e0\u6548\u65e5\u671f',rex:/^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/},
//creditcard:{message:'\u65e0\u6548\u4fe1\u7528\u5361\u53f7',rex:/^[0-9]*$/},phone:{message:'\u65e0\u6548\u7535\u8bdd\u53f7\u7801',rex:/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/},mobile:{message:'\u65e0\u6548\u624b\u673a\u53f7',rex:/^1[3578]\d{9}$/},identityid:{message:'\u65e0\u6548\u8eab\u4efd\u8bc1\u53f7',rex:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/},ip:{message:'\u65e0\u6548 IP ',rex:/^([0,1]?\d{0,2}|2[0-4]\d|25[0-5])\.([0,1]?\d{0,2}|2[0-4]\d|25[0-5])\.([0,1]?\d{0,2}|2[0-4]\d|25[0-5])\.([0,1]?\d{0,2}|2[0-4]\d|25[0-5])$/},
//money:{message:'\u65e0\u6548\u91d1\u989d ',rex:/^[0-9]+[\.]{0,1}[0-9]{0,3}$/},variable:{message:'\u65e0\u6548\u8f93\u5165',rex:/^[0-9a-zA-Z\_]+$/},password:{message:'\u65e0\u6548\u5bc6\u7801 (6-20\u4e2a\u5b57\u6bcd,\u6570\u5b57,\u4e0b\u5212\u7ebf)',rex:/^(\w){6,20}$/},postcode:{message:'\u65e0\u6548\u90ae\u7f16',rex:/^[0-9]{6}$/},minlength:{message:'\u81f3\u5c11\u8f93\u5165 NUM \u4f4d\u6570\u636e'},maxlength:{message:'\u6700\u591a\u8f93\u5165 NUM \u4f4d\u6570\u636e'},ovalidate:{message:'\u65e0\u6548\u8f93\u5165'}},
//hideHint=function(a){
//    a&&a.parent().find('.errorhint')?a.parent().find('.errorhint').remove():$('body').find('.errorhint').remove();
//    $(document.body).find('#validateHint_' + $(a).attr('id')).remove();
//    },validateHint=function(a,d){
//    $('.war_'+a).find('.errorhint').remove();$('.war_'+a).html('<span class='errorhint'><font color=red>&nbsp;<b class='s_ico s_ico_war'></b>'+d+'</font></span>');
//    Aface.tooltip({ message : d, type : 'danger', id : 'validateHint_' + a }).show($('#' + a));
//    },validateCore=function(a,d){for(var c=!0,g=0;g<d.length;g++){var b=a.val()||a.attr('checked')||'',f;for(f in jquery_validate)if(f==d[g]){hideHint(a);var e=jquery_validate[f].rex;''==e||
//''==b||e.test(b)||(c&=0,validateHint(a.attr('id'),a.attr('vmsg')||jquery_validate[f].message));if(''==e&&'require'==f&&''==b)return c&=0,validateHint(a.attr('id'),a.attr('vmsg')||jquery_validate.require.message),c}(e=Number(a.attr('minlength')))&&b&&b.length<e&&(c&=0,hideHint(a),validateHint($(a).attr('id'),$(a).attr('vmsg')||jquery_validate.minlength.message.replace('NUM',e)));(e=Number(a.attr('maxlength')))&&b&&b.length>e&&(c&=0,hideHint(a),validateHint($(a).attr('id'),$(a).attr('vmsg')||jquery_validate.maxlength.message.replace('NUM',
//e)));(e=a.attr('ovalidate'))&&b&&e.test(b)&&(c&=0,hideHint(a),validateHint($(a).attr('id'),$(a).attr('vmsg')||jquery_validate.ovalidate.message));if(b=a.attr('validatefun'))b=b.split(','),eval(b[0])||(c&=0,b=1<b.length?b[1]:$(a).attr('vmsg')||jquery_validate.ovalidate.message,validateHint($(a).attr('id'),b))}return c},submitValidate=function(a,x){var d=!0;hideHint();var c={};$.each(x?$(x).find('input[type=text],input[type=password],input[type=checkbox],input[type=file],radio,select,textarea'):$('input[type=text],input[type=password],input[type=checkbox],input[type=file],radio,select,textarea'),function(a,b){var d=
//$(b).attr('validate')||$(b).attr('validatefun')||$(b).attr('ovalidate')||$(b).attr('minlength');d&&(c[$(b).attr('id')]=d)});for(var g in c){var b=c[g].split(','),f=$('#'+g),d=d&validateCore(f,b);/*$(f).on('change',function(){submitValidate()})*/}d&&a&&'function'==typeof a&&a();return d};

var jquery_validate = {
    numberFL: {
        message: '无效输入',
        rex: /^[\((][0-9]*,[0-9]*[\))]$/
    },
    port: {
        message: '无效端口号',
        rex: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
    },
    scale: {
        message: '无效比例尺',
        rex: /^[0-9]*:[0-9]*$/
    },
    float: {
        message: '无效浮点数',
        rex: /^[0-9]*.[0-9]*$/
    },
    text: {
        message: '无效字符 ，如：*.&#\\!\'\'=<>',
        rex: /^[^*.&#\\!''!=<>]+$/
    },
    require: {
        message: '该项不能为空',
        rex: ''
    },
    number: {
        message: '无效数字',
        rex: /^[1-9]\d*$/
    },
    en: {
        message: '该项为全英文',
        rex: /^[A-Za-z]+$/
    },
    cn: {
        message: '该项为全中文',
        rex: /^[一-龥]+$$/
    },
    email: {
        message: '无效邮件地址',
        rex: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
    },
    url: {
        message: '无效网址',
        rex: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
    },
    date: {
        message: '无效日期',
        rex: /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s(((0?[0-9])|([1-2][0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/
    },
    creditcard: {
        message: '无效信用卡号',
        rex: /^[0-9]*$/
    },
    phone: {
        message: '无效电话号码',
        rex: /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/
    },
    mobile: {
        message: '无效手机号',
        rex: /^1[3578]\d{9}$/
    },
    identityid: {
        message: '无效身份证号',
        rex: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    },
    ip: {
        message: '无效 IP ',
        rex: /^([0,1]?\d{0,2}|2[0-4]\d|25[0-5])\.([0,1]?\d{0,2}|2[0-4]\d|25[0-5])\.([0,1]?\d{0,2}|2[0-4]\d|25[0-5])\.([0,1]?\d{0,2}|2[0-4]\d|25[0-5])$/
    },
    money: {
        message: '无效金额 ',
        rex: /^[0-9]+[\.]{0,1}[0-9]{0,3}$/
    },
    variable: {
        message: '无效输入',
        rex: /^[0-9a-zA-Z\_]+$/
    },
    password: {
        message: '无效密码 (6-20个字母,数字,下划线)',
        rex: /^(\w){6,20}$/
    },
    postcode: {
        message: '无效邮编',
        rex: /^[0-9]{6}$/
    },
    minlength: {
        message: '至少输入 NUM 位数据'
    },
    maxlength: {
        message: '最多输入 NUM 位数据'
    },
    ovalidate: {
        message: '无效输入'
    }
};
function hideHint(dom) {
    $(document.body).find('#validateHint_' + $(dom).attr('id')).remove();
};
function validateHint(dom, msg) {
    Aface.tooltip({
        message: msg,
        type: 'danger',
        id: 'validateHint_' + dom
    }).show($('#' + dom));
};
function validateCore(dom, d) {
    for(var c = !0, g = 0; g < d.length; g++) {
        var domVal = dom.val() || dom.attr('checked') || '';
        var valiRegex;
        for(valiRegex in jquery_validate) if (valiRegex == d[g]) {
            hideHint(dom);
            var e = jquery_validate[valiRegex].rex;
            '' == e || '' == domVal || e.test(domVal) || (c &= 0, validateHint(dom.attr('id'), dom.attr('vmsg') || jquery_validate[valiRegex].message));
            if ('' == e && 'require' == valiRegex && '' == domVal) return c &= 0, validateHint(dom.attr('id'), dom.attr('vmsg') || jquery_validate.require.message), c
        } (e = Number(dom.attr('minlength'))) && domVal && domVal.length < e && (c &= 0, hideHint(dom), validateHint($(dom).attr('id'), $(dom).attr('vmsg') || jquery_validate.minlength.message.replace('NUM', e)));
        (e = Number(dom.attr('maxlength'))) && domVal && domVal.length > e && (c &= 0, hideHint(dom), validateHint($(dom).attr('id'), $(dom).attr('vmsg') || jquery_validate.maxlength.message.replace('NUM', e)));
        (e = dom.attr('ovalidate')) && domVal && e.test(domVal) && (c &= 0, hideHint(dom), validateHint($(dom).attr('id'), $(dom).attr('vmsg') || jquery_validate.ovalidate.message));
        if (domVal = dom.attr('validatefun')) domVal = domVal.split(','), eval(domVal[0]) || (c &= 0, domVal = 1 < domVal.length ? domVal[1] : $(dom).attr('vmsg') || jquery_validate.ovalidate.message, validateHint($(dom).attr('id'), domVal))
    }
    return c;
};
function submitValidate(callbackFun, targetDom) {
    var d = true;
    var vDomIds = {};
    $.each(targetDom ? $(targetDom).find('input[type=text],input[type=password],input[type=checkbox],input[type=file],radio,select,textarea')
                     : $('input[type=text],input[type=password],input[type=checkbox],input[type=file],radio,select,textarea'),
    function (idx, elem) {
        var validateType = $(elem).attr('validate') || $(elem).attr('validatefun') || $(elem).attr('ovalidate') || $(elem).attr('minlength') || $(elem).attr('maxlength');
        validateType && (vDomIds[$(elem).attr('id')] = validateType)
    });
    console.log(vDomIds);
    for (var vDomId in vDomIds) {
        var b = vDomIds[vDomId].split(',');
        var f = $('#' + vDomId);
        var d = d & validateCore(f, b);
    }
    d && callbackFun && 'function' == typeof callbackFun && callbackFun();
    return d;
};
