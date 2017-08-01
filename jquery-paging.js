 ;(function ($, window) {
     var config = {
         pageInit: function(data){
             config.ajaxData();
             config.addPage(5,'div');
             var btn = ['nextPage', 'prePage', 'homePage', 'lastPage'];
             config.addBtn(btn);
             config.disableBtn();
         },
         addPage: function(num,id){
             var startPageBtn = '<ul class="pagination"><li><a id="homePage">首页</a></li><li><a id="prePage">上一页</a></li>';
             var endPageBtn = '<li><a id="nextPage">下一页</a></li><li><a id="lastPage">末页</a></li></ul>';
             for (var i = 0; i < parseInt(num); i++) {
                 startPageBtn += '<li><a>' + i + '</a></li>';
             }
             var pageBtn = startPageBtn + endPageBtn;
             $('#' + id).append(pageBtn);
         },
         ajaxData: function(){
             $.ajax({
                 type: 'GET',
                 url: "./page.json",
                 dataType: 'json',
                 success: function (data) {
                     $.fn.paging.defaults.rowData = data.rows;
                     $.fn.paging.defaults.total = data.total;
                     config.showData( $.fn.paging.defaults.current);
                 }
             })
         },
         addBtn: function(data){
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
                     });
                 })(btn)
             })
         },
         homePage: function(){
             $.fn.paging.defaults.current = 1;
             config.showData($.fn.paging.defaults.current);
         },
         lastPage: function(){
             $.fn.paging.defaults.current = Math.ceil($.fn.paging.defaults.total / $.fn.paging.defaults.pageData);
             config.showData($.fn.paging.defaults.current);
         },
         nextPage: function(){
             $.fn.paging.defaults.current = $.fn.paging.defaults.current + 1;
             config.showData($.fn.paging.defaults.current);
         },
         prePage: function(){
             $.fn.paging.defaults.current = $.fn.paging.defaults.current - 1;
             config.showData($.fn.paging.defaults.current);
         },
         showData: function(pageNum){
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
         replaceData: function(data){
             var item = ['ID', 'name', 'password', 'age'];
             var strHead = '<tr>';
             var strEnd = '</tr>';
             for (var i in item) {
                 strHead += '<td>' + data[item[i]] + '</td>';
             }
             var str = strHead + strEnd;
             $('tbody').append(str);
         },
         disableBtn: function(){
             if ($.fn.paging.defaults.current <= 1) {
                 $('#prePage').attr("disabled", 'disabled');
                 $('#prePage').css('background-color','#ddd');
                 $('#homePage').attr("disabled", 'disabled');
                 $('#homePage').css('background-color','#ddd');
             } else {
                 $('#prePage').removeAttr("disabled");
                 $('#prePage').css('background-color','#fff');
                 $('#homePage').removeAttr("disabled");
                 $('#homePage').css('background-color','#fff');
             }
             if ($.fn.paging.defaults.current >= Math.ceil($.fn.paging.defaults.total / $.fn.paging.defaults.pageData)) {
                 $('#nextPage').attr("disabled", 'disabled');
                 $('#lastPage').attr("disabled", 'disabled');
                 $('#nextPage').css('background-color','#ddd');
                 $('#lastPage').css('background-color','#ddd');
             } else {
                 $('#nextPage').removeAttr("disabled");
                 $('#lastPage').removeAttr("disabled");
                 $('#nextPage').css('background-color','#fff');
                 $('#lastPage').css('background-color','#fff');
             }
         }

     };

     $.fn.paging = function() {
         config.pageInit();
     };


     $.fn.paging.defaults = {
         rowData: [],
         total: 10, //数据总条数
         pageData: 4, //每页数据条数
         pageCount: 0, //总页数
         current: 1, //当前页码数
         pageStep: 10, //当前可见最多页码个数
         minPage: 5, //最小页码数，页码小于此数值则不显示上下分页按钮
         active: 'current', //当前页码样式
         prevBtn: 'pg-prev', //上一页按钮
         nextBtn: 'pg-next', //下一页按钮
         btnBool: true, //是否显示上一页下一页
         firstBtn: 'pg-first', //第一页按钮
         lastBtn: 'pg-last', //最后一页按钮
         btnShow: true, //是否显示第一页和最后一页按钮
         url: '', //ajax路由
     };




 }(jQuery, window));
