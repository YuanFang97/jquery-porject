$(function () {
    let url = window.location.search;
    let urlCate = url.substr(8, 1) - 1;
    let attr = ["新鲜水果", "绿色菜篮", "粮油调味", "干货特产", "零食饮料", "美酒名茶", "礼品礼券", "家具厨卫", "创意家电"];
    let attrColor = ["#76b003", "#30B633", "#e0a63b", "#da9166", "#27beaf", "#64b0c0", "#d864d3", "#8351ce", "#6494e8"]
    let res = attr[urlCate];
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
    // 设置侧边栏的功能
    let windowHeight = $(window).height() - 30;
    $("#sidebar").css("height", `${windowHeight}`);
    $(document).scroll(function () {
        let height = $(document).scrollTop();
        if (height >= 30) {
            $("#sidebar").css({
                "height": "100%",
                "top": "0"
            });
        } else {
            $("#sidebar").css({
                "height": "100%",
                "top": 30 - height
            });
        }
        if (height >= 60) {
            $(".sidebar-service>a").css("top", "520px");
            $(".sidebar-service>p").css("top", "520px");
            $(".sidebar-hotLine>a").css("top", "560px");
            $(".sidebar-hotLine>p").css("top", "560px");
            $(".sidebar-qr>a").css("display", "block");
            $(".sidebar-goTop>a").css("display", "block");
        } else {
            $(".sidebar-service>a").css("top", "600px");
            $(".sidebar-service>p").css("top", "600px");
            $(".sidebar-hotLine>a").css("top", "640px");
            $(".sidebar-hotLine>p").css("top", "640px");
            $(".sidebar-qr>a").css("display", "none");
            $(".sidebar-goTop>a").css("display", "none");
        }
    });
    // 侧边栏一系列动画效果
    $("#sidebar>div").mouseenter(function () {
        $($(this).children()[1]).stop().animate({
            right: '40px'
        }, 300)
    }).mouseleave(function () {
        $($(this).children()[1]).css("right", "70px")
    })
    // 右侧导航动画
    $(".leftNav").on("click", "h4", function () {
        let YN = $(this).css("background-image").substr(55, 2);
        if (YN == "jt") {
            $(this).css("background-image", "url(../images/listpage/m-jd.png)")
            $(this).siblings("ul").slideToggle();
        } else if (YN == "jd") {
            $(this).css("background-image", "url(../images/listpage/m-jt.png)")
            $(this).siblings("ul").slideToggle();
        }
    })
    // 主要内容上面二级菜单动画
    $(".main-topNav>ul>li").hover(function () {
        $(".nav-none").show(500);
    }, function () {
        $(".nav-none").hover(function () {
            $(this).css("display", "block")
        }, function () {
            $(".nav-none").hide();
        });
        $(".nav-none").hide();
    })
    // 分类导航
    $(".main-buttomNav").on("click", "a", function (e) {
        $(".main-buttomNav>dl>dd>a").removeClass("color");
        $(this).addClass("color");
        return false;
    })
    $(".main-buttomNav>dl>dt").css("display", "block");
    for (let i = 0; i < 5; i++) {
        $($($(".main-buttomNav>dl>dt")[0]).siblings("dd")[i]).css("display", "block");
        $($($(".main-buttomNav>dl>dt")[1]).siblings("dd")[i]).css("display", "block");
        $($($(".main-buttomNav>dl>dt")[2]).siblings("dd")[i]).css("display", "block");
    }
    $(".main-buttomNav>.buttom>a").click(function () {
        $(".main-buttomNav>dl>dd").css("display", "block");
        $(".main-buttomNav>.buttom").css("display", "none")
    })
    // 商品
    $(".goodsList>ul>li:lt(20)").css("display", "block");
    let num = 20;
    $(".more").click(function () {
        num = num + 20;
        $(`.goodsList>ul>li:lt(${num})`).css("display", "block");
        let liLength = $(".goodsList>ul>li").length - 1;
        let red = $(`.goodsList>ul>li:eq(${liLength})`).css("display");
        if (red == "block") {
            $(".more").css("display", "none")
        }
    })
    // 根据url数据改变页面标签内容和样式
    $(`.main-topNav>ul>li:eq(${urlCate})`).css("background-color", `${attrColor[urlCate]}`);
    $(".goods-leftNav>p>a:eq(1)").text(res);
    $(".leftNav>h3").text(res);
    // 渲染左侧导航数据
    $.ajax({
        type: "post",
        url: "../public/nav.json",
        dataType: "json",
        success: function (response) {
            let data = response[urlCate].data;
            let res = data.map(ele => {
                return `
                <li>
                    <h4>${ele.title}</h4>
                    <ul>
                        <li><a href="" class="hover-red">${ele.list[0]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[1]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[2]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[3]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[4]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[5]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[6]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[7]}</a></li>
                        <li><a href="" class="hover-red">${ele.list[8]}</a></li>
                    </ul>
                </li>
                `
            }).join("");
            $(".leftNav>ul").html(res);
            $("a:contains(undefined)").parent("li").remove();
        }
    });
    // 渲染内容头部二级导航
    $(".main-topNav>ul>li").mouseover(function () {
        let index = jQuery.inArray($(this).text(), attr);
        $.ajax({
            type: "post",
            url: "../public/nav.json",
            dataType: "json",
            success: function (response) {
                let data = response[index].data;
                let res = data.map(ele => {
                    return `
                    <dl>
                    <dt>
                        <h4>${ele.title}</h4>
                    </dt>
                    <dd>
                        <a href="">${ele.list[0]}</a>
                        <a href="">${ele.list[1]}</a>
                        <a href="">${ele.list[2]}</a>
                        <a href="">${ele.list[3]}</a>
                        <a href="">${ele.list[4]}</a>
                        <a href="">${ele.list[5]}</a>
                    </dd>
                </dl>
                    `
                }).join("");
                $(".nav-none").html(res);
                $("a:contains(undefined)").remove();
            }
        });
    })
})