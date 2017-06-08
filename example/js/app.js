/**
 * Created by lg on 2017/6/6.
 */

//注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use(['element', 'layer', 'jquery', 'laypage', 'form', 'laydate'], function () {
    var element = layui.element();
    var layer = layui.layer;
    var jquery = layui.jquery;
    var laypage = layui.laypage;
    var form = layui.form();
    var laydate = layui.laydate

    //监听提交
    form.on('submit(formDemo)', function (data) {
        layer.msg(JSON.stringify(data.field));
        return false;
    });

    /**
     * 模态框
     */
    $(document).on('click', '.model', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var title = $(this).data('title');
        layer.open({
            type: 2,
            title: title,
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['500px', '300px'],
            content: href
        });
    })


    /**
     * 退出
     */
    $(document).on('click', '.logout', function (e) {
        e.preventDefault();
        var msg = $(this).data('msg');
        var title = $(this).data('title');
        var href = $(this).attr('href');
        layer.confirm('',
            {
                title: title,
                content: msg,
                btn: ['确定', '取消',] //可以无限个按钮
                , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.msg('取消');
            }
            },
            function (index) {
                //按钮【确定】的回调
                layer.msg('确定');
                window.location.href=href;
            });

    })

    /**
     * 询问后操作
     */
    $(document).on('click', '.ajax-delete', function (e) {
        e.preventDefault();
        var msg = $(this).data('msg');
        var title = $(this).data('title');
        var href = $(this).attr('href');
        layer.confirm('',
            {
                title: title,
                content: msg,
                btn: ['确定', '取消',] //可以无限个按钮
                , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.msg('取消');
            }
            },
            function (index) {
                //按钮【确定】的回调
                layer.msg('确定');
            });

    })


    //分页
    if ($('#page').length) {
        laypage({
            cont: 'page',
            pages: 100,
            skip: true,
            jump:function (obj , first) {
                var curr = obj.curr;
                console.log(curr); //当前页码
            }
        });
    }


    /******** 时间插件开始 ******/
    // 定义开始时间配置
    var start = {
            min: laydate.now(-93)
            , max: laydate.now()
            , istoday: true
            , format: 'YYYY-MM-DD'
            , choose: function (datas) {
                var maxData = plusDate(datas, 31);
                if (maxData < laydate.now()) {
                    end.max = maxData//重新设置最大时间
                }
                end.min = datas; //开始日选好后，重置结束日的最小日期
                // end.start = datas //将结束日的初始值设定为开始日
            }
        };

    // 定义结束时间配置
    var end = {
        min: laydate.now(-93)
        , max: laydate.now()
        , istoday: true
        , format: 'YYYY-MM-DD'
        , choose: function (datas) {
            var minData = reduceDate(datas, 31);
            if (minData > laydate.now(-93)) {
                start.min = minData;
            }
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
    // 开始时间框
    if ($('#LAY_demorange_s').length) {
        $(document).on('click', '#LAY_demorange_s', function () {
            start.elem = this;
            laydate(start);

        })
    }

    //结束时间框
    if ($('#LAY_demorange_e').length) {
        $(document).on('click', '#LAY_demorange_e', function () {
            end.elem = this
            laydate(end);
        })
    }

    /**
     * 日期加
     * @param dd 日期
     * @param dadd 天数
     * @returns {Date}
     */
    function plusDate(dd, dadd) {
        var timestamp = new Date(dd)
        timestamp = timestamp.valueOf();
        timestamp = timestamp + dadd * 24 * 60 * 60 * 1000
        var datas = laydate.now(timestamp);
        return datas;
    }

    /**
     * 日期减
     * @param dd 初始日期
     * @param dadd 天数
     * @returns {Date}
     */
    function reduceDate(dd, dadd) {
        var timestamp = new Date(dd)
        timestamp = timestamp.valueOf();
        timestamp = timestamp - dadd * 24 * 60 * 60 * 1000
        var datas = laydate.now(timestamp);
        return datas;
    }

    /****** 时间插件结束 *******/

});


