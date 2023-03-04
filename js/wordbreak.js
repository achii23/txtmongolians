<meta charset="UTF-8"></meta>

$(function(){


	$.fn.wordBreakKeepAll = function(option) {
        var is_there_end_angle_bracket = function(str) {
            return str.lastIndexOf('<') < str.lastIndexOf('>');
        };
        var is_there_start_angle_bracket = function(str) {
            return str.lastIndexOf('>') < str.lastIndexOf('<');
        };
        var is_there_no_angle_bracket = function(str) {
            return str.lastIndexOf('>') == str.lastIndexOf('<');
        };
        var defaultOption = {
            OffForIE: false,
            useCSSonIE: true
        };
        var opt = $.extend(defaultOption, option);
        if (/MSIE/.test(navigator.userAgent) && opt.OffForIE == false && opt.useCSSonIE == true) {
            var addWordBreakKeepAll = function(obj) {
                $(obj).css({
                    'word-break': 'keep-all',
                    'word-wrap': 'break-word'
                });
                /*if ($(obj).css('display') == 'inline') {
                    $(obj).css('display', 'block');
                }*/
            };
        } else if (!/MSIE/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent) && opt.OffForIE == false && opt.useCSSonIE == false) {
            var addWordBreakKeepAll = function(obj) {
                    var html = $(obj).html();
                    html = html.replace(/(\r\n|\n|\r)/gm, ' ＃＆＊＠§ ');
                    var textArr = html.split(' ');
                    textArr = textArr.filter(function(e) {
                        return e;
                    });
                    $(obj).text('');
                    var skip = false;
                    var full_str = '';
                    for (var i = 0, j = textArr.length; i < j; i++) {
                        var str = textArr[i];
                        if (skip == false && is_there_no_angle_bracket(str) && str.indexOf('＃＆＊＠§') == -1) {
                            full_str += '<span style="white-space: nowrap">' + str + '</span> ';
                        } else {
                            full_str += str + ' ';
                        }
	if(is_there_start_angle_bracket(str)){skip=true;}
	if(is_there_end_angle_bracket(str)){skip=false;}};$(obj).html(full_str.replace(/＃＆＊＠§/g,"\n"));};}
	return this.each(function(){addWordBreakKeepAll(this);});};

	$('body').wordBreakKeepAll({useCSSonIE: true});
});
	