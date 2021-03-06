;
(function ($, window) {
    var config = {
        pageInit: function (data) {
            config.ajaxData();
        },
        addPage: function () {
            var startPageBtn = '<ul class="pagination"><li><a id="homePage">首页</a></li><li><a id="prePage">上一页</a></li><li><a page-id="1">' + 1 + '</a></li>';
            var endPageBtn = '<li><a page-id="' + $.fn.paging.defaults.totalPage + '">' + $.fn.paging.defaults.totalPage + '</a></li><li><a id="nextPage">下一页</a></li><li><a id="lastPage">末页</a></li></ul>';
            var length = $.fn.paging.defaults.pageStep;
            if ($.fn.paging.defaults.totalPage > $.fn.paging.defaults.pageStep) {
                endPageBtn = '<li><a page-id="-1">...</a></li>' + endPageBtn;
            } else {
                length = $.fn.paging.defaults.totalPage;
            }
            for (var i = 1; i < length - 1; i++) {
                var j = i + 1;
                startPageBtn += '<li><a page-id="' + j + '">' + j + '</a></li>';
            }
            var pageBtn = startPageBtn + endPageBtn;
            $('#' + $.fn.paging.defaults.id).append(pageBtn);
        },
        updateBtn: function () {
            var length = $.fn.paging.defaults.pageStep - 2;
            var num = 0;
            var startPageBtn = '<ul class="pagination"><li><a id="homePage">首页</a></li><li><a id="prePage">上一页</a></li><li><a page-id="1">' + 1 + '</a></li>';
            var endPageBtn = '<li><a page-id="' + $.fn.paging.defaults.totalPage + '">' + $.fn.paging.defaults.totalPage + '</a></li><li><a id="nextPage">下一页</a></li><li><a id="lastPage">末页</a></li></ul>';
            if ($.fn.paging.defaults.totalPage / 2 > $.fn.paging.defaults.current) {
                if ($.fn.paging.defaults.current - Math.floor(length / 2) - 1 > 1) {
                    startPageBtn = startPageBtn + '<li><a page-id="-2">...</a></li>';
                    if($.fn.paging.defaults.current - Math.floor(length / 2) - 1 != $.fn.paging.defaults.totalPage / 2){
                        endPageBtn = '<li><a page-id="-1">...</a></li>' + endPageBtn;
                    }
                    if(length % 2 == 0){
                        num =  $.fn.paging.defaults.current + Math.floor(length / 2);
                    }else{
                        num = $.fn.paging.defaults.current + Math.floor(length / 2) + 1;
                    }
                    for (var i = $.fn.paging.defaults.current - Math.floor(length / 2); i < $.fn.paging.defaults.current; i++) {
                        startPageBtn += '<li><a page-id="' + i + '">' + i + '</a></li>';
                    }
                    for (var i = $.fn.paging.defaults.current; i < num; i++) {
                        startPageBtn += '<li><a page-id="' + i + '">' + i + '</a></li>';
                    }
                } else {
                    endPageBtn = '<li><a page-id="-1">...</a></li>' + endPageBtn;
                    for (var i = 2; i < 2 + length; i++) {
                        startPageBtn += '<li><a page-id="' + i + '">' + i + '</a></li>';
                    }
                }
            }
            if ($.fn.paging.defaults.totalPage / 2 <= $.fn.paging.defaults.current) {
                if ($.fn.paging.defaults.current + Math.floor(length / 2) < $.fn.paging.defaults.totalPage) {
                    startPageBtn = startPageBtn + '<li><a page-id="-2">...</a></li>';
                    if($.fn.paging.defaults.current + Math.floor(length / 2) + 1 != $.fn.paging.defaults.totalPage){
                        endPageBtn = '<li><a page-id="-1">...</a></li>' + endPageBtn;
                    }
                    if(length % 2 == 0){
                        num = $.fn.paging.defaults.current - Math.floor(length / 2) + 1;
                    }else{
                        num = $.fn.paging.defaults.current - Math.floor(length / 2);
                    }
                    for (var i = num; i < $.fn.paging.defaults.current; i++) {
                        startPageBtn += '<li><a page-id="' + i + '">' + i + '</a></li>';
                    }
                    for (var i = $.fn.paging.defaults.current; i < $.fn.paging.defaults.current + Math.floor(length / 2) + 1; i++) {
                        startPageBtn += '<li><a page-id="' + i + '">' + i + '</a></li>';
                    }
                } else {
                    startPageBtn = startPageBtn + '<li><a page-id="-2">...</a></li>';
                    for (var i = $.fn.paging.defaults.totalPage - length; i < $.fn.paging.defaults.totalPage; i++) {
                        startPageBtn += '<li><a page-id="' + i + '">' + i + '</a></li>';
                    }
                }
            }
            var pageBtn = startPageBtn + endPageBtn;
            $('#' + $.fn.paging.defaults.id).html(pageBtn);
            config.addBtn($.fn.paging.defaults.btn);
            config.addClick();
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
                    config.addPage($.fn.paging.defaults.id);
                    config.addBtn($.fn.paging.defaults.btn);
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
                        if(parseInt($('.pagination li a').eq(i).attr('page-id')) == -1){
                            $.fn.paging.defaults.current = parseInt($('.pagination li a').eq(btns.length - 5).attr('page-id'));
                        }
                        if(parseInt($('.pagination li a').eq(i).attr('page-id')) == -2){
                            $.fn.paging.defaults.current = parseInt($('.pagination li a').eq(5).attr('page-id')) - 1;
                        }
                        if(parseInt($('.pagination li a').eq(i).attr('page-id')) != -1 && parseInt($('.pagination li a').eq(i).attr('page-id')) != -2){
                            $.fn.paging.defaults.current = parseInt($('.pagination li a').eq(i).attr('page-id'));
                        }
                        config.updateBtn();
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
            config.updateBtn();
        },
        lastPage: function () {
            $.fn.paging.defaults.current = $.fn.paging.defaults.totalPage;
            config.showData($.fn.paging.defaults.current);
            config.updateBtn();
        },
        nextPage: function () {
            $.fn.paging.defaults.current = $.fn.paging.defaults.current + 1;
            config.showData($.fn.paging.defaults.current);
            config.updateBtn();
        },
        prePage: function () {
            $.fn.paging.defaults.current = $.fn.paging.defaults.current - 1;
            config.showData($.fn.paging.defaults.current);
            config.updateBtn();
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
                    config.replaceData(item);
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
                id: option.id,
                url: option.url,
                rowData: [],
                total: option.total || 10,
                pageData: option.pageData || 4,
                current: option.current || 1,
                pageStep: option.pageStep > 5 ? option.pageStep : 5 || 5, //当前可见最多页码个数
                totalPage: 1,
                btn: ['nextPage', 'prePage', 'homePage', 'lastPage']
            }
        }
    };

    $.fn.paging = function (option) {
        option.id = $(this).attr('id');
        config.defaluts(option);
        config.pageInit(option);
    };
    $.fn.paging.defaults = {
        url: '',
        rowData: [],
        id: '',
        total: 10, //数据总条数
        pageData: 4, //每页数据条数
        current: 1, //当前页码数
        totalPage: 1,
        pageStep: 5, //当前可见最多页码个数
        btn: ['nextPage', 'prePage', 'homePage', 'lastPage']
    };
}(jQuery, window));
