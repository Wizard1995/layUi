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
        var title = $(this).html();

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


    $(document).on('click', '.ajax-delete', function (e) {
        e.preventDefault();
        layer.msg('aaa');
    })


    laypage({
        cont: 'page'
        , pages: 100
        , first: false
        , last: false
        , skip: true
    });


});


