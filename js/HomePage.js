$(function () {
    // 头部轮播图自动切换
    let headCarousel = function () {
        setInterval(function () {
            let oneCss = $(".carousel-a1").css("display");
            let towCss = $(".carousel-a2").css("display");
            if (oneCss == "block" && towCss == "none") {
                console.log("+++");
                $(".carousel-a1").css("display", "none");
                $(".carousel-a2").css("display", "block");
            }
            if (towCss == "block" && oneCss == "none") {
                console.log("---");
                $(".carousel-a1").css("display", "block");
                $(".carousel-a2").css("display", "none");
            }
        }, 3000)
    }();
})