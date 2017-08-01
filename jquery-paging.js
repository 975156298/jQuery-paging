;
(function ($, window) {
    var config = {
        pageInit: function (data) {
            config.ajaxData();
        },
        addPage: function (id) {
            var startPageBtn = '<ul class="pagination"><li><a id="homePage">首页</a></li><li><a id="prePage">上一页</a></li>';
            var endPageBtn = '<li><a id="nextPage">下一页</a></li><li><a id="lastPage">末页</a></li></ul>';
            var length = $.fn.paging.defaults.pageStep;
            if($.fn.paging.defaults.totalPage > $.fn.paging.defaults.pageStep){
                 endPageBtn = '<li><a>...</a></li><li><a id="nextPage">下一页</a></li><li><a id="lastPage">末页</a></li></ul>'
            }else{
                length = $.fn.paging.defaults.totalPage;
            }
            for (var i = 0; i < length - 1; i++) {
                var j = i + 1;
                startPageBtn += '<li><a page-id="' + j + '">' + j + '</a></li>';
            }
            var pageBtn = startPageBtn + endPageBtn;
            $('#' + id).append(pageBtn);
        },
        ajaxData: function () {
            $.ajax({
                type: 'GET',
                url: $.fn.paging.defaults.url,
                dataType: 'json',
                success: function (data) {
                    $.fn.paging.defaults.rowData = data.rows;
                    $.fn.paging.defaults.total = data.total;
                    $.fn.paging.defaults.totalPage = Math.ceil($.fn.paging.defaults.total / $.fn.paging.defaults.pageData);
                    config.showData($.fn.paging.defaults.current);
                    config.addPage('div');
                    var btn = ['nextPage', 'prePage', 'homePage', 'lastPage'];
                    config.addBtn(btn);
                    config.addClick();
                    config.setActive();
                    config.disableBtn();
                }
            })
        },
        addClick: function () {
            var btns = $('.pagination li');
            for (var i = 0; i < btns.length; i++) {
                if (i < 2 || i >= btns.length - 2) {
                    continue;
                }
                (function (i) {
                    $('.pagination li a').eq(i).click(function () {
                        $.fn.paging.defaults.current = parseInt($('.pagination li a').eq(i).attr('page-id'));
                        config.disableBtn();
                        config.setActive();
                        config.showData($.fn.paging.defaults.current);
                    })
                })(i);

            }
        },
        addBtn: function (data) {
            data.forEach(function (btn) {
                (function (item) {
                    $('#' + item).click(function () {
                        if ($('#' + item).attr('disabled')) {
                            return false;
                        }
                        if (item == 'homePage') config.homePage();
                        if (item == 'lastPage') config.lastPage();
                        if (item == 'nextPage') config.nextPage();
                        if (item == 'prePage') config.prePage();
                        config.disableBtn();
                        config.setActive();
                    });
                })(btn)
            })
        },
        homePage: function () {
            $.fn.paging.defaults.current = 1;
            config.showData($.fn.paging.defaults.current);
        },
        lastPage: function () {
            $.fn.paging.defaults.current = $.fn.paging.defaults.totalPage;
            config.showData($.fn.paging.defaults.current);
        },
        nextPage: function () {
            $.fn.paging.defaults.current = $.fn.paging.defaults.current + 1;
            config.showData($.fn.paging.defaults.current);
        },
        prePage: function () {
            $.fn.paging.defaults.current = $.fn.paging.defaults.current - 1;
            config.showData($.fn.paging.defaults.current);
        },
        showData: function (pageNum) {
            var startNum = (parseInt(pageNum) - 1) * $.fn.paging.defaults.pageData;
            var endNum = parseInt(pageNum) * $.fn.paging.defaults.pageData;
            $('tbody').html('');
            $.fn.paging.defaults.rowData.some(function (item, index) {
                if (index > endNum) {
                    return true;
                }
                if (index >= startNum && index < endNum) {
                    config.replaceData(item)
                }
            })
        },
        replaceData: function (data) {
            var item = ['ID', 'name', 'password', 'age'];
            var strHead = '<tr>';
            var strEnd = '</tr>';
            for (var i in item) {
                strHead += '<td>' + data[item[i]] + '</td>';
            }
            var str = strHead + strEnd;
            $('tbody').append(str);
        },
        disableBtn: function () {
            if ($.fn.paging.defaults.current <= 1) {
                $('#prePage').attr("disabled", 'disabled');
                $('#prePage').css('background-color', '#ddd');
                $('#homePage').attr("disabled", 'disabled');
                $('#homePage').css('background-color', '#ddd');
            } else {
                $('#prePage').removeAttr("disabled");
                $('#prePage').css('background-color', '#fff');
                $('#homePage').removeAttr("disabled");
                $('#homePage').css('background-color', '#fff');
            }
            if ($.fn.paging.defaults.current >= $.fn.paging.defaults.totalPage) {
                $('#nextPage').attr("disabled", 'disabled');
                $('#lastPage').attr("disabled", 'disabled');
                $('#nextPage').css('background-color', '#ddd');
                $('#lastPage').css('background-color', '#ddd');
            } else {
                $('#nextPage').removeAttr("disabled");
                $('#lastPage').removeAttr("disabled");
                $('#nextPage').css('background-color', '#fff');
                $('#lastPage').css('background-color', '#fff');
            }
        },
        setActive: function () {
            var btns = $('.pagination li');
            for (var j = 0; j < btns.length; j++) {
                if (j < 2 || j >= btns.length - 2) {
                    continue;
                }
                $('.pagination li a').eq(j).css({'background-color': '#fff', "color": "#337ab7"});
                if (parseInt($('.pagination li a').eq(j).attr('page-id')) == $.fn.paging.defaults.current) {
                    $('.pagination li a').eq(j).css({'background-color': '#286090', "color": "#fff"});
                }
            }
        },
        defaluts: function (option) {
            $.fn.paging.defaults = {
                url: option.url,
                rowData: [],
                total: option.total || 10,
                pageData: option.pageData || 4,
                current: option.current || 1,
                pageStep: option.pageStep || 5, //当前可见最多页码个数
                totalPage: 1,
                prevBtn: 'pg-prev', //上一页按钮
                nextBtn: 'pg-next', //下一页按钮
                btnBool: true, //是否显示上一页下一页
                firstBtn: 'pg-first', //第一页按钮
                lastBtn: 'pg-last', //最后一页按钮
                btnShow: true //是否显示第一页和最后一页按钮
            }
        }
    };

    $.fn.paging = function (option) {
        config.defaluts(option);
        config.pageInit(option);
    };
    $.fn.paging.defaults = {
        url: '',
        rowData: [],
        total: 10, //数据总条数
        pageData: 4, //每页数据条数
        current: 1, //当前页码数
        totalPage: 1,
        pageStep: 5, //当前可见最多页码个数
        prevBtn: 'pg-prev', //上一页按钮
        nextBtn: 'pg-next', //下一页按钮
        btnBool: true, //是否显示上一页下一页
        firstBtn: 'pg-first', //第一页按钮
        lastBtn: 'pg-last', //最后一页按钮
        btnShow: true //是否显示第一页和最后一页按钮
    };
}(jQuery, window));
