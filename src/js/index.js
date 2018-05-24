// 依赖配置
require(["config"], function () {
    // 依赖配置中各短名称的模块
    require(["jquery","template"], function ($,template) {
        $(function () {
            	// 利用 ajax 来访问后端接口，获取数据
                $.ajax({
                    type : "get",
                    url : "../mock/hot_brand_big.json",
                    dataType : "json",
                    success : function(responseData){
                    // 热门品牌大图：利用 artTemplate 来渲染模板
                    var html = template("bigBrand_template", {bigBrands: responseData.res_body.list});
                    // 显示到表格中
                    $("#bigBrandBox").html(html);
                    }
                });
                // 热门品牌小图：利用 ajax 来访问后端接口，获取数据
                $.ajax({
                    type : "get",
                    url : "../mock/hot_brand_small.json",
                    dataType : "json",
                    success : function(responseData){
                    // 利用 artTemplate 来渲染模板
                    var html = template("smallBrand_template", {smallBrands: responseData.res_body.list});
                    // 显示到表格中
                    $("#smallBrand1").html(html);
                    }
                });

                // 场馆模板：利用 ajax 来访问后端接口，获取数据
                $.ajax({
                    type : "get",
                    url : "/mock/changguan.json",
                    dataType : "json",
                    success : function(responseData){
                    // 利用 artTemplate 来渲染模板
                    var html = template("cg_template", {cg: responseData.res_body.list});
                    $("#changguan_box").html(html);
                    }
                });
                // 特卖模板：利用 ajax 来访问后端接口，获取数据
                $.ajax({
                    type : "get",
                    url : "/mock/temai.json",
                    dataType : "json",
                    success : function(responseData){
                    var html = template("temai_temp", {temai: responseData.res_body.list});
                    $("#temai_list").html(html);
                    }
                });
                //绑定特卖品牌事件
                $(".temai_ul li").mouseenter(function(){
                    $(".temai_ul li").removeClass("current_li");
                    $(this).addClass("current_li");
                    var ul_index = $(this).attr("data-index");
                    $(".pro_list").css("display","none");
                   $("#"+ul_index).css("display","block");
                });
            
           //导购模板
           $.ajax({
               type:"get",
               url:"/mock/daogou.json",
               dataType:"json",
               success:function(responseData){
                   var html = template("daogouimg_temp",{daogouimgs:responseData.res_body.daogoutu});
                   $("#brands_daogou").html(html);
               }
           });











        });
    });
});
