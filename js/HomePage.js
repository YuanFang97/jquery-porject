$(function () {
    // 头部轮播图自动切换
    let headCarousel = function () {
        setInterval(function () {
            let oneCss = $(".carousel-a1").css("display");
            let towCss = $(".carousel-a2").css("display");
            if (oneCss == "block" && towCss == "none") {

                $(".carousel-a1").css("display", "none");
                $(".carousel-a2").css("display", "block");
            }
            if (towCss == "block" && oneCss == "none") {
                $(".carousel-a1").css("display", "block");
                $(".carousel-a2").css("display", "none");
            }
        }, 3000)
    }();
    // 自动轮播图
    $(".my-banner").edslider({
        width:document.documentElement.clientWidth,
        height:468,
        interval:1000,
        duration:500,
        navigator:true,
        paginator:false,
    })
    // 设置侧边栏的功能
    let windowHeight = $(window).height() - 30;
    $("#sidebar").css("height",`${windowHeight}`);
    $(document).scroll(function(){
        let height = $(document).scrollTop();
        if(height >= 30){
            $("#sidebar").css({"height":"100%","top":"0"});
        }else{
            $("#sidebar").css({"height":"100%","top":30-height});
        }
        if(height >= 10){
            $(".sidebar-service>a").css("top","530px");
            $(".sidebar-service>p").css("top","530px");
            $(".sidebar-hotLine>a").css("top","560px");
            $(".sidebar-hotLine>p").css("top","560px");
            $(".sidebar-qr>a").css("display","block");
            $(".sidebar-goTop>a").css("display","block");
        }else{
            $(".sidebar-service>a").css("top","600px");
            $(".sidebar-service>p").css("top","600px");
            $(".sidebar-hotLine>a").css("top","640px");
            $(".sidebar-hotLine>p").css("top","640px");
            $(".sidebar-qr>a").css("display","none");
            $(".sidebar-goTop>a").css("display","none");
        }
    })
    // 侧边栏一系列动画效果
    $("#sidebar>div").mouseenter(function(){
        $($(this).children()[1]).stop().animate({
            right:'40px'
        },300)
    }).mouseleave(function(){
        $($(this).children()[1]).css("right","70px")
    })
})