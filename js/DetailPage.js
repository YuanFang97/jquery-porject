$(function () {
    let url = window.location.search;
    let urlCate = url.substr(6, 1) - 1;
    let urlId = url.substr(11, 13);
    let attr = ["新鲜水果", "绿色菜篮", "粮油调味", "干货特产", "零食饮料", "美酒名茶", "礼品礼券", "家具厨卫", "创意家电"];
    let attrColor = ["#76b003", "#30B633", "#e0a63b", "#da9166", "#27beaf", "#64b0c0", "#d864d3", "#8351ce", "#6494e8"]
    let res = attr[urlCate];
    // 发送ajax获取商品信息
    $.ajax({
        type: "post",
        url: "../php/DetailPage.php",
        data: `urlID=${urlId}`,
        dataType: "json",
        success: function (response) {
            let num = parseInt((response[0].price).substr(1,5));
            $(".main-box>h3").html(`${response[0].title}<span>${response[0].explain}</span>`);
            $(".price>.l>em").text(`${response[0].price}`);
            $(".price>.l>i").text(`${num+num*0.5}`);
            $(".exzoom_img_ul>li>img").attr("src",`${response[0].imgurl}`)
        }
    });
    // 获取推荐商品
    $.ajax({
        type: "post",
        url: "../php/NewDetail.php",
        data: `classify=${urlCate + 1}`,
        dataType: "json",
        success: function (response) {
            let newlist = response.map(ele => {
                return `
                <div class="list">
                <a href=""><img src="${ele.imgurl}"
                        alt=""></a>
                <em>${ele.price}</em>
            </div>
                `
            }).join("");
            $(".slider_four_in_line").html(newlist);
            $('.slider_four_in_line').EasySlides({
                'autoplay': true,
                'show': 9
            })
        }
    });
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
    // 根据url数据改变页面标签内容和样式
    $(`.main-topNav>ul>li:eq(${urlCate})`).css("background-color", `${attrColor[urlCate]}`);
    $(".goods-leftNav>p>a:eq(1)").text(res);
    $(".goods-leftNav>p>a:eq(0)").text(res);
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
                        <a href="" class="hover-red">${ele.list[0]}</a>
                        <a href="" class="hover-red">${ele.list[1]}</a>
                        <a href="" class="hover-red">${ele.list[2]}</a>
                        <a href="" class="hover-red">${ele.list[3]}</a>
                        <a href="" class="hover-red">${ele.list[4]}</a>
                        <a href="" class="hover-red">${ele.list[5]}</a>
                    </dd>
                </dl>
                    `
                }).join("");
                $(".nav-none").html(res);
                $("a:contains(undefined)").remove();
            }
        });
    });
    // 左侧img插件
    $("#exzoom").exzoom();
    // 右侧轮播插件
    $('.slider_one_big_picture').EasySlides({
        'autoplay': true,
    });
    
})